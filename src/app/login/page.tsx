import LoginForm from "@/components/login-form";
import SweetPotatoMascot from "@/components/sweet-potato-mascot";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-goguma-100 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <SweetPotatoMascot className="mx-auto h-24 w-24" />
          <p className="mx-auto mt-4 max-w-[260px] text-sm leading-relaxed text-roast-500">
            &ldquo;당신과의 따뜻한 거래로 오늘 하루 기쁨이 두 배가 되었어요.
            감사합니다.&rdquo;
          </p>
          <h1 className="mt-4 text-xl font-bold text-roast-700">
            다시 오셨네요!
          </h1>
          <p className="mt-1 text-sm text-roast-400">
            로그인하고 동네 거래를 이어가요
          </p>
        </div>
        <LoginForm initialError={error} next={next} />
      </div>
    </div>
  );
}
