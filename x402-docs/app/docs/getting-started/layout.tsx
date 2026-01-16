import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/docs/getting-started`;

export const metadata: Metadata = {
  title: "빠른 시작 가이드",
  description:
    "x402를 프로젝트에 5분 안에 통합하는 방법을 알아봅니다. Next.js, Express 등 프레임워크별 설정과 미들웨어 구성 방법을 단계별로 설명합니다.",
  keywords: ["x402 시작하기", "x402 설치", "x402 미들웨어", "Next.js x402", "Express x402"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 빠른 시작 가이드",
    description: "5분 안에 x402를 프로젝트에 통합하는 방법",
    type: "article",
    url: PAGE_URL,
    images: [`${BASE_URL}/docs/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 빠른 시작 가이드",
    description: "5분 안에 x402를 프로젝트에 통합하기",
    images: [`${BASE_URL}/docs/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "문서", url: `${BASE_URL}/docs` },
          { name: "빠른 시작", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
