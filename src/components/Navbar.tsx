"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/constants/site";
import { useTheme } from "@/components/ThemeProvider";

interface NavItem {
  label: string;
  href: string;
}

export default function Navbar({
  weekNum,
  navItems,
}: {
  weekNum?: number;
  navItems?: NavItem[];
}) {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const isMain = pathname === "/";
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (theme !== "light" || !isMain) return;
    const t = setTimeout(() => setShowHint(true), 800);
    return () => {
      clearTimeout(t);
      setShowHint(false);
    };
  }, [theme, isMain]);

  const closeHint = () => {
    setShowHint(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-(--bg-primary)/30 backdrop-blur-md border-b border-(--border)">
      <div className="px-8 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <Image src="/foxCircleBlue.svg" alt="FORIF" width={40} height={40} />
            <Image
              src="/black_title.png"
              alt="FORIF"
              width={720}
              height={360}
              className="title-img"
              style={{ height: "60px", width: "auto" }}
            />
          </Link>
          {weekNum != null && (
            <>
              <span className="text-(--border)">|</span>
              <Link href="/" className="text-sm font-bold text-(--accent) hover:opacity-80 transition-opacity">
                {SITE_NAME}
              </Link>
              <span className="text-sm text-(--text-muted)">
                Week {String(weekNum).padStart(2, "0")}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          {navItems && navItems.length > 0 && (
            <div className="hidden md:flex gap-6 text-sm text-(--text-sub)">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover:text-(--accent) transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          <div className="relative">
            <button
              onClick={toggle}
              aria-label="테마 전환"
              className="text-(--text-muted) hover:text-(--accent) transition-colors cursor-pointer"
            >
              {theme === "dark" ? (
                /* Sun */
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon */
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Light mode hint */}
            {showHint && theme === "light" && (
              <div
                className="absolute top-full right-0 mt-3 w-80 rounded-xl bg-(--bg-card) px-5 py-4"
                style={{
                  animation: "slideDown 0.25s ease-out",
                  boxShadow: "0 0 0 1px var(--border), 0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 shrink-0 mt-0.5 text-(--accent)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <p className="text-sm text-(--text-sub) leading-relaxed flex-1">
                    눈이 아프시면 다크모드를 사용해보세요!
                  </p>
                  <button
                    onClick={closeHint}
                    className="text-(--text-muted) hover:text-foreground transition-colors shrink-0"
                    aria-label="닫기"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
