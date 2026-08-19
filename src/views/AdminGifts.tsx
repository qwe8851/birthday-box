import{useEffect}from'react'
import{Link,useNavigate}from'react-router-dom'
import{useGifts}from'../stores/gifts'
import{useAuth}from'../stores/auth'
import{demoGift}from'../data/demo'
import{shareGiftToKakao}from'../lib/kakao'

export default function AdminGifts(){
 const{gifts,remove,fetchMine,loading,error}=useGifts(),signOut=useAuth(s=>s.signOut),nav=useNavigate()
 useEffect(()=>{void fetchMine()},[fetchMine])
 return <main className="admin-shell">
  <header className="admin-header"><Link to="/admin/gifts" className="logo">🎁 <b>Birthday Box</b></Link><button className="icon-btn" onClick={async()=>{await signOut();nav('/login')}}>로그아웃</button></header>
  <section className="admin-content"><div className="page-heading"><div><p className="eyebrow">MY BOXES</p><h1>친구를 웃게 할<br/>선물을 준비해요</h1><p className="muted">만든 Birthday Box를 한곳에서 관리하세요.</p></div><Link className="btn primary" to="/admin/gifts/new">＋ 새 Box 만들기</Link></div>
  {loading&&<div className="empty">Birthday Box를 불러오는 중...</div>}{error&&<div className="empty error">{error}</div>}{!loading&&!error&&!gifts.length&&<div className="empty">아직 만든 Birthday Box가 없어요.</div>}
  <div className="gift-grid">{gifts.map(g=><article className="gift-card" key={g.id}><div className="cover"><img src={g.coverImage||demoGift.coverImage} alt=""/><span className={`status ${g.isPublished?'on':''}`}>{g.isPublished?'공개':'비공개'}</span></div><div className="gift-info"><p className="eyebrow">{g.birthday}</p><h2>{g.recipientName}의 Birthday Box</h2><p className="muted">{new Date(g.createdAt).toLocaleDateString('ko-KR')} 생성</p><div className="card-actions"><Link className="btn small soft" to={`/gift/${g.publicId}`}>미리보기</Link><Link className="btn small soft" to={`/admin/gifts/${g.id}/edit`}>수정</Link><button className="btn small soft" onClick={()=>navigator.clipboard.writeText(`${location.origin}/gift/${g.publicId}`)}>링크 복사</button><button className="btn small kakao" onClick={async()=>{if(!g.isPublished)return alert('공개 상태로 변경한 뒤 공유해 주세요.');try{await shareGiftToKakao(g)}catch(e){alert(e instanceof Error?e.message:'카카오톡 공유에 실패했습니다.')}}}>카카오톡 공유</button><button className="text-btn danger" onClick={async()=>{if(confirm('정말 삭제할까요?'))await remove(g)}}>삭제</button></div></div></article>)}</div></section>
 </main>
}
