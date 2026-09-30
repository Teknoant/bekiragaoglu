import {notFound} from 'next/navigation';
import Site from '../../components/Site';
import pages from '../../site-content.json';

type Params = {params:Promise<{slug:string}>};
const normalize=(value:string)=>{try{return decodeURIComponent(value).normalize('NFC')}catch{return value.normalize('NFC')}};
const findPage=(slug:string)=>pages.find(page=>normalize(page.path.slice(1))===normalize(slug));

export function generateStaticParams(){
  return pages.filter(page=>page.path!=='/').map(page=>({slug:page.path.slice(1)}));
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
