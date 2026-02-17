"use client";

import { useState } from "react";
import {
  SectionTitle,
  Card,
  CodeBlock,
  Callout,
  StepItem,
  Tabs,
  WeekNav,
  WeekHero,
} from "@/components";

export default function Week1Content() {
  const [envTab, setEnvTab] = useState(0);
  const [gitConceptTab, setGitConceptTab] = useState(0);

  return (
    <div className="relative min-h-screen">
      {/* Background blobs */}
      <div className="bg-blob" style={{ top: "-200px", right: "-200px" }} />
      <div className="bg-blob" style={{ top: "50%", left: "-300px" }} />

      {/* Navigation */}
      <WeekNav
        weekNum={1}
        title="OT, 개발환경 세팅 및 GitHub"
        navItems={[
          { label: "웹 서비스", href: "#web" },
          { label: "개발 환경", href: "#env" },
          { label: "Git", href: "#git" },
          { label: "GitHub", href: "#github" },
        ]}
      />

      <main className="relative z-10 max-w-5xl mx-auto px-6">
        {/* ═══════ HERO ═══════ */}
        <WeekHero
          weekNum={1}
          title="OT, 개발환경 세팅 및"
          subtitle="GitHub"
          description="프로그래밍을 처음 시작하는 분들을 위한 풀스택 웹 개발 입문 스터디입니다. 오늘은 개발에 필요한 도구를 설치하고, Git과 GitHub의 기본을 배웁니다."
          tocItems={[
            { num: "01", title: "웹 서비스 이해", href: "#web" },
            { num: "02", title: "개발 환경 세팅", href: "#env" },
            { num: "03", title: "Git 기본 개념", href: "#git" },
            { num: "04", title: "GitHub 첫 Push", href: "#github" },
          ]}
        />

        {/* ═══════ SECTION 1: 웹 서비스 ═══════ */}
        <SectionTitle num="01" title="웹 서비스 이해하기" id="web" />

        <p className="text-[var(--text-sub)] mb-8 text-lg">
          브라우저에 주소를 입력하면 어떤 일이 벌어질까요?
        </p>

        {/* Request Flow */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {[
            { label: "사용자", desc: "브라우저에 주소 입력", icon: "🧑‍💻" },
            { label: "프론트엔드", desc: "화면을 보여줌", icon: "🖥️" },
            { label: "백엔드", desc: "데이터를 처리", icon: "⚙️" },
            { label: "데이터베이스", desc: "데이터를 저장/조회", icon: "🗄️" },
          ].map((item, i) => (
            <div key={item.label} className="flex-1 flex flex-col items-center">
              <Card className="w-full text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-[var(--accent)] mb-1">{item.label}</h3>
                <p className="text-sm text-[var(--text-sub)]">{item.desc}</p>
              </Card>
              {i < 3 && (
                <div className="hidden md:block text-[var(--accent)] text-2xl mt-2">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Restaurant Metaphor */}
        <h3 className="text-xl font-bold mb-4">식당에 비유하면?</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            {
              role: "프론트엔드",
              metaphor: "식당의 홀",
              desc: "손님이 보는 메뉴판, 인테리어, 주문 화면",
              tech: "Next.js",
              color: "border-t-[var(--accent)]",
            },
            {
              role: "백엔드",
              metaphor: "식당의 주방",
              desc: "주문을 받아 요리를 만드는 곳",
              tech: "Nest.js",
              color: "border-t-emerald-500",
            },
            {
              role: "데이터베이스",
              metaphor: "냉장고",
              desc: "재료(데이터)를 보관하는 곳",
              tech: "PostgreSQL",
              color: "border-t-amber-500",
            },
          ].map((r) => (
            <Card key={r.role} className={`border-t-2 ${r.color}`}>
              <h4 className="font-bold text-lg mb-1">{r.role}</h4>
              <p className="text-[var(--accent)] font-semibold text-sm mb-2">= {r.metaphor}</p>
              <p className="text-sm text-[var(--text-sub)] mb-3">{r.desc}</p>
              <span className="inline-block px-2.5 py-1 text-xs rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-muted)]">
                {r.tech}
              </span>
            </Card>
          ))}
        </div>

        <Callout type="info">이번 스터디에서 이 세 가지를 모두 직접 만들어봅니다!</Callout>

        {/* ═══════ SECTION 2: 개발 환경 ═══════ */}
        <SectionTitle num="02" title="개발 환경 세팅" id="env" />

        <Tabs
          tabs={["VS Code", "Node.js", "터미널 명령어"]}
          activeTab={envTab}
          onTabChange={setEnvTab}
        />

        {envTab === 0 && (
          <div>
            <p className="text-[var(--text-sub)] mb-4">
              Visual Studio Code는 개발자들이 가장 많이 사용하는 코드 편집기입니다. 무료이며,
              다양한 확장 기능을 제공합니다.
            </p>
            <Card className="mb-6">
              <h4 className="font-bold text-[var(--accent)] mb-3">다운로드</h4>
              <a
                href="https://code.visualstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-sm hover:border-[var(--accent)] transition-colors"
              >
                🔗 https://code.visualstudio.com
              </a>
            </Card>
            <h4 className="font-bold mb-3">설치 후 확인할 것</h4>
            <div className="space-y-3">
              <StepItem num={1} title="폴더 열기" desc="File → Open Folder로 프로젝트 폴더를 엽니다" />
              <StepItem num={2} title="터미널 열기" desc="Ctrl + ` (백틱)으로 내장 터미널을 엽니다" />
              <StepItem num={3} title="확장 프로그램" desc="왼쪽 사이드바에서 확장 프로그램 탭을 확인합니다" />
            </div>
          </div>
        )}

        {envTab === 1 && (
          <div>
            <p className="text-[var(--text-sub)] mb-4">
              다음 주부터 사용할 npm을 위해 Node.js를 미리 설치합니다.
            </p>
            <Card className="mb-6">
              <h4 className="font-bold text-[var(--accent)] mb-3">다운로드 (LTS 버전)</h4>
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-sm hover:border-[var(--accent)] transition-colors"
              >
                🔗 https://nodejs.org
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
            <p className="text-[var(--text-sub)] mb-4">
              VS Code에서{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--bg-code)] text-[var(--accent)] text-sm">
                Ctrl + `
              </code>{" "}
              을 눌러 터미널을 열어보세요.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--accent)] text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">명령어</th>
                    <th className="px-4 py-3 text-left">설명</th>
                    <th className="px-4 py-3 text-left rounded-tr-lg">예시</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cmd: "cd 폴더이름", desc: "해당 폴더로 이동", ex: "cd my-project" },
                    { cmd: "cd ..", desc: "상위 폴더로 이동", ex: "cd .." },
                    { cmd: "ls / dir", desc: "현재 폴더 파일 목록 확인", ex: "ls (Mac) / dir (Win)" },
                    { cmd: "mkdir 이름", desc: "새 폴더 만들기", ex: "mkdir my-project" },
                    { cmd: "pwd", desc: "현재 위치 확인", ex: "pwd" },
                  ].map((c, i) => (
                    <tr
                      key={c.cmd}
                      className={i % 2 === 0 ? "bg-[var(--bg-card)]" : "bg-[var(--bg-primary)]"}
                    >
                      <td className="px-4 py-3 font-mono text-[var(--accent)]">{c.cmd}</td>
                      <td className="px-4 py-3 text-[var(--text-sub)]">{c.desc}</td>
                      <td className="px-4 py-3 font-mono text-[var(--text-muted)] text-xs">
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

        {/* ═══════ SECTION 3: Git ═══════ */}
        <SectionTitle num="03" title="Git 기본 개념" id="git" />

        {/* Why Git */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h4 className="font-bold text-lg mb-4">😵 이런 경험 있으시죠?</h4>
            <div className="space-y-2">
              {[
                "보고서_최종.docx",
                "보고서_최종_수정.docx",
                "보고서_진짜최종.docx",
                "보고서_진짜최종_v2.docx",
                "보고서_진짜최종_최종_FINAL.docx",
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 px-3 py-2 rounded bg-[var(--bg-primary)] font-mono text-sm text-[var(--text-muted)]"
                >
                  📄 {f}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h4 className="font-bold text-lg mb-4 text-[var(--accent)]">✨ Git이 해결합니다!</h4>
            <div className="space-y-4">
              {[
                { title: "버전 관리", desc: "모든 변경 이력을 자동으로 기록" },
                { title: "되돌리기", desc: "언제든 이전 버전으로 복원 가능" },
                { title: "협업", desc: "여러 사람이 동시에 작업 가능" },
              ].map((s) => (
                <div key={s.title} className="flex gap-3">
                  <span className="text-[var(--accent)]">✓</span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm text-[var(--text-sub)]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Callout type="info">
          <strong>Git = 게임의 세이브 포인트.</strong> 언제든 원하는 시점으로 돌아갈 수 있습니다.
        </Callout>

        {/* Git Concepts Tabs */}
        <h3 className="text-xl font-bold mt-10 mb-4">핵심 개념 3가지</h3>
        <Tabs
          tabs={["Repository", "Commit", "Branch"]}
          activeTab={gitConceptTab}
          onTabChange={setGitConceptTab}
        />

        {gitConceptTab === 0 && (
          <div>
            <h4 className="text-lg font-bold text-[var(--accent)] mb-2">Repository (저장소)</h4>
            <p className="text-[var(--text-sub)] mb-4">
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
            <h4 className="text-lg font-bold text-[var(--accent)] mb-2">Commit (커밋)</h4>
            <p className="text-[var(--text-sub)] mb-4">
              변경사항을 저장하는 하나의 단위입니다. 각 커밋에는 메시지를 남겨 &apos;무엇을
              변경했는지&apos; 기록합니다.
            </p>
            {/* Timeline */}
            <div className="flex items-center gap-4 py-6 overflow-x-auto">
              {[
                { hash: "a1b2c3", msg: "프로젝트 생성", time: "3일 전" },
                { hash: "d4e5f6", msg: "메인 페이지 추가", time: "2일 전" },
                { hash: "g7h8i9", msg: "스타일 적용", time: "1일 전" },
                { hash: "j0k1l2", msg: "버그 수정", time: "오늘" },
              ].map((c, i) => (
                <div key={c.hash} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[120px]">
                    <div className="w-5 h-5 rounded-full bg-[var(--accent)]" />
                    <code className="text-xs text-[var(--accent)] mt-2">{c.hash}</code>
                    <p className="text-sm font-medium mt-1">{c.msg}</p>
                    <p className="text-xs text-[var(--text-muted)]">{c.time}</p>
                  </div>
                  {i < 3 && <div className="w-12 h-0.5 bg-[var(--accent)] mx-2" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {gitConceptTab === 2 && (
          <div>
            <h4 className="text-lg font-bold text-[var(--accent)] mb-2">Branch (브랜치)</h4>
            <p className="text-[var(--text-sub)] mb-4">
              독립적인 작업 공간을 만들어 서로 영향 없이 개발할 수 있습니다. 평행 우주에서 따로
              작업하는 것과 같습니다.
            </p>
            {/* Branch diagram */}
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

        {/* Git Install */}
        <h3 className="text-xl font-bold mt-10 mb-4">Git 설치 및 초기 설정</h3>
        <Card className="mb-4">
          <h4 className="font-bold text-[var(--accent)] mb-3">다운로드</h4>
          <a
            href="https://git-scm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-sm hover:border-[var(--accent)] transition-colors"
          >
            🔗 https://git-scm.com
          </a>
        </Card>
        <CodeBlock title="초기 설정">{`$ git config --global user.name "홍길동"
$ git config --global user.email "hong@email.com"

# 설정 확인
$ git config --list`}</CodeBlock>
        <Callout type="tip">
          <code className="text-[var(--accent)]">--global</code> 옵션은 이 컴퓨터의 모든
          프로젝트에 동일하게 적용됩니다.
        </Callout>

        {/* ═══════ SECTION 4: GitHub ═══════ */}
        <SectionTitle num="04" title="GitHub 첫 Push" id="github" />

        {/* Git vs GitHub */}
        <h3 className="text-xl font-bold mb-4">Git vs GitHub</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="border-t-2 border-t-[var(--accent)]">
            <h4 className="text-2xl font-bold mb-2">Git</h4>
            <p className="text-[var(--text-sub)]">
              내 컴퓨터에서 버전을 관리하는 <strong className="text-white">도구</strong>
            </p>
          </Card>
          <Card className="border-t-2 border-t-emerald-500">
            <h4 className="text-2xl font-bold mb-2">GitHub</h4>
            <p className="text-[var(--text-sub)]">
              온라인에 코드를 올리고 공유하는 <strong className="text-white">서비스</strong>
            </p>
          </Card>
        </div>

        {/* Repo Creation */}
        <h3 className="text-xl font-bold mb-4">GitHub 레포지토리 생성</h3>
        <Card className="mb-8">
          <div className="space-y-4">
            <StepItem num={1} title="github.com에 접속 & 로그인" />
            <StepItem num={2} title="오른쪽 상단 '+' 버튼 → New repository" />
            <StepItem num={3} title="Repository name 입력" desc="예: my-first-repo" />
            <StepItem num={4} title="Public 선택" />
            <StepItem num={5} title="Create repository 클릭" />
          </div>
        </Card>

        {/* First Push */}
        <h3 className="text-xl font-bold mb-4">실습: 첫 번째 Push!</h3>
        <div className="space-y-3 mb-8">
          {[
            { cmd: "mkdir my-first-repo", desc: "프로젝트 폴더 생성" },
            { cmd: "cd my-first-repo", desc: "폴더로 이동" },
            { cmd: "git init", desc: "Git 저장소 초기화" },
            { cmd: 'echo "# My First Repo" > README.md', desc: "README 파일 생성" },
            { cmd: "git add README.md", desc: "변경사항 스테이징" },
            { cmd: 'git commit -m "first commit"', desc: "커밋 생성" },
            { cmd: "git remote add origin <URL>", desc: "원격 저장소 연결" },
            { cmd: "git push -u origin main", desc: "GitHub에 Push!" },
          ].map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                i % 2 === 0 ? "bg-[var(--bg-card)]" : "bg-[var(--bg-primary)]"
              } border border-[var(--border)]`}
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs font-bold text-white">
                {i + 1}
              </div>
              <code className="text-sm text-[var(--accent)] flex-1 font-mono">{s.cmd}</code>
              <span className="text-sm text-[var(--text-muted)] hidden md:block">{s.desc}</span>
            </div>
          ))}
        </div>

        {/* Git Workflow */}
        <h3 className="text-xl font-bold mb-4">Git 워크플로우</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {[
            { title: "Working Directory", sub: "작업 폴더" },
            { title: "Staging Area", sub: "준비 영역" },
            { title: "Repository", sub: "저장소 (Local)" },
          ].map((z, i) => (
            <Card key={z.title} className="text-center border-t-2 border-t-[var(--accent)]">
              <h4 className="font-bold">{z.title}</h4>
              <p className="text-sm text-[var(--text-muted)]">{z.sub}</p>
              {i < 2 && <div className="md:hidden text-[var(--accent)] text-lg mt-2">↓</div>}
            </Card>
          ))}
        </div>
        <div className="hidden md:flex justify-around mb-4 text-sm font-mono text-[var(--accent)]">
          <span>git add →</span>
          <span>git commit →</span>
        </div>
        <Card className="border-l-4 border-l-[var(--accent)]">
          <code className="text-[var(--accent)] font-bold">git push</code>
          <span className="text-[var(--text-sub)] ml-2">
            로컬 저장소의 커밋을 GitHub(원격 저장소)에 업로드합니다
          </span>
        </Card>

        {/* ═══════ SUMMARY ═══════ */}
        <div className="mt-16 mb-8 p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
          <h3 className="text-2xl font-bold mb-6">오늘 배운 것</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {[
              "웹 서비스의 구조 (프론트/백엔드/DB)",
              "VS Code와 Node.js 설치",
              "터미널 기본 명령어",
              "Git의 필요성과 핵심 개념",
              "Git 설치 및 초기 설정",
              "GitHub에 첫 Push 성공!",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-[var(--accent)]">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)]">
            <p className="text-xs font-bold text-[var(--accent)] tracking-widest mb-2">
              NEXT WEEK
            </p>
            <p className="text-xl font-bold mb-1">
              npm과 Next.js로 진짜 프로젝트를 시작합니다!
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              npm 기본 사용법 · Next.js 프로젝트 생성 · 기본 페이지 &amp; 라우팅
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-12 text-sm text-[var(--text-muted)] border-t border-[var(--border)]">
          <p>README.md 스터디 · Forif SW팀 · 2026-1</p>
        </footer>
      </main>
    </div>
  );
}
