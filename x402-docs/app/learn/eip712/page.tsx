"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, FileSignature, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";

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
              <div className="mb-4">
                <CodeBlock
                  code={`eth_sign("0x9a8b7c6d5e...")

// 사용자가 보는 것:
// "서명하시겠습니까?"
// 0x9a8b7c6d5e4f3a2b...
//
// 무엇에 서명하는지 알 수 없음!`}
                  language="typescript"
                />
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
              <div className="mb-4">
                <CodeBlock
                  code={`eth_signTypedData_v4

// 사용자가 보는 것:
// Domain: USDC
// Action: Transfer With Authorization
// From: 0x390e4Ce3...
// To: 0x742d35Cc...
// Amount: 0.01 USDC
//
// 정확히 무엇에 서명하는지 확인 가능!`}
                  language="typescript"
                />
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
            <CodeBlock
              code={`// USDC의 EIP-712 Domain Separator
// 이 정보는 서명이 "어떤 컨트랙트를 위한 것인지" 명시합니다.
// 다른 앱에서 만든 서명을 재사용하는 크로스-프로토콜 공격을 방지합니다.
{
  name: "USD Coin",                          // USDC 컨트랙트의 공식 이름
                                             // "USDC"가 아닌 "USD Coin"이어야 함!
  version: "2",                              // USDC 컨트랙트 버전 (Circle이 정의)
  chainId: 84532,                            // 체인 ID (Base Sepolia 테스트넷)
                                             // Base Mainnet은 8453
  verifyingContract: "0x036CbD53..."         // USDC 컨트랙트 배포 주소
                                             // 반드시 해당 체인의 공식 주소 사용
}`}
              language="typescript"
            />
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
            <CodeBlock
              code={`// EIP-712 타입 정의
// 서명할 데이터의 "스키마"를 정의합니다.
// USDC 컨트랙트가 기대하는 정확한 필드명과 타입을 사용해야 합니다.
const types = {
  // "TransferWithAuthorization" - USDC의 가스리스 전송 함수 이름
  TransferWithAuthorization: [
    { name: "from", type: "address" },       // 토큰을 보내는 지갑 주소
    { name: "to", type: "address" },         // 토큰을 받는 지갑 주소
    { name: "value", type: "uint256" },      // 전송할 금액 (6 decimals)
    { name: "validAfter", type: "uint256" }, // 서명 유효 시작 시간
    { name: "validBefore", type: "uint256" },// 서명 만료 시간
    { name: "nonce", type: "bytes32" }       // 중복 사용 방지용 고유 식별자
  ]
};`}
              language="typescript"
            />
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-emerald-400 font-medium mb-4">3. Message (실제 데이터)</h3>
            <p className="text-white/70 text-sm mb-4">
              서명할 실제 값입니다. 타입 정의에 맞춰 작성해야 합니다.
            </p>
            <CodeBlock
              code={`// 실제 서명할 메시지 데이터
// 이 값들이 사용자의 지갑에 표시되어 서명 전 확인할 수 있습니다.
const message = {
  from: "0x390e4Ce3...",     // 보내는 사람 주소 (서명자 본인의 지갑)
                             // 이 주소에서 USDC가 차감됩니다

  to: "0x742d35Cc...",       // 받는 사람 주소 (콘텐츠 제공자의 지갑)
                             // 이 주소로 USDC가 입금됩니다

  value: "10000",            // 전송할 금액 (단위: 마이크로 달러)
                             // USDC는 6 decimals이므로:
                             // 10000 = $0.01 (1센트)
                             // 1000000 = $1.00 (1달러)

  validAfter: 0,             // 서명 유효 시작 시간 (Unix timestamp)
                             // 0 = 즉시 유효 (제한 없음)
                             // 특정 시간 이후에만 실행되게 하려면 값 지정

  validBefore: 1768474060,   // 서명 만료 시간 (Unix timestamp)
                             // 이 시간이 지나면 서명이 무효화됩니다
                             // 보안을 위해 현재시간 + 60초 권장

  nonce: "0xabc123..."       // 32바이트 고유 식별자
                             // 같은 서명의 재사용(replay attack)을 방지
                             // crypto.randomBytes(32)로 생성 권장
};`}
              language="typescript"
            />
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">코드 예제</h2>

          <CodeBlock
            code={`import { ethers, Signer } from 'ethers';

/**
 * USDC transferWithAuthorization을 위한 EIP-712 서명을 생성합니다.
 * 이 서명은 가스비 없이 USDC를 전송할 수 있게 해줍니다.
 *
 * @param signer - ethers.js v6 Signer 인스턴스
 * @param to - 받는 사람 지갑 주소
 * @param amount - 전송할 금액 (6 decimals, "10000" = $0.01)
 * @param usdcAddress - 해당 체인의 USDC 컨트랙트 주소
 * @param chainId - 블록체인 네트워크 ID (Base Sepolia: 84532)
 */
async function signTransferWithAuthorization(
  signer: Signer,
  to: string,
  amount: string,
  usdcAddress: string,
  chainId: number
) {
  // ========================================
  // 1단계: Domain Separator 정의
  // ========================================
  // 서명이 USDC 컨트랙트용임을 증명합니다.
  // 이 값들은 USDC 컨트랙트에 하드코딩된 값과 일치해야 합니다.
  const domain = {
    name: "USD Coin",          // USDC v2 컨트랙트의 공식 이름
    version: "2",              // USDC 컨트랙트 버전
    chainId: chainId,          // 체인 ID (다른 체인 서명 재사용 방지)
    verifyingContract: usdcAddress  // USDC 컨트랙트 주소
  };

  // ========================================
  // 2단계: Type 정의
  // ========================================
  // USDC 컨트랙트의 transferWithAuthorization 함수가
  // 기대하는 정확한 파라미터 구조입니다.
  const types = {
    TransferWithAuthorization: [
      { name: "from", type: "address" },        // 보내는 사람
      { name: "to", type: "address" },          // 받는 사람
      { name: "value", type: "uint256" },       // 금액
      { name: "validAfter", type: "uint256" },  // 유효 시작
      { name: "validBefore", type: "uint256" }, // 유효 종료
      { name: "nonce", type: "bytes32" }        // 고유 ID
    ]
  };

  // ========================================
  // 3단계: 보안 파라미터 생성
  // ========================================
  // nonce: 32바이트 랜덤 값으로 replay attack 방지
  // ethers v6에서는 ethers.randomBytes() 사용
  const nonce = ethers.hexlify(ethers.randomBytes(32));

  // validBefore: 현재 시간 + 60초
  // 서명이 1분 후 만료되어 도용 위험 최소화
  const validBefore = Math.floor(Date.now() / 1000) + 60;

  // ========================================
  // 4단계: 메시지 구성
  // ========================================
  const signerAddress = await signer.getAddress();
  const message = {
    from: signerAddress,     // 서명자 = 토큰 보내는 사람
    to: to,                  // 파라미터로 받은 수신자
    value: amount,           // 파라미터로 받은 금액
    validAfter: 0,           // 즉시 유효 (시작 제한 없음)
    validBefore: validBefore,// 1분 후 만료
    nonce: nonce             // 랜덤 생성된 고유 ID
  };

  // ========================================
  // 5단계: EIP-712 서명 생성
  // ========================================
  // ethers v6에서는 signer.signTypedData() 사용
  // domain + types + message를 해시하고 서명합니다.
  // 결과: 65바이트 서명 (v, r, s 포함)
  const signature = await signer.signTypedData(domain, types, message);

  // 서명과 메시지 데이터를 함께 반환
  // 서버/퍼실리테이터가 이 정보로 온체인 트랜잭션 실행
  return {
    signature,           // 65바이트 서명 문자열
    authorization: message  // 서명된 메시지 (검증용)
  };
}`}
            language="typescript"
          />
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
