"use client";

export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: string[];
  activeTab: number;
  onTabChange: (i: number) => void;
}) {
  return (
    <div className="flex gap-1 border-b border-(--border) mb-6">
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => onTabChange(i)}
          className={`px-4 py-2.5 text-base font-medium transition-colors ${
            i === activeTab ? "tab-active" : "tab-inactive"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
