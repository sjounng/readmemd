export interface WeekMeta {
  num: string;
  title: string;
  desc: string;
  available: boolean;
  tags?: string[];
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
    title: "npm과 Next.js 시작하기",
    desc: "npm 사용법 / Next.js 프로젝트 생성 / 페이지 & 라우팅",
    available: true,
    tags: ["npm", "Next.js"],
  },
  { num: "03", title: "Coming soon", desc: "", available: false },
  { num: "04", title: "Coming soon", desc: "", available: false },
  { num: "05", title: "Coming soon", desc: "", available: false },
  { num: "06", title: "Coming soon", desc: "", available: false },
  { num: "07", title: "Coming soon", desc: "", available: false },
  { num: "08", title: "Coming soon", desc: "", available: false },
];
