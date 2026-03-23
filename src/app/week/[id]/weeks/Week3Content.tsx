"use client";

import { useState } from "react";
import {
  Card,
  Callout,
  WeekHero,
  Tag,
  SlidePresentation,
} from "@/components";
import {
  WEEK3_TAGS,
  WEEK3_TOC,
  COMPONENT_TYPE_CONCEPT,
  SERVER_CLIENT_COMPARE,
  SERVER_CLIENT_DECISION,
  SERVER_COMPONENT_CODE,
  CLIENT_COMPONENT_CODE,
  USE_CLIENT_ERROR_CODE,
  MIXED_COMPONENT_CODE,
  MIXED_CLIENT_CODE,
  LAYOUT_CONCEPT,
  LAYOUT_CODE,
  NESTED_LAYOUT_CODE,
  LAYOUT_STRUCTURE,
  LAYOUT_NESTING_VISUAL,
  LIST_DETAIL_CONCEPT,
  LIST_DETAIL_EXAMPLES,
  LIST_PAGE_CODE,
  DETAIL_PAGE_CODE,
  LIST_DETAIL_PATTERN_STEPS,
  ASYNC_AWAIT_CONCEPT,
  ASYNC_AWAIT_ANALOGY,
  ASYNC_AWAIT_CODE,
  ASYNC_AWAIT_RULES,
  FETCH_CONCEPT,
  FETCH_STEPS,
  FETCH_EXAMPLE_CODE,
  FETCHING_CONCEPT,
  SERVER_FETCH_CODE,
  LOADING_CODE,
  ERROR_CODE,
  FETCHING_FILE_STRUCTURE,
  FETCH_FLOW,
  FORM_CONCEPT,
  EVENT_TYPES,
  FORM_BASIC_CODE,
  FORM_PATTERN_STEPS,
  SEARCH_CODE,
  CONDITIONAL_CONCEPT,
  CONDITIONAL_FOUR_STATES,
  CONDITIONAL_BASIC_CODE,
  CONDITIONAL_FULL_PATTERN_CODE,
  AI_PROMPT_TIPS,
  WEEK3_SUMMARY,
  DYNAMIC_ROUTE_STRUCTURE,
  COMMON_MISTAKES,
} from "@/constants/week3";

/* ── 구문 강조 ── */
interface Token { text: string; color: string }

function highlightLine(line: string): Token[] {
  const tokens: Token[] = [];
  const rules: [RegExp, string][] = [
    [/\/\/.*/, "#6a9955"],                                           // 주석
    [/\/\*[\s\S]*?\*\//, "#6a9955"],                                 // 블록 주석
    [/\{\/\*.*?\*\/\}/, "#6a9955"],                                  // JSX 주석
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/, "#ce9178"], // 문자열
    [/\b(import|export|from|default|as|async|await)\b/, "#c586c0"],  // import 키워드
    [/\b(const|let|var|function|return|if|else|switch|case|break|for|of|in|new|throw|typeof|void)\b/, "#569cd6"], // 키워드
    [/\b(interface|type|enum|extends|implements|readonly)\b/, "#569cd6"], // TS 키워드
    [/\b(string|number|boolean|null|undefined|true|false|void|any|never|Promise)\b/, "#4ec9b0"], // 타입
    [/\b(React|Metadata|Link|Post|Error|FormEvent)\b/, "#4ec9b0"],   // 커스텀 타입
    [/\b\d+\b/, "#b5cea8"],                                          // 숫자
    [/<\/?[A-Z]\w*/, "#4ec9b0"],                                     // 컴포넌트 태그
    [/<\/?(?:div|span|nav|main|html|body|section|button|footer|header|h[1-6]|p|a|pre|code|img|ul|li|aside|input|form|label)\b/, "#569cd6"], // HTML 태그
    [/\/>/, "#808080"],                                              // 닫기 태그
    [/[{}()\[\]]/, "#ffd700"],                                       // 괄호
    [/className/, "#92d1e7"],                                        // className
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
      if (earliest.index > 0) {
        tokens.push({ text: remaining.slice(0, earliest.index), color: "#d4d4d4" });
      }
      tokens.push({ text: remaining.slice(earliest.index, earliest.index + earliest.length), color: earliest.color });
      remaining = remaining.slice(earliest.index + earliest.length);
    } else {
      tokens.push({ text: remaining, color: "#d4d4d4" });
      break;
    }
  }
  return tokens;
}

/* ── VS Code 스타일 코드 블록 ── */
function HighlightedCode({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");
  return (
    <div className="rounded-lg overflow-hidden border border-[#3c3c3c] bg-[#1e1e1e] flex flex-col">
      {/* 타이틀 바 */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-[#3c3c3c] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {filename && (
            <span className="text-[#cccccc] text-xs font-mono ml-2">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#3c3c3c] hover:bg-[#4c4c4c] transition-colors text-[#cccccc] text-xs font-mono"
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
      </div>

      {/* 코드 영역 */}
      <div className="overflow-auto">
        <pre className="p-4 text-sm font-mono leading-6 text-[#d4d4d4]">
          {lines.map((line, i) => {
            const tokens = highlightLine(line);
            return (
              <div key={i} className="flex">
                <span className="w-8 shrink-0 text-right mr-4 text-[#5a5a5a] select-none">{i + 1}</span>
                <span className="whitespace-pre">
                  {tokens.length > 0 ? tokens.map((t, j) => (
                    <span key={j} style={{ color: t.color }}>{t.text}</span>
                  )) : "\u00A0"}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

function ChapterTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span className="text-4xl md:text-9xl font-extrabold text-(--accent) font-mono mb-6">{num}</span>
      <h2 className="text-2xl md:text-7xl font-bold text-center">{title}</h2>
    </div>
  );
}

/* ── 인터랙티브 데모: 로그인 폼 ── */
function LoginFormDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="text-black">
      {submitted ? (
        <div className="text-center py-8">
          <p className="text-lg font-semibold text-green-600 mb-1">로그인 시도!</p>
          <p className="text-sm text-gray-500">email: {email}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="text-lg font-bold">로그인</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
          >
            로그인
          </button>
        </form>
      )}
    </div>
  );
}

/* ── 인터랙티브 데모: 검색 ── */
function SearchDemo() {
  const [query, setQuery] = useState("");
  const allItems = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"];
  const filtered = allItems.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="text-black">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
      />
      <ul className="space-y-1.5">
        {filtered.map((item) => (
          <li key={item} className="border rounded-lg px-3 py-2 text-sm">
            {item}
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-gray-400 text-sm py-2">결과가 없습니다</li>
        )}
      </ul>
    </div>
  );
}

/* ── 인터랙티브 데모: 4가지 상태 ── */
function FourStatesDemo() {
  const [state, setState] = useState<"loading" | "error" | "empty" | "success">("loading");

  return (
    <div className="text-black">
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { key: "loading" as const, label: "로딩" },
          { key: "error" as const, label: "에러" },
          { key: "empty" as const, label: "빈 데이터" },
          { key: "success" as const, label: "정상" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setState(item.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              state === item.key ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="border rounded-lg p-4 min-h-30 flex items-center justify-center">
        {state === "loading" && (
          <div className="space-y-2 w-full animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        )}
        {state === "error" && (
          <div className="text-center">
            <p className="text-red-500 font-semibold mb-2">문제가 발생했습니다</p>
            <button
              onClick={() => setState("success")}
              className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100"
            >
              다시 시도
            </button>
          </div>
        )}
        {state === "empty" && (
          <p className="text-gray-400">게시글이 없습니다</p>
        )}
        {state === "success" && (
          <ul className="space-y-2 w-full">
            {["React 시작하기", "Next.js 라우팅", "Tailwind 실전"].map((title) => (
              <li key={title} className="border rounded px-3 py-2 text-sm">{title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── 라이브 프리뷰 브라우저 프레임 ── */
function LivePreview({ children, url = "localhost:3000" }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-300 bg-white flex flex-col h-full max-w-full">
      <div className="bg-gray-100 border-b border-gray-200 px-2 md:px-3 py-1.5 md:py-2 flex items-center gap-2 shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 ml-1 md:ml-2 bg-white rounded-md border border-gray-200 px-2 md:px-3 py-0.5 min-w-0">
          <span className="text-gray-400 text-[10px] md:text-xs font-mono truncate block">{url}</span>
        </div>
      </div>
      <div className="flex-1 p-3 md:p-5 overflow-auto">{children}</div>
    </div>
  );
}

/* ── 코드 + 프리뷰 나란히 ── */
function CodeWithPreview({ code, children, title, previewUrl, filename }: {
  code: string;
  children: React.ReactNode;
  title?: string;
  previewUrl?: string;
  filename?: string;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6 h-full">
      <div className="flex flex-col min-h-0 min-w-0">
        {title && <p className="text-sm md:text-xl font-semibold text-(--text-muted) mb-2">{title}</p>}
        <div className="flex-1 min-h-0 overflow-auto">
          <HighlightedCode code={code} filename={filename} />
        </div>
      </div>
      <div className="flex flex-col min-h-0 min-w-0">
        <p className="text-sm md:text-xl font-semibold text-(--accent) mb-2">실행 결과</p>
        <div className="flex-1 min-h-0">
          <LivePreview url={previewUrl}>{children}</LivePreview>
        </div>
      </div>
    </div>
  );
}

export default function Week3Content() {
  return (
    <SlidePresentation>

      {/* ── 1. 제목 ── */}
      <div>
        <WeekHero
          weekNum={3}
          title="Next.js"
          subtitle="코드 패턴 이해하기"
          description="AI로 코드를 작성할 때 알아야 할 핵심 패턴 6가지를 배웁니다. 패턴을 알면 AI에게 정확한 요청을 할 수 있고, 결과물을 이해하고 수정할 수 있습니다."
        />
        <div className="flex flex-wrap gap-2 mt-8">
          {WEEK3_TAGS.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* ── 2. 목차 ── */}
      <div>
        <h2 className="text-2xl md:text-6xl font-bold mb-10">목차</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WEEK3_TOC.map((item) => (
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
          01. Server vs Client Component
          ══════════════════════════════════════════ */}
      <div data-slide-id="server-client">
        <ChapterTitle num="01" title="Server vs Client Component" />
      </div>

      {/* ── 01. 개념 소개 ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{COMPONENT_TYPE_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{COMPONENT_TYPE_CONCEPT.desc}</p>
        </Card>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-t-2 border-t-(--accent)">
            <h4 className="text-base md:text-2xl font-bold mb-3">{SERVER_CLIENT_COMPARE.server.title}</h4>
            <div className="space-y-2 mb-4">
              {SERVER_CLIENT_COMPARE.server.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-sm md:text-xl text-(--text-sub)">{f}</span>
                </div>
              ))}
            </div>
            <p className="text-sm md:text-xl font-semibold text-red-400 mb-2">사용 불가</p>
            <div className="space-y-1.5">
              {SERVER_CLIENT_COMPARE.server.cantDo.map((c) => (
                <div key={c} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span className="text-sm md:text-xl text-(--text-muted)">{c}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-t-2 border-t-violet-500">
            <h4 className="text-base md:text-2xl font-bold mb-3">{SERVER_CLIENT_COMPARE.client.title}</h4>
            <div className="space-y-2 mb-4">
              {SERVER_CLIENT_COMPARE.client.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-sm md:text-xl text-(--text-sub)">{f}</span>
                </div>
              ))}
            </div>
            <p className="text-sm md:text-xl font-semibold text-red-400 mb-2">주의</p>
            <div className="space-y-1.5">
              {SERVER_CLIENT_COMPARE.client.cantDo.map((c) => (
                <div key={c} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span className="text-sm md:text-xl text-(--text-muted)">{c}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ── 01. 코드 비교 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">코드로 비교하기</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm md:text-xl font-semibold text-(--accent) mb-2">Server Component</p>
            <HighlightedCode code={SERVER_COMPONENT_CODE} filename="app/posts/page.tsx" />
          </div>
          <div>
            <p className="text-sm md:text-xl font-semibold text-violet-400 mb-2">Client Component</p>
            <HighlightedCode code={CLIENT_COMPONENT_CODE} filename="components/Counter.tsx" />
          </div>
        </div>
      </div>

      {/* ── 01. "use client" 빠뜨리면? ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">&quot;use client&quot; 빠뜨리면?</h3>
        <Callout type="warn" className="mb-6">
          Client Component 기능(useState, onClick 등)을 사용하면서 &quot;use client&quot;를 빠뜨리면
          에러가 발생합니다. AI가 생성한 코드에서 이 에러가 나면 파일 맨 위에 &quot;use client&quot;를 추가하세요.
        </Callout>
        <HighlightedCode code={USE_CLIENT_ERROR_CODE} filename="app/counter/page.tsx" />
      </div>

      {/* ── 01. 혼합 패턴 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">실전: Server + Client 혼합</h3>
        <Callout type="tip" className="mb-4">
          페이지 전체를 Client Component로 만들지 마세요! Server Component 안에 필요한 부분만 Client Component로 넣는 것이 핵심 패턴입니다.
        </Callout>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm md:text-xl font-semibold text-(--accent) mb-2">Server Component (부모)</p>
            <HighlightedCode code={MIXED_COMPONENT_CODE} filename="app/posts/page.tsx" />
          </div>
          <div>
            <p className="text-sm md:text-xl font-semibold text-violet-400 mb-2">Client Component (자식)</p>
            <HighlightedCode code={MIXED_CLIENT_CODE} filename="components/LikeButton.tsx" />
          </div>
        </div>
      </div>

      {/* ── 01. 판단 기준 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">어떤 걸 써야 할까?</h3>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-(--surface-hover) text-sm md:text-xl font-semibold text-(--text-muted)">
            <span className="col-span-5">상황</span>
            <span className="col-span-3">선택</span>
            <span className="col-span-4">이유</span>
          </div>
          {SERVER_CLIENT_DECISION.map((row) => (
            <div key={row.situation} className="grid grid-cols-12 gap-2 px-4 py-3 bg-(--surface) items-center">
              <span className="text-xs md:text-xl text-(--text-sub) col-span-5">{row.situation}</span>
              <span className={`text-xs md:text-xl font-semibold col-span-3 ${
                row.answer === "Server Component" ? "text-(--accent)" : "text-violet-400"
              }`}>{row.answer}</span>
              <span className="text-xs md:text-xl text-(--text-muted) col-span-4">{row.reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          02. 레이아웃 패턴
          ══════════════════════════════════════════ */}
      <div data-slide-id="layout">
        <ChapterTitle num="02" title="레이아웃 패턴" />
      </div>

      {/* ── 02. 개념 ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{LAYOUT_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{LAYOUT_CONCEPT.desc}</p>
        </Card>
        <div className="space-y-3">
          {LAYOUT_STRUCTURE.map((item) => (
            <div key={item.file} className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-4 rounded-xl bg-(--surface) border-l-4 ${item.color}`}>
              <code className="font-mono text-sm md:text-xl text-(--accent) md:w-64 shrink-0">{item.file}</code>
              <span className="text-sm md:text-xl text-(--text-sub) flex-1">{item.desc}</span>
              <span className="text-xs md:text-sm text-(--text-muted) bg-(--surface-hover) px-2 py-1 rounded shrink-0">{item.scope}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 02. 중첩 시각화 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">레이아웃 중첩 구조</h3>
        <Callout type="tip" className="mb-6">
          Next.js의 레이아웃은 <strong>자동으로 중첩</strong>됩니다. 하위 폴더의 layout.tsx는 상위 layout.tsx 안에 들어갑니다.
        </Callout>
        <div className="border-2 border-(--accent) rounded-xl p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm md:text-xl font-bold">{LAYOUT_NESTING_VISUAL[0].label}</span>
            <span className="text-xs md:text-sm text-(--text-muted)">{LAYOUT_NESTING_VISUAL[0].desc}</span>
          </div>
          <div className="border-2 border-violet-500 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm md:text-xl font-bold">{LAYOUT_NESTING_VISUAL[1].label}</span>
              <span className="text-xs md:text-sm text-(--text-muted)">{LAYOUT_NESTING_VISUAL[1].desc}</span>
            </div>
            <div className="border-2 border-sky-500 rounded-xl p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm md:text-xl font-bold">{LAYOUT_NESTING_VISUAL[2].label}</span>
                <span className="text-xs md:text-sm text-(--text-muted)">{LAYOUT_NESTING_VISUAL[2].desc}</span>
              </div>
              <div className="bg-(--surface) rounded-lg p-4 text-center text-sm md:text-xl text-(--text-muted)">
                페이지 내용이 여기에 들어갑니다
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 02. 루트 레이아웃 코드 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">루트 레이아웃</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-4">
          <code>app/layout.tsx</code>는 모든 페이지를 감싸는 최상위 레이아웃입니다. Navbar, Footer 등 전역 UI를 여기에 배치합니다.
        </p>
        <HighlightedCode code={LAYOUT_CODE} filename="app/layout.tsx" />
      </div>

      {/* ── 02. 중첩 레이아웃 코드 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">중첩 레이아웃</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-4">
          특정 섹션에만 적용되는 레이아웃을 추가할 수 있습니다. 예: 대시보드에만 Sidebar 추가
        </p>
        <HighlightedCode code={NESTED_LAYOUT_CODE} filename="app/dashboard/layout.tsx" />
      </div>

      {/* ══════════════════════════════════════════
          03. 리스트 → 상세 패턴
          ══════════════════════════════════════════ */}
      <div data-slide-id="list-detail">
        <ChapterTitle num="03" title="리스트 → 상세 패턴" />
      </div>

      {/* ── 03. 개념 ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{LIST_DETAIL_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{LIST_DETAIL_CONCEPT.desc}</p>
        </Card>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
          <div className="grid grid-cols-5 gap-2 px-4 py-3 bg-(--surface-hover) text-sm md:text-xl font-semibold text-(--text-muted)">
            <span>서비스</span>
            <span>목록 URL</span>
            <span>상세 URL</span>
            <span>목록</span>
            <span>상세</span>
          </div>
          {LIST_DETAIL_EXAMPLES.map((row) => (
            <div key={row.service} className="grid grid-cols-5 gap-2 px-4 py-3 bg-(--surface) items-center">
              <span className="text-xs md:text-xl font-semibold">{row.service}</span>
              <code className="font-mono text-xs md:text-sm text-(--accent)">{row.list}</code>
              <code className="font-mono text-xs md:text-sm text-violet-400">{row.detail}</code>
              <span className="text-xs md:text-sm text-(--text-sub)">{row.listLabel}</span>
              <span className="text-xs md:text-sm text-(--text-muted)">{row.detailLabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 03. 동적 라우팅 구조 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">동적 라우팅: [id] 폴더</h3>
        <Callout type="info" className="mb-6">
          Next.js에서 <code>[id]</code>는 실제 폴더 이름입니다. 대괄호로 감싸면 URL의 해당 부분이 변수가 됩니다.
          <code>/products/1</code>, <code>/products/2</code> 등 어떤 값이든 매칭됩니다.
        </Callout>
        <div className="rounded-xl bg-(--surface) border border-(--border) p-6">
          {DYNAMIC_ROUTE_STRUCTURE.map((item) => (
            <div key={item.file + item.indent} className="flex items-center gap-2 py-1.5" style={{ paddingLeft: `${item.indent * 1.5}rem` }}>
              {item.type === "folder" ? (
                <svg className="w-5 h-5 text-violet-400 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" /></svg>
              ) : (
                <svg className="w-5 h-5 text-(--text-muted) shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              )}
              <code className={`font-mono text-sm md:text-xl ${item.highlight ? "text-violet-400 font-bold" : "text-(--text-sub)"}`}>
                {item.file}
              </code>
              {item.highlight && (
                <span className="text-xs md:text-sm text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">URL의 변수 부분</span>
              )}
              {item.desc && (
                <span className={`text-xs md:text-sm ${item.color || "text-(--text-muted)"}`}>{item.desc}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── 03. 패턴 단계 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">패턴 5단계</h3>
        <div className="space-y-3">
          {LIST_DETAIL_PATTERN_STEPS.map((step) => (
            <div key={step.num} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-base font-bold shrink-0">
                {step.num}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-xl font-semibold mb-1">{step.title}</p>
                <p className="text-xs md:text-sm text-(--text-sub) mb-2">{step.desc}</p>
                <code className="text-xs md:text-sm font-mono text-(--accent) bg-(--surface-hover) px-2 py-1 rounded block overflow-x-auto">{step.code}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 03. 목록 페이지 코드 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">목록 페이지</h3>
        <CodeWithPreview code={LIST_PAGE_CODE} previewUrl="localhost:3000/products">
          <div className="text-black">
            <h1 className="text-xl font-bold mb-4">상품 목록</h1>
            <div className="space-y-3">
              {[
                { name: "MacBook Pro", price: "2,500,000" },
                { name: "iPad Air", price: "900,000" },
                { name: "AirPods Pro", price: "350,000" },
              ].map((p) => (
                <div key={p.name} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h2 className="font-semibold text-base">{p.name}</h2>
                  <p className="text-gray-500 text-sm">{p.price}원</p>
                </div>
              ))}
            </div>
          </div>
        </CodeWithPreview>
      </div>

      {/* ── 03. 상세 페이지 코드 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">상세 페이지</h3>
        <CodeWithPreview code={DETAIL_PAGE_CODE} previewUrl="localhost:3000/products/1">
          <div className="text-black">
            <p className="text-gray-500 hover:text-black cursor-pointer text-sm mb-3">← 목록으로</p>
            <h1 className="text-xl font-bold mb-1">MacBook Pro</h1>
            <p className="text-lg text-blue-600 mb-3">2,500,000원</p>
            <p className="text-gray-600 text-sm">Apple M4 칩 탑재 노트북</p>
          </div>
        </CodeWithPreview>
      </div>

      {/* ══════════════════════════════════════════
          04. 데이터 Fetching 패턴
          ══════════════════════════════════════════ */}
      <div data-slide-id="fetching">
        <ChapterTitle num="04" title="데이터 Fetching 패턴" />
      </div>

      {/* ── 04. async/await 개념 ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{ASYNC_AWAIT_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{ASYNC_AWAIT_CONCEPT.desc}</p>
        </Card>
        <h4 className="text-lg md:text-3xl font-bold mb-4">동기 vs 비동기</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {ASYNC_AWAIT_ANALOGY.map((item) => (
            <Card key={item.type} className={`border-t-2 ${item.color}`}>
              <p className="text-base md:text-2xl font-bold mb-2">{item.type}</p>
              <p className="text-sm md:text-xl text-(--text-sub) mb-1">{item.desc}</p>
              <p className="text-sm md:text-xl text-(--text-muted)">{item.result}</p>
            </Card>
          ))}
        </div>
        <HighlightedCode code={ASYNC_AWAIT_CODE} />
      </div>

      {/* ── 04. async/await 규칙 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">async/await 핵심 규칙</h3>
        <div className="space-y-3">
          {ASYNC_AWAIT_RULES.map((item) => (
            <div key={item.rule} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-xl font-semibold mb-2">{item.rule}</p>
                <code className="text-xs md:text-sm font-mono text-(--accent) bg-(--surface-hover) px-2 py-1 rounded block overflow-x-auto">{item.code}</code>
              </div>
            </div>
          ))}
        </div>
        <Callout type="tip" className="mt-6">
          이 다음 섹션에서 Server Component의 async/await 방식과 Client Component의 useEffect 방식을 각각 실습합니다.
        </Callout>
      </div>

      {/* ── 04. fetch란? ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{FETCH_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{FETCH_CONCEPT.desc}</p>
        </Card>
        <h4 className="text-lg md:text-3xl font-bold mb-4">fetch는 2단계로 동작한다</h4>
        <div className="space-y-3 mb-8">
          {FETCH_STEPS.map((step) => (
            <div key={step.num} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-base font-bold shrink-0">
                {step.num}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-xl font-semibold mb-1">{step.title}</p>
                <p className="text-xs md:text-sm text-(--text-sub) mb-2">{step.desc}</p>
                <code className="text-xs md:text-sm font-mono text-(--accent) bg-(--surface-hover) px-2 py-1 rounded block overflow-x-auto">{step.code}</code>
              </div>
            </div>
          ))}
        </div>
        <HighlightedCode code={FETCH_EXAMPLE_CODE} />
      </div>

      {/* ── 04. 개념 ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{FETCHING_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{FETCHING_CONCEPT.desc}</p>
        </Card>
        <div className="space-y-3">
          {FETCHING_FILE_STRUCTURE.map((item) => (
            <div key={item.file} className="flex items-center gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <code className="font-mono text-sm md:text-xl text-(--accent) shrink-0">{item.file}</code>
              <span className="text-sm md:text-xl text-(--text-sub)">{item.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 04. Fetch 흐름 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">데이터 요청 흐름</h3>
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:items-center">
          {/* Step 1: 요청 */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-1 p-4 rounded-xl bg-(--surface) border border-(--border) text-center">
              <span className="text-2xl md:text-4xl font-bold text-(--accent) font-mono block mb-1">{FETCH_FLOW[0].step}</span>
              <p className="text-sm md:text-xl font-semibold mb-1">{FETCH_FLOW[0].label}</p>
              <p className="text-xs md:text-sm text-(--text-muted)">{FETCH_FLOW[0].desc}</p>
            </div>
            <svg className="w-6 h-6 text-(--text-muted) shrink-0 hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          {/* Step 2: 로딩 */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-1 p-4 rounded-xl bg-(--surface) border border-(--border) text-center">
              <span className="text-2xl md:text-4xl font-bold text-(--accent) font-mono block mb-1">{FETCH_FLOW[1].step}</span>
              <p className="text-sm md:text-xl font-semibold mb-1">{FETCH_FLOW[1].label}</p>
              <p className="text-xs md:text-sm text-(--text-muted)">{FETCH_FLOW[1].desc}</p>
            </div>
            <svg className="w-6 h-6 text-(--text-muted) shrink-0 hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          {/* Step 3a/3b: 성공/실패 분기 */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="p-4 rounded-xl bg-(--surface) border border-green-500/50 text-center">
              <span className="text-2xl md:text-4xl font-bold text-green-500 font-mono block mb-1">{FETCH_FLOW[2].step}</span>
              <p className="text-sm md:text-xl font-semibold mb-1">{FETCH_FLOW[2].label}</p>
              <p className="text-xs md:text-sm text-(--text-muted)">{FETCH_FLOW[2].desc}</p>
            </div>
            <div className="p-4 rounded-xl bg-(--surface) border border-red-500/50 text-center">
              <span className="text-2xl md:text-4xl font-bold text-red-500 font-mono block mb-1">{FETCH_FLOW[3].step}</span>
              <p className="text-sm md:text-xl font-semibold mb-1">{FETCH_FLOW[3].label}</p>
              <p className="text-xs md:text-sm text-(--text-muted)">{FETCH_FLOW[3].desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 04. Server Fetch 코드 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">Server Component에서 fetch</h3>
        <Callout type="tip" className="mb-4">
          Server Component는 <code>async</code> 함수로 만들 수 있습니다. <code>await fetch()</code>로 바로 데이터를 가져올 수 있어 매우 간단합니다.
        </Callout>
        <HighlightedCode code={SERVER_FETCH_CODE} filename="app/users/page.tsx" />
      </div>

      {/* ── 04. loading.tsx & error.tsx ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">loading.tsx & error.tsx</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-4">
          같은 폴더에 <code>loading.tsx</code>와 <code>error.tsx</code>를 만들면 Next.js가 자동으로 처리해줍니다.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm md:text-xl font-semibold text-sky-400 mb-2">loading.tsx</p>
            <HighlightedCode code={LOADING_CODE} filename="app/users/loading.tsx" />
          </div>
          <div>
            <p className="text-sm md:text-xl font-semibold text-red-400 mb-2">error.tsx</p>
            <HighlightedCode code={ERROR_CODE} filename="app/users/error.tsx" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          05. 폼 & 이벤트 패턴
          ══════════════════════════════════════════ */}
      <div data-slide-id="form">
        <ChapterTitle num="05" title="폼 & 이벤트 패턴" />
      </div>

      {/* ── 05. 개념 ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{FORM_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{FORM_CONCEPT.desc}</p>
        </Card>
        <div className="rounded-xl overflow-hidden border border-(--border) divide-y divide-(--border)">
          <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-(--surface-hover) text-sm md:text-xl font-semibold text-(--text-muted)">
            <span>이벤트</span>
            <span>의미</span>
            <span className="col-span-2">사용 예</span>
          </div>
          {EVENT_TYPES.map((row) => (
            <div key={row.event} className="grid grid-cols-4 gap-2 px-4 py-3 bg-(--surface) items-center">
              <code className="font-mono text-xs md:text-xl text-(--accent)">{row.event}</code>
              <span className="text-xs md:text-xl text-(--text-sub)">{row.desc}</span>
              <span className="text-xs md:text-sm text-(--text-muted) col-span-2">{row.useCase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 05. 폼 패턴 4단계 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">폼 패턴 4단계</h3>
        <Callout type="warn" className="mb-6">
          HTML의 <code>&lt;form&gt;</code>은 제출 시 기본적으로 페이지를 새로고침합니다.
          React에서는 이를 막고 JavaScript로 처리하기 위해 <code>e.preventDefault()</code>를 반드시 호출해야 합니다.
        </Callout>
        <div className="space-y-3">
          {FORM_PATTERN_STEPS.map((step) => (
            <div key={step.num} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-base font-bold shrink-0">
                {step.num}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-xl font-semibold mb-1">{step.title}</p>
                <p className="text-xs md:text-sm text-(--text-sub) mb-2">{step.desc}</p>
                <code className="text-xs md:text-sm font-mono text-(--accent) bg-(--surface-hover) px-2 py-1 rounded block overflow-x-auto">{step.code}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 05. 로그인 폼 예제 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">예제: 로그인 폼</h3>
        <Callout type="tip" className="mb-4">오른쪽에서 직접 입력하고 로그인 버튼을 눌러보세요!</Callout>
        <CodeWithPreview code={FORM_BASIC_CODE} previewUrl="localhost:3000/login">
          <LoginFormDemo />
        </CodeWithPreview>
      </div>

      {/* ── 05. 검색 예제 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">예제: 실시간 검색</h3>
        <Callout type="tip" className="mb-4">검색어를 입력하면 실시간으로 필터링됩니다!</Callout>
        <CodeWithPreview code={SEARCH_CODE} previewUrl="localhost:3000/search">
          <SearchDemo />
        </CodeWithPreview>
      </div>

      {/* ══════════════════════════════════════════
          06. 조건부 렌더링 패턴
          ══════════════════════════════════════════ */}
      <div data-slide-id="conditional">
        <ChapterTitle num="06" title="조건부 렌더링 패턴" />
      </div>

      {/* ── 06. 개념 ── */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{CONDITIONAL_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{CONDITIONAL_CONCEPT.desc}</p>
        </Card>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CONDITIONAL_FOUR_STATES.map((item) => (
            <Card key={item.state} className={`border-t-2 ${item.color}`}>
              <p className="text-base md:text-2xl font-bold mb-1">{item.state}</p>
              <p className="text-xs md:text-sm text-(--text-sub) mb-2">{item.desc}</p>
              <p className="text-xs md:text-sm text-(--text-muted)">{item.ui}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── 06. 기본 문법 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">조건부 렌더링 문법</h3>
        <HighlightedCode code={CONDITIONAL_BASIC_CODE} />
      </div>

      {/* ── 06. 4가지 상태 데모 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-4">실전: 4가지 상태 처리</h3>
        <Callout type="info" className="mb-4">
          이 예제는 <strong>Client Component</strong>에서 <code>useEffect</code>로 데이터를 가져옵니다.
          Server Component의 <code>async/await</code> 방식과 달리, 클라이언트에서 fetch할 때는 로딩·에러 상태를 직접 <code>useState</code>로 관리해야 합니다.
        </Callout>
        <Callout type="tip" className="mb-4">버튼을 눌러 각 상태를 확인해보세요!</Callout>
        <CodeWithPreview code={CONDITIONAL_FULL_PATTERN_CODE} previewUrl="localhost:3000/posts">
          <FourStatesDemo />
        </CodeWithPreview>
      </div>

      {/* ══════════════════════════════════════════
          AI 프롬프트 팁
          ══════════════════════════════════════════ */}
      <div>
        <ChapterTitle num="Tip" title="AI에게 잘 요청하는 법" />
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">패턴별 프롬프트 비교</h3>
        <Callout type="info" className="mb-6">
          패턴을 알면 AI에게 <strong>구체적으로</strong> 요청할 수 있습니다. 구체적인 요청 = 정확한 결과
        </Callout>
        <div className="space-y-4">
          {AI_PROMPT_TIPS.map((tip) => (
            <Card key={tip.pattern} className="border-l-4 border-l-(--accent)">
              <p className="text-sm md:text-xl font-bold text-(--accent) mb-3">{tip.pattern}</p>
              <div className="grid md:grid-cols-2 gap-3 mb-2">
                <div>
                  <p className="text-sm md:text-base font-semibold text-red-400 mb-1">X 모호한 요청</p>
                  <p className="text-xs md:text-sm text-(--text-muted) bg-red-500/5 rounded-lg px-3 py-2">{tip.bad}</p>
                </div>
                <div>
                  <p className="text-sm md:text-base font-semibold text-(--accent) mb-1">O 구체적인 요청</p>
                  <p className="text-xs md:text-sm text-(--text-sub) bg-(--accent)/5 rounded-lg px-3 py-2">{tip.good}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-(--text-muted)">{tip.why}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          흔한 실수 & 디버깅
          ══════════════════════════════════════════ */}
      <div>
        <ChapterTitle num="Debug" title="흔한 실수 & 해결법" />
      </div>

      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">자주 만나는 에러 TOP 5</h3>
        <Callout type="warn" className="mb-6">
          AI가 생성한 코드에서도 이런 실수가 자주 발생합니다. 에러가 나면 아래 목록부터 확인하세요.
        </Callout>
        <div className="space-y-3">
          {COMMON_MISTAKES.map((item) => (
            <div key={item.mistake} className="p-4 rounded-xl bg-(--surface) border border-(--border)">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <p className="text-sm md:text-xl font-bold text-red-400 md:w-56 shrink-0">{item.mistake}</p>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-(--text-muted) mb-1">{item.symptom}</p>
                  <p className="text-xs md:text-sm text-(--accent) font-medium">{item.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          정리
          ══════════════════════════════════════════ */}
      <div>
        <ChapterTitle num="정리" title="오늘 배운 것" />
      </div>

      <div>
        <div className="space-y-3">
          {WEEK3_SUMMARY.map((item, i) => (
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
