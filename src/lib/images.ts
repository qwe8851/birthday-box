async function isHeic(file:File){
  const mime=file.type.toLowerCase()
  if(mime.includes('heic')||mime.includes('heif'))return true
  if(/\.(heic|heif)$/i.test(file.name))return true

  const header=new Uint8Array(await file.slice(0,32).arrayBuffer())
  const signature=String.fromCharCode(...header)
  return /ftyp(heic|heix|hevc|hevx|heim|heis|mif1|msf1)/i.test(signature)
}

export async function normalizeImage(file:File):Promise<File>{
  if(!await isHeic(file))return file
  const{default:heic2any}=await import('heic2any')
  const converted=await heic2any({blob:file,toType:'image/jpeg',quality:.86})
  const blob=Array.isArray(converted)?converted[0]:converted
  const name=file.name.replace(/\.(heic|heif)$/i,'.jpg')
  return new File([blob],name,{type:'image/jpeg',lastModified:Date.now()})
}
