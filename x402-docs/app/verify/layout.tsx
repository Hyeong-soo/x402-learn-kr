import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사람 확인 | Learn402",
  description: "브라우저 JavaScript 실행을 통해 사람임을 확인하는 페이지입니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
