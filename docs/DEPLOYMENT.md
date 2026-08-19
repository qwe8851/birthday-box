# Vercel 배포 가이드

## 1. GitHub 저장소 연결

1. Vercel에 로그인합니다.
2. `Add New` → `Project`를 선택합니다.
3. GitHub의 `qwe8851/birthday-box` 저장소를 Import합니다.
4. Framework Preset이 `Vite`인지 확인합니다.

## 2. 환경변수 등록

Vercel 프로젝트의 Environment Variables에 다음 값을 등록합니다.

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

각 값은 로컬 `.env.local`과 동일하게 입력하고 Production, Preview, Development 환경에 적용합니다. `VITE_KAKAO_JAVASCRIPT_KEY`는 카카오 공유를 연결할 때 추가합니다.

## 3. 배포

Build Command와 Output Directory는 Vite 기본값을 사용합니다.

```text
Build Command: npm run build
Output Directory: dist
```

`Deploy`를 누르면 Vercel 도메인이 발급됩니다. 이후 `main` 브랜치에 푸시할 때마다 운영 사이트가 자동 배포됩니다.

## 4. Supabase 운영 URL 등록

Supabase Dashboard의 `Authentication` → `URL Configuration`에서 다음 값을 설정합니다.

```text
Site URL: https://발급된도메인.vercel.app
Redirect URLs: https://발급된도메인.vercel.app/**
```

로컬 개발을 유지하려면 `http://localhost:5173/**`도 Redirect URLs에 추가합니다.

## 5. 검증

- `/login`에서 관리자 로그인이 되는지 확인합니다.
- Box를 공개 상태로 저장합니다.
- `/gift/:publicId` 주소를 시크릿 창에서 직접 엽니다.
- 주소를 새로고침해도 404가 발생하지 않는지 확인합니다.
- 모바일 카카오톡 인앱 브라우저에서 링크를 확인합니다.
