import ListingCard from "@/components/listing-card";
import type { Tables } from "@/lib/supabase/types";

type Listing = Tables<"listings">;

export default function ListingList({
  listings,
  emptyIcon = "🍠",
}: {
  listings: Listing[];
  emptyIcon?: string;
}) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-24 text-center text-roast-400">
        <span className="text-4xl" aria-hidden>
          {emptyIcon}
        </span>
        <p>아직 등록된 물건이 없어요.</p>
        <p className="text-sm">첫 물건을 올려서 동네 거래를 시작해보세요!</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-goguma-100">
      {listings.map((listing) => (
        <li key={listing.id}>
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  );
}
