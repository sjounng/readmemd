export default function SectionTitle({ num, title, id }: { num: string; title: string; id: string }) {
  return (
    <div id={id} className="pt-20 pb-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="text-2xl md:text-5xl font-extrabold text-(--accent) font-mono">{num}</span>
        <h2 className="text-xl md:text-5xl font-bold">{title}</h2>
      </div>
      <div className="mt-3 h-px bg-linear-to-r from-(--accent) via-(--border) to-transparent" />
    </div>
  );
}
