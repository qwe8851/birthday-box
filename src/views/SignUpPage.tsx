import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../stores/auth'
import SiteFooter from '../components/SiteFooter'
const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,72}$/
export default function SignUpPage() {
  const [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirm, setConfirm] = useState(''),
    [error, setError] = useState(''),
    [sent, setSent] = useState(false),
    [loading, setLoading] = useState(false),
    signUp = useAuth(s => s.signUp)
  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (name.trim().length < 2) {
      setError('이름은 2자 이상 입력해 주세요.')
      return
    }
    if (!passwordRule.test(password)) {
      setError('비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 모두 포함해야 합니다.')
      return
    }
    if (password !== confirm) {
      setError('비밀번호 확인이 일치하지 않습니다.')
      return
    }
    setLoading(true)
    try {
      await signUp(name, email, password)
      setSent(true)
    } catch (x) {
      setError((x as Error).message)
    } finally {
      setLoading(false)
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
          <p className="eyebrow">JOIN EVENT BOX</p>
          {sent ? (
            <>
              <h1>인증 메일을 보냈어요</h1>
              <p className="muted">
                <b>{name}님</b>, 가입을 완료하려면
                <br />
                <b>{email}</b>
                <br />
                메일함에서 인증 링크를 눌러 주세요.
                <br />
                보이지 않으면 스팸 메일함도 확인해 주세요.
              </p>
              <Link className="btn primary wide" to="/login">
                로그인 화면으로
              </Link>
            </>
          ) : (
            <>
              <h1>새 계정 만들기</h1>
              <p className="muted">이메일 인증 후 Event Box를 만들 수 있어요.</p>
              <form onSubmit={submit}>
                <label>
                  이름
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    name="name"
                    maxLength={30}
                    autoComplete="name"
                    placeholder="예: 승희"
                    required
                  />
                </label>
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
                    name="new-password"
                    autoComplete="new-password"
                    required
                  />
                  <small>8자 이상 · 영문 · 숫자 · 특수문자 포함</small>
                </label>
                <label>
                  비밀번호 확인
                  <input
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    type="password"
                    name="confirm-password"
                    autoComplete="new-password"
                    required
                  />
                </label>
                {error && <p className="error">{error}</p>}
                <button className="btn primary wide" type="submit" disabled={loading}>
                  {loading ? '가입 중...' : '인증 메일 받고 가입하기'}
                </button>
              </form>
              <p className="auth-switch">
                이미 계정이 있나요? <Link to="/login">로그인</Link>
              </p>
            </>
          )}
        </section>
      </div>
      <SiteFooter />
    </main>
  )
}
