import SignupForm from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-goguma-100 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <span className="text-3xl" aria-hidden>
            🍠
          </span>
          <h1 className="mt-2 text-xl font-bold text-roast-700">
            고구마마켓에 오신 걸 환영해요
          </h1>
          <p className="mt-1 text-sm text-roast-400">
            따뜻한 동네 거래, 지금 시작해볼까요?
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
