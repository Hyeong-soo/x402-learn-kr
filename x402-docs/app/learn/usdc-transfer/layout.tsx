import type { Metadata } from "next";
import { ArticleSchema } from "@/components/StructuredData";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/learn/usdc-transfer`;

export const metadata: Metadata = {
  title: "USDC 가스리스 전송",
  description:
    "EIP-3009 transferWithAuthorization 함수를 통한 USDC 가스리스 전송의 작동 방식을 설명합니다. 서명만으로 제3자가 토큰 전송을 실행하는 원리를 알아봅니다.",
  keywords: ["USDC", "가스리스 전송", "transferWithAuthorization", "EIP-3009", "메타 트랜잭션"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "USDC 가스리스 전송",
    description: "EIP-3009 transferWithAuthorization을 통한 가스리스 전송 원리",
    type: "article",
    url: PAGE_URL,
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "USDC 가스리스 전송",
    description: "transferWithAuthorization을 통한 가스리스 전송 원리",
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleSchema
        title="USDC 가스리스 전송"
        description="EIP-3009 transferWithAuthorization 함수를 통한 USDC 가스리스 전송의 작동 방식을 설명합니다. 서명만으로 제3자가 토큰 전송을 실행하는 원리를 알아봅니다."
        url={PAGE_URL}
        section="DeFi"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "배우기", url: `${BASE_URL}/learn` },
          { name: "USDC 전송", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
