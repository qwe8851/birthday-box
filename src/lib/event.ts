import type { EventType, ThemeColor } from '../types'
export const EVENT_OPTIONS: {
  value: EventType
  label: string
  emoji: string
  title: string
  dateLabel: string
}[] = [
  {
    value: 'birthday',
    label: '생일 축하',
    emoji: '🎂',
    title: '특별한 생일 선물',
    dateLabel: '생일',
  },
  {
    value: 'anniversary',
    label: '기념일',
    emoji: '💞',
    title: '우리의 특별한 기념일 선물',
    dateLabel: '기념일',
  },
  {
    value: 'congratulations',
    label: '축하',
    emoji: '🎉',
    title: '진심을 담은 축하 선물',
    dateLabel: '축하하는 날',
  },
  {
    value: 'thanks',
    label: '감사',
    emoji: '💐',
    title: '고마운 마음을 담은 선물',
    dateLabel: '기억하고 싶은 날',
  },
  {
    value: 'cheer',
    label: '응원',
    emoji: '✨',
    title: '힘이 되어 줄 응원 선물',
    dateLabel: '응원하는 날',
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
