export const CATEGORIES = [
  "디지털기기",
  "가구/인테리어",
  "생활/가공식품",
  "의류",
  "뷰티/미용",
  "스포츠/레저",
  "취미/게임/음반",
  "도서",
  "반려동물용품",
  "유아동",
  "기타",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_ICONS: Record<Category, string> = {
  디지털기기: "📱",
  "가구/인테리어": "🛋️",
  "생활/가공식품": "🥫",
  의류: "👕",
  "뷰티/미용": "💄",
  "스포츠/레저": "⚽",
  "취미/게임/음반": "🎮",
  도서: "📚",
  반려동물용품: "🐾",
  유아동: "🧸",
  기타: "📦",
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  디지털기기: "스마트폰, 노트북 등 다양한 전자기기를 만나보세요.",
  "가구/인테리어": "집을 꾸며줄 가구와 인테리어 소품을 찾아보세요.",
  "생활/가공식품": "생활용품과 식품을 이웃과 나눠보세요.",
  의류: "깨끗한 옷과 패션 아이템을 저렴하게 만나보세요.",
  "뷰티/미용": "미개봉·소량 사용 뷰티 제품을 확인해보세요.",
  "스포츠/레저": "운동기구와 레저용품을 알뜰하게 구해보세요.",
  "취미/게임/음반": "게임, 음반, 취미용품을 나눠보세요.",
  도서: "다 읽은 책을 이웃과 나눠보세요.",
  반려동물용품: "반려동물을 위한 용품을 찾아보세요.",
  유아동: "아이 용품을 합리적인 가격에 만나보세요.",
  기타: "그 밖의 다양한 물건들을 확인해보세요.",
};

export const ALL_CATEGORY = {
  label: "전체",
  icon: "🍠",
  description: "동네 이웃들이 올린 모든 물건을 만나보세요.",
} as const;

export const CATEGORY_SLUGS: Record<Category, string> = {
  디지털기기: "digital",
  "가구/인테리어": "furniture",
  "생활/가공식품": "grocery",
  의류: "clothing",
  "뷰티/미용": "beauty",
  "스포츠/레저": "sports",
  "취미/게임/음반": "hobby",
  도서: "books",
  반려동물용품: "pet",
  유아동: "kids",
  기타: "etc",
};

export function categoryFromSlug(slug: string): Category | null {
  const found = CATEGORIES.find((c) => CATEGORY_SLUGS[c] === slug);
  return found ?? null;
}

export const LISTING_STATUS = {
  selling: "판매중",
  reserved: "예약중",
  sold: "거래완료",
} as const;

export type ListingStatus = keyof typeof LISTING_STATUS;
