"use client";

import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

export default function WeekNav({
  weekNum,
  title,
  navItems,
}: {
  weekNum: number;
  title: string;
  navItems: NavItem[];
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[rgba(8,8,26,0.85)] border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-bold text-[var(--accent)] hover:opacity-80 transition-opacity">
            README.md
          </Link>
          <span className="text-sm text-[var(--text-muted)]">
            Week {String(weekNum).padStart(2, "0")}
          </span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-[var(--text-sub)]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[var(--accent)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
