"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LikeButton({
  listingId,
  initialCount,
  initialLiked,
  isLoggedIn,
}: {
  listingId: number;
  initialCount: number;
  initialLiked: boolean;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  function toggleLike() {
    if (!isLoggedIn) {
      router.push(`/login?next=/listings/${listingId}`);
      return;
    }

    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));

    startTransition(async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = next
        ? await supabase
            .from("listing_likes")
            .insert({ listing_id: listingId, user_id: user.id })
        : await supabase
            .from("listing_likes")
            .delete()
            .eq("listing_id", listingId)
            .eq("user_id", user.id);

      if (error) {
        setLiked(!next);
        setCount((c) => c + (next ? -1 : 1));
      }
    });
  }

  return (
    <button
      onClick={toggleLike}
      disabled={isPending}
      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
        liked
          ? "border-goguma-500 bg-goguma-50 text-goguma-600"
          : "border-goguma-200 text-roast-500 hover:bg-goguma-50"
      }`}
    >
      <span aria-hidden>{liked ? "❤️" : "🤍"}</span>
      좋아요 {count}
    </button>
  );
}
