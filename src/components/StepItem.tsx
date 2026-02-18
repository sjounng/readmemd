export default function StepItem({ num, title, desc }: { num: number; title: string; desc?: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 w-8 h-8 rounded-full bg-(--accent) flex items-center justify-center text-sm font-bold text-white">
        {num}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        {desc && <p className="text-sm text-(--text-sub) mt-1">{desc}</p>}
      </div>
    </div>
  );
}
