"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Tab {
  id: string;
  label: string;
  code: string;
  language: string;
}

interface ConfigBlockProps {
  tabs: Tab[];
  className?: string;
}

export function ConfigBlock({ tabs, className = "" }: ConfigBlockProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const activeTabData = tabs.find((t) => t.id === activeTab) || tabs[0];

  const copyToClipboard = async () => {
    if (!activeTabData) return;
    try {
      await navigator.clipboard.writeText(activeTabData.code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!tabs.length) return null;

  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      {/* Tabs */}
      <div className="flex items-center justify-between bg-black/60 border-b border-white/10">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-emerald-400 border-b-2 border-emerald-400 bg-white/5"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 mr-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400">복사됨</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>복사</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={activeTabData?.language || "json"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          borderRadius: 0,
          fontSize: "0.875rem",
        }}
        codeTagProps={{
          style: {
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
          },
        }}
      >
        {activeTabData?.code.trim() || ""}
      </SyntaxHighlighter>
    </div>
  );
}

// Simple code block with copy button (no tabs)
interface SimpleCodeBlockProps {
  code: string;
  language?: string;
  label?: string;
  className?: string;
}

export function CopyableCodeBlock({
  code,
  language = "bash",
  label,
  className = "",
}: SimpleCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between bg-black/60 px-4 py-2 border-b border-white/10">
        {label && <span className="text-sm text-white/50 font-mono">{label}</span>}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors ml-auto"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400">복사됨</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>복사</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          borderRadius: 0,
          fontSize: "0.875rem",
        }}
        codeTagProps={{
          style: {
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
          },
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
