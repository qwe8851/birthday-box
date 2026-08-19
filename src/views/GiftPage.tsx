import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'react-router-dom'
import { useGifts } from '../stores/gifts'
import { eventOption, themeOption } from '../lib/event'
import SiteFooter from '../components/SiteFooter'
import type { BirthdayGift, GiftStep } from '../types'
type P = { gift: BirthdayGift; next: (s: GiftStep) => void }
export default function GiftPage() {
  const { publicId } = useParams(),
    { fetchPublic, loading } = useGifts(),
    [gift, setGift] = useState<BirthdayGift>(),
    [error, setError] = useState(''),
    [step, setStep] = useState<GiftStep>('landing'),
    [progress, setProgress] = useState(0),
    [rejects, setRejects] = useState(0),
    [celebrate, setCelebrate] = useState(
      () => new URLSearchParams(location.search).get('celebrate') === '1',
    )
  useEffect(() => {
    fetchPublic(publicId!)
      .then(g => (g ? setGift(g) : setError('이 Event Box는 존재하지 않거나 비공개예요.')))
      .catch(() => setError('이벤트를 불러오지 못했어요.'))
  }, [publicId, fetchPublic])
  useEffect(() => {
    if (!celebrate) return
    const timer = setTimeout(() => setCelebrate(false), 4500)
    return () => clearTimeout(timer)
  }, [celebrate])
  function next(s: GiftStep) {
    setStep(s)
    scrollTo({ top: 0, behavior: 'smooth' })
    if (s === 'loading')
      [0, 37, 68, 99, 100].forEach((n, i) =>
        setTimeout(() => {
          setProgress(n)
          if (n === 100) setTimeout(() => setStep('gift-reveal'), 600)
        }, [100, 700, 1400, 2100, 3300][i]),
      )
  }
  if (loading)
    return (
      <main className="stage">
        <div className="loader" />
      </main>
    )
  if (error)
    return (
      <main className="stage">
        <div className="big-icon">📭</div>
        <h1>이벤트를 찾지 못했어요</h1>
        <p>{error}</p>
      </main>
    )
  if (!gift) return null
  const common = { gift, next } as const,
    theme = themeOption(gift.themeColor)
  return (
    <main
      className="gift-page"
      style={
        {
          '--pink': theme.color,
          '--pink2': theme.accent,
          '--theme-soft': theme.soft,
          '--theme-bg': theme.background,
        } as React.CSSProperties
      }
    >
      {celebrate && <ShareCelebration gift={gift} />}{' '}
      {step === 'landing' && <Landing {...common} />}{' '}
      {step === 'recipient-check' && <Check {...common} />}{' '}
      {step === 'loading' && <Loading gift={gift} progress={progress} />}{' '}
      {step === 'gift-reveal' && (
        <Reveal {...common} rejects={rejects} reject={() => setRejects(n => n + 1)} />
      )}{' '}
      {step === 'contract-complete' && <Complete {...common} />}{' '}
      {step === 'contract' && <Contract {...common} />}{' '}
      {step === 'birthday' && <Finale gift={gift} />}
    </main>
  )
}
function ShareCelebration({ gift }: { gift: BirthdayGift }) {
  const event = eventOption(gift.eventType)
  return (
    <div className="share-celebration" role="status">
      <div className="confetti" aria-hidden>
        {Array.from({ length: 70 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 29) % 100}%`,
              background: ['#ff5e79', '#ffd35a', '#6ed6ba', '#9d83ff'][i % 4],
              animationDelay: `${(i % 15) / 12}s`,
            }}
          />
        ))}
      </div>
      <strong>
        {event.emoji} {gift.recipientName}님에게 {event.label} 이벤트가 도착했어요!
      </strong>
    </div>
  )
}
function Landing({ gift, next }: P) {
  const event = eventOption(gift.eventType)
  return (
    <section className="stage landing">
      <div className="orb one" />
      <div className="orb two" />
      <p className="service-badge">EVENT BOX</p>
      <div className="gift-hero">{event.emoji}</div>
      <p className="eyebrow">A SPECIAL EVENT FOR YOU</p>
      <h1>
        <em>{gift.recipientName}</em>님에게
        <br />
        {event.title}이<br />
        도착했어요!
      </h1>
      <p className="muted">
        누군가 정성껏 준비한 이벤트예요.
        <br />
        지금 바로 확인해 보세요.
      </p>
      <button className="btn primary gift-btn" onClick={() => next('recipient-check')}>
        이벤트 확인하기 →
      </button>
    </section>
  )
}
function Check({ gift, next }: P) {
  const [date, setDate] = useState(''),
    [message, setMessage] = useState(''),
    event = eventOption(gift.eventType)
  function verify() {
    if (!date) {
      setMessage(`${event.dateLabel}을 선택해 주세요.`)
      return
    }
    if (date !== gift.birthday) {
      setMessage(`${event.dateLabel}이 일치하지 않아요. 다시 확인해 주세요.`)
      return
    }
    setMessage('')
    next('loading')
  }
  return (
    <section className="stage">
      <button className="back" onClick={() => next('landing')}>
        ←
      </button>
      <div className="big-icon bob">👋</div>
      <p className="eyebrow">RECIPIENT CHECK</p>
      <h1>잠깐, 본인 확인할게요</h1>
      <div className="question-card">
        <span>이벤트 수령 대상자</span>
        <strong>{gift.recipientName}님이 맞으신가요?</strong>
        <label className="birthday-password">
          {event.dateLabel}을 선택해 주세요
          <input
            type="date"
            value={date}
            onChange={e => {
              setDate(e.target.value)
              setMessage('')
            }}
            max="9999-12-31"
            aria-describedby="event-date-error"
          />
        </label>
        {message && (
          <p id="event-date-error" className="verify-error" role="alert">
            {message}
          </p>
        )}
      </div>
      <button className="btn primary gift-btn" onClick={verify}>
        본인 확인하고 이벤트 보기
      </button>
      <p className="lock">🔒 선택한 날짜는 본인 확인에만 사용됩니다.</p>
    </section>
  )
}
function Loading({ gift, progress }: { gift: BirthdayGift; progress: number }) {
  return (
    <section className="stage">
      <div className="scan">
        <span>🎁</span>
        <i />
      </div>
      <p className="eyebrow">SEARCHING GIFT</p>
      <h1>
        {gift.recipientName}님의 선물을
        <br />
        확인하고 있어요...
      </h1>
      <div className="progress-wrap">
        <div className="progress-label">
          <span>선물 조회 중</span>
          <b>{progress}%</b>
        </div>
        <div className="progress">
          <i style={{ width: `${progress}%` }} />
        </div>
        <p>
          {progress === 99
            ? '거의 다 찾았어요! 조금만 기다려 주세요 👀'
            : progress === 100
              ? '🎉 선물을 찾았습니다!'
              : ''}
        </p>
      </div>
    </section>
  )
}
function Reveal({ gift, next, rejects, reject }: P & { rejects: number; reject: () => void }) {
  const event = eventOption(gift.eventType)
  const words = [
    '정말 거절할 거야? 🥺',
    '거절하지 마...',
    '선물 받아줘!',
    '이 마음을 받아줘 💗',
    '한 번만 다시 생각해 봐',
    '이 버튼은 잡을 수 없지 😝',
    '수령하기가 더 쉬울걸?',
    '제발 받아줘 🎁',
  ]
  return (
    <>
      <section className="stage reveal">
        <div className="spark">✦</div>
        <p className="eyebrow">{event.revealEyebrow}</p>
        <h1>
          {gift.recipientName}님, {event.revealTitle}!
        </h1>
        <p>{event.revealIntro}</p>
        <article className="ticket">
          <div className="ticket-top">
            <span>{event.emoji}</span>
            <small>{event.ticketLabel}</small>
            <h2>{gift.gift.title}</h2>
          </div>
          <div className="price">
            <del>₩{gift.gift.originalPrice.toLocaleString()}</del>
            <strong>₩{gift.gift.salePrice.toLocaleString()}</strong>
            <span>{event.priceLabel}</span>
          </div>
          <dl>
            <div>
              <dt>유효기간</dt>
              <dd>{gift.gift.validity}</dd>
            </div>
            <div>
              <dt>양도</dt>
              <dd>불가능</dd>
            </div>
            <div>
              <dt>환불</dt>
              <dd>불가능</dd>
            </div>
          </dl>
          <div className="barcode">|||| ||| || |||| ||| |</div>
        </article>
        <div className="reveal-actions">
          <p className="reject-message" aria-live="polite">
            {rejects ? words[(rejects - 1) % words.length] : ''}
          </p>
          <button className="btn primary gift-btn" onClick={() => next('contract-complete')}>
            수령하기
          </button>
          {!rejects && <RunawayButton reject={reject} count={0} />}
        </div>
      </section>
      {rejects > 0 &&
        createPortal(<RunawayButton reject={reject} count={rejects} />, document.body)}
    </>
  )
}
function RunawayButton({ reject, count }: { reject: () => void; count: number }) {
  const seed = count || 1,
    random = (salt: number) => {
      const x = Math.sin(seed * 999 + salt * 77) * 43758.5453
      return x - Math.floor(x)
    },
    x = 16 + random(1) * 68,
    y = 8 + random(2) * 84,
    scale = 0.5 + random(3) * 0.7,
    opacity = 0.28 + random(4) * 0.72,
    rotation = -35 + random(5) * 70,
    hue = Math.floor(random(6) * 35)
  const escape = (e: React.SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    reject()
  }
  return (
    <button
      type="button"
      className={`btn ghost reject runaway ${count ? 'is-running' : ''}`}
      style={
        count
          ? {
              left: `${x}vw`,
              top: `${y}dvh`,
              opacity,
              transform: `translate(-50%,-50%) scale(${scale}) rotate(${rotation}deg)`,
              backgroundColor: `hsla(${hue},100%,97%,.82)`,
              borderRadius: `${10 + random(7) * 26}px`,
              filter: `saturate(${0.7 + random(8)}) blur(${random(9) > 0.86 ? 1 : 0}px)`,
            }
          : undefined
      }
      onMouseEnter={escape}
      onPointerEnter={escape}
      onPointerDown={escape}
      onTouchStart={escape}
      onFocus={escape}
      onClick={escape}
    >
      거절하기
    </button>
  )
}
function Complete({ gift, next }: P) {
  const event = eventOption(gift.eventType)
  return (
    <section className="stage">
      <div className="checkmark">✓</div>
      <p className="eyebrow">CONTRACT COMPLETE</p>
      <h1>계약이 완료되었습니다!</h1>
      <p className="muted">{event.completeMessage}</p>
      <div className="summary">
        <div>
          <span>계약기간</span>
          <b>{gift.gift.validity}</b>
        </div>
        <div>
          <span>중도해지</span>
          <b>불가능</b>
        </div>
        <div>
          <span>환불</span>
          <b>불가능</b>
        </div>
        <div>
          <span>고객센터</span>
          <b>{gift.creatorName}</b>
        </div>
      </div>
      <button className="btn primary gift-btn" onClick={() => next('contract')}>
        계약서 확인하기
      </button>
    </section>
  )
}
function Contract({ gift, next }: P) {
  const event = eventOption(gift.eventType)
  return (
    <section className="stage contract-stage">
      <p className="eyebrow">OFFICIAL DOCUMENT</p>
      <article className="paper">
        <div className="paper-head">
          <span>📃</span>
          <h1>{event.contractTitle}</h1>
          <p>{event.contractDescription}</p>
        </div>
        <ol>
          {gift.contractTerms.map((t, i) => (
            <li key={t.id}>
              <b>제 {i + 1}조</b>
              <span>{t.content}</span>
            </li>
          ))}
        </ol>
        <div className="sign">
          <small>계약자</small>
          <strong>
            {gift.recipientName} <span>🤝</span> {gift.creatorName}
          </strong>
          <p>{new Date().toLocaleDateString('ko-KR')}</p>
        </div>
        <div className="stamp">
          {event.stamp.split('\n').map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </div>
      </article>
      <button className="btn primary gift-btn" onClick={() => next('birthday')}>
        계약 완료
      </button>
    </section>
  )
}
function Finale({ gift }: { gift: BirthdayGift }) {
  const confetti = Array.from({ length: 45 }),
    event = eventOption(gift.eventType)
  return (
    <section className="finale">
      <div className="confetti" aria-hidden>
        {confetti.map((_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              background: ['var(--pink)', '#ffcf5c', '#7dd3c7', '#b99cff'][i % 4],
              animationDelay: `${(i % 12) / 8}s`,
            }}
          />
        ))}
      </div>
      <div className="finale-hero">
        <p className="eyebrow">SURPRISE!</p>
        <div className="cake">{event.emoji}</div>
        <h1>
          {event.label.toUpperCase()}
          <br />
          <em>{gift.recipientName}</em>
        </h1>
        <span>우리의 추억을 내려서 확인해 봐 ↓</span>
      </div>
      <div className="memories">
        <p className="eyebrow">OUR MEMORIES</p>
        <h2>{event.memoryTitle}</h2>
        {gift.photos.map((p, i) => (
          <figure key={p.id} className={i % 2 ? 'tilt-right' : 'tilt-left'}>
            <img src={p.url} loading="lazy" alt={`${gift.recipientName}님과의 추억 ${i + 1}`} />
            <figcaption>
              {p.caption || event.photoCaptions[i % event.photoCaptions.length]}
            </figcaption>
          </figure>
        ))}
      </div>
      <article className="letter">
        <div className="envelope">💌</div>
        <p className="eyebrow">A LETTER FOR YOU</p>
        <h2>To. {gift.recipientName}</h2>
        <p>{gift.letter}</p>
        <div className="letter-end">
          {event.letterEnd}
          <br />
          <strong>{event.emoji} 💗</strong>
        </div>
      </article>
      <SiteFooter />
    </section>
  )
}
