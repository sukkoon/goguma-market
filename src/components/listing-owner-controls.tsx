"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LISTING_STATUS, type ListingStatus } from "@/lib/constants";

export default function ListingOwnerControls({
  listingId,
  currentStatus,
}: {
  listingId: number;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  function updateStatus(next: ListingStatus) {
    setStatus(next);
    startTransition(async () => {
      const supabase = createClient();
      await supabase.from("listings").update({ status: next }).eq("id", listingId);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    startTransition(async () => {
      const supabase = createClient();
      await supabase.from("listings").delete().eq("id", listingId);
      router.push("/");
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-goguma-100 bg-white p-4">
      <div className="flex gap-2">
        {(Object.keys(LISTING_STATUS) as ListingStatus[]).map((s) => (
          <button
            key={s}
            disabled={isPending}
            onClick={() => updateStatus(s)}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
              status === s
                ? "bg-goguma-500 text-white"
                : "bg-cream-100 text-roast-500 hover:bg-goguma-50"
            }`}
          >
            {LISTING_STATUS[s]}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Link
          href={`/listings/${listingId}/edit`}
          className="flex-1 rounded-full border border-goguma-200 py-2 text-center text-sm font-medium text-roast-600 hover:bg-goguma-50"
        >
          수정
        </Link>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className={`flex-1 rounded-full border py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
            confirmingDelete
              ? "border-goguma-500 bg-goguma-500 text-white"
              : "border-goguma-200 text-roast-600 hover:bg-goguma-50"
          }`}
        >
          {isPending ? "삭제 중..." : confirmingDelete ? "정말 삭제할까요?" : "삭제"}
        </button>
        {confirmingDelete && !isPending && (
          <button
            onClick={() => setConfirmingDelete(false)}
            className="rounded-full border border-goguma-200 px-4 py-2 text-sm font-medium text-roast-500 hover:bg-goguma-50"
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
}
