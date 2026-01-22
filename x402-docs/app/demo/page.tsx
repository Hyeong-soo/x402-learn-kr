"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Settings,
  Rocket,
  ExternalLink,
  ArrowRight,
  Eye,
  Lock,
  CheckCircle2,
  PartyPopper,
  Trophy,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  Coins,
  TrendingDown,
  Zap,
} from "lucide-react";
import { ConfigBlock, CopyableCodeBlock } from "@/components/ConfigBlock";
import { QuickStartWallet } from "@/components/wallet";

interface GeneratedWallet {
  privateKey: string;
  address: string;
}

export default function DemoPage() {
  const [flagInput, setFlagInput] = useState("");
  const [verificationState, setVerificationState] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [generatedWallet, setGeneratedWallet] = useState<GeneratedWallet | null>(null);

  // Determine if wallet step is completed
  const isWalletStepCompleted = generatedWallet !== null;
  const currentAddress = generatedWallet?.address;

  const copyAddress = async () => {
    if (currentAddress) {
      await navigator.clipboard.writeText(currentAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const [isVerifying, setIsVerifying] = useState(false);

  const verifyFlag = async () => {
    if (!flagInput.trim() || isVerifying) return;

    setIsVerifying(true);
    try {
      const response = await fetch("/api/verify-flag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flag: flagInput.trim() }),
      });

      const result = await response.json();

      if (result.success) {
        setVerificationState("success");
      } else {
        setVerificationState("error");
        setTimeout(() => setVerificationState("idle"), 3000);
      }
    } catch (error) {
      setVerificationState("error");
      setTimeout(() => setVerificationState("idle"), 3000);
    } finally {
      setIsVerifying(false);
    }
  };

  const claudeDesktopConfig = `// 설정 파일 위치:
// Mac: ~/Library/Application Support/Claude/claude_desktop_config.json
// Windows: %APPDATA%\\Claude\\claude_desktop_config.json
{
  "mcpServers": {
    "x402": {
      "command": "npx",
      "args": ["-y", "x402-fetch-mcp"]
    }
  }
}

// 설정 후 Claude Desktop 재시작 필요`;

  const claudeCodeConfig = generatedWallet
    ? `# Step 1: 프라이빗 키 설정
# 키는 ~/.x402/config.json에 안전하게 저장됩니다
npx x402-fetch-mcp setup
# Enter your private key: ${generatedWallet.privateKey}
# Network [baseSepolia]: (엔터)

# Step 2: MCP 서버 등록
claude mcp add x402 -- npx x402-fetch-mcp

# Step 3: 설치 확인
claude mcp list
# 출력: x402 - ✓ Connected`
    : `# Step 1: 프라이빗 키 설정
# 키는 ~/.x402/config.json에 안전하게 저장됩니다
npx x402-fetch-mcp setup
# Enter your private key: 0x...
# Network [baseSepolia]: (엔터)

# Step 2: MCP 서버 등록
claude mcp add x402 -- npx x402-fetch-mcp

# Step 3: 설치 확인
claude mcp list
# 출력: x402 - ✓ Connected`;

  const testPrompt = `https://www.learn402.xyz/demo/protected-content 를 fetch 도구로 가져와줘`;

  // Stepper 상태 계산
  const getStepStatus = (stepNum: number) => {
    const walletReady = isWalletStepCompleted;

    if (stepNum === 0) return walletReady ? "completed" : "current";
    if (stepNum === 1) return walletReady ? "current" : "pending";
    if (stepNum === 2) return walletReady ? "current" : "pending";
    if (stepNum === 3) return walletReady ? "current" : "pending";
    return "pending";
  };

  // Success celebration view
  if (verificationState === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 text-center px-4 max-w-2xl">
          <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <PartyPopper className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <PartyPopper className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4">
            축하합니다! 🎉
          </h1>
          <p className="text-lg sm:text-xl text-emerald-400 font-semibold mb-2">
            x402 테스트 성공!
          </p>
          <p className="text-sm sm:text-base text-white/60 mb-6 sm:mb-8">
            AI 에이전트가 x402 프로토콜을 통해 성공적으로 결제하고
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>보호된 콘텐츠에 접근했습니다.
          </p>

          {/* Token Savings Card */}
          <div className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-cyan-500/30">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 shrink-0" />
              <span className="text-white font-semibold text-sm sm:text-base">컨텍스트 윈도우 절약</span>
              <span className="text-[10px] sm:text-xs text-white/40">(실측)</span>
            </div>

            {/* Comparison Table */}
            <div className="space-y-2 sm:space-y-3 mb-4">
              <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-emerald-400">x402 Markdown</span>
                </div>
                <div className="text-right">
                  <span className="text-base sm:text-lg font-bold text-emerald-400">~606</span>
                  <span className="text-[10px] sm:text-xs text-white/50 ml-1">tokens</span>
                  <span className="text-[10px] sm:text-xs text-white/30 ml-1 hidden sm:inline">(2.4KB)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-red-400">HTML 크롤링 시</span>
                </div>
                <div className="text-right">
                  <span className="text-base sm:text-lg font-bold text-red-400">~5,900</span>
                  <span className="text-[10px] sm:text-xs text-white/50 ml-1">tokens</span>
                  <span className="text-[10px] sm:text-xs text-white/30 ml-1 hidden sm:inline">(24KB)</span>
                </div>
              </div>
            </div>

            {/* API Cost Comparison - Opus 4.5 */}
            <div className="p-3 sm:p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 mb-4">
              <p className="text-[10px] sm:text-xs text-purple-400 mb-2 sm:mb-3 font-medium">Claude Opus 4.5 기준 ($5/1M tokens)</p>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">HTML 크롤링 시 API 비용</span>
                  <span className="text-red-400 font-mono">$0.0295</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">x402 사용 시 API 비용</span>
                  <span className="text-emerald-400 font-mono">$0.0030</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-1.5 sm:pt-2">
                  <span className="text-white/60">API 비용 절약</span>
                  <span className="text-cyan-400 font-mono">$0.0265</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">x402 콘텐츠 비용</span>
                  <span className="text-amber-400 font-mono">-$0.0100</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-1.5 sm:pt-2">
                  <span className="text-white font-medium">순이익</span>
                  <span className="text-emerald-400 font-bold font-mono">+$0.0165</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
              <div className="p-2 sm:p-3 rounded-lg bg-cyan-500/10 text-center">
                <p className="text-xl sm:text-2xl font-bold text-cyan-400">90%</p>
                <p className="text-[10px] sm:text-xs text-white/50">토큰 절약</p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-emerald-500/10 text-center">
                <p className="text-xl sm:text-2xl font-bold text-emerald-400">2.6x</p>
                <p className="text-[10px] sm:text-xs text-white/50">비용 대비 이득</p>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-purple-500/10 text-center">
                <p className="text-xl sm:text-2xl font-bold text-purple-400">165%</p>
                <p className="text-[10px] sm:text-xs text-white/50">ROI</p>
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-xs sm:text-sm text-yellow-400">
                💡 x402에 <strong className="text-yellow-300">$0.01 지불하면 API 비용 $0.027 절약</strong> →
                콘텐츠 제공자도, AI 사용자도 이득입니다.
              </p>
            </div>
          </div>

          <div className="glass rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-left">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
              <span className="text-white font-semibold text-sm sm:text-base">완료된 항목</span>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-white/70 text-sm sm:text-base">
              <li className="flex items-center gap-2 sm:gap-3">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
                지갑 연결 및 설정 완료
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
                MCP 서버 연결 성공
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
                x402 결제 처리 성공 ($0.01 USDC)
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
                보호된 콘텐츠 접근 성공
              </li>
            </ul>
          </div>

          <div className="glass rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 border border-emerald-500/30">
            <p className="text-xs sm:text-sm text-white/50 mb-1.5 sm:mb-2">검증된 플래그</p>
            <code className="text-emerald-400 font-mono text-sm sm:text-lg break-all">{flagInput}</code>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors text-sm sm:text-base"
            >
              구현 가이드 보기
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <button
              onClick={() => {
                setVerificationState("idle");
                setFlagInput("");
              }}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl glass text-white hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              다시 테스트하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10 max-w-4xl px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Rocket className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-white/80">시작 가이드</span>
            </div>
            <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 break-keep">
              AI 에이전트에 지갑 연결하기
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto">
              4단계로 AI 에이전트가 x402 결제를 할 수 있도록 설정하세요.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Claude Desktop 또는 Claude Code에서 테스트할 수 있습니다.
            </p>
          </div>

          {/* Demo Links */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-8 sm:mb-12">
            <Link
              href="/demo/visualizer"
              className="glass glass-hover rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-4 group border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/20 shrink-0">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors text-sm sm:text-base truncate">
                  결제 플로우 시각화
                </h3>
                <p className="text-xs sm:text-sm text-white/50 truncate">애니메이션으로 전체 과정 보기</p>
              </div>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
            </Link>
            <Link
              href="/demo/paywall"
              className="glass glass-hover rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-4 group border border-amber-500/20 hover:border-amber-500/40 transition-colors"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-amber-500/20 shrink-0">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors text-sm sm:text-base truncate">
                  페이월 체험
                </h3>
                <p className="text-xs sm:text-sm text-white/50 truncate">사람 vs AI 접근 비교</p>
              </div>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
            </Link>
          </div>

          {/* Progress Stepper */}
          <div className="flex items-center justify-between mb-8 px-2 sm:px-4">
            {["지갑 연결", "USDC 받기", "MCP 설정", "테스트"].map((label, idx) => {
              const status = getStepStatus(idx);
              return (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-colors ${
                        status === "completed"
                          ? "bg-emerald-500 text-black"
                          : status === "current"
                          ? "bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs mt-1 whitespace-nowrap ${
                        status === "completed" || status === "current"
                          ? "text-white/80"
                          : "text-white/40"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div
                      className={`w-8 sm:w-16 md:w-24 h-0.5 mx-1 sm:mx-2 ${
                        getStepStatus(idx) === "completed"
                          ? "bg-emerald-500"
                          : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step 0: 지갑 설정 */}
          <div className={`glass rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6 ${isWalletStepCompleted ? "border border-emerald-500/30" : ""}`}>
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-bold shrink-0 text-sm sm:text-base ${
                  isWalletStepCompleted
                    ? "bg-emerald-500 text-black"
                    : "bg-cyan-500/20 text-cyan-400"
                }`}
              >
                {isWalletStepCompleted ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : "1"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                  <h2 className="text-lg sm:text-xl font-semibold text-white">지갑 설정하기</h2>
                  {isWalletStepCompleted && (
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      완료
                    </span>
                  )}
                </div>
                <p className="text-white/60 text-sm sm:text-base">
                  테스트 전용 지갑을 생성합니다.
                </p>
              </div>
            </div>

            <div className="ml-0 sm:ml-14">
              <QuickStartWallet
                onWalletGenerated={setGeneratedWallet}
              />
            </div>
          </div>

          {/* Step 1: 테스트 USDC 받기 */}
          <div className="glass rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-bold shrink-0 bg-purple-500/20 text-purple-400 text-sm sm:text-base">
                2
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  <h2 className="text-lg sm:text-xl font-semibold text-white">테스트 USDC 받기</h2>
                </div>
                <p className="text-white/60 text-sm sm:text-base">
                  Circle Faucet에서 무료로 테스트 USDC를 받으세요. (Base Sepolia 네트워크)
                </p>
              </div>
            </div>

            <div className="ml-0 sm:ml-14 space-y-3 sm:space-y-4">
              {currentAddress && (
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-purple-400 font-medium">내 지갑 주소</p>
                    <button
                      onClick={copyAddress}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          복사됨
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          복사
                        </>
                      )}
                    </button>
                  </div>
                  <code className="text-white font-mono text-sm break-all">{currentAddress}</code>
                </div>
              )}

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/80 font-medium">Circle Faucet에서 USDC 받기</p>
                  <p className="text-white/50 text-sm mt-1">
                    Base Sepolia 네트워크 선택 → 위 지갑 주소 붙여넣기 → 1 USDC 받기
                  </p>
                  <a
                    href="https://faucet.circle.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm mt-2"
                  >
                    faucet.circle.com 바로가기
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: MCP 서버 설정 */}
          <div className="glass rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold shrink-0 text-sm sm:text-base">
                3
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                  <h2 className="text-lg sm:text-xl font-semibold text-white">MCP 서버 설정</h2>
                  <a
                    href="https://www.npmjs.com/package/x402-fetch-mcp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    npm
                  </a>
                </div>
                <p className="text-white/60 text-sm sm:text-base">
                  <code className="text-emerald-400 bg-emerald-500/10 px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm">x402-fetch-mcp</code> 패키지를 설치하세요.
                  프라이빗 키만 있으면 됩니다.
                </p>
              </div>
            </div>

            <div className="ml-0 sm:ml-14">
              {/* Auto-inserted key indicator */}
              {generatedWallet && (
                <div className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium text-sm">
                      프라이빗 키가 자동 삽입되었습니다
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mt-1 ml-7">
                    위에서 생성한 테스트 지갑의 키가 아래 설정에 이미 포함되어 있습니다.
                  </p>
                </div>
              )}

              <ConfigBlock
                tabs={[
                  {
                    id: "code",
                    label: "Claude Code",
                    code: claudeCodeConfig,
                    language: "bash",
                  },
                  {
                    id: "desktop",
                    label: "Claude Desktop",
                    code: claudeDesktopConfig,
                    language: "json",
                  },
                ]}
              />

              {/* 보안 경고 */}
              <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-red-400 font-medium text-sm">보안 주의사항</p>
                    <p className="text-white/60 text-sm mt-1">
                      프라이빗 키는 절대 공유하지 마세요. 테스트용 지갑과 메인 지갑을 분리하여 사용하는 것을 강력히 권장합니다.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Step 3: 테스트 */}
          <div className="glass rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 text-blue-400 font-bold shrink-0 text-sm sm:text-base">
                4
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <Rocket className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                  <h2 className="text-lg sm:text-xl font-semibold text-white">테스트하기</h2>
                </div>
                <p className="text-white/60 text-sm sm:text-base">
                  Claude에게 보호된 콘텐츠에 접근해달라고 요청하세요.
                </p>
              </div>
            </div>

            <div className="ml-0 sm:ml-14 space-y-3 sm:space-y-4">
              <CopyableCodeBlock code={testPrompt} language="text" label="프롬프트 예시" />

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 font-medium text-sm mb-2">예상 결과</p>
                <ol className="text-white/60 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono">1.</span>
                    Claude가 페이지에 접속 시도
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono">2.</span>
                    서버가 402 Payment Required 응답
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono">3.</span>
                    MCP 서버가 자동으로 $0.01 USDC 결제
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono">4.</span>
                    마크다운 콘텐츠 + 성공 플래그 수신
                  </li>
                </ol>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/demo/protected-content"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  <Lock className="h-4 w-4" />
                  보호된 콘텐츠 직접 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 4: 플래그 검증 */}
          <div className="glass rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-yellow-500/30">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-yellow-500/20 text-yellow-400 font-bold shrink-0">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                  <h2 className="text-lg sm:text-xl font-semibold text-white">성공 확인</h2>
                </div>
                <p className="text-white/60 text-sm sm:text-base">
                  AI가 받은 플래그를 입력해서 테스트 성공을 확인하세요.
                </p>
              </div>
            </div>

            <div className="ml-0 sm:ml-14">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="x402_SUCCESS_XXXXXXXX"
                  className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-black/30 border text-white placeholder-white/30 font-mono text-sm sm:text-base focus:outline-none focus:ring-2 transition-all ${
                    verificationState === "error"
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-white/10 focus:ring-emerald-500/50"
                  }`}
                />
                <button
                  onClick={verifyFlag}
                  disabled={!flagInput.trim() || isVerifying}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  {isVerifying ? "검증 중..." : "검증하기"}
                </button>
              </div>
              {verificationState === "error" && (
                <p className="text-red-400 text-xs sm:text-sm mt-2">
                  유효하지 않은 플래그입니다. AI 응답에서 정확한 플래그를 복사해주세요.
                </p>
              )}
              <p className="text-white/40 text-[10px] sm:text-xs mt-2 sm:mt-3">
                플래그는 <code className="bg-black/30 px-1 sm:px-1.5 py-0.5 rounded">x402_SUCCESS_</code>로 시작합니다.
              </p>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="glass rounded-2xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">추가 리소스</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <a
                href="https://www.npmjs.com/package/x402-fetch-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors border border-red-500/20"
              >
                <div className="text-red-400 font-medium text-xs sm:text-sm truncate">x402-fetch-mcp</div>
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400/60 shrink-0" />
              </a>
              <a
                href="https://github.com/coinbase/x402"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-white/80 text-xs sm:text-sm truncate">x402 GitHub</div>
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/40 shrink-0" />
              </a>
              <a
                href="https://faucet.circle.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-white/80 text-xs sm:text-sm truncate">Circle Faucet</div>
                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/40 shrink-0" />
              </a>
              <Link
                href="/docs"
                className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-white/80 text-xs sm:text-sm truncate">구현 가이드</div>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/40 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
