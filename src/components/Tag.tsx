export default function Tag({ label }: { label: string }) {
  return (
    <span className="px-4 py-1.5 text-sm font-light text-white rounded-full border border-(--border) bg-(--bg-card)">
      # {label}
    </span>
  );
}
