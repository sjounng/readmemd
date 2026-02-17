export default function StepItem({ num, title, desc }: { num: number; title: string; desc?: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-sm font-bold text-white">
        {num}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        {desc && <p className="text-sm text-[var(--text-sub)] mt-1">{desc}</p>}
      </div>
    </div>
  );
}
