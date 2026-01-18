"use client";

import { useState, useCallback } from "react";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import {
  Wallet,
  Copy,
  Check,
  Eye,
  EyeOff,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

interface GeneratedWallet {
  privateKey: string;
  address: string;
}

interface QuickStartWalletProps {
  onWalletGenerated?: (wallet: GeneratedWallet) => void;
  className?: string;
}

export function QuickStartWallet({
  onWalletGenerated,
  className = "",
}: QuickStartWalletProps) {
  const [wallet, setWallet] = useState<GeneratedWallet | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWallet = useCallback(() => {
    setIsGenerating(true);
    // Small delay for visual feedback
    setTimeout(() => {
      const privateKey = generatePrivateKey();
      const account = privateKeyToAccount(privateKey);
      const newWallet = {
        privateKey,
        address: account.address,
      };
      setWallet(newWallet);
      setShowPrivateKey(false);
      setCopiedAddress(false);
      setCopiedKey(false);
      setIsGenerating(false);
      onWalletGenerated?.(newWallet);
    }, 300);
  }, [onWalletGenerated]);

  const copyAddress = async () => {
    if (wallet) {
      await navigator.clipboard.writeText(wallet.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const copyPrivateKey = async () => {
    if (wallet) {
      await navigator.clipboard.writeText(wallet.privateKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const maskPrivateKey = (key: string) => {
    return key.slice(0, 10) + "•".repeat(50) + key.slice(-6);
  };

  // Before wallet generation
  if (!wallet) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-emerald-400 font-medium text-sm">
                새 테스트 지갑을 자동으로 생성합니다
              </p>
              <p className="text-white/60 text-sm mt-1">
                MCP 서버 전용 테스트 지갑을 생성하면 기존 지갑과 분리하여 안전하게 테스트할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={generateWallet}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Wallet className="h-5 w-5" />
              테스트 지갑 생성하기
            </>
          )}
        </button>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-amber-400 font-medium text-sm">테스트 전용</p>
              <p className="text-white/60 text-sm mt-1">
                이 지갑은 테스트 전용입니다. 실제 자산을 보관하지 마세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // After wallet generation
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
        <div className="flex items-center gap-2 mb-4">
          <Check className="h-5 w-5 text-emerald-400" />
          <span className="text-emerald-400 font-medium">테스트 지갑이 생성되었습니다!</span>
        </div>

        {/* Wallet Address */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-white/60">지갑 주소</p>
            <button
              onClick={copyAddress}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
            >
              {copiedAddress ? (
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
          <code className="block text-white font-mono text-sm break-all bg-black/30 px-3 py-2 rounded-lg">
            {wallet.address}
          </code>
        </div>

        {/* Private Key */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-white/60">프라이빗 키</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
              >
                {showPrivateKey ? (
                  <>
                    <EyeOff className="h-3 w-3" />
                    숨기기
                  </>
                ) : (
                  <>
                    <Eye className="h-3 w-3" />
                    보기
                  </>
                )}
              </button>
              <button
                onClick={copyPrivateKey}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
              >
                {copiedKey ? (
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
          </div>
          <code className="block text-white font-mono text-sm break-all bg-black/30 px-3 py-2 rounded-lg">
            {showPrivateKey ? wallet.privateKey : maskPrivateKey(wallet.privateKey)}
          </code>
        </div>
      </div>

      {/* Next Step: Faucet */}
      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <ExternalLink className="h-4 w-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <p className="text-purple-400 font-medium text-sm">다음 단계: Faucet에서 USDC 받기</p>
            <p className="text-white/60 text-sm mt-1">
              위 지갑 주소를 복사하여 Circle Faucet에서 테스트 USDC를 받으세요.
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

      {/* Regenerate Button */}
      <button
        onClick={generateWallet}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 transition-colors text-sm"
      >
        <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
        새 지갑 생성
      </button>

      {/* Security Warning */}
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-400 font-medium text-sm">보안 주의사항</p>
            <ul className="text-white/60 text-sm mt-1 space-y-1">
              <li>- 프라이빗 키는 MCP 설정에만 사용하세요</li>
              <li>- 이 지갑에 실제 자산을 보관하지 마세요</li>
              <li>- 프라이빗 키를 절대 타인에게 공유하지 마세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
