export default function Marquee({ items }: { items: string[] }) {
  const repeated = Array.from({ length: 6 }, () => items).flat();
  return (
    <div className="overflow-hidden border-y border-neutral-200 bg-yellow-300 py-3" aria-hidden>
      <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-10 whitespace-nowrap font-bold uppercase">
        {[...repeated, ...repeated].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
