import {notFound} from 'next/navigation';
import Site from '../../components/Site';
import pages from '../../site-content.json';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const page=pages.find(p=>p.path.slice(1)===slug);return {title:page?.title||'Bekirağaoğlu Sigorta'}}
export default async function Detail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const path='/'+slug;if(!pages.some(p=>p.path===path))notFound();return <Site path={path}/>}
