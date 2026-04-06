"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Week1Content from "./weeks/Week1Content";
import Week2Content from "./weeks/Week2Content";
import Week2ExtraContent from "./weeks/Week2ExtraContent";
import Week3Content from "./weeks/Week3Content";
import Week4Content from "./weeks/Week4Content";
import Week5Content from "./weeks/Week5Content";

/* ── 주차별 콘텐츠 매핑 ── */
const weekContentMap: Record<string, React.ComponentType> = {
  "1": Week1Content,
  "2": Week2Content,
  "2-extra": Week2ExtraContent,
  "3": Week3Content,
  "4": Week4Content,
  "5": Week5Content,
};

export default function WeekPage() {
  const params = useParams();
  const weekId = params.id as string;

  const Content = weekContentMap[weekId];

  if (!Content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold text-(--accent) mb-4">404</h1>
          <p className="text-xl text-(--text-sub)">
            {weekId}주차 콘텐츠가 아직 준비되지 않았습니다.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-(--accent) text-white font-medium hover:opacity-90 transition-opacity"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return <Content />;
}
