import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { HumanVerification } from "@/components/human-verification";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { WalletProvider } from "@/lib/wagmi/provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://x402-learn-kr.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "x402-learn-kr - AI 에이전트 결제 프로토콜 학습",
    template: "%s | x402-learn-kr",
  },
  description:
    "AI 에이전트 결제 프로토콜 x402를 한국어로 배워보세요. 인터랙티브 데모와 시각화로 쉽게 이해할 수 있습니다.",
  keywords: ["x402", "HTTP 402", "AI 결제", "마이크로페이먼트", "USDC", "블록체인", "AI 에이전트", "결제 프로토콜"],
  authors: [{ name: "x402-learn-kr" }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "x402-learn-kr - AI 에이전트 결제 프로토콜 학습",
    description: "AI 에이전트 결제 프로토콜 x402를 한국어로 배워보세요. 인터랙티브 데모와 시각화로 쉽게 이해할 수 있습니다.",
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "x402-learn-kr",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "x402-learn-kr - AI 에이전트 결제 프로토콜",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402-learn-kr - AI 에이전트 결제 프로토콜 학습",
    description: "AI 에이전트 결제 프로토콜 x402를 한국어로 배워보세요. 인터랙티브 데모와 시각화로 쉽게 이해할 수 있습니다.",
    images: [`${BASE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "x402-learn-kr",
      description: "AI 에이전트 결제 프로토콜 x402를 한국어로 배워보세요",
      inLanguage: "ko-KR",
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "x402-learn-kr",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
      },
      sameAs: ["https://github.com/anthropics/x402"],
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "x402-learn-kr - AI 에이전트 결제 프로토콜 학습",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      description: "AI 에이전트 결제 프로토콜 x402를 한국어로 배워보세요. 인터랙티브 데모와 시각화로 쉽게 이해할 수 있습니다.",
      inLanguage: "ko-KR",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#0a0a0a" />
        <GoogleAnalytics />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <WalletProvider>
          <HumanVerification />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-white/5 py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                <p className="text-center text-sm leading-loose text-white/40 md:text-left">
                  Built with{" "}
                  <a
                    href="https://x402.org"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-white/60 hover:text-emerald-400 transition-colors underline underline-offset-4"
                  >
                    x402 Protocol
                  </a>
                </p>
                <p className="text-center text-sm text-white/40 md:text-right">
                  x402-learn-kr
                </p>
              </div>
            </footer>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
