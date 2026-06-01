export interface WeekExtra {
  label: string;
  href: string;
}

export interface WeekMeta {
  num: string;
  title: string;
  desc: string;
  available: boolean;
  tags?: string[];
  extras?: WeekExtra[];
}

export const weeks: WeekMeta[] = [
  {
    num: "01",
    title: "OT, 개발환경 세팅 및 Github",
    desc: "VS Code, Node.js 설치 / Git 기본 / GitHub 첫 Push",
    available: true,
    tags: ["VS Code", "Git", "GitHub"],
  },
  {
    num: "02",
    title: "Next.js 시작하기",
    desc: "Next.js를 위한 개념 / Next.js 프로젝트 생성 / 페이지 & 라우팅",
    available: true,
    tags: ["npm", "Next.js"],
    extras: [
      { label: "추가 내용", href: "/week/2-extra" },
    ],
  },
  {
    num: "03",
    title: "Next.js 코드 패턴 이해하기",
    desc: "Server/Client Component, 레이아웃, 리스트-상세, Fetching, 폼, 조건부 렌더링 패턴",
    available: true,
    tags: ["Next.js", "React", "Patterns"],
  },
  {
    num: "04",
    title: "프로젝트 시작하기",
    desc: "정의서 피드백, 기능 요구사항 다듬기, 페이지 구조 설계, Mock 데이터 전략, 프로젝트 세팅",
    available: true,
    tags: ["Review", "Planning", "Mock Data", "Project Setup"],
  },
  {
    num: "05",
    title: "프로젝트 협업 방법론",
    desc: "작업 분해, 배정 & 일정 관리, PR 기반 워크플로우, 문제 해결 방법론",
    available: true,
    tags: ["Task Breakdown", "Workflow", "Code Review", "Problem Solving"],
  },
  {
    num: "06",
    title: "백엔드 개발 입문",
    desc: "백엔드란? / API & REST API / Nest.js 프로젝트 생성 / Controller & Service / 첫 API 만들기 & 테스트",
    available: true,
    tags: ["Backend", "API", "REST", "NestJS"],
  },
  {
    num: "07",
    title: "실제 DB 연동 & JWT 인증",
    desc: "PostgreSQL로 데이터 영구 저장 / TypeORM Entity & Repository / bcrypt 암호화 / JWT 발급 & Guard",
    available: true,
    tags: ["PostgreSQL", "TypeORM", "bcrypt", "JWT"],
  },
  {
    num: "08",
    title: "프론트엔드 연동 실습",
    desc: "완성된 프론트엔드 클론 / API 명세 파악 / CORS 설정 / Todo API 구현 / 로컬 연동 테스트",
    available: true,
    tags: ["실습", "CORS", "Todo API", "Frontend Integration"],
  },
];
