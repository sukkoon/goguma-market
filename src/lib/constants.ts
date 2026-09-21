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

export const LISTING_STATUS = {
  selling: "판매중",
  reserved: "예약중",
  sold: "거래완료",
} as const;

export type ListingStatus = keyof typeof LISTING_STATUS;
