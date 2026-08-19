import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'
export default function ReleaseNotes() {
  return (
    <main className="release-page">
      <header className="admin-header">
        <Link to="/" className="logo">
          🎁 <b>Event Box</b>
        </Link>
        <Link to="/login" className="btn ghost small">
          로그인
        </Link>
      </header>
      <article className="release-content">
        <p className="eyebrow">RELEASE NOTES</p>
        <h1>Event Box 업데이트</h1>
        <section>
          <time>2026.08 · Version 1.0</time>
          <h2>첫 번째 Event Box를 공개했어요</h2>
          <ul>
            <li>생일·기념일·축하·감사·응원 이벤트 제작</li>
            <li>이벤트별 8가지 대표 색상 설정</li>
            <li>사진과 문구, 편지, 계약서로 만드는 맞춤 페이지</li>
            <li>고유 링크 및 카카오톡 공유 지원</li>
          </ul>
        </section>
      </article>
      <SiteFooter />
    </main>
  )
}
