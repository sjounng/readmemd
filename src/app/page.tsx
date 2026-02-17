import Link from "next/link";

const tags = ["2026-1", "For developers", "Frontend", "Git", "Github"];

const weeks = [
  {
    num: "01",
    title: "OT, 개발환경 세팅 및 Github",
    desc: "VS Code, Node.js 설치 / Git 기본 / GitHub 첫 Push",
    available: true,
  },
  {
    num: "02",
    title: "npm과 Next.js 시작하기",
    desc: "npm 사용법 / Next.js 프로젝트 생성 / 페이지 & 라우팅",
    available: false,
  },
  {
    num: "03",
    title: "Coming soon",
    desc: "",
    available: false,
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="bg-blob" style={{ top: "-200px", right: "-100px" }} />
      <div className="bg-blob" style={{ bottom: "-200px", left: "-200px" }} />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-8 md:px-16 py-6">
        <span className="text-sm font-extrabold tracking-widest text-white">
          FORIF
        </span>
        <span className="text-sm font-light text-[var(--text-muted)]">
          2026-03-??
        </span>
      </header>

      {/* Divider line */}
      <div className="relative z-10 h-px bg-[var(--border)]" />

      {/* Hero */}
      <main className="relative z-10 flex flex-col px-8 md:px-16 pt-16 md:pt-24">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none mb-4">
          Readme<span className="text-[var(--accent)]">.</span>md
        </h1>

        <p className="text-xl md:text-2xl font-bold text-white mb-2">
          OT, 개발환경 세팅 및 Github
        </p>

        <p className="text-sm font-bold text-[var(--text-sub)] mb-2">
          멘토 송준우
        </p>

        <span className="text-[var(--text-muted)] text-lg mb-8">▼</span>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-16">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-sm font-light text-white rounded-full border border-[var(--border)] bg-[var(--bg-card)]"
            >
              # {tag}
            </span>
          ))}
        </div>

        {/* Week cards / Table of Contents */}
        <section className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-[var(--accent)] rounded-full" />
            <h2 className="text-3xl md:text-4xl font-extrabold">목차</h2>
          </div>

          <div className="space-y-4">
            {weeks.map((week) => (
              <div key={week.num} className="group">
                {week.available ? (
                  <Link
                    href={`/week/${parseInt(week.num)}`}
                    className="flex items-center gap-6 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] card-hover"
                  >
                    <span className="text-3xl md:text-4xl font-extrabold text-[var(--accent)] font-mono min-w-[60px]">
                      {week.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{week.title}</h3>
                      <p className="text-sm text-[var(--text-muted)]">
                        {week.desc}
                      </p>
                    </div>
                    <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors text-xl">
                      →
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-6 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] opacity-40 cursor-not-allowed">
                    <span className="text-3xl md:text-4xl font-extrabold text-[var(--text-muted)] font-mono min-w-[60px]">
                      {week.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{week.title}</h3>
                      {week.desc && (
                        <p className="text-sm text-[var(--text-muted)]">
                          {week.desc}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {/* Divider between items */}
                <div className="mt-4 h-px bg-[var(--border)]" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 mt-16 text-sm text-[var(--text-muted)]">
        <p>README.md · FORIF SW팀 · 2026-1</p>
      </footer>
    </div>
  );
}
