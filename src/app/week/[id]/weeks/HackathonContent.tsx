"use client";

import { Card, Callout } from "@/components";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-6 bg-(--accent) rounded-full" />
      <h2 className="text-xl md:text-3xl font-extrabold">{children}</h2>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-(--border) last:border-0">
      <span className="text-sm text-(--text-muted) min-w-20 pt-0.5">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export default function HackathonContent() {
  return (
    <div className="px-4 md:px-16 max-w-4xl mx-auto pb-24">

      {/* Hero */}
      <section className="pt-28 pb-16">
        <div className="inline-block px-3 py-1 rounded-full border border-(--accent) text-(--accent) text-xs font-bold mb-6">
          EVENT
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-4">
          수업 종료 &
          <br />
          <span className="text-(--accent)">해커톤</span>
        </h1>
        <p className="text-lg text-(--text-sub) max-w-2xl">
          8주 동안 수고 많았습니다.
        </p>
      </section>

      {/* 일정 */}
      <section className="mb-16">
        <SectionTitle>해커톤 일정</SectionTitle>
        <Card>
          <div className="p-2">
            <InfoRow label="날짜" value="2025년 6월 21일 (토)" />
            <InfoRow label="시작" value="오전 9시" />
            <InfoRow label="장소" value="추후 안내" />
            <InfoRow label="형식" value="팀 프로젝트 (당일 발표)" />
          </div>
        </Card>
      </section>

      {/* 팀 구성 */}
      <section className="mb-16">
        <SectionTitle>팀 구성</SectionTitle>
        <Callout type="info">
          팀 구성 방식을 논의해봅시다. 아래는 논의할 항목들입니다.
        </Callout>
        <div className="mt-6 space-y-4">
          <Card>
            <div className="p-4">
              <h3 className="font-bold mb-1">팀 규모</h3>
              <p className="text-sm text-(--text-muted)">몇 명이 한 팀이 될지 함께 결정합니다.</p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="font-bold mb-1">팀 구성 방식</h3>
              <p className="text-sm text-(--text-muted)">자유 구성 / 랜덤 배정 / 역할 기반 배정 중 투표로 결정합니다.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* 준비사항 */}
      <section className="mb-16">
        <SectionTitle>준비사항</SectionTitle>
        <div className="space-y-3">
          {[
            "노트북 및 개발 환경 (VS Code, Node.js, Git)",
            "GitHub 계정 로그인 상태 확인",
            "만들고 싶은 서비스 아이디어 1~2개 (간단하게)",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-(--bg-card) border border-(--border)">
              <span className="text-(--accent) font-bold font-mono text-sm mt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 마무리 */}
      <section>
        <SectionTitle>마무리하며</SectionTitle>
        <Card>
          <div className="p-6 text-center">
            <p className="text-lg font-semibold mb-2">8주 동안 정말 수고하셨습니다.</p>
            <p className="text-sm text-(--text-muted) max-w-md mx-auto">
              처음 접하는 개념들을 빠르게 익히고 실제 프로젝트까지 진행한 경험은
              앞으로 개발을 공부하는 데 큰 자산이 될 것입니다.
            </p>
          </div>
        </Card>
      </section>

    </div>
  );
}
