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
  WEEK6_TAGS,
  WEEK6_TOC,
  BACKEND_ROLE,
  FRONTEND_BACKEND_ANALOGY,
  BACKEND_RESPONSIBILITIES,
  TECH_STACK_COMPARISON,
  API_CONCEPT,
  API_ANALOGY,
  HTTP_METHODS,
  HTTP_STATUS_CODES,
  CRUD_CONCEPT,
  CRUD_OPERATIONS,
  ENDPOINT_CONCEPT,
  ENDPOINT_EXAMPLES,
  ENDPOINT_ANATOMY,
  REST_CONCEPT,
  REST_VS_RESTFUL,
  REST_CORE_IDEAS,
  REST_PRINCIPLES,
  NESTJS_INTRO,
  NESTJS_SETUP_STEPS,
  NESTJS_FOLDER_STRUCTURE,
  ARCHITECTURE_OVERVIEW,
  LAYERS,
  CONTROLLER_EXPLANATION,
  SERVICE_EXPLANATION,
  AUTH_INTRO,
  AUTH_GENERATE_STEP,
  AUTH_FILE_CONTENTS,
  POSTMAN_TESTS,
  POSTMAN_SETUP_STEPS,
  WEEK6_SUMMARY,
} from "@/constants/week6";

/* ══════════════════════════════════════════
   공통 UI
   ══════════════════════════════════════════ */

function ChapterTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span className="text-4xl md:text-9xl font-extrabold text-(--accent) font-mono mb-6">{num}</span>
      <h2 className="text-2xl md:text-7xl font-bold text-center">{title}</h2>
    </div>
  );
}

const METHOD_COLORS: Record<string, string> = {
  blue:   "bg-blue-500/10 text-blue-400 border-blue-400/30",
  green:  "bg-green-500/10 text-green-400 border-green-400/30",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-400/30",
  red:    "bg-red-500/10 text-red-400 border-red-400/30",
};

function HttpMethodBadge({ method, color }: { method: string; color: string }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded font-mono text-xs font-bold border ${METHOD_COLORS[color] ?? METHOD_COLORS.blue}`}>
      {method}
    </span>
  );
}

const LAYER_COLORS: Record<string, string> = {
  blue:   "border-blue-400/40 bg-blue-500/5",
  accent: "border-(--accent)/40 bg-(--accent)/5",
  purple: "border-purple-400/40 bg-purple-500/5",
  green:  "border-green-400/40 bg-green-500/5",
};

const LAYER_TEXT: Record<string, string> = {
  blue:   "text-blue-400",
  accent: "text-(--accent)",
  purple: "text-purple-400",
  green:  "text-green-400",
};

/* ══════════════════════════════════════════
   VS Code 에디터 (Week2 구조 기반)
   ══════════════════════════════════════════ */

interface TreeNode {
  name: string;
  path?: string;
  children?: TreeNode[];
}

function highlightLine(line: string): { text: string; color: string }[] {
  const tokens: { text: string; color: string }[] = [];
  const rules: [RegExp, string][] = [
    [/\/\/.*/, "#6a9955"],
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/, "#ce9178"],
    [/\b(import|export|from|default|as|async|await)\b/, "#c586c0"],
    [/\b(const|let|var|function|return|if|else|new|throw|typeof)\b/, "#569cd6"],
    [/\b(interface|type|extends|readonly|private)\b/, "#569cd6"],
    [/\b(string|number|boolean|null|undefined|true|false|void|any|Array)\b/, "#4ec9b0"],
    [/\b(Injectable|Controller|Module|Post|Body|Get|Param)\b/, "#4ec9b0"],
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

function FileTreeNode({
  node, depth, activeFile, onSelect,
}: {
  node: TreeNode; depth: number; activeFile: string; onSelect: (p: string) => void;
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
        {open && node.children!.map((child) => (
          <FileTreeNode key={child.name} node={child} depth={depth + 1} activeFile={activeFile} onSelect={onSelect} />
        ))}
      </>
    );
  }

  return (
    <button
      onClick={() => node.path && onSelect(node.path)}
      className={`w-full text-left py-0.5 text-[13px] font-mono flex items-center gap-1.5 transition-colors ${
        isActive ? "bg-[#37373d] text-white" : node.path ? "text-[#cccccc] hover:bg-[#2a2d2e]" : "text-[#8a8a8a]"
      }`}
      style={{ paddingLeft: pl + 14 }}
      disabled={!node.path}
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#e0e0e0" : "#8a8a8a"} strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
      </svg>
      <span>{node.name}</span>
    </button>
  );
}

function VsCodeEditor({
  tree,
  contents,
  defaultFile,
  tabOrder,
  projectName = "my-backend-app",
}: {
  tree: TreeNode[];
  contents: Record<string, { filename: string; code: string; desc: string }>;
  defaultFile: string;
  tabOrder: string[];
  projectName?: string;
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
      {/* 타이틀 바 */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#323233] border-b border-[#3c3c3c] shrink-0">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[#cccccc] text-xs font-mono ml-2">
          {file?.filename ?? ""} — {projectName}
        </span>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* 사이드바 파일 트리 */}
        <div className="w-48 shrink-0 border-r border-[#3c3c3c] bg-[#252526] py-2 overflow-y-auto">
          <p className="text-[#8a8a8a] text-[11px] font-semibold tracking-wider uppercase px-3 mb-1">Explorer</p>
          <p className="text-[#cccccc] text-[13px] font-semibold font-mono px-3 mb-1 uppercase">{projectName}</p>
          {tree.map((node) => (
            <FileTreeNode key={node.name} node={node} depth={0} activeFile={activeFile} onSelect={setActiveFile} />
          ))}
        </div>

        {/* 에디터 영역 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 탭 바 */}
          <div className="flex items-center bg-[#252526] border-b border-[#3c3c3c] shrink-0 overflow-x-auto">
            {tabOrder.filter((k) => contents[k]).map((key) => (
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

          {/* 파일 설명 */}
          {file && (
            <div className="px-4 py-1.5 bg-[#252526] border-b border-[#3c3c3c] shrink-0">
              <p className="text-[#8a8a8a] text-xs">{file.desc}</p>
            </div>
          )}

          {/* 코드 */}
          <div className="flex-1 overflow-auto relative">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#3c3c3c] hover:bg-[#4c4c4c] transition-colors text-[#cccccc] text-xs font-mono"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#28c840" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <span className="w-8 shrink-0 text-right mr-4 text-[#5a5a5a] select-none">{i + 1}</span>
                    <span className="whitespace-pre">
                      {highlightLine(line).map((t, j) => (
                        <span key={j} style={{ color: t.color }}>{t.text}</span>
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

/* ── Postman 테스트 인터랙티브 ── */
function PostmanTest() {
  const [selected, setSelected] = useState(0);
  const test = POSTMAN_TESTS[selected];
  const [showFail, setShowFail] = useState(false);

  return (
    <div>
      {/* 스텝 선택 */}
      <div className="flex gap-2 mb-4">
        {POSTMAN_TESTS.map((t, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setShowFail(false); }}
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
        {/* URL 바 */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#252526] border-b border-[#3c3c3c]">
          <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold border bg-green-500/10 text-green-400 border-green-400/30">
            {test.method}
          </span>
          <span className="font-mono text-sm text-[#cccccc]">{test.url}</span>
        </div>

        {/* Body */}
        <div className="border-b border-[#3c3c3c]">
          <div className="px-4 py-1.5 bg-[#252526] border-b border-[#3c3c3c]">
            <span className="text-[#8a8a8a] text-xs">Body → raw → JSON</span>
          </div>
          <pre className="p-4 text-sm font-mono text-[#ce9178] leading-6">{test.body}</pre>
        </div>

        {/* Response */}
        <div>
          <div className="flex items-center justify-between px-4 py-1.5 bg-[#252526] border-b border-[#3c3c3c]">
            <span className="text-[#8a8a8a] text-xs">Response</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFail(false)}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${!showFail ? "bg-green-500/20 text-green-400" : "text-[#8a8a8a] hover:text-[#cccccc]"}`}
              >
                성공
              </button>
              <button
                onClick={() => setShowFail(true)}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${showFail ? "bg-red-500/20 text-red-400" : "text-[#8a8a8a] hover:text-[#cccccc]"}`}
              >
                실패
              </button>
            </div>
          </div>
          <pre className={`p-4 text-sm font-mono leading-6 ${showFail ? "text-red-300" : "text-[#b5cea8]"}`}>
            {showFail ? test.failResponse : test.successResponse}
          </pre>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Auth 파일 트리
   ══════════════════════════════════════════ */

const AUTH_TREE: TreeNode[] = [
  {
    name: "src",
    children: [
      {
        name: "auth",
        children: [
          {
            name: "dto",
            children: [
              { name: "signup.dto.ts", path: "signupDto" },
              { name: "login.dto.ts", path: "loginDto" },
            ],
          },
          { name: "auth.controller.ts", path: "authController" },
          { name: "auth.module.ts", path: "authModule" },
          { name: "auth.service.ts", path: "authService" },
        ],
      },
      { name: "app.module.ts", path: "appModule" },
    ],
  },
];

const AUTH_TAB_ORDER = ["authController", "authService", "signupDto", "loginDto", "authModule", "appModule"];

/* ══════════════════════════════════════════
   메인 컴포넌트
   ══════════════════════════════════════════ */

export default function Week6Content() {
  return (
    <SlidePresentation>

      {/* ── 제목 ── */}
      <div>
        <WeekHero
          weekNum={6}
          title="백엔드 입문"
          description="API가 무엇인지, REST 설계 원칙은 무엇인지 배우고, NestJS로 회원가입과 로그인 API를 직접 만들어봅니다."
        />
        <div className="flex flex-wrap gap-2 mt-8">
          {WEEK6_TAGS.map((tag) => <Tag key={tag} label={tag} />)}
        </div>
      </div>

      {/* ── 목차 ── */}
      <div>
        <h2 className="text-2xl md:text-6xl font-bold mb-10">목차</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WEEK6_TOC.map((item) => (
            <a
              key={item.num}
              href={item.href}
              className="group flex items-center gap-4 p-5 rounded-xl bg-(--bg-card) border border-(--border) hover:border-(--accent) transition-colors"
            >
              <span className="text-lg md:text-4xl font-bold text-(--accent) font-mono">{item.num}</span>
              <span className="text-sm md:text-xl font-medium group-hover:text-(--accent) transition-colors">
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          01. 백엔드란?
          ══════════════════════════════════════════ */}
      <div data-slide-id="what-is-backend">
        <ChapterTitle num="01" title="백엔드란?" />
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{BACKEND_ROLE.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{BACKEND_ROLE.desc}</p>
        </Card>
        <h3 className="text-xl md:text-4xl font-bold mb-6">{FRONTEND_BACKEND_ANALOGY.title}</h3>
        <div className="space-y-3">
          {FRONTEND_BACKEND_ANALOGY.rows.map((row) => (
            <div key={row.part} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="text-sm md:text-lg font-bold text-(--accent) w-24 shrink-0">{row.part}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium">{row.analogy}</p>
                <p className="text-xs md:text-sm text-(--text-muted) mt-0.5">{row.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">백엔드가 하는 일</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BACKEND_RESPONSIBILITIES.map((r) => (
            <Card key={r.title} className="border-l-4 border-l-(--accent)">
              <div className="flex items-center gap-3 mb-2">
                <BackendIcon type={r.icon} />
                <h4 className="text-base md:text-xl font-bold">{r.title}</h4>
              </div>
              <p className="text-sm md:text-base text-(--text-sub)">{r.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">프론트엔드 vs 백엔드 기술 스택</h3>
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                <th className="text-left px-4 py-3 font-bold text-(--text-muted)"></th>
                <th className="text-left px-4 py-3 font-bold text-(--accent)">프론트엔드</th>
                <th className="text-left px-4 py-3 font-bold text-purple-400">백엔드</th>
              </tr>
            </thead>
            <tbody>
              {TECH_STACK_COMPARISON.map((row) => (
                <tr key={row.aspect} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 font-medium text-(--text-muted) whitespace-nowrap">{row.aspect}</td>
                  <td className="px-4 py-3">{row.frontend}</td>
                  <td className="px-4 py-3">{row.backend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          02. API & REST API
          ══════════════════════════════════════════ */}
      <div data-slide-id="rest-api">
        <ChapterTitle num="02" title="API & REST API" />
      </div>

      {/* API란? + 자판기 비유 */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{API_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{API_CONCEPT.desc}</p>
        </Card>
        <h3 className="text-xl md:text-4xl font-bold mb-6">{API_ANALOGY.title}</h3>
        <div className="space-y-3">
          {API_ANALOGY.steps.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-(--accent)/10 text-(--accent) shrink-0">
                  <ApiIcon type={s.icon} />
                </div>
                {i < API_ANALOGY.steps.length - 1 && <div className="w-0.5 h-6 bg-(--border) mt-1" />}
              </div>
              <div className="flex-1 p-4 rounded-xl bg-(--surface) border border-(--border)">
                <p className="text-xs md:text-sm font-bold text-(--accent) mb-1">{s.role}</p>
                <p className="text-sm md:text-base">{s.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HTTP 메서드 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">HTTP 메서드</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          API 요청은 항상 &quot;어떤 행위를 할지&quot; 나타내는 메서드와 함께 보냅니다.
        </p>
        <div className="space-y-4">
          {HTTP_METHODS.map((m) => (
            <div key={m.method} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <HttpMethodBadge method={m.method} color={m.color} />
              <div className="flex-1 min-w-0">
                <span className="text-sm md:text-lg font-bold">{m.meaning}</span>
                <p className="text-sm md:text-base text-(--text-sub) mt-1 mb-2">{m.desc}</p>
                <code className="text-xs md:text-sm text-(--accent) font-mono">{m.example}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HTTP 상태 코드 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">HTTP 상태 코드</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          서버는 응답과 함께 숫자 코드를 돌려줍니다. 이 코드로 요청이 성공했는지, 실패했는지 알 수 있습니다.
        </p>
        <div className="space-y-2">
          {HTTP_STATUS_CODES.map((s) => (
            <div key={s.code} className="flex items-center gap-4 p-3 rounded-xl bg-(--surface) border border-(--border)">
              <span className={`font-mono font-bold text-base md:text-xl w-12 shrink-0 ${
                s.color === "green" ? "text-green-400" : s.color === "yellow" ? "text-yellow-400" : "text-red-400"
              }`}>{s.code}</span>
              <span className="font-mono text-sm md:text-base w-36 shrink-0 text-(--text-sub)">{s.label}</span>
              <span className="text-sm md:text-base text-(--text-muted)">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CRUD */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{CRUD_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{CRUD_CONCEPT.desc}</p>
        </Card>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CRUD_OPERATIONS.map((op) => (
            <div key={op.letter} className="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">
              <div className={`flex items-center justify-center py-6 ${
                op.methodColor === "green" ? "bg-green-500/10"
                : op.methodColor === "blue" ? "bg-blue-500/10"
                : op.methodColor === "yellow" ? "bg-yellow-500/10"
                : "bg-red-500/10"
              }`}>
                <span className={`text-4xl md:text-7xl font-extrabold font-mono ${
                  op.methodColor === "green" ? "text-green-400"
                  : op.methodColor === "blue" ? "text-blue-400"
                  : op.methodColor === "yellow" ? "text-yellow-400"
                  : "text-red-400"
                }`}>{op.letter}</span>
              </div>
              <div className="p-4">
                <p className="text-base md:text-xl font-bold mb-0.5">{op.name}</p>
                <p className="text-sm text-(--text-muted) mb-3">{op.korean}</p>
                <HttpMethodBadge method={op.method} color={op.methodColor} />
                <p className="text-xs md:text-sm text-(--text-sub) mt-3">{op.example}</p>
                <code className="text-xs text-(--accent) font-mono mt-2 block">{op.endpoint}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 엔드포인트 */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{ENDPOINT_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{ENDPOINT_CONCEPT.desc}</p>
        </Card>
        <h3 className="text-xl md:text-4xl font-bold mb-4">URL 해부하기</h3>
        <div className="p-4 rounded-xl bg-(--surface) border border-(--border) mb-6 overflow-x-auto">
          <code className="text-sm md:text-xl font-mono text-(--accent) whitespace-nowrap">{ENDPOINT_ANATOMY.full}</code>
        </div>
        <div className="space-y-3">
          {ENDPOINT_ANATOMY.parts.map((part) => (
            <div key={part.label} className="flex items-start gap-4 p-3 rounded-xl bg-(--surface) border border-(--border)">
              <code className="text-xs md:text-sm font-mono text-(--accent) w-44 shrink-0 break-all">{part.segment}</code>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-bold mb-0.5">{part.label}</p>
                <p className="text-xs md:text-sm text-(--text-muted)">{part.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">엔드포인트 = 메서드 + 경로</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          같은 <code className="text-(--accent) font-mono">/posts</code> 경로여도 메서드가 다르면 완전히 다른 엔드포인트입니다.
        </p>
        <div className="space-y-2">
          {ENDPOINT_EXAMPLES.map((e, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-(--surface) border border-(--border)">
              <HttpMethodBadge method={e.method} color={e.color} />
              <code className="font-mono text-sm md:text-base w-32 shrink-0">{e.path}</code>
              <span className="text-sm md:text-base text-(--text-sub)">{e.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* REST란? */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{REST_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{REST_CONCEPT.desc}</p>
        </Card>
        <div className="space-y-4">
          {REST_VS_RESTFUL.map((r) => (
            <div key={r.term} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="text-sm md:text-lg font-bold font-mono text-(--accent) w-24 shrink-0">{r.term}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base mb-1">{r.desc}</p>
                <p className="text-xs md:text-sm text-(--text-muted)">{r.analogy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REST 핵심 아이디어 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">REST의 핵심 아이디어</h3>
        <div className="space-y-4">
          {REST_CORE_IDEAS.map((idea, i) => (
            <Card key={i} className="border-l-4 border-l-(--accent)">
              <h4 className="text-base md:text-2xl font-bold mb-2">{idea.idea}</h4>
              <p className="text-sm md:text-base text-(--text-sub) mb-3">{idea.desc}</p>
              <code className="text-xs md:text-sm text-(--accent) font-mono">{idea.example}</code>
            </Card>
          ))}
        </div>
      </div>

      {/* REST 설계 원칙 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">REST 설계 원칙</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">좋은 REST API URL을 만드는 4가지 규칙입니다.</p>
        <div className="space-y-4">
          {REST_PRINCIPLES.map((p, i) => (
            <Card key={i}>
              <h4 className="text-sm md:text-xl font-bold mb-3 text-(--accent)">{p.title}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <code className="text-xs md:text-sm text-red-400 font-mono line-through">{p.bad}</code>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-green-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="16 10 11 15 8 12" />
                  </svg>
                  <code className="text-xs md:text-sm text-green-400 font-mono">{p.good}</code>
                </div>
              </div>
              <p className="text-xs md:text-sm text-(--text-muted) mt-3">{p.reason}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          03. Controller & Service
          ══════════════════════════════════════════ */}
      <div data-slide-id="controller-service">
        <ChapterTitle num="03" title="Controller & Service" />
      </div>

      {/* 아키텍처 다이어그램 */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{ARCHITECTURE_OVERVIEW.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{ARCHITECTURE_OVERVIEW.desc}</p>
        </Card>
        <div className="space-y-2">
          {LAYERS.map((layer) => (
            <div key={layer.name} className="flex flex-col items-center">
              <div className={`w-full p-4 rounded-xl border ${LAYER_COLORS[layer.color]}`}>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-base md:text-xl font-bold font-mono ${LAYER_TEXT[layer.color]}`}>{layer.name}</span>
                  <span className="text-xs md:text-sm text-(--text-muted)">{layer.role}</span>
                </div>
                <p className="text-sm md:text-base text-(--text-sub)">{layer.desc}</p>
              </div>
              {layer.arrow && (
                <svg className="w-6 h-6 text-(--text-muted) my-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controller 개념 (코드 없이) */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">{CONTROLLER_EXPLANATION.title}</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">{CONTROLLER_EXPLANATION.desc}</p>
        <div className="space-y-3">
          {[
            { label: "클라이언트 요청", value: "POST /auth/signup", desc: "어떤 URL·메서드로 왔는지 파악합니다" },
            { label: "라우팅 결정", value: "@Post('signup')", desc: "데코레이터를 보고 맞는 함수를 호출합니다" },
            { label: "Service 위임", value: "authService.signup(dto)", desc: "실제 처리는 Service에게 맡깁니다" },
            { label: "응답 반환", value: "{ success: true }", desc: "Service의 결과를 그대로 클라이언트에 돌려줍니다" },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="text-xs font-bold text-(--text-muted) w-24 shrink-0">{row.label}</span>
              <code className="font-mono text-sm text-(--accent) shrink-0">{row.value}</code>
              <span className="text-sm text-(--text-sub)">{row.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service 개념 (코드 없이) */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">{SERVICE_EXPLANATION.title}</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">{SERVICE_EXPLANATION.desc}</p>
        <div className="space-y-3">
          {[
            { label: "데이터 검증", desc: "이메일 중복인지, 비밀번호가 맞는지 확인합니다" },
            { label: "비즈니스 규칙", desc: "\"같은 이메일로 두 번 가입할 수 없다\" 같은 규칙을 적용합니다" },
            { label: "데이터 저장·조회", desc: "DB(또는 메모리 배열)에서 데이터를 읽고 씁니다" },
            { label: "결과 반환", desc: "처리 결과를 Controller에게 돌려줍니다. 직접 응답하지 않습니다" },
          ].map((row, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">{i + 1}</span>
              <div>
                <p className="text-sm md:text-base font-bold mb-0.5">{row.label}</p>
                <p className="text-sm text-(--text-sub)">{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout type="info" className="mt-6">
          Controller는 &quot;어디로 가야 해?&quot; 를 결정하고, Service는 &quot;실제로 무슨 일을 해야 해?&quot; 를 처리합니다.
        </Callout>
      </div>

      {/* ══════════════════════════════════════════
          04. 프로젝트 실습
          ══════════════════════════════════════════ */}
      <div data-slide-id="practice">
        <ChapterTitle num="04" title="프로젝트 실습" />
      </div>

      {/* NestJS 소개 + 설치 */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{NESTJS_INTRO.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{NESTJS_INTRO.desc}</p>
        </Card>
        <h3 className="text-xl md:text-4xl font-bold mb-6">설치 & 프로젝트 생성</h3>
        <div className="space-y-6">
          {NESTJS_SETUP_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-(--accent) text-white text-sm font-bold shrink-0">{s.step}</span>
                {Number(s.step) < NESTJS_SETUP_STEPS.length && <div className="w-0.5 h-6 bg-(--border) mt-1" />}
              </div>
              <div className="flex-1 pb-2">
                <h4 className="text-sm md:text-xl font-bold mb-1">{s.title}</h4>
                <p className="text-xs md:text-base text-(--text-sub) mb-3">{s.desc}</p>
                <CodeBlock>{s.code}</CodeBlock>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">생성된 프로젝트 구조</h3>
        <CodeBlock title="프로젝트 폴더">{NESTJS_FOLDER_STRUCTURE}</CodeBlock>
        <Callout type="info" className="mt-6">
          Next.js의 app/ 폴더와 비슷하게, NestJS의 핵심 코드는 src/ 안에 있습니다. main.ts가 서버의 시작점입니다.
        </Callout>
      </div>

      {/* 오늘 만들 것 */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{AUTH_INTRO.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{AUTH_INTRO.desc}</p>
        </Card>
        <div className="space-y-3">
          {AUTH_INTRO.endpoints.map((ep, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="px-2.5 py-0.5 rounded font-mono text-sm font-bold border bg-green-500/10 text-green-400 border-green-400/30 shrink-0">
                {ep.method}
              </span>
              <code className="font-mono text-sm md:text-lg text-(--accent) shrink-0">{ep.path}</code>
              <span className="text-sm md:text-base text-(--text-sub)">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* auth 모듈 생성 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">{AUTH_GENERATE_STEP.title}</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">{AUTH_GENERATE_STEP.desc}</p>
        <CodeBlock>{AUTH_GENERATE_STEP.code}</CodeBlock>
        <Callout type="info" className="mt-6">
          CRUD entry points는 <strong>No</strong>를 선택합니다. 회원가입·로그인 엔드포인트는 직접 작성합니다.
        </Callout>
      </div>

      {/* VS Code 에디터로 코드 설명 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">코드 작성하기</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-4">
          생성된 파일을 아래처럼 채웁니다. 탭을 클릭하면 각 파일을 볼 수 있습니다.
        </p>
        <VsCodeEditor
          tree={AUTH_TREE}
          contents={AUTH_FILE_CONTENTS}
          defaultFile="authController"
          tabOrder={AUTH_TAB_ORDER}
        />
      </div>

      {/* Postman 설정 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">Postman으로 테스트하기</h3>
        <div className="space-y-3 mb-8">
          {POSTMAN_SETUP_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-4 p-3 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">{s.step}</span>
              <span className="text-sm md:text-base text-(--text-sub)">{s.desc}</span>
            </div>
          ))}
        </div>
        <PostmanTest />
      </div>

      {/* CORS */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">프론트엔드와 연결 시: CORS</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          Next.js(localhost:3001)에서 NestJS(localhost:3000)로 요청할 때 CORS 오류가 납니다. main.ts에 아래 설정을 추가하세요.
        </p>
        <CodeBlock title="src/main.ts">{`import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
  });

  await app.listen(3000);
}
bootstrap();`}</CodeBlock>
      </div>

      {/* 다음 시간 예고 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">다음 시간에: JWT 인증</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          지금 구현은 로그인 성공 시 <code className="text-(--accent) font-mono">{"{ success: true }"}</code> 만 반환합니다.
          실제 서비스에서는 <strong>JWT(JSON Web Token)</strong>을 발급해서 로그인 상태를 유지합니다.
        </p>
        <div className="space-y-3">
          {[
            { step: "1", label: "로그인 성공", desc: "서버가 JWT 토큰을 발급해서 클라이언트에게 줍니다" },
            { step: "2", label: "토큰 저장", desc: "클라이언트는 토큰을 저장해뒀다가 요청마다 헤더에 실어 보냅니다" },
            { step: "3", label: "토큰 검증", desc: "서버는 헤더의 토큰을 보고 누가 보낸 요청인지 확인합니다" },
          ].map((row) => (
            <div key={row.step} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">{row.step}</span>
              <div>
                <p className="text-sm md:text-base font-bold mb-0.5">{row.label}</p>
                <p className="text-sm text-(--text-sub)">{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout type="info" className="mt-6">
          다음 주차에서 <code className="font-mono">@nestjs/jwt</code>를 사용해 토큰 발급과 인증 Guard를 구현합니다.
        </Callout>
      </div>

      {/* ── 정리 ── */}
      <div>
        <ChapterTitle num="정리" title="오늘 배운 것" />
      </div>

      <div>
        <div className="space-y-3">
          {WEEK6_SUMMARY.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-(--surface) border border-(--border)">
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

function BackendIcon({ type }: { type: string }) {
  const props = { className: "w-5 h-5 text-(--accent) shrink-0", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "database") return (
    <svg {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
  );
  if (type === "cpu") return (
    <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>
  );
  if (type === "shield") return (
    <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  );
  return (
    <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
  );
}

function ApiIcon({ type }: { type: string }) {
  const props = { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "user") return (
    <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  );
  if (type === "file") return (
    <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
  );
  return (
    <svg {...props}><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
  );
}
