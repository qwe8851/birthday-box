import type { BirthdayGift } from '../types'
export const DEFAULT_COVER_IMAGE='/images/default-birthday-cover.avif'
export const DEFAULT_BIRTHDAY_LETTER='같이 웃었던 모든 순간이 내겐 정말 소중해. 언제나 지금처럼 건강하고, 하고 싶은 일 마음껏 하면서 행복하자! 생일 진심으로 축하해 💗'
export const demoGift: BirthdayGift = { id:'demo-1',publicId:'f8K2xP',recipientName:'햄니',birthday:'2026-08-18',coverImage:'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1000&q=85',photos:[
 {id:'1',url:'https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?auto=format&fit=crop&w=900&q=80',sortOrder:0},
 {id:'2',url:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',sortOrder:1},
 {id:'3',url:'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80',sortOrder:2}],letter:DEFAULT_BIRTHDAY_LETTER,gift:{title:'평생 나랑 친구하기 이용권',originalPrice:99000000,salePrice:0,validity:'평생',refundable:false,transferable:false,customerService:'나'},contractTerms:[
 {id:'1',content:'앞으로도 계속 친구한다.',sortOrder:0},{id:'2',content:'맛있는 것을 발견하면 서로에게 알려준다.',sortOrder:1},{id:'3',content:'여행 갈 사람이 없으면 서로를 우선적으로 고려한다.',sortOrder:2},{id:'4',content:'생일에는 서로의 생일을 성대하게 축하한다.',sortOrder:3},{id:'5',content:'본 계약은 일방적으로 해지할 수 없다.',sortOrder:4}],isPublished:true,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString() }
