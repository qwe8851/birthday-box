import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGifts } from '../stores/gifts'
import { DEFAULT_COVER_IMAGE, demoGift } from '../data/demo'
import type { BirthdayGift } from '../types'
import { normalizeImage } from '../lib/images'
import { useAuth } from '../stores/auth'
import { EVENT_OPTIONS, THEME_OPTIONS, eventOption, themeOption } from '../lib/event'
import SiteFooter from '../components/SiteFooter'
export default function GiftEditor() {
  const { id } = useParams(),
    { gifts, save, loading } = useGifts(),
    nav = useNavigate(),
    existing = gifts.find(g => g.id === id),
    user = useAuth(s => s.user),
    creatorName = user?.user_metadata?.name?.trim() || user?.email?.split('@')[0] || '보낸 사람'
  const defaultTerms = (type: BirthdayGift['eventType'] = 'birthday') =>
    eventOption(type).defaultTerms.map((content, i) => ({
      id: crypto.randomUUID(),
      content,
      sortOrder: i,
    }))
  const [form, setForm] = useState<BirthdayGift>(() =>
      structuredClone(
        existing
          ? {
              ...existing,
              creatorName:
                existing.creatorName === '보낸 사람' ? creatorName : existing.creatorName,
              gift: {
                ...existing.gift,
                customerService:
                  existing.creatorName === '보낸 사람' ? creatorName : existing.creatorName,
              },
              contractTerms: existing.contractTerms.length
                ? existing.contractTerms
                : defaultTerms(existing.eventType),
            }
          : {
              ...demoGift,
              id: crypto.randomUUID(),
              publicId: crypto.randomUUID().replaceAll('-', '').slice(0, 12),
              recipientName: '',
              creatorName,
              birthday: '',
              coverImage: DEFAULT_COVER_IMAGE,
              photos: [],
              letter: eventOption('birthday').defaultLetter,
              gift: { ...demoGift.gift, customerService: creatorName },
              contractTerms: defaultTerms(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
      ),
    ),
    [preview, setPreview] = useState(false),
    [coverFile, setCoverFile] = useState<File | null>(null),
    [photoFiles] = useState(() => new Map<string, File>()),
    [error, setError] = useState('')
  const patch = (p: Partial<BirthdayGift>) => setForm(f => ({ ...f, ...p }))
  async function files(e: ChangeEvent<HTMLInputElement>, cover = false) {
    if (!e.target.files) return
    setError('')
    try {
      const selected = await Promise.all([...e.target.files].map(normalizeImage))
      if (cover) {
        const file = selected[0]
        setCoverFile(file)
        patch({ coverImage: URL.createObjectURL(file) })
      } else {
        setForm(current => {
          const added = selected.map((file, index) => {
            const id = crypto.randomUUID(),
              sortOrder = current.photos.length + index
            photoFiles.set(id, file)
            return {
              id,
              url: URL.createObjectURL(file),
              caption: eventOption(current.eventType).photoCaptions[
                sortOrder % eventOption(current.eventType).photoCaptions.length
              ],
              sortOrder,
            }
          })
          return { ...current, photos: [...current.photos, ...added] }
        })
      }
    } catch {
      setError('HEIC 사진을 변환하지 못했습니다. 다른 사진을 선택하거나 JPEG로 변환해 주세요.')
    } finally {
      e.target.value = ''
    }
  }
  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await save({ ...form, updatedAt: new Date().toISOString() }, coverFile, photoFiles)
      nav('/admin/gifts')
    } catch (x) {
      setError((x as Error).message)
    }
  }
  return (
    <main className="admin-shell">
      <header className="admin-header">
        <Link to="/admin/gifts" className="logo">
          ← <b>Event Box</b>
        </Link>
        <span className="muted">{existing ? 'Box 수정' : '새 Box 만들기'}</span>
      </header>
      <div className="editor-layout">
        <form className="editor" onSubmit={submit}>
          <div className="editor-title">
            <p className="eyebrow">EVENT BOX MAKER</p>
            <h1>{existing ? '이벤트를 다듬어볼까요?' : '누구를 위한 이벤트인가요?'}</h1>
          </div>
          <section className="form-section">
            <h2>
              <span>01</span> 이벤트 설정
            </h2>
            <label>
              이벤트 종류
              <select
                name="eventType"
                value={form.eventType}
                onChange={e => {
                  const eventType = e.target.value as BirthdayGift['eventType'],
                    selected = eventOption(eventType)
                  patch({
                    eventType,
                    letter: selected.defaultLetter,
                    gift: { ...form.gift, title: selected.defaultGiftTitle },
                    contractTerms: defaultTerms(eventType),
                    photos: form.photos.map((photo, index) => ({
                      ...photo,
                      caption: selected.photoCaptions[index % selected.photoCaptions.length],
                    })),
                  })
                }}
              >
                {EVENT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.emoji} {option.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="theme-picker">
              <b>대표 색상</b>
              <p>이 이벤트에만 적용되며 서비스 기본 색상은 핑크예요.</p>
              <div>
                {THEME_OPTIONS.map(option => (
                  <button
                    type="button"
                    key={option.value}
                    className={form.themeColor === option.value ? 'selected' : ''}
                    onClick={() => patch({ themeColor: option.value })}
                    aria-label={`${option.label} 테마`}
                  >
                    <i style={{ background: option.color }} />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="two-col">
              <label>
                받는 사람 이름
                <input
                  type="text"
                  name="recipientName"
                  autoComplete="name"
                  value={form.recipientName}
                  onChange={e => patch({ recipientName: e.target.value })}
                  placeholder="예: 햄니"
                  required
                />
              </label>
              <label>
                {eventOption(form.eventType).dateLabel}
                <input
                  name="eventDate"
                  value={form.birthday}
                  onChange={e => patch({ birthday: e.target.value })}
                  type="date"
                  required
                />
              </label>
            </div>
            <label className="upload">
              <input type="file" accept="image/*,.heic,.heif" onChange={e => void files(e, true)} />
              {form.coverImage ? (
                <img src={form.coverImage} />
              ) : (
                <span>＋ 대표 사진을 선택해 주세요 (선택)</span>
              )}
            </label>
          </section>
          <section className="form-section">
            <h2>
              <span>02</span> 추억 사진
            </h2>
            <div className="photo-row">
              {form.photos.map((p, i) => (
                <div className="photo-item" key={p.id}>
                  <div className="thumb">
                    <img src={p.url} />
                    <button
                      type="button"
                      aria-label="사진 삭제"
                      onClick={() => {
                        photoFiles.delete(p.id)
                        patch({ photos: form.photos.filter((_, n) => n !== i) })
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <input
                    type="text"
                    name={`photoCaption-${i}`}
                    autoComplete="off"
                    value={p.caption}
                    maxLength={120}
                    aria-label={`${i + 1}번째 사진 문구`}
                    placeholder="사진에 어울리는 문구"
                    onChange={e =>
                      patch({
                        photos: form.photos.map((photo, n) =>
                          n === i ? { ...photo, caption: e.target.value } : photo,
                        ),
                      })
                    }
                  />
                </div>
              ))}
              <label className="add-photo">
                ＋
                <input
                  type="file"
                  multiple
                  accept="image/*,.heic,.heif"
                  onChange={e => void files(e)}
                />
              </label>
            </div>
          </section>
          <section className="form-section">
            <h2>
              <span>03</span> {eventOption(form.eventType).letterLabel}
            </h2>
            <textarea
              name="letter"
              autoComplete="off"
              value={form.letter}
              onChange={e => patch({ letter: e.target.value })}
              rows={6}
              placeholder="친구에게 전할 진심을 적어주세요."
              required
            />
          </section>
          <section className="form-section">
            <h2>
              <span>04</span> 장난 이용권
            </h2>
            <label>
              이용권 이름
              <input
                type="text"
                name="giftTitle"
                autoComplete="off"
                value={form.gift.title}
                onChange={e => patch({ gift: { ...form.gift, title: e.target.value } })}
                required
              />
            </label>
            <div className="two-col">
              <label>
                정상가
                <input
                  name="originalPrice"
                  value={form.gift.originalPrice}
                  onChange={e => patch({ gift: { ...form.gift, originalPrice: +e.target.value } })}
                  type="number"
                />
              </label>
              <label>
                유효기간
                <input
                  type="text"
                  name="validity"
                  autoComplete="off"
                  value={form.gift.validity}
                  onChange={e => patch({ gift: { ...form.gift, validity: e.target.value } })}
                />
              </label>
            </div>
          </section>
          <section className="form-section">
            <div className="section-head">
              <h2>
                <span>05</span> 계약 조항
              </h2>
              <div className="section-actions">
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => patch({ contractTerms: defaultTerms(form.eventType) })}
                >
                  기본 조항 불러오기
                </button>
                <button
                  type="button"
                  className="text-btn"
                  onClick={() =>
                    patch({
                      contractTerms: [
                        ...form.contractTerms,
                        {
                          id: crypto.randomUUID(),
                          content: '',
                          sortOrder: form.contractTerms.length,
                        },
                      ],
                    })
                  }
                >
                  ＋ 조항 추가
                </button>
              </div>
            </div>
            {form.contractTerms.map((t, i) => (
              <div className="term-input" key={t.id}>
                <b>{i + 1}</b>
                <input
                  type="text"
                  name={`contractTerm-${i}`}
                  autoComplete="off"
                  value={t.content}
                  onChange={e =>
                    patch({
                      contractTerms: form.contractTerms.map((x, n) =>
                        n === i ? { ...x, content: e.target.value } : x,
                      ),
                    })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    patch({ contractTerms: form.contractTerms.filter((_, n) => n !== i) })
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </section>
          <label className="toggle">
            <input
              checked={form.isPublished}
              onChange={e => patch({ isPublished: e.target.checked })}
              type="checkbox"
            />{' '}
            저장 후 바로 공개하기
          </label>
          {error && <p className="error">{error}</p>}
          <div className="sticky-actions">
            <button type="button" className="btn soft" onClick={() => setPreview(true)}>
              미리보기
            </button>
            <button className="btn primary" disabled={loading}>
              {loading ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </form>
        <aside className="preview-panel">
          <p className="eyebrow">LIVE PREVIEW</p>
          <Phone form={form} />
        </aside>
      </div>
      {preview && (
        <div className="modal" onClick={() => setPreview(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPreview(false)}>
              ×
            </button>
            <div className="phone big">
              <PhoneBody form={form} />
            </div>
          </div>
        </div>
      )}
      <SiteFooter />
    </main>
  )
}
function Phone({ form }: { form: BirthdayGift }) {
  return (
    <div className="phone">
      <PhoneBody form={form} />
    </div>
  )
}
function PhoneBody({ form }: { form: BirthdayGift }) {
  const event = eventOption(form.eventType),
    theme = themeOption(form.themeColor)
  return (
    <div
      className="phone-theme"
      style={
        {
          '--pink': theme.color,
          '--pink2': theme.accent,
          '--theme-soft': theme.soft,
        } as React.CSSProperties
      }
    >
      <img src={form.coverImage || demoGift.coverImage} />
      <div>
        <span className="mini-gift">{event.emoji}</span>
        <h3>
          {form.recipientName || '친구'}님에게
          <br />
          {event.title}이 도착했어요!
        </h3>
        <button type="button" className="btn primary small">
          이벤트 확인하기
        </button>
      </div>
    </div>
  )
}
