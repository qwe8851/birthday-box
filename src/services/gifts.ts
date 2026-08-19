import {supabase} from '../lib/supabase'
import {DEFAULT_COVER_IMAGE,DEFAULT_PHOTO_CAPTIONS} from '../data/demo'
import type{BirthdayGift}from'../types'
type Row=Record<string,any>
const fail=(stage:string,error:{message:string})=>{throw new Error(`${stage}: ${error.message}`)}
function client(){if(!supabase)throw new Error('Supabase가 설정되지 않았습니다.');return supabase}
export function fromDb(r:Row):BirthdayGift{return{id:r.id,publicId:r.public_id,recipientName:r.recipient_name,creatorName:r.creator_name||'보낸 사람',birthday:r.birthday,coverImage:r.cover_image??DEFAULT_COVER_IMAGE,letter:r.letter??'',gift:r.gift,photos:(r.birthday_photos??[]).sort((a:Row,b:Row)=>a.sort_order-b.sort_order).map((p:Row,i:number)=>({id:p.id,url:p.url,caption:p.caption||DEFAULT_PHOTO_CAPTIONS[i%DEFAULT_PHOTO_CAPTIONS.length],sortOrder:p.sort_order,storagePath:p.storage_path})),contractTerms:(r.contract_terms??[]).sort((a:Row,b:Row)=>a.sort_order-b.sort_order).map((t:Row)=>({id:t.id,content:t.content,sortOrder:t.sort_order})),isPublished:r.is_published,createdAt:r.created_at,updatedAt:r.updated_at}}
const selection='*, birthday_photos(*), contract_terms(*)'
export async function getMyGifts(){const{data,error}=await client().from('birthday_gifts').select(selection).order('created_at',{ascending:false});if(error)fail('목록 조회 실패',error);return(data??[]).map(fromDb)}
export async function getPublicGift(id:string){const{data,error}=await client().from('birthday_gifts').select(selection).eq('public_id',id).eq('is_published',true).maybeSingle();if(error)fail('공개 Box 조회 실패',error);return data?fromDb(data):undefined}
async function upload(file:File,path:string){const c=client(),{error}=await c.storage.from('birthday-images').upload(path,file,{upsert:false,contentType:file.type});if(error)fail('사진 업로드 실패',error);return c.storage.from('birthday-images').getPublicUrl(path).data.publicUrl}
export async function saveGift(g:BirthdayGift,coverFile:File|null,photoFiles:Map<string,File>){
 const c=client(),{data:{user}}=await c.auth.getUser();if(!user)throw new Error('로그인이 만료되었습니다.')
 let cover=g.coverImage||DEFAULT_COVER_IMAGE
 if(coverFile){const ext=coverFile.name.split('.').pop()?.toLowerCase()||'jpg';cover=await upload(coverFile,`${user.id}/${g.id}/cover-${crypto.randomUUID()}.${ext}`)}
 const{error:giftError}=await c.from('birthday_gifts').upsert({id:g.id,user_id:user.id,public_id:g.publicId,recipient_name:g.recipientName,creator_name:g.creatorName,birthday:g.birthday,cover_image:cover,letter:g.letter,gift:{...g.gift,customerService:g.creatorName},is_published:g.isPublished},{onConflict:'id'})
 if(giftError)fail('기본 정보 저장 실패',giftError)
 const photos=[]
 for(const[i,p]of g.photos.entries()){const file=photoFiles.get(p.id);if(file){const ext=file.name.split('.').pop()?.toLowerCase()||'jpg',path=`${user.id}/${g.id}/photos/${p.id}-${crypto.randomUUID()}.${ext}`;photos.push({id:p.id,gift_id:g.id,url:await upload(file,path),storage_path:path,caption:p.caption,sort_order:i})}else if(p.storagePath)photos.push({id:p.id,gift_id:g.id,url:p.url,storage_path:p.storagePath,caption:p.caption,sort_order:i})}
 let result=await c.from('birthday_photos').delete().eq('gift_id',g.id);if(result.error)fail('기존 사진 정리 실패',result.error)
 if(photos.length){result=await c.from('birthday_photos').insert(photos);if(result.error)fail('사진 정보 저장 실패',result.error)}
 result=await c.from('contract_terms').delete().eq('gift_id',g.id);if(result.error)fail('기존 계약 조항 정리 실패',result.error)
 if(g.contractTerms.length){result=await c.from('contract_terms').insert(g.contractTerms.map((t,i)=>({id:t.id,gift_id:g.id,content:t.content,sort_order:i})));if(result.error)fail('계약 조항 저장 실패',result.error)}
 return{...g,coverImage:cover}
}
export async function deleteGift(g:BirthdayGift){const c=client(),paths=g.photos.map(p=>p.storagePath).filter((p):p is string=>Boolean(p));if(paths.length)await c.storage.from('birthday-images').remove(paths);const{error}=await c.from('birthday_gifts').delete().eq('id',g.id);if(error)fail('Box 삭제 실패',error)}
