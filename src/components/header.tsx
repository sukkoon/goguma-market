import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/logout-button";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nickname =
    (user?.user_metadata?.nickname as string | undefined) ?? user?.email;

  return (
    <header className="sticky top-0 z-10 border-b border-goguma-100 bg-cream-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xl font-bold text-goguma-600"
        >
          <span aria-hidden>🍠</span>
          고구마마켓
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-roast-500 sm:inline">
              {nickname}님, 안녕하세요
            </span>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-roast-600 transition-colors hover:bg-goguma-50"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-goguma-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-goguma-600"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
