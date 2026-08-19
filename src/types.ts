export type GiftStep = 'landing'|'recipient-check'|'loading'|'gift-reveal'|'confirmation'|'contract-complete'|'contract'|'birthday'
export type EventType='birthday'|'anniversary'|'congratulations'|'thanks'|'cheer'
export type ThemeColor='red'|'orange'|'yellow'|'green'|'blue'|'indigo'|'purple'|'pink'
export interface BirthdayPhoto { id:string; url:string; caption:string; sortOrder:number; storagePath?:string }
export interface ContractTerm { id:string; content:string; sortOrder:number }
export interface BirthdayGift { id:string; publicId:string; recipientName:string; creatorName:string; eventType:EventType; themeColor:ThemeColor; birthday:string; coverImage:string; photos:BirthdayPhoto[]; letter:string; gift:{title:string;originalPrice:number;salePrice:number;validity:string;refundable:boolean;transferable:boolean;customerService:string}; contractTerms:ContractTerm[]; isPublished:boolean; createdAt:string; updatedAt:string }
