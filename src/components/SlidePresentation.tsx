"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
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
        dx < 0 ? next("right") : prev("left");
      } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
        dy < 0 ? next("down") : prev("up");
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
            className={`${SLIDE_CLASS[slideDir]} w-full max-w-5xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-16 md:pb-12`}
          >
            {slides[current]}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-(--bg-primary)/90 backdrop-blur-sm border-t border-(--border)">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

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
              {/* Dots — desktop only */}
              <div className="hidden md:flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? "right" : "left")}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 h-2 bg-(--accent)"
                        : "w-2 h-2 bg-(--text-muted) hover:bg-(--text-sub)"
                    }`}
                  />
                ))}
              </div>
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
