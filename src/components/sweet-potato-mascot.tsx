export default function SweetPotatoMascot({
  className = "h-24 w-24",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="귀여운 고구마 캐릭터"
    >
      <defs>
        <linearGradient id="potatoBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffa763" />
          <stop offset="100%" stopColor="#d9632a" />
        </linearGradient>
      </defs>

      {/* 그림자 */}
      <ellipse cx="100" cy="178" rx="52" ry="8" fill="#b44d22" opacity="0.15" />

      {/* 몸통 */}
      <path
        d="M62 40
           C40 45, 26 72, 30 102
           C33 128, 48 158, 82 168
           C118 178, 156 158, 166 122
           C176 86, 156 46, 118 34
           C100 28, 80 32, 62 40 Z"
        fill="url(#potatoBody)"
      />

      {/* 그을린 반점 */}
      <ellipse cx="55" cy="70" rx="10" ry="7" fill="#8f3d1f" opacity="0.35" />
      <ellipse cx="140" cy="60" rx="8" ry="6" fill="#8f3d1f" opacity="0.3" />
      <ellipse cx="150" cy="120" rx="9" ry="6" fill="#8f3d1f" opacity="0.3" />
      <ellipse cx="70" cy="145" rx="7" ry="5" fill="#8f3d1f" opacity="0.25" />

      {/* 볼 홍조 */}
      <ellipse cx="68" cy="108" rx="11" ry="7" fill="#ffc99a" opacity="0.9" />
      <ellipse cx="132" cy="104" rx="11" ry="7" fill="#ffc99a" opacity="0.9" />

      {/* 눈 (감고 웃는 눈) */}
      <path
        d="M60 90 Q68 82, 76 90"
        stroke="#3a281f"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M124 90 Q132 82, 140 90"
        stroke="#3a281f"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* 입 */}
      <path
        d="M88 116 Q100 128, 112 116"
        stroke="#3a281f"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* 새싹 잎 */}
      <path
        d="M100 34 C94 20, 78 16, 68 22 C76 32, 90 36, 100 34 Z"
        fill="#8fbf6b"
      />
      <path
        d="M100 34 C106 18, 122 12, 134 18 C126 30, 112 36, 100 34 Z"
        fill="#7bab59"
      />
    </svg>
  );
}
