"use client";

import { useParams } from "next/navigation";
import Week1Content from "./weeks/Week1Content";

/* ── 주차별 콘텐츠 매핑 ── */
const weekContentMap: Record<string, React.ComponentType> = {
  "1": Week1Content,
  // "2": Week2Content, ← 주차 추가 시 여기에 등록
  // "3": Week3Content,
};

export default function WeekPage() {
  const params = useParams();
  const weekId = params.id as string;

  const Content = weekContentMap[weekId];

  if (!Content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-[var(--accent)] mb-4">404</h1>
          <p className="text-xl text-[var(--text-sub)]">
            {weekId}주차 콘텐츠가 아직 준비되지 않았습니다.
          </p>
          <a
            href="/"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  return <Content />;
}
