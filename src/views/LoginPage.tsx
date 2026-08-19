import { FormEvent, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../stores/auth'
import SiteFooter from '../components/SiteFooter'
export default function LoginPage() {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [error, setError] = useState(''),
    signIn = useAuth(s => s.signIn),
    nav = useNavigate(),
    [params] = useSearchParams()
  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await signIn(email, password)
      nav('/admin/gifts')
    } catch (x) {
      const message = (x as Error).message
      setError(
        message.toLowerCase().includes('email not confirmed')
          ? '이메일 인증을 완료한 뒤 로그인해 주세요.'
          : message,
      )
    }
  }
  return (
    <main className="auth-page">
      <header className="admin-header auth-header">
        <Link className="logo" to="/login">
          🎁 <b>Event Box</b>
        </Link>
        <Link to="/release-notes">릴리즈 노트</Link>
      </header>
      <div className="auth-main">
        <section className="auth-card">
          <div className="brand-mark">🎁</div>
          <p className="eyebrow">EVENT BOX</p>
          <h1>다시 만나서 반가워요</h1>
          <p className="muted">소중한 사람을 위한 특별한 이벤트를 준비해볼까요?</p>
          {params.get('verified') && (
            <p className="success">이메일 인증이 완료되었습니다. 로그인해 주세요.</p>
          )}
          <form onSubmit={submit}>
            <label>
              이메일
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </label>
            <label>
              비밀번호
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </label>
            {error && <p className="error">{error}</p>}
            <button className="btn primary wide" type="submit">
              로그인
            </button>
          </form>
          <p className="auth-switch">
            처음이신가요? <Link to="/signup">회원가입</Link>
          </p>
          <p className="auth-meta">
            <Link to="/release-notes">릴리즈 노트</Link> ·{' '}
            <a href="mailto:dgh07027@gmail.com?subject=%5BEvent%20Box%5D%20문의">문의하기</a>
          </p>
        </section>
      </div>
      <SiteFooter />
    </main>
  )
}
