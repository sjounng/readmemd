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
  WEEK4_TAGS,
  WEEK4_TOC,
  REQ_CHECKLIST,
  SITEMAP_EXAMPLE_CODE,
  PAGE_REQUIREMENTS_EXAMPLE,
  NEXTJS_ROUTING_REMINDER,
  FOLDER_STRUCTURE_CODE,
  SITEMAP_TO_FOLDER_STEPS,
  DATA_DESIGN_CONCEPT,
  DATA_DESIGN_STEPS,
  DATA_MODEL_CODE,
  MOCK_DATA_CODE,
  MOCK_USAGE_CODE,
  DATA_FOLDER_STRUCTURE,
  ROLE_SPLIT_METHODS,
  ROLE_EXAMPLE,
  ROLE_TIPS,
  BRANCH_STRATEGY_CODE,
  COMMIT_CONVENTION,
  WEEK4_SUMMARY,
  NEXT_WEEK_PREVIEW,
} from "@/constants/week4";

/* ── 구문 강조 ── */
interface Token { text: string; color: string }

function highlightLine(line: string): Token[] {
  const tokens: Token[] = [];
  const rules: [RegExp, string][] = [
    [/\/\/.*/, "#6a9955"],
    [/\/\*[\s\S]*?\*\//, "#6a9955"],
    [/\{\/\*.*?\*\/\}/, "#6a9955"],
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/, "#ce9178"],
    [/\b(import|export|from|default|as|async|await)\b/, "#c586c0"],
    [/\b(const|let|var|function|return|if|else|switch|case|break|for|of|in|new|throw|typeof|void)\b/, "#569cd6"],
    [/\b(interface|type|enum|extends|implements|readonly)\b/, "#569cd6"],
    [/\b(string|number|boolean|null|undefined|true|false|void|any|never|Promise)\b/, "#4ec9b0"],
    [/\b(React|Metadata|Link|Subject|Timetable|User)\b/, "#4ec9b0"],
    [/\b\d+\b/, "#b5cea8"],
    [/<\/?[A-Z]\w*/, "#4ec9b0"],
    [/<\/?(?:div|span|nav|main|html|body|section|button|footer|header|h[1-6]|p|a|pre|code|img|ul|li|aside|input|form|label)\b/, "#569cd6"],
    [/\/>/, "#808080"],
    [/[{}()\[\]]/, "#ffd700"],
    [/className/, "#92d1e7"],
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

/* ── 인터랙티브: 체크리스트 ── */
function ChecklistDemo({ items }: { items: { category: string; checks: string[] }[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setChecked((c) => ({ ...c, [key]: !c[key] }));

  const total = items.reduce((sum, g) => sum + g.checks.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full bg-(--surface) overflow-hidden">
          <div
            className="h-full rounded-full bg-(--accent) transition-all duration-300"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
        <span className="text-sm md:text-lg font-mono text-(--accent) shrink-0">
          {done}/{total}
        </span>
      </div>
      <div className="space-y-6">
        {items.map((group) => (
          <div key={group.category}>
            <h4 className="text-base md:text-2xl font-bold mb-3 text-(--accent)">{group.category}</h4>
            <div className="space-y-2">
              {group.checks.map((check) => {
                const key = `${group.category}-${check}`;
                return (
                  <button
                    key={key}
                    onClick={() => toggle(key)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all ${
                      checked[key]
                        ? "bg-(--accent)/5 border-(--accent)/30"
                        : "bg-(--surface) border-(--border) hover:border-(--accent)/20"
                    }`}
                  >
                    <span className={`flex items-center justify-center w-5 h-5 rounded border-2 shrink-0 mt-0.5 transition-colors ${
                      checked[key] ? "bg-(--accent) border-(--accent)" : "border-(--border)"
                    }`}>
                      {checked[key] && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm md:text-lg">{check}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Week4Content() {
  return (
    <SlidePresentation>

      {/* ── 제목 ── */}
      <div>
        <WeekHero
          weekNum={4}
          title="프로젝트 시작하기"
          subtitle="정의서 피드백 & 프로젝트 세팅"
          description="지난주에 작성한 요구사항정의서를 점검하고, 이를 기반으로 페이지 구조를 설계합니다. Mock 데이터로 프론트엔드를 먼저 개발하는 전략과 프로젝트 세팅 방법을 배웁니다."
        />
        <div className="flex flex-wrap gap-2 mt-8">
          {WEEK4_TAGS.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* ── 목차 ── */}
      <div>
        <h2 className="text-2xl md:text-6xl font-bold mb-10">목차</h2>
        <div className="grid grid-cols-2 gap-4">
          {WEEK4_TOC.map((item) => (
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
          01. 정의서 점검 & 피드백
          ══════════════════════════════════════════ */}
      <div data-slide-id="review">
        <ChapterTitle num="01" title="정의서 점검 & 피드백" />
      </div>

      {/* 체크리스트 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">정의서 자가 점검</h3>
        <Callout type="info" className="mb-6">
          여러분의 정의서를 열고 하나씩 체크해보세요. 체크가 안 되는 항목이 보완할 포인트입니다.
        </Callout>
        <ChecklistDemo items={REQ_CHECKLIST} />
      </div>

      {/* 피드백 시간 */}
      <div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <svg className="w-16 h-16 md:w-24 md:h-24 text-(--accent) mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <h2 className="text-3xl md:text-8xl font-extrabold mb-4">피드백 시간</h2>
          <p className="text-lg md:text-3xl text-(--text-sub)">
            정의서를 함께 보면서 개별 피드백을 드립니다
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          02. 페이지 구조 설계
          ══════════════════════════════════════════ */}
      <div data-slide-id="pages">
        <ChapterTitle num="02" title="페이지 구조 설계" />
      </div>

      {/* 사이트맵 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">사이트맵 예시</h3>
        <Callout type="info" className="mb-6">
          정의서의 페이지 구조를 URL 경로 기준 트리로 정리합니다.
        </Callout>
        <HighlightedCode code={SITEMAP_EXAMPLE_CODE} filename="사이트맵" />
      </div>

      {/* 페이지별 요구사항 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">페이지별 요구사항</h3>
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                <th className="text-left px-4 py-3 font-bold text-(--accent)">경로</th>
                <th className="text-left px-4 py-3 font-bold">페이지명</th>
                <th className="text-left px-4 py-3 font-bold hidden md:table-cell">주요 컴포넌트</th>
                <th className="text-center px-4 py-3 font-bold">인증</th>
                <th className="text-left px-4 py-3 font-bold hidden md:table-cell">기능 ID</th>
              </tr>
            </thead>
            <tbody>
              {PAGE_REQUIREMENTS_EXAMPLE.map((p) => (
                <tr key={p.path} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 font-mono text-(--accent) text-xs md:text-sm">{p.path}</td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-(--text-muted) text-xs md:text-sm hidden md:table-cell">{p.components}</td>
                  <td className="px-4 py-3 text-center">
                    {p.auth ? (
                      <svg className="w-5 h-5 text-(--accent) mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ) : (
                      <span className="text-(--text-muted)">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-(--text-muted) text-xs md:text-sm hidden md:table-cell">{p.featureIds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 사이트맵 → Next.js 폴더 구조 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">사이트맵 &rarr; Next.js 폴더 구조</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm md:text-xl font-semibold text-(--text-muted) mb-3">변환 과정</p>
            <div className="space-y-3">
              {SITEMAP_TO_FOLDER_STEPS.map((s) => (
                <div key={s.step} className="flex items-start gap-3 p-3 rounded-lg bg-(--surface) border border-(--border)">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <p className="text-sm md:text-base font-medium">{s.title}</p>
                    <p className="text-xs md:text-sm text-(--text-muted)">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm md:text-xl font-semibold text-(--accent) mb-3">결과 폴더 구조</p>
            <HighlightedCode code={FOLDER_STRUCTURE_CODE} filename="프로젝트 폴더 구조" />
          </div>
        </div>
      </div>

      {/* 라우팅 복습 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">Next.js 라우팅 규칙 복습</h3>
        <div className="space-y-3">
          {NEXTJS_ROUTING_REMINDER.map((r) => (
            <div key={r.pattern} className="flex items-center gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-lg font-mono text-(--accent)">{r.pattern}</p>
              </div>
              <svg className="w-5 h-5 text-(--text-muted) shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-lg font-mono">{r.route}</p>
                <p className="text-xs md:text-sm text-(--text-muted)">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          03. 데이터 설계
          ══════════════════════════════════════════ */}
      <div data-slide-id="data">
        <ChapterTitle num="03" title="데이터 설계" />
      </div>

      {/* 개념 + 3단계 */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{DATA_DESIGN_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{DATA_DESIGN_CONCEPT.desc}</p>
        </Card>
        <div className="grid md:grid-cols-3 gap-4">
          {DATA_DESIGN_STEPS.map((s) => (
            <Card key={s.step} className="border-l-4 border-l-(--accent)">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">
                  {s.step}
                </span>
                <h5 className="text-sm md:text-xl font-bold">{s.title}</h5>
              </div>
              <p className="text-xs md:text-base text-(--text-sub)">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Step 1: 데이터 모델 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">Step 1. 데이터 모델 정의</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          정의서의 &quot;주요 데이터 모델&quot; 섹션을 TypeScript interface로 옮깁니다.
        </p>
        <HighlightedCode code={DATA_MODEL_CODE} filename="src/types/timetable.ts" />
      </div>

      {/* Step 2: 샘플 데이터 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">Step 2. 샘플 데이터 작성</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          interface에 맞춰 화면 개발용 샘플 데이터를 3~5개 정도 만듭니다.
        </p>
        <HighlightedCode code={MOCK_DATA_CODE} filename="src/mocks/timetables.ts" />
      </div>

      {/* Step 3: 사용 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">Step 3. 컴포넌트에서 사용</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          샘플 데이터를 import해서 화면에 표시합니다.
        </p>
        <HighlightedCode code={MOCK_USAGE_CODE} filename="app/timetable/page.tsx" />
      </div>

      {/* 폴더 구조 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">데이터 관련 폴더 구조</h3>
        <HighlightedCode code={DATA_FOLDER_STRUCTURE} filename="프로젝트 구조" />
      </div>

      {/* ══════════════════════════════════════════
          04. 역할 분담 & 협업
          ══════════════════════════════════════════ */}
      <div data-slide-id="roles">
        <ChapterTitle num="04" title="역할 분담 & 협업" />
      </div>

      {/* 분담 방식 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">역할 분담 방식 3가지</h3>
        <div className="space-y-4">
          {ROLE_SPLIT_METHODS.map((m) => (
            <Card key={m.method} className="border-l-4 border-l-(--accent)">
              <h4 className="text-base md:text-2xl font-bold mb-2">{m.method}</h4>
              <p className="text-sm md:text-xl text-(--text-sub) mb-3">{m.desc}</p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-2 rounded-lg bg-(--accent)/5">
                  <p className="text-xs md:text-sm font-semibold text-(--accent) mb-1">장점</p>
                  <p className="text-xs md:text-sm text-(--text-sub)">{m.pros}</p>
                </div>
                <div className="p-2 rounded-lg bg-red-500/5">
                  <p className="text-xs md:text-sm font-semibold text-red-400 mb-1">단점</p>
                  <p className="text-xs md:text-sm text-(--text-muted)">{m.cons}</p>
                </div>
                <div className="p-2 rounded-lg bg-(--surface)">
                  <p className="text-xs md:text-sm font-semibold text-(--text-sub) mb-1">추천 상황</p>
                  <p className="text-xs md:text-sm text-(--text-muted)">{m.best}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 분담 예시 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">분담 예시 (3인 팀)</h3>
        <div className="overflow-x-auto rounded-xl border border-(--border) mb-6">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                <th className="text-left px-4 py-3 font-bold text-(--accent)">이름</th>
                <th className="text-left px-4 py-3 font-bold">역할</th>
                <th className="text-left px-4 py-3 font-bold hidden md:table-cell">담당 상세</th>
              </tr>
            </thead>
            <tbody>
              {ROLE_EXAMPLE.map((r) => (
                <tr key={r.name} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 font-bold">{r.name}</td>
                  <td className="px-4 py-3">{r.role}</td>
                  <td className="px-4 py-3 text-(--text-muted) text-sm font-mono hidden md:table-cell">{r.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="info">
          정의서의 기능 목록(F-01, F-02...)과 담당자를 1:1로 매핑해두면 나중에 &quot;이거 누가 하는 거지?&quot;가 없습니다.
        </Callout>
      </div>

      {/* 분담 팁 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">협업 팁</h3>
        <div className="space-y-3">
          {ROLE_TIPS.map((tip) => (
            <Card key={tip.title} className="border-l-4 border-l-(--accent)">
              <h4 className="text-base md:text-2xl font-bold mb-1">{tip.title}</h4>
              <p className="text-sm md:text-xl text-(--text-sub)">{tip.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 브랜치 전략 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">Git 브랜치 전략</h3>
        <HighlightedCode code={BRANCH_STRATEGY_CODE} filename="브랜치 전략" />
      </div>

      {/* 커밋 컨벤션 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">커밋 컨벤션</h3>
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                <th className="text-left px-4 py-3 font-bold text-(--accent)">접두사</th>
                <th className="text-left px-4 py-3 font-bold">설명</th>
                <th className="text-left px-4 py-3 font-bold hidden md:table-cell">예시</th>
              </tr>
            </thead>
            <tbody>
              {COMMIT_CONVENTION.map((c) => (
                <tr key={c.prefix} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 font-mono font-bold text-(--accent)">{c.prefix}</td>
                  <td className="px-4 py-3">{c.desc}</td>
                  <td className="px-4 py-3 text-(--text-muted) text-sm hidden md:table-cell">{c.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          정리
          ══════════════════════════════════════════ */}
      <div>
        <ChapterTitle num="정리" title="오늘 배운 것" />
      </div>

      <div>
        <div className="space-y-3 mb-10">
          {WEEK4_SUMMARY.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-base font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-sm md:text-xl font-medium">{item}</span>
            </div>
          ))}
        </div>

        <h3 className="text-xl md:text-5xl font-bold mb-6">이번 주 과제</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {NEXT_WEEK_PREVIEW.map((s) => (
            <Card key={s.step} className="border-l-4 border-l-(--accent)">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-sm font-bold shrink-0">
                  {s.step}
                </span>
                <h4 className="text-sm md:text-xl font-bold">{s.title}</h4>
              </div>
              <p className="text-xs md:text-base text-(--text-sub)">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>

    </SlidePresentation>
  );
}
