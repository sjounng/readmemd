"use client";

import { WeekHero, SlidePresentation, Tag, Card, Callout } from "@/components";

const TAGS = ["Next.js", "tsconfig", "Import Alias"];

export default function Week2ExtraContent() {
  return (
    <SlidePresentation>
      {/* ── 제목 ── */}
      <div>
        <WeekHero
          weekNum={2}
          title="2주차"
          subtitle="추가 내용"
          description="프로젝트 설정 시 알아두면 좋은 추가 내용들을 정리했습니다."
        />
        <div className="flex flex-wrap gap-2 mt-8">
          {TAGS.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* ── Import Alias 설정 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">Import Alias (@/) 설정하기</h3>
        <Callout type="info" className="mb-6">
          <code>@/</code>를 사용하면 <code>../../../components</code> 같은 긴 상대 경로 대신
          <code> @/components</code>로 깔끔하게 import할 수 있습니다.
        </Callout>

        <Card className="mb-4">
          <p className="text-base md:text-2xl font-bold text-(--accent) mb-3">프로젝트 생성 시</p>
          <p className="text-sm md:text-xl text-(--text-sub) mb-3">
            <code>npx create-next-app</code> 실행 시 마지막 질문에서 설정할 수 있습니다.
          </p>
          <div className="bg-(--surface-hover) rounded-lg p-4 font-mono text-sm md:text-base">
            <p className="text-(--text-muted)">Would you like to customize the import alias?</p>
            <p className="text-(--accent) font-bold">→ Yes</p>
          </div>
        </Card>

        <Card>
          <p className="text-base md:text-2xl font-bold text-(--accent) mb-3">이미 만든 프로젝트에서</p>
          <p className="text-sm md:text-xl text-(--text-sub) mb-3">
            <code>tsconfig.json</code>에 <code>paths</code>를 추가하면 됩니다.
          </p>
          <div className="bg-(--surface-hover) rounded-lg p-4 font-mono text-sm md:text-base space-y-1">
            <p className="text-(--text-muted)">{"// tsconfig.json"}</p>
            <p>{"{"}</p>
            <p className="pl-4">{'"compilerOptions": {'}</p>
            <p className="pl-8 text-(--accent) font-bold">{'"paths": {'}</p>
            <p className="pl-12 text-(--accent) font-bold">{'"@/*": ["./src/*"]'}</p>
            <p className="pl-8 text-(--accent) font-bold">{"}"}</p>
            <p className="pl-4">{"}"}</p>
            <p>{"}"}</p>
          </div>
        </Card>
      </div>

      {/* ── 사용 비교 ── */}
      <div>
        <h3 className="text-xl md:text-5xl font-bold mb-6">사용 비교</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-t-2 border-t-red-500">
            <p className="text-base md:text-2xl font-bold text-red-400 mb-3">Alias 없이</p>
            <div className="bg-(--surface-hover) rounded-lg p-4 font-mono text-xs md:text-sm space-y-1">
              <p className="text-(--text-muted)">{"// 깊은 폴더에서 import할 때"}</p>
              <p>{"import Navbar from "}<span className="text-red-400">{'"../../../components/Navbar"'}</span></p>
              <p>{"import { posts } from "}<span className="text-red-400">{'"../../data/posts"'}</span></p>
            </div>
          </Card>
          <Card className="border-t-2 border-t-(--accent)">
            <p className="text-base md:text-2xl font-bold text-(--accent) mb-3">Alias 사용</p>
            <div className="bg-(--surface-hover) rounded-lg p-4 font-mono text-xs md:text-sm space-y-1">
              <p className="text-(--text-muted)">{"// 어디서든 동일한 경로"}</p>
              <p>{"import Navbar from "}<span className="text-(--accent)">{'"@/components/Navbar"'}</span></p>
              <p>{"import { posts } from "}<span className="text-(--accent)">{'"@/data/posts"'}</span></p>
            </div>
          </Card>
        </div>
      </div>
    </SlidePresentation>
  );
}
