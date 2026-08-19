import{FormEvent,useState}from'react'
import{Link}from'react-router-dom'
import{useAuth}from'../stores/auth'

const passwordRule=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,72}$/

export default function SignUpPage(){
 const[email,setEmail]=useState(''),[password,setPassword]=useState(''),[confirm,setConfirm]=useState(''),[error,setError]=useState(''),[sent,setSent]=useState(false),[loading,setLoading]=useState(false),signUp=useAuth(s=>s.signUp)
 async function submit(e:FormEvent){e.preventDefault();setError('');if(!passwordRule.test(password)){setError('비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 모두 포함해야 합니다.');return}if(password!==confirm){setError('비밀번호 확인이 일치하지 않습니다.');return}setLoading(true);try{await signUp(email,password);setSent(true)}catch(x){setError((x as Error).message)}finally{setLoading(false)}}
 return <main className="auth-page"><section className="auth-card"><div className="brand-mark">🎁</div><p className="eyebrow">JOIN BIRTHDAY BOX</p>{sent?<><h1>인증 메일을 보냈어요</h1><p className="muted"><b>{email}</b><br/>메일함에서 인증 링크를 누른 뒤 로그인해 주세요.<br/>보이지 않으면 스팸 메일함도 확인해 주세요.</p><Link className="btn primary wide" to="/login">로그인 화면으로</Link></>:<><h1>새 계정 만들기</h1><p className="muted">이메일 인증 후 Birthday Box를 만들 수 있어요.</p><form onSubmit={submit}><label>이메일<input value={email} onChange={e=>setEmail(e.target.value)} type="email" autoComplete="email" required/></label><label>비밀번호<input value={password} onChange={e=>setPassword(e.target.value)} type="password" autoComplete="new-password" required/><small>8자 이상 · 영문 · 숫자 · 특수문자 포함</small></label><label>비밀번호 확인<input value={confirm} onChange={e=>setConfirm(e.target.value)} type="password" autoComplete="new-password" required/></label>{error&&<p className="error">{error}</p>}<button className="btn primary wide" disabled={loading}>{loading?'가입 중...':'인증 메일 받고 가입하기'}</button></form><p className="auth-switch">이미 계정이 있나요? <Link to="/login">로그인</Link></p></>}</section></main>
}
