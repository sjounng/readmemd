/* ── Week 6 콘텐츠 데이터 ── */

export const WEEK6_TAGS = ["Backend", "API", "REST", "NestJS", "TypeScript"];

export const WEEK6_TOC = [
  { num: "01", title: "백엔드란?", href: "#what-is-backend" },
  { num: "02", title: "API & REST API", href: "#rest-api" },
  { num: "03", title: "Controller & Service", href: "#controller-service" },
  { num: "04", title: "프로젝트 실습", href: "#practice" },
];

/* ══════════════════════════════════════════
   Section 1: 백엔드란?
   ══════════════════════════════════════════ */

export const BACKEND_ROLE = {
  title: "백엔드는 웹의 무대 뒤편입니다",
  desc: "사용자에게 보이는 화면을 움직이는 데이터와 로직을 담당합니다. 로그인 정보를 확인하고, 게시글을 저장하고, 검색 결과를 돌려주는 것이 모두 백엔드의 역할입니다.",
};

export const FRONTEND_BACKEND_ANALOGY = {
  title: "식당에 비유하면",
  rows: [
    { part: "프론트엔드", analogy: "홀 (메뉴판, 테이블, 서빙)", role: "사용자가 보고 조작하는 화면" },
    { part: "백엔드", analogy: "주방 (조리, 재고, 레시피)", role: "데이터 처리, 저장, 비즈니스 로직" },
    { part: "데이터베이스", analogy: "창고 (재료 보관)", role: "데이터를 영구적으로 저장" },
  ],
};

export const BACKEND_RESPONSIBILITIES = [
  {
    title: "데이터 저장 & 조회",
    desc: "사용자가 작성한 게시글, 프로필, 설정 등을 데이터베이스에 저장하고 다시 불러옵니다.",
    icon: "database",
  },
  {
    title: "비즈니스 로직",
    desc: "\"같은 시간대에 수업이 겹치면 등록할 수 없다\"같은 규칙을 코드로 구현합니다.",
    icon: "cpu",
  },
  {
    title: "인증 & 보안",
    desc: "로그인한 사람이 누구인지 확인하고, 자신의 데이터에만 접근할 수 있도록 제어합니다.",
    icon: "shield",
  },
  {
    title: "API 제공",
    desc: "프론트엔드가 필요한 데이터를 요청할 수 있는 창구(API)를 만들어 제공합니다.",
    icon: "plug",
  },
];

export const TECH_STACK_COMPARISON = [
  { aspect: "언어", frontend: "JavaScript / TypeScript", backend: "TypeScript (Node.js), Python, Java, Go..." },
  { aspect: "대표 프레임워크", frontend: "Next.js, React", backend: "NestJS, Express, FastAPI, Spring" },
  { aspect: "실행 환경", frontend: "브라우저", backend: "서버 (Node.js 프로세스)" },
  { aspect: "데이터", frontend: "화면에 표시, 상태 관리", backend: "DB에서 읽고 쓰기" },
  { aspect: "이번 수업", frontend: "완성 (Mock 데이터)", backend: "NestJS로 시작" },
];

/* ══════════════════════════════════════════
   Section 2: API & REST API
   ══════════════════════════════════════════ */

export const CRUD_CONCEPT = {
  title: "CRUD란?",
  desc: "거의 모든 웹 서비스의 핵심 동작 4가지입니다. 게시판, 쇼핑몰, SNS — 다 결국 데이터를 만들고, 읽고, 수정하고, 삭제합니다.",
};

export const CRUD_OPERATIONS = [
  {
    letter: "C",
    name: "Create",
    korean: "생성",
    method: "POST",
    methodColor: "green",
    example: "새 게시글 작성, 회원가입, 주문 생성",
    endpoint: "POST /posts",
  },
  {
    letter: "R",
    name: "Read",
    korean: "조회",
    method: "GET",
    methodColor: "blue",
    example: "게시글 목록 보기, 상세 페이지, 프로필 조회",
    endpoint: "GET /posts  또는  GET /posts/1",
  },
  {
    letter: "U",
    name: "Update",
    korean: "수정",
    method: "PATCH",
    methodColor: "yellow",
    example: "게시글 수정, 프로필 변경, 수량 변경",
    endpoint: "PATCH /posts/1",
  },
  {
    letter: "D",
    name: "Delete",
    korean: "삭제",
    method: "DELETE",
    methodColor: "red",
    example: "게시글 삭제, 댓글 삭제, 계정 탈퇴",
    endpoint: "DELETE /posts/1",
  },
];

export const ENDPOINT_CONCEPT = {
  title: "엔드포인트란?",
  desc: "클라이언트가 서버에 요청을 보낼 수 있는 URL 주소입니다. HTTP 메서드 + URL 경로의 조합으로 하나의 엔드포인트가 됩니다. 같은 /posts 경로라도 메서드가 다르면 다른 엔드포인트입니다.",
};

export const ENDPOINT_EXAMPLES = [
  { method: "GET",    color: "blue",   path: "/posts",      desc: "게시글 전체 목록 조회" },
  { method: "GET",    color: "blue",   path: "/posts/1",    desc: "1번 게시글 단건 조회" },
  { method: "POST",   color: "green",  path: "/posts",      desc: "새 게시글 생성" },
  { method: "PATCH",  color: "yellow", path: "/posts/1",    desc: "1번 게시글 수정" },
  { method: "DELETE", color: "red",    path: "/posts/1",    desc: "1번 게시글 삭제" },
];

export const ENDPOINT_ANATOMY = {
  full: "https://api.example.com/posts/1?sort=latest",
  parts: [
    { segment: "https://api.example.com", label: "Base URL", desc: "서버 주소 (도메인)" },
    { segment: "/posts", label: "리소스 경로", desc: "어떤 자원인지 (명사)" },
    { segment: "/1", label: "Path Parameter", desc: "특정 항목 식별자 (:id)" },
    { segment: "?sort=latest", label: "Query String", desc: "정렬, 필터 등 옵션" },
  ],
};

export const API_CONCEPT = {
  title: "API란?",
  desc: "Application Programming Interface. 두 시스템이 서로 대화하는 방법을 정의한 약속입니다. 프론트엔드가 \"유저 목록 줘\"라고 요청하면 백엔드가 JSON으로 응답하는 것이 API 통신입니다.",
};

export const API_ANALOGY = {
  title: "자판기로 이해하는 API",
  steps: [
    { role: "사용자 (프론트엔드)", action: "버튼 번호를 누름 → 정해진 방법으로 요청을 보냄", icon: "user" },
    { role: "API (인터페이스 약속)", action: "어떤 버튼을 누르면 어떤 음료가 나올지 미리 정의된 규칙", icon: "file" },
    { role: "자판기 내부 (백엔드)", action: "재고 확인 후 음료 배출. 내부 동작은 사용자가 알 필요 없음", icon: "server" },
  ],
};

export const HTTP_METHODS = [
  {
    method: "GET",
    color: "blue",
    meaning: "조회",
    desc: "데이터를 가져올 때 사용합니다. 서버의 상태를 변경하지 않습니다.",
    example: "GET /items → 아이템 목록 가져오기",
  },
  {
    method: "POST",
    color: "green",
    meaning: "생성",
    desc: "새 데이터를 만들 때 사용합니다. 요청 body에 생성할 데이터를 담습니다.",
    example: "POST /items → 새 아이템 만들기",
  },
  {
    method: "PATCH",
    color: "yellow",
    meaning: "수정",
    desc: "기존 데이터의 일부를 수정할 때 사용합니다.",
    example: "PATCH /items/1 → 1번 아이템 수정",
  },
  {
    method: "DELETE",
    color: "red",
    meaning: "삭제",
    desc: "데이터를 삭제할 때 사용합니다.",
    example: "DELETE /items/1 → 1번 아이템 삭제",
  },
];

export const HTTP_STATUS_CODES = [
  { code: "200", label: "OK", desc: "요청 성공", color: "green" },
  { code: "201", label: "Created", desc: "생성 성공 (POST 응답)", color: "green" },
  { code: "400", label: "Bad Request", desc: "잘못된 요청 (형식 오류 등)", color: "yellow" },
  { code: "401", label: "Unauthorized", desc: "인증 필요 (로그인 안 됨)", color: "yellow" },
  { code: "403", label: "Forbidden", desc: "권한 없음 (다른 사람 데이터)", color: "yellow" },
  { code: "404", label: "Not Found", desc: "해당 리소스 없음", color: "yellow" },
  { code: "500", label: "Internal Server Error", desc: "서버 내부 오류", color: "red" },
];

export const REST_CONCEPT = {
  title: "REST란?",
  desc: "Representational State Transfer. 웹 API를 어떻게 설계할지에 대한 아키텍처 스타일(약속)입니다. HTTP를 잘 활용하는 방법론이라고 생각하면 됩니다. REST 원칙을 잘 따른 API를 RESTful API라고 부릅니다.",
};

export const REST_VS_RESTFUL = [
  {
    term: "REST",
    desc: "Roy Fielding이 2000년 박사 논문에서 제안한 API 설계 원칙들의 집합",
    analogy: "교통 법규 전체",
  },
  {
    term: "RESTful",
    desc: "REST 원칙을 잘 지킨 API. '이 API는 RESTful하게 설계되었다'처럼 형용사로 사용",
    analogy: "교통 법규를 잘 지키는 운전자",
  },
  {
    term: "REST API",
    desc: "REST 원칙을 따라 만든 HTTP API. 대부분의 웹 서비스가 이 방식을 채택",
    analogy: "교통 법규에 맞게 설계된 도로",
  },
];

export const REST_CORE_IDEAS = [
  {
    idea: "자원(Resource) 중심",
    desc: "모든 것을 자원으로 표현합니다. 사용자, 게시글, 댓글 등이 모두 자원이고 URL로 식별됩니다.",
    example: "/users/1, /posts/42, /posts/42/comments",
  },
  {
    idea: "행위는 HTTP 메서드로",
    desc: "무엇을 할지(조회/생성/수정/삭제)는 URL이 아닌 HTTP 메서드(GET/POST/PATCH/DELETE)로 표현합니다.",
    example: "GET /posts (조회) vs DELETE /posts/1 (삭제)",
  },
  {
    idea: "무상태(Stateless)",
    desc: "서버는 요청 간 클라이언트 상태를 저장하지 않습니다. 요청 하나에 필요한 정보가 모두 담겨야 합니다.",
    example: "매 요청마다 Authorization 토큰을 함께 보내는 것",
  },
];

export const REST_PRINCIPLES = [
  {
    title: "URL은 자원(명사)을 나타낸다",
    bad: "GET /getUsers",
    good: "GET /users",
    reason: "동사는 HTTP 메서드가 이미 표현하므로, URL에는 명사만 씁니다.",
  },
  {
    title: "HTTP 메서드로 행위를 표현한다",
    bad: "POST /deleteUser/1",
    good: "DELETE /users/1",
    reason: "메서드(GET/POST/PATCH/DELETE)가 행위를 담당합니다.",
  },
  {
    title: "복수형 명사를 사용한다",
    bad: "GET /user",
    good: "GET /users",
    reason: "목록을 나타낼 때는 복수형이 관례입니다.",
  },
  {
    title: "계층 구조는 /로 표현한다",
    bad: "GET /getUserPosts?userId=1",
    good: "GET /users/1/posts",
    reason: "중첩된 자원은 경로로 표현합니다.",
  },
];

export const REQUEST_RESPONSE_EXAMPLE = {
  request: `GET /users/1 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGci...`,
  response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "홍길동",
  "email": "hong@example.com"
}`,
};

/* ══════════════════════════════════════════
   Section 3: Nest.js 시작하기
   ══════════════════════════════════════════ */

export const NESTJS_INTRO = {
  title: "왜 NestJS인가?",
  desc: "NestJS는 TypeScript로 백엔드를 만드는 프레임워크입니다. Angular에서 영감을 받아 구조가 명확하고, 데코레이터(@) 문법으로 코드가 읽기 쉽습니다. 지금까지 Next.js로 프론트엔드를 만들었다면, NestJS로 백엔드를 만듭니다.",
};

export const NESTJS_VS_EXPRESS = [
  { aspect: "언어", nestjs: "TypeScript (기본)", express: "JavaScript (TypeScript 별도 설정)" },
  { aspect: "구조", nestjs: "Module / Controller / Service 계층 강제", express: "자유롭지만 구조 없음" },
  { aspect: "학습 곡선", nestjs: "초기 설정은 많지만 일관된 패턴", express: "시작은 쉽지만 대규모에서 혼돈" },
  { aspect: "실무 사용", nestjs: "대규모 팀, 엔터프라이즈", express: "소규모, 프로토타입" },
];

export const NESTJS_SETUP_STEPS = [
  {
    step: "1",
    title: "NestJS CLI 설치",
    desc: "전역으로 NestJS CLI를 설치합니다. Next.js의 create-next-app처럼 프로젝트 생성 도구입니다.",
    code: "$ npm install -g @nestjs/cli",
  },
  {
    step: "2",
    title: "프로젝트 생성",
    desc: "새 NestJS 프로젝트를 생성합니다. 패키지 매니저는 npm을 선택하세요.",
    code: "$ nest new my-backend-app",
  },
  {
    step: "3",
    title: "프로젝트 디렉토리로 이동",
    desc: "생성된 프로젝트 폴더로 이동합니다.",
    code: "$ cd my-backend-app",
  },
  {
    step: "4",
    title: "개발 서버 실행",
    desc: "서버를 실행합니다. 기본적으로 3000번 포트에서 실행됩니다.",
    code: "$ npm run start:dev",
  },
  {
    step: "5",
    title: "브라우저에서 확인",
    desc: "브라우저에서 localhost:3000을 열면 'Hello World!'가 보이면 성공입니다.",
    code: "http://localhost:3000",
  },
];

export const NESTJS_FOLDER_STRUCTURE = `my-backend-app/
├── src/
│   ├── app.controller.ts   ← 요청을 받는 곳
│   ├── app.controller.spec.ts
│   ├── app.module.ts       ← 모듈 등록 (앱의 설계도)
│   ├── app.service.ts      ← 비즈니스 로직
│   └── main.ts             ← 서버 시작점
├── package.json
└── tsconfig.json`;

/* ══════════════════════════════════════════
   Section 4: Controller & Service 구조
   ══════════════════════════════════════════ */

export const ARCHITECTURE_OVERVIEW = {
  title: "요청이 처리되는 흐름",
  desc: "클라이언트의 HTTP 요청이 NestJS 서버에 들어오면 Controller → Service 순서로 처리됩니다. 각 계층이 맡은 역할만 합니다.",
};

export const LAYERS = [
  {
    name: "Client",
    role: "브라우저 / 앱",
    desc: "HTTP 요청을 보내고 응답을 받습니다.",
    color: "blue",
    arrow: true,
  },
  {
    name: "Controller",
    role: "요청 라우팅",
    desc: "어떤 URL 요청을 어떤 함수로 연결할지 결정합니다. 비즈니스 로직은 담지 않습니다.",
    color: "accent",
    arrow: true,
  },
  {
    name: "Service",
    role: "비즈니스 로직",
    desc: "실제 계산, 검증, 데이터 처리를 합니다. DB와 대화하는 것도 여기서 합니다.",
    color: "purple",
    arrow: true,
  },
  {
    name: "Database",
    role: "데이터 저장",
    desc: "데이터를 영구 저장합니다. (오늘은 메모리 배열로 대체합니다)",
    color: "green",
    arrow: false,
  },
];

export const CONTROLLER_EXPLANATION = {
  title: "Controller: 교통 정리 담당",
  desc: "Controller는 URL 패턴과 HTTP 메서드를 보고, 적절한 Service 함수를 호출합니다. 직접 데이터를 처리하지 않습니다.",
  code: `import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')  // 기본 경로: /items
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()              // GET /items
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')         // GET /items/1
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Post()             // POST /items
  create(@Body() createItemDto: { name: string }) {
    return this.itemsService.create(createItemDto);
  }
}`,
};

export const SERVICE_EXPLANATION = {
  title: "Service: 실제 일 처리 담당",
  desc: "Service는 비즈니스 로직을 담당합니다. 지금은 메모리 배열을 DB처럼 사용하지만, 나중에 실제 DB로 교체하면 됩니다.",
  code: `import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  private items = [
    { id: 1, name: '노트북' },
    { id: 2, name: '마우스' },
  ];

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    return this.items.find(item => item.id === id);
  }

  create(dto: { name: string }) {
    const newItem = { id: this.items.length + 1, name: dto.name };
    this.items.push(newItem);
    return newItem;
  }
}`,
};

export const MODULE_EXPLANATION = {
  title: "Module: 앱의 설계도",
  desc: "Module은 Controller와 Service를 하나로 묶어 NestJS에 등록합니다. 기능 단위로 모듈을 만들어 관리합니다.",
  code: `import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}`,
};

/* ══════════════════════════════════════════
   Section 5: 첫 API 만들기
   ══════════════════════════════════════════ */

export const BUILD_API_INTRO = {
  title: "이제 코드를 채워봅시다",
  desc: "04에서 generate로 파일 틀을 만들었습니다. 이제 실제 데이터 로직을 작성하고 API를 테스트해봅니다.",
};

export const GENERATE_RESOURCE_STEPS = [
  {
    step: "1",
    title: "Resource 생성",
    desc: "nest generate resource 명령으로 CRUD에 필요한 파일을 한 번에 생성합니다. 물음표가 나오면 REST API → Yes로 답하세요.",
    code: `$ nest generate resource items
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes`,
  },
  {
    step: "2",
    title: "생성된 파일 열어보기",
    desc: "items 폴더 안에 파일이 자동으로 만들어졌습니다. Controller와 Service 코드가 어떻게 생겼는지 살펴보겠습니다.",
    code: `src/items/
├── dto/
│   ├── create-item.dto.ts
│   └── update-item.dto.ts
├── items.controller.ts   ← 라우팅 담당
├── items.module.ts
└── items.service.ts      ← 로직 담당`,
  },
];

export const CLI_GENERATE_STEPS = [
  {
    step: "1",
    title: "DTO 작성",
    desc: "DTO(Data Transfer Object)는 요청 body의 형태를 정의합니다. create-item.dto.ts를 열어서 아래처럼 작성하세요.",
    code: `// src/items/dto/create-item.dto.ts
export class CreateItemDto {
  name: string;
  price: number;
}`,
  },
  {
    step: "2",
    title: "Service 로직 작성",
    desc: "메모리 배열을 DB 대신 사용해서 CRUD를 구현합니다. items.service.ts를 아래처럼 수정하세요.",
    code: `// src/items/items.service.ts
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  private items = [
    { id: 1, name: '노트북', price: 1200000 },
    { id: 2, name: '마우스', price: 30000 },
  ];

  findAll() {
    return this.items;
  }

  findOne(id: number) {
    return this.items.find(item => item.id === id);
  }

  create(dto: CreateItemDto) {
    const newItem = { id: Date.now(), ...dto };
    this.items.push(newItem);
    return newItem;
  }

  remove(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    return { deleted: true };
  }
}`,
  },
];

export const API_TEST_METHODS = [
  {
    tool: "브라우저 주소창",
    desc: "GET 요청만 가능합니다. localhost:3000/items를 입력하면 JSON이 바로 보입니다.",
    good: "설치 없이 바로 사용 가능",
    limit: "GET만 가능, POST/DELETE 불가",
    recommended: false,
  },
  {
    tool: "Thunder Client (VS Code 확장)",
    desc: "VS Code 안에서 API를 테스트할 수 있는 확장 프로그램입니다. Postman과 유사하지만 에디터 안에 있어서 편합니다.",
    good: "VS Code에서 바로 사용, 무료",
    limit: "VS Code 필요",
    recommended: true,
  },
  {
    tool: "Postman",
    desc: "API 테스트의 표준 도구입니다. 요청을 저장하고 팀과 공유할 수 있습니다.",
    good: "기능이 풍부하고 협업 가능",
    limit: "별도 앱 설치 필요",
    recommended: false,
  },
  {
    tool: "curl (터미널)",
    desc: "터미널에서 직접 HTTP 요청을 보냅니다. 스크립트 자동화에 유용합니다.",
    good: "가장 빠르고 스크립트 자동화 가능",
    limit: "명령어 문법을 알아야 함",
    recommended: false,
  },
];

export const API_TEST_EXAMPLES = [
  {
    label: "GET /items — 전체 조회",
    method: "GET",
    url: "http://localhost:3000/items",
    body: null,
    response: `[
  { "id": 1, "name": "노트북", "price": 1200000 },
  { "id": 2, "name": "마우스", "price": 30000 }
]`,
  },
  {
    label: "GET /items/1 — 단건 조회",
    method: "GET",
    url: "http://localhost:3000/items/1",
    body: null,
    response: `{ "id": 1, "name": "노트북", "price": 1200000 }`,
  },
  {
    label: "POST /items — 새 아이템 생성",
    method: "POST",
    url: "http://localhost:3000/items",
    body: `{
  "name": "키보드",
  "price": 150000
}`,
    response: `{
  "id": 1716364800000,
  "name": "키보드",
  "price": 150000
}`,
  },
  {
    label: "DELETE /items/1 — 삭제",
    method: "DELETE",
    url: "http://localhost:3000/items/1",
    body: null,
    response: `{ "deleted": true }`,
  },
];

export const CORS_EXPLANATION = {
  title: "프론트엔드와 연결하기 전에: CORS",
  desc: "프론트엔드(localhost:3001)에서 백엔드(localhost:3000)로 요청하면 브라우저가 CORS 오류를 냅니다. main.ts에 CORS 설정을 추가하면 해결됩니다.",
  code: `// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // 프론트엔드 주소
  });

  await app.listen(3000);
}
bootstrap();`,
};

/* ══════════════════════════════════════════
   Section 5: 회원가입 & 로그인
   ══════════════════════════════════════════ */

export const AUTH_INTRO = {
  title: "오늘 만들 것",
  desc: "이메일과 비밀번호로 가입하고 로그인하는 API 두 개를 만듭니다. 데이터베이스 없이 메모리 배열로 구현해서 핵심 구조에 집중합니다.",
  endpoints: [
    { method: "POST", path: "/auth/signup", desc: "이메일, 비밀번호, 이름을 받아 유저를 저장" },
    { method: "POST", path: "/auth/login", desc: "이메일·비밀번호로 인증, 성공 시 유저 정보 반환" },
  ],
};

export const AUTH_GENERATE_STEP = {
  title: "auth 모듈 생성",
  desc: "nest generate resource 명령으로 auth 관련 파일을 한 번에 만듭니다. CRUD entry points는 No로 선택합니다.",
  code: `$ nest generate resource auth
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? No`,
};

export const AUTH_FILE_CONTENTS: Record<string, { filename: string; code: string; desc: string }> = {
  signupDto: {
    filename: "dto/signup.dto.ts",
    desc: "회원가입 요청의 body 형태를 정의합니다. 이메일, 비밀번호, 이름을 받습니다.",
    code: `export class SignupDto {
  email: string;
  password: string;
  name: string;
}`,
  },
  loginDto: {
    filename: "dto/login.dto.ts",
    desc: "로그인 요청의 body 형태를 정의합니다. 이메일과 비밀번호만 받습니다.",
    code: `export class LoginDto {
  email: string;
  password: string;
}`,
  },
  authService: {
    filename: "auth.service.ts",
    desc: "비즈니스 로직 담당. 메모리 배열에 유저를 저장하고, 이메일·비밀번호로 인증합니다.",
    code: `import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // 실제 DB 대신 메모리 배열 사용
  private users: Array<{
    id: number;
    email: string;
    password: string;
    name: string;
  }> = [];

  signup(dto: SignupDto) {
    const exists = this.users.find(
      (u) => u.email === dto.email
    );
    if (exists) {
      return {
        success: false,
        message: '이미 가입된 이메일입니다.',
      };
    }
    const newUser = { id: Date.now(), ...dto };
    this.users.push(newUser);
    return { success: true, userId: newUser.id };
  }

  login(dto: LoginDto) {
    const user = this.users.find(
      (u) =>
        u.email === dto.email &&
        u.password === dto.password
    );
    if (!user) {
      return {
        success: false,
        message: '이메일 또는 비밀번호가 틀렸습니다.',
      };
    }
    return {
      success: true,
      userId: user.id,
      name: user.name,
    };
  }
}`,
  },
  authController: {
    filename: "auth.controller.ts",
    desc: "라우팅 담당. /auth/signup과 /auth/login 두 엔드포인트를 정의합니다.",
    code: `import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')  // POST /auth/signup
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')   // POST /auth/login
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}`,
  },
  authModule: {
    filename: "auth.module.ts",
    desc: "Controller와 Service를 하나의 모듈로 묶어 NestJS에 등록합니다.",
    code: `import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}`,
  },
  appModule: {
    filename: "app.module.ts",
    desc: "AuthModule을 앱에 등록합니다. nest generate resource가 자동으로 추가해줍니다.",
    code: `import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}`,
  },
};

export const POSTMAN_TESTS = [
  {
    step: "1",
    title: "회원가입 (POST /auth/signup)",
    method: "POST",
    url: "http://localhost:3000/auth/signup",
    bodyType: "JSON",
    body: `{
  "email": "test@example.com",
  "password": "1234",
  "name": "홍길동"
}`,
    successResponse: `{
  "success": true,
  "userId": 1716364800000
}`,
    failResponse: `{
  "success": false,
  "message": "이미 가입된 이메일입니다."
}`,
  },
  {
    step: "2",
    title: "로그인 (POST /auth/login)",
    method: "POST",
    url: "http://localhost:3000/auth/login",
    bodyType: "JSON",
    body: `{
  "email": "test@example.com",
  "password": "1234"
}`,
    successResponse: `{
  "success": true,
  "userId": 1716364800000,
  "name": "홍길동"
}`,
    failResponse: `{
  "success": false,
  "message": "이메일 또는 비밀번호가 틀렸습니다."
}`,
  },
];

export const POSTMAN_SETUP_STEPS = [
  { step: "1", desc: "Postman을 열고 + 버튼으로 새 Request를 만듭니다." },
  { step: "2", desc: "메서드를 POST로 변경하고 URL을 입력합니다." },
  { step: "3", desc: "Body 탭 → raw → JSON을 선택하고 body를 입력합니다." },
  { step: "4", desc: "Send 버튼을 클릭하면 아래에 응답이 표시됩니다." },
];

/* ── Summary ── */

export const WEEK6_SUMMARY = [
  "백엔드는 데이터 저장, 비즈니스 로직, API 제공을 담당한다",
  "REST API는 URL(자원)과 HTTP 메서드(행위)를 조합해 인터페이스를 만든다",
  "NestJS는 Controller(라우팅) → Service(로직) 계층으로 관심사를 분리한다",
  "회원가입: POST /auth/signup — 이메일 중복 확인 후 배열에 저장",
  "로그인: POST /auth/login — 이메일·비밀번호 일치 시 유저 정보 반환",
];
