export default function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "tip" | "warn" }) {
  const colors = {
    info: "border-[var(--accent)] bg-[rgba(0,180,216,0.05)]",
    tip: "border-emerald-500 bg-[rgba(16,185,129,0.05)]",
    warn: "border-amber-500 bg-[rgba(245,158,11,0.05)]",
  };
  const icons = { info: "💡", tip: "✅", warn: "⚠️" };
  return (
    <div className={`border-l-4 rounded-r-lg px-5 py-4 my-4 ${colors[type]}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}
