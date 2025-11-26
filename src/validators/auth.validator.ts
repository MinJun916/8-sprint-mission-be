import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z.string().email('이메일 형식이 올바르지 않습니다.'),
    nickname: z.string().min(1, '닉네임을 입력해주세요.'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'], // 에러가 발생할 필드 경로
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
