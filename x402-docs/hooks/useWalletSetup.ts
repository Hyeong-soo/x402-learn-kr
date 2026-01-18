"use client";

import { useAccount, useReadContract, useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { formatUnits } from "viem";
import { USDC_ADDRESS, USDC_ABI } from "@/lib/wagmi/config";

export interface WalletSetupStatus {
  step: "connect" | "network" | "usdc" | "ready";
  isConnected: boolean;
  isCorrectNetwork: boolean;
  hasUsdc: boolean;
  address?: string;
  usdcBalance?: string;
}

export function useWalletSetup() {
  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const { data: usdcBalance, refetch: refetchBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: baseSepolia.id,
    query: {
      enabled: !!address,
      refetchInterval: 30000,
    },
  });

  const isCorrectNetwork = chain?.id === baseSepolia.id;
  const hasUsdc = usdcBalance !== undefined && usdcBalance > BigInt(0);
  const formattedBalance = usdcBalance
    ? parseFloat(formatUnits(usdcBalance, 6)).toFixed(2)
    : "0.00";

  // 현재 단계 결정
  let step: WalletSetupStatus["step"] = "connect";
  if (isConnected && address) {
    if (!isCorrectNetwork) {
      step = "network";
    } else if (!hasUsdc) {
      step = "usdc";
    } else {
      step = "ready";
    }
  }

  const switchToBaseSepolia = () => {
    switchChain({ chainId: baseSepolia.id });
  };

  return {
    step,
    isConnected,
    isCorrectNetwork,
    hasUsdc,
    address,
    usdcBalance: formattedBalance,
    switchToBaseSepolia,
    refetchBalance,
  };
}
