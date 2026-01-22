"use client";

import { WalletProvider } from "@/lib/wagmi/provider";
import { FrameProvider } from "@/components/FrameProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FrameProvider>
      <WalletProvider>{children}</WalletProvider>
    </FrameProvider>
  );
}
