/**
 * @swagger
 * components:
 *   schemas:
 *     PresignedUrlRequest:
 *       type: object
 *       required:
 *         - fileName
 *         - fileType
 *       properties:
 *         fileName:
 *           type: string
 *           description: 업로드할 파일명
 *           example: image.jpg
 *         fileType:
 *           type: string
 *           description: 파일의 MIME 타입
 *           example: image/jpeg
 *     PresignedUrlResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Presigned URL 생성 완료
 *         data:
 *           type: object
 *           properties:
 *             presignedUrl:
 *               type: string
 *               description: S3에 파일을 업로드하기 위한 Presigned URL
 *               example: https://s3.amazonaws.com/bucket-name/uploads/1234567890=image.jpg?X-Amz-Algorithm=...
 *             fileKey:
 *               type: string
 *               description: S3에 저장될 파일 키
 *               example: uploads/1234567890=image.jpg
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: 에러 메시지
 *
 * tags:
 *   - name: AWS
 *     description: AWS S3 관련 API
 */

/**
 * @swagger
 * /aws/presigned-url:
 *   post:
 *     tags:
 *       - AWS
 *     summary: Presigned URL 생성
 *     description: S3에 파일을 업로드하기 위한 Presigned URL을 생성합니다. 생성된 URL은 60초 동안 유효합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PresignedUrlRequest'
 *           example:
 *             fileName: image.jpg
 *             fileType: image/jpeg
 *     responses:
 *       200:
 *         description: Presigned URL 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PresignedUrlResponse'
 *             example:
 *               success: true
 *               message: Presigned URL 생성 완료
 *               data:
 *                 presignedUrl: https://s3.amazonaws.com/bucket-name/uploads/1234567890=image.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...
 *                 fileKey: uploads/1234567890=image.jpg
 *       400:
 *         description: 잘못된 요청 (필수 필드 누락 또는 유효성 검사 실패)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: fileName과 fileType은 필수입니다.
 *       500:
 *         description: 서버 오류 (AWS 설정 오류 등)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: AWS credentials are not set
 */

