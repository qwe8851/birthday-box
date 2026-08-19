import type { BirthdayGift } from '../types'
import { DEFAULT_COVER_IMAGE } from '../data/demo'

type KakaoSdk = {
  isInitialized: () => boolean
  init: (javascriptKey: string) => void
  Share: { sendDefault: (settings: ShareSettings) => void }
}

type ShareSettings = {
  objectType: 'feed'
  content: {
    title: string
    description: string
    imageUrl: string
    link: ShareLink
  }
  buttons: Array<{ title: string; link: ShareLink }>
}

type ShareLink = { mobileWebUrl: string; webUrl: string }

declare global {
  interface Window { Kakao?: KakaoSdk }
}

const SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js'

function absoluteUrl(value: string) {
  return new URL(value, window.location.origin).href
}

function loadKakaoSdk() {
  if (window.Kakao) return Promise.resolve(window.Kakao)

  return new Promise<KakaoSdk>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SDK_URL}"]`)
    const script = existing ?? document.createElement('script')

    script.addEventListener('load', () => {
      if (window.Kakao) resolve(window.Kakao)
      else reject(new Error('카카오 SDK를 불러오지 못했습니다.'))
    }, { once: true })
    script.addEventListener('error', () => reject(new Error('카카오 SDK 연결에 실패했습니다.')), { once: true })

    if (!existing) {
      script.src = SDK_URL
      script.async = true
      document.head.appendChild(script)
    }
  })
}

export async function shareGiftToKakao(gift: BirthdayGift) {
  const javascriptKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
  if (!javascriptKey) throw new Error('카카오 JavaScript 키가 설정되지 않았습니다.')

  const Kakao = await loadKakaoSdk()
  if (!Kakao.isInitialized()) Kakao.init(javascriptKey)

  const giftUrl = absoluteUrl(`/gift/${gift.publicId}`)
  const imageUrl = absoluteUrl(gift.coverImage || DEFAULT_COVER_IMAGE)
  const link = { mobileWebUrl: giftUrl, webUrl: giftUrl }

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `🎁 ${gift.recipientName}님에게 생일 선물이 도착했어요!`,
      description: 'Birthday Box에 담긴 특별한 선물을 확인해 보세요.',
      imageUrl,
      link,
    },
    buttons: [{ title: '선물 확인하기', link }],
  })
}
