import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nickname = user?.user_metadata?.nickname as string | undefined;

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-goguma-50 via-cream-100 to-cream-100 px-4 py-20 text-center">
      <span className="text-5xl" aria-hidden>
        🍠
      </span>

      {user ? (
        <>
          <h1 className="mt-4 text-2xl font-bold text-roast-700 sm:text-3xl">
            {nickname ?? user.email}님, 오늘도 따뜻한 거래 되세요
          </h1>
          <p className="mt-3 max-w-md text-roast-400">
            동네 이웃과 나누는 훈훈한 중고거래, 고구마마켓과 함께해요.
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-4 text-2xl font-bold text-roast-700 sm:text-3xl">
            군고구마처럼 따뜻한 동네 거래
          </h1>
          <p className="mt-3 max-w-md text-roast-400">
            고구마마켓에서 이웃과 물건을 나누고, 정을 나눠보세요.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/signup"
              className="rounded-full bg-goguma-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-goguma-600"
            >
              회원가입하고 시작하기
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-goguma-200 bg-white px-6 py-3 text-sm font-semibold text-roast-600 transition-colors hover:bg-goguma-50"
            >
              로그인
            </Link>
          </div>
        </>
      )}

      <p className="mt-16 text-xs text-roast-300">
        다음 단계에서 동네 상품 등록과 거래 기능이 채워질 예정이에요 🍠
      </p>
    </div>
  );
}
