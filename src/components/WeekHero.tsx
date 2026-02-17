interface TocItem {
  num: string;
  title: string;
  href: string;
}

export default function WeekHero({
  weekNum,
  title,
  subtitle,
  description,
  tocItems,
}: {
  weekNum: number;
  title: string;
  subtitle?: string;
  description: string;
  tocItems: TocItem[];
}) {
  return (
    <section className="pt-28 pb-12">
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-4">
        <span className="px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border)]">
          Forif SW팀
        </span>
        <span>·</span>
        <span>2026-1</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
        {title}
        {subtitle && (
          <>
            <br />
            <span className="text-[var(--accent)]">{subtitle}</span>
          </>
        )}
      </h1>
      <p className="text-lg text-[var(--text-sub)] max-w-2xl mb-8">{description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tocItems.map((item) => (
          <a
            key={item.num}
            href={item.href}
            className="group flex items-center gap-3 p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          >
            <span className="text-2xl font-bold text-[var(--accent)] font-mono">{item.num}</span>
            <span className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors">
              {item.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
