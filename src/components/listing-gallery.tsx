"use client";

import { useState } from "react";
import Image from "next/image";
import { CATEGORY_ICONS, type Category } from "@/lib/constants";

export default function ListingGallery({
  images,
  title,
  category,
}: {
  images: string[];
  title: string;
  category: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-goguma-100 text-6xl">
        {CATEGORY_ICONS[category as Category] ?? "🍠"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-goguma-100">
        <Image
          src={images[active]}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 512px"
          className="object-cover"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((url, i) => (
            <button
              key={url}
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ${
                i === active ? "ring-2 ring-goguma-500" : "opacity-70"
              }`}
            >
              <Image src={url} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
