export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 card-hover ${className}`}>
      {children}
    </div>
  );
}
