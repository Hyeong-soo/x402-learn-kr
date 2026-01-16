import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { HumanVerification } from "@/components/human-verification";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "x402 한국어 학습 허브",
  description:
    "AI 에이전트 결제 프로토콜 x402를 한국어로 배워보세요. 인터랙티브 데모와 시각화로 쉽게 이해할 수 있습니다.",
  openGraph: {
    title: "x402 한국어 학습 허브",
    description: "AI 에이전트 결제 프로토콜 x402를 한국어로 배워보세요",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
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
                x402 프로토콜 한국어 학습 허브
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
