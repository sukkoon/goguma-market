"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthState } from "@/lib/actions/auth";

const initialState: AuthState = { error: null };

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="nickname"
          className="text-sm font-medium text-roast-600"
        >
          닉네임
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          autoComplete="nickname"
          required
          minLength={2}
          maxLength={20}
          className="rounded-xl border border-goguma-200 bg-white px-4 py-3 text-roast-700 outline-none placeholder:text-roast-300 focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100"
          placeholder="동네에서 불릴 이름"
        />
      </div>

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
          autoComplete="new-password"
          required
          minLength={6}
          className="rounded-xl border border-goguma-200 bg-white px-4 py-3 text-roast-700 outline-none placeholder:text-roast-300 focus:border-goguma-400 focus:ring-2 focus:ring-goguma-100"
          placeholder="6자 이상 입력해주세요"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-goguma-50 px-3 py-2 text-sm text-goguma-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-full bg-goguma-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-goguma-600 disabled:opacity-60"
      >
        {isPending ? "가입 중..." : "회원가입"}
      </button>

      <p className="text-center text-sm text-roast-400">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-goguma-600 hover:underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
