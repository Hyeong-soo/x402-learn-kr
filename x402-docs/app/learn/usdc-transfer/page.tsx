"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Coins, Zap, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";

export default function USDCTransferPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/learn" className="hover:text-white">학습</Link>
          <span>/</span>
          <span className="text-white">USDC 가스리스 전송</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6">
          USDC 가스리스 전송
        </h1>
        <p className="text-lg text-white/50 mb-8">
          EIP-3009 <code className="text-emerald-400">transferWithAuthorization</code> 함수의 작동 방식
        </p>

        {/* Overview */}
        <div className="glass rounded-2xl p-8 mb-12">
          <p className="text-lg text-white/80 leading-relaxed">
            <code className="text-emerald-400">transferWithAuthorization</code>은 USDC의 핵심 기능으로,
            서명만으로 제3자가 토큰 전송을 실행할 수 있게 합니다.
            x402 프로토콜의 기술적 기반이 되는 함수입니다.
          </p>
        </div>

        {/* What is USDC */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Coins className="h-6 w-6 text-emerald-400" />
            USDC란?
          </h2>

          <div className="glass rounded-xl p-6">
            <p className="text-white/70 mb-4">
              USDC(USD Coin)는 Circle이 발행하는 스테이블코인으로, 1 USDC = 1 USD의 가치를 유지합니다.
              달러 준비금으로 완전히 담보되어 있어 변동성이 없습니다.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400 mb-1">$25B+</div>
                <div className="text-sm text-white/50">시가총액</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400 mb-1">15+</div>
                <div className="text-sm text-white/50">지원 블록체인</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-400 mb-1">6</div>
                <div className="text-sm text-white/50">Decimals</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why transferWithAuthorization */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Zap className="h-6 w-6 text-emerald-400" />
            왜 transferWithAuthorization인가?
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-6">
              <h3 className="text-red-400 font-medium mb-3">일반 transfer의 문제</h3>
              <div className="space-y-3 text-white/70 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-red-400">1.</span>
                  <p>보내는 사람이 직접 트랜잭션 전송 필요</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400">2.</span>
                  <p>가스비(ETH)가 있어야 함</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400">3.</span>
                  <p>2단계 승인 필요 (approve + transferFrom)</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-3 mt-4 font-mono text-xs">
                <span className="text-red-400">// 보내는 사람이 실행해야 함</span><br />
                USDC.transfer(to, amount)
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-emerald-400 font-medium mb-3">transferWithAuthorization의 장점</h3>
              <div className="space-y-3 text-white/70 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400">1.</span>
                  <p>서명만 있으면 누구나 실행 가능</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400">2.</span>
                  <p>보내는 사람 ETH 불필요 (가스비 대납)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400">3.</span>
                  <p>1단계로 완료 (승인 + 전송 동시)</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-3 mt-4 font-mono text-xs">
                <span className="text-emerald-400">// 누구나 실행 가능</span><br />
                USDC.transferWithAuthorization(<br />
                &nbsp;&nbsp;from, to, value, ..., signature<br />
                )
              </div>
            </div>
          </div>
        </section>

        {/* Function Signature */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">함수 시그니처</h2>

          <CodeBlock
            code={`// USDC 컨트랙트의 가스리스 전송 함수 (EIP-3009)
// 서명만 있으면 누구나 이 함수를 호출하여 토큰을 전송할 수 있습니다.
// 가스비는 함수를 호출하는 사람(퍼실리테이터)이 부담합니다.

function transferWithAuthorization(
    address from,          // 토큰을 보내는 지갑 주소
                           // 반드시 서명을 생성한 주소와 일치해야 함

    address to,            // 토큰을 받을 지갑 주소
                           // 콘텐츠 제공자의 지갑 주소

    uint256 value,         // 전송할 금액 (6 decimals 적용)
                           // 예: 10000 = $0.01, 1000000 = $1.00

    uint256 validAfter,    // 서명 유효 시작 시간 (Unix timestamp)
                           // 0이면 즉시 유효, 특정 시간 설정 가능

    uint256 validBefore,   // 서명 만료 시간 (Unix timestamp)
                           // 이 시간 이후 서명은 무효화됨

    bytes32 nonce,         // 32바이트 고유 식별자
                           // 같은 서명의 재사용 방지 (replay attack 차단)

    uint8 v,               // ECDSA 서명의 recovery id (27 또는 28)
    bytes32 r,             // ECDSA 서명의 r 값 (32바이트)
    bytes32 s              // ECDSA 서명의 s 값 (32바이트)
) external;`}
            language="solidity"
          />

          <div className="mt-6 space-y-4">
            <div className="glass rounded-xl p-4">
              <h4 className="text-white font-medium mb-2">파라미터 설명</h4>
              <table className="w-full text-sm">
                <tbody className="text-white/70">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono text-emerald-400">from</td>
                    <td className="py-2">서명자 주소. 이 주소에서 토큰이 차감됩니다.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono text-emerald-400">to</td>
                    <td className="py-2">수신자 주소. 이 주소로 토큰이 전송됩니다.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono text-emerald-400">value</td>
                    <td className="py-2">전송 금액. 6 decimals 적용 (1000000 = $1.00)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono text-emerald-400">validAfter</td>
                    <td className="py-2">이 시간 이후에만 유효. 0이면 즉시 유효.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono text-emerald-400">validBefore</td>
                    <td className="py-2">이 시간 이전에만 유효. 만료 시간.</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono text-emerald-400">nonce</td>
                    <td className="py-2">32바이트 고유 식별자. replay attack 방지.</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-emerald-400">v, r, s</td>
                    <td className="py-2">EIP-712 서명 값. from 주소의 개인키로 서명.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Flow Diagram */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">실행 흐름</h2>

          <div className="glass rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-mono text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">서명 생성 (오프체인)</h4>
                  <p className="text-white/60 text-sm mt-1">
                    클라이언트가 EIP-712 형식으로 메시지에 서명합니다.
                    이 과정에서 가스비가 발생하지 않습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-mono text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">서명 전달</h4>
                  <p className="text-white/60 text-sm mt-1">
                    서명을 서버 또는 퍼실리테이터에게 전달합니다.
                    HTTP 헤더, API 요청 등 다양한 방식으로 전달 가능합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-mono text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">트랜잭션 실행 (온체인)</h4>
                  <p className="text-white/60 text-sm mt-1">
                    퍼실리테이터가 transferWithAuthorization을 호출합니다.
                    가스비는 퍼실리테이터가 부담합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-mono text-sm">4</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">토큰 전송</h4>
                  <p className="text-white/60 text-sm mt-1">
                    USDC 컨트랙트가 서명을 검증하고, from에서 to로 토큰을 전송합니다.
                    서명이 유효하지 않으면 전체 트랜잭션이 취소됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USDC Contract Addresses */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Shield className="h-6 w-6 text-emerald-400" />
            USDC 컨트랙트 주소
          </h2>

          <div className="glass rounded-xl p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/50 border-b border-white/10">
                  <th className="text-left py-3">네트워크</th>
                  <th className="text-left py-3">주소</th>
                  <th className="text-left py-3"></th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-3">Base Mainnet</td>
                  <td className="py-3 font-mono text-xs">0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913</td>
                  <td className="py-3">
                    <a
                      href="https://basescan.org/token/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Base Sepolia (테스트넷)</td>
                  <td className="py-3 font-mono text-xs">0x036CbD53842c5426634e7929541eC2318f3dCF7e</td>
                  <td className="py-3">
                    <a
                      href="https://sepolia.basescan.org/token/0x036CbD53842c5426634e7929541eC2318f3dCF7e"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Ethereum Mainnet</td>
                  <td className="py-3 font-mono text-xs">0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48</td>
                  <td className="py-3">
                    <a
                      href="https://etherscan.io/token/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
              <p className="text-amber-400 text-sm">
                <strong>테스트넷 주의:</strong> Base Sepolia의 USDC는 테스트용 토큰입니다.
                실제 가치가 없으며, Faucet에서 무료로 받을 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">완전한 예제</h2>

          <CodeBlock
            code={`import { ethers, Wallet, JsonRpcProvider, Signature } from 'ethers';

// ============================================================
// USDC 컨트랙트 ABI (필요한 함수만 포함)
// ============================================================
// 전체 ABI가 아닌 사용할 함수만 정의하면 번들 크기를 줄일 수 있습니다.
const USDC_ABI = [
  "function transferWithAuthorization(address from, address to, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)"
];

/**
 * 퍼실리테이터가 클라이언트의 서명을 사용해 결제를 실행합니다.
 * 이 함수는 서버 측(퍼실리테이터)에서 실행됩니다.
 *
 * 흐름: 클라이언트가 서명 생성 → 서버가 이 함수로 온체인 실행
 */
async function executePayment(
  provider: JsonRpcProvider,            // ethers v6 Provider
                                        // 블록체인 연결 (Alchemy, Infura 등)

  executorWallet: Wallet,               // 퍼실리테이터의 지갑
                                        // 이 지갑이 가스비를 지불합니다
                                        // ETH 잔액이 있어야 함!

  usdcAddress: string,                  // USDC 컨트랙트 주소
                                        // Base: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

  from: string,                         // 토큰 보내는 사람 (클라이언트 지갑)
  to: string,                           // 토큰 받는 사람 (콘텐츠 제공자)
  value: string,                        // 전송 금액 (6 decimals)
  validAfter: number,                   // 유효 시작 시간
  validBefore: number,                  // 유효 종료 시간
  nonce: string,                        // 고유 식별자

  signature: string                     // 클라이언트가 EIP-712로 생성한 서명
                                        // 65바이트 hex string
) {
  // ============================================================
  // 1단계: USDC 컨트랙트 인스턴스 생성
  // ============================================================
  // executorWallet을 연결하면 이 지갑으로 트랜잭션이 전송됩니다.
  const usdc = new ethers.Contract(usdcAddress, USDC_ABI, executorWallet);

  // ============================================================
  // 2단계: 서명 분해 (v, r, s)
  // ============================================================
  // ethers v6에서는 Signature.from()을 사용합니다.
  // EIP-712 서명은 65바이트로, r(32) + s(32) + v(1)로 구성됩니다.
  const sig = Signature.from(signature);

  // ============================================================
  // 3단계: 온체인 트랜잭션 실행
  // ============================================================
  // transferWithAuthorization을 호출하면:
  // - USDC 컨트랙트가 서명 검증
  // - 유효하면 from → to로 토큰 전송
  // - 가스비는 executorWallet에서 차감
  const tx = await usdc.transferWithAuthorization(
    from,           // 서명자 주소 (토큰 출금 주소)
    to,             // 수신자 주소 (토큰 입금 주소)
    value,          // 전송 금액
    validAfter,     // 유효 시작
    validBefore,    // 유효 종료
    nonce,          // 고유 ID
    sig.v,          // 서명 v (recovery id: 27 또는 28)
    sig.r,          // 서명 r (32바이트)
    sig.s           // 서명 s (32바이트)
  );

  // ============================================================
  // 4단계: 트랜잭션 확인 대기
  // ============================================================
  // wait()는 트랜잭션이 블록에 포함될 때까지 대기합니다.
  // Base에서는 보통 2-3초 소요됩니다.
  const receipt = await tx.wait();

  // 성공 결과 반환
  // hash로 블록 익스플로러에서 트랜잭션 확인 가능
  return {
    success: true,
    txHash: receipt.hash  // ethers v6: transactionHash → hash
  };
}`}
            language="typescript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/learn/eip712">
              <ArrowLeft className="mr-2 h-4 w-4" />
              EIP-712 서명
            </Link>
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
            <Link href="/learn/ecosystem">
              생태계
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
