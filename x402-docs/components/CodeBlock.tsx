"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  showLineNumbers = false,
  className = "",
}: CodeBlockProps) {
  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "0.75rem",
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
