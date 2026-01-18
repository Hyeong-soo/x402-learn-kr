"use client";

import { ReactNode } from "react";
import { Rocket, Link as LinkIcon } from "lucide-react";

export type WalletPath = "quick-start" | "existing-wallet";

interface WalletPathSelectorProps {
  selectedPath: WalletPath;
  onPathChange: (path: WalletPath) => void;
  children?: ReactNode;
}

export function WalletPathSelector({
  selectedPath,
  onPathChange,
  children,
}: WalletPathSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Tab Selector */}
      <div className="flex rounded-xl bg-black/30 p-1">
        <button
          onClick={() => onPathChange("quick-start")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            selectedPath === "quick-start"
              ? "bg-emerald-500/20 text-emerald-400 shadow-lg"
              : "text-white/60 hover:text-white/80 hover:bg-white/5"
          }`}
        >
          <Rocket className="h-4 w-4" />
          <span>빠른 시작</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300">
            권장
          </span>
        </button>
        <button
          onClick={() => onPathChange("existing-wallet")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            selectedPath === "existing-wallet"
              ? "bg-cyan-500/20 text-cyan-400 shadow-lg"
              : "text-white/60 hover:text-white/80 hover:bg-white/5"
          }`}
        >
          <LinkIcon className="h-4 w-4" />
          <span>기존 지갑 사용</span>
        </button>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
