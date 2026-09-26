import { NextResponse } from 'next/server';

export async function POST(request:Request){
 const key=process.env.RESEND_API_KEY;
 const from=process.env.FORM_FROM_EMAIL;
 const to=process.env.FORM_TO_EMAIL;
 if(!key||!from||!to)return NextResponse.json({error:'Form gönderimi henüz yapılandırılmadı.'},{status:503});
 let fields:Record<string,unknown>;
 try{fields=await request.json()}catch{return NextResponse.json({error:'Geçersiz istek.'},{status:400})}
 const allowed=['kind','ad','soyad','email','telefon','mesaj','onay','urun'];
 if(!fields.ad||!fields.soyad||!fields.email||!fields.telefon||fields.onay!==true||!['iletisim','police'].includes(String(fields.kind)))return NextResponse.json({error:'Lütfen zorunlu alanları doldurun.'},{status:400});
 if(fields.kind==='iletisim'&&!fields.mesaj)return NextResponse.json({error:'Mesaj alanı zorunludur.'},{status:400});
 const text=allowed.map(k=>`${k}: ${String(fields[k]??'')}`).join('\n');
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],subject:`Bekirağaoğlu Sigorta - ${fields.kind==='police'?'Poliçe Takip':'İletişim'} Formu`,text,reply_to:String(fields.email)})});
 if(!response.ok)return NextResponse.json({error:'Gönderim başarısız. Lütfen telefonla iletişime geçin.'},{status:502});
 return NextResponse.json({ok:true});
}