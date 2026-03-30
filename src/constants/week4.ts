/* ── Week 4 콘텐츠 데이터 ── */

export const WEEK4_TAGS = ["Review", "Page Structure", "Roles"];

export const WEEK4_TOC = [
  { num: "01", title: "정의서 점검 & 피드백", href: "#review" },
  { num: "02", title: "페이지 구조 설계", href: "#pages" },
  { num: "03", title: "데이터 설계", href: "#data" },
  { num: "04", title: "역할 분담 & 협업", href: "#roles" },
];

/* ══════════════════════════════════════════
   Section 1: 정의서 점검 & 피드백
   ══════════════════════════════════════════ */

export const REQ_CHECKLIST = [
  { category: "프로젝트 개요", checks: [
    "프로젝트 목적이 \"누가 + 무엇을 + 왜\" 형태로 한 줄 정리되어 있는가?",
    "기술 스택과 선택 이유가 적혀 있는가?",
    "대상 사용자가 구체적으로 정의되어 있는가?",
  ]},
  { category: "기능 요구사항", checks: [
    "기능마다 ID(F-01, F-02...)가 붙어 있는가?",
    "P0이 3개 이하인가? (전부 P0이면 우선순위 의미 없음)",
    "각 기능에 사용자 시나리오(\"~하면 → ~된다\")가 있는가?",
    "한 기능이 너무 크지 않은가? (\"게시판\" → 목록/작성/수정/삭제로 쪼개기)",
  ]},
  { category: "페이지 구조", checks: [
    "사이트맵(URL 경로 트리)이 있는가?",
    "각 페이지에 필요한 컴포넌트가 적혀 있는가?",
    "기능 ID가 페이지에 매핑되어 있는가?",
  ]},
  { category: "데이터 모델", checks: [
    "주요 데이터의 interface(또는 구조)가 정의되어 있는가?",
    "각 필드의 타입과 용도가 명확한가?",
  ]},
];

/* ══════════════════════════════════════════
   Section 2: 페이지 구조 설계
   ══════════════════════════════════════════ */

export const SITEMAP_EXAMPLE_CODE = `/ (홈)
├── /login
├── /signup
├── /timetable
│   ├── /timetable/create      (시간표 생성)
│   ├── /timetable/[id]        (시간표 상세)
│   └── /timetable/[id]/edit   (시간표 수정)
├── /compare                    (공강 비교)
├── /profile                    (내 정보)
└── /share/[code]               (공유 링크)`;

export const PAGE_REQUIREMENTS_EXAMPLE = [
  { path: "/", name: "홈", components: "Hero, CTA, 기능 소개", auth: false, featureIds: "-" },
  { path: "/login", name: "로그인", components: "LoginForm", auth: false, featureIds: "-" },
  { path: "/timetable", name: "시간표 목록", components: "TimetableList", auth: true, featureIds: "F-02" },
  { path: "/timetable/create", name: "시간표 생성", components: "SubjectForm, Calendar", auth: true, featureIds: "F-01" },
  { path: "/timetable/[id]", name: "시간표 상세", components: "Calendar, ShareButton", auth: true, featureIds: "F-02, F-03" },
  { path: "/compare", name: "공강 비교", components: "CompareCalendar", auth: true, featureIds: "F-04" },
];

export const SITEMAP_TO_FOLDER_STEPS = [
  { step: "1", title: "사이트맵의 각 URL을 확인", desc: "/, /login, /timetable, /timetable/[id] 등" },
  { step: "2", title: "URL 경로를 그대로 폴더로 변환", desc: "/timetable/create → app/timetable/create/" },
  { step: "3", title: "각 폴더에 page.tsx 생성", desc: "app/timetable/create/page.tsx → 이 파일이 해당 페이지" },
  { step: "4", title: "동적 경로는 [param] 폴더로", desc: "/timetable/123 → app/timetable/[id]/page.tsx" },
];

export const FOLDER_STRUCTURE_CODE = `app/
├── layout.tsx            // 공통 레이아웃
├── page.tsx              // 홈 (/)
├── login/
│   └── page.tsx          // 로그인
├── timetable/
│   ├── page.tsx          // 시간표 목록
│   ├── create/
│   │   └── page.tsx      // 시간표 생성
│   └── [id]/
│       ├── page.tsx      // 시간표 상세
│       └── edit/
│           └── page.tsx  // 시간표 수정
├── compare/
│   └── page.tsx          // 공강 비교
└── profile/
    └── page.tsx          // 내 정보`;

export const NEXTJS_ROUTING_REMINDER = [
  { pattern: "app/page.tsx", route: "/", desc: "홈 페이지" },
  { pattern: "app/login/page.tsx", route: "/login", desc: "고정 경로" },
  { pattern: "app/timetable/[id]/page.tsx", route: "/timetable/123", desc: "동적 경로 (3주차 복습)" },
  { pattern: "app/timetable/create/page.tsx", route: "/timetable/create", desc: "중첩 경로" },
];

/* ══════════════════════════════════════════
   Section 3: 데이터 설계
   ══════════════════════════════════════════ */

export const DATA_DESIGN_CONCEPT = {
  title: "데이터 구조를 먼저 정하자",
  desc: "화면에 어떤 데이터가 필요한지 정의하고, TypeScript interface로 구조를 확정합니다. 구조가 정해지면 샘플 데이터를 만들어 화면 개발에 바로 사용할 수 있습니다.",
};

export const DATA_DESIGN_STEPS = [
  { step: "1", title: "데이터 모델 정의", desc: "TypeScript interface로 데이터 구조를 먼저 확정" },
  { step: "2", title: "샘플 데이터 작성", desc: "src/mocks/ 폴더에 화면 개발용 샘플 데이터 작성" },
  { step: "3", title: "컴포넌트에서 사용", desc: "샘플 데이터를 import해서 화면을 먼저 완성" },
];

export const DATA_MODEL_CODE = `// src/types/timetable.ts
// 요구사항정의서의 "주요 데이터 모델"을 여기에 옮기면 됩니다

export interface Subject {
  id: string;
  name: string;        // 과목명
  day: string;         // 요일 ("월" | "화" | ...)
  startTime: string;   // "09:00"
  endTime: string;     // "10:30"
  color: string;       // 표시 색상
}

export interface Timetable {
  id: string;
  title: string;       // "2026년 1학기"
  subjects: Subject[];
  createdAt: string;
  shareCode: string;   // 공유용 코드
}`;

export const MOCK_DATA_CODE = `// src/mocks/timetables.ts
// interface에 맞춰서 가짜 데이터를 배열로 작성

import { Timetable, Subject } from "@/types/timetable";

export const mockSubjects: Subject[] = [
  {
    id: "s1",
    name: "웹프로그래밍",
    day: "월",
    startTime: "09:00",
    endTime: "10:30",
    color: "#3B82F6",
  },
  {
    id: "s2",
    name: "자료구조",
    day: "화",
    startTime: "13:00",
    endTime: "14:30",
    color: "#8B5CF6",
  },
  {
    id: "s3",
    name: "데이터베이스",
    day: "수",
    startTime: "10:30",
    endTime: "12:00",
    color: "#EC4899",
  },
];

export const mockTimetables: Timetable[] = [
  {
    id: "tt1",
    title: "2026년 1학기",
    subjects: mockSubjects,
    createdAt: "2026-03-01",
    shareCode: "abc123",
  },
];`;

export const MOCK_USAGE_CODE = `// app/timetable/page.tsx
// Mock 데이터를 사용하는 시간표 목록 페이지

import Link from "next/link";
import { mockTimetables } from "@/mocks/timetables";

export default function TimetablePage() {
  const timetables = mockTimetables;

  return (
    <div>
      <h1>내 시간표</h1>
      {timetables.map((tt) => (
        <Link key={tt.id} href={\`/timetable/\${tt.id}\`}>
          <div className="border rounded-lg p-4 mb-3">
            <h2 className="font-bold">{tt.title}</h2>
            <p className="text-gray-500">
              {tt.subjects.length}개 과목
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}`;

export const DATA_FOLDER_STRUCTURE = `src/
├── types/              // 데이터 타입 정의
│   └── timetable.ts    // interface 정의
├── mocks/              // 샘플 데이터
│   ├── timetables.ts
│   └── users.ts
└── app/
    └── timetable/
        └── page.tsx    // 데이터를 import하여 사용`;

/* ══════════════════════════════════════════
   Section 4: 역할 분담 & 협업
   ══════════════════════════════════════════ */

export const ROLE_SPLIT_METHODS = [
  {
    method: "페이지 단위 분담",
    desc: "각자 담당 페이지를 맡아서 개발",
    pros: "충돌이 적고, 각자 독립적으로 진행 가능",
    cons: "페이지 간 공통 요소가 다르게 구현될 수 있음",
    best: "팀원 수와 페이지 수가 비슷할 때",
  },
  {
    method: "기능 단위 분담",
    desc: "기능 ID(F-01, F-02...) 기준으로 분담",
    pros: "기능별 책임이 명확",
    cons: "한 페이지에 여러 사람이 작업하면 충돌 가능",
    best: "한 페이지에 기능이 많을 때",
  },
  {
    method: "레이어 단위 분담",
    desc: "공통 컴포넌트 / 페이지 / 데이터(mock) 등 역할별로 분담",
    pros: "전체 코드 품질이 일관됨",
    cons: "서로 의존적이라 커뮤니케이션 많이 필요",
    best: "팀원 간 실력 차이가 있을 때",
  },
];

export const ROLE_EXAMPLE = [
  { name: "홍길동", role: "공통 셋업 + 메인 페이지", details: "layout.tsx, Header, Footer, 홈 페이지" },
  { name: "김철수", role: "시간표 CRUD", details: "/timetable, /timetable/create, /timetable/[id]" },
  { name: "이영희", role: "로그인 + 프로필", details: "/login, /signup, /profile, Mock 데이터 전체" },
];

export const ROLE_TIPS = [
  { title: "공통 컴포넌트는 한 명이 먼저", desc: "Header, Button 같은 공통 요소는 한 사람이 먼저 만들고 나머지가 가져다 쓰기" },
  { title: "기능 ID와 담당자를 연결", desc: "정의서의 F-01 → 홍길동, F-02 → 김철수 식으로 명확히 매핑" },
  { title: "페이지별 빈 파일 먼저 생성", desc: "담당자가 각자 맡은 페이지 폴더와 page.tsx를 먼저 만들어두면 구조가 잡힘" },
  { title: "매주 진행 상황 공유", desc: "누가 어디까지 했는지 간단히 공유하면 병목을 빨리 발견" },
];

export const BRANCH_STRATEGY_CODE = `# 브랜치 전략
main         ← 배포 가능한 안정 브랜치
  └── develop    ← 개발 통합 브랜치
        ├── feature/login         (담당: 이영희)
        ├── feature/timetable     (담당: 김철수)
        └── feature/home          (담당: 홍길동)

# 작업 흐름
1. develop에서 feature 브랜치 생성
   $ git checkout develop
   $ git checkout -b feature/login
2. 기능 개발 완료 후 PR 생성
3. 코드 리뷰 후 develop에 머지
4. 배포 시 develop → main 머지`;

export const COMMIT_CONVENTION = [
  { prefix: "feat:", desc: "새로운 기능 추가", example: "feat: 시간표 생성 폼 구현" },
  { prefix: "fix:", desc: "버그 수정", example: "fix: 시간 겹침 체크 오류 수정" },
  { prefix: "style:", desc: "코드 포맷팅, 스타일 변경", example: "style: TimetableCard 간격 조정" },
  { prefix: "refactor:", desc: "코드 리팩토링", example: "refactor: Calendar 컴포넌트 분리" },
  { prefix: "docs:", desc: "문서 수정", example: "docs: README 프로젝트 설명 추가" },
  { prefix: "chore:", desc: "빌드, 설정 변경", example: "chore: eslint 설정 업데이트" },
];

/* ── Summary ── */

export const WEEK4_SUMMARY = [
  "정의서의 기능·페이지·데이터 모델이 빠짐없이 정리되어 있어야 함",
  "사이트맵을 그리고 Next.js 폴더 구조로 1:1 변환",
  "데이터 구조(interface)를 먼저 정의하고 샘플 데이터로 화면 완성",
  "역할 분담은 페이지/기능/레이어 단위로, 브랜치 전략과 함께 정리",
];

export const NEXT_WEEK_PREVIEW = [
  { step: "1", title: "정의서 보완", desc: "오늘 피드백 받은 내용을 반영하여 정의서를 수정하세요" },
  { step: "2", title: "프로젝트 생성", desc: "create-next-app으로 프로젝트를 생성하고 GitHub에 Push" },
  { step: "3", title: "역할 분담", desc: "기능 ID와 담당자를 매핑하고 각자 담당 페이지를 정하세요" },
  { step: "4", title: "작업 시작", desc: "담당 페이지 폴더를 만들고 개발을 시작하세요" },
];
