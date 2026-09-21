import Link from "next/link";
import {
  ALL_CATEGORY,
  CATEGORIES,
  CATEGORY_ICONS,
  CATEGORY_SLUGS,
  type Category,
} from "@/lib/constants";

export default function CategoryCardGrid({ active }: { active: Category | null }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-5 sm:grid-cols-4">
      <CategoryCard label={ALL_CATEGORY.label} icon={ALL_CATEGORY.icon} href="/" active={!active} />
      {CATEGORIES.map((c) => (
        <CategoryCard
          key={c}
          label={c}
          icon={CATEGORY_ICONS[c]}
          href={`/category/${CATEGORY_SLUGS[c]}`}
          active={active === c}
        />
      ))}
    </div>
  );
}

function CategoryCard({
  label,
  icon,
  href,
  active,
}: {
  label: string;
  icon: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl border p-2 text-center transition-colors ${
        active
          ? "border-goguma-500 bg-goguma-500 text-white"
          : "border-goguma-100 bg-white text-roast-600 hover:bg-goguma-50"
      }`}
    >
      <span className="text-4xl sm:text-5xl" aria-hidden>
        {icon}
      </span>
      <span className="text-sm font-semibold sm:text-base">{label}</span>
    </Link>
  );
}
