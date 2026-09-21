import Link from "next/link";

export default function SignupSuccessPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-goguma-100 bg-white p-8 text-center shadow-sm">
        <span className="text-4xl" aria-hidden>
          📮
        </span>
        <h1 className="mt-3 text-xl font-bold text-roast-700">
          이메일을 확인해주세요
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-roast-400">
          가입하신 이메일 주소로 인증 링크를 보냈어요.
          <br />
          링크를 눌러야 로그인할 수 있어요.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-full bg-goguma-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-goguma-600"
        >
          로그인 화면으로 가기
        </Link>
      </div>
    </div>
  );
}
