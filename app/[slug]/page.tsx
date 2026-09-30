import {notFound} from 'next/navigation';
import Site from '../../components/Site';
import pages from '../../site-content.json';

type Params = {params:Promise<{slug:string}>};

const normalize=(value:string)=>{
  try{return decodeURIComponent(value).normalize('NFC').toLocaleLowerCase('tr-TR')}
  catch{return value.normalize('NFC').toLocaleLowerCase('tr-TR')}
};

const aliases:Record<string,string>={
  'ozelsagliksigortasi':'özelsağlıksigortası',
  'seyahatsagliksigortasi':'seyahatsaglıksigortası',
  'saglikturizmikomplikasyon':'saglıkturizmikomplikasyon',
  'tamamlayicisagliksigortasi':'tamamlayıcısağlıksigortası',
  'evcilhayvansigortasi':'evcilhayvansigortası',
  'ferdikazasigortasi':'ferdikazasigortası',
  'hayatsigortasi':'hayatsigortası',
  'zorunlutrafiksigortasi':'zorunlutrafiksigortası',
  'kaskosigortasi':'kaskosigortası',
  'yesilkartsigortasi':'yesilkartsigortası',
  'konutsigortasi':'konutsigortası',
  'daskzorunludepremsigortasi':'daskzorunludepremsigortası',
  'isyerisigortasi':'işyerisigortası',
  'insaatallrisksigortasi':'inşaatallrisksigortası',
  'bireyselemeklilik':'bireyselemeklilik'
};

const asciiTR=(value:string)=>normalize(value)
 .replace(/ı/g,'i').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c')
 .replace(/\u0307/g,'');

const findPage=(slug:string)=>{
  const wanted=normalize(slug);
  const wantedAscii=asciiTR(slug);
  const alias=aliases[wantedAscii];
  return pages.find(page=>{
    const pageSlug=normalize(page.path.slice(1));
    return pageSlug===wanted || asciiTR(pageSlug)===wantedAscii || (alias && asciiTR(pageSlug)===asciiTR(alias));
  });
};

export const dynamicParams=true;

export function generateStaticParams(){
  return pages.filter(page=>page.path!=='/').map(page=>({slug:normalize(page.path.slice(1))}));
}

export async function generateMetadata({params}:Params){
  const {slug}=await params;
  const page=findPage(slug);
  return {title:page?.title||'Bekirağaoğlu Sigorta'};
}

export default async function Detail({params}:Params){
  const {slug}=await params;
  const page=findPage(slug);
  if(!page)notFound();
  return <Site path={page.path}/>;
}
