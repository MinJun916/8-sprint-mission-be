import swaggerJsdoc from 'swagger-jsdoc';
import 'dotenv/config';

// 환경 변수에서 서버 URL을 가져오거나 기본값 사용
const getServerUrl = () => {
  // 프로덕션 환경 변수가 설정되어 있으면 사용
  if (process.env.API_BASE_URL) {
    return process.env.API_BASE_URL;
  }
  // 개발 환경에서는 localhost 사용
  return `http://localhost:${process.env.PORT || 3000}`;
};

const getServerDescription = () => {
  return process.env.API_BASE_URL ? 'Production Server' : 'Development Server';
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // 버전
    info: {
      title: '코드잇 풀스택 스프린트 미션 판다마켓', // 프로젝트 이름
      version: '1.0.0', // 버전
      description: 'API 문서 with Swagger',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    servers: [
      {
        url: getServerUrl(),
        description: getServerDescription(),
      },
    ],
  },
  apis: ['./src/app.ts', './src/routes/*.ts', './src/docs/*.swagger.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

const swaggerUiOptions = {
  explorer: true,
  customCss: `
    .swagger-ui .topbar {display: none}
    .swagger-ui .info .title { color: #3b82f6; }
    .swagger-ui .scheme-container { background: #f8fafc; padding: 10px; border-radius: 5px; }
  `,
  customSiteTitle: '코드잇 풀스택 스프린트 미션 판다마켓 API Docs',
};

export { specs, swaggerUiOptions };
