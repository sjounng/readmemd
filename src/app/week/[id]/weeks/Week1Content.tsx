"use client";

import { useState } from "react";
import {
  SectionTitle,
  Card,
  CodeBlock,
  Callout,
  StepItem,
  Tabs,
  WeekHero,
  Tag,
  SlidePresentation,
} from "@/components";
import { SITE_NAME } from "@/constants/site";
import {
  WEEK1_TAGS,
  WEEK1_TOC,
  MENTOR,
  STUDY_INFO,
  TECH_STACK,
  TECH_DETAILS,
  REQUEST_FLOW,
  RESTAURANT_METAPHOR,
  VSCODE_STEPS,
  VSCODE_EXTENSIONS,
  TERMINAL_COMMANDS,
  FILE_VERSION_EXAMPLES,
  GIT_BENEFITS,
  COMMIT_TIMELINE,
  GITHUB_SIGNUP_STEPS,
  GH_CLI_AUTH_STEPS,
  GITHUB_REPO_STEPS,
  FIRST_PUSH_STEPS,
  GIT_WORKFLOW_ZONES,
  WEEK1_SUMMARY,
  ENV_OS_TABS,
  MAC_HOMEBREW_CMD,
  MAC_HOMEBREW_PATH_CMD,
} from "@/constants/week1";

function FlowIcon({ type }: { type: string }) {
  const cls = "w-8 h-8 text-(--accent)";
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "user":
      return (
        <svg className={cls} {...props}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "monitor":
      return (
        <svg className={cls} {...props}>
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      );
    case "gear":
      return (
        <svg className={cls} {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      );
    case "database":
      return (
        <svg className={cls} {...props}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0 0 18 0V5" />
          <path d="M3 12a9 3 0 0 0 18 0" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Week1Content() {
  const [osTab, setOsTab] = useState(0); // 0 = Mac, 1 = Windows

  return (
    <SlidePresentation>

      {/* ── Slide 1: Hero + Tags ── */}
      <div>
        <WeekHero
          weekNum={1}
          title="OT, 개발환경 세팅 및"
          subtitle="GitHub"
          description="오늘은 개발에 필요한 도구를 설치하고, Git과 GitHub의 기본을 배웁니다."
          tocItems={WEEK1_TOC}
        />
        <div className="flex flex-wrap gap-2 mt-8">
          {WEEK1_TAGS.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* ── Slide 2: OT – 강의 소개 ── */}
      <div data-slide-id="ot">
        <SectionTitle num="00" title="OT" id="ot" />
        <h3 className="text-xl font-bold mb-4">강의 소개</h3>
        <Card className="mb-6">
          <h4 className="text-2xl font-bold text-(--accent) mb-3">{STUDY_INFO.title}</h4>
          <p className="text-(--text-sub) mb-6">{STUDY_INFO.goal}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div>
                <p className="font-semibold text-sm">대상</p>
                <p className="text-sm text-(--text-sub)">{STUDY_INFO.target}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <div>
                <p className="font-semibold text-sm">진행 방식</p>
                <p className="text-sm text-(--text-sub)">{STUDY_INFO.format}</p>
              </div>
            </div>
          </div>
        </Card>
        <Callout type="info">
          코드를 한 줄도 모르는 상태에서 시작해도 괜찮습니다. 처음부터 차근차근 함께 만들어봅니다.
        </Callout>
      </div>

      {/* ── Slide 3: 멘토 소개 ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">멘토 소개</h3>
        <Card className="mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-(--accent) flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1">{MENTOR.name}</h4>
              <p className="text-sm text-(--text-sub) mb-2">{MENTOR.department}</p>
              <a
                href={`https://github.com/${MENTOR.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-(--accent) hover:underline"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                </svg>
                github.com/{MENTOR.github}
              </a>
            </div>
          </div>
        </Card>
        <Callout type="tip">
          질문은 언제든 환영합니다. 모르는 게 생기면 바로 물어보세요. 함께 찾아가는 스터디입니다.
        </Callout>
      </div>

      {/* ── Slide 4: 01 웹 서비스 이해 – 요청 흐름 ── */}
      <div data-slide-id="web">
        <SectionTitle num="01" title="웹 서비스 이해하기" id="web" />
        <p className="text-(--text-sub) mb-2 text-lg">
          브라우저에 주소를 입력하면 어떤 일이 벌어질까요?
        </p>
        <p className="text-(--text-sub) mb-8 text-sm">
          우리가 naver.com을 입력하는 순간, 요청은 프론트엔드 → 백엔드 → 데이터베이스 순서로 흘러갔다가 결과를 역순으로 돌려줍니다.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {REQUEST_FLOW.map((item, i) => (
            <div key={item.label} className="flex-1 flex flex-col items-center">
              <Card className="w-full text-center">
                <div className="flex justify-center mb-2">
                  <FlowIcon type={item.icon} />
                </div>
                <h3 className="font-bold text-(--accent) mb-1">{item.label}</h3>
                <p className="text-sm text-(--text-sub)">{item.desc}</p>
              </Card>
              {i < 3 && (
                <div className="hidden md:block text-(--accent) text-2xl mt-2">→</div>
              )}
            </div>
          ))}
        </div>
        <Callout type="info">
          이 흐름을 <strong>요청(Request) / 응답(Response)</strong>이라고 부릅니다. 모든 웹 서비스는 이 구조로 동작합니다.
        </Callout>
      </div>

      {/* ── Slide 5: 식당 비유 ── */}
      <div>
        <h3 className="text-xl font-bold mb-2">식당에 비유하면?</h3>
        <p className="text-(--text-sub) mb-6 text-sm">
          웹 서비스의 구조를 식당에 빗대어 생각하면 훨씬 이해하기 쉽습니다.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {RESTAURANT_METAPHOR.map((r) => (
            <Card key={r.role} className={`border-t-2 ${r.color}`}>
              <h4 className="font-bold text-lg mb-1">{r.role}</h4>
              <p className="text-(--accent) font-semibold text-sm mb-2">= {r.metaphor}</p>
              <p className="text-sm text-(--text-sub) mb-3">{r.desc}</p>
              <span className="inline-block px-2.5 py-1 text-xs rounded bg-(--bg-primary) border border-(--border) text-(--text-muted)">
                {r.tech}
              </span>
            </Card>
          ))}
        </div>
        <Callout type="info">
          손님(사용자)이 메뉴를 고르면 홀(프론트)이 주방(백엔드)에 전달하고, 주방은 냉장고(DB)에서 재료를 꺼내 요리(데이터)를 만들어 돌려줍니다.
        </Callout>
      </div>

      {/* ── Slide 6: 사용하는 기술 개요 ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">사용하는 기술</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {TECH_STACK.map((tech) => (
            <Card key={tech.name} className={`border-t-2 ${tech.color}`}>
              <p className="text-xs font-bold text-(--text-muted) tracking-widest mb-2">{tech.role}</p>
              <h4 className="text-xl font-bold mb-2">{tech.name}</h4>
              <p className="text-sm text-(--text-sub)">{tech.desc}</p>
            </Card>
          ))}
        </div>
        <Callout type="info">
          8주 동안 이 세 가지 기술로 하나의 웹 서비스를 처음부터 끝까지 만들어봅니다. 지금은 이름만 기억해도 충분합니다. 다음 슬라이드에서 각각 자세히 살펴볼게요.
        </Callout>
      </div>

      {/* ── Slides 7–9: 각 기술 상세 ── */}
      {TECH_DETAILS.map((tech) => (
        <div key={tech.name}>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-bold tracking-widest px-2.5 py-1 rounded border ${tech.borderTop} text-(--text-muted)`}>
              {tech.role}
            </span>
          </div>
          <h3 className={`text-3xl font-extrabold mb-1 ${tech.accentText}`}>{tech.name}</h3>
          <p className="text-(--text-sub) mb-6">{tech.tagline}</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {tech.features.map((f) => (
              <Card key={f.title} className={`border-t-2 ${tech.borderTop}`}>
                <h4 className="font-bold mb-2">{f.title}</h4>
                <p className="text-sm text-(--text-sub)">{f.desc}</p>
              </Card>
            ))}
          </div>

          <CodeBlock title={tech.codeTitle}>{tech.codeContent}</CodeBlock>

          <Callout type={tech.calloutType}>
            <strong>이번 스터디에서:</strong> {tech.studyGoal}
          </Callout>
        </div>
      ))}

      {/* ── Slide 10: 02 개발 환경 – VS Code 설치 ── */}
      <div data-slide-id="env">
        <SectionTitle num="02" title="개발 환경 세팅" id="env" />
        <h3 className="text-xl font-bold mb-2">VS Code</h3>
        <p className="text-(--text-sub) mb-4 text-sm">
          Visual Studio Code는 개발자들이 가장 많이 사용하는 무료 코드 편집기입니다. 문법 강조, 자동완성, Git 연동 등 개발에 필요한 기능이 기본으로 들어있습니다.
        </p>
        <Card className="mb-6">
          <h4 className="font-bold text-(--accent) mb-3">다운로드</h4>
          <a
            href="https://code.visualstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-primary) border border-(--border) text-sm hover:border-(--accent) transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            https://code.visualstudio.com
          </a>
        </Card>
        <h4 className="font-bold mb-3">설치 후 확인할 것</h4>
        <div className="space-y-3">
          {VSCODE_STEPS.map((s) => (
            <StepItem key={s.num} num={s.num} title={s.title} desc={s.desc} />
          ))}
        </div>
      </div>

      {/* ── Slide 11: VS Code 추천 확장 프로그램 ── */}
      <div>
        <h3 className="text-xl font-bold mb-6">VS Code 추천 확장 프로그램</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {VSCODE_EXTENSIONS.map((ext) => (
            <div key={ext.name} className="flex items-start gap-3 p-3 rounded-lg bg-(--bg-card) border border-(--border)">
              <div className="shrink-0 w-2 h-2 rounded-full bg-(--accent) mt-2" />
              <div>
                <p className="font-semibold text-sm">{ext.name}</p>
                <p className="text-xs text-(--text-sub) mt-0.5">{ext.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout type="tip">
          왼쪽 사이드바 Extensions 탭(Ctrl+Shift+X / Cmd+Shift+X)에서 이름을 검색해 설치할 수 있습니다.
        </Callout>
      </div>

      {/* ── Slide 12: 터미널 명령어 ── */}
      <div>
        <h3 className="text-xl font-bold mb-2">터미널 명령어</h3>
        <p className="text-(--text-sub) mb-2 text-sm">
          터미널(Terminal)은 텍스트로 컴퓨터에 명령을 내리는 도구입니다. VS Code에서{" "}
          <code className="px-1.5 py-0.5 rounded bg-(--bg-code) text-(--accent) text-sm">Ctrl + `</code>{" "}
          을 누르면 내장 터미널이 열립니다. (Mac은 동일)
        </p>
        <p className="text-(--text-sub) mb-6 text-sm">
          처음엔 낯설지만 개발자에게 터미널은 필수 도구입니다. 아래 5가지 명령어만 알아도 충분히 시작할 수 있습니다.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-(--accent) text-white">
                <th className="px-4 py-3 text-left rounded-tl-lg">명령어</th>
                <th className="px-4 py-3 text-left">설명</th>
                <th className="px-4 py-3 text-left rounded-tr-lg">예시</th>
              </tr>
            </thead>
            <tbody>
              {TERMINAL_COMMANDS.map((c, i) => (
                <tr key={c.cmd} className={i % 2 === 0 ? "bg-(--bg-card)" : "bg-(--bg-primary)"}>
                  <td className="px-4 py-3 font-mono text-(--accent)">{c.cmd}</td>
                  <td className="px-4 py-3 text-(--text-sub)">{c.desc}</td>
                  <td className="px-4 py-3 font-mono text-(--text-muted) text-xs">{c.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4 className="font-bold mb-3">직접 따라해보세요</h4>
        <CodeBlock title="Terminal">{`# 바탕화면으로 이동
$ cd Desktop

# 새 폴더 만들기
$ mkdir my-first-repo

# 폴더로 이동
$ cd my-first-repo

# 현재 위치 확인
$ pwd`}</CodeBlock>
      </div>

      {/* ── Slide 13: Homebrew (Mac) ── */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--bg-card) border border-(--accent) text-xs font-bold text-(--accent) mb-4">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4" />
            <path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3z" />
          </svg>
          Mac 전용
        </div>
        <h3 className="text-xl font-bold mb-2">Homebrew</h3>
        <p className="text-(--text-sub) mb-6 text-sm">
          Homebrew는 macOS의 패키지 관리자입니다. Node.js, Git 같은 개발 도구를 명령어 한 줄로 설치하고 관리할 수 있습니다.
          <br /><br />
          Windows는 각 도구를 공식 사이트에서 직접 설치하면 됩니다.
        </p>
        <div className="space-y-4">
          <div>
            <StepItem num={1} title="Homebrew 설치" desc="터미널을 열고 아래 명령어를 실행합니다." />
            <CodeBlock>{MAC_HOMEBREW_CMD}</CodeBlock>
          </div>
          <div>
            <StepItem num={2} title="PATH 설정" desc="설치 완료 후 Next steps 안내가 표시됩니다. 안내에 나온 명령어를 그대로 실행하세요." />
            <CodeBlock>{MAC_HOMEBREW_PATH_CMD}</CodeBlock>
          </div>
        </div>
        <Callout type="info" >
          새 터미널 창을 열어 <code className="text-(--accent)">brew --version</code>이 출력되면 설치 성공입니다.
        </Callout>
      </div>

      {/* ── Slide 13: Node.js 소개 ── */}
      <div>
        <h3 className="text-xl font-bold mb-2">Node.js</h3>
        <p className="text-(--text-sub) mb-6 text-sm">
          Node.js는 JavaScript를 브라우저 밖(서버, 터미널)에서도 실행할 수 있게 해주는 런타임입니다. Next.js 같은 프레임워크를 설치하고 실행할 때 반드시 필요합니다.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card className="border-t-2 border-t-(--accent)">
            <h4 className="font-bold mb-2">Node.js</h4>
            <p className="text-sm text-(--text-sub)">JavaScript 런타임. 브라우저 없이 JS 코드를 실행할 수 있습니다. Next.js, Nest.js 등 모든 JS 프레임워크의 기반입니다.</p>
          </Card>
          <Card className="border-t-2 border-t-violet-500">
            <h4 className="font-bold mb-2">npm</h4>
            <p className="text-sm text-(--text-sub)">Node Package Manager. Node.js를 설치하면 자동으로 함께 설치됩니다. 외부 라이브러리를 설치할 때 사용합니다.</p>
          </Card>
        </div>
        <Callout type="info">
          npm을 통해 <code className="text-(--accent)">npm install</code> 명령어로 수십만 개의 오픈소스 패키지를 바로 프로젝트에 추가할 수 있습니다.
        </Callout>
      </div>

      {/* ── Slide 14: Node.js 설치 ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">Node.js 설치</h3>
        <Card className="mb-4">
          <Tabs tabs={ENV_OS_TABS} activeTab={osTab} onTabChange={setOsTab} />
          {osTab === 0 && (
            <div>
              <p className="text-sm text-(--text-sub) mb-3">Homebrew가 설치된 상태에서 아래 명령어를 실행합니다. npm은 자동으로 함께 설치됩니다.</p>
              <CodeBlock>{`$ brew install node`}</CodeBlock>
            </div>
          )}
          {osTab === 1 && (
            <div>
              <p className="text-sm text-(--text-sub) mb-3">nodejs.org 에서 LTS 버전을 다운로드합니다. npm은 자동으로 함께 설치됩니다.</p>
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-primary) border border-(--border) text-sm hover:border-(--accent) transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                https://nodejs.org
              </a>
            </div>
          )}
        </Card>
        <h4 className="font-bold mb-3">설치 확인</h4>
        <CodeBlock title="Terminal">{`$ node --version
v20.x.x   ← 이렇게 버전이 나오면 성공!

$ npm --version
10.x.x`}</CodeBlock>
        <Callout type="tip">
          LTS(Long-Term Support)는 장기 지원 버전으로 가장 안정적입니다. 항상 LTS를 설치하세요.
        </Callout>
      </div>

      {/* ── Slide 17: 03 Git – 왜 필요한가 ── */}
      <div data-slide-id="git">
        <SectionTitle num="03" title="Git 기본 개념" id="git" />
        <h3 className="text-xl font-bold mb-4">Git이 필요한 이유</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <h4 className="font-bold text-lg mb-4">이런 경험 있으시죠?</h4>
            <div className="space-y-2">
              {FILE_VERSION_EXAMPLES.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 px-3 py-2 rounded bg-(--bg-primary) font-mono text-sm text-(--text-muted)"
                >
                  <svg className="w-4 h-4 shrink-0 text-(--text-muted)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h4 className="font-bold text-lg mb-4 text-(--accent)">Git이 해결합니다!</h4>
            <div className="space-y-4">
              {GIT_BENEFITS.map((s) => (
                <div key={s.title} className="flex gap-3">
                  <span className="text-(--accent) mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm text-(--text-sub)">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Callout type="info">
          <strong>Git = 게임의 세이브 포인트.</strong> 코드를 망쳐도 언제든 원하는 시점으로 되돌릴 수 있습니다.
        </Callout>
      </div>

      {/* ── Slide 14: Git 핵심 개념 – Repository ── */}
      <div>
        <h3 className="text-xl font-bold mb-1">핵심 개념 1 — Repository (저장소)</h3>
        <p className="text-sm text-(--text-muted) mb-6">프로젝트의 모든 파일과 변경 이력이 저장되는 공간</p>
        <p className="text-(--text-sub) mb-4">
          하나의 프로젝트 폴더 = 하나의 Repository입니다. Git을 초기화하면 폴더 안에 숨김 폴더 <code className="px-1.5 py-0.5 rounded bg-(--bg-code) text-(--accent) text-sm">.git</code>이 생성되고, 이곳에 모든 이력이 저장됩니다.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-3">Local Repository</h4>
            <p className="text-sm text-(--text-sub) mb-3">내 컴퓨터에 있는 저장소입니다. 아래 명령어로 현재 폴더를 Git 저장소로 초기화합니다.</p>
            <CodeBlock>{`$ git init`}</CodeBlock>
            <CodeBlock title="초기화 후 폴더 구조">{`my-project/
  ├── .git/        ← Git이 관리하는 숨김 폴더
  ├── index.html
  ├── style.css
  └── README.md`}</CodeBlock>
          </div>
          <div>
            <h4 className="font-bold mb-3">Remote Repository</h4>
            <p className="text-sm text-(--text-sub) mb-3">GitHub 같은 온라인 서버에 있는 저장소입니다. 팀원들과 코드를 공유할 때 사용합니다.</p>
            <Card className="border-t-2 border-t-(--accent)">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-(--accent)" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                </svg>
                <div>
                  <p className="font-semibold">GitHub</p>
                  <p className="text-sm text-(--text-muted)">대표적인 Remote Repository 서비스</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ── Slide 15: Git 핵심 개념 – Commit ── */}
      <div>
        <h3 className="text-xl font-bold mb-1">핵심 개념 2 — Commit (커밋)</h3>
        <p className="text-sm text-(--text-muted) mb-6">변경사항을 저장하는 하나의 단위</p>
        <p className="text-(--text-sub) mb-4">
          커밋은 &apos;이 시점의 코드 상태&apos;를 사진처럼 찍어 저장하는 행위입니다. 각 커밋에는 메시지를 남겨 무엇을 변경했는지 기록합니다.
        </p>
        <div className="flex items-center gap-2 overflow-x-auto py-6 mb-4">
          {COMMIT_TIMELINE.map((c, i) => (
            <div key={c.hash} className="flex items-center shrink-0">
              <div className="flex flex-col items-center min-w-32">
                <div className="w-5 h-5 rounded-full bg-(--accent)" />
                <code className="text-xs text-(--accent) mt-2">{c.hash}</code>
                <p className="text-sm font-medium mt-1 text-center">{c.msg}</p>
                <p className="text-xs text-(--text-muted)">{c.time}</p>
              </div>
              {i < COMMIT_TIMELINE.length - 1 && (
                <div className="w-10 h-0.5 bg-(--accent) mx-1" />
              )}
            </div>
          ))}
        </div>
        <CodeBlock title="커밋 명령어">{`$ git add .                         # 변경된 파일 스테이징
$ git commit -m "메인 페이지 추가"    # 커밋 메시지 작성
$ git log --oneline                   # 커밋 이력 확인`}</CodeBlock>
        <Callout type="tip">
          커밋 메시지는 <strong>무엇을 했는지 명확하게</strong> 적으세요. &ldquo;수정함&rdquo; 보다 &ldquo;로그인 버튼 색상 변경&rdquo;이 훨씬 좋은 메시지입니다.
        </Callout>
      </div>

      {/* ── Slide 16: Git 핵심 개념 – Branch ── */}
      <div>
        <h3 className="text-xl font-bold mb-1">핵심 개념 3 — Branch (브랜치)</h3>
        <p className="text-sm text-(--text-muted) mb-6">독립적인 작업 공간</p>
        <p className="text-(--text-sub) mb-4">
          브랜치는 기존 코드에 영향을 주지 않고 새로운 기능을 개발할 수 있는 평행 작업 공간입니다. 완성되면 <strong>main</strong> 브랜치에 합칩니다(merge).
        </p>
        <Card className="py-8 px-6 mb-4">
          <svg viewBox="0 0 600 120" className="w-full h-auto">
            <line x1="30" y1="70" x2="570" y2="70" stroke="#6366F1" strokeWidth="3" />
            {[30, 130, 350, 450, 570].map((x) => (
              <circle key={x} cx={x} cy={70} r={8} fill="#6366F1" />
            ))}
            <text x="570" y="95" textAnchor="middle" fill="#6366F1" fontSize="14" fontFamily="monospace">main</text>
            <path
              d="M130,70 Q180,30 230,30 L370,30 Q420,30 450,70"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeDasharray="6,4"
            />
            {[230, 300, 370].map((x) => (
              <circle key={x} cx={x} cy={30} r={6} fill="#0ea5e9" />
            ))}
            <text x="265" y="20" fill="#0ea5e9" fontSize="12" fontFamily="monospace">feature/login</text>
          </svg>
        </Card>
        <Callout type="warn">
          지금은 <strong>main</strong> 브랜치 하나만 사용합니다. 브랜치는 협업 세션에서 자세히 다룰 예정입니다.
        </Callout>
      </div>

      {/* ── Slide 17: Git 설치 및 초기 설정 ── */}
      <div>
        <h3 className="text-xl font-bold mb-2">Git 설치 및 초기 설정</h3>
        <p className="text-(--text-sub) mb-4 text-sm">
          Git은 터미널에서 사용하는 도구입니다. 설치 후 사용자 정보를 등록해야 커밋에 작성자 정보가 남습니다.
        </p>
        <Card className="mb-4">
          <h4 className="font-bold text-(--accent) mb-3">설치</h4>
          <Tabs tabs={ENV_OS_TABS} activeTab={osTab} onTabChange={setOsTab} />
          {osTab === 0 && (
            <div>
              <p className="text-sm text-(--text-sub) mb-3">Homebrew로 Git을 설치합니다. Node.js 설치 시 Homebrew가 이미 설치되어 있습니다.</p>
              <CodeBlock>{`$ brew install git`}</CodeBlock>
            </div>
          )}
          {osTab === 1 && (
            <div>
              <p className="text-sm text-(--text-sub) mb-3">git-scm.com 에서 Windows 버전을 다운로드합니다. 설치 중 옵션은 기본값으로 유지하세요.</p>
              <a
                href="https://git-scm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-primary) border border-(--border) text-sm hover:border-(--accent) transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                https://git-scm.com
              </a>
            </div>
          )}
        </Card>
        <CodeBlock title="초기 설정 (최초 1회)">{`# 이름과 이메일 등록 (GitHub 계정과 동일하게)
$ git config --global user.name "홍길동"
$ git config --global user.email "hong@email.com"

# 설정 확인
$ git config --list`}</CodeBlock>
        <Callout type="tip">
          <code className="text-(--accent)">--global</code> 옵션은 이 컴퓨터의 모든 프로젝트에 동일하게 적용됩니다. 컴퓨터당 한 번만 설정하면 됩니다.
        </Callout>
      </div>

      {/* ── Slide 18: 04 GitHub 첫 Push – Git vs GitHub ── */}
      <div data-slide-id="github">
        <SectionTitle num="04" title="GitHub 첫 Push" id="github" />
        <h3 className="text-xl font-bold mb-4">Git vs GitHub</h3>
        <p className="text-(--text-sub) mb-6 text-sm">
          많이 혼동하는 개념이니 확실히 구분해두세요. Git은 <strong>도구</strong>고, GitHub는 그 도구를 활용하는 <strong>온라인 서비스</strong>입니다.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card className="border-t-2 border-t-(--accent)">
            <p className="text-xs font-bold text-(--accent) tracking-widest mb-2">LOCAL TOOL</p>
            <h4 className="text-2xl font-bold mb-2">Git</h4>
            <p className="text-(--text-sub) text-sm">내 컴퓨터에서 버전을 관리하는 <strong className="text-(--foreground)">도구</strong>. 인터넷 없이도 사용 가능합니다.</p>
          </Card>
          <Card className="border-t-2 border-t-violet-500">
            <p className="text-xs font-bold text-violet-500 tracking-widest mb-2">ONLINE SERVICE</p>
            <h4 className="text-2xl font-bold mb-2">GitHub</h4>
            <p className="text-(--text-sub) text-sm">온라인에 코드를 올리고 공유하는 <strong className="text-(--foreground)">서비스</strong>. 팀원들과 협업할 수 있습니다.</p>
          </Card>
        </div>
        <Callout type="info">
          비유하면 Git = 내 작업실의 버전 관리 시스템, GitHub = 작업물을 올려두는 온라인 전시관입니다.
        </Callout>
      </div>

      {/* ── Slide 19: GitHub 회원가입 ── */}
      <div>
        <h3 className="text-xl font-bold mb-2">GitHub 회원가입</h3>
        <p className="text-(--text-sub) mb-6 text-sm">
          GitHub를 사용하려면 계정이 필요합니다. 이미 계정이 있다면 이 단계는 건너뛰세요.
        </p>
        <Card className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-primary) border border-(--border) text-sm hover:border-(--accent) transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
              https://github.com
            </a>
          </div>
          <div className="space-y-3">
            {GITHUB_SIGNUP_STEPS.map((s) => (
              <StepItem key={s.num} num={s.num} title={s.title} desc={s.desc} />
            ))}
          </div>
        </Card>
        <Callout type="tip">
          username은 나중에 바꾸기 번거로우니 신중하게 정하세요. 보통 이름이나 닉네임을 영문으로 씁니다.
        </Callout>
      </div>

      {/* ── Slide 20: GitHub CLI 설치 + 인증 ── */}
      <div>
        <h3 className="text-xl font-bold mb-2">GitHub CLI — gh</h3>
        <p className="text-(--text-sub) mb-4 text-sm">
          GitHub CLI는 터미널에서 GitHub 인증, 레포 생성, PR 등을 처리할 수 있는 공식 도구입니다.
          설치 후 <code className="px-1.5 py-0.5 rounded bg-(--bg-code) text-(--accent) text-sm">gh auth login</code>으로 내 계정을 연결하면
          이후 <code className="px-1.5 py-0.5 rounded bg-(--bg-code) text-(--accent) text-sm">git push</code>도 별도 비밀번호 없이 동작합니다.
        </p>
        <Card className="mb-4">
          <h4 className="font-bold text-(--accent) mb-3">설치</h4>
          <Tabs tabs={ENV_OS_TABS} activeTab={osTab} onTabChange={setOsTab} />
          {osTab === 0 && (
            <CodeBlock>{`$ brew install gh`}</CodeBlock>
          )}
          {osTab === 1 && (
            <div>
              <p className="text-sm text-(--text-sub) mb-3">공식 사이트에서 Windows Installer를 다운로드합니다.</p>
              <a
                href="https://cli.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-primary) border border-(--border) text-sm hover:border-(--accent) transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                https://cli.github.com
              </a>
            </div>
          )}
        </Card>
        <h4 className="font-bold mb-3">로그인 (최초 1회)</h4>
        <CodeBlock title="Terminal">{`$ gh auth login`}</CodeBlock>
        <p className="text-sm text-(--text-sub) mt-4 mb-3">실행하면 아래 순서로 선택지가 나타납니다.</p>
        <div className="space-y-2 mb-4">
          {GH_CLI_AUTH_STEPS.map((s) => (
            <StepItem key={s.num} num={s.num} title={s.title} />
          ))}
        </div>
        <Callout type="info">
          로그인이 완료되면 아래 명령어로 연결된 계정을 확인할 수 있습니다.
          <CodeBlock className="mt-2">{`$ gh auth status`}</CodeBlock>
        </Callout>
      </div>

      {/* ── Slide 22: GitHub 레포지토리 생성 ── */}
      <div>
        <h3 className="text-xl font-bold mb-2">GitHub 레포지토리 생성</h3>
        <p className="text-(--text-sub) mb-4 text-sm">
          로컬에서 직접 파일을 올릴 것이기 때문에 <strong className="text-(--foreground)">아무것도 없는 빈 레포지토리</strong>를 만들어야 합니다.
        </p>
        <Card className="mb-4">
          <div className="space-y-4">
            {GITHUB_REPO_STEPS.map((s) => (
              <StepItem key={s.num} num={s.num} title={s.title} desc={s.desc} />
            ))}
          </div>
        </Card>
        <Callout type="warn">
          Create repository 클릭 후 나오는 페이지에서 HTTPS URL을 복사해두세요. 다음 단계에서 사용합니다.
        </Callout>
      </div>

      {/* ── Slide 실습: README.md 올리기 ── */}
      <div>
        <h3 className="text-xl font-bold mb-2">실습: README.md 올리기</h3>
        <p className="text-(--text-sub) mb-4 text-sm">
          터미널에서 아래 명령어를 순서대로 입력합니다. 마지막 <code className="px-1.5 py-0.5 rounded bg-(--bg-code) text-(--accent) text-sm">git push</code>가 성공하면 GitHub에서 README.md가 보입니다.
        </p>
        <div className="space-y-2 mb-4">
          {FIRST_PUSH_STEPS.map((s, i) => (
            <StepItem key={i} num={i + 1} title={s.desc} />
          ))}
        </div>
        <CodeBlock title="Terminal">
          {FIRST_PUSH_STEPS.map((s) => s.cmd).join("\n")}
        </CodeBlock>
        <Callout type="tip">
          <code className="text-(--accent)">&lt;URL&gt;</code> 자리에는 방금 복사한 레포지토리 주소를 붙여넣으세요.
          <br />예: <code className="text-(--text-muted)">https://github.com/username/my-first-repo.git</code>
        </Callout>
      </div>

      {/* ── Slide 21: Git 워크플로우 ── */}
      <div>
        <h3 className="text-xl font-bold mb-2">Git 워크플로우</h3>
        <p className="text-(--text-sub) mb-6 text-sm">
          코드를 수정하고 GitHub에 올리기까지의 전체 흐름입니다. 이 세 단계를 반복하는 것이 일반적인 Git 사용 패턴입니다.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-2">
          {GIT_WORKFLOW_ZONES.map((z, i) => (
            <Card key={z.title} className="text-center border-t-2 border-t-(--accent)">
              <h4 className="font-bold">{z.title}</h4>
              <p className="text-sm text-(--text-muted)">{z.sub}</p>
              {i < 2 && <div className="md:hidden text-(--accent) text-lg mt-2">↓</div>}
            </Card>
          ))}
        </div>
        <div className="hidden md:flex justify-around mb-6 text-sm font-mono text-(--accent)">
          <span>git add →</span>
          <span>git commit →</span>
          <span>git push</span>
        </div>
        <CodeBlock title="전체 흐름 요약">{`# 1. 파일 수정 후 스테이징
$ git add .

# 2. 커밋 (스냅샷 저장)
$ git commit -m "기능 설명"

# 3. GitHub에 업로드
$ git push origin main`}</CodeBlock>
      </div>

      {/* ── Slide 22: 오늘 배운 것 + Next Week ── */}
      <div>
        <div className="p-8 rounded-2xl bg-(--bg-card) border border-(--border)">
          <h3 className="text-2xl font-bold mb-6">오늘 배운 것</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {WEEK1_SUMMARY.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-(--accent)">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-(--bg-primary) border border-(--border)">
            <p className="text-xs font-bold text-(--accent) tracking-widest mb-2">NEXT WEEK</p>
            <p className="text-xl font-bold mb-1">
              npm과 Next.js로 진짜 프로젝트를 시작합니다!
            </p>
            <p className="text-sm text-(--text-muted)">
              npm 기본 사용법 · Next.js 프로젝트 생성 · 기본 페이지 &amp; 라우팅
            </p>
          </div>
        </div>

        <footer className="text-center py-12 text-sm text-(--text-muted) border-t border-(--border) mt-8">
          <p>{SITE_NAME} 스터디</p>
        </footer>
      </div>

    </SlidePresentation>
  );
}
