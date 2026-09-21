"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { formatRelativeTime } from "@/lib/format";

type Comment = {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  profiles: { nickname: string } | null;
};

export default function CommentSection({
  listingId,
  initialComments,
  currentUserId,
}: {
  listingId: number;
  initialComments: Comment[];
  currentUserId: string | null;
}) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = content.trim();
    if (!trimmed || !currentUserId) return;

    startTransition(async () => {
      const supabase = createClient();
      const { data, error: insertError } = await supabase
        .from("listing_comments")
        .insert({ listing_id: listingId, user_id: currentUserId, content: trimmed })
        .select("*, profiles(nickname)")
        .single();

      if (insertError || !data) {
        setError(insertError?.message ?? "댓글 등록에 실패했어요.");
        return;
      }

      setComments((prev) => [...prev, data as Comment]);
      setContent("");
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      const supabase = createClient();
      const { error: deleteError } = await supabase
        .from("listing_comments")
        .delete()
        .eq("id", id);

      if (!deleteError) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
    });
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-roast-500">
        댓글 {comments.length}개
      </h2>

      {comments.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {comments.map((c) => (
            <li key={c.id} className="rounded-2xl border border-goguma-100 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-roast-600">
                  {c.profiles?.nickname ?? "알 수 없음"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-roast-300">
                    {formatRelativeTime(c.created_at)}
                  </span>
                  {currentUserId === c.user_id && (
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={isPending}
                      className="text-xs text-roast-300 hover:text-goguma-600"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-1.5 whitespace-pre-wrap text-sm text-roast-600">
                {c.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-center text-sm text-roast-400">
          아직 댓글이 없어요. 첫 댓글을 남겨보세요!
        </p>
      )}

      {currentUserId ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
            maxLength={500}
            placeholder="따뜻한 댓글을 남겨보세요"
            className="resize-none rounded-xl border border-goguma-200 bg-white px-4 py-3 text-sm text-roast-700 outline-none placeholder:text-roast-300 focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100"
          />
          {error && <p className="text-xs text-goguma-600">{error}</p>}
          <button
            type="submit"
            disabled={isPending || !content.trim()}
            className="self-end rounded-full bg-goguma-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-goguma-600 disabled:opacity-60"
          >
            등록
          </button>
        </form>
      ) : (
        <p className="text-center text-sm text-roast-400">
          <Link
            href={`/login?next=/listings/${listingId}`}
            className="font-medium text-goguma-600 hover:underline"
          >
            로그인
          </Link>
          하면 댓글을 남길 수 있어요.
        </p>
      )}
    </div>
  );
}
