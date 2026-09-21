"use client";

import { useTransition } from "react";
import { logout } from "@/lib/actions/auth";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logout())}
      disabled={isPending}
      className="rounded-full border border-goguma-200 px-4 py-2 text-sm font-medium text-roast-600 transition-colors hover:bg-goguma-50 disabled:opacity-50"
    >
      {isPending ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
