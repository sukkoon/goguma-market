import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ListingCard from "@/components/listing-card";
import {
  ALL_CATEGORY,
  CATEGORIES,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_ICONS,
  type Category,
} from "@/lib/constants";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const supabase = await createClient();

  const { data } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  const listings = data ?? [];
  const selected = (CATEGORIES as readonly string[]).includes(category ?? "")
    ? (category as Category)
    : null;

  const filtered = selected
    ? listings.filter((l) => l.category === selected)
    : listings;

  const panel = selected
    ? {
        label: selected,
        icon: CATEGORY_ICONS[selected],
        description: CATEGORY_DESCRIPTIONS[selected],
      }
    : ALL_CATEGORY;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 sm:px-6">
      <div className="grid grid-cols-3 gap-2.5 py-5 sm:grid-cols-4 sm:gap-3">
        <CategoryCard label="전체" icon={ALL_CATEGORY.icon} href="/" active={!selected} />
        {CATEGORIES.map((c) => (
          <CategoryCard
            key={c}
            label={c}
            icon={CATEGORY_ICONS[c]}
            href={`/?category=${encodeURIComponent(c)}`}
            active={selected === c}
          />
        ))}
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
        <div className="shrink-0 md:sticky md:top-20 md:w-56">
          <div className="flex items-center gap-4 rounded-2xl border border-goguma-100 bg-white p-5 md:flex-col md:items-start md:text-left">
            <span className="text-4xl" aria-hidden>
              {panel.icon}
            </span>
            <div>
              <h2 className="text-lg font-bold text-roast-700">{panel.label}</h2>
              <p className="mt-1 text-sm text-roast-400">{panel.description}</p>
              <p className="mt-3 text-sm font-semibold text-goguma-600">
                총 {filtered.length}개의 물건
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          {filtered.length > 0 ? (
            <ul className="flex flex-col divide-y divide-goguma-100">
              {filtered.map((listing) => (
                <li key={listing.id}>
                  <ListingCard listing={listing} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-24 text-center text-roast-400">
              <span className="text-4xl" aria-hidden>
                🍠
              </span>
              <p>아직 등록된 물건이 없어요.</p>
              <p className="text-sm">첫 물건을 올려서 동네 거래를 시작해보세요!</p>
            </div>
          )}
        </div>
      </div>

      <Link
        href="/listings/new"
        className="fixed bottom-8 right-6 flex items-center gap-2 rounded-full bg-goguma-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-goguma-500/30 transition-colors hover:bg-goguma-600"
      >
        <span aria-hidden>✏️</span>
        글쓰기
      </Link>
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
      className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border py-4 text-center transition-colors ${
        active
          ? "border-goguma-500 bg-goguma-500 text-white"
          : "border-goguma-100 bg-white text-roast-600 hover:bg-goguma-50"
      }`}
    >
      <span className="text-2xl" aria-hidden>
        {icon}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
