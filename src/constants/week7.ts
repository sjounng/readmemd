/* ── Week 7 콘텐츠 데이터 (이론) ── */

export const WEEK7_TAGS = ["PostgreSQL", "TypeORM", "bcrypt", "JWT"];

export const WEEK7_TOC = [
  { num: "01", title: "지난 주 돌아보기", href: "#review" },
  { num: "02", title: "데이터베이스", href: "#database" },
  { num: "03", title: "ORM & TypeORM", href: "#orm" },
  { num: "04", title: "Entity & Repository", href: "#entity" },
  { num: "05", title: "비밀번호 암호화", href: "#bcrypt" },
  { num: "06", title: "JWT 인증", href: "#jwt" },
  { num: "07", title: "실습", href: "#practice" },
];

/* ══════════════════════════════════════════
   Section 1: 지난 주 돌아보기
   ══════════════════════════════════════════ */

export const WEEK6_LIMITS = [
  {
    problem: "데이터가 사라진다",
    detail:
      "메모리 배열에 저장하면 서버를 재시작할 때마다 모든 데이터가 초기화됩니다.",
    solution: "데이터베이스에 영구 저장",
    icon: "database",
  },
  {
    problem: "비밀번호가 위험하다",
    detail:
      "비밀번호를 평문으로 저장하면 DB가 유출됐을 때 모두 노출됩니다.",
    solution: "bcrypt로 해시 후 저장",
    icon: "shield",
  },
  {
    problem: "로그인 상태를 유지할 수 없다",
    detail:
      "{ success: true }만 반환해서 다음 요청에서 누가 보냈는지 알 수 없습니다.",
    solution: "JWT 토큰 발급",
    icon: "key",
  },
];

/* ══════════════════════════════════════════
   Section 2: 데이터베이스
   ══════════════════════════════════════════ */

export const DB_CONCEPT = {
  title: "데이터베이스란?",
  desc: "데이터를 체계적으로 저장하고 검색할 수 있는 시스템입니다. 서버가 꺼져도 데이터가 보존되고, 여러 사용자가 동시에 안전하게 접근할 수 있습니다.",
};

export const DB_ANALOGY = {
  title: "엑셀 스프레드시트와 비교하면",
  rows: [
    { aspect: "저장 단위", excel: "시트 (Sheet)", db: "테이블 (Table)" },
    { aspect: "행 하나", excel: "row", db: "레코드 (Record)" },
    { aspect: "열 하나", excel: "column", db: "컬럼 (Column)" },
    { aspect: "파일 전체", excel: ".xlsx 파일", db: "데이터베이스 (Database)" },
  ],
};

export const RDBMS_CONCEPT = {
  title: "관계형 데이터베이스 (RDBMS)",
  desc: "데이터를 행과 열로 구성된 테이블에 저장합니다. 테이블 간 관계(Relation)를 정의해서 데이터 중복을 줄이고 일관성을 유지합니다. PostgreSQL, MySQL, SQLite가 여기에 속합니다.",
};

export const SCHEMA_EXAMPLE = {
  title: "예시: 블로그 서비스 스키마",
  desc: "users 테이블의 id와 posts 테이블의 userId를 연결해 '누가 쓴 글인지'를 표현합니다. 데이터를 중복 저장하지 않고 참조(Reference)로 연결하는 것이 핵심입니다.",
  tables: [
    {
      name: "users",
      columns: [
        { name: "id", type: "INTEGER", pk: true, fk: false },
        { name: "email", type: "VARCHAR", pk: false, fk: false },
        { name: "name", type: "VARCHAR", pk: false, fk: false },
        { name: "createdAt", type: "TIMESTAMP", pk: false, fk: false },
      ],
    },
    {
      name: "posts",
      columns: [
        { name: "id", type: "INTEGER", pk: true, fk: false },
        { name: "title", type: "VARCHAR", pk: false, fk: false },
        { name: "content", type: "TEXT", pk: false, fk: false },
        { name: "userId", type: "INTEGER", pk: false, fk: true },
        { name: "createdAt", type: "TIMESTAMP", pk: false, fk: false },
      ],
    },
  ],
  relation: "users.id → posts.userId",
  relationDesc: "한 명의 유저(1)가 여러 게시글(N)을 작성할 수 있습니다.",
};

export const USER_TABLE_ROWS = [
  { id: 1, email: "alice@example.com", password: "$2b$10$...", name: "Alice", createdAt: "2025-05-18" },
  { id: 2, email: "bob@example.com", password: "$2b$10$...", name: "Bob", createdAt: "2025-05-18" },
  { id: 3, email: "carol@example.com", password: "$2b$10$...", name: "Carol", createdAt: "2025-05-19" },
];

/* ══════════════════════════════════════════
   Section 3: ORM & TypeORM
   ══════════════════════════════════════════ */

export const ORM_CONCEPT = {
  title: "ORM이란?",
  desc: "Object-Relational Mapping. 데이터베이스 테이블을 TypeScript 클래스로 표현하고, SQL 쿼리 대신 메서드로 데이터를 다루는 기술입니다.",
};

export const ORM_COMPARISON = [
  {
    label: "SQL 직접 작성",
    code: `// 유저 조회
db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);

// 유저 저장
db.query(
  \`INSERT INTO users (email, password, name)
   VALUES ($1, $2, $3)\`,
  [email, password, name]
);`,
  },
  {
    label: "TypeORM 사용",
    code: `// 유저 조회
userRepo.findOne({
  where: { email }
});

// 유저 저장
const user = userRepo.create({
  email, password, name
});
userRepo.save(user);`,
  },
];

export const TYPEORM_ADVANTAGES = [
  {
    title: "타입 안전성",
    desc: "TypeScript와 완벽히 통합되어 오타나 타입 오류를 컴파일 타임에 잡을 수 있습니다.",
    icon: "shield",
  },
  {
    title: "DB 독립성",
    desc: "SQLite, PostgreSQL, MySQL 등을 설정 한 줄만 바꿔 전환할 수 있습니다.",
    icon: "swap",
  },
  {
    title: "자동 동기화",
    desc: "Entity 클래스를 수정하면 DB 테이블 구조가 자동으로 업데이트됩니다.",
    icon: "sync",
  },
];

/* ══════════════════════════════════════════
   Section 4: Entity & Repository
   ══════════════════════════════════════════ */

export const ENTITY_CONCEPT = {
  title: "Entity = 데이터베이스 테이블",
  desc: "TypeORM에서 Entity는 DB 테이블 하나에 대응하는 TypeScript 클래스입니다. 클래스의 각 필드가 테이블의 컬럼이 되고, 데코레이터(@)로 DB 설정을 표현합니다.",
};

export const ENTITY_CODE = `@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}`;

export const USER_ENTITY_COLUMNS = [
  {
    decorator: "@PrimaryGeneratedColumn()",
    column: "id",
    type: "number",
    desc: "자동 증가하는 기본 키 (1, 2, 3...)",
    color: "blue",
  },
  {
    decorator: "@Column({ unique: true })",
    column: "email",
    type: "string",
    desc: "중복 불가한 이메일 주소",
    color: "purple",
  },
  {
    decorator: "@Column()",
    column: "password",
    type: "string",
    desc: "암호화된 비밀번호 (해시값 저장)",
    color: "purple",
  },
  {
    decorator: "@Column()",
    column: "name",
    type: "string",
    desc: "사용자 이름",
    color: "purple",
  },
  {
    decorator: "@CreateDateColumn()",
    column: "createdAt",
    type: "Date",
    desc: "레코드 생성 시 자동으로 현재 시간 기록",
    color: "green",
  },
];

export const REPOSITORY_CONCEPT = {
  title: "Repository = DB 접근 창구",
  desc: "Repository는 특정 Entity에 대한 DB 조작을 담당하는 객체입니다. TypeORM이 자동으로 만들어주고, @InjectRepository()로 Service에 주입해서 사용합니다.",
};

export const REPOSITORY_METHODS = [
  {
    method: "findOne({ where: { email } })",
    desc: "조건에 맞는 레코드 하나 조회. 없으면 null 반환",
    returns: "User | null",
  },
  {
    method: "find()",
    desc: "모든 레코드 목록 조회",
    returns: "User[]",
  },
  {
    method: "create(dto)",
    desc: "Entity 인스턴스 생성 (아직 DB에 저장 안 됨)",
    returns: "User",
  },
  {
    method: "save(entity)",
    desc: "Entity를 DB에 저장 (INSERT 또는 UPDATE)",
    returns: "Promise<User>",
  },
  {
    method: "delete(id)",
    desc: "ID로 레코드 삭제",
    returns: "Promise<void>",
  },
];

export const LAYER_WITH_DB = [
  {
    name: "Client",
    role: "브라우저 / 앱",
    desc: "HTTP 요청을 보냅니다.",
    color: "blue",
    arrow: true,
  },
  {
    name: "Controller",
    role: "라우팅",
    desc: "요청을 받아 Service를 호출합니다.",
    color: "accent",
    arrow: true,
  },
  {
    name: "Service",
    role: "비즈니스 로직",
    desc: "Repository를 통해 DB와 대화합니다.",
    color: "purple",
    arrow: true,
  },
  {
    name: "Repository",
    role: "DB 접근",
    desc: "TypeORM이 자동 생성. SQL을 대신 작성해줍니다.",
    color: "yellow",
    arrow: true,
  },
  {
    name: "PostgreSQL",
    role: "데이터 저장",
    desc: "데이터를 영구 저장합니다.",
    color: "green",
    arrow: false,
  },
];

/* ══════════════════════════════════════════
   Section 5: bcrypt
   ══════════════════════════════════════════ */

export const BCRYPT_DANGER = {
  title: "비밀번호를 평문으로 저장하면?",
  desc: "DB가 유출됐을 때 모든 사용자의 비밀번호가 그대로 노출됩니다. 실제로 수많은 해킹 사례의 원인입니다.",
  items: [
    { label: "평문 저장 (위험)", value: "password123", color: "red" },
    {
      label: "bcrypt 해시 후 저장 (안전)",
      value: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
      color: "green",
    },
  ],
};

export const BCRYPT_PROPERTIES = [
  {
    title: "단방향",
    desc: "원본 → 해시는 가능하지만, 해시 → 원본은 불가능합니다. DB가 유출돼도 비밀번호를 복원할 수 없습니다.",
  },
  {
    title: "Salt",
    desc: "같은 비밀번호를 해시해도 매번 다른 결과가 나옵니다. 사전 공격(Rainbow Table)을 방지합니다.",
  },
  {
    title: "검증",
    desc: "로그인 시 입력된 비밀번호를 저장된 해시와 compare()로 비교합니다. 역산 없이도 일치 여부를 알 수 있습니다.",
  },
];

export const BCRYPT_USAGE = `import * as bcrypt from 'bcrypt';

// 회원가입: 비밀번호 해시 후 저장
const hashed = await bcrypt.hash(plainPassword, 10);
//                                              ^ saltRounds (높을수록 보안↑, 속도↓)

// 로그인: 입력값과 저장된 해시 비교
const isMatch = await bcrypt.compare(plainPassword, hashedFromDB);
// → true 또는 false`;

/* ══════════════════════════════════════════
   Section 6: JWT
   ══════════════════════════════════════════ */

export const JWT_CONCEPT = {
  title: "JWT란?",
  desc: "JSON Web Token. 서버가 로그인 성공 시 발급하는 암호화된 문자열입니다. 클라이언트는 이 토큰을 저장했다가, 이후 요청마다 헤더에 실어 보냅니다. 서버는 토큰만 보고 누가 보냈는지 알 수 있습니다.",
};

export const JWT_VS_SESSION = [
  {
    aspect: "저장 위치",
    session: "서버 메모리 (서버가 기억)",
    jwt: "클라이언트 (localStorage 등)",
  },
  {
    aspect: "서버 확장",
    session: "서버가 여러 대면 세션 공유 필요",
    jwt: "토큰 자체에 정보가 있어 어느 서버든 검증 가능",
  },
  {
    aspect: "만료 처리",
    session: "서버에서 직접 삭제 가능",
    jwt: "만료 시간(expiresIn)으로 관리",
  },
  {
    aspect: "적합한 환경",
    session: "전통적인 서버 렌더링 웹 앱",
    jwt: "REST API, 모바일 앱, SPA",
  },
];

export const JWT_STRUCTURE = [
  {
    part: "Header",
    colorClass: "text-red-400",
    bgClass: "bg-red-500/10 border-red-400/30",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    desc: "토큰 타입과 서명 알고리즘 정보",
    content: '{ "alg": "HS256", "typ": "JWT" }',
  },
  {
    part: "Payload",
    colorClass: "text-purple-400",
    bgClass: "bg-purple-500/10 border-purple-400/30",
    example: "eyJzdWIiOjEsImVtYWlsIjoidGVzdEBleC5jb20ifQ",
    desc: "사용자 정보. 누구나 디코딩 가능하므로 민감 정보는 담지 않습니다.",
    content: '{ "sub": 1, "email": "test@example.com", "iat": 1716364800 }',
  },
  {
    part: "Signature",
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/10 border-blue-400/30",
    example: "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    desc: "Header + Payload를 서버 비밀 키로 서명. 위변조를 감지합니다.",
    content: "HMACSHA256(base64(header) + '.' + base64(payload), secretKey)",
  },
];

export const JWT_FLOW = [
  {
    step: "1",
    title: "로그인 요청",
    desc: "클라이언트가 POST /auth/login으로 이메일·비밀번호를 보냅니다.",
    direction: "Client → Server",
    dirColor: "text-(--accent)",
  },
  {
    step: "2",
    title: "토큰 발급",
    desc: "서버가 비밀번호를 검증하고 JWT를 생성해서 응답합니다.",
    direction: "Server → Client",
    dirColor: "text-purple-400",
  },
  {
    step: "3",
    title: "토큰 저장",
    desc: "클라이언트가 토큰을 localStorage나 쿠키에 저장합니다.",
    direction: "Client",
    dirColor: "text-(--accent)",
  },
  {
    step: "4",
    title: "인증이 필요한 요청",
    desc: "이후 모든 요청의 Authorization 헤더에 토큰을 담아 보냅니다.",
    direction: "Client → Server",
    dirColor: "text-(--accent)",
  },
  {
    step: "5",
    title: "Guard가 검증",
    desc: "JwtAuthGuard가 토큰을 검증하고, 유효하면 요청을 허용하고 아니면 401을 반환합니다.",
    direction: "Server",
    dirColor: "text-purple-400",
  },
];

export const GUARD_CONCEPT = {
  title: "Guard란?",
  desc: "컨트롤러 메서드가 실행되기 전에 요청을 가로채서 허용할지 거부할지 결정하는 클래스입니다. @UseGuards() 데코레이터로 특정 엔드포인트에만 적용합니다.",
};

export const GUARD_FLOW = [
  { label: "요청 수신", desc: "Authorization: Bearer <token> 헤더 확인" },
  { label: "토큰 추출", desc: "'Bearer ' 이후의 문자열을 토큰으로 분리" },
  { label: "서명 검증", desc: "jwtService.verify()로 서명·만료 확인" },
  { label: "허용 / 거부", desc: "유효하면 req.user에 payload 저장 후 통과, 아니면 401" },
];

/* ══════════════════════════════════════════
   Section 7: 실습
   ══════════════════════════════════════════ */

export const PRACTICE_INSTALL_STEPS = [
  {
    step: "1",
    title: "TypeORM + PostgreSQL 드라이버 설치",
    desc: "TypeORM은 NestJS 공식 지원 ORM이고, pg는 PostgreSQL용 Node.js 드라이버입니다.",
    code: "$ npm install @nestjs/typeorm typeorm pg",
  },
  {
    step: "2",
    title: "JWT + bcrypt 설치",
    desc: "JWT 토큰 발급과 비밀번호 해시에 필요한 패키지입니다.",
    code: "$ npm install @nestjs/jwt bcrypt\n$ npm install -D @types/bcrypt",
  },
];

export const POSTGRES_INSTALL_STEPS = [
  {
    os: "Mac",
    steps: [
      {
        label: "Homebrew 설치 (없는 경우)",
        code: `$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`,
      },
      {
        label: "PostgreSQL 설치",
        code: "$ brew install postgresql@17",
      },
      {
        label: "서버 시작",
        code: "$ brew services start postgresql@17",
      },
      {
        label: "postgres 슈퍼유저 생성 (DataGrip 연결에 사용)",
        code: "$ createuser -s postgres",
      },
    ],
  },
  {
    os: "Windows",
    steps: [
      {
        label: "공식 인스톨러 다운로드",
        code: "https://www.postgresql.org/download/windows/",
      },
      {
        label: "설치 진행 — 설치 중 superuser(postgres) 비밀번호 설정",
        code: "",
      },
      {
        label: "설치 완료 후 자동으로 서비스 실행됨",
        code: "",
      },
    ],
  },
];

export const DATAGRIP_STEPS = [
  { step: "1", desc: "DataGrip을 열고 좌측 상단 + 버튼 → Data Source → PostgreSQL을 선택합니다." },
  { step: "2", desc: "User: postgres, Password는 Mac은 비워두고 Windows는 설치 시 설정한 비밀번호를 입력합니다." },
  { step: "3", desc: "Test Connection을 눌러 연결을 확인하고 Apply → OK합니다." },
  { step: "4", desc: "연결된 postgres 데이터베이스에서 우클릭 → New → Database로 새 DB를 만듭니다. (이름 예: myapp)" },
];

export const PRACTICE_FILE_CONTENTS: Record<
  string,
  { filename: string; code: string; desc: string }
> = {
  appModule: {
    filename: "app.module.ts",
    desc: "TypeOrmModule.forRoot()로 PostgreSQL 연결 설정을 추가합니다. synchronize: true는 개발 중에만 사용합니다.",
    code: `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yourpassword',
      database: 'myapp',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}`,
  },
  userEntity: {
    filename: "auth/user.entity.ts",
    desc: "새로 만드는 파일입니다. DB의 users 테이블 구조를 TypeScript 클래스로 정의합니다.",
    code: `import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}`,
  },
  authModule: {
    filename: "auth/auth.module.ts",
    desc: "TypeOrmModule.forFeature([User])로 UserRepository를 주입하고, JwtModule을 등록합니다.",
    code: `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}`,
  },
  authService: {
    filename: "auth/auth.service.ts",
    desc: "메모리 배열 → DB Repository. 비밀번호 평문 → bcrypt 해시. 로그인 응답 → JWT 토큰으로 교체합니다.",
    code: `import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed });
    await this.userRepo.save(user);
    return { success: true, userId: user.id };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 틀렸습니다.',
      );
    }
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 틀렸습니다.',
      );
    }
    const payload = { sub: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async getMe(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    const { password, ...result } = user!;
    return result;
  }
}`,
  },
  jwtGuard: {
    filename: "auth/jwt-auth.guard.ts",
    desc: "새로 만드는 파일입니다. Authorization 헤더의 Bearer 토큰을 검증합니다.",
    code: `import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];

    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    const token = auth.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }
}`,
  },
  authController: {
    filename: "auth/auth.controller.ts",
    desc: "GET /auth/me 엔드포인트를 추가합니다. @UseGuards(JwtAuthGuard)로 보호해 토큰 없이는 접근할 수 없습니다.",
    code: `import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: { user: { sub: number } }) {
    return this.authService.getMe(req.user.sub);
  }
}`,
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
            children: [
              { name: "login.dto.ts" },
              { name: "signup.dto.ts" },
            ],
          },
          { name: "jwt-auth.guard.ts", path: "jwtGuard", isNew: true },
          { name: "user.entity.ts", path: "userEntity", isNew: true },
          { name: "auth.controller.ts", path: "authController", isNew: false },
          { name: "auth.module.ts", path: "authModule", isNew: false },
          { name: "auth.service.ts", path: "authService", isNew: false },
        ],
      },
      { name: "app.module.ts", path: "appModule", isNew: false },
      { name: "main.ts" },
    ],
  },
];

export const PRACTICE_TAB_ORDER = [
  "appModule",
  "userEntity",
  "authModule",
  "authService",
  "jwtGuard",
  "authController",
];

export const PRACTICE_POSTMAN_TESTS = [
  {
    step: "1",
    title: "POST /auth/signup",
    method: "POST",
    methodColor: "green",
    url: "http://localhost:3000/auth/signup",
    inputLabel: "Body → raw → JSON",
    input: `{
  "email": "test@example.com",
  "password": "password123",
  "name": "홍길동"
}`,
    successResponse: `{
  "success": true,
  "userId": 1
}`,
    errorResponse: `{
  "statusCode": 409,
  "message": "이미 가입된 이메일입니다.",
  "error": "Conflict"
}`,
  },
  {
    step: "2",
    title: "POST /auth/login",
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
  "message": "이메일 또는 비밀번호가 틀렸습니다.",
  "error": "Unauthorized"
}`,
  },
  {
    step: "3",
    title: "GET /auth/me",
    method: "GET",
    methodColor: "blue",
    url: "http://localhost:3000/auth/me",
    inputLabel: "Headers",
    input: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
    successResponse: `{
  "id": 1,
  "email": "test@example.com",
  "name": "홍길동",
  "createdAt": "2025-05-18T00:00:00.000Z"
}`,
    errorResponse: `{
  "statusCode": 401,
  "message": "토큰이 없습니다.",
  "error": "Unauthorized"
}`,
  },
];

/* ── Summary ── */

export const WEEK7_SUMMARY = [
  "메모리 배열 → DB로 대체해 서버 재시작 후에도 데이터가 보존된다",
  "ORM(TypeORM)은 SQL 대신 클래스·메서드로 DB를 다룬다",
  "Entity 클래스 = DB 테이블. 데코레이터(@Column 등)로 컬럼을 정의한다",
  "Repository가 Entity의 조회·저장·삭제를 담당한다",
  "비밀번호는 bcrypt로 해시 저장하고, compare()로 검증한다",
  "JWT로 로그인 상태를 유지하고, Guard로 보호 엔드포인트를 지킨다",
];
