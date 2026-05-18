"use client";

import { useState } from "react";

const HIGHLIGHT_RULES: [RegExp, string][] = [
  [/\/\/.*/, "#6a9955"],
  [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/, "#ce9178"],
  [/\b(import|export|from|default|as|async|await|throw|return)\b/, "#c586c0"],
  [/\b(const|let|var|function|if|else|new|typeof|true|false|null|undefined)\b/, "#569cd6"],
  [/\b(interface|type|extends|readonly|private|public|class|constructor)\b/, "#569cd6"],
  [/\b(string|number|boolean|void|any|Promise|Record|Array)\b/, "#4ec9b0"],
  [/\b(Injectable|Controller|Module|Post|Get|Body|Req|UseGuards|Entity|Column|PrimaryGeneratedColumn|CreateDateColumn|UpdateDateColumn|InjectRepository|CanActivate|ExecutionContext|JwtService|Repository)\b/, "#4ec9b0"],
  [/\b\d+\b/, "#b5cea8"],
  [/[{}()\[\]]/, "#ffd700"],
  [/@\w+/, "#dcdcaa"],
];

function highlightLine(line: string): { text: string; color: string }[] {
  const tokens: { text: string; color: string }[] = [];
  let remaining = line;
  while (remaining.length > 0) {
    let earliest = { index: remaining.length, length: 0, color: "" };
    for (const [re, color] of HIGHLIGHT_RULES) {
      const m = remaining.match(re);
      if (m && m.index !== undefined && m.index < earliest.index) {
        earliest = { index: m.index, length: m[0].length, color };
      }
    }
    if (earliest.color) {
      if (earliest.index > 0) tokens.push({ text: remaining.slice(0, earliest.index), color: "#d4d4d4" });
      tokens.push({ text: remaining.slice(earliest.index, earliest.index + earliest.length), color: earliest.color });
      remaining = remaining.slice(earliest.index + earliest.length);
    } else {
      tokens.push({ text: remaining, color: "#d4d4d4" });
      break;
    }
  }
  return tokens;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative shrink-0">
      {copied && (
        <div className="fixed bottom-20 right-6 z-[200] pointer-events-none select-none">
          <div className="px-3 py-1.5 rounded-md bg-(--accent) text-white text-xs font-sans whitespace-nowrap shadow-lg">
            Copied!
          </div>
        </div>
      )}
      <button
        onClick={handleCopy}
        className="text-(--text-muted) hover:text-(--accent) transition-colors cursor-pointer"
        aria-label="Copy command"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      </button>
    </div>
  );
}

export default function CodeBlock({
  children,
  title,
  className,
}: {
  children: string;
  title?: string;
  className?: string;
}) {
  const lines = children.split("\n");

  return (
    <div className={`code-block${className ? ` ${className}` : ""}`}>
      {title && (
        <div className="px-4 py-2 border-b border-(--border) text-sm text-(--text-muted) font-mono">
          {title}
        </div>
      )}
      {/* 코드 영역과 버튼 컬럼을 분리 — 버튼은 overflow-x-auto 밖에 위치 */}
      <div className="relative">
        {/* 스크롤 가능한 코드 텍스트 영역 */}
        <div className="p-4 overflow-x-auto pr-8">
          {lines.map((line, i) => (
            <div key={i} className="min-h-6 flex items-center">
              <span className="whitespace-pre">
                {line
                  ? highlightLine(line).map((t, j) => (
                      <span key={j} style={{ color: t.color }}>{t.text}</span>
                    ))
                  : "\u00A0"}
              </span>
            </div>
          ))}
        </div>
        {/* 복사 버튼 컬럼 — 스크롤 영역 바깥에 절대 위치 */}
        <div className="absolute top-0 right-0 flex flex-col p-4">
          {lines.map((line, i) => {
            const isCommand = line.trimStart().startsWith("$");
            const copyText = line.replace(/^\s*\$\s*/, "").trim();
            return (
              <div key={i} className="min-h-6 flex items-center justify-end">
                {isCommand && <CopyButton text={copyText} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
