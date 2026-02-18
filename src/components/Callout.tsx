const icons = {
  info: (
    <svg className="w-5 h-5 text-(--accent) shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  ),
  tip: (
    <svg className="w-5 h-5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  warn: (
    <svg className="w-5 h-5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
};

export default function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "tip" | "warn" }) {
  const colors = {
    info: "border-(--accent) bg-(--callout-info-bg)",
    tip: "border-emerald-500 bg-(--callout-tip-bg)",
    warn: "border-amber-500 bg-(--callout-warn-bg)",
  };
  return (
    <div className={`flex items-start gap-3 border-l-4 rounded-r-lg px-5 py-4 my-4 ${colors[type]}`}>
      {icons[type]}
      <div>{children}</div>
    </div>
  );
}
