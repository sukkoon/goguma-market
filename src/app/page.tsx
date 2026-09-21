import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ListingCard from "@/components/listing-card";
import { CATEGORIES } from "@/lib/constants";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data: listings } = await query;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 sm:px-6">
      <nav className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
        <CategoryChip label="전체" href="/" active={!category} />
        {CATEGORIES.map((c) => (
          <CategoryChip key={c} label={c} href={`/?category=${encodeURIComponent(c)}`} active={category === c} />
        ))}
      </nav>

      {listings && listings.length > 0 ? (
        <ul className="flex flex-col divide-y divide-goguma-100">
          {listings.map((listing) => (
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

function CategoryChip({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-goguma-500 bg-goguma-500 text-white"
          : "border-goguma-200 bg-white text-roast-500 hover:bg-goguma-50"
      }`}
    >
      {label}
    </Link>
  );
}
