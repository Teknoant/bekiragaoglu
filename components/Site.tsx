'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import pages from '../site-content.json';
import assets from '../asset-map.json';
import Form from './Form';
type Chunk={tag:string;text:string}; type Img={src:string;alt:string}; type Page={path:string;title:string;chunks:Chunk[];images:Img[]};
const all=pages as Page[]; const assetMap=assets as Record<string,string>; const logo='/media/5f9784_d390e58c0a8845fbb2d465a2cd79f49a~mv2.png';
function asset(src:string){return assetMap[src.split('/v1/')[0]]||src}
const categories=[{title:'BİREYSEL EMEKLİLİK',paths:['/bireyselemeklilik']},{title:'SAĞLIK SİGORTASI',paths:['/özelsağlıksigortası','/seyahatsaglıksigortası','/saglıkturizmikomplikasyon','/tamamlayıcısağlıksigortası','/evcilhayvansigortası']},{title:'HAYAT SİGORTASI',paths:['/ferdikazasigortası','/hayatsigortası']},{title:'ARAÇ SİGORTASI',paths:['/zorunlutrafiksigortası','/kaskosigortası','/yesilkartsigortası']},{title:'KONUT SİGORTASI',paths:['/konutsigortası','/daskzorunludepremsigortası']},{title:'İŞYERİ SİGORTASI',paths:['/i̇syerisigortası','/i̇nsaatallrisksigortası']}];
const name=(path:string)=>all.find(p=>p.path===path)?.title.split(' | ')[0]||path;
const socials=[['Instagram','https://www.instagram.com/bekiragaoglusigorta/'],['Facebook','https://www.facebook.com/profile.php?id=61579026227828&locale=tr_TR'],['WhatsApp','https://wa.me/+905423039030'],['LinkedIn','https://www.linkedin.com/company/bekira%C4%9Fao%C4%9Flu-sigorta/?viewAsMember=true']];
function Header(){const [open,setOpen]=useState(false);return <header className="header"><div className="head-inner"><Link href="/" aria-label="Ana Sayfa"><img className="logo" src={logo} alt="Bekirağaoğlu Sigorta"/></Link><div className="head-info"><span className="head-symbol">☎</span><span><small>Bizi Arayın</small><a href="tel:+905423039030"><b>0 542 303 90 30</b></a></span></div><div className="head-info address"><span className="head-symbol">●</span><span>Karşıyaka Mah. Gazi Blv. Kartallar<br/> Plaza No: 183/3 Kepez/Antalya</span></div><button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-expanded={open}>☰ Menü</button><nav className={open?'nav open':'nav'}><Link href="/">ANA SAYFA</Link><Link href="/kurumsal">KURUMSAL</Link><div className="drop"><button>ÜRÜNLER</button><div className="drop-menu">{categories.map(c=><section key={c.title}><strong>{c.title}</strong>{c.paths.map(path=><Link key={path} href={path}>{name(path)}</Link>)}</section>)}</div></div><Link href="/iletisim">İLETİŞİM</Link></nav><Link className="head-quote" href="/iletisim">TEKLİF AL</Link></div></header>}
function Footer(){return <footer className="footer"><div className="footer-inner"><div><Link href="/"><img src={logo} alt="Bekirağaoğlu Sigorta" width="150"/></Link><p>Karşıyaka Mah. Gazi Blv. Kartallar Plaza No: 183/3 Kepez/Antalya</p><small>© Bekirağaoğlu Sigorta</small></div><div><h2>BİZE ULAŞIN</h2><a href="tel:+905423039030">0 542 303 90 30</a><a href="mailto:info@bekiragaoglusigorta.com.tr">info@bekiragaoglusigorta.com.tr</a><p>P.tesi - C.tesi - 09:00 to 18:00</p></div><div><h2>BİZİ TAKİP EDİN</h2>{socials.map(([label,url])=><a href={url} key={label} target="_blank" rel="noreferrer">{label}</a>)}</div></div></footer>}
function Chunks({items}:{items:Chunk[]}){return <div className="content-chunks">{items.map((c,i)=>c.tag.startsWith('h')?<h2 key={i}>{c.text}</h2>:<p key={i}>{c.text}</p>)}</div>}
const productTabs=[
{label:'Bireysel Emeklilik',cards:[['/bireyselemeklilik','Bireysel Emeklilik (BES) Sigortası',19]]},
{label:'Sağlık Sigortası',cards:[['/tamamlayıcısağlıksigortası','Tamamlayıcı Sağlık Sigortası',3],['/özelsağlıksigortası','Özel Sağlık Sigortası',4],['/saglıkturizmikomplikasyon','Sağlık Turizmi Komplikasyon',9]]},
{label:'Araç Sigortası',cards:[['/zorunlutrafiksigortası','Zorunlu Trafik Sigortası',1],['/kaskosigortası','Kasko Sigortası',2],['/yesilkartsigortası','Yeşil Sigorta',12]]},
{label:'Yangın Sigortası',cards:[['/daskzorunludepremsigortası','Zorunlu Deprem (DASK) Sigortası',5],['/konutsigortası','Konut Sigortası',16]]},
{label:'Ticari Kurumsal',cards:[['/i̇syerisigortası','İşyeri Sigortası',6],['/i̇nsaatallrisksigortası','İnşaat All Risk Sigortası',7]]},
{label:'Evcil Hayvanlar',cards:[['/evcilhayvansigortası','Evcil Hayvan Sigortası',17]]},
{label:'Seyahat Sigortası',cards:[['/seyahatsaglıksigortası','Seyahat Sigortası',18]]}
] as const;
function ProductShowcase({page}:{page:Page}){const [active,setActive]=useState<number|null>(null);useEffect(()=>{if(active===null)return;const timer=window.setTimeout(()=>setActive(null),7000);return()=>window.clearTimeout(timer)},[active]);const mixed=[productTabs[2].cards[1],productTabs[3].cards[1],productTabs[4].cards[0],productTabs[1].cards[0]];const visible=active===null?mixed:productTabs[active].cards;return <section className="product-showcase" id="urunler"><div className="showcase-heading"><h2><span>ÜRÜN &amp; </span><strong>HİZMETLERİMİZ</strong></h2></div><div className="showcase-inner"><div className="showcase-tabs" role="tablist" aria-label="Sigorta kategorileri">{productTabs.map((tab,i)=><button key={tab.label} type="button" role="tab" id={`product-tab-${i}`} aria-selected={active===i} aria-controls="product-tab-panel" className={active===i?'active':''} onClick={()=>setActive(i)}>{tab.label}</button>)}</div><div className="showcase-cards" role="tabpanel" id="product-tab-panel" aria-label={active===null?'Öne çıkan sigorta ürünleri':productTabs[active].label}>{visible.map(([path,title,index])=><article key={path} className="shield-card" tabIndex={0}><img src={asset(page.images[index]?.src||'')} alt={title}/><div className="shield-overlay"><h3>{title}</h3><div className="shield-hover-details"><p>{path==='/bireyselemeklilik'?'Geleceğiniz için birikim yaparak ek emeklilik geliri sağlar.':'Sigorta ürünümüz hakkında detaylı bilgi alın veya teklif isteyin.'}</p><Link href={path}>İncele <span aria-hidden="true">⟶</span></Link><Link href="/iletisim">Teklif Al <span aria-hidden="true">⟶</span></Link></div></div></article>)}</div></div></section>}
function Home({page}:{page:Page}){const [slide,setSlide]=useState(0);const hero=page.images.slice(0,10);useEffect(()=>{if(hero.length<2)return;const timer=window.setInterval(()=>setSlide(s=>(s+1)%hero.length),5000);return()=>window.clearInterval(timer)},[hero.length]);const items=page.chunks.filter(c=>c.tag==='p'&&c.text&&c.text!=='​');const heroTitle=items[slide*2]?.text||'Konut Sigortası';const heroDesc=items[slide*2+1]?.text||'';const partner=page.images.filter(i=>['9.png','AXA-Hayat-Emeklilik-Mavi-Logo-png.png','anadolusigorta_9fc4c310d5_edited.png','22_ea0kpld7h370opl (1).png','20_wu7azxqt1yc9o07.png','hi-logo.png','demir-hayat-logo.png'].includes(i.alt));return <><section className="hero"><div className="hero-copy"><h1>{heroTitle}</h1><p>{heroDesc}</p><Link href="/iletisim" className="pill">Teklif Al</Link></div><img src={asset(hero[slide]?.src||'')} alt={hero[slide]?.alt||heroTitle}/><div className="hero-controls"><button onClick={()=>setSlide((slide+hero.length-1)%hero.length)}>←</button><button onClick={()=>setSlide((slide+1)%hero.length)}>→</button></div></section><section className="advisory"><div className="advisory-inner"><div className="video-standin"><video controls playsInline preload="metadata" poster="/media/5f9784_9a006667049442e1ba3c31e338e33268~mv2.jpg"><source src="/media/intro-video.mp4" type="video/mp4"/>Tarayıcınız video oynatmayı desteklemiyor.</video></div><div className="advisory-copy"><h2>ÖZEL DANIŞMANLIK</h2><p>Müşterilerimizin ihtiyaçlarını analiz ediyor, farklı sigorta şirketleri arasından en uygun ürünleri karşılaştırarak size en doğru seçeneği sunuyoruz. Sağlıktan araca, konuttan iş yerine kadar geniş ürün yelpazemizle hayatınızın her alanında güvence sağlıyoruz.</p><Link className="gold-button" href="/iletisim">Bize Ulaşın</Link></div></div></section><ProductShowcase page={page}/><section className="partners"><div className="partners-heading"><h2><span>ÇÖZÜM </span><strong>ORTAKLARIMIZ</strong></h2></div><div className="partners-house-frame"><span className="partners-chimney-heart" aria-hidden="true">❤️</span><div className="partners-house"><div className="partners-house-content"><h3>Hayatın risklerine karşı,<br/> güven dolu bir çatı altındasınız</h3><div className="partners-logos">{partner.map((im,i)=><div className="partner-logo-tile" key={i}><img src={asset(im.src)} alt={im.alt}/></div>)}</div></div></div></div></section><section className="form-section"><div className="policy-heading"><h2><span>POLİÇENİZİ </span><strong>TAKİP EDELİM</strong></h2></div><Form kind="police"/></section></>}
function ServiceIcon({path,index}:{path:string;index:number}){
  const isBes=path==='/bireyselemeklilik';
  const type=isBes?['saving','fund','support'][index]:path==='/özelsağlıksigortası'?['outpatient','bed','ambulance'][index]:['shield','support','saving'][index%3];
  const common={fill:"none",stroke:"#d4a12d",strokeWidth:2.5,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  return <div className="service-icon" aria-hidden="true"><svg viewBox="0 0 96 68" role="presentation">
    {type==='saving'&&<g {...common}><circle cx="48" cy="23" r="17"/><path d="M48 12v22m7-17c-4-5-14-4-14 2 0 8 15 4 15 12-1 6-12 7-16 2"/><path d="M29 48c-8-10-12-16-17-11-3 4 4 16 10 21l15 7m30-17c8-10 12-16 17-11 3 4-4 16-10 21l-15 7M30 47l10 6m26-6-10 6"/></g>}
    {type==='fund'&&<g {...common}><path d="M69 16a28 28 0 1 0 7 23M68 6l2 15-16-1"/><path d="M48 20v28m8-23c-6-5-17-4-17 4 0 8 18 5 18 13-1 8-14 9-19 3"/></g>}
    {type==='support'&&<g {...common}><path d="M22 38v-6a26 26 0 0 1 52 0v6"/><rect x="17" y="33" width="12" height="22" rx="5"/><rect x="67" y="33" width="12" height="22" rx="5"/><path d="M73 55c0 10-12 12-24 12"/><circle cx="46" cy="64" r="3" fill="#d4a12d"/></g>}
    {type==='outpatient'&&<g {...common}><circle cx="48" cy="23" r="13"/><path d="M26 61V48c0-10 9-17 22-17s22 7 22 17v13M37 44l11 10 11-10M48 39v19"/></g>}
    {type==='bed'&&<g {...common} strokeWidth={4}><path d="M15 13v47m0-12h68v12M15 38h68v10H15z"/><circle cx="30" cy="30" r="7"/><path d="M42 26h32v12H42z"/></g>}
    {type==='ambulance'&&<g {...common} strokeWidth={3}><path d="M10 23h47v30H10zM57 33h13l13 12v8H57z"/><circle cx="25" cy="56" r="7" fill="#fff"/><circle cx="68" cy="56" r="7" fill="#fff"/><path d="M29 30h13m-6-7v14"/></g>}
    {type==='shield'&&<g {...common}><path d="M48 5 78 17v20c0 20-14 29-30 36-16-7-30-16-30-36V17z"/><path d="m35 37 9 9 18-20"/></g>}
  </svg></div>
}
function Product({page}:{page:Page}){
  const heading=page.chunks.find(c=>c.tag.startsWith('h'))?.text||page.title.split(' | ')[0];
  const clean=page.chunks.filter(c=>c.text&&c.text!=='​');
  const serviceIndex=clean.findIndex(c=>/^ÜRÜN (HİZMET|HİZMETLERİMİZ)/i.test(c.text));
  const detail=(serviceIndex>0?clean.slice(1,serviceIndex):clean.slice(1));
  const serviceChunks=serviceIndex>=0?clean.slice(serviceIndex+1):[];
  const services=serviceChunks.reduce<{title:string;description:string}[]>((acc,c)=>{
    if(c.tag.startsWith('h'))acc.push({title:c.text,description:''});
    else if(acc.length)acc[acc.length-1].description+=(acc[acc.length-1].description?' ':'')+c.text;
    return acc;
  },[]);
  const hero=page.images[0]?asset(page.images[0].src):'';
  const labels=['Nedir?','Kapsamdan Öne Çıkanlar','Kimler İçin Uygun?','Önemli Notlar','Bekirağaoğlu Sigorta Nasıl Yardımcı Olur?','Evcil Hayvan Sigortası Neleri Kapsar?','Sigorta Yaptırırken Nelere Dikkat Edilmeli?','Kimler Yaptırabilir?','Neden Evcil Hayvan Sigortası Yaptırmalısınız?'];
  const renderText=(text:string,i:number)=>{
    const label=labels.find(l=>text.startsWith(l));
    if(label){const rest=text.slice(label.length).trim();return <div className="product-copy-block" key={i}><strong>{label}</strong>{rest&&<p>{rest}</p>}</div>}
    if(text.startsWith('-')) return <p className="product-bullet" key={i}>{text}</p>;
    return <p key={i}>{text}</p>
  };
  return <div className="wix-product-page">
    <section className="product-hero" style={hero?{backgroundImage:`linear-gradient(rgba(255,255,255,.48),rgba(255,255,255,.48)),url("${hero}")`}:undefined}><h1>{heading}</h1></section>
    <section className="product-detail">
      <div className="product-detail-inner">
        <h2>{heading}</h2>
        <div className="product-copy">{detail.map((c,i)=>renderText(c.text,i))}</div>
        <Link className="product-quote" href="/iletisim">TEKLİF AL</Link>
      </div>
    </section>
    {services.length>0&&<section className="product-services">
      <div className="product-services-heading"><h2><span>ÜRÜN </span><strong>HİZMETLERİMİZ</strong></h2></div>
      <div className="product-service-list">{services.map((item,i)=><article className="product-service-item" key={item.title+i}><ServiceIcon path={page.path} index={i}/><div><h3>{item.title}</h3>{item.description&&<p>{item.description}</p>}</div></article>)}</div>
    </section>}
  </div>
}
function Corporate({page}:{page:Page}){return <><section className="page-banner"><h1>KURUMSAL</h1></section><div className="product-content wrap"><Chunks items={page.chunks}/></div></>}
function Contact(){return <section className="contact wrap"><h1>İletişime Geçin</h1><div className="contact-grid"><div><h2>TELEFON NUMARAMIZ</h2><a href="tel:+905423039030">0 542 303 90 30</a><h2>KONUM ADRESİMİZ</h2><p>Karşıyaka Mah. Gazi Blv. Kartallar Plaza No: 183/3 Kepez/Antalya</p><h2>MAİL ADRESİMİZ</h2><a href="mailto:info@bekiragaoglusigorta.com.tr">info@bekiragaoglusigorta.com.tr</a></div><Form kind="iletisim"/></div></section>}
function Gallery({page}:{page:Page}){return <section className="wrap gallery"><h1>GALERİ</h1><div>{page.images.slice(1).map((im,i)=>i===7||i===11?<video key={i} controls playsInline preload="metadata" poster={asset(im.src)} src={i===7?'/media/gallery-video-1.mp4':'/media/gallery-video-2.mp4'}/>:<img key={i} src={asset(im.src)} alt={im.alt||`Galeri görseli ${i+1}`}/>)}</div></section>}
export default function Site({path}:{path:string}){const page=all.find(p=>p.path===path);return <><Header/><main>{!page?<section className="wrap missing"><h1>Sayfa bulunamadı</h1><Link href="/">Ana Sayfa</Link></section>:path==='/'?<Home page={page}/>:path==='/kurumsal'?<Corporate page={page}/>:path==='/iletisim'?<Contact/>:path==='/blank-2-1'?<Gallery page={page}/>:<Product page={page}/>}</main><Footer/></>}
