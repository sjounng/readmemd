"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useSyncExternalStore,
  Children,
  isValidElement,
  createContext,
  useContext,
  type ReactNode,
} from "react";

type NavDir = "right" | "left" | "up" | "down";

const BLOB_TRANSITION = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

const SLIDE_CLASS: Record<NavDir, string> = {
  right: "slide-from-right",
  left:  "slide-from-left",
  down:  "slide-from-bottom",
  up:    "slide-from-top",
};

/* ── Context ── */
const SlideContext = createContext<{ goToSlideById: (id: string) => void }>({ goToSlideById: () => {} });
export function useSlideNavigation() { return useContext(SlideContext); }

/* ── 3D Carousel Dots ── */
function CarouselDots({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const RADIUS = 300;
  const DOT_SIZE = 7;
  const ACTIVE_WIDTH = 22;
  const CONTAINER_W = 420;
  const DOT_ANGLE = 0.11; // radians between each dot on the arc

  // drag state
  const dragRef = useRef<{ startX: number; startOffset: number; dragging: boolean } | null>(null);
  const wasDragRef = useRef(false);
  const [dragOffset, setDragOffset] = useState(0); // in dot-units
  const [isDragging, setIsDragging] = useState(false);

  // each dot's angle = (i - current + dragOffset) * DOT_ANGLE
  // current dot is always at angle 0 (front center)
  const effectiveCenter = current - dragOffset;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startOffset: dragOffset, dragging: false };
    setIsDragging(true);
  }, [dragOffset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 3) dragRef.current.dragging = true;
    // map px to dot-units
    const dDots = dx / (DOT_ANGLE * RADIUS);
    let next = dragRef.current.startOffset + dDots;
    // clamp so effective center stays within [0, total-1]
    const center = current - next;
    if (center < 0) next = current;
    else if (center > total - 1) next = current - (total - 1);
    setDragOffset(next);
  }, [current, total]);

  const handlePointerUp = useCallback(() => {
    if (!dragRef.current) return;
    const wasDrag = dragRef.current.dragging;
    wasDragRef.current = wasDrag;
    dragRef.current = null;
    setIsDragging(false);

    if (wasDrag) {
      // snap to nearest dot position but don't change page
      const snapped = Math.round(effectiveCenter);
      const clamped = Math.max(0, Math.min(total - 1, snapped));
      setDragOffset(current - clamped);
    }
  }, [effectiveCenter, total, current]);

  // reset drag offset when current changes externally
  const [trackedCurrent, setTrackedCurrent] = useState(current);
  if (trackedCurrent !== current) {
    setTrackedCurrent(current);
    if (dragOffset !== 0) setDragOffset(0);
  }

  if (!mounted) {
    return <div className="hidden md:flex items-center justify-center" style={{ width: CONTAINER_W, height: 24 }} />;
  }

  return (
    <div
      className="hidden md:flex items-center justify-center overflow-hidden select-none"
      style={{ width: CONTAINER_W, height: 24, perspective: 800, cursor: "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          width: CONTAINER_W,
          height: 24,
        }}
      >
        {Array.from({ length: total }, (_, i) => {
          // angle on the arc: 0 = front center, positive = right, negative = left
          const arcAngle = (i - effectiveCenter) * DOT_ANGLE;
          const x = Math.sin(arcAngle) * RADIUS;
          const z = Math.cos(arcAngle) * RADIUS;
          const normZ = (z + RADIUS) / (2 * RADIUS); // 0 (back) → 1 (front)

          // hide dots that go behind the curve (past ±90°)
          if (Math.abs(arcAngle) > Math.PI / 2) return null;

          const scale = 0.3 + 0.7 * normZ;
          const opacity = Math.pow(normZ, 1.5);
          const isCurrent = i === current;

          return (
            <button
              key={i}
              onClick={(e) => {
                if (wasDragRef.current) { e.preventDefault(); wasDragRef.current = false; return; }
                onSelect(i);
              }}
              className="absolute rounded-full"
              style={{
                width: isCurrent ? ACTIVE_WIDTH : DOT_SIZE,
                height: DOT_SIZE,
                left: "50%",
                transform: `translateX(calc(-50% + ${x}px)) translateZ(${z}px) scale(${scale})`,
                opacity: isCurrent ? 1 : opacity,
                backgroundColor: isCurrent
                  ? "var(--accent)"
                  : `color-mix(in srgb, var(--text-muted) ${Math.round(opacity * 100)}%, transparent)`,
                zIndex: Math.round(normZ * 100),
                transition: isDragging ? "none" : "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                pointerEvents: normZ > 0.4 ? "auto" : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ── Component ── */
export default function SlidePresentation({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children);
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [slideDir, setSlideDir] = useState<NavDir>("right");
  const [animating, setAnimating] = useState(false);
  const blobX = useRef(0);
  const blobY = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  /* ── id → index map ── */
  const idToIndex = useMemo(() => {
    const map = new Map<string, number>();
    slides.forEach((child, i) => {
      if (isValidElement(child)) {
        const ids = (child.props as Record<string, unknown>)["data-slide-id"];
        if (typeof ids === "string") ids.split(" ").forEach((id) => map.set(id, i));
      }
    });
    return map;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);
  const idToIndexRef = useRef(idToIndex);
  useEffect(() => { idToIndexRef.current = idToIndex; }, [idToIndex]);

  /* ── Blob movement ── */
  const moveBlobs = useCallback((axis: "h" | "v", dir: -1 | 1) => {
    const blobs = document.getElementById("bg-blobs");
    if (!blobs) return;
    if (axis === "h") {
      blobX.current += dir * 60;
      const vw = window.innerWidth;
      if (blobX.current <= -vw || blobX.current >= vw) {
        const jump = blobX.current <= -vw ? vw : -vw;
        blobs.style.transition = "none";
        blobs.style.transform = `translateX(${blobX.current - dir * 60 + jump}px) translateY(${blobY.current}px)`;
        blobs.getBoundingClientRect();
        blobs.style.transition = BLOB_TRANSITION;
        blobX.current += jump;
      }
    } else {
      blobY.current += dir * 60;
    }
    blobs.style.transform = `translateX(${blobX.current}px) translateY(${blobY.current}px)`;
  }, []);

  /* ── goTo ── */
  const goTo = useCallback(
    (index: number, dir: NavDir = "right") => {
      if (index < 0 || index >= total || index === current || animating) return;
      if (dir === "right") moveBlobs("h", -1);
      else if (dir === "left") moveBlobs("h", 1);
      else if (dir === "down") moveBlobs("v", -1);
      else moveBlobs("v", 1);
      setSlideDir(dir);
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 350);
    },
    [total, current, animating, moveBlobs]
  );

  const goToSlideById = useCallback(
    (id: string) => {
      const index = idToIndexRef.current.get(id);
      if (index !== undefined) goTo(index, index > current ? "right" : "left");
    },
    [goTo, current]
  );

  const next = useCallback((dir: NavDir = "right") => goTo(current + 1, dir), [goTo, current]);
  const prev = useCallback((dir: NavDir = "left") => goTo(current - 1, dir), [goTo, current]);

  /* ── Keyboard ── */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      switch (e.key) {
        case "ArrowRight": e.preventDefault(); next("right"); break;
        case "ArrowLeft":  e.preventDefault(); prev("left");  break;
        case " ":
        case "ArrowDown":  e.preventDefault(); next("down");  break;
        case "Backspace":
        case "ArrowUp":    e.preventDefault(); prev("up");    break;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  /* ── Touch swipe ── */
  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    function onTouchEnd(e: TouchEvent) {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;
      const threshold = 50;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        if (dx < 0) { next("right"); } else { prev("left"); }
      } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
        if (dy < 0) { next("down"); } else { prev("up"); }
      }
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  /* ── Hash anchor intercept ── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a[href^='#']");
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (id && idToIndexRef.current.has(id)) {
        e.preventDefault();
        goToSlideById(id);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [goToSlideById]);

  return (
    <SlideContext.Provider value={{ goToSlideById }}>
      <div className="relative min-h-screen flex flex-col">
        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center">
          <div
            key={current}
            className={`${SLIDE_CLASS[slideDir]} w-full max-w-400 mx-auto px-8 md:px-16 pt-20 md:pt-24 pb-16 md:pb-12`}
          >
            {slides[current]}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-sm border-t border-(--border)">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">

            {/* Prev */}
            <button
              onClick={() => prev("left")}
              disabled={current === 0}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-sm transition-colors
                disabled:opacity-30 disabled:cursor-not-allowed hover:bg-(--bg-card) text-(--text-sub)"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span className="hidden md:inline">Prev</span>
            </button>

            {/* Indicator */}
            <div className="flex items-center gap-3">
              <CarouselDots
                total={total}
                current={current}
                onSelect={(i) => goTo(i, i > current ? "right" : "left")}
              />
              {/* Number — always visible */}
              <span className="text-xs text-(--text-muted) font-mono">
                {current + 1} / {total}
              </span>
            </div>

            {/* Next */}
            <button
              onClick={() => next("right")}
              disabled={current === total - 1}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-sm transition-colors
                disabled:opacity-30 disabled:cursor-not-allowed hover:bg-(--bg-card) text-(--text-sub)"
            >
              <span className="hidden md:inline">Next</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-(--border)">
            <div
              className="h-full bg-(--accent) transition-all duration-300"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </SlideContext.Provider>
  );
}
