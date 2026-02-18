export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-(--bg-card) border border-(--border) rounded-xl p-6 card-hover ${className}`}>
      {children}
    </div>
  );
}
