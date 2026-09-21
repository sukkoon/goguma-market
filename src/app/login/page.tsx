import LoginForm from "@/components/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-goguma-100 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <span className="text-3xl" aria-hidden>
            🍠
          </span>
          <h1 className="mt-2 text-xl font-bold text-roast-700">
            다시 오셨네요!
          </h1>
          <p className="mt-1 text-sm text-roast-400">
            로그인하고 동네 거래를 이어가요
          </p>
        </div>
        <LoginForm initialError={error} />
      </div>
    </div>
  );
}
