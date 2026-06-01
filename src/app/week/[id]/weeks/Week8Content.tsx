"use client";

import { useState } from "react";
import {
  Card,
  Callout,
  WeekHero,
  Tag,
  SlidePresentation,
  CodeBlock,
} from "@/components";
import {
  WEEK8_TAGS,
  WEEK8_TOC,
  WEEK8_OVERVIEW,
  WEEK8_GOALS,
  WEEK8_STACK,
  FRONTEND_CLONE_STEPS,
  TWO_SERVER_INFO,
  API_DOCS,
  DB_DESIGN_INTRO,
  DB_DESIGN_STEPS,
  CORS_CONCEPT,
  CORS_ORIGIN_PARTS,
  CORS_ERROR_MESSAGE,
  TODO_ENTITY_COLUMNS,
  TODO_TABLE_ROWS,
  MODULE_DEPS,
  PRACTICE_FILE_CONTENTS,
  PRACTICE_FILE_TREE,
  PRACTICE_TAB_ORDER,
  TODO_API_TESTS,
  WEEK8_SUMMARY,
} from "@/constants/week8";

/* ══════════════════════════════════════════
   공통 UI
   ══════════════════════════════════════════ */

function ChapterTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span className="text-4xl md:text-9xl font-extrabold text-(--accent) font-mono mb-6">
        {num}
      </span>
      <h2 className="text-2xl md:text-7xl font-bold text-center">{title}</h2>
    </div>
  );
}

/* ══════════════════════════════════════════
   VS Code 에디터
   ══════════════════════════════════════════ */

interface TreeNode {
  name: string;
  path?: string;
  isNew?: boolean;
  children?: TreeNode[];
}

function highlightLine(line: string): { text: string; color: string }[] {
  const tokens: { text: string; color: string }[] = [];
  const rules: [RegExp, string][] = [
    [/\/\/.*/, "#6a9955"],
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/, "#ce9178"],
    [/\b(import|export|from|default|as|async|await|throw|return)\b/, "#c586c0"],
    [/\b(const|let|var|function|if|else|new|typeof|true|false|null)\b/, "#569cd6"],
    [/\b(interface|type|extends|readonly|private|class)\b/, "#569cd6"],
    [/\b(string|number|boolean|void|any|Promise|Record)\b/, "#4ec9b0"],
    [
      /\b(Injectable|Controller|Module|Post|Get|Patch|Delete|Body|Param|Req|UseGuards|Entity|Column|PrimaryGeneratedColumn|CreateDateColumn|InjectRepository|CanActivate|ExecutionContext|NestFactory)\b/,
      "#4ec9b0",
    ],
    [/\b\d+\b/, "#b5cea8"],
    [/[{}()\[\]]/, "#ffd700"],
    [/@\w+/, "#dcdcaa"],
  ];
  let remaining = line;
  while (remaining.length > 0) {
    let earliest = { index: remaining.length, length: 0, color: "" };
    for (const [re, color] of rules) {
      const m = remaining.match(re);
      if (m && m.index !== undefined && m.index < earliest.index) {
        earliest = { index: m.index, length: m[0].length, color };
      }
    }
    if (earliest.color) {
      if (earliest.index > 0)
        tokens.push({ text: remaining.slice(0, earliest.index), color: "#d4d4d4" });
      tokens.push({
        text: remaining.slice(earliest.index, earliest.index + earliest.length),
        color: earliest.color,
      });
      remaining = remaining.slice(earliest.index + earliest.length);
    } else {
      tokens.push({ text: remaining, color: "#d4d4d4" });
      break;
    }
  }
  return tokens;
}

function FileTreeNode({
  node,
  depth,
  activeFile,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  activeFile: string;
  onSelect: (p: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const isFolder = !!node.children;
  const isActive = node.path === activeFile;
  const pl = 8 + depth * 14;

  if (isFolder) {
    return (
      <>
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left py-0.5 hover:bg-[#2a2d2e] flex items-center gap-1 text-[13px] font-mono text-[#cccccc]"
          style={{ paddingLeft: pl }}
        >
          <span className="text-[#8a8a8a] text-xs">{open ? "▾" : "▸"}</span>
          <span>{node.name}</span>
        </button>
        {open &&
          node.children!.map((child) => (
            <FileTreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              activeFile={activeFile}
              onSelect={onSelect}
            />
          ))}
      </>
    );
  }

  return (
    <button
      onClick={() => node.path && onSelect(node.path)}
      className={`w-full text-left py-0.5 text-[13px] font-mono flex items-center gap-1.5 transition-colors ${
        isActive
          ? "bg-[#37373d] text-white"
          : node.path
          ? "text-[#cccccc] hover:bg-[#2a2d2e]"
          : "text-[#8a8a8a]"
      }`}
      style={{ paddingLeft: pl + 14 }}
      disabled={!node.path}
    >
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isActive ? "#e0e0e0" : "#8a8a8a"}
        strokeWidth="1.5"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
      </svg>
      <span>{node.name}</span>
      {node.isNew && (
        <span className="shrink-0 text-[10px] px-1 py-0.5 rounded bg-green-500/20 text-green-400 font-sans">
          NEW
        </span>
      )}
    </button>
  );
}

function VsCodeEditor({
  tree,
  contents,
  defaultFile,
  tabOrder,
}: {
  tree: TreeNode[];
  contents: Record<string, { filename: string; code: string; desc: string }>;
  defaultFile: string;
  tabOrder: string[];
}) {
  const [activeFile, setActiveFile] = useState(defaultFile);
  const [copied, setCopied] = useState(false);
  const file = contents[activeFile];

  const handleCopy = async () => {
    if (!file) return;
    await navigator.clipboard.writeText(file.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-[#3c3c3c] bg-[#1e1e1e] h-[560px] flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#323233] border-b border-[#3c3c3c] shrink-0">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[#cccccc] text-xs font-mono ml-2">
          {file?.filename ?? ""} — my-backend-app
        </span>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="w-64 shrink-0 border-r border-[#3c3c3c] bg-[#252526] py-2 overflow-y-auto">
          <p className="text-[#8a8a8a] text-[11px] font-semibold tracking-wider uppercase px-3 mb-1">
            Explorer
          </p>
          <p className="text-[#cccccc] text-[13px] font-semibold font-mono px-3 mb-1 uppercase">
            my-backend-app
          </p>
          {tree.map((node) => (
            <FileTreeNode
              key={node.name}
              node={node}
              depth={0}
              activeFile={activeFile}
              onSelect={setActiveFile}
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center bg-[#252526] border-b border-[#3c3c3c] shrink-0 overflow-x-auto">
            {tabOrder
              .filter((k) => contents[k])
              .map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFile(key)}
                  className={`px-4 py-2 text-xs font-mono border-r border-[#3c3c3c] whitespace-nowrap transition-colors ${
                    key === activeFile
                      ? "bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]"
                      : "text-[#8a8a8a] hover:bg-[#2d2d2d]"
                  }`}
                >
                  {contents[key].filename.split("/").pop()}
                </button>
              ))}
          </div>

          {file && (
            <div className="px-4 py-1.5 bg-[#252526] border-b border-[#3c3c3c] shrink-0">
              <p className="text-[#8a8a8a] text-xs">{file.desc}</p>
            </div>
          )}

          <div className="flex-1 overflow-auto relative">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#3c3c3c] hover:bg-[#4c4c4c] transition-colors text-[#cccccc] text-xs font-mono"
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#28c840"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
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
                  Copy
                </>
              )}
            </button>
            {file && (
              <pre className="p-4 pr-24 text-sm font-mono leading-6">
                {file.code.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 shrink-0 text-right mr-4 text-[#5a5a5a] select-none">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">
                      {highlightLine(line).map((t, j) => (
                        <span key={j} style={{ color: t.color }}>
                          {t.text}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* API 테스트 패널 */
function ApiTestPanel() {
  const [selected, setSelected] = useState(0);
  const [showError, setShowError] = useState(false);
  const test = TODO_API_TESTS[selected];

  const METHOD_COLORS: Record<string, string> = {
    green: "bg-green-500/10 text-green-400 border-green-400/30",
    blue: "bg-blue-500/10 text-blue-400 border-blue-400/30",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-400/30",
    red: "bg-red-500/10 text-red-400 border-red-400/30",
  };

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {TODO_API_TESTS.map((t, i) => (
          <button
            key={i}
            onClick={() => {
              setSelected(i);
              setShowError(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              selected === i
                ? "bg-(--accent) border-(--accent) text-white"
                : "bg-(--surface) border-(--border) text-(--text-sub) hover:border-(--accent)/40"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[#3c3c3c] bg-[#1e1e1e] overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-[#252526] border-b border-[#3c3c3c]">
          <span
            className={`inline-block px-2.5 py-0.5 rounded font-mono text-xs font-bold border ${
              METHOD_COLORS[test.methodColor]
            }`}
          >
            {test.method}
          </span>
          <span className="font-mono text-sm text-[#cccccc]">{test.url}</span>
        </div>

        <div className="border-b border-[#3c3c3c]">
          <div className="px-4 py-1.5 bg-[#252526] border-b border-[#3c3c3c]">
            <span className="text-[#8a8a8a] text-xs">{test.inputLabel}</span>
          </div>
          <pre className="p-4 text-sm font-mono text-[#ce9178] leading-6">{test.input}</pre>
        </div>

        <div>
          <div className="flex items-center justify-between px-4 py-1.5 bg-[#252526] border-b border-[#3c3c3c]">
            <span className="text-[#8a8a8a] text-xs">Response</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowError(false)}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  !showError
                    ? "bg-green-500/20 text-green-400"
                    : "text-[#8a8a8a] hover:text-[#cccccc]"
                }`}
              >
                성공
              </button>
              <button
                onClick={() => setShowError(true)}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  showError
                    ? "bg-red-500/20 text-red-400"
                    : "text-[#8a8a8a] hover:text-[#cccccc]"
                }`}
              >
                실패
              </button>
            </div>
          </div>
          <pre
            className={`p-4 text-sm font-mono leading-6 ${
              showError ? "text-red-300" : "text-[#b5cea8]"
            }`}
          >
            {showError ? test.errorResponse : test.successResponse}
          </pre>
        </div>
      </div>
    </div>
  );
}

/* API 문서 아코디언 */
function ApiDocsPanel() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const METHOD_COLORS: Record<string, string> = {
    green: "bg-green-500/10 text-green-400 border-green-400/30",
    blue: "bg-blue-500/10 text-blue-400 border-blue-400/30",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-400/30",
    red: "bg-red-500/10 text-red-400 border-red-400/30",
  };

  return (
    <div className="space-y-2">
      {API_DOCS.map((api, i) => (
        <div key={i} className="rounded-xl border border-(--border) overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-(--surface) transition-colors"
          >
            <span
              className={`shrink-0 inline-block px-2.5 py-0.5 rounded font-mono text-xs font-bold border ${
                METHOD_COLORS[api.methodColor]
              }`}
            >
              {api.method}
            </span>
            <code className="text-sm font-mono text-(--text-sub) shrink-0">{api.path}</code>
            <span className="flex-1 text-sm text-(--text-muted) hidden sm:block">{api.desc}</span>
            {api.auth && (
              <svg
                className="w-3.5 h-3.5 text-yellow-400 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            )}
            <svg
              className={`w-4 h-4 text-(--text-muted) transition-transform shrink-0 ${
                openIndex === i ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {openIndex === i && (
            <div className="border-t border-(--border) p-4 space-y-4 bg-(--surface)/40">
              {/* 설명 + Auth */}
              <div className="flex items-start gap-3 flex-wrap">
                <p className="text-sm text-(--text-sub) flex-1">{api.desc}</p>
                {api.auth ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-400">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    JWT 필요
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-(--surface) border border-(--border) text-(--text-muted)">
                    인증 없음
                  </span>
                )}
              </div>

              {/* 요청 바디 */}
              {api.request && (
                <div>
                  <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-2">
                    Request Body
                    <span className="ml-2 font-normal text-(--text-muted) lowercase tracking-normal normal-case">application/json</span>
                  </p>
                  <div className="rounded-lg overflow-hidden border border-(--border)">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-(--surface) border-b border-(--border)">
                          <th className="text-left px-3 py-2 font-bold text-(--accent)">필드</th>
                          <th className="text-left px-3 py-2 font-bold text-purple-400">타입</th>
                          <th className="text-left px-3 py-2 font-bold text-(--text-muted)">필수</th>
                          <th className="text-left px-3 py-2 font-bold text-(--text-muted)">설명</th>
                        </tr>
                      </thead>
                      <tbody>
                        {api.request.fields.map((f) => (
                          <tr key={f.name} className="border-b border-(--border) last:border-b-0">
                            <td className="px-3 py-2 font-mono text-(--accent)">{f.name}</td>
                            <td className="px-3 py-2 font-mono text-purple-400">{f.type}</td>
                            <td className="px-3 py-2">
                              {f.required ? (
                                <span className="text-red-400 font-bold">✕</span>
                              ) : (
                                <span className="text-(--text-muted)">선택</span>
                              )}
                            </td>
                            <td className="px-3 py-2 text-(--text-sub)">{f.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 응답 예시 */}
              <div>
                <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-2">
                  Response
                  <span className="ml-2 font-normal lowercase tracking-normal normal-case text-green-400">200 OK</span>
                </p>
                <pre className="p-3 rounded-lg bg-[#1e1e1e] border border-[#3c3c3c] text-xs font-mono text-[#b5cea8] overflow-x-auto">
                  {api.response}
                </pre>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   메인 컴포넌트
   ══════════════════════════════════════════ */

export default function Week8Content() {
  return (
    <SlidePresentation>

      {/* ── 제목 ── */}
      <div>
        <WeekHero
          weekNum={8}
          title="프론트엔드 연동 실습"
          description="완성된 프론트엔드를 클론하고, 이를 위한 백엔드를 직접 만들어 로컬에서 연동합니다."
        />
        <div className="flex flex-wrap gap-2 mt-8">
          {WEEK8_TAGS.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* ── 목차 ── */}
      <div>
        <h2 className="text-2xl md:text-6xl font-bold mb-10">목차</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WEEK8_TOC.map((item) => (
            <a
              key={item.num}
              href={item.href}
              className="group flex items-center gap-4 p-5 rounded-xl bg-(--bg-card) border border-(--border) hover:border-(--accent) transition-colors"
            >
              <span className="text-lg md:text-4xl font-bold text-(--accent) font-mono">
                {item.num}
              </span>
              <span className="text-sm md:text-xl font-medium group-hover:text-(--accent) transition-colors">
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          01. 오늘의 목표
          ══════════════════════════════════════════ */}
      <div data-slide-id="goal">
        <ChapterTitle num="01" title="오늘의 목표" />
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {WEEK8_OVERVIEW.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{WEEK8_OVERVIEW.desc}</p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {WEEK8_GOALS.map((goal) => (
            <Card key={goal.title} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-(--accent)/10 shrink-0">
                <GoalIcon type={goal.icon} />
              </div>
              <div>
                <h4 className="text-base md:text-xl font-bold mb-1">{goal.title}</h4>
                <p className="text-sm md:text-base text-(--text-sub)">{goal.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        <h3 className="text-xl md:text-3xl font-bold mb-4">오늘 사용하는 기술 스택</h3>
        <div className="flex flex-wrap gap-3">
          {WEEK8_STACK.map((s) => (
            <div
              key={s.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                s.color === "blue"
                  ? "bg-blue-500/5 border-blue-400/30"
                  : s.color === "accent"
                  ? "bg-(--accent)/5 border-(--accent)/30"
                  : "bg-green-500/5 border-green-400/30"
              }`}
            >
              <span
                className={`text-xs font-bold ${
                  s.color === "blue"
                    ? "text-blue-400"
                    : s.color === "accent"
                    ? "text-(--accent)"
                    : "text-green-400"
                }`}
              >
                {s.label}
              </span>
              <span className="text-sm text-(--text-sub) font-mono">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          02. 프론트엔드 클론
          ══════════════════════════════════════════ */}
      <div data-slide-id="clone">
        <ChapterTitle num="02" title="프론트엔드 클론" />
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">두 서버를 동시에 실행</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">
          프론트엔드와 백엔드를 각각 별도 터미널에서 실행합니다.
        </p>

        {/* 두 서버 시각화 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {TWO_SERVER_INFO.map((server) => (
            <div
              key={server.label}
              className={`p-5 rounded-xl border ${
                server.color === "blue"
                  ? "bg-blue-500/5 border-blue-400/30"
                  : "bg-(--accent)/5 border-(--accent)/30"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`text-sm font-bold ${
                    server.color === "blue" ? "text-blue-400" : "text-(--accent)"
                  }`}
                >
                  {server.label}
                </span>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                    server.color === "blue"
                      ? "border-blue-400/30 text-blue-400"
                      : "border-(--accent)/30 text-(--accent)"
                  }`}
                >
                  :{server.port}
                </span>
              </div>
              <code className="text-xs text-(--text-muted) font-mono block mb-1">
                {server.path}
              </code>
              <code className="text-sm text-(--text-sub) font-mono">{server.command}</code>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {FRONTEND_CLONE_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-(--accent) text-white text-sm font-bold shrink-0">
                  {s.step}
                </span>
                {Number(s.step) < FRONTEND_CLONE_STEPS.length && (
                  <div className="w-0.5 h-6 bg-(--border) mt-1" />
                )}
              </div>
              <div className="flex-1 pb-2">
                <h4 className="text-sm md:text-xl font-bold mb-1">{s.title}</h4>
                {s.desc && (
                  <p className="text-xs md:text-base text-(--text-sub) mb-3">{s.desc}</p>
                )}
                <CodeBlock>{s.code}</CodeBlock>
              </div>
            </div>
          ))}
        </div>

        <Callout type="info" className="mt-6">
          두 터미널을 나란히 열어두면 양쪽 로그를 동시에 확인할 수 있어 디버깅에 편리합니다.
        </Callout>
      </div>

      {/* ══════════════════════════════════════════
          03. API 문서
          ══════════════════════════════════════════ */}
      <div data-slide-id="apidocs">
        <ChapterTitle num="03" title="API 문서" />
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">구현할 API 명세</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          프론트엔드가 호출하는 엔드포인트 7개입니다. 각 항목을 클릭하면 요청·응답 형식을 확인할 수 있습니다.
          <span className="inline-flex items-center gap-1 ml-2 text-xs text-yellow-400">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            는 JWT 필요
          </span>
        </p>
        <ApiDocsPanel />
        <Callout type="info" className="mt-4">
          /auth 3개는 7주차에 이미 완성했습니다. 오늘은 <code className="font-mono">/todos</code> 4개를 새로 만듭니다.
        </Callout>
      </div>

      {/* ══════════════════════════════════════════
          04. DB 설계
          ══════════════════════════════════════════ */}
      <div data-slide-id="db">
        <ChapterTitle num="04" title="DB 설계" />
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {DB_DESIGN_INTRO.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{DB_DESIGN_INTRO.desc}</p>
        </Card>

        <div className="space-y-6">
          {DB_DESIGN_STEPS.map((s, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-(--accent) text-white text-sm font-bold shrink-0">
                  {s.step}
                </span>
                {i < DB_DESIGN_STEPS.length - 1 && (
                  <div className="w-0.5 flex-1 bg-(--border) mt-1 min-h-[2rem]" />
                )}
              </div>
              <div className="flex-1 pb-2">
                <h4 className="text-sm md:text-xl font-bold mb-2">{s.title}</h4>
                <div className="p-3 rounded-xl bg-(--accent)/5 border border-(--accent)/20 mb-3">
                  <p className="text-sm text-(--accent) font-medium">{s.question}</p>
                </div>
                <CodeBlock>{s.snippet}</CodeBlock>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          04. CORS
          ══════════════════════════════════════════ */}
      <div data-slide-id="cors">
        <ChapterTitle num="05" title="CORS 설정" />
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {CORS_CONCEPT.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{CORS_CONCEPT.desc}</p>
        </Card>

        <h3 className="text-xl md:text-3xl font-bold mb-4">Origin 비교</h3>
        <div className="space-y-4 mb-8">
          {CORS_ORIGIN_PARTS.map((origin, oi) => (
            <div key={oi} className="p-4 rounded-xl bg-(--surface) border border-(--border)">
              <p className="text-xs text-(--text-muted) mb-3">{origin.label}</p>
              <div className="flex items-center gap-1 flex-wrap">
                {origin.parts.map((part, pi) => (
                  <span key={pi} className="flex flex-col items-center">
                    <code
                      className={`text-sm md:text-base font-mono font-bold px-2 py-1 rounded ${
                        part.color === "blue"
                          ? "bg-blue-500/10 text-blue-400"
                          : part.color === "purple"
                          ? "bg-purple-500/10 text-purple-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {part.text}
                    </code>
                    <span className="text-[10px] text-(--text-muted) mt-1">{part.role}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-3">브라우저 콘솔 에러</h3>
        <div className="rounded-xl bg-red-500/5 border border-red-400/30 p-4 mb-6">
          <pre className="text-xs md:text-sm font-mono text-red-300 whitespace-pre-wrap">
            {CORS_ERROR_MESSAGE}
          </pre>
        </div>

        <Callout type="warn">
          CORS 에러는 서버가 아닌 <strong>브라우저</strong>가 차단하는 것입니다. 서버에서
          응답 헤더에 허용 출처를 명시해야 브라우저가 통과시킵니다.
        </Callout>
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">CORS 해결: main.ts 수정</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          <code className="text-(--accent) font-mono">app.enableCors()</code>를 추가하면
          NestJS가 응답에 허용 헤더를 자동으로 붙여줍니다.
        </p>
        <CodeBlock>{PRACTICE_FILE_CONTENTS.mainTs.code}</CodeBlock>
        <Callout type="info" className="mt-6">
          프로덕션 배포 시에는 <code className="font-mono">origin</code>을 실제 프론트엔드
          도메인으로 교체합니다. 개발 중에는{" "}
          <code className="font-mono">origin: true</code>로 모든 출처를 허용할 수도 있습니다.
        </Callout>
      </div>

      {/* ══════════════════════════════════════════
          05. Todo API 구현
          ══════════════════════════════════════════ */}
      <div data-slide-id="practice">
        <ChapterTitle num="06" title="Todo API 구현" />
      </div>

      {/* Todo Entity */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">todos 테이블 구조</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          <code className="text-(--accent) font-mono">userId</code> 컬럼으로 누가 만든 할
          일인지를 기록합니다. 조회·수정·삭제 시 이 값을 조건에 포함해 본인 것만 접근합니다.
        </p>

        {/* 테이블 미리보기 */}
        <div className="overflow-x-auto rounded-xl border border-(--border) mb-8">
          <table className="w-full text-xs md:text-sm font-mono">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                {["id", "title", "done", "userId", "createdAt"].map((col) => (
                  <th key={col} className="text-left px-4 py-3 font-bold text-(--accent)">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TODO_TABLE_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 text-blue-400">{row.id}</td>
                  <td className="px-4 py-3 text-(--text-sub)">{row.title}</td>
                  <td
                    className={`px-4 py-3 ${row.done ? "text-green-400" : "text-(--text-muted)"}`}
                  >
                    {String(row.done)}
                  </td>
                  <td className="px-4 py-3 text-yellow-400">{row.userId}</td>
                  <td className="px-4 py-3 text-(--text-muted)">{row.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 컬럼 설명 */}
        <div className="space-y-2">
          {TODO_ENTITY_COLUMNS.map((col) => (
            <div key={col.column} className="p-3 rounded-xl bg-(--surface) border border-(--border)">
              <div className="flex items-center gap-2 mb-1">
                <code
                  className={`text-xs font-mono font-bold ${
                    col.color === "blue"
                      ? "text-blue-400"
                      : col.color === "green"
                      ? "text-green-400"
                      : col.color === "yellow"
                      ? "text-yellow-400"
                      : "text-purple-400"
                  }`}
                >
                  {col.column}
                </code>
                <span className="text-xs text-(--text-muted) font-mono">{col.type}</span>
              </div>
              <p className="text-xs text-(--text-sub)">{col.desc}</p>
              <code className="text-xs text-(--text-muted) font-mono">{col.decorator}</code>
            </div>
          ))}
        </div>
      </div>

      {/* 모듈 의존 관계 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">{MODULE_DEPS.title}</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">{MODULE_DEPS.desc}</p>
        <div className="flex flex-col items-center gap-2">
          {MODULE_DEPS.nodes.map((node, i) => (
            <div key={node.name} className="flex flex-col items-center w-full">
              <div
                className={`w-full max-w-md p-4 rounded-xl border text-center ${
                  node.color === "accent"
                    ? "bg-(--accent)/5 border-(--accent)/30"
                    : node.color === "purple"
                    ? "bg-purple-500/5 border-purple-400/30"
                    : "bg-blue-500/5 border-blue-400/30"
                }`}
              >
                <p
                  className={`text-base font-bold font-mono mb-1 ${
                    node.color === "accent"
                      ? "text-(--accent)"
                      : node.color === "purple"
                      ? "text-purple-400"
                      : "text-blue-400"
                  }`}
                >
                  {node.name}
                </p>
                <p className="text-xs text-(--text-muted)">{node.role}</p>
              </div>
              {i < MODULE_DEPS.nodes.length - 1 && (
                <svg
                  className="w-5 h-5 text-(--text-muted) my-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <Callout type="info" className="mt-6">
          TodoModule이 AuthModule을 imports하면, AuthModule이 exports한 JwtModule의
          JwtService를 JwtAuthGuard에서 사용할 수 있습니다.
        </Callout>
      </div>

      {/* VS Code 에디터 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">코드 작성하기</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs font-bold font-mono">
            NEW
          </span>{" "}
          표시는 새로 만드는 파일, 나머지는 기존 파일을 수정합니다.
        </p>
        <VsCodeEditor
          tree={PRACTICE_FILE_TREE}
          contents={PRACTICE_FILE_CONTENTS}
          defaultFile="mainTs"
          tabOrder={PRACTICE_TAB_ORDER}
        />

        <div className="mt-6 space-y-4">
          <Callout type="warn">
            <strong>app.module.ts 빠뜨리기 쉬운 두 가지</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              <li>
                <code className="font-mono">entities</code> 배열에{" "}
                <code className="font-mono">Todo</code>를 추가해야 DB에 todos 테이블이 생깁니다.
                빠지면 <code className="font-mono">/todos</code> 요청 시 테이블 없음 에러가 납니다.
              </li>
              <li>
                <code className="font-mono">imports</code>에{" "}
                <code className="font-mono">TodoModule</code>을 추가해야{" "}
                <code className="font-mono">/todos</code> 라우트가 등록됩니다.
                빠지면 404가 반환됩니다.
              </li>
            </ul>
          </Callout>

          <Callout type="info">
            <strong>CORS 에러가 나면</strong> — <code className="font-mono">main.ts</code>에{" "}
            <code className="font-mono">app.enableCors()</code>를 추가한 뒤 반드시 서버를
            재시작해야 합니다. 수정만 하고 재시작을 안 하면 변경사항이 적용되지 않습니다.
          </Callout>

          <Callout type="info">
            <strong>포트 충돌(EADDRINUSE) 에러가 나면</strong> — 이전에 실행한 서버가 아직
            살아있는 경우입니다.{" "}
            <code className="font-mono">lsof -ti :3000 | xargs kill -9</code> 로 해당 포트를
            점유한 프로세스를 종료한 뒤 다시 실행합니다.
          </Callout>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          06. 연동 테스트
          ══════════════════════════════════════════ */}
      <div data-slide-id="test">
        <ChapterTitle num="07" title="연동 테스트" />
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">API 테스트 (Postman)</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">
          로그인으로 토큰을 받은 뒤, 해당 토큰을 Authorization 헤더에 붙여 Todo API를
          테스트합니다.
        </p>
        <ApiTestPanel />
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">브라우저에서 확인</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">
          두 서버가 모두 실행 중인 상태에서{" "}
          <code className="text-(--accent) font-mono">http://localhost:3001</code>에 접속해
          직접 사용해봅니다.
        </p>
        <div className="space-y-3">
          {[
            { step: "1", title: "회원가입", desc: "새 계정을 만듭니다." },
            { step: "2", title: "로그인", desc: "로그인 후 토큰이 localStorage에 저장되는지 개발자 도구로 확인합니다." },
            { step: "3", title: "할 일 추가", desc: "입력창에 할 일을 입력하고 추가합니다. DataGrip에서 todos 테이블에 행이 생기는지 확인합니다." },
            { step: "4", title: "완료 토글", desc: "할 일을 클릭해 done 값이 바뀌는지 확인합니다." },
            { step: "5", title: "삭제", desc: "삭제 버튼을 눌러 DB에서도 제거되는지 확인합니다." },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">
                {item.step}
              </span>
              <div>
                <p className="text-sm md:text-base font-bold mb-0.5">{item.title}</p>
                <p className="text-sm text-(--text-sub)">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout type="warn" className="mt-6">
          CORS 에러가 여전히 발생하면 NestJS 서버를 재시작했는지 확인합니다. main.ts를 수정한
          뒤에는 <code className="font-mono">npm run start:dev</code>로 재실행해야 합니다.
        </Callout>
      </div>

      {/* ── 정리 ── */}
      <div>
        <ChapterTitle num="정리" title="오늘 배운 것" />
      </div>

      <div>
        <div className="space-y-3">
          {WEEK8_SUMMARY.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl bg-(--surface) border border-(--border)"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-base font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-sm md:text-xl font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </SlidePresentation>
  );
}

/* ── 아이콘 헬퍼 ── */

function GoalIcon({ type }: { type: string }) {
  const props = {
    className: "w-5 h-5 text-(--accent)",
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "search")
    return (
      <svg {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  if (type === "link")
    return (
      <svg {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  if (type === "code")
    return (
      <svg {...props}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  return (
    <svg {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
