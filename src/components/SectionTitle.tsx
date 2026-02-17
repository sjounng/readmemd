export default function SectionTitle({ num, title, id }: { num: string; title: string; id: string }) {
  return (
    <div id={id} className="pt-20 pb-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="text-4xl font-extrabold text-[var(--accent)] font-mono">{num}</span>
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      </div>
      <div className="mt-3 h-px bg-gradient-to-r from-[var(--accent)] via-[var(--border)] to-transparent" />
    </div>
  );
}
