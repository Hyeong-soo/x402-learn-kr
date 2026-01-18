"use client";

import { useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import {
  Wallet,
  Settings,
  Rocket,
  ExternalLink,
  ArrowRight,
  Eye,
  Lock,
  CheckCircle2,
  AlertCircle,
  PartyPopper,
  Trophy,
  Sparkles,
  Key,
  Copy,
  Check,
  AlertTriangle,
} from "lucide-react";
import { ConfigBlock, CopyableCodeBlock } from "@/components/ConfigBlock";
import {
  WalletConnectButton,
  WalletInfo,
  WalletPathSelector,
  QuickStartWallet,
  WalletPath,
} from "@/components/wallet";
import { useWalletSetup } from "@/hooks/useWalletSetup";

interface GeneratedWallet {
  privateKey: string;
  address: string;
}

export default function DemoPage() {
  const [flagInput, setFlagInput] = useState("");
  const [verificationState, setVerificationState] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [walletPath, setWalletPath] = useState<WalletPath>("quick-start");
  const [generatedWallet, setGeneratedWallet] = useState<GeneratedWallet | null>(null);
  const { isConnected, address, usdcBalance, isCorrectNetwork, hasUsdc, step } = useWalletSetup();

  // Determine if wallet step is completed based on path
  const isWalletStepCompleted = walletPath === "quick-start"
    ? generatedWallet !== null
    : isConnected;

  const currentAddress = walletPath === "quick-start"
    ? generatedWallet?.address
    : address;

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

  // Dynamic MCP config with generated private key
  const privateKeyPlaceholder = generatedWallet?.privateKey || "0x...";
  const privateKeyDisplay = generatedWallet
    ? generatedWallet.privateKey
    : "0x... (위에서 지갑을 먼저 생성하세요)";

  const claudeDesktopConfig = `{
  "mcpServers": {
    "x402": {
      "command": "npx",
      "args": ["-y", "@serendb/x402-mcp-server"],
      "env": {
        "WALLET_PRIVATE_KEY": "${privateKeyPlaceholder}",
        "BASE_RPC_URL": "https://sepolia.base.org",
        "X402_GATEWAY_URL": "https://x402.org/facilitator"
      }
    }
  }
}`;

  const claudeCodeConfig = generatedWallet
    ? `# 환경변수 설정 (생성된 키가 자동 삽입되었습니다)
export WALLET_PRIVATE_KEY="${generatedWallet.privateKey}"
export BASE_RPC_URL="https://sepolia.base.org"
export X402_GATEWAY_URL="https://x402.org/facilitator"

# MCP 서버 추가
claude mcp add x402 -- npx -y @serendb/x402-mcp-server`
    : `# 1. 프라이빗 키 생성 (없으면)
node -e "console.log(require('viem/accounts').generatePrivateKey())"

# 2. 환경변수 설정
export WALLET_PRIVATE_KEY="0x..."
export BASE_RPC_URL="https://sepolia.base.org"
export X402_GATEWAY_URL="https://x402.org/facilitator"

# 3. MCP 서버 추가
claude mcp add x402 -- npx -y @serendb/x402-mcp-server`;

  const testPrompt = `learn402.xyz/demo/protected-content 페이지에 접속해서 내용을 알려줘.`;

  // Stepper 상태 계산
  const getStepStatus = (stepNum: number) => {
    // For quick-start path, check generated wallet; for existing wallet, check connection
    const walletReady = isWalletStepCompleted;
    // For USDC check: quick-start path doesn't auto-check balance, existing wallet does
    const usdcReady = walletPath === "existing-wallet" ? hasUsdc : walletReady;

    if (stepNum === 0) return walletReady ? "completed" : "current";
    if (stepNum === 1) return walletReady && usdcReady ? "completed" : walletReady ? "current" : "pending";
    if (stepNum === 2) return walletReady ? "current" : "pending";
    if (stepNum === 3) return walletReady ? "current" : "pending";
    return "pending";
  };

  // Success celebration view
  if (verificationState === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 text-center px-4 max-w-2xl">
          <div className="flex justify-center gap-4 mb-8">
            <PartyPopper className="h-12 w-12 text-yellow-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <Trophy className="h-16 w-16 text-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <PartyPopper className="h-12 w-12 text-yellow-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
            축하합니다! 🎉
          </h1>
          <p className="text-xl text-emerald-400 font-semibold mb-2">
            x402 테스트 성공!
          </p>
          <p className="text-white/60 mb-8">
            AI 에이전트가 x402 프로토콜을 통해 성공적으로 결제하고
            <br />
            보호된 콘텐츠에 접근했습니다.
          </p>

          <div className="glass rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              <span className="text-white font-semibold">완료된 항목</span>
            </div>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                지갑 연결 및 설정 완료
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                MCP 서버 연결 성공
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                x402 결제 처리 성공 ($0.01 USDC)
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                보호된 콘텐츠 접근 성공
              </li>
            </ul>
          </div>

          <div className="glass rounded-xl p-4 mb-8 border border-emerald-500/30">
            <p className="text-sm text-white/50 mb-2">검증된 플래그</p>
            <code className="text-emerald-400 font-mono text-lg">{flagInput}</code>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
            >
              구현 가이드 보기
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button
              onClick={() => {
                setVerificationState("idle");
                setFlagInput("");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-white hover:bg-white/10 transition-colors"
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
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              AI 에이전트에 지갑 연결하기
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              4단계로 AI 에이전트가 x402 결제를 할 수 있도록 설정하세요.
              <br />
              Claude Desktop 또는 Claude Code에서 테스트할 수 있습니다.
            </p>
          </div>

          {/* Demo Links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <Link
              href="/demo/visualizer"
              className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
            >
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Eye className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  결제 플로우 시각화
                </h3>
                <p className="text-sm text-white/50">애니메이션으로 전체 과정 보기</p>
              </div>
              <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              href="/demo/paywall"
              className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group border border-amber-500/20 hover:border-amber-500/40 transition-colors"
            >
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Lock className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors">
                  페이월 체험
                </h3>
                <p className="text-sm text-white/50">사람 vs AI 접근 비교</p>
              </div>
              <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Progress Stepper */}
          <div className="flex items-center justify-between mb-8 px-4">
            {["지갑 연결", "USDC 받기", "MCP 설정", "테스트"].map((label, idx) => {
              const status = getStepStatus(idx);
              return (
                <div key={idx} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        status === "completed"
                          ? "bg-emerald-500 text-black"
                          : status === "current"
                          ? "bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span
                      className={`text-xs mt-1 ${
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
                      className={`w-16 sm:w-24 h-0.5 mx-2 ${
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
          <div className={`glass rounded-2xl p-8 mb-6 ${isWalletStepCompleted ? "border border-emerald-500/30" : ""}`}>
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold shrink-0 ${
                  isWalletStepCompleted
                    ? "bg-emerald-500 text-black"
                    : "bg-cyan-500/20 text-cyan-400"
                }`}
              >
                {isWalletStepCompleted ? <CheckCircle2 className="h-5 w-5" /> : "1"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Wallet className="h-5 w-5 text-cyan-400" />
                  <h2 className="text-xl font-semibold text-white">지갑 설정하기</h2>
                  {isWalletStepCompleted && (
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      완료
                    </span>
                  )}
                </div>
                <p className="text-white/60">
                  테스트 지갑을 새로 생성하거나, 기존 MetaMask 지갑을 사용할 수 있습니다.
                </p>
              </div>
            </div>

            <div className="ml-14">
              <WalletPathSelector selectedPath={walletPath} onPathChange={setWalletPath}>
                {walletPath === "quick-start" ? (
                  <QuickStartWallet
                    onWalletGenerated={setGeneratedWallet}
                  />
                ) : (
                  <div className="space-y-4">
                    {!isConnected ? (
                      <>
                        <WalletConnectButton className="max-w-xs" />
                        <p className="text-white/40 text-sm">
                          지갑이 없다면{" "}
                          <a
                            href="https://metamask.io/download/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            MetaMask를 설치
                          </a>
                          하세요.
                        </p>
                      </>
                    ) : (
                      <>
                        <WalletInfo />
                        {/* 프라이빗 키가 필요한 이유 설명 */}
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                          <div className="flex items-start gap-3">
                            <Key className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-blue-400 font-medium text-sm">왜 프라이빗 키가 필요한가요?</p>
                              <p className="text-white/60 text-sm mt-1">
                                AI 에이전트가 자동으로 결제하려면 거래에 서명할 수 있어야 합니다.
                                프라이빗 키는 MCP 서버에만 저장되며, Claude는 키에 접근할 수 없습니다.
                              </p>
                              <p className="text-amber-400 text-sm mt-2">
                                보안을 위해 테스트 전용 지갑을 사용하고, 메인 지갑의 프라이빗 키는 절대 사용하지 마세요.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </WalletPathSelector>
            </div>
          </div>

          {/* Step 1: 테스트 USDC 받기 */}
          <div className={`glass rounded-2xl p-8 mb-6 ${hasUsdc ? "border border-emerald-500/30" : ""}`}>
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold shrink-0 ${
                  hasUsdc
                    ? "bg-emerald-500 text-black"
                    : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {hasUsdc ? <CheckCircle2 className="h-5 w-5" /> : "2"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Wallet className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">테스트 USDC 받기</h2>
                  {hasUsdc && (
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      {usdcBalance} USDC
                    </span>
                  )}
                </div>
                <p className="text-white/60">
                  Circle Faucet에서 무료로 테스트 USDC를 받으세요. (Base Sepolia 네트워크)
                </p>
              </div>
            </div>

            <div className="ml-14 space-y-4">
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
          <div className="glass rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold shrink-0">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Settings className="h-5 w-5 text-emerald-400" />
                  <h2 className="text-xl font-semibold text-white">MCP 서버 설정</h2>
                </div>
                <p className="text-white/60">
                  x402 MCP 서버를 추가하세요. <strong className="text-emerald-400">CDP 가입 불필요</strong>, 프라이빗 키만 있으면 됩니다.
                </p>
              </div>
            </div>

            <div className="ml-14">
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

              {/* 프라이빗 키 내보내기 가이드 - only show for existing wallet path */}
              {walletPath === "existing-wallet" && (
                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-start gap-3">
                    <Key className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-amber-400 font-medium text-sm">MetaMask에서 프라이빗 키 내보내기</p>
                      <ol className="text-white/60 text-sm mt-2 space-y-1.5 list-decimal list-inside">
                        <li>MetaMask 확장 프로그램 열기</li>
                        <li>계정 메뉴 (⋮) → &quot;계정 세부 정보&quot;</li>
                        <li>&quot;프라이빗 키 표시&quot; 클릭</li>
                        <li>비밀번호 입력 후 키 복사</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

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

              {/* New wallet suggestion - only show for existing wallet path without generated wallet */}
              {walletPath === "existing-wallet" && !generatedWallet && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-emerald-400 font-medium text-sm">새 지갑 생성 (권장)</p>
                      <p className="text-white/60 text-sm mt-1">
                        기존 지갑 대신 테스트용 새 지갑을 생성하면 더 안전합니다:
                      </p>
                      <code className="block bg-black/30 px-2 py-1 rounded text-xs mt-2 text-white/80">
                        node -e &quot;console.log(require(&apos;viem/accounts&apos;).generatePrivateKey())&quot;
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: 테스트 */}
          <div className="glass rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 font-bold shrink-0">
                4
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Rocket className="h-5 w-5 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">테스트하기</h2>
                </div>
                <p className="text-white/60">
                  Claude에게 보호된 콘텐츠에 접근해달라고 요청하세요.
                </p>
              </div>
            </div>

            <div className="ml-14 space-y-4">
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
          <div className="glass rounded-2xl p-8 mb-8 border border-yellow-500/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 font-bold shrink-0">
                <Trophy className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <h2 className="text-xl font-semibold text-white">성공 확인</h2>
                </div>
                <p className="text-white/60">
                  AI가 받은 플래그를 입력해서 테스트 성공을 확인하세요.
                </p>
              </div>
            </div>

            <div className="ml-14">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="x402_SUCCESS_XXXXXXXX"
                  className={`flex-1 px-4 py-3 rounded-xl bg-black/30 border text-white placeholder-white/30 font-mono focus:outline-none focus:ring-2 transition-all ${
                    verificationState === "error"
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-white/10 focus:ring-emerald-500/50"
                  }`}
                />
                <button
                  onClick={verifyFlag}
                  disabled={!flagInput.trim() || isVerifying}
                  className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isVerifying ? "검증 중..." : "검증하기"}
                </button>
              </div>
              {verificationState === "error" && (
                <p className="text-red-400 text-sm mt-2">
                  유효하지 않은 플래그입니다. AI 응답에서 정확한 플래그를 복사해주세요.
                </p>
              )}
              <p className="text-white/40 text-xs mt-3">
                플래그는 <code className="bg-black/30 px-1.5 py-0.5 rounded">x402_SUCCESS_</code>로 시작합니다.
              </p>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">추가 리소스</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://docs.cdp.coinbase.com/agentkit/docs/welcome"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-white/80">AgentKit 문서</div>
                <ExternalLink className="h-4 w-4 text-white/40 ml-auto" />
              </a>
              <a
                href="https://github.com/coinbase/x402"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-white/80">x402 GitHub</div>
                <ExternalLink className="h-4 w-4 text-white/40 ml-auto" />
              </a>
              <Link
                href="/learn/how-it-works"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-white/80">작동 원리 배우기</div>
                <ArrowRight className="h-4 w-4 text-white/40 ml-auto" />
              </Link>
              <Link
                href="/docs"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-white/80">구현 가이드</div>
                <ArrowRight className="h-4 w-4 text-white/40 ml-auto" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
