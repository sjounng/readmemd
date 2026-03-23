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
  { num: "04", title: "Coming soon", desc: "", available: false },
  { num: "05", title: "Coming soon", desc: "", available: false },
  { num: "06", title: "Coming soon", desc: "", available: false },
  { num: "07", title: "Coming soon", desc: "", available: false },
  { num: "08", title: "Coming soon", desc: "", available: false },
];
