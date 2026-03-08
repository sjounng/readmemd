import Link from "next/link";
import { Tag } from "@/components";
import { MENTOR_NAME, MAIN_TAGS } from "@/constants/site";
import { weeks } from "@/constants/weeks";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Hero */}
      <main className="relative z-10 flex flex-col px-8 md:px-16 pt-28 md:pt-32">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none mb-4">
          README<span className="text-(--accent)">.</span>md
        </h1>

        <p className="text-sm font-bold text-(--text-sub) mb-2">
          {MENTOR_NAME}
        </p>

        <span className="text-(--text-muted) text-lg mb-8">▼</span>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-16">
          {MAIN_TAGS.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* Week cards / Table of Contents */}
        <section className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-(--accent) rounded-full" />
            <h2 className="text-3xl md:text-4xl font-extrabold">목차</h2>
          </div>

          <div className="space-y-4 max-h-120 overflow-y-auto py-2 pr-2">
            {weeks.map((week) => (
              <div key={week.num} className="group">
                {week.available ? (
                  <Link
                    href={`/week/${parseInt(week.num)}`}
                    className="flex items-center gap-6 p-5 rounded-xl bg-(--bg-card) border border-(--border) card-hover"
                  >
                    <span className="text-3xl md:text-4xl font-extrabold text-(--accent) font-mono min-w-15">
                      {week.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{week.title}</h3>
                      <p className="text-sm text-(--text-muted)">
                        {week.desc}
                      </p>
                      {week.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {week.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs rounded-full border border-(--border) text-(--text-muted)">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-(--text-muted) group-hover:text-(--accent) transition-colors text-xl">
                      →
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-6 p-5 rounded-xl bg-(--bg-card) border border-(--border) opacity-40 cursor-not-allowed">
                    <span className="text-3xl md:text-4xl font-extrabold text-(--text-muted) font-mono min-w-15">
                      {week.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{week.title}</h3>
                      {week.desc && (
                        <p className="text-sm text-(--text-muted)">
                          {week.desc}
                        </p>
                      )}
                      {week.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {week.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs rounded-full border border-(--border) text-(--text-muted)">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Divider between items */}
                <div className="mt-4 h-px bg-(--border)" />
              </div>
            ))}
          </div>
        </section>
      </main>


    </div>
  );
}
