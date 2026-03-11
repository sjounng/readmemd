export default function StepItem({ num, title, desc }: { num: number; title: string; desc?: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 w-10 h-10 rounded-full bg-(--accent) flex items-center justify-center text-base font-bold text-white">
        {num}
      </div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        {desc && <p className="text-base text-(--text-sub) mt-1">{desc}</p>}
      </div>
    </div>
  );
}
