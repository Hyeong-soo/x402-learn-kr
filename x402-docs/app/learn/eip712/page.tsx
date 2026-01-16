"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, FileSignature, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EIP712Page() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/learn" className="hover:text-white">학습</Link>
          <span>/</span>
          <span className="text-white">EIP-712 서명</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6">
          EIP-712 서명
        </h1>

        {/* Overview */}
        <div className="glass rounded-2xl p-8 mb-12">
          <p className="text-lg text-white/80 leading-relaxed">
            EIP-712는 이더리움의 타입화된 구조적 데이터 해싱 및 서명 표준입니다.
            x402에서는 USDC의 <code className="text-emerald-400">transferWithAuthorization</code> 함수를
            호출하기 위한 서명을 생성하는 데 사용됩니다.
          </p>
        </div>

        {/* Why EIP-712 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <FileSignature className="h-6 w-6 text-emerald-400" />
            왜 EIP-712인가?
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="glass rounded-xl p-6">
              <h3 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                기존 서명 방식의 문제
              </h3>
              <div className="bg-black/30 rounded-lg p-4 mb-4">
                <pre className="text-xs text-red-400 font-mono">
{`eth_sign("0x9a8b7c6d5e...")

// 사용자가 보는 것:
// "서명하시겠습니까?"
// 0x9a8b7c6d5e4f3a2b...
//
// 무엇에 서명하는지 알 수 없음!`}
                </pre>
              </div>
              <p className="text-white/70 text-sm">
                일반 해시 서명은 사용자에게 의미 없는 16진수만 보여줍니다.
                악의적인 트랜잭션에 서명할 위험이 있습니다.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                EIP-712의 해결책
              </h3>
              <div className="bg-black/30 rounded-lg p-4 mb-4">
                <pre className="text-xs text-emerald-400 font-mono">
{`eth_signTypedData_v4

// 사용자가 보는 것:
// Domain: USDC
// Action: Transfer With Authorization
// From: 0x390e4Ce3...
// To: 0x742d35Cc...
// Amount: 0.01 USDC
//
// 정확히 무엇에 서명하는지 확인 가능!`}
                </pre>
              </div>
              <p className="text-white/70 text-sm">
                구조화된 데이터를 사람이 읽을 수 있는 형태로 보여줍니다.
                서명 전에 정확한 내용을 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* EIP-712 Structure */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">EIP-712 구조</h2>

          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="text-emerald-400 font-medium mb-4">1. Domain Separator</h3>
            <p className="text-white/70 text-sm mb-4">
              서명이 어떤 컨트랙트/애플리케이션을 위한 것인지 식별합니다.
              다른 앱의 서명을 재사용하는 것을 방지합니다.
            </p>
            <div className="bg-black/40 rounded-lg p-4">
              <pre className="text-xs text-emerald-400 font-mono overflow-x-auto">
{`// USDC의 Domain
{
  name: "USDC",                              // 컨트랙트 이름
  version: "2",                              // 버전
  chainId: 84532,                            // Base Sepolia
  verifyingContract: "0x036CbD53..."         // USDC 컨트랙트 주소
}`}
              </pre>
            </div>
            <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
              <p className="text-amber-400 text-sm flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  <strong>주의:</strong> Domain의 name과 version은 반드시 USDC 컨트랙트에 정의된 값과
                  일치해야 합니다. 잘못된 값을 사용하면 서명이 무효화됩니다.
                </span>
              </p>
            </div>
          </div>

          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="text-emerald-400 font-medium mb-4">2. Type Definitions</h3>
            <p className="text-white/70 text-sm mb-4">
              서명할 데이터의 구조를 정의합니다.
              USDC의 transferWithAuthorization은 아래 타입을 사용합니다.
            </p>
            <div className="bg-black/40 rounded-lg p-4">
              <pre className="text-xs text-emerald-400 font-mono overflow-x-auto">
{`const types = {
  TransferWithAuthorization: [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "value", type: "uint256" },
    { name: "validAfter", type: "uint256" },
    { name: "validBefore", type: "uint256" },
    { name: "nonce", type: "bytes32" }
  ]
};`}
              </pre>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-emerald-400 font-medium mb-4">3. Message (실제 데이터)</h3>
            <p className="text-white/70 text-sm mb-4">
              서명할 실제 값입니다. 타입 정의에 맞춰 작성해야 합니다.
            </p>
            <div className="bg-black/40 rounded-lg p-4">
              <pre className="text-xs text-emerald-400 font-mono overflow-x-auto">
{`const message = {
  from: "0x390e4Ce3...",     // 보내는 사람 (서명자)
  to: "0x742d35Cc...",       // 받는 사람 (서버 지갑)
  value: "10000",            // 금액 (USDC는 6 decimals, 10000 = $0.01)
  validAfter: 0,             // 유효 시작 시간 (0 = 즉시)
  validBefore: 1768474060,   // 유효 종료 시간 (Unix timestamp)
  nonce: "0xabc123..."       // 고유 식별자 (replay attack 방지)
};`}
              </pre>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">코드 예제</h2>

          <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-sm text-white/40 font-mono ml-2">signPayment.ts</span>
            </div>
            <div className="p-4 bg-black/30">
              <pre className="text-xs text-emerald-400 font-mono overflow-x-auto">
{`import { Wallet } from 'ethers';

async function signTransferWithAuthorization(
  wallet: Wallet,
  to: string,
  amount: string,
  usdcAddress: string,
  chainId: number
) {
  const domain = {
    name: "USDC",
    version: "2",
    chainId: chainId,
    verifyingContract: usdcAddress
  };

  const types = {
    TransferWithAuthorization: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
      { name: "validAfter", type: "uint256" },
      { name: "validBefore", type: "uint256" },
      { name: "nonce", type: "bytes32" }
    ]
  };

  const nonce = ethers.utils.randomBytes(32);
  const validBefore = Math.floor(Date.now() / 1000) + 60; // 1분 후 만료

  const message = {
    from: wallet.address,
    to: to,
    value: amount,
    validAfter: 0,
    validBefore: validBefore,
    nonce: nonce
  };

  // EIP-712 서명 생성
  const signature = await wallet._signTypedData(domain, types, message);

  return {
    signature,
    authorization: message
  };
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Hash Calculation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">해시 계산 과정</h2>

          <div className="glass rounded-xl p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">1. Domain Separator Hash</h3>
                <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-white/70">
                  domainSeparator = keccak256(encode(EIP712Domain, domain))
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">2. Struct Hash</h3>
                <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-white/70">
                  structHash = keccak256(encode(typesHash, message))
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">3. Final Message Hash</h3>
                <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-emerald-400">
                  messageHash = keccak256("\x19\x01" + domainSeparator + structHash)
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">4. Signature</h3>
                <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-emerald-400">
                  (v, r, s) = sign(messageHash, privateKey)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Considerations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-400" />
            보안 고려사항
          </h2>

          <div className="space-y-4">
            <div className="glass rounded-xl p-6 border border-amber-500/30">
              <h3 className="text-amber-400 font-medium mb-2">Nonce 관리</h3>
              <p className="text-white/70 text-sm">
                각 서명에 고유한 nonce를 사용해야 합니다. 같은 nonce를 재사용하면
                replay attack에 취약해집니다. 랜덤 바이트 생성을 권장합니다.
              </p>
            </div>

            <div className="glass rounded-xl p-6 border border-amber-500/30">
              <h3 className="text-amber-400 font-medium mb-2">시간 제한</h3>
              <p className="text-white/70 text-sm">
                validBefore를 현재 시간 + 1분 정도로 설정하세요.
                너무 긴 유효 기간은 서명 도용 위험을 높입니다.
              </p>
            </div>

            <div className="glass rounded-xl p-6 border border-amber-500/30">
              <h3 className="text-amber-400 font-medium mb-2">금액 확인</h3>
              <p className="text-white/70 text-sm">
                서명 전에 반드시 value(금액)를 확인하세요. USDC는 6 decimals를 사용하므로
                1000000 = $1.00, 10000 = $0.01입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/learn/components">
              <ArrowLeft className="mr-2 h-4 w-4" />
              구성 요소
            </Link>
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
            <Link href="/learn/usdc-transfer">
              USDC transferWithAuthorization
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
