"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";

interface WalletConnectButtonProps {
  className?: string;
}

export function WalletConnectButton({ className = "" }: WalletConnectButtonProps) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className={className}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors w-full justify-center"
                  >
                    <Wallet className="h-5 w-5" />
                    지갑 연결하기
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/80 text-white font-semibold hover:bg-red-500 transition-colors w-full justify-center"
                  >
                    잘못된 네트워크
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-white/10 transition-colors"
                    title={chain.name}
                  >
                    {chain.hasIcon && chain.iconUrl && (
                      <img
                        src={chain.iconUrl}
                        alt={chain.name ?? "Chain icon"}
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                    <span className="text-sm text-white/80">{chain.name}</span>
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    <span className="text-sm font-mono text-white">
                      {account.displayName}
                    </span>
                    {account.displayBalance && (
                      <span className="text-sm text-white/50">
                        ({account.displayBalance})
                      </span>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
