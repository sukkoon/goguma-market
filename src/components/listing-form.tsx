"use client";

import { useRef, useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES } from "@/lib/constants";
import type { Tables } from "@/lib/supabase/types";

type Listing = Tables<"listings">;

const MAX_IMAGES = 5;

export default function ListingForm({ listing }: { listing?: Listing }) {
  const router = useRouter();
  const isEdit = Boolean(listing);

  const [title, setTitle] = useState(listing?.title ?? "");
  const [category, setCategory] = useState(listing?.category ?? CATEGORIES[0]);
  const [price, setPrice] = useState(listing?.price ? String(listing.price) : "");
  const [isFree, setIsFree] = useState(listing?.price === 0);
  const [description, setDescription] = useState(listing?.description ?? "");
  const [region, setRegion] = useState(listing?.region ?? "");
  const [existingImages, setExistingImages] = useState<string[]>(
    listing?.images ?? []
  );
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingSlots = MAX_IMAGES - existingImages.length - newFiles.length;

  function handleFilesSelected(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, remainingSlots);
    setNewFiles((prev) => [...prev, ...files]);
    e.target.value = "";
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }
    if (!category) {
      setError("카테고리를 선택해주세요.");
      return;
    }
    if (!isFree && (price === "" || Number(price) < 0)) {
      setError("가격을 입력하거나 나눔을 선택해주세요.");
      return;
    }

    startTransition(async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("로그인이 필요해요.");
        return;
      }

      const uploadedUrls: string[] = [];
      for (const file of newFiles) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(path, file);

        if (uploadError) {
          setError(`이미지 업로드에 실패했어요: ${uploadError.message}`);
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("listing-images").getPublicUrl(path);
        uploadedUrls.push(publicUrl);
      }

      const payload = {
        title: title.trim(),
        category,
        price: isFree ? 0 : Number(price),
        description: description.trim(),
        region: region.trim() || null,
        images: [...existingImages, ...uploadedUrls],
      };

      if (isEdit && listing) {
        const { error: updateError } = await supabase
          .from("listings")
          .update(payload)
          .eq("id", listing.id);

        if (updateError) {
          setError(updateError.message);
          return;
        }
        router.push(`/listings/${listing.id}`);
      } else {
        const { data: inserted, error: insertError } = await supabase
          .from("listings")
          .insert({ ...payload, seller_id: user.id })
          .select("id")
          .single();

        if (insertError || !inserted) {
          setError(insertError?.message ?? "등록에 실패했어요.");
          return;
        }
        router.push(`/listings/${inserted.id}`);
      }
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-medium text-roast-600">
          사진 ({existingImages.length + newFiles.length}/{MAX_IMAGES})
        </p>
        <div className="flex flex-wrap gap-2">
          {existingImages.map((url) => (
            <div
              key={url}
              className="relative h-20 w-20 overflow-hidden rounded-xl bg-goguma-100"
            >
              <Image src={url} alt="" fill sizes="80px" className="object-cover" />
              <button
                type="button"
                onClick={() =>
                  setExistingImages((prev) => prev.filter((u) => u !== url))
                }
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-roast-700/70 text-xs text-white"
                aria-label="이미지 삭제"
              >
                ✕
              </button>
            </div>
          ))}

          {newFiles.map((file, i) => (
            <div
              key={i}
              className="relative h-20 w-20 overflow-hidden rounded-xl bg-goguma-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setNewFiles((prev) => prev.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-roast-700/70 text-xs text-white"
                aria-label="이미지 삭제"
              >
                ✕
              </button>
            </div>
          ))}

          {remainingSlots > 0 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-20 w-20 flex-col items-center justify-center gap-0.5 rounded-xl border border-dashed border-goguma-300 text-goguma-500 hover:bg-goguma-50"
            >
              <span aria-hidden className="text-lg">
                📷
              </span>
              <span className="text-xs">추가</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-roast-600">
          제목
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="rounded-xl border border-goguma-200 bg-white px-4 py-3 text-roast-700 outline-none placeholder:text-roast-300 focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100"
          placeholder="글 제목을 입력해주세요"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-sm font-medium text-roast-600">
          카테고리
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-goguma-200 bg-white px-4 py-3 text-roast-700 outline-none focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="price" className="text-sm font-medium text-roast-600">
            가격
          </label>
          <label className="flex items-center gap-1.5 text-sm text-roast-500">
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="accent-goguma-500"
            />
            나눔이에요
          </label>
        </div>
        <input
          id="price"
          type="number"
          min={0}
          value={isFree ? "" : price}
          disabled={isFree}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-xl border border-goguma-200 bg-white px-4 py-3 text-roast-700 outline-none placeholder:text-roast-300 focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100 disabled:bg-cream-100 disabled:text-roast-300"
          placeholder="가격을 입력해주세요"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-roast-600">
          설명
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="resize-none rounded-xl border border-goguma-200 bg-white px-4 py-3 text-roast-700 outline-none placeholder:text-roast-300 focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100"
          placeholder="물건 상태, 거래 방법 등을 자세히 적어주세요"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="region" className="text-sm font-medium text-roast-600">
          동네
        </label>
        <input
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-xl border border-goguma-200 bg-white px-4 py-3 text-roast-700 outline-none placeholder:text-roast-300 focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100"
          placeholder="예: 서울시 강남구"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-goguma-50 px-3 py-2 text-sm text-goguma-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-goguma-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-goguma-600 disabled:opacity-60"
      >
        {isPending ? "저장 중..." : isEdit ? "수정 완료" : "등록하기"}
      </button>
    </form>
  );
}
