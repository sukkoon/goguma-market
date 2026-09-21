import Image from "next/image";
import Link from "next/link";
import { formatPrice, formatRelativeTime } from "@/lib/format";
import { LISTING_STATUS, type ListingStatus } from "@/lib/constants";
import type { Tables } from "@/lib/supabase/types";

type Listing = Tables<"listings">;

export default function ListingCard({ listing }: { listing: Listing }) {
  const thumbnail = listing.images[0];
  const isSold = listing.status !== "selling";

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="group flex gap-3 rounded-2xl p-2 transition-colors hover:bg-goguma-50"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-goguma-100">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={listing.title}
            fill
            sizes="96px"
            className={`object-cover ${isSold ? "opacity-50" : ""}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl">
            🍠
          </div>
        )}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-roast-700/40">
            <span className="rounded-full bg-roast-700 px-2 py-0.5 text-xs font-medium text-white">
              {LISTING_STATUS[listing.status as ListingStatus]}
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <p className="truncate font-medium text-roast-700">{listing.title}</p>
        <p className="text-xs text-roast-400">
          {listing.region ?? "동네 미설정"} · {formatRelativeTime(listing.created_at)}
        </p>
        <p className="mt-1 font-semibold text-goguma-600">
          {formatPrice(listing.price)}
        </p>
      </div>
    </Link>
  );
}
