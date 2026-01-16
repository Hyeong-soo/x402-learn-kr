import type { Metadata } from "next";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/demo`;

export const metadata: Metadata = {
  title: "인터랙티브 데모",
  description:
    "사람과 AI 에이전트가 같은 페이지에 접근할 때 어떤 차이가 있는지 직접 체험해보세요. 결제 플로우 시각화와 페이월 데모를 제공합니다.",
  keywords: ["x402 데모", "AI 결제 체험", "페이월 데모", "HTTP 402 테스트"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 인터랙티브 데모",
    description: "사람과 AI 에이전트의 접근 차이를 직접 체험해보세요.",
    type: "website",
    url: PAGE_URL,
    images: [`${BASE_URL}/demo/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 인터랙티브 데모",
    description: "사람과 AI 에이전트의 접근 차이를 직접 체험해보세요.",
    images: [`${BASE_URL}/demo/opengraph-image`],
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
