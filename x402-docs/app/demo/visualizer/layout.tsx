import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/demo/visualizer`;

export const metadata: Metadata = {
  title: "결제 플로우 시각화",
  description:
    "x402 프로토콜의 결제 플로우를 애니메이션으로 시각화합니다. 클라이언트, 서버, 퍼실리테이터, 블록체인 간의 상호작용을 단계별로 확인하세요.",
  keywords: ["x402 시각화", "결제 플로우", "프로토콜 애니메이션", "x402 데모"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 결제 플로우 시각화",
    description: "x402 프로토콜의 결제 플로우를 애니메이션으로 확인",
    type: "website",
    url: PAGE_URL,
    images: [`${BASE_URL}/demo/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 결제 플로우 시각화",
    description: "결제 플로우 애니메이션 데모",
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
          { name: "시각화", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
