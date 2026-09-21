import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CategoryCardGrid from "@/components/category-card-grid";
import CategoryPanel from "@/components/category-panel";
import ListingList from "@/components/listing-list";
import { categoryFromSlug, CATEGORY_DESCRIPTIONS, CATEGORY_ICONS } from "@/lib/constants";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) notFound();

  const supabase = await createClient();

  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  const listings = data ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 sm:px-6">
      <CategoryCardGrid active={category} />

      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
        <div className="shrink-0 md:sticky md:top-20 md:w-56">
          <CategoryPanel
            icon={CATEGORY_ICONS[category]}
            label={category}
            description={CATEGORY_DESCRIPTIONS[category]}
            count={listings.length}
          />
        </div>

        <div className="min-w-0 flex-1">
          <ListingList listings={listings} emptyIcon={CATEGORY_ICONS[category]} />
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
