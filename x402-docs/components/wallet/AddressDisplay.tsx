"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

interface AddressDisplayProps {
  address: string;
  showCopy?: boolean;
  showExplorer?: boolean;
  truncate?: boolean;
  className?: string;
}

export function AddressDisplay({
  address,
  showCopy = true,
  showExplorer = true,
  truncate = true,
  className = "",
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const displayAddress = truncate
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : address;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const explorerUrl = `https://sepolia.basescan.org/address/${address}`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <code className="text-sm font-mono bg-black/30 px-2 py-1 rounded">
        {displayAddress}
      </code>
      {showCopy && (
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          title="주소 복사"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <Copy className="h-4 w-4 text-white/50 hover:text-white/80" />
          )}
        </button>
      )}
      {showExplorer && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          title="Basescan에서 보기"
        >
          <ExternalLink className="h-4 w-4 text-white/50 hover:text-white/80" />
        </a>
      )}
    </div>
  );
}
