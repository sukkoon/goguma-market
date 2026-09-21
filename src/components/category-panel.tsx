export default function CategoryPanel({
  icon,
  label,
  description,
  count,
}: {
  icon: string;
  label: string;
  description: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-goguma-100 bg-white p-5 md:flex-col md:items-start md:text-left">
      <span className="text-4xl" aria-hidden>
        {icon}
      </span>
      <div>
        <h2 className="text-lg font-bold text-roast-700">{label}</h2>
        <p className="mt-1 text-sm text-roast-400">{description}</p>
        <p className="mt-3 text-sm font-semibold text-goguma-600">
          총 {count}개의 물건
        </p>
      </div>
    </div>
  );
}
