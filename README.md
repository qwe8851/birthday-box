# Birthday Box

친구를 위한 개인화 생일 장난 페이지를 만들고 고유 링크로 공유하는 모바일 우선 웹서비스입니다.

관리자가 친구 이름, 생일, 사진, 편지와 계약 조항을 작성하면 공개 URL이 생성됩니다. 친구는 링크에 접속해 생일을 입력한 뒤 선물 수령 인터랙션, 친구 계약서, 추억 사진과 편지를 확인할 수 있습니다.

## 주요 기능

- Supabase 이메일·비밀번호 관리자 로그인
- Birthday Box 생성, 목록 조회, 수정 및 삭제
- Supabase Database 영구 저장 및 Storage 이미지 업로드
- 공개 여부와 랜덤 `publicId` 기반 공유 URL
- 생일 일치 여부 확인
- 움직이는 거절 버튼과 단계별 장난 인터랙션
- 계약서, Confetti, Polaroid 사진 및 생일 편지
- 모바일 Safe Area와 반응형 레이아웃

## 기술 구성

React 19, TypeScript, Vite, React Router, Zustand, Supabase Auth/Database/Storage를 사용합니다.

## 로컬 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
VITE_KAKAO_JAVASCRIPT_KEY=
```

## 주요 경로

| 경로 | 용도 |
| --- | --- |
| `/login` | 관리자 로그인 |
| `/admin/gifts` | Birthday Box 목록 |
| `/admin/gifts/new` | 새 Box 생성 |
| `/admin/gifts/:id/edit` | Box 수정 |
| `/gift/:publicId` | 친구에게 공유하는 공개 페이지 |

## 빌드

```bash
npm run build
npm run preview
```

Supabase 프로젝트 설정은 [Supabase 설정 가이드](docs/SUPABASE_SETUP.md)를 참고하세요.

운영 서버 배포는 [Vercel 배포 가이드](docs/DEPLOYMENT.md)를 참고하세요.

## 주의사항

- `.env.local`은 Git에 커밋하지 않습니다.
- 프론트엔드에는 Publishable key만 사용합니다.
- Secret key와 `service_role` key를 브라우저 코드에 넣으면 안 됩니다.
- 현재 생일 비교는 사용자 흐름을 위한 프론트엔드 검증입니다. 강한 접근 통제가 필요하다면 Supabase RPC에서 생일을 검증한 뒤 공개 데이터를 반환하도록 확장해야 합니다.
