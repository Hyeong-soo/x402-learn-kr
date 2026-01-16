import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/demo/protected-content`;

export const metadata: Metadata = {
  title: "보호된 콘텐츠",
  description:
    "x402로 보호된 프리미엄 콘텐츠 예시 페이지입니다. 사람은 무료로 접근 가능하고, AI 에이전트는 $0.01 USDC를 결제해야 접근할 수 있습니다.",
  keywords: ["x402 보호 콘텐츠", "프리미엄 콘텐츠", "AI 결제 필요", "402 응답"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 보호된 콘텐츠",
    description: "x402로 보호된 프리미엄 콘텐츠 예시",
    type: "website",
    url: PAGE_URL,
    images: [`${BASE_URL}/demo/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 보호된 콘텐츠",
    description: "x402 보호 콘텐츠 예시",
    images: [`${BASE_URL}/demo/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "데모", url: `${BASE_URL}/demo` },
          { name: "보호 콘텐츠", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
