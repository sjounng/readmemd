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
  WEEK7_TAGS,
  WEEK7_TOC,
  WEEK6_LIMITS,
  DB_CONCEPT,
  DB_ANALOGY,
  RDBMS_CONCEPT,
  SCHEMA_EXAMPLE,
  USER_TABLE_ROWS,
  ORM_CONCEPT,
  ORM_COMPARISON,
  TYPEORM_ADVANTAGES,
  ENTITY_CONCEPT,
  ENTITY_CODE,
  USER_ENTITY_COLUMNS,
  REPOSITORY_CONCEPT,
  REPOSITORY_METHODS,
  LAYER_WITH_DB,
  BCRYPT_DANGER,
  BCRYPT_PROPERTIES,
  BCRYPT_USAGE,
  JWT_CONCEPT,
  JWT_VS_SESSION,
  JWT_STRUCTURE,
  JWT_FLOW,
  GUARD_CONCEPT,
  GUARD_FLOW,
  PRACTICE_INSTALL_STEPS,
  POSTGRES_INSTALL_STEPS,
  DATAGRIP_STEPS,
  PRACTICE_FILE_CONTENTS,
  PRACTICE_FILE_TREE,
  PRACTICE_TAB_ORDER,
  PRACTICE_POSTMAN_TESTS,
  WEEK7_SUMMARY,
} from "@/constants/week7";

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

const LAYER_COLORS: Record<string, string> = {
  blue: "border-blue-400/40 bg-blue-500/5",
  accent: "border-(--accent)/40 bg-(--accent)/5",
  purple: "border-purple-400/40 bg-purple-500/5",
  yellow: "border-yellow-400/40 bg-yellow-500/5",
  green: "border-green-400/40 bg-green-500/5",
};

const LAYER_TEXT: Record<string, string> = {
  blue: "text-blue-400",
  accent: "text-(--accent)",
  purple: "text-purple-400",
  yellow: "text-yellow-400",
  green: "text-green-400",
};

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
    [/\b(Injectable|Controller|Module|Post|Get|Body|Req|UseGuards|Entity|Column|PrimaryGeneratedColumn|CreateDateColumn|InjectRepository|CanActivate|ExecutionContext)\b/, "#4ec9b0"],
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
      {node.isNew && (
        <span className="shrink-0 text-[10px] px-1 py-0.5 rounded bg-green-500/20 text-green-400 font-sans">NEW</span>
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
          <p className="text-[#8a8a8a] text-[11px] font-semibold tracking-wider uppercase px-3 mb-1">Explorer</p>
          <p className="text-[#cccccc] text-[13px] font-semibold font-mono px-3 mb-1 uppercase">my-backend-app</p>
          {tree.map((node) => (
            <FileTreeNode key={node.name} node={node} depth={0} activeFile={activeFile} onSelect={setActiveFile} />
          ))}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
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

/* Postman 테스트 */
function PracticePostmanTest() {
  const [selected, setSelected] = useState(0);
  const [showError, setShowError] = useState(false);
  const test = PRACTICE_POSTMAN_TESTS[selected];

  const METHOD_COLORS: Record<string, string> = {
    green: "bg-green-500/10 text-green-400 border-green-400/30",
    blue: "bg-blue-500/10 text-blue-400 border-blue-400/30",
  };

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {PRACTICE_POSTMAN_TESTS.map((t, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setShowError(false); }}
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
          <span className={`inline-block px-2.5 py-0.5 rounded font-mono text-xs font-bold border ${METHOD_COLORS[test.methodColor]}`}>
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
                className={`text-xs px-2 py-0.5 rounded transition-colors ${!showError ? "bg-green-500/20 text-green-400" : "text-[#8a8a8a] hover:text-[#cccccc]"}`}
              >
                성공
              </button>
              <button
                onClick={() => setShowError(true)}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${showError ? "bg-red-500/20 text-red-400" : "text-[#8a8a8a] hover:text-[#cccccc]"}`}
              >
                실패
              </button>
            </div>
          </div>
          <pre className={`p-4 text-sm font-mono leading-6 ${showError ? "text-red-300" : "text-[#b5cea8]"}`}>
            {showError ? test.errorResponse : test.successResponse}
          </pre>
        </div>
      </div>
    </div>
  );
}

/* JWT 구조 아코디언 */
function JwtStructurePanel() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      {/* 토큰 시각화 */}
      <div className="p-4 rounded-xl bg-[#1e1e1e] border border-[#3c3c3c] mb-6 overflow-x-auto">
        <p className="text-xs text-[#8a8a8a] font-mono mb-3">JWT Token</p>
        <p className="font-mono text-sm leading-7 break-all">
          <button
            onClick={() => setActive(active === 0 ? null : 0)}
            className={`transition-opacity ${active !== null && active !== 0 ? "opacity-30" : ""} text-red-400 hover:opacity-80 cursor-pointer`}
          >
            {JWT_STRUCTURE[0].example}
          </button>
          <span className="text-[#8a8a8a]">.</span>
          <button
            onClick={() => setActive(active === 1 ? null : 1)}
            className={`transition-opacity ${active !== null && active !== 1 ? "opacity-30" : ""} text-purple-400 hover:opacity-80 cursor-pointer`}
          >
            {JWT_STRUCTURE[1].example}
          </button>
          <span className="text-[#8a8a8a]">.</span>
          <button
            onClick={() => setActive(active === 2 ? null : 2)}
            className={`transition-opacity ${active !== null && active !== 2 ? "opacity-30" : ""} text-blue-400 hover:opacity-80 cursor-pointer`}
          >
            {JWT_STRUCTURE[2].example}
          </button>
        </p>
        <p className="text-xs text-[#8a8a8a] mt-2">각 부분을 클릭하면 내용을 확인할 수 있습니다.</p>
      </div>

      {/* 파트 카드 */}
      <div className="space-y-3">
        {JWT_STRUCTURE.map((part, i) => (
          <div
            key={part.part}
            className={`rounded-xl border transition-all overflow-hidden ${part.bgClass}`}
          >
            <button
              onClick={() => setActive(active === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className={`text-base md:text-xl font-bold font-mono ${part.colorClass}`}>
                  {part.part}
                </span>
                <span className="text-sm text-(--text-muted)">{part.desc}</span>
              </div>
              <svg
                className={`w-4 h-4 text-(--text-muted) transition-transform shrink-0 ${active === i ? "rotate-180" : ""}`}
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
            {active === i && (
              <div className="px-5 pb-4 border-t border-(--border)">
                <p className="text-xs text-(--text-muted) mb-2 mt-3">디코딩 결과</p>
                <code className={`text-sm md:text-base font-mono ${part.colorClass}`}>
                  {part.content}
                </code>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   메인 컴포넌트
   ══════════════════════════════════════════ */

export default function Week7Content() {
  return (
    <SlidePresentation>

      {/* ── 제목 ── */}
      <div>
        <WeekHero
          weekNum={7}
          title="실제 DB 연동 & JWT 인증"
          description="메모리 배열의 한계를 넘어, PostgreSQL로 데이터를 영구 저장하고 JWT로 로그인 상태를 유지하는 방법을 이해합니다."
        />
        <div className="flex flex-wrap gap-2 mt-8">
          {WEEK7_TAGS.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* ── 목차 ── */}
      <div>
        <h2 className="text-2xl md:text-6xl font-bold mb-10">목차</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WEEK7_TOC.map((item) => (
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
          01. 지난 주 돌아보기
          ══════════════════════════════════════════ */}
      <div data-slide-id="review">
        <ChapterTitle num="01" title="지난 주 돌아보기" />
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">6주차 구현의 한계</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">
          지난 주에 만든 회원가입·로그인 API는 동작하지만, 실제 서비스에서는 쓸 수 없는 세 가지 문제가 있습니다.
        </p>
        <div className="space-y-4">
          {WEEK6_LIMITS.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center"
            >
              {/* 문제 */}
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-400/30">
                <div className="flex items-center gap-3 mb-2">
                  <LimitIcon type={item.icon} />
                  <p className="text-sm md:text-lg font-bold text-red-400">{item.problem}</p>
                </div>
                <p className="text-xs md:text-sm text-(--text-muted)">{item.detail}</p>
              </div>

              {/* 화살표 */}
              <div className="flex justify-center">
                <svg
                  className="w-6 h-6 text-(--accent) rotate-90 md:rotate-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              {/* 해결 */}
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-400/30">
                <p className="text-sm md:text-lg font-bold text-green-400">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          02. 데이터베이스
          ══════════════════════════════════════════ */}
      <div data-slide-id="database">
        <ChapterTitle num="02" title="데이터베이스" />
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {DB_CONCEPT.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{DB_CONCEPT.desc}</p>
        </Card>

        <h3 className="text-xl md:text-4xl font-bold mb-6">{DB_ANALOGY.title}</h3>
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                <th className="text-left px-4 py-3 font-bold text-(--text-muted)">개념</th>
                <th className="text-left px-4 py-3 font-bold text-green-400">엑셀</th>
                <th className="text-left px-4 py-3 font-bold text-(--accent)">데이터베이스</th>
              </tr>
            </thead>
            <tbody>
              {DB_ANALOGY.rows.map((row) => (
                <tr key={row.aspect} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 font-medium text-(--text-muted)">{row.aspect}</td>
                  <td className="px-4 py-3 text-green-400 font-mono text-sm">{row.excel}</td>
                  <td className="px-4 py-3 text-(--accent) font-mono text-sm">{row.db}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {RDBMS_CONCEPT.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{RDBMS_CONCEPT.desc}</p>
        </Card>

        {/* 스키마 시각화 */}
        <h3 className="text-xl md:text-4xl font-bold mb-2">{SCHEMA_EXAMPLE.title}</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">{SCHEMA_EXAMPLE.desc}</p>

        <div className="flex flex-col md:flex-row items-start gap-4">
          {SCHEMA_EXAMPLE.tables.map((table, ti) => (
            <div key={table.name} className="flex items-start gap-4 flex-1 min-w-0">
              {/* 테이블 박스 */}
              <div className="flex-1 rounded-xl border border-(--border) overflow-hidden">
                {/* 테이블 헤더 */}
                <div className="px-4 py-2 bg-(--accent)/10 border-b border-(--border)">
                  <span className="text-sm md:text-base font-bold font-mono text-(--accent)">
                    {table.name}
                  </span>
                </div>
                {/* 컬럼 목록 */}
                <div className="divide-y divide-(--border)">
                  {table.columns.map((col) => (
                    <div
                      key={col.name}
                      className={`flex items-center gap-3 px-4 py-2 ${col.fk ? "bg-yellow-500/5" : ""}`}
                    >
                      {/* PK / FK 배지 */}
                      {col.pk && (
                        <span className="text-xs font-bold text-yellow-400 font-mono w-5 shrink-0">
                          PK
                        </span>
                      )}
                      {col.fk && (
                        <span className="text-xs font-bold text-blue-400 font-mono w-5 shrink-0">
                          FK
                        </span>
                      )}
                      {!col.pk && !col.fk && (
                        <span className="w-5 shrink-0" />
                      )}
                      <span className={`text-sm font-mono font-medium ${col.pk ? "text-yellow-300" : col.fk ? "text-blue-300" : "text-(--text-sub)"}`}>
                        {col.name}
                      </span>
                      <span className="text-xs font-mono text-(--text-muted) ml-auto shrink-0">
                        {col.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 테이블 사이 화살표 */}
              {ti < SCHEMA_EXAMPLE.tables.length - 1 && (
                <div className="flex flex-col items-center justify-center self-stretch pt-16 shrink-0">
                  <div className="hidden md:flex flex-col items-center gap-1">
                    <div className="w-8 h-0.5 bg-(--accent)/50" />
                    <svg className="w-4 h-4 text-(--accent) -ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                  <svg className="md:hidden w-5 h-5 text-(--accent) mt-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-(--surface) border border-(--border)">
          <code className="text-sm font-mono text-(--accent)">{SCHEMA_EXAMPLE.relation}</code>
          <span className="text-sm text-(--text-sub)">{SCHEMA_EXAMPLE.relationDesc}</span>
        </div>
      </div>

      {/* users 테이블 시각화 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">DB 테이블 = 구조화된 데이터</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          사용자 데이터는 아래처럼 <code className="text-(--accent) font-mono">users</code> 테이블에 행(row)으로 저장됩니다.
        </p>
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="w-full text-xs md:text-sm font-mono">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                {["id", "email", "password", "name", "createdAt"].map((col) => (
                  <th key={col} className="text-left px-4 py-3 font-bold text-(--accent)">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USER_TABLE_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 text-blue-400">{row.id}</td>
                  <td className="px-4 py-3 text-(--text-sub)">{row.email}</td>
                  <td className="px-4 py-3 text-green-400">{row.password}</td>
                  <td className="px-4 py-3 text-(--text-sub)">{row.name}</td>
                  <td className="px-4 py-3 text-(--text-muted)">{row.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="info" className="mt-4">
          비밀번호 컬럼에 <code className="font-mono">$2b$10$...</code>가 저장된 이유는 bcrypt 해시이기 때문입니다. 5장에서 다룹니다.
        </Callout>
      </div>

      {/* ══════════════════════════════════════════
          03. ORM & TypeORM
          ══════════════════════════════════════════ */}
      <div data-slide-id="orm">
        <ChapterTitle num="03" title="ORM & TypeORM" />
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {ORM_CONCEPT.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{ORM_CONCEPT.desc}</p>
        </Card>

        <h3 className="text-xl md:text-4xl font-bold mb-6">SQL vs TypeORM</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ORM_COMPARISON.map((item) => (
            <div key={item.label} className="rounded-xl border border-(--border) overflow-hidden">
              <div className="px-4 py-2 bg-(--surface) border-b border-(--border)">
                <span className="text-xs md:text-sm font-medium text-(--text-muted)">
                  {item.label}
                </span>
              </div>
              <CodeBlock>{item.code}</CodeBlock>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">TypeORM의 장점</h3>
        <div className="space-y-4">
          {TYPEORM_ADVANTAGES.map((adv) => (
            <Card key={adv.title} className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-(--accent)/10 shrink-0">
                <OrmIcon type={adv.icon} />
              </div>
              <div>
                <h4 className="text-base md:text-xl font-bold mb-1">{adv.title}</h4>
                <p className="text-sm md:text-base text-(--text-sub)">{adv.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          04. Entity & Repository
          ══════════════════════════════════════════ */}
      <div data-slide-id="entity">
        <ChapterTitle num="04" title="Entity & Repository" />
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {ENTITY_CONCEPT.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{ENTITY_CONCEPT.desc}</p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* 코드 */}
          <div>
            <p className="text-sm font-medium text-(--text-muted) mb-2">Entity 클래스</p>
            <CodeBlock>{ENTITY_CODE}</CodeBlock>
          </div>

          {/* 컬럼 설명 */}
          <div>
            <p className="text-sm font-medium text-(--text-muted) mb-2">컬럼 설명</p>
            <div className="space-y-2">
              {USER_ENTITY_COLUMNS.map((col) => (
                <div
                  key={col.column}
                  className="p-3 rounded-xl bg-(--surface) border border-(--border)"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <code
                      className={`text-xs font-mono font-bold ${
                        col.color === "blue"
                          ? "text-blue-400"
                          : col.color === "green"
                          ? "text-green-400"
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
        </div>
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {REPOSITORY_CONCEPT.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{REPOSITORY_CONCEPT.desc}</p>
        </Card>

        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                <th className="text-left px-4 py-3 font-bold text-(--accent)">메서드</th>
                <th className="text-left px-4 py-3 font-bold text-(--text-muted)">설명</th>
                <th className="text-left px-4 py-3 font-bold text-purple-400 whitespace-nowrap">반환 타입</th>
              </tr>
            </thead>
            <tbody>
              {REPOSITORY_METHODS.map((m) => (
                <tr key={m.method} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 font-mono text-xs md:text-sm text-(--accent) whitespace-nowrap">
                    {m.method}
                  </td>
                  <td className="px-4 py-3 text-(--text-sub) text-xs md:text-sm">{m.desc}</td>
                  <td className="px-4 py-3 font-mono text-xs text-purple-400 whitespace-nowrap">
                    {m.returns}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 아키텍처 다이어그램 (Repository 추가) */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">요청 처리 흐름 (업데이트)</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">
          6주차와 달리 Service 아래에 Repository 계층이 추가됩니다.
        </p>
        <div className="space-y-2">
          {LAYER_WITH_DB.map((layer) => (
            <div key={layer.name} className="flex flex-col items-center">
              <div className={`w-full p-4 rounded-xl border ${LAYER_COLORS[layer.color]}`}>
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`text-base md:text-xl font-bold font-mono ${LAYER_TEXT[layer.color]}`}
                  >
                    {layer.name}
                  </span>
                  <span className="text-xs md:text-sm text-(--text-muted)">{layer.role}</span>
                </div>
                <p className="text-sm md:text-base text-(--text-sub)">{layer.desc}</p>
              </div>
              {layer.arrow && (
                <svg
                  className="w-6 h-6 text-(--text-muted) my-1"
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
      </div>

      {/* ══════════════════════════════════════════
          05. 비밀번호 암호화
          ══════════════════════════════════════════ */}
      <div data-slide-id="bcrypt">
        <ChapterTitle num="05" title="비밀번호 암호화" />
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">{BCRYPT_DANGER.title}</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">{BCRYPT_DANGER.desc}</p>
        <div className="space-y-3">
          {BCRYPT_DANGER.items.map((item) => (
            <div
              key={item.label}
              className={`p-4 rounded-xl border ${
                item.color === "red"
                  ? "bg-red-500/5 border-red-400/30"
                  : "bg-green-500/5 border-green-400/30"
              }`}
            >
              <p
                className={`text-xs font-bold mb-2 ${
                  item.color === "red" ? "text-red-400" : "text-green-400"
                }`}
              >
                {item.label}
              </p>
              <code
                className={`text-sm md:text-base font-mono break-all ${
                  item.color === "red" ? "text-red-300" : "text-green-300"
                }`}
              >
                {item.value}
              </code>
            </div>
          ))}
        </div>
        <Callout type="warn" className="mt-6">
          해시 값은 되돌릴 수 없습니다. 로그인 검증은 입력된 비밀번호를 다시 해시해서 비교하는 방식으로 합니다.
        </Callout>
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">bcrypt의 세 가지 특성</h3>
        <div className="space-y-4">
          {BCRYPT_PROPERTIES.map((p, i) => (
            <Card key={i} className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">
                {i + 1}
              </span>
              <div>
                <h4 className="text-base md:text-xl font-bold mb-1">{p.title}</h4>
                <p className="text-sm md:text-base text-(--text-sub)">{p.desc}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-sm font-medium text-(--text-muted) mb-2">사용 예시</p>
          <CodeBlock>{BCRYPT_USAGE}</CodeBlock>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          06. JWT 인증
          ══════════════════════════════════════════ */}
      <div data-slide-id="jwt">
        <ChapterTitle num="06" title="JWT 인증" />
      </div>

      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {JWT_CONCEPT.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{JWT_CONCEPT.desc}</p>
        </Card>

        <h3 className="text-xl md:text-4xl font-bold mb-6">세션 vs JWT</h3>
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                <th className="text-left px-4 py-3 font-bold text-(--text-muted)"></th>
                <th className="text-left px-4 py-3 font-bold text-yellow-400">세션 (Session)</th>
                <th className="text-left px-4 py-3 font-bold text-(--accent)">JWT</th>
              </tr>
            </thead>
            <tbody>
              {JWT_VS_SESSION.map((row) => (
                <tr key={row.aspect} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 font-medium text-(--text-muted) whitespace-nowrap">
                    {row.aspect}
                  </td>
                  <td className="px-4 py-3 text-(--text-sub)">{row.session}</td>
                  <td className="px-4 py-3 text-(--text-sub)">{row.jwt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JWT 구조 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">JWT 구조</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          JWT는 <code className="text-red-400 font-mono">Header</code>
          <span className="text-(--text-muted)">.</span>
          <code className="text-purple-400 font-mono">Payload</code>
          <span className="text-(--text-muted)">.</span>
          <code className="text-blue-400 font-mono">Signature</code> 세 부분이{" "}
          <code className="text-(--text-muted) font-mono">.</code>으로 연결된 문자열입니다.
        </p>
        <JwtStructurePanel />
      </div>

      {/* JWT 인증 흐름 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-8">JWT 인증 흐름</h3>
        <div className="space-y-3">
          {JWT_FLOW.map((step, i) => (
            <div key={step.step} className="flex flex-col items-center">
              <div className="w-full flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">
                  {step.step}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-sm md:text-lg font-bold">{step.title}</p>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded bg-(--surface) border border-(--border) ${step.dirColor}`}>
                      {step.direction}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-(--text-sub)">{step.desc}</p>
                </div>
              </div>
              {i < JWT_FLOW.length - 1 && (
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
      </div>

      {/* Guard */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">
            {GUARD_CONCEPT.title}
          </h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{GUARD_CONCEPT.desc}</p>
        </Card>

        <h3 className="text-xl md:text-4xl font-bold mb-6">JwtAuthGuard 동작 방식</h3>
        <div className="space-y-2">
          {GUARD_FLOW.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-full flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm md:text-base font-bold mb-0.5">{step.label}</p>
                  <code className="text-xs md:text-sm text-(--accent) font-mono">{step.desc}</code>
                </div>
              </div>
              {i < GUARD_FLOW.length - 1 && (
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
          <code className="font-mono">@UseGuards(JwtAuthGuard)</code>를 붙인 엔드포인트는 유효한 토큰 없이 접근하면 자동으로 401을 반환합니다.
        </Callout>
      </div>

      {/* ══════════════════════════════════════════
          07. 실습
          ══════════════════════════════════════════ */}
      <div data-slide-id="practice">
        <ChapterTitle num="07" title="실습" />
      </div>

      {/* 패키지 설치 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">패키지 설치</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">
          6주차 프로젝트 폴더에서 아래 명령을 실행합니다.
        </p>
        <div className="space-y-6">
          {PRACTICE_INSTALL_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-(--accent) text-white text-sm font-bold shrink-0">
                  {s.step}
                </span>
                {Number(s.step) < PRACTICE_INSTALL_STEPS.length && (
                  <div className="w-0.5 h-6 bg-(--border) mt-1" />
                )}
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

      {/* PostgreSQL 설치 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">PostgreSQL 설치 & 실행</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          운영체제에 맞게 PostgreSQL을 설치하고 서버를 실행합니다.
        </p>
        <div className="space-y-6">
          {POSTGRES_INSTALL_STEPS.map((os) => (
            <div key={os.os}>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-(--accent)/10 text-(--accent) border border-(--accent)/30">
                  {os.os}
                </span>
              </div>
              <div className="space-y-3">
                {os.steps.map((s, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-(--surface) border border-(--border) text-xs text-(--text-muted) font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-(--text-sub) mb-2">{s.label}</p>
                      {s.code && <CodeBlock>{s.code}</CodeBlock>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Callout type="info" className="mt-6">
          <code className="font-mono">createuser -s postgres</code> 실행 후 DataGrip에서 User: <code className="font-mono">postgres</code>, Password 빈칸으로 연결할 수 있습니다. Mac/Windows 모두 같은 설정으로 통일됩니다.
        </Callout>
      </div>

      {/* DataGrip DB 생성 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">DataGrip으로 DB 생성</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">
          코드를 작성하기 전에 PostgreSQL에 데이터베이스를 먼저 만들어야 합니다.
        </p>
        <div className="space-y-3">
          {DATAGRIP_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">
                {s.step}
              </span>
              <p className="text-sm md:text-base text-(--text-sub)">{s.desc}</p>
            </div>
          ))}
        </div>
        <Callout type="info" className="mt-6">
          DataGrip에서 연결 후 <code className="font-mono">synchronize: true</code> 설정 덕분에 서버를 실행하면 <code className="font-mono">users</code> 테이블이 자동으로 생성됩니다.
        </Callout>
      </div>

      {/* 코드 작성 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">코드 수정하기</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs font-bold font-mono">NEW</span>
          {" "}표시는 새로 만드는 파일, 나머지는 6주차 파일을 수정합니다.
        </p>
        <VsCodeEditor
          tree={PRACTICE_FILE_TREE}
          contents={PRACTICE_FILE_CONTENTS}
          defaultFile="appModule"
          tabOrder={PRACTICE_TAB_ORDER}
        />
      </div>

      {/* Postman 테스트 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">API 테스트</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-8">
          회원가입 → 로그인(토큰 발급) → 토큰으로 내 정보 조회 순서로 테스트합니다.
          3단계에서 2단계의 <code className="text-(--accent) font-mono">accessToken</code> 값을 복사해 Authorization 헤더에 붙여넣습니다.
        </p>
        <PracticePostmanTest />
      </div>

      {/* ── 정리 ── */}
      <div>
        <ChapterTitle num="정리" title="오늘 배운 것" />
      </div>

      <div>
        <div className="space-y-3">
          {WEEK7_SUMMARY.map((item, i) => (
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

function LimitIcon({ type }: { type: string }) {
  const props = {
    className: "w-5 h-5 text-red-400 shrink-0",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "database")
    return (
      <svg {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  if (type === "shield")
    return (
      <svg {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}


function OrmIcon({ type }: { type: string }) {
  const props = {
    className: "w-5 h-5 text-(--accent)",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "shield")
    return (
      <svg {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  if (type === "swap")
    return (
      <svg {...props}>
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    );
  return (
    <svg {...props}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}
