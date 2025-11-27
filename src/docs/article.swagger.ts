/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: 게시글 ID
 *         title:
 *           type: string
 *           description: 제목
 *         content:
 *           type: string
 *           description: 내용
 *         ownerId:
 *           type: string
 *           format: uuid
 *           description: 작성자 ID
 *         owner:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             nickname:
 *               type: string
 *         likeCount:
 *           type: integer
 *           description: 좋아요 수
 *         isLiked:
 *           type: boolean
 *           description: 현재 사용자가 좋아요를 눌렀는지 여부
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 생성일시
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 수정일시
 *     ArticleRequest:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           description: 제목
 *           example: 게시글 제목입니다
 *         content:
 *           type: string
 *           minLength: 1
 *           description: 내용
 *           example: 게시글 내용입니다
 *     ArticleListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 게시글 목록 조회 성공
 *         data:
 *           type: object
 *           properties:
 *             articles:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *         pagination:
 *           type: object
 *           properties:
 *             currentPage:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalCount:
 *               type: integer
 *               example: 100
 *             totalPages:
 *               type: integer
 *               example: 10
 *             hasNextPage:
 *               type: boolean
 *               example: true
 *             hasPreviousPage:
 *               type: boolean
 *               example: false
 *     ArticleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: 게시글 상세 조회 성공
 *         data:
 *           type: object
 *           properties:
 *             article:
 *               $ref: '#/components/schemas/Article'
 *
 * tags:
 *   - name: Article
 *     description: 게시글 관련 API
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - Article
 *     summary: 게시글 목록 조회
 *     description: 페이지네이션과 검색, 정렬 기능을 지원하는 게시글 목록을 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: 페이지 번호
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: 페이지당 항목 수
 *         example: 10
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: 검색어 (제목 또는 내용에서 검색)
 *         example: 검색어
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [recent, like]
 *           default: recent
 *         description: "정렬 방식 (recent: 최신순, like: 좋아요순)"
 *         example: recent
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleListResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     tags:
 *       - Article
 *     summary: 게시글 생성
 *     description: 새로운 게시글을 생성합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleRequest'
 *           example:
 *             title: 게시글 제목입니다
 *             content: 게시글 내용입니다
 *     responses:
 *       201:
 *         description: 게시글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
 *       400:
 *         description: 잘못된 요청 (유효성 검사 실패)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     tags:
 *       - Article
 *     summary: 게시글 상세 조회
 *     description: 특정 게시글의 상세 정보를 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: 게시글 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 ID 형식)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   patch:
 *     tags:
 *       - Article
 *     summary: 게시글 수정
 *     description: 게시글의 제목과 내용을 수정합니다. (작성자만 수정 가능)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleRequest'
 *           example:
 *             title: 수정된 제목
 *             content: 수정된 내용
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
 *       400:
 *         description: 잘못된 요청 (유효성 검사 실패)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: 권한 없음 (작성자가 아님)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     tags:
 *       - Article
 *     summary: 게시글 삭제
 *     description: 게시글을 삭제합니다. (작성자만 삭제 가능)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 게시글 ID
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleResponse'
 *       400:
 *         description: 잘못된 요청 (유효하지 않은 ID 형식)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: 인증되지 않은 접근
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: 권한 없음 (작성자가 아님)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

