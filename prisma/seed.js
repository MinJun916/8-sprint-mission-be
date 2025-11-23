import prisma from '../src/middlewares/prisma.js';
import bcrypt from 'bcrypt';

const seedDB = async () => {
  try {
    console.log('🌱 시드 데이터 생성 시작...');
    console.log('🗑️  기존 데이터 삭제 중...');

    // 기존 데이터 삭제 (관계 순서에 맞게 역순으로 삭제)
    await prisma.articleComment.deleteMany();
    await prisma.productComment.deleteMany();
    await prisma.articleLike.deleteMany();
    await prisma.productLike.deleteMany();
    await prisma.article.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ 기존 데이터 삭제 완료');

    // 1. 사용자 데이터 생성 (3명 → 30명)
    const hashedPassword = await bcrypt.hash('password123', 10);

    const userData = [];
    for (let i = 1; i <= 30; i++) {
      userData.push({
        email: `user${i}@example.com`,
        nickname: `사용자${i}`,
        encryptedPassword: hashedPassword,
        image: `https://example.com/user${i}.jpg`,
      });
    }

    await prisma.user.createMany({
      data: userData,
    });
    console.log('✅ 사용자 데이터 생성 완료 (30명)');

    // 생성된 사용자들 조회
    const createdUsers = await prisma.user.findMany();

    // 2. 상품 데이터 생성 (5개 → 50개)
    const productNames = [
      '맥북 프로 16인치',
      '아이폰 15 프로',
      '에어팟 프로',
      '갤럭시 S24 울트라',
      '소니 WH-1000XM5',
      '아이패드 프로',
      '갤럭시 버즈 프로',
      'LG 그램 17인치',
      '레노버 씽크패드 X1',
      '델 XPS 15',
      '아이맥 24인치',
      '맥 스튜디오',
      '아이폰 SE',
      '갤럭시 탭 S9',
      '아이패드 에어',
      '닌텐도 스위치',
      '플레이스테이션 5',
      '엑스박스 시리즈 X',
      '스팀 덱',
      '오큘러스 퀘스트 3',
      '삼성 모니터 32인치',
      'LG 모니터 울트라와이드',
      '로지텍 MX 마스터 3',
      '애플 매직 키보드',
      '코르세어 K70 키보드',
      '로지텍 G 프로 마우스',
      '애플 매직 트랙패드',
      '삼성 외장 SSD 1TB',
      '웨스턴 디지털 HDD 4TB',
      '샌디스크 USB 3.0',
      '캐논 EOS R5',
      '소니 알파 7IV',
      '니콘 Z9',
      '고프로 히어로 12',
      '드론 DJI 미니 4',
      '스마트워치 애플워치',
      '갤럭시 워치',
      '핏빗 차지 6',
      '에어프라이어',
      '로봇청소기',
      '무선청소기',
      '스마트 TV 65인치',
      '프로젝터',
      '블루투스 스피커',
      '홈팟 미니',
      '에코닷',
      '스마트 전구',
      '스마트 도어락',
      'CCTV 카메라',
      '태블릿 거치대',
      '노트북 쿨러',
    ];

    const productDescriptions = [
      '최신 M3 칩이 탑재된 맥북 프로입니다.',
      '최신 아이폰 15 프로 모델입니다.',
      '노이즈 캔슬링이 적용된 에어팟 프로입니다.',
      '삼성의 최신 플래그십 스마트폰입니다.',
      '업계 최고 수준의 노이즈 캔슬링 헤드폰입니다.',
      'M2 칩이 탑재된 고성능 태블릿입니다.',
      '삼성의 프리미엄 무선 이어폰입니다.',
      '가벼운 무게와 뛰어난 성능의 노트북입니다.',
      '비즈니스용 프리미엄 노트북입니다.',
      '크리에이터를 위한 고성능 노트북입니다.',
      'M3 칩이 탑재된 올인원 데스크톱입니다.',
      '크리에이터를 위한 강력한 데스크톱입니다.',
      '가성비 좋은 아이폰 모델입니다.',
      '삼성의 프리미엄 태블릿입니다.',
      'M1 칩이 탑재된 태블릿입니다.',
      '휴대용 게임 콘솔입니다.',
      '차세대 게임 콘솔입니다.',
      '마이크로소프트의 최신 게임 콘솔입니다.',
      '휴대용 게임 PC입니다.',
      'VR 헤드셋입니다.',
      '4K 해상도의 대형 모니터입니다.',
      '21:9 비율의 울트라와이드 모니터입니다.',
      '생산성 향상을 위한 무선 마우스입니다.',
      '애플의 무선 키보드입니다.',
      '게이밍용 기계식 키보드입니다.',
      '프로 게이머를 위한 마우스입니다.',
      '정밀한 포인팅을 위한 트랙패드입니다.',
      '빠른 전송 속도의 외장 저장장치입니다.',
      '대용량 저장장치입니다.',
      '고속 USB 메모리입니다.',
      '풀프레임 미러리스 카메라입니다.',
      '소니의 플래그십 카메라입니다.',
      '니콘의 최고급 카메라입니다.',
      '액션캠입니다.',
      '4K 촬영이 가능한 드론입니다.',
      '애플의 스마트워치입니다.',
      '삼성의 스마트워치입니다.',
      '건강 관리용 스마트밴드입니다.',
      '건강한 요리를 위한 에어프라이어입니다.',
      '자동 청소 로봇입니다.',
      '무선 진공청소기입니다.',
      '4K 해상도의 스마트 TV입니다.',
      '고화질 프로젝터입니다.',
      '고음질 블루투스 스피커입니다.',
      '애플의 스마트 스피커입니다.',
      '아마존의 AI 스피커입니다.',
      '스마트홈 연동 전구입니다.',
      '지문인식 도어락입니다.',
      '실시간 모니터링 CCTV입니다.',
      '태블릿용 거치대입니다.',
      '노트북 발열 방지 쿨러입니다.',
    ];

    const productTags = [
      ['노트북', '애플', '프리미엄'],
      ['스마트폰', '애플', '프리미엄'],
      ['이어폰', '애플', '무선'],
      ['스마트폰', '삼성', '안드로이드'],
      ['헤드폰', '소니', '노이즈캔슬링'],
      ['태블릿', '애플', '프리미엄'],
      ['이어폰', '삼성', '무선'],
      ['노트북', 'LG', '가벼움'],
      ['노트북', '레노버', '비즈니스'],
      ['노트북', '델', '크리에이터'],
      ['데스크톱', '애플', '올인원'],
      ['데스크톱', '애플', '크리에이터'],
      ['스마트폰', '애플', '가성비'],
      ['태블릿', '삼성', '프리미엄'],
      ['태블릿', '애플', '가성비'],
      ['게임기', '닌텐도', '휴대용'],
      ['게임기', '소니', '콘솔'],
      ['게임기', '마이크로소프트', '콘솔'],
      ['게임기', '밸브', '휴대용'],
      ['VR', '메타', '헤드셋'],
      ['모니터', '삼성', '4K'],
      ['모니터', 'LG', '울트라와이드'],
      ['마우스', '로지텍', '무선'],
      ['키보드', '애플', '무선'],
      ['키보드', '코르세어', '게이밍'],
      ['마우스', '로지텍', '게이밍'],
      ['트랙패드', '애플', '무선'],
      ['저장장치', '삼성', 'SSD'],
      ['저장장치', '웨스턴디지털', 'HDD'],
      ['저장장치', '샌디스크', 'USB'],
      ['카메라', '캐논', '미러리스'],
      ['카메라', '소니', '미러리스'],
      ['카메라', '니콘', '미러리스'],
      ['액션캠', '고프로', '4K'],
      ['드론', 'DJI', '4K'],
      ['스마트워치', '애플', '헬스케어'],
      ['스마트워치', '삼성', '헬스케어'],
      ['스마트밴드', '핏빗', '헬스케어'],
      ['주방가전', '에어프라이어', '건강'],
      ['청소기', '로봇청소기', '자동'],
      ['청소기', '무선청소기', '무선'],
      ['TV', '스마트TV', '4K'],
      ['프로젝터', '고화질', '홈시어터'],
      ['스피커', '블루투스', '무선'],
      ['스피커', '애플', '스마트'],
      ['스피커', '아마존', 'AI'],
      ['조명', '스마트홈', 'LED'],
      ['보안', '도어락', '지문인식'],
      ['보안', 'CCTV', '모니터링'],
      ['액세서리', '거치대', '태블릿'],
      ['액세서리', '쿨러', '노트북'],
    ];

    const productPrices = [
      2500000, 1500000, 350000, 1400000, 450000, 1200000, 200000, 1800000, 2200000, 2000000,
      1800000, 2500000, 600000, 1100000, 800000, 400000, 600000, 550000, 800000, 700000, 500000,
      600000, 120000, 150000, 200000, 150000, 150000, 150000, 120000, 50000, 4000000, 3500000,
      5000000, 500000, 1200000, 500000, 300000, 150000, 200000, 500000, 400000, 1500000, 800000,
      300000, 150000, 100000, 30000, 200000, 150000, 50000, 50000,
    ];

    const productData = [];
    for (let i = 0; i < 50; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      productData.push({
        name: productNames[i],
        description: productDescriptions[i],
        image: `https://example.com/product${i + 1}.jpg`,
        price: productPrices[i],
        tags: productTags[i],
        ownerId: randomUser.id,
      });
    }

    await prisma.product.createMany({
      data: productData,
    });
    console.log('✅ 상품 데이터 생성 완료 (50개)');

    // 생성된 상품들 조회
    const createdProducts = await prisma.product.findMany();

    // 3. 게시글 데이터 생성 (5개 → 50개)
    const articleTitles = [
      '맥북 프로 사용 후기',
      '아이폰 vs 갤럭시 비교',
      '무선 이어폰 추천',
      '노이즈 캔슬링 헤드폰 리뷰',
      '스마트폰 카메라 비교',
      '태블릿 선택 가이드',
      '게이밍 노트북 추천',
      '데스크톱 vs 노트북',
      '게임 콘솔 비교',
      'VR 헤드셋 체험기',
      '모니터 구매 가이드',
      '키보드 마우스 추천',
      '외장 저장장치 선택법',
      '카메라 구매 가이드',
      '드론 촬영 팁',
      '스마트워치 비교',
      '홈 오토메이션 설정',
      '스마트 TV 추천',
      '프로젝터 설치 후기',
      '블루투스 스피커 리뷰',
      '에어프라이어 요리 레시피',
      '로봇청소기 사용 후기',
      '무선청소기 비교',
      '스마트홈 구축기',
      '보안 시스템 설치',
      '액세서리 추천',
      '노트북 쿨러 효과',
      '태블릿 거치대 추천',
      'USB 메모리 속도 비교',
      'SSD vs HDD',
      '미러리스 카메라 리뷰',
      '액션캠 추천',
      '스마트밴드 비교',
      '건강 관리 앱 추천',
      '주방 가전 추천',
      '청소기 선택 가이드',
      'TV 구매 가이드',
      '홈시어터 구성',
      '스피커 배치 팁',
      'AI 스피커 활용법',
      '스마트 전구 설정',
      '도어락 설치 후기',
      'CCTV 모니터링 팁',
      '노트북 발열 해결',
      '태블릿 활용법',
      '게이밍 기기 추천',
      '크리에이터 장비 추천',
      '비즈니스 노트북 추천',
      '학생용 태블릿 추천',
      '워크스테이션 추천',
    ];

    const articleContents = [
      '맥북 프로를 3개월간 사용해본 솔직한 후기를 공유합니다. 성능은 정말 뛰어나지만 가격이 부담스럽네요.',
      '아이폰과 갤럭시의 장단점을 객관적으로 비교해보았습니다. 각각의 장점이 명확하네요.',
      '다양한 무선 이어폰을 사용해본 경험을 바탕으로 추천드립니다. 가성비와 성능을 모두 고려했습니다.',
      '소니 WH-1000XM5와 에어팟 프로의 노이즈 캔슬링 성능을 비교해보았습니다.',
      '최신 스마트폰들의 카메라 성능을 직접 테스트해본 결과를 공유합니다.',
      '태블릿을 구매하려는 분들을 위한 상세한 가이드입니다. 용도별로 추천드립니다.',
      '게이밍에 최적화된 노트북들을 비교 분석했습니다.',
      '데스크톱과 노트북의 장단점을 비교하고 용도에 맞는 선택을 도와드립니다.',
      '플레이스테이션, 엑스박스, 닌텐도 스위치를 비교해보았습니다.',
      'VR 헤드셋을 체험해본 후기를 공유합니다. 몰입감이 정말 뛰어납니다.',
      '모니터를 구매할 때 고려해야 할 사항들을 정리했습니다.',
      '생산성 향상을 위한 키보드와 마우스 추천입니다.',
      '외장 저장장치를 선택할 때 알아야 할 정보를 정리했습니다.',
      '미러리스 카메라 구매 가이드입니다. 초보자도 쉽게 이해할 수 있습니다.',
      '드론으로 멋진 영상을 촬영하는 팁을 공유합니다.',
      '다양한 스마트워치를 비교 분석했습니다.',
      '스마트홈을 구축하는 방법을 단계별로 설명합니다.',
      '스마트 TV 구매 시 고려사항을 정리했습니다.',
      '프로젝터를 설치하고 사용한 후기를 공유합니다.',
      '블루투스 스피커의 음질과 기능을 비교했습니다.',
      '에어프라이어로 만드는 건강한 요리 레시피를 공유합니다.',
      '로봇청소기를 사용한 후기를 공유합니다. 정말 편리합니다.',
      '무선청소기들의 성능을 비교 분석했습니다.',
      '스마트홈을 구축한 경험을 공유합니다.',
      '보안 시스템을 설치하고 사용한 후기입니다.',
      '유용한 액세서리들을 추천합니다.',
      '노트북 쿨러의 효과를 테스트해보았습니다.',
      '태블릿 거치대 추천과 사용 후기를 공유합니다.',
      'USB 메모리의 속도를 비교 테스트했습니다.',
      'SSD와 HDD의 차이점과 선택 가이드를 제공합니다.',
      '미러리스 카메라를 사용한 후기를 공유합니다.',
      '액션캠 추천과 사용 팁을 정리했습니다.',
      '스마트밴드들의 기능을 비교 분석했습니다.',
      '건강 관리에 유용한 앱들을 추천합니다.',
      '주방 가전 제품 추천과 사용 후기를 공유합니다.',
      '청소기를 선택할 때 고려해야 할 사항들을 정리했습니다.',
      'TV를 구매할 때 알아야 할 정보를 제공합니다.',
      '홈시어터를 구성하는 방법을 설명합니다.',
      '스피커 배치에 대한 팁을 공유합니다.',
      'AI 스피커를 활용하는 방법을 소개합니다.',
      '스마트 전구 설정과 활용법을 설명합니다.',
      '도어락 설치 후기와 사용 경험을 공유합니다.',
      'CCTV 모니터링 팁과 추천 제품을 소개합니다.',
      '노트북 발열 문제를 해결하는 방법을 정리했습니다.',
      '태블릿을 효율적으로 활용하는 방법을 공유합니다.',
      '게이밍에 필요한 기기들을 추천합니다.',
      '크리에이터를 위한 장비 추천입니다.',
      '비즈니스용 노트북 추천과 비교 분석입니다.',
      '학생들에게 적합한 태블릿을 추천합니다.',
      '워크스테이션 구매 가이드와 추천 제품을 소개합니다.',
    ];

    const articleData = [];
    for (let i = 0; i < 50; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      articleData.push({
        title: articleTitles[i],
        content: articleContents[i],
        ownerId: randomUser.id,
      });
    }

    await prisma.article.createMany({
      data: articleData,
    });
    console.log('✅ 게시글 데이터 생성 완료 (50개)');

    // 생성된 게시글들 조회
    const createdArticles = await prisma.article.findMany();

    // 4. 상품 좋아요 데이터 생성 (6개 → 60개)
    const productLikeData = [];
    for (let i = 0; i < 60; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomProduct = createdProducts[Math.floor(Math.random() * createdProducts.length)];

      // 중복 체크 (같은 사용자가 같은 상품에 좋아요를 중복으로 누르지 않도록)
      const isDuplicate = productLikeData.some(
        (like) => like.userId === randomUser.id && like.productId === randomProduct.id,
      );

      if (!isDuplicate) {
        productLikeData.push({
          userId: randomUser.id,
          productId: randomProduct.id,
        });
      } else {
        i--; // 중복이면 다시 시도
      }
    }

    await prisma.productLike.createMany({
      data: productLikeData,
    });
    console.log('✅ 상품 좋아요 데이터 생성 완료 (60개)');

    // 5. 게시글 좋아요 데이터 생성 (6개 → 60개)
    const articleLikeData = [];
    for (let i = 0; i < 60; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomArticle = createdArticles[Math.floor(Math.random() * createdArticles.length)];

      // 중복 체크
      const isDuplicate = articleLikeData.some(
        (like) => like.userId === randomUser.id && like.articleId === randomArticle.id,
      );

      if (!isDuplicate) {
        articleLikeData.push({
          userId: randomUser.id,
          articleId: randomArticle.id,
        });
      } else {
        i--; // 중복이면 다시 시도
      }
    }

    await prisma.articleLike.createMany({
      data: articleLikeData,
    });
    console.log('✅ 게시글 좋아요 데이터 생성 완료 (60개)');

    // 6. 상품 댓글 데이터 생성 (4개 → 40개)
    const productCommentContents = [
      '정말 좋은 상품이네요! 구매를 고려해보겠습니다.',
      '가격이 좀 부담스럽지만 성능은 확실하네요.',
      '에어팟 프로 정말 추천합니다!',
      '갤럭시도 좋은 선택이네요.',
      '배송이 빨라서 좋았습니다.',
      '품질이 기대 이상입니다.',
      '가성비가 정말 좋네요.',
      '사용하기 편리합니다.',
      '디자인이 마음에 듭니다.',
      '추천합니다!',
      '만족스러운 구매였습니다.',
      '다음에도 구매하겠습니다.',
      '친구들에게 추천했어요.',
      '사용 후기 감사합니다.',
      '좋은 정보 감사합니다.',
      '구매 결정에 도움이 되었습니다.',
      '상세한 설명 감사합니다.',
      '사진이 선명하네요.',
      '빠른 답변 감사합니다.',
      '배송 상태가 좋습니다.',
      '포장이 깔끔합니다.',
      '설명서가 자세합니다.',
      'A/S가 신속합니다.',
      '고객 서비스가 좋습니다.',
      '제품이 안전하게 도착했습니다.',
      '사용법이 간단합니다.',
      '기능이 다양합니다.',
      '성능이 뛰어납니다.',
      '가격 대비 만족합니다.',
      '재구매 의사 있습니다.',
      '리뷰가 도움이 되었습니다.',
      '구매 전 참고하겠습니다.',
      '좋은 상품 감사합니다.',
      '만족스러운 품질입니다.',
      '추천하고 싶은 상품입니다.',
      '사용하기 좋습니다.',
      '디자인이 세련됩니다.',
      '기능이 충실합니다.',
      '가성비 최고입니다.',
      '구매 후 만족합니다.',
    ];

    const productCommentData = [];
    for (let i = 0; i < 40; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomProduct = createdProducts[Math.floor(Math.random() * createdProducts.length)];
      productCommentData.push({
        content: productCommentContents[i],
        ownerId: randomUser.id,
        productId: randomProduct.id,
      });
    }

    await prisma.productComment.createMany({
      data: productCommentData,
    });
    console.log('✅ 상품 댓글 데이터 생성 완료 (40개)');

    // 7. 게시글 댓글 데이터 생성 (4개 → 40개)
    const articleCommentContents = [
      '맥북 후기 정말 도움이 되었습니다!',
      '저도 맥북 사용 중인데 동감합니다.',
      '아이폰과 갤럭시 비교 정말 유용하네요.',
      '무선 이어폰 추천 감사합니다!',
      '좋은 정보 감사합니다.',
      '추천해주신 제품 구매 고려해보겠습니다.',
      '사용 후기 정말 도움이 됩니다.',
      '비교 분석이 상세하네요.',
      '다음에도 좋은 글 부탁드립니다.',
      '공감합니다!',
      '추가 정보가 궁금합니다.',
      '사진이 더 있으면 좋겠어요.',
      '실제 사용 경험이 도움이 됩니다.',
      '구매 결정에 큰 도움이 되었습니다.',
      '상세한 설명 감사합니다.',
      '비슷한 경험이 있네요.',
      '추천 감사합니다.',
      '다른 제품도 비교해주세요.',
      '가격 정보도 있으면 좋겠어요.',
      '리뷰가 정확합니다.',
      '사용 팁도 공유해주세요.',
      '좋은 글 감사합니다.',
      '추가 질문이 있습니다.',
      '구매 링크도 있으면 좋겠어요.',
      '사용 기간은 얼마나 되나요?',
      '다른 모델도 비교해주세요.',
      '가성비 정보도 부탁드립니다.',
      '사용 시 주의사항도 알려주세요.',
      '배터리 수명은 어떤가요?',
      '무게는 어떤가요?',
      '소음은 어떤가요?',
      '설치가 어렵나요?',
      '초보자도 사용하기 쉬운가요?',
      '추가 액세서리가 필요한가요?',
      'A/S는 어떤가요?',
      '배송은 얼마나 걸리나요?',
      '할인 정보도 있으면 좋겠어요.',
      '리뷰가 정말 도움이 됩니다.',
      '구매 고려 중입니다.',
      '좋은 정보 감사합니다.',
    ];

    const articleCommentData = [];
    for (let i = 0; i < 40; i++) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomArticle = createdArticles[Math.floor(Math.random() * createdArticles.length)];
      articleCommentData.push({
        content: articleCommentContents[i],
        ownerId: randomUser.id,
        articleId: randomArticle.id,
      });
    }

    await prisma.articleComment.createMany({
      data: articleCommentData,
    });
    console.log('✅ 게시글 댓글 데이터 생성 완료 (40개)');

    // 8. 상품과 게시글의 좋아요 수 업데이트
    for (const product of createdProducts) {
      const likeCount = await prisma.productLike.count({
        where: { productId: product.id },
      });
      await prisma.product.update({
        where: { id: product.id },
        data: { likeCount },
      });
    }

    for (const article of createdArticles) {
      const likeCount = await prisma.articleLike.count({
        where: { articleId: article.id },
      });
      await prisma.article.update({
        where: { id: article.id },
        data: { likeCount },
      });
    }

    console.log('✅ 좋아요 수 업데이트 완료');
    console.log('🎉 시드 데이터 생성 완료!');
  } catch (error) {
    console.error('❌ 시드 데이터 생성 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// 스크립트로 직접 실행될 때만 seedDB 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDB()
    .then(() => {
      console.log('✅ 시드 스크립트 완료');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 시드 스크립트 실패:', error);
      process.exit(1);
    });
}

export default seedDB;
