import { Prisma, PrismaClient } from '../generated/client';

// Prisma 7의 타입 정의 이슈:
// PrismaClientOptions가 union 타입 ({ adapter } | { accelerateUrl }) & { ... }로 정의되어 있어서
// TypeScript가 adapter 또는 accelerateUrl 중 하나를 필수로 요구합니다.
// 하지만 실제로는 둘 다 선택사항이며, 공식 문서 예제도 new PrismaClient()로 인자 없이 호출합니다.
//
// 해결 방법:
// 1. 타입 단언 사용 (현재 방법)
// 2. 명시적으로 옵션 전달 (예: log 옵션 등)
// 3. Prisma 팀이 타입 정의를 수정할 때까지 대기

// Prisma 7의 타입 정의 버그:
// PrismaClientOptions가 union 타입으로 정의되어 있어서 TypeScript가
// adapter 또는 accelerateUrl 중 하나를 필수로 요구합니다.
// 하지만 실제로는 둘 다 선택사항이며, 공식 문서도 new PrismaClient()를 권장합니다.
//
// 참고: https://github.com/prisma/prisma/issues

const prisma = new PrismaClient({
  log: ['error'],
} as any);

export default prisma;
