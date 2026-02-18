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
  REQUEST_FLOW,
  RESTAURANT_METAPHOR,
  ENV_TABS,
  VSCODE_STEPS,
  TERMINAL_COMMANDS,
  FILE_VERSION_EXAMPLES,
  GIT_BENEFITS,
  GIT_CONCEPT_TABS,
  COMMIT_TIMELINE,
  GITHUB_REPO_STEPS,
  FIRST_PUSH_STEPS,
  GIT_WORKFLOW_ZONES,
  WEEK1_SUMMARY,
} from "@/constants/week1";

function FlowIcon({ type }: { type: string }) {
  const cls = "w-8 h-8 text-(--accent)";
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "user":
      return <svg className={cls} {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case "monitor":
      return <svg className={cls} {...props}><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>;
    case "gear":
      return <svg className={cls} {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg>;
    case "database":
      return <svg className={cls} {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></svg>;
    default:
      return null;
  }
}

export default function Week1Content() {
  const [envTab, setEnvTab] = useState(0);
  const [gitConceptTab, setGitConceptTab] = useState(0);

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

      {/* ── Slide 2: OT 강의 소개 ── */}
      <div data-slide-id="ot">
        <SectionTitle num="00" title="OT" id="ot" />
        <h3 className="text-xl font-bold mb-4">강의 소개</h3>
        <Card className="mb-8">
          <h4 className="text-2xl font-bold text-(--accent) mb-4">{STUDY_INFO.title}</h4>
          <p className="text-(--text-sub) mb-6">{STUDY_INFO.goal}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              <div>
                <p className="font-semibold text-sm">대상</p>
                <p className="text-sm text-(--text-sub)">{STUDY_INFO.target}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-(--accent) shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
              <div>
                <p className="font-semibold text-sm">진행 방식</p>
                <p className="text-sm text-(--text-sub)">{STUDY_INFO.format}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Slide 3: 멘토 소개 + 기술 스택 ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">멘토 소개</h3>
        <Card className="mb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-(--accent) flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
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
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" /></svg>
                github.com/{MENTOR.github}
              </a>
            </div>
          </div>
        </Card>

        <h3 className="text-xl font-bold mb-4">사용하는 기술</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {TECH_STACK.map((tech) => (
            <Card key={tech.name} className={`border-t-2 ${tech.color}`}>
              <p className="text-xs font-bold text-(--text-muted) tracking-widest mb-2">{tech.role}</p>
              <h4 className="text-xl font-bold mb-2">{tech.name}</h4>
              <p className="text-sm text-(--text-sub)">{tech.desc}</p>
            </Card>
          ))}
        </div>
        <Callout type="info">8주 동안 이 세 가지 기술로 하나의 웹 서비스를 처음부터 끝까지 만들어봅니다.</Callout>
      </div>

      {/* ── Slide 4: 웹 서비스 이해 (Request Flow) ── */}
      <div data-slide-id="web">
        <SectionTitle num="01" title="웹 서비스 이해하기" id="web" />
        <p className="text-(--text-sub) mb-8 text-lg">
          브라우저에 주소를 입력하면 어떤 일이 벌어질까요?
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
      </div>

      {/* ── Slide 5: 식당 비유 + Callout ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">식당에 비유하면?</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
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
        <Callout type="info">이번 스터디에서 이 세 가지를 모두 직접 만들어봅니다!</Callout>
      </div>

      {/* ── Slide 6: 개발 환경 세팅 (Tabs) ── */}
      <div data-slide-id="env">
        <SectionTitle num="02" title="개발 환경 세팅" id="env" />
        <Tabs
          tabs={ENV_TABS}
          activeTab={envTab}
          onTabChange={setEnvTab}
        />

        {envTab === 0 && (
          <div>
            <p className="text-(--text-sub) mb-4">
              Visual Studio Code는 개발자들이 가장 많이 사용하는 코드 편집기입니다. 무료이며,
              다양한 확장 기능을 제공합니다.
            </p>
            <Card className="mb-6">
              <h4 className="font-bold text-(--accent) mb-3">다운로드</h4>
              <a
                href="https://code.visualstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-primary) border border-(--border) text-sm hover:border-(--accent) transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
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
        )}

        {envTab === 1 && (
          <div>
            <p className="text-(--text-sub) mb-4">
              다음 주부터 사용할 npm을 위해 Node.js를 미리 설치합니다.
            </p>
            <Card className="mb-6">
              <h4 className="font-bold text-(--accent) mb-3">다운로드 (LTS 버전)</h4>
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-primary) border border-(--border) text-sm hover:border-(--accent) transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                https://nodejs.org
              </a>
            </Card>
            <h4 className="font-bold mb-3">설치 확인</h4>
            <CodeBlock title="Terminal">{`$ node --version
v20.x.x

$ npm --version
10.x.x`}</CodeBlock>
            <Callout type="tip">두 명령어 모두 버전 번호가 출력되면 설치 완료!</Callout>
          </div>
        )}

        {envTab === 2 && (
          <div>
            <p className="text-(--text-sub) mb-4">
              VS Code에서{" "}
              <code className="px-1.5 py-0.5 rounded bg-(--bg-code) text-(--accent) text-sm">
                Ctrl + `
              </code>{" "}
              을 눌러 터미널을 열어보세요.
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
                    <tr
                      key={c.cmd}
                      className={i % 2 === 0 ? "bg-(--bg-card)" : "bg-(--bg-primary)"}
                    >
                      <td className="px-4 py-3 font-mono text-(--accent)">{c.cmd}</td>
                      <td className="px-4 py-3 text-(--text-sub)">{c.desc}</td>
                      <td className="px-4 py-3 font-mono text-(--text-muted) text-xs">
                        {c.ex}
                      </td>
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
        )}
      </div>

      {/* ── Slide 7: Git - Why Git ── */}
      <div data-slide-id="git">
        <SectionTitle num="03" title="Git 기본 개념" id="git" />
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h4 className="font-bold text-lg mb-4">이런 경험 있으시죠?</h4>
            <div className="space-y-2">
              {FILE_VERSION_EXAMPLES.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 px-3 py-2 rounded bg-(--bg-primary) font-mono text-sm text-(--text-muted)"
                >
                  <svg className="w-4 h-4 shrink-0 text-(--text-muted)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
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
                  <span className="text-(--accent)">✓</span>
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
          <strong>Git = 게임의 세이브 포인트.</strong> 언제든 원하는 시점으로 돌아갈 수 있습니다.
        </Callout>
      </div>

      {/* ── Slide 8: Git 핵심 개념 (Tabs) ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">핵심 개념 3가지</h3>
        <Tabs
          tabs={GIT_CONCEPT_TABS}
          activeTab={gitConceptTab}
          onTabChange={setGitConceptTab}
        />

        {gitConceptTab === 0 && (
          <div>
            <h4 className="text-lg font-bold text-(--accent) mb-2">Repository (저장소)</h4>
            <p className="text-(--text-sub) mb-4">
              프로젝트의 모든 파일과 변경 이력이 저장되는 공간입니다. 하나의 프로젝트 = 하나의
              Repository.
            </p>
            <CodeBlock title="프로젝트 폴더 구조">{`my-project/
  ├── .git/        ← Git이 관리하는 숨김 폴더
  ├── index.html
  ├── style.css
  └── README.md`}</CodeBlock>
          </div>
        )}

        {gitConceptTab === 1 && (
          <div>
            <h4 className="text-lg font-bold text-(--accent) mb-2">Commit (커밋)</h4>
            <p className="text-(--text-sub) mb-4">
              변경사항을 저장하는 하나의 단위입니다. 각 커밋에는 메시지를 남겨 &apos;무엇을
              변경했는지&apos; 기록합니다.
            </p>
            <div className="flex items-center gap-4 py-6 overflow-x-auto">
              {COMMIT_TIMELINE.map((c, i) => (
                <div key={c.hash} className="flex items-center">
                  <div className="flex flex-col items-center min-w-30">
                    <div className="w-5 h-5 rounded-full bg-(--accent)" />
                    <code className="text-xs text-(--accent) mt-2">{c.hash}</code>
                    <p className="text-sm font-medium mt-1">{c.msg}</p>
                    <p className="text-xs text-(--text-muted)">{c.time}</p>
                  </div>
                  {i < 3 && <div className="w-12 h-0.5 bg-(--accent) mx-2" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {gitConceptTab === 2 && (
          <div>
            <h4 className="text-lg font-bold text-(--accent) mb-2">Branch (브랜치)</h4>
            <p className="text-(--text-sub) mb-4">
              독립적인 작업 공간을 만들어 서로 영향 없이 개발할 수 있습니다. 평행 우주에서 따로
              작업하는 것과 같습니다.
            </p>
            <Card className="py-8 px-6">
              <svg viewBox="0 0 600 120" className="w-full h-auto">
                <line x1="30" y1="70" x2="570" y2="70" stroke="#00b4d8" strokeWidth="3" />
                {[30, 130, 350, 450, 570].map((x) => (
                  <circle key={x} cx={x} cy={70} r={8} fill="#00b4d8" />
                ))}
                <text x="575" y="75" fill="#00b4d8" fontSize="14" fontFamily="monospace">
                  main
                </text>
                <path
                  d="M130,70 Q180,30 230,30 L370,30 Q420,30 450,70"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                />
                {[230, 300, 370].map((x) => (
                  <circle key={x} cx={x} cy={30} r={6} fill="#f59e0b" />
                ))}
                <text x="270" y="20" fill="#f59e0b" fontSize="12" fontFamily="monospace">
                  feature
                </text>
              </svg>
            </Card>
            <Callout type="warn">
              지금은 <strong>main</strong> 브랜치 하나만 사용합니다. 브랜치는 협업할 때 자세히 배울
              예정!
            </Callout>
          </div>
        )}
      </div>

      {/* ── Slide 9: Git 설치 및 초기 설정 ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">Git 설치 및 초기 설정</h3>
        <Card className="mb-4">
          <h4 className="font-bold text-(--accent) mb-3">다운로드</h4>
          <a
            href="https://git-scm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-primary) border border-(--border) text-sm hover:border-(--accent) transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            https://git-scm.com
          </a>
        </Card>
        <CodeBlock title="초기 설정">{`$ git config --global user.name "홍길동"
$ git config --global user.email "hong@email.com"

# 설정 확인
$ git config --list`}</CodeBlock>
        <Callout type="tip">
          <code className="text-(--accent)">--global</code> 옵션은 이 컴퓨터의 모든
          프로젝트에 동일하게 적용됩니다.
        </Callout>
      </div>

      {/* ── Slide 10: Git vs GitHub ── */}
      <div data-slide-id="github">
        <SectionTitle num="04" title="GitHub 첫 Push" id="github" />
        <h3 className="text-xl font-bold mb-4">Git vs GitHub</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="border-t-2 border-t-(--accent)">
            <h4 className="text-2xl font-bold mb-2">Git</h4>
            <p className="text-(--text-sub)">
              내 컴퓨터에서 버전을 관리하는 <strong className="text-white">도구</strong>
            </p>
          </Card>
          <Card className="border-t-2 border-t-emerald-500">
            <h4 className="text-2xl font-bold mb-2">GitHub</h4>
            <p className="text-(--text-sub)">
              온라인에 코드를 올리고 공유하는 <strong className="text-white">서비스</strong>
            </p>
          </Card>
        </div>
      </div>

      {/* ── Slide 11: GitHub 레포지토리 생성 ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">GitHub 레포지토리 생성</h3>
        <Card className="mb-8">
          <div className="space-y-4">
            {GITHUB_REPO_STEPS.map((s) => (
              <StepItem key={s.num} num={s.num} title={s.title} desc={s.desc} />
            ))}
          </div>
        </Card>
      </div>

      {/* ── Slide 12: 실습 - 첫 번째 Push ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">실습: 첫 번째 Push!</h3>
        <div className="space-y-3 mb-8">
          {FIRST_PUSH_STEPS.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                i % 2 === 0 ? "bg-(--bg-card)" : "bg-(--bg-primary)"
              } border border-(--border)`}
            >
              <div className="shrink-0 w-7 h-7 rounded-full bg-(--accent) flex items-center justify-center text-xs font-bold text-white">
                {i + 1}
              </div>
              <code className="text-sm text-(--accent) flex-1 font-mono">{s.cmd}</code>
              <span className="text-sm text-(--text-muted) hidden md:block">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide 13: Git 워크플로우 ── */}
      <div>
        <h3 className="text-xl font-bold mb-4">Git 워크플로우</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {GIT_WORKFLOW_ZONES.map((z, i) => (
            <Card key={z.title} className="text-center border-t-2 border-t-(--accent)">
              <h4 className="font-bold">{z.title}</h4>
              <p className="text-sm text-(--text-muted)">{z.sub}</p>
              {i < 2 && <div className="md:hidden text-(--accent) text-lg mt-2">↓</div>}
            </Card>
          ))}
        </div>
        <div className="hidden md:flex justify-around mb-4 text-sm font-mono text-(--accent)">
          <span>git add →</span>
          <span>git commit →</span>
        </div>
        <Card className="border-l-4 border-l-(--accent)">
          <code className="text-(--accent) font-bold">git push</code>
          <span className="text-(--text-sub) ml-2">
            로컬 저장소의 커밋을 GitHub(원격 저장소)에 업로드합니다
          </span>
        </Card>
      </div>

      {/* ── Slide 14: 오늘 배운 것 + Next Week ── */}
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
            <p className="text-xs font-bold text-(--accent) tracking-widest mb-2">
              NEXT WEEK
            </p>
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
