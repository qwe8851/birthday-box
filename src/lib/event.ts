import type { EventType, ThemeColor } from '../types'
export const EVENT_OPTIONS: {
  value: EventType
  label: string
  emoji: string
  title: string
  dateLabel: string
  letterLabel: string
  revealEyebrow: string
  revealTitle: string
  revealIntro: string
  ticketLabel: string
  priceLabel: string
  completeMessage: string
  contractTitle: string
  contractDescription: string
  stamp: string
  memoryTitle: string
  letterEnd: string
  defaultLetter: string
  defaultGiftTitle: string
  defaultTerms: string[]
  photoCaptions: string[]
}[] = [
  {
    value: 'birthday',
    label: '생일 축하',
    emoji: '🎂',
    title: '특별한 생일 선물',
    dateLabel: '생일',
    letterLabel: '생일 편지',
    revealEyebrow: 'HAPPY BIRTHDAY!',
    revealTitle: '생일을 진심으로 축하해요',
    revealIntro: '이번 생일 선물은 바로...',
    ticketLabel: 'BIRTHDAY SPECIAL TICKET',
    priceLabel: '생일 특별가',
    completeMessage: '생일 선물 수령 약속이 완료되었어요 🎉',
    contractTitle: '평생 친구 계약서',
    contractDescription: '본 계약서는 서로의 우정과 행복을 위해 작성되었습니다.',
    stamp: '평생\n친구',
    memoryTitle: '함께라서 더 빛났던 순간들',
    letterEnd: '앞으로도 웃을 일만 가득하길',
    defaultLetter:
      '같이 웃었던 모든 순간이 내겐 정말 소중해. 언제나 지금처럼 건강하고, 하고 싶은 일 마음껏 하면서 행복하자! 생일 진심으로 축하해 💗',
    defaultGiftTitle: '평생 나랑 친구하기 이용권',
    defaultTerms: [
      '앞으로도 계속 친구한다.',
      '맛있는 것을 발견하면 서로에게 알려준다.',
      '여행 갈 사람이 없으면 서로를 우선적으로 고려한다.',
      '생일에는 서로의 생일을 성대하게 축하한다.',
      '본 계약은 일방적으로 해지할 수 없다.',
    ],
    photoCaptions: ['참 많이 웃었던 날 ✨', '함께여서 더 좋았던 순간', '우리의 소중한 한 페이지'],
  },
  {
    value: 'anniversary',
    label: '기념일',
    emoji: '💞',
    title: '우리의 특별한 기념일 선물',
    dateLabel: '기념일',
    letterLabel: '기념일 편지',
    revealEyebrow: 'HAPPY ANNIVERSARY!',
    revealTitle: '우리의 특별한 날을 축하해요',
    revealIntro: '기념일을 위해 준비한 선물은 바로...',
    ticketLabel: 'ANNIVERSARY SPECIAL TICKET',
    priceLabel: '기념일 특별가',
    completeMessage: '앞으로도 함께하기로 약속했어요 💞',
    contractTitle: '우리 사이 기념일 계약서',
    contractDescription: '본 계약서는 소중한 오늘과 앞으로의 시간을 위해 작성되었습니다.',
    stamp: '우리의\n기념일',
    memoryTitle: '우리라서 특별했던 순간들',
    letterEnd: '앞으로의 모든 기념일도 함께하길',
    defaultLetter:
      '함께 보낸 시간이 쌓일수록 네가 더 소중해져. 오늘을 같이 기념할 수 있어서 행복하고, 앞으로도 우리답게 좋은 추억을 많이 만들어 가자 💞',
    defaultGiftTitle: '앞으로도 함께하기 이용권',
    defaultTerms: [
      '우리의 소중한 기념일을 오래 기억한다.',
      '서운한 일이 생기면 솔직하게 이야기한다.',
      '함께하고 싶은 일은 미루지 않고 하나씩 해본다.',
      '서로의 일상과 마음을 다정하게 살핀다.',
      '앞으로의 기념일도 가능한 한 함께한다.',
    ],
    photoCaptions: ['우리의 시작을 기억해 💞', '함께여서 특별했던 날', '앞으로도 오래오래 같이'],
  },
  {
    value: 'congratulations',
    label: '축하',
    emoji: '🎉',
    title: '진심을 담은 축하 선물',
    dateLabel: '축하하는 날',
    letterLabel: '축하 편지',
    revealEyebrow: 'CONGRATULATIONS!',
    revealTitle: '멋진 순간을 진심으로 축하해요',
    revealIntro: '당신을 위해 준비한 축하 선물은 바로...',
    ticketLabel: 'CONGRATULATIONS TICKET',
    priceLabel: '축하 특별가',
    completeMessage: '축하 선물이 성공적으로 전달되었어요 🎉',
    contractTitle: '찬란한 앞날 보장서',
    contractDescription:
      '본 보장서는 오늘의 성취와 앞으로의 멋진 도전을 응원하기 위해 작성되었습니다.',
    stamp: '진심으로\n축하해',
    memoryTitle: '오늘까지 빛나게 달려온 순간들',
    letterEnd: '앞으로 펼쳐질 모든 순간도 빛나길',
    defaultLetter:
      '여기까지 오기 위해 얼마나 노력했는지 알기에 더 진심으로 축하하고 싶어. 오늘의 기쁨을 마음껏 누리고, 앞으로 펼쳐질 멋진 순간들도 너답게 빛내길 바라 🎉',
    defaultGiftTitle: '무한 칭찬과 자랑 이용권',
    defaultTerms: [
      '오늘의 성취를 마음껏 자랑한다.',
      '스스로의 노력과 가능성을 충분히 인정한다.',
      '축하받을 일이 생기면 가장 먼저 소식을 전한다.',
      '새로운 도전을 시작할 때 서로 힘껏 응원한다.',
      '오늘의 기쁜 마음을 오래 간직한다.',
    ],
    photoCaptions: ['노력이 빛을 발한 순간 🎉', '정말 자랑스러운 오늘', '더 멋진 내일을 향해'],
  },
  {
    value: 'thanks',
    label: '감사',
    emoji: '💐',
    title: '고마운 마음을 담은 선물',
    dateLabel: '기억하고 싶은 날',
    letterLabel: '감사 편지',
    revealEyebrow: 'THANK YOU!',
    revealTitle: '고마운 마음을 전하고 싶어요',
    revealIntro: '감사의 마음을 담아 준비한 선물은 바로...',
    ticketLabel: 'THANK YOU SPECIAL TICKET',
    priceLabel: '감사 특별가',
    completeMessage: '고마운 마음이 따뜻하게 전달되었어요 💐',
    contractTitle: '고마움 평생 보관 증서',
    contractDescription: '본 증서는 받은 마음을 오래 기억하고 고마움을 전하기 위해 작성되었습니다.',
    stamp: '정말\n고마워',
    memoryTitle: '고마움으로 기억되는 순간들',
    letterEnd: '받은 마음 잊지 않고 오래 간직할게',
    defaultLetter:
      '늘 당연한 듯 곁에 있어 줬지만, 사실 하나하나 모두 정말 고마웠어. 네가 건넨 따뜻한 마음을 오래 기억하고 나도 꼭 좋은 마음으로 돌려줄게 💐',
    defaultGiftTitle: '언제든 도움 요청하기 이용권',
    defaultTerms: [
      '받은 도움과 마음을 당연하게 여기지 않는다.',
      '고마운 일이 생기면 아끼지 않고 표현한다.',
      '힘이 필요할 때 서로 기꺼이 손을 내민다.',
      '함께한 따뜻한 순간들을 오래 기억한다.',
      '이 고마운 인연을 소중히 이어간다.',
    ],
    photoCaptions: [
      '고마움이 가득했던 순간 💐',
      '덕분에 참 따뜻했던 날',
      '오래 기억하고 싶은 마음',
    ],
  },
  {
    value: 'cheer',
    label: '응원',
    emoji: '✨',
    title: '힘이 되어 줄 응원 선물',
    dateLabel: '응원하는 날',
    letterLabel: '응원 편지',
    revealEyebrow: 'YOU CAN DO IT!',
    revealTitle: '언제나 당신을 응원해요',
    revealIntro: '힘이 되어 주고 싶어 준비한 선물은 바로...',
    ticketLabel: 'CHEERING SPECIAL TICKET',
    priceLabel: '응원 특별가',
    completeMessage: '든든한 응원 에너지가 충전되었어요 ✨',
    contractTitle: '무조건 네 편 보증서',
    contractDescription: '본 보증서는 어떤 순간에도 곁에서 힘이 되어 주기 위해 작성되었습니다.',
    stamp: '언제나\n네 편',
    memoryTitle: '힘이 되어 주었던 반짝이는 순간들',
    letterEnd: '천천히 가도 괜찮아, 언제나 네 편이야',
    defaultLetter:
      '지금도 충분히 잘하고 있어. 마음처럼 풀리지 않는 날이 와도 네가 가진 힘을 믿었으면 좋겠어. 서두르지 않아도 괜찮아. 언제나 네 편에서 힘껏 응원할게 ✨',
    defaultGiftTitle: '언제든 응원받기 이용권',
    defaultTerms: [
      '힘든 날에는 혼자 참지 않고 도움을 요청한다.',
      '작은 진전도 충분히 잘한 일로 인정한다.',
      '지치면 쉬어 가도 된다는 것을 잊지 않는다.',
      '서로의 꿈과 선택을 진심으로 응원한다.',
      '어떤 순간에도 서로의 든든한 편이 되어 준다.',
    ],
    photoCaptions: ['너라서 해낼 수 있어 ✨', '한 걸음씩 잘 가고 있어', '언제나 네 편이야'],
  },
]
export const THEME_OPTIONS: {
  value: ThemeColor
  label: string
  color: string
  accent: string
  soft: string
  background: string
}[] = [
  {
    value: 'red',
    label: '빨강',
    color: '#ef4444',
    accent: '#f87171',
    soft: '#fee2e2',
    background: '#fff8f7',
  },
  {
    value: 'orange',
    label: '주황',
    color: '#f97316',
    accent: '#fb923c',
    soft: '#ffedd5',
    background: '#fffaf5',
  },
  {
    value: 'yellow',
    label: '노랑',
    color: '#d6a300',
    accent: '#facc15',
    soft: '#fef9c3',
    background: '#fffdf3',
  },
  {
    value: 'green',
    label: '초록',
    color: '#22a06b',
    accent: '#4cc38a',
    soft: '#dcfce7',
    background: '#f5fff9',
  },
  {
    value: 'blue',
    label: '파랑',
    color: '#3b82f6',
    accent: '#60a5fa',
    soft: '#dbeafe',
    background: '#f5f9ff',
  },
  {
    value: 'indigo',
    label: '남색',
    color: '#4f46e5',
    accent: '#818cf8',
    soft: '#e0e7ff',
    background: '#f7f7ff',
  },
  {
    value: 'purple',
    label: '보라',
    color: '#9333ea',
    accent: '#c084fc',
    soft: '#f3e8ff',
    background: '#fcf8ff',
  },
  {
    value: 'pink',
    label: '핑크',
    color: '#ff5e79',
    accent: '#ff8799',
    soft: '#ffe3e8',
    background: '#fffaf6',
  },
]
export const eventOption = (value: EventType) =>
  EVENT_OPTIONS.find(option => option.value === value) ?? EVENT_OPTIONS[0]
export const themeOption = (value: ThemeColor) =>
  THEME_OPTIONS.find(option => option.value === value) ?? THEME_OPTIONS[7]
