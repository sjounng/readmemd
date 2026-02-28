"use client";

import Link from "next/link";
import { TEAM_NAME, SITE_NAME } from "@/constants/site";

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
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-(--bg-primary)/80 backdrop-blur-sm border-b border-(--border)">
      <div className="px-8 md:px-16 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-extrabold tracking-widest text-(--foreground) hover:opacity-80 transition-opacity">
            {TEAM_NAME.split(" ")[0].toUpperCase()}
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
      </div>
    </nav>
  );
}
