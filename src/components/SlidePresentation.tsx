"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  Children,
  isValidElement,
  createContext,
  useContext,
  type ReactNode,
} from "react";

/* ── Context for slide navigation ── */
const SlideContext = createContext<{
  goToSlideById: (id: string) => void;
}>({ goToSlideById: () => {} });

export function useSlideNavigation() {
  return useContext(SlideContext);
}

/* ── Component ── */
interface SlidePresentationProps {
  children: ReactNode;
}

export default function SlidePresentation({ children }: SlidePresentationProps) {
  const slides = Children.toArray(children);
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Build id → slide index map from data-slide-id props
  const idToIndexRef = useRef(new Map<string, number>());
  const map = new Map<string, number>();
  slides.forEach((child, i) => {
    if (isValidElement(child)) {
      const ids = (child.props as Record<string, unknown>)["data-slide-id"];
      if (typeof ids === "string") {
        ids.split(" ").forEach((id) => map.set(id, i));
      }
    }
  });
  idToIndexRef.current = map;

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= total || index === current || animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 350);
    },
    [total, current, animating]
  );

  const goToSlideById = useCallback(
    (id: string) => {
      const index = idToIndexRef.current.get(id);
      if (index !== undefined) goTo(index);
    },
    [goTo]
  );

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (e.key) {
        case " ":
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          next();
          break;
        case "Backspace":
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          prev();
          break;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  // Intercept hash anchor clicks (e.g. href="#ot")
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
            className="slide-fade-in w-full max-w-5xl mx-auto px-6 py-12"
          >
            {slides[current]}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-(--bg-primary)/90 backdrop-blur-sm border-t border-(--border)">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Prev button */}
            <button
              onClick={prev}
              disabled={current === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:bg-(--bg-card) text-(--text-sub)"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Prev
            </button>

            {/* Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 h-2 bg-(--accent)"
                        : "w-2 h-2 bg-(--text-muted) hover:bg-(--text-sub)"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-(--text-muted) font-mono ml-2">
                {current + 1} / {total}
              </span>
            </div>

            {/* Next button */}
            <button
              onClick={next}
              disabled={current === total - 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:bg-(--bg-card) text-(--text-sub)"
            >
              Next
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
