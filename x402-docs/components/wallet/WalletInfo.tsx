"use client";

import { useAccount, useReadContract } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { formatUnits } from "viem";
import { CheckCircle2, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { AddressDisplay } from "./AddressDisplay";
import { USDC_ADDRESS, USDC_ABI } from "@/lib/wagmi/config";

interface WalletInfoProps {
  className?: string;
}

export function WalletInfo({ className = "" }: WalletInfoProps) {
  const { address, isConnected, chain } = useAccount();

  const {
    data: usdcBalance,
    isLoading: isBalanceLoading,
    refetch: refetchBalance,
  } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: baseSepolia.id,
    query: {
      enabled: !!address,
      refetchInterval: 30000, // 30초마다 자동 갱신
    },
  });

  if (!isConnected || !address) {
    return null;
  }

  const isCorrectNetwork = chain?.id === baseSepolia.id;
  const formattedBalance = usdcBalance
    ? parseFloat(formatUnits(usdcBalance, 6)).toFixed(2)
    : "0.00";

  return (
    <div className={`glass rounded-xl p-4 space-y-4 ${className}`}>
      {/* 연결 상태 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-white/80">지갑 연결됨</span>
        </div>
        {isCorrectNetwork ? (
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
            Base Sepolia
          </span>
        ) : (
          <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
            잘못된 네트워크
          </span>
        )}
      </div>

      {/* 지갑 주소 */}
      <div>
        <p className="text-xs text-white/50 mb-1">지갑 주소</p>
        <AddressDisplay address={address} />
      </div>

      {/* USDC 잔액 */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-white/50">USDC 잔액</p>
          <button
            onClick={() => refetchBalance()}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="잔액 새로고침"
          >
            <RefreshCw className="h-3 w-3 text-white/50 hover:text-white/80" />
          </button>
        </div>
        {isBalanceLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-white/50" />
            <span className="text-sm text-white/50">로딩 중...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white">
              {formattedBalance}
            </span>
            <span className="text-sm text-white/50">USDC</span>
          </div>
        )}
      </div>

      {/* 잔액 부족 경고 */}
      {usdcBalance !== undefined && usdcBalance === BigInt(0) && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-amber-400 font-medium">USDC가 필요합니다</p>
            <p className="text-xs text-white/50 mt-0.5">
              아래 Faucet에서 테스트 USDC를 받으세요
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
