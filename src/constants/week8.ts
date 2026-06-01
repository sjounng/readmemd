/* ── Week 8 콘텐츠 데이터 (실습) ── */

export const WEEK8_TAGS = ["실습", "NestJS", "CORS", "Todo API", "Frontend Integration"];

export const WEEK8_TOC = [
  { num: "01", title: "오늘의 목표", href: "#goal" },
  { num: "02", title: "프론트엔드 클론", href: "#clone" },
  { num: "03", title: "API 문서", href: "#apidocs" },
  { num: "04", title: "DB 설계", href: "#db" },
  { num: "05", title: "CORS 설정", href: "#cors" },
  { num: "06", title: "API 구현", href: "#practice" },
  { num: "07", title: "연동 테스트", href: "#test" },
];

/* ══════════════════════════════════════════
   Section 1: 오늘의 목표
   ══════════════════════════════════════════ */

export const WEEK8_OVERVIEW = {
  title: "오늘 뭘 만드나요?",
  desc: "완성된 Todo List 프론트엔드가 준비돼 있습니다. 이 프론트엔드가 필요로 하는 백엔드 API를 직접 구현하고, 로컬에서 두 서버를 동시에 실행해 연동을 확인합니다.",
};

export const WEEK8_GOALS = [
  {
    title: "프론트엔드 분석",
    desc: "프론트엔드 코드를 읽어 어떤 API를 호출하는지 파악합니다.",
    icon: "search",
  },
  {
    title: "CORS 해결",
    desc: "다른 포트에서 실행되는 프론트엔드가 백엔드에 접근할 수 있게 설정합니다.",
    icon: "link",
  },
  {
    title: "Todo API 구현",
    desc: "인증이 적용된 할 일 CRUD API를 NestJS로 구현합니다.",
    icon: "code",
  },
  {
    title: "로컬 연동 확인",
    desc: "프론트엔드에서 직접 회원가입·로그인·할 일 추가·삭제를 테스트합니다.",
    icon: "check",
  },
];

export const WEEK8_STACK = [
  { label: "Frontend", value: "Next.js (포트 3001)", color: "blue" },
  { label: "Backend", value: "NestJS (포트 3000)", color: "accent" },
  { label: "Database", value: "PostgreSQL", color: "green" },
];

/* ══════════════════════════════════════════
   Section 2: 프론트엔드 클론
   ══════════════════════════════════════════ */

export const FRONTEND_REPO_URL = "https://github.com/sjounng/week8-frontend.git";

export const FRONTEND_CLONE_STEPS = [
  {
    step: "1",
    title: "프론트엔드 클론",
    desc: "백엔드 프로젝트와 다른 폴더에 클론합니다.",
    code: `$ git clone https://github.com/sjounng/week8-frontend.git\n$ cd week8-frontend`,
  },
  {
    step: "2",
    title: "패키지 설치",
    desc: "",
    code: "$ npm install",
  },
  {
    step: "3",
    title: "프론트엔드 개발 서버 실행",
    desc: "포트 3001에서 실행됩니다.",
    code: "$ npm run dev",
  },
  {
    step: "4",
    title: "백엔드 서버도 함께 실행",
    desc: "7주차 백엔드 폴더에서 별도 터미널을 열어 실행합니다.",
    code: "$ npm run start:dev",
  },
];

export const TWO_SERVER_INFO = [
  {
    label: "프론트엔드",
    port: "3001",
    command: "npm run dev",
    path: "week8-frontend/",
    color: "blue",
  },
  {
    label: "백엔드",
    port: "3000",
    command: "npm run start:dev",
    path: "my-backend-app/",
    color: "accent",
  },
];

/* ══════════════════════════════════════════
   Section 3: API 문서
   ══════════════════════════════════════════ */

export interface ApiField {
  name: string;
  type: string;
  required: boolean;
  desc: string;
}

export interface ApiDoc {
  method: string;
  methodColor: string;
  path: string;
  auth: boolean;
  desc: string;
  request: { fields: ApiField[] } | null;
  response: string;
}

export const API_DOCS: ApiDoc[] = [
  {
    method: "POST",
    methodColor: "green",
    path: "/auth/signup",
    auth: false,
    desc: "회원가입",
    request: {
      fields: [
        { name: "email", type: "string", required: true, desc: "이메일 주소" },
        { name: "password", type: "string", required: true, desc: "비밀번호" },
        { name: "name", type: "string", required: true, desc: "이름" },
      ],
    },
    response: `{
  "success": true,
  "userId": 1
}`,
  },
  {
    method: "POST",
    methodColor: "green",
    path: "/auth/login",
    auth: false,
    desc: "로그인 — JWT 발급",
    request: {
      fields: [
        { name: "email", type: "string", required: true, desc: "이메일 주소" },
        { name: "password", type: "string", required: true, desc: "비밀번호" },
      ],
    },
    response: `{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`,
  },
  {
    method: "GET",
    methodColor: "blue",
    path: "/auth/me",
    auth: true,
    desc: "로그인한 유저 정보 조회",
    request: null,
    response: `{
  "id": 1,
  "email": "test@example.com",
  "name": "홍길동",
  "createdAt": "2025-06-01T00:00:00.000Z"
}`,
  },
  {
    method: "GET",
    methodColor: "blue",
    path: "/todos",
    auth: true,
    desc: "내 할 일 목록 조회 (최신순)",
    request: null,
    response: `[
  {
    "id": 1,
    "title": "백엔드 만들기",
    "done": false,
    "userId": 1,
    "createdAt": "2025-06-01T10:00:00.000Z"
  }
]`,
  },
  {
    method: "POST",
    methodColor: "green",
    path: "/todos",
    auth: true,
    desc: "할 일 생성",
    request: {
      fields: [
        { name: "title", type: "string", required: true, desc: "할 일 제목" },
      ],
    },
    response: `{
  "id": 2,
  "title": "백엔드 만들기",
  "done": false,
  "userId": 1,
  "createdAt": "2025-06-01T10:00:00.000Z"
}`,
  },
  {
    method: "PATCH",
    methodColor: "yellow",
    path: "/todos/:id",
    auth: true,
    desc: "할 일 수정",
    request: {
      fields: [
        { name: "title", type: "string", required: false, desc: "변경할 제목 (선택)" },
        { name: "done", type: "boolean", required: false, desc: "완료 여부 (선택)" },
      ],
    },
    response: `{
  "id": 1,
  "title": "백엔드 만들기",
  "done": true,
  "userId": 1,
  "createdAt": "2025-06-01T10:00:00.000Z"
}`,
  },
  {
    method: "DELETE",
    methodColor: "red",
    path: "/todos/:id",
    auth: true,
    desc: "할 일 삭제",
    request: null,
    response: `{
  "success": true
}`,
  },
];

/* ══════════════════════════════════════════
   Section 4: DB 설계
   ══════════════════════════════════════════ */

export const DB_DESIGN_INTRO = {
  title: "API 문서 → DB 설계",
  desc: "API가 주고받는 데이터 구조를 보면 어떤 테이블과 컬럼이 필요한지 도출할 수 있습니다. /todos 엔드포인트들을 보면서 직접 설계해 보세요.",
};

export const DB_DESIGN_STEPS = [
  {
    step: "1",
    title: "응답 구조 → 컬럼 도출",
    question: "GET /todos 응답에 포함된 필드들이 곧 DB에 저장해야 할 값입니다. 어떤 컬럼이 필요할까요?",
    snippet: `// GET /todos 응답 예시
[{
  "id": 1,           // → @PrimaryGeneratedColumn()
  "title": "...",    // → @Column()
  "done": false,     // → @Column({ default: false })
  "userId": 1,       // → @Column()
  "createdAt": "..." // → @CreateDateColumn()
}]`,
  },
  {
    step: "2",
    title: "요청 바디 → 서버가 채우는 값",
    question: "POST /todos 의 요청 바디는 title 하나뿐입니다. 나머지 done, userId, createdAt은 누가, 어떻게 채울까요?",
    snippet: `// 클라이언트가 보내는 것
{ "title": "백엔드 만들기" }

// 서버가 자동으로 채우는 것
done      ← false  (Entity 기본값)
userId    ← JWT 토큰에서 추출한 로그인 유저 id
createdAt ← @CreateDateColumn() 자동 기록`,
  },
  {
    step: "3",
    title: "보안 — 본인 것만 접근",
    question: "PATCH /todos/:id 에서 id만으로 찾으면 어떤 문제가 생길까요? 어떻게 방어해야 할까요?",
    snippet: `// 위험: id만 조건 — 다른 사람 데이터도 수정 가능
this.todoRepo.update({ id }, dto);

// 안전: userId도 함께 — 본인 것만 수정됨
this.todoRepo.update({ id, userId }, dto);`,
  },
];

export const API_ANALYSIS_INTRO = {
  title: "프론트엔드 코드에서 API를 찾는 법",
  desc: "fetch() 호출을 찾으면 백엔드가 구현해야 할 엔드포인트를 알 수 있습니다. URL, 메서드, 헤더, 요청 바디를 확인합니다.",
};

export const FRONTEND_CODE_SNIPPETS = [
  {
    label: "로그인",
    code: `// 로그인 요청
const res = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const { accessToken } = await res.json();`,
  },
  {
    label: "할 일 목록",
    code: `// 할 일 목록 조회 (토큰 필요)
const res = await fetch('http://localhost:3000/todos', {
  headers: {
    Authorization: \`Bearer \${token}\`,
  },
});
const todos = await res.json();`,
  },
  {
    label: "할 일 생성",
    code: `// 할 일 추가
const res = await fetch('http://localhost:3000/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: \`Bearer \${token}\`,
  },
  body: JSON.stringify({ title }),
});`,
  },
  {
    label: "완료 토글",
    code: `// 완료 상태 변경
const res = await fetch(\`http://localhost:3000/todos/\${id}\`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: \`Bearer \${token}\`,
  },
  body: JSON.stringify({ done: !todo.done }),
});`,
  },
  {
    label: "할 일 삭제",
    code: `// 할 일 삭제
const res = await fetch(\`http://localhost:3000/todos/\${id}\`, {
  method: 'DELETE',
  headers: { Authorization: \`Bearer \${token}\` },
});`,
  },
];

export const API_SPEC = [
  {
    method: "POST",
    methodColor: "green",
    path: "/auth/signup",
    auth: false,
    desc: "회원가입",
    status: "done",
  },
  {
    method: "POST",
    methodColor: "green",
    path: "/auth/login",
    auth: false,
    desc: "로그인, JWT 발급",
    status: "done",
  },
  {
    method: "GET",
    methodColor: "blue",
    path: "/auth/me",
    auth: true,
    desc: "내 정보 조회",
    status: "done",
  },
  {
    method: "GET",
    methodColor: "blue",
    path: "/todos",
    auth: true,
    desc: "할 일 목록 조회",
    status: "todo",
  },
  {
    method: "POST",
    methodColor: "green",
    path: "/todos",
    auth: true,
    desc: "할 일 생성",
    status: "todo",
  },
  {
    method: "PATCH",
    methodColor: "yellow",
    path: "/todos/:id",
    auth: true,
    desc: "할 일 수정 (done 토글)",
    status: "todo",
  },
  {
    method: "DELETE",
    methodColor: "red",
    path: "/todos/:id",
    auth: true,
    desc: "할 일 삭제",
    status: "todo",
  },
];

/* ══════════════════════════════════════════
   Section 4: CORS
   ══════════════════════════════════════════ */

export const CORS_CONCEPT = {
  title: "CORS란?",
  desc: "Cross-Origin Resource Sharing. 브라우저는 보안상 다른 Origin(프로토콜 + 도메인 + 포트)으로의 요청을 기본적으로 차단합니다. 포트가 다른 localhost:3001 → localhost:3000 요청도 차단 대상입니다.",
};

export const CORS_ORIGIN_PARTS = [
  {
    label: "프론트엔드 (요청하는 쪽)",
    value: "http://localhost:3001",
    parts: [
      { text: "http", color: "blue", role: "프로토콜" },
      { text: "localhost", color: "purple", role: "도메인" },
      { text: "3001", color: "red", role: "포트" },
    ],
  },
  {
    label: "백엔드 API (요청 받는 쪽)",
    value: "http://localhost:3000",
    parts: [
      { text: "http", color: "blue", role: "프로토콜" },
      { text: "localhost", color: "purple", role: "도메인" },
      { text: "3000", color: "red", role: "포트" },
    ],
  },
];

export const CORS_ERROR_MESSAGE = `Access to fetch at 'http://localhost:3000/todos'
from origin 'http://localhost:3001' has been blocked
by CORS policy: No 'Access-Control-Allow-Origin' header
is present on the requested resource.`;

/* ══════════════════════════════════════════
   Section 5: Todo API 구현
   ══════════════════════════════════════════ */

export const TODO_ENTITY_COLUMNS = [
  {
    decorator: "@PrimaryGeneratedColumn()",
    column: "id",
    type: "number",
    desc: "자동 증가하는 기본 키",
    color: "blue",
  },
  {
    decorator: "@Column()",
    column: "title",
    type: "string",
    desc: "할 일 제목",
    color: "purple",
  },
  {
    decorator: "@Column({ default: false })",
    column: "done",
    type: "boolean",
    desc: "완료 여부. 기본값 false",
    color: "purple",
  },
  {
    decorator: "@Column()",
    column: "userId",
    type: "number",
    desc: "작성한 유저의 ID — User 테이블과 연결",
    color: "yellow",
  },
  {
    decorator: "@CreateDateColumn()",
    column: "createdAt",
    type: "Date",
    desc: "생성 시각 자동 기록",
    color: "green",
  },
];

export const TODO_TABLE_ROWS = [
  { id: 1, title: "NestJS 복습하기", done: false, userId: 1, createdAt: "2025-06-01" },
  { id: 2, title: "CORS 설정 이해하기", done: true, userId: 1, createdAt: "2025-06-01" },
  { id: 3, title: "Todo API 완성하기", done: false, userId: 1, createdAt: "2025-06-01" },
];

export const MODULE_DEPS = {
  title: "모듈 의존 관계",
  desc: "TodoController에서 JwtAuthGuard를 사용하려면 JwtService가 필요합니다. AuthModule이 JwtModule을 exports하고 있으므로, TodoModule이 AuthModule을 imports하면 됩니다.",
  nodes: [
    { name: "TodoModule", role: "imports AuthModule", color: "accent" },
    { name: "AuthModule", role: "exports JwtModule", color: "purple" },
    { name: "JwtModule", role: "provides JwtService", color: "blue" },
  ],
};

export const PRACTICE_FILE_CONTENTS: Record<
  string,
  { filename: string; code: string; desc: string }
> = {
  mainTs: {
    filename: "main.ts",
    desc: "app.enableCors()를 추가해 프론트엔드(localhost:3001)에서 API를 호출할 수 있게 합니다.",
    code: `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();`,
  },
  todoEntity: {
    filename: "todo/todo.entity.ts",
    desc: "새로 만드는 파일입니다. todos 테이블 구조를 정의합니다. userId로 User 테이블과 관계를 표현합니다.",
    code: `import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  done: boolean;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}`,
  },
  createTodoDto: {
    filename: "todo/dto/create-todo.dto.ts",
    desc: "POST /todos 요청 바디 타입. title만 받습니다.",
    code: `export class CreateTodoDto {
  title: string;
}`,
  },
  updateTodoDto: {
    filename: "todo/dto/update-todo.dto.ts",
    desc: "PATCH /todos/:id 요청 바디 타입. done 또는 title을 수정합니다.",
    code: `export class UpdateTodoDto {
  done?: boolean;
  title?: string;
}`,
  },
  todoService: {
    filename: "todo/todo.service.ts",
    desc: "새로 만드는 파일입니다. 모든 조작에 userId를 조건으로 포함해 본인 것만 접근합니다.",
    code: `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {}

  getTodos(userId: number) {
    return this.todoRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  createTodo(userId: number, dto: CreateTodoDto) {
    const todo = this.todoRepo.create({ ...dto, userId });
    return this.todoRepo.save(todo);
  }

  async updateTodo(id: number, userId: number, dto: UpdateTodoDto) {
    await this.todoRepo.update({ id, userId }, dto);
    return this.todoRepo.findOne({ where: { id } });
  }

  async deleteTodo(id: number, userId: number) {
    await this.todoRepo.delete({ id, userId });
    return { success: true };
  }
}`,
  },
  todoController: {
    filename: "todo/todo.controller.ts",
    desc: "새로 만드는 파일입니다. 컨트롤러 레벨에 @UseGuards를 붙여 모든 엔드포인트를 한 번에 보호합니다.",
    code: `import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(@Req() req: { user: { sub: number } }) {
    return this.todoService.getTodos(req.user.sub);
  }

  @Post()
  createTodo(
    @Req() req: { user: { sub: number } },
    @Body() dto: CreateTodoDto,
  ) {
    return this.todoService.createTodo(req.user.sub, dto);
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Req() req: { user: { sub: number } },
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(Number(id), req.user.sub, dto);
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: string,
    @Req() req: { user: { sub: number } },
  ) {
    return this.todoService.deleteTodo(Number(id), req.user.sub);
  }
}`,
  },
  todoModule: {
    filename: "todo/todo.module.ts",
    desc: "새로 만드는 파일입니다. AuthModule을 imports해 JwtAuthGuard에서 JwtService를 사용할 수 있게 합니다.",
    code: `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    AuthModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}`,
  },
  appModule: {
    filename: "app.module.ts",
    desc: "TodoModule과 Todo Entity를 추가합니다. entities 배열에 Todo를 넣어야 synchronize가 테이블을 자동 생성합니다.",
    code: `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { User } from './auth/user.entity';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yourpassword',
      database: 'myapp',
      entities: [User, Todo],
      synchronize: true,
    }),
    AuthModule,
    TodoModule,
  ],
})
export class AppModule {}`,
  },
};

export const PRACTICE_FILE_TREE = [
  {
    name: "src",
    children: [
      {
        name: "auth",
        children: [
          {
            name: "dto",
            children: [{ name: "login.dto.ts" }, { name: "signup.dto.ts" }],
          },
          { name: "jwt-auth.guard.ts" },
          { name: "user.entity.ts" },
          { name: "auth.controller.ts" },
          { name: "auth.module.ts" },
          { name: "auth.service.ts" },
        ],
      },
      {
        name: "todo",
        children: [
          {
            name: "dto",
            children: [
              { name: "create-todo.dto.ts", path: "createTodoDto", isNew: true },
              { name: "update-todo.dto.ts", path: "updateTodoDto", isNew: true },
            ],
          },
          { name: "todo.entity.ts", path: "todoEntity", isNew: true },
          { name: "todo.controller.ts", path: "todoController", isNew: true },
          { name: "todo.service.ts", path: "todoService", isNew: true },
          { name: "todo.module.ts", path: "todoModule", isNew: true },
        ],
      },
      { name: "app.module.ts", path: "appModule", isNew: false },
      { name: "main.ts", path: "mainTs", isNew: false },
    ],
  },
];

export const PRACTICE_TAB_ORDER = [
  "mainTs",
  "appModule",
  "todoEntity",
  "createTodoDto",
  "updateTodoDto",
  "todoService",
  "todoController",
  "todoModule",
];

/* ══════════════════════════════════════════
   Section 6: 연동 테스트
   ══════════════════════════════════════════ */

export const TODO_API_TESTS = [
  {
    step: "1",
    title: "POST /auth/login — 토큰 받기",
    method: "POST",
    methodColor: "green",
    url: "http://localhost:3000/auth/login",
    inputLabel: "Body → raw → JSON",
    input: `{
  "email": "test@example.com",
  "password": "password123"
}`,
    successResponse: `{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`,
    errorResponse: `{
  "statusCode": 401,
  "message": "이메일 또는 비밀번호가 틀렸습니다."
}`,
  },
  {
    step: "2",
    title: "POST /todos — 할 일 생성",
    method: "POST",
    methodColor: "green",
    url: "http://localhost:3000/todos",
    inputLabel: "Headers + Body → raw → JSON",
    input: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "title": "백엔드 API 구현하기"
}`,
    successResponse: `{
  "id": 1,
  "title": "백엔드 API 구현하기",
  "done": false,
  "userId": 1,
  "createdAt": "2025-06-01T10:00:00.000Z"
}`,
    errorResponse: `{
  "statusCode": 401,
  "message": "토큰이 없습니다."
}`,
  },
  {
    step: "3",
    title: "GET /todos — 목록 조회",
    method: "GET",
    methodColor: "blue",
    url: "http://localhost:3000/todos",
    inputLabel: "Headers",
    input: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
    successResponse: `[
  {
    "id": 1,
    "title": "백엔드 API 구현하기",
    "done": false,
    "userId": 1,
    "createdAt": "2025-06-01T10:00:00.000Z"
  }
]`,
    errorResponse: `{
  "statusCode": 401,
  "message": "토큰이 없습니다."
}`,
  },
  {
    step: "4",
    title: "PATCH /todos/1 — 완료 토글",
    method: "PATCH",
    methodColor: "yellow",
    url: "http://localhost:3000/todos/1",
    inputLabel: "Headers + Body → raw → JSON",
    input: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "done": true
}`,
    successResponse: `{
  "id": 1,
  "title": "백엔드 API 구현하기",
  "done": true,
  "userId": 1,
  "createdAt": "2025-06-01T10:00:00.000Z"
}`,
    errorResponse: `{
  "statusCode": 401,
  "message": "토큰이 없습니다."
}`,
  },
];

/* ── Summary ── */

export const WEEK8_SUMMARY = [
  "프론트엔드 fetch() 호출을 읽으면 구현할 API 명세를 파악할 수 있다",
  "다른 포트에서 실행되는 프론트엔드를 허용하려면 app.enableCors()가 필요하다",
  "Todo Entity의 userId 컬럼으로 유저와의 관계를 표현한다",
  "@UseGuards를 컨트롤러 레벨에 붙이면 모든 엔드포인트가 한 번에 보호된다",
  "TodoModule은 AuthModule을 imports해 JwtAuthGuard를 사용한다",
  "두 서버를 동시에 실행하면 프론트엔드에서 백엔드 API를 직접 호출할 수 있다",
];
