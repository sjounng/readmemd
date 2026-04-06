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
  WEEK5_TAGS,
  WEEK5_TOC,
  BREAKDOWN_CONCEPT,
  BREAKDOWN_LEVELS,
  PM_TOOLS,
  GOOD_TASK_CHECKLIST,
  PROGRESS_TRACKING_METHODS,
  KANBAN_COLUMNS,
  MILESTONE_EXAMPLE,
  PR_WORKFLOW_STEPS,
  PR_TEMPLATE,
  CODE_REVIEW_DO,
  CODE_REVIEW_DONT,
  PROBLEM_CATEGORIES,
  FIFTEEN_MIN_RULE,
  GOOD_QUESTION_FORMAT,
  BLOCKER_HANDLING,
  WEEK5_SUMMARY,
  MIDTERM_INFO,
  MIDTERM_SUBMIT_STEPS,
  MIDTERM_CHECKLIST,
  MIDTERM_EVALUATION,
  BACKEND_PREVIEW,
  BACKEND_TOPICS,
  FRONTEND_VS_BACKEND,
} from "@/constants/week5";

function ChapterTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <span className="text-4xl md:text-9xl font-extrabold text-(--accent) font-mono mb-6">{num}</span>
      <h2 className="text-2xl md:text-7xl font-bold text-center">{title}</h2>
    </div>
  );
}

/* ── 인터랙티브: 체크리스트 ── */
function TaskChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setChecked((c) => ({ ...c, [i]: !c[i] }));
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-2 rounded-full bg-(--surface) overflow-hidden">
          <div
            className="h-full rounded-full bg-(--accent) transition-all duration-300"
            style={{ width: `${(done / items.length) * 100}%` }}
          />
        </div>
        <span className="text-sm md:text-lg font-mono text-(--accent) shrink-0">
          {done}/{items.length}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all ${
              checked[i]
                ? "bg-(--accent)/5 border-(--accent)/30"
                : "bg-(--surface) border-(--border) hover:border-(--accent)/20"
            }`}
          >
            <span className={`flex items-center justify-center w-5 h-5 rounded border-2 shrink-0 mt-0.5 transition-colors ${
              checked[i] ? "bg-(--accent) border-(--accent)" : "border-(--border)"
            }`}>
              {checked[i] && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span className="text-sm md:text-lg">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── 인터랙티브: 칸반 보드 ── */
function KanbanBoard({ columns }: { columns: typeof KANBAN_COLUMNS }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {columns.map((col) => (
        <div key={col.name} className="rounded-xl border border-(--border) bg-(--surface) overflow-hidden">
          <div className="px-4 py-3 border-b border-(--border) bg-(--accent)/5">
            <h4 className="text-sm md:text-base font-bold text-(--accent)">{col.name}</h4>
            <p className="text-xs text-(--text-muted) hidden md:block">{col.desc}</p>
          </div>
          <div className="p-3 space-y-2">
            {col.items.map((item) => (
              <div key={item} className="p-2.5 rounded-lg bg-(--bg-card) border border-(--border) text-xs md:text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Week5Content() {
  return (
    <SlidePresentation>

      {/* ── 제목 ── */}
      <div>
        <WeekHero
          weekNum={5}
          title="프로젝트 협업 방법론"
          subtitle="작업 분해부터 문제 해결까지"
          description="요구사항 정의서를 실제 작업으로 쪼개고, 팀원과 효과적으로 협업하는 방법을 배웁니다. 작업을 어떻게 나누고, 진행 상황을 어떻게 관리하고, 막혔을 때 어떻게 해결하는지 알아봅니다."
        />
        <div className="flex flex-wrap gap-2 mt-8">
          {WEEK5_TAGS.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* ── 목차 ── */}
      <div>
        <h2 className="text-2xl md:text-6xl font-bold mb-10">목차</h2>
        <div className="grid grid-cols-2 gap-4">
          {WEEK5_TOC.map((item) => (
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
          01. 작업 분해
          ══════════════════════════════════════════ */}
      <div data-slide-id="breakdown">
        <ChapterTitle num="01" title="작업 분해" />
      </div>

      {/* 개념 */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{BREAKDOWN_CONCEPT.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{BREAKDOWN_CONCEPT.desc}</p>
        </Card>
        <h3 className="text-xl md:text-5xl font-bold mb-6">분해 단계: Epic → Feature → Task</h3>
        <div className="space-y-4">
          {BREAKDOWN_LEVELS.map((l, i) => (
            <div key={l.level} className="flex items-stretch gap-4">
              {i > 0 && (
                <div className="w-8 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-(--text-muted) rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              )}
              <Card className={`flex-1 border-l-4 ${i === 2 ? "border-l-(--accent)" : "border-l-(--border)"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm md:text-xl font-bold text-(--accent) font-mono">{l.level}</span>
                  <span className="text-xs md:text-sm px-2 py-0.5 rounded-full bg-(--surface) text-(--text-muted)">{l.size}</span>
                </div>
                <p className="text-sm md:text-lg font-medium mb-1">{l.desc}</p>
                <p className="text-xs md:text-base text-(--text-muted)">예: {l.example}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* 프로젝트 관리 도구 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">프로젝트 관리 도구</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          작업을 쪼갠 뒤에는 관리할 도구가 필요합니다. 실무에서 많이 쓰이는 도구들을 알아봅니다.
        </p>
        <div className="space-y-4">
          {PM_TOOLS.map((tool) => (
            <Card key={tool.name} className="border-l-4 border-l-(--accent)">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-base md:text-2xl font-bold">{tool.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  tool.category === "추천"
                    ? "bg-(--accent)/10 text-(--accent)"
                    : tool.category === "실무"
                    ? "bg-purple-500/10 text-purple-400"
                    : tool.category === "디자인"
                    ? "bg-pink-500/10 text-pink-400"
                    : "bg-green-500/10 text-green-400"
                }`}>
                  {tool.category}
                </span>
              </div>
              <p className="text-sm md:text-xl text-(--text-sub) mb-2">{tool.desc}</p>
              <p className="text-xs md:text-sm text-(--text-muted)">{tool.good}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 좋은 작업 체크리스트 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">잘 쪼갠 작업인지 확인하기</h3>
        <TaskChecklist items={GOOD_TASK_CHECKLIST} />
      </div>

      {/* ══════════════════════════════════════════
          02. 작업 배정 & 일정 관리
          ══════════════════════════════════════════ */}
      <div data-slide-id="assignment">
        <ChapterTitle num="02" title="작업 배정 & 일정 관리" />
      </div>

      {/* 진행 관리 도구 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">진행 관리 도구</h3>
        <div className="space-y-4">
          {PROGRESS_TRACKING_METHODS.map((m) => (
            <Card key={m.method} className="border-l-4 border-l-(--accent)">
              <h4 className="text-base md:text-2xl font-bold mb-1">{m.method}</h4>
              <p className="text-sm md:text-xl text-(--text-sub) mb-2">{m.desc}</p>
              <p className="text-xs md:text-sm text-(--accent)">{m.pros}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 칸반 보드 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">칸반 보드 예시</h3>
        <KanbanBoard columns={KANBAN_COLUMNS} />
      </div>

      {/* 마일스톤 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">주차별 마일스톤</h3>
        <Callout type="info" className="mb-6">
          매주 목표와 확인 기준을 정해두면 &quot;지금 우리가 어디쯤인지&quot; 알 수 있습니다.
        </Callout>
        <div className="space-y-3">
          {MILESTONE_EXAMPLE.map((m) => (
            <div key={m.week} className="flex items-stretch gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <div className="flex items-center justify-center w-16 shrink-0">
                <span className="text-sm md:text-base font-bold text-(--accent)">{m.week}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-lg font-medium mb-1">{m.goal}</p>
                <p className="text-xs md:text-sm text-(--text-muted)">확인: {m.check}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          03. 협업 워크플로우
          ══════════════════════════════════════════ */}
      <div data-slide-id="workflow">
        <ChapterTitle num="03" title="협업 워크플로우" />
      </div>

      {/* PR 기반 워크플로우 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">PR 기반 작업 흐름</h3>
        <div className="space-y-4">
          {PR_WORKFLOW_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-(--accent) text-white text-sm font-bold shrink-0">
                  {s.step}
                </span>
                {Number(s.step) < PR_WORKFLOW_STEPS.length && (
                  <div className="w-0.5 h-8 bg-(--border) mt-1" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <h4 className="text-sm md:text-xl font-bold mb-1">{s.title}</h4>
                <p className="text-xs md:text-base text-(--text-sub)">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PR 작성 가이드 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">{PR_TEMPLATE.title}</h3>
        <div className="rounded-xl border border-(--border) overflow-hidden">
          {PR_TEMPLATE.sections.map((s, i) => (
            <div key={s.heading} className={`p-4 ${i < PR_TEMPLATE.sections.length - 1 ? "border-b border-(--border)" : ""}`}>
              <h4 className="text-sm md:text-lg font-bold text-(--accent) mb-1">{s.heading}</h4>
              <p className="text-xs md:text-base text-(--text-sub)">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 코드 리뷰 Do */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">코드 리뷰 잘하는 법</h3>
        <div className="space-y-3">
          {CODE_REVIEW_DO.map((d) => (
            <Card key={d.do} className="border-l-4 border-l-(--accent)">
              <h4 className="text-base md:text-xl font-bold mb-2">{d.do}</h4>
              <p className="text-sm md:text-base text-(--text-muted) italic">&quot;{d.example.replace(/"/g, "")}&quot;</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 코드 리뷰 Don't */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">코드 리뷰에서 피할 것</h3>
        <div className="space-y-3">
          {CODE_REVIEW_DONT.map((d) => (
            <div key={d.dont} className="p-4 rounded-xl bg-(--surface) border border-(--border)">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-5 h-5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <span className="text-sm md:text-lg text-red-400 line-through">{d.dont}</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-(--accent) shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="16 10 11 15 8 12" />
                </svg>
                <span className="text-sm md:text-lg">{d.better}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          04. 문제 해결 방법론
          ══════════════════════════════════════════ */}
      <div data-slide-id="problem-solving">
        <ChapterTitle num="04" title="문제 해결 방법론" />
      </div>

      {/* 문제 유형별 접근 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">문제 유형별 접근법</h3>
        <div className="space-y-6">
          {PROBLEM_CATEGORIES.map((c) => (
            <Card key={c.category} className="border-l-4 border-l-(--accent)">
              <h4 className="text-base md:text-2xl font-bold text-(--accent) mb-1">{c.category}</h4>
              <p className="text-sm md:text-lg text-(--text-muted) mb-4">{c.desc}</p>
              <div className="space-y-2">
                {c.approach.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-(--surface)">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-(--accent)/10 text-(--accent) text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm md:text-base">{a}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 15분 규칙 */}
      <div>
        <Card className="mb-8">
          <h3 className="text-lg md:text-4xl font-bold text-(--accent) mb-3">{FIFTEEN_MIN_RULE.title}</h3>
          <p className="text-base md:text-2xl text-(--text-sub)">{FIFTEEN_MIN_RULE.desc}</p>
        </Card>
        <div className="space-y-3">
          {FIFTEEN_MIN_RULE.steps.map((s) => (
            <div key={s.time} className="flex items-center gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="text-sm md:text-lg font-mono font-bold text-(--accent) w-20 shrink-0">{s.time}</span>
              <span className="text-sm md:text-lg">{s.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 좋은 질문 포맷 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-2">좋은 질문의 구조</h3>
        <p className="text-sm md:text-xl text-(--text-sub) mb-6">
          질문할 때 이 4가지를 정리하면 답변이 훨씬 빨리 옵니다.
        </p>
        <div className="space-y-4">
          {GOOD_QUESTION_FORMAT.map((q, i) => (
            <div key={q.part} className="p-4 rounded-xl bg-(--surface) border border-(--border)">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent) text-white text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <h4 className="text-sm md:text-xl font-bold">{q.part}</h4>
                <span className="text-xs md:text-sm text-(--text-muted)">{q.desc}</span>
              </div>
              <p className="text-sm md:text-base text-(--text-muted) italic ml-11">&quot;{q.example}&quot;</p>
            </div>
          ))}
        </div>
      </div>

      {/* 블로커 대처 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">자주 겪는 상황 & 대처법</h3>
        <div className="space-y-4">
          {BLOCKER_HANDLING.map((b) => (
            <div key={b.situation} className="rounded-xl border border-(--border) overflow-hidden">
              <div className="p-4 bg-(--surface)">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className="text-sm md:text-lg font-medium">{b.situation}</span>
                </div>
              </div>
              <div className="p-4 border-t border-(--border)">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="16 10 11 15 8 12" />
                  </svg>
                  <span className="text-sm md:text-lg text-(--text-sub)">{b.solution}</span>
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
          {WEEK5_SUMMARY.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--accent)/10 text-(--accent) text-base font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-sm md:text-xl font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          중간 프로젝트 안내
          ══════════════════════════════════════════ */}
      <div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <svg className="w-16 h-16 md:w-24 md:h-24 text-(--accent) mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <h2 className="text-3xl md:text-8xl font-extrabold mb-4">{MIDTERM_INFO.title}</h2>
          <p className="text-lg md:text-3xl text-(--text-sub) max-w-2xl">
            {MIDTERM_INFO.desc}
          </p>
        </div>
      </div>

      {/* 제출 방법 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">제출 방법</h3>
        <div className="space-y-4">
          {MIDTERM_SUBMIT_STEPS.map((s) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-(--accent) text-white text-sm font-bold shrink-0">
                  {s.step}
                </span>
                {Number(s.step) < MIDTERM_SUBMIT_STEPS.length && (
                  <div className="w-0.5 h-8 bg-(--border) mt-1" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <h4 className="text-sm md:text-xl font-bold mb-1">{s.title}</h4>
                <p className="text-xs md:text-base text-(--text-sub)">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 제출 전 체크리스트 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">제출 전 체크리스트</h3>
        <TaskChecklist items={MIDTERM_CHECKLIST} />
      </div>

      {/* 평가 기준 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">평가 기준</h3>
        <div className="space-y-3">
          {MIDTERM_EVALUATION.map((e) => (
            <div key={e.criteria} className="flex items-start gap-4 p-4 rounded-xl bg-(--surface) border border-(--border)">
              <span className="text-sm md:text-lg font-bold text-(--accent) w-28 shrink-0">{e.criteria}</span>
              <span className="text-sm md:text-lg text-(--text-sub)">{e.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          6주차 이후 백엔드 안내
          ══════════════════════════════════════════ */}
      <div>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <svg className="w-16 h-16 md:w-24 md:h-24 text-(--accent) mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
          <h2 className="text-3xl md:text-8xl font-extrabold mb-4">{BACKEND_PREVIEW.title}</h2>
          <p className="text-lg md:text-3xl text-(--text-sub) max-w-2xl">
            {BACKEND_PREVIEW.desc}
          </p>
        </div>
      </div>

      {/* 프론트 vs 백엔드 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">프론트엔드 vs 백엔드</h3>
        <div className="overflow-x-auto rounded-xl border border-(--border)">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-(--surface) border-b border-(--border)">
                <th className="text-left px-4 py-3 font-bold"></th>
                <th className="text-left px-4 py-3 font-bold text-(--accent)">프론트엔드</th>
                <th className="text-left px-4 py-3 font-bold text-purple-400">백엔드</th>
              </tr>
            </thead>
            <tbody>
              {FRONTEND_VS_BACKEND.map((row) => (
                <tr key={row.aspect} className="border-b border-(--border) last:border-b-0">
                  <td className="px-4 py-3 font-medium text-(--text-muted)">{row.aspect}</td>
                  <td className="px-4 py-3">{row.frontend}</td>
                  <td className="px-4 py-3">{row.backend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 백엔드에서 배울 것 */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">6주차 이후 배울 내용</h3>
        <div className="space-y-4">
          {BACKEND_TOPICS.map((t) => (
            <Card key={t.topic} className="border-l-4 border-l-purple-400">
              <h4 className="text-base md:text-2xl font-bold mb-2">{t.topic}</h4>
              <p className="text-sm md:text-xl text-(--text-sub)">{t.desc}</p>
            </Card>
          ))}
        </div>
      </div>

    </SlidePresentation>
  );
}
