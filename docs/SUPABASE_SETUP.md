# Supabase 설정 가이드

## 1. 프로젝트 연결

Supabase Dashboard의 `Connect` 화면에서 Project URL과 Publishable key를 확인하고 `.env.local`에 입력합니다.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
```

설정 후 개발 서버를 다시 시작해야 합니다.

## 2. 데이터베이스와 Storage 생성

Supabase Dashboard에서 `SQL Editor` → `New query`로 이동한 뒤 [`supabase/schema.sql`](../supabase/schema.sql)의 전체 내용을 실행합니다.

생성되는 리소스:

- `birthday_gifts`: Box 기본 정보와 공개 설정
- `birthday_photos`: 추억 사진과 순서
- `contract_terms`: 계약 조항과 순서
- `birthday-images`: 대표·추억 사진 Storage 버킷
- 작성자 관리 및 공개 조회를 위한 RLS 정책

## 3. 관리자 계정 생성

1. `Authentication` → `Users`로 이동합니다.
2. `Add user` → `Create new user`를 선택합니다.
3. 관리자 이메일과 비밀번호를 입력합니다.
4. `Auto Confirm User`를 활성화합니다.
5. 사용자가 `Confirmed` 상태인지 확인합니다.

## 4. 연결 확인

관리자 화면에서 Box를 하나 생성한 후 다음 항목을 확인합니다.

- `Table Editor` → `birthday_gifts`
- `Table Editor` → `birthday_photos`
- `Table Editor` → `contract_terms`
- `Storage` → `birthday-images`

공개 상태로 저장한 Box는 로그아웃 또는 시크릿 창에서 `/gift/:publicId`로 조회할 수 있어야 합니다.

## 보안 원칙

- Publishable key는 RLS와 함께 브라우저에서 사용할 수 있습니다.
- Secret key와 `service_role` key는 프론트엔드에 노출하지 않습니다.
- 공개되지 않은 Box는 익명 사용자가 조회할 수 없어야 합니다.
- 이미지 경로의 첫 디렉터리는 로그인한 사용자의 UUID를 사용합니다.
