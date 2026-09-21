import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ListingGallery from "@/components/listing-gallery";
import ListingOwnerControls from "@/components/listing-owner-controls";
import LikeButton from "@/components/like-button";
import CommentSection from "@/components/comment-section";
import { formatPrice, formatRelativeTime } from "@/lib/format";
import { LISTING_STATUS, type ListingStatus } from "@/lib/constants";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listingId = Number(id);
  if (!Number.isInteger(listingId)) notFound();

  const supabase = await createClient();

  const { data: listing } = await supabase
    .from("listings")
    .select("*, profiles!listings_seller_id_fkey(nickname, avatar_url)")
    .eq("id", listingId)
    .single();

  if (!listing) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ count: likeCount }, { data: myLike }, { data: comments }] = await Promise.all([
    supabase
      .from("listing_likes")
      .select("*", { count: "exact", head: true })
      .eq("listing_id", listingId),
    user
      ? supabase
          .from("listing_likes")
          .select("user_id")
          .eq("listing_id", listingId)
          .eq("user_id", user.id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    supabase
      .from("listing_comments")
      .select("*, profiles(nickname)")
      .eq("listing_id", listingId)
      .order("created_at", { ascending: true }),
  ]);

  const isOwner = user?.id === listing.seller_id;
  const seller = listing.profiles;

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6 sm:px-6">
      <ListingGallery images={listing.images} title={listing.title} category={listing.category} />

      <div className="mt-5 flex items-center gap-2 text-sm text-roast-400">
        <span className="rounded-full bg-goguma-50 px-2.5 py-1 text-goguma-600">
          {listing.category}
        </span>
        <span>{listing.region ?? "동네 미설정"}</span>
        <span>·</span>
        <span>{formatRelativeTime(listing.created_at)}</span>
      </div>

      <h1 className="mt-3 text-xl font-bold text-roast-700">{listing.title}</h1>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-2xl font-bold text-goguma-600">
          {formatPrice(listing.price)}
        </p>
        <LikeButton
          listingId={listing.id}
          initialCount={likeCount ?? 0}
          initialLiked={Boolean(myLike)}
          isLoggedIn={Boolean(user)}
        />
      </div>

      {!isOwner && listing.status !== "selling" && (
        <p className="mt-2 inline-block rounded-full bg-roast-100 px-3 py-1 text-sm text-roast-600">
          {LISTING_STATUS[listing.status as ListingStatus]}
        </p>
      )}

      <p className="mt-5 whitespace-pre-wrap leading-relaxed text-roast-600">
        {listing.description || "설명이 없어요."}
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-goguma-100 bg-white p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-goguma-100 text-lg">
          🍠
        </div>
        <span className="font-medium text-roast-600">
          {seller?.nickname ?? "알 수 없음"}
        </span>
      </div>

      {isOwner && (
        <div className="mt-4">
          <ListingOwnerControls listingId={listing.id} currentStatus={listing.status} />
        </div>
      )}

      <CommentSection
        listingId={listing.id}
        initialComments={comments ?? []}
        currentUserId={user?.id ?? null}
      />
    </div>
  );
}
