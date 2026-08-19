const isHeic=(file:File)=>file.type==='image/heic'||file.type==='image/heif'||/\.(heic|heif)$/i.test(file.name)

export async function normalizeImage(file:File):Promise<File>{
  if(!isHeic(file))return file
  const{default:heic2any}=await import('heic2any')
  const converted=await heic2any({blob:file,toType:'image/jpeg',quality:.86})
  const blob=Array.isArray(converted)?converted[0]:converted
  const name=file.name.replace(/\.(heic|heif)$/i,'.jpg')
  return new File([blob],name,{type:'image/jpeg',lastModified:Date.now()})
}
