"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type AuthState } from "@/lib/actions/auth";

const initialState: AuthState = { error: null };

export default function LoginForm({
  initialError,
  next,
}: {
  initialError?: string;
  next?: string;
}) {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const error = state.error ?? initialError;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {next && <input type="hidden" name="next" value={next} />}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-roast-600">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded-xl border border-goguma-200 bg-white px-4 py-3 text-roast-700 outline-none placeholder:text-roast-300 focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100"
          placeholder="goguma@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-roast-600"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-xl border border-goguma-200 bg-white px-4 py-3 text-roast-700 outline-none placeholder:text-roast-300 focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100"
          placeholder="비밀번호"
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
        className="mt-2 rounded-full bg-goguma-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-goguma-600 disabled:opacity-60"
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>

      <p className="text-center text-sm text-roast-400">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="font-medium text-goguma-600 hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
