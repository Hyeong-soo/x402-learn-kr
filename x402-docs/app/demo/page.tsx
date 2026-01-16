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
  AlertCircle,
  PartyPopper,
  Trophy,
  Sparkles,
} from "lucide-react";
import { ConfigBlock, CopyableCodeBlock } from "@/components/ConfigBlock";

export default function DemoPage() {
  const [flagInput, setFlagInput] = useState("");
  const [verificationState, setVerificationState] = useState<"idle" | "success" | "error">("idle");

  const verifyFlag = () => {
    // Check if the input matches the x402_SUCCESS_ pattern
    const flagPattern = /^x402_SUCCESS_[A-Z0-9]{6,10}$/;
    if (flagPattern.test(flagInput.trim())) {
      setVerificationState("success");
    } else {
      setVerificationState("error");
      setTimeout(() => setVerificationState("idle"), 3000);
    }
  };

  const claudeDesktopConfig = `{
  "mcpServers": {
    "x402": {
      "command": "npx",
      "args": ["-y", "@serendb/x402-mcp-server"],
      "env": {
        "WALLET_PRIVATE_KEY": "0x...",
        "BASE_RPC_URL": "https://sepolia.base.org",
        "X402_GATEWAY_URL": "https://x402.org/facilitator"
      }
    }
  }
}`;

  const claudeCodeConfig = `# 1. 프라이빗 키 생성 (없으면)
node -e "console.log(require('viem/accounts').generatePrivateKey())"

# 2. 환경변수 설정
export WALLET_PRIVATE_KEY="0x..."
export BASE_RPC_URL="https://sepolia.base.org"
export X402_GATEWAY_URL="https://x402.org/facilitator"

# 3. MCP 서버 추가
claude mcp add x402 -- npx -y @serendb/x402-mcp-server`;

  const testPrompt = `learn402.xyz/demo/protected-content 페이지에 접속해서 내용을 알려줘.`;

  // Success celebration view
  if (verificationState === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 text-center px-4 max-w-2xl">
          {/* Celebration Icons */}
          <div className="flex justify-center gap-4 mb-8">
            <PartyPopper className="h-12 w-12 text-yellow-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <Trophy className="h-16 w-16 text-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <PartyPopper className="h-12 w-12 text-yellow-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>

          {/* Main Message */}
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

          {/* Success Details */}
          <div className="glass rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              <span className="text-white font-semibold">완료된 항목</span>
            </div>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                CDP API 키 설정 완료
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

          {/* Verified Flag */}
          <div className="glass rounded-xl p-4 mb-8 border border-emerald-500/30">
            <p className="text-sm text-white/50 mb-2">검증된 플래그</p>
            <code className="text-emerald-400 font-mono text-lg">{flagInput}</code>
          </div>

          {/* Next Steps */}
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
              3단계로 AI 에이전트가 x402 결제를 할 수 있도록 설정하세요.
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

          {/* Step 1: MCP 서버 설정 */}
          <div className="glass rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold shrink-0">
                1
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

              <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-emerald-400 font-medium text-sm">프라이빗 키 생성</p>
                    <p className="text-white/60 text-sm mt-1">
                      기존 지갑이 없다면 위 명령어로 새 프라이빗 키를 생성하세요.
                      생성된 키에서 지갑 주소를 확인하려면:{" "}
                      <code className="bg-black/30 px-1.5 py-0.5 rounded text-xs">
                        cast wallet address --private-key 0x...
                      </code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: 테스트 USDC 받기 */}
          <div className="glass rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 font-bold shrink-0">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Wallet className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">테스트 USDC 받기</h2>
                </div>
                <p className="text-white/60">
                  생성된 지갑 주소로 테스트 USDC를 받으세요. (무료)
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-14">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/80 font-medium">지갑 주소 확인</p>
                  <p className="text-white/50 text-sm mt-1">
                    MCP 서버 시작 시 로그에 출력된 지갑 주소를 복사하세요.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/80 font-medium">Circle Faucet에서 USDC 받기</p>
                  <p className="text-white/50 text-sm mt-1">
                    Base Sepolia 네트워크 선택 → 지갑 주소 입력 → 1 USDC 받기
                  </p>
                  <a
                    href="https://faucet.circle.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm mt-1"
                  >
                    faucet.circle.com
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: 테스트 */}
          <div className="glass rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 font-bold shrink-0">
                3
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
                    AgentKit이 자동으로 $0.01 USDC 결제
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
                4
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
                  disabled={!flagInput.trim()}
                  className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  검증하기
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
