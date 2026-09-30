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
function Header(){const [open,setOpen]=useState(false);const close=()=>setOpen(false);return <header className="header"><div className="head-inner"><Link href="/" aria-label="Ana Sayfa" onClick={close}><img className="logo" src={logo} alt="Bekirağaoğlu Sigorta"/></Link><div className="head-info"><span className="head-symbol">☎</span><span><small>Bizi Arayın</small><a href="tel:+905423039030"><b>0 542 303 90 30</b></a></span></div><div className="head-info address"><span className="head-symbol">●</span><span>Karşıyaka Mah. Gazi Blv. Kartallar<br/> Plaza No: 183/3 Kepez/Antalya</span></div><div className="mobile-actions"><a className="mobile-call" href="tel:+905423039030" aria-label="Bizi arayın">☎</a><button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?'Menüyü kapat':'Menüyü aç'}><span>{open?'×':'☰'}</span></button></div><nav className={open?'nav open':'nav'}><Link href="/" onClick={close}>ANA SAYFA</Link><Link href="/kurumsal" onClick={close}>KURUMSAL</Link><div className="drop"><button>ÜRÜNLER</button><div className="drop-menu">{categories.map(c=><section key={c.title}><strong>{c.title}</strong>{c.paths.map(path=><Link key={path} href={path} onClick={close}>{name(path)}</Link>)}</section>)}</div></div><Link href="/iletisim" onClick={close}>İLETİŞİM</Link><Link className="mobile-menu-quote" href="/iletisim" onClick={close}>TEKLİF AL</Link></nav><Link className="head-quote" href="/iletisim">TEKLİF AL</Link></div></header>}
function Footer(){const channels=[{label:'Instagram',url:socials[0][1],symbol:'◎'},{label:'Facebook',url:socials[1][1],symbol:'f'},{label:'WhatsApp',url:socials[2][1],symbol:'◉'},{label:'LinkedIn',url:socials[3][1],symbol:'in'}];return <footer className="premium-footer"><div className="premium-footer-inner"><div className="footer-brand"><Link href="/" aria-label="Bekirağaoğlu Sigorta ana sayfa"><img src={logo} alt="Bekirağaoğlu Sigorta logosu"/></Link><div className="footer-address"><span className="footer-line-icon" aria-hidden="true">⌖</span><p>Karşıyaka Mah. Gazi Blv. Kartallar<br/>Plaza No: 183/3 Kepez/Antalya</p></div></div><div className="footer-contact"><h2>BİZE ULAŞIN</h2><div className="footer-gold-rule"/><a href="tel:+905423039030"><span className="footer-line-icon" aria-hidden="true">☎</span><span>0 542 303 90 30</span></a><a href="mailto:info@bekiragaoglusigorta.com.tr"><span className="footer-line-icon" aria-hidden="true">✉</span><span>info@bekiragaoglusigorta.com.tr</span></a><div className="footer-hours"><span className="footer-line-icon" aria-hidden="true">▦</span><span>P.tesi - C.tesi · 09:00 - 18:00</span></div></div><div className="footer-social"><h2>BİZİ TAKİP EDİN</h2><div className="footer-gold-rule"/><div className="footer-social-icons">{channels.map(c=><a key={c.label} href={c.url} target="_blank" rel="noopener noreferrer" aria-label={c.label} title={c.label}>{c.symbol}</a>)}</div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Bekirağaoğlu Sigorta. Tüm hakları saklıdır.</span><span>Güvenle yarınlara.</span></div></footer>}
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
  const types:Record<string,string[]>={
    '/bireyselemeklilik':['saving','fund','support'],
    '/özelsağlıksigortası':['outpatient','bed','ambulance'],
    '/tamamlayıcısağlıksigortası':['outpatient','bed','ambulance'],
    '/saglıkturizmikomplikasyon':['outpatient','bed','ambulance'],
    '/seyahatsaglıksigortası':['hospital','plane','luggage','passport'],
    '/evcilhayvansigortası':['hospital','pet','syringe','injury'],
    '/ferdikazasigortası':['pulse','wheelchair','family'],
    '/hayatsigortası':['pulse','heart','credit','wheelchair'],
    '/zorunlutrafiksigortası':['money','heart','wheelchair','memorial'],
    '/kaskosigortası':['wallet','heart','wheelchair','memorial'],
    '/yesilkartsigortası':['car','cars','ambulance'],
    '/konutsigortası':['storm','lock','fire','glass'],
    '/daskzorunludepremsigortası':['building'],
    '/i̇syerisigortası':['alert','lock','gears'],
    '/i̇nsaatallrisksigortası':['crane','lock','tools']
  };
  const type=(types[path]||['shield'])[index]||'shield';
  const common={fill:"none",stroke:"#d4a12d",strokeWidth:2.5,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  return <div className="service-icon" aria-hidden="true"><svg viewBox="0 0 96 68" role="presentation">
    {type==='saving'&&<g {...common}><circle cx="48" cy="23" r="17"/><path d="M48 12v22m7-17c-4-5-14-4-14 2 0 8 15 4 15 12-1 6-12 7-16 2"/><path d="M29 48c-8-10-12-16-17-11-3 4 4 16 10 21l15 7m30-17c8-10 12-16 17-11 3 4-4 16-10 21l-15 7M30 47l10 6m26-6-10 6"/></g>}
    {type==='fund'&&<g {...common}><path d="M69 16a28 28 0 1 0 7 23M68 6l2 15-16-1"/><path d="M48 20v28m8-23c-6-5-17-4-17 4 0 8 18 5 18 13-1 8-14 9-19 3"/></g>}
    {type==='support'&&<g {...common}><path d="M22 38v-6a26 26 0 0 1 52 0v6"/><rect x="17" y="33" width="12" height="22" rx="5"/><rect x="67" y="33" width="12" height="22" rx="5"/><path d="M73 55c0 10-12 12-24 12"/><circle cx="46" cy="64" r="3" fill="#d4a12d"/></g>}
    {type==='outpatient'&&<g {...common}><circle cx="48" cy="23" r="13"/><path d="M26 61V48c0-10 9-17 22-17s22 7 22 17v13M37 44l11 10 11-10M48 39v19"/></g>}
    {type==='bed'&&<g {...common} strokeWidth={4}><path d="M15 13v47m0-12h68v12M15 38h68v10H15z"/><circle cx="30" cy="30" r="7"/><path d="M42 26h32v12H42z"/></g>}
    {type==='ambulance'&&<g {...common} strokeWidth={3}><path d="M10 23h47v30H10zM57 33h13l13 12v8H57z"/><circle cx="25" cy="56" r="7" fill="#fff"/><circle cx="68" cy="56" r="7" fill="#fff"/><path d="M29 30h13m-6-7v14"/></g>}
    {type==='hospital'&&<g {...common}><path d="M26 62V9h44v53M19 62h58M26 19h44M48 25v21m-11-11h22M37 62V49h22v13"/></g>}
    {type==='plane'&&<g {...common}><path d="M9 35 82 29c8-1 9 6 1 9l-28 4-18 19-9-1 12-21-19 1-9 8-6-2 7-12-7-11 6-2 13 10z"/></g>}
    {type==='luggage'&&<g {...common}><rect x="12" y="19" width="40" height="43" rx="5"/><path d="M24 19V9h16v10M23 62v4m19-4v4"/><rect x="53" y="34" width="31" height="28" rx="5"/><path d="M62 34v-7h12v7"/></g>}
    {type==='passport'&&<g {...common}><rect x="17" y="8" width="60" height="52" rx="5"/><path d="M48 8v52M22 14h21v39H22z"/><circle cx="32" cy="30" r="7"/><path d="M25 43h16m14-27h15m-15 10h15m-15 10h15"/></g>}
    {type==='pet'&&<g {...common}><circle cx="48" cy="39" r="17"/><path d="M31 30 21 14l-9 14 8 18 12 7M65 30l10-16 9 14-8 18-12 7M41 39h2m11 0h2m-11 8 3 3 3-3"/></g>}
    {type==='syringe'&&<g {...common}><path d="m20 51 34-34 23 23-34 34M52 15l8-8m-3 14 9-9m-42 44-10 10m8-25 14 14m-8-22 14 14m-7-22 14 14M19 56l-9 9"/></g>}
    {type==='injury'&&<g {...common}><path d="M16 42 48 13l32 29-32 23zM32 27l32 30m0-30L32 57M48 24v29m-13-14h26"/></g>}
    {type==='pulse'&&<g {...common} strokeWidth={3}><path d="M5 38h22l10-22 12 41 10-29 7 10h25"/></g>}
    {type==='wheelchair'&&<g {...common} strokeWidth={3}><circle cx="44" cy="46" r="17"/><circle cx="49" cy="9" r="6"/><path d="M49 18v18h21l12 20M49 26H33"/></g>}
    {type==='family'&&<g {...common}><circle cx="22" cy="19" r="7"/><circle cx="74" cy="19" r="7"/><circle cx="48" cy="31" r="6"/><path d="M12 60V35q10-11 20 0v25m32 0V35q10-11 20 0v25M39 62V44q9-8 18 0v18"/></g>}
    {type==='heart'&&<g {...common}><path d="M48 60 17 33C-2 13 24-1 48 24 72-1 98 13 79 33z"/><path d="M20 37h15l8-12 9 25 8-13h16"/></g>}
    {type==='credit'&&<g {...common}><circle cx="48" cy="34" r="29"/><rect x="26" y="25" width="44" height="25" rx="4"/><path d="M26 33h44m-35 9h12"/></g>}
    {type==='money'&&<g {...common}><path d="M18 14h60l-8 49H26zM36 14l-6-8h36l-6 8"/><path d="M48 22v34m9-25c-6-6-19-5-19 3 0 7 20 3 20 12 0 8-15 9-21 3"/></g>}
    {type==='wallet'&&<g {...common}><rect x="15" y="19" width="66" height="43" rx="6"/><path d="M15 24 64 9l6 10M59 35h23v15H59a8 8 0 0 1 0-15z"/><circle cx="66" cy="42" r="2"/></g>}
    {type==='memorial'&&<g {...common}><path d="M24 60h48M31 55V26a17 17 0 0 1 34 0v29zM20 60h56"/></g>}
    {type==='car'&&<g {...common}><path d="m16 44 9-22h45l10 22v19H16zM22 44h52M29 22l7-9h27l8 9M24 55h12m25 0h12"/></g>}
    {type==='cars'&&<g {...common}><path d="M8 45 18 28h32l10 17v17H8zM38 29l7-15h31l10 22v26H60M12 51h15m18 0h12m12-8h11"/></g>}
    {type==='storm'&&<g {...common}><path d="M21 42a17 17 0 0 1 5-32 22 22 0 0 1 43 4 15 15 0 0 1 5 28H21z"/><path d="m48 34-13 22h14l-6 12 24-29H52l7-13"/></g>}
    {type==='lock'&&<g {...common}><path d="M23 30V18a25 25 0 0 0 50 0v12M23 30h50v34H23z"/><rect x="42" y="39" width="12" height="17" rx="5"/></g>}
    {type==='fire'&&<g {...common}><path d="M48 6c12 18-2 25 11 33 1-10 11-13 10-23 18 24 14 49-19 51-30 2-39-25-22-43-1 14 11 17 20-18z"/></g>}
    {type==='glass'&&<g {...common}><path d="M48 5 85 22v25L48 65 11 47V22zM48 5v60M11 22l74 25M85 22 11 47M32 13l34 44M66 13 32 57"/></g>}
    {type==='building'&&<g {...common}><path d="M27 64V6h42v58M20 64h56M36 16h8m10 0h8m-26 12h8m10 0h8m-26 12h8m10 0h8M43 64V50h12v14"/></g>}
    {type==='alert'&&<g {...common}><circle cx="48" cy="34" r="29"/><path d="M48 15v28"/><circle cx="48" cy="53" r="2" fill="#d4a12d"/></g>}
    {type==='gears'&&<g {...common}><circle cx="38" cy="29" r="19"/><circle cx="38" cy="29" r="8"/><circle cx="69" cy="49" r="13"/><circle cx="69" cy="49" r="5"/><path d="M38 3v8m0 36v8M12 29h8m36 0h8M20 11l6 6m24 24 6 6m0-36-6 6m-24 24-6 6"/></g>}
    {type==='crane'&&<g {...common}><path d="M17 64V11h8v53M10 11h73M25 18h47M56 11v21m-5 0h10M17 11 25 4 83 11M8 64h32M55 43l16-7 16 7v18H55z"/></g>}
    {type==='tools'&&<g {...common}><path d="m16 53 37-37 13 13-37 37zM54 15 67 2l9 9-13 13M49 47l19 19M57 39l24 24M15 14l22 22"/></g>}
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
function Corporate({page}:{page:Page}){
 const raw=page.chunks.map(c=>c.text).join(' ').replace(/^KURUMSAL\s*/,'');
 const sections=['Biz Kimiz?','Ne Yapıyoruz?','Neden Biz?','Misyonumuz.','Vizyonumuz.'];
 const blocks=sections.map((heading,i)=>{const from=raw.indexOf(heading);const to=i+1<sections.length?raw.indexOf(sections[i+1],from+heading.length):raw.length;return {heading,text:from<0?'':raw.slice(from+heading.length,to).trim()};});
 const who=blocks[0].text;
 const paragraphs=['Kurulduğu yıllarda','Bugün, sektördeki'];
 const first=paragraphs.reduce((a,t)=>{const i=who.indexOf(t);return i>=0?[...a,i]:a},[] as number[]).sort((a,b)=>a-b);
 const whoParts=[0,...first,who.length].slice(0,-1).map((v,i,arr)=>who.slice(v,(i+1<arr.length?arr[i+1]:who.length)).trim());
 return <><section className="corporate-hero" aria-hidden="true"></section><section className="corporate-page"><h1>KURUMSAL</h1><div className="corporate-body">{blocks.map((b,i)=><section key={b.heading} className="corporate-block"><h2>{b.heading.replace(/\.$/,'')}</h2>{i===0?whoParts.map((t,j)=><p key={j}>{t}</p>):i===2?<div className="corporate-reasons">{b.text.split('•').filter(Boolean).map((t,j)=><p key={j}>• {t.trim()}</p>)}</div>:<p>{b.text}</p>}</section>)}</div></section></>
}
function Contact(){const maps='https://www.google.com/maps/search/?api=1&query=Bekiragaoglu+Sigorta+Karsiyaka+Mahallesi+Gazi+Bulvari+Kartallar+Plaza+183%2F3+Kepez+Antalya';return <><section className="contact-hero"><div><span>BEKİRAĞAOĞLU SİGORTA</span><h1>İletişime Geçin</h1><p>Sigorta ihtiyaçlarınız için uzman ekibimizle hızlıca iletişime geçin.</p></div></section><section className="contact-modern wrap"><div className="contact-cards"><a className="contact-card" href="tel:+905423039030"><span className="contact-card-icon">☎</span><div><small>TELEFON</small><strong>0 542 303 90 30</strong><em>Aramak için dokunun</em></div></a><a className="contact-card" href={maps} target="_blank" rel="noreferrer"><span className="contact-card-icon">⌖</span><div><small>KONUM</small><strong>Karşıyaka Mah. Gazi Blv.<br/>Kartallar Plaza No: 183/3 Kepez/Antalya</strong><em>Yol tarifi için dokunun →</em></div></a><a className="contact-card" href="mailto:info@bekiragaoglusigorta.com.tr"><span className="contact-card-icon">✉</span><div><small>E-POSTA</small><strong>info@bekiragaoglusigorta.com.tr</strong><em>E-posta gönderin</em></div></a></div><div className="contact-main"><div className="contact-map-card"><div className="contact-map-copy"><small>OFİSİMİZ</small><h2>Bizi ziyaret edin</h2><p>Karşıyaka Mah. Gazi Blv. Kartallar Plaza No: 183/3 Kepez/Antalya</p><a href={maps} target="_blank" rel="noreferrer" className="contact-route">Google Maps'te Yol Tarifi Al →</a></div><div className="contact-hours"><span>Çalışma Saatleri</span><strong>Pazartesi - Cumartesi</strong><b>09:00 — 18:00</b></div></div><div className="contact-form-card"><div className="contact-form-title"><small>BİZE YAZIN</small><h2>İletişim Formu</h2><p>Formu doldurun, en kısa sürede sizinle iletişime geçelim.</p></div><Form kind="iletisim"/></div></div></section></>}
function Gallery({page}:{page:Page}){return <section className="wrap gallery"><h1>GALERİ</h1><div>{page.images.slice(1).map((im,i)=>i===7||i===11?<video key={i} controls playsInline preload="metadata" poster={asset(im.src)} src={i===7?'/media/gallery-video-1.mp4':'/media/gallery-video-2.mp4'}/>:<img key={i} src={asset(im.src)} alt={im.alt||`Galeri görseli ${i+1}`}/>)}</div></section>}
export default function Site({path}:{path:string}){const page=all.find(p=>p.path===path);return <><Header/><main>{!page?<section className="wrap missing"><h1>Sayfa bulunamadı</h1><Link href="/">Ana Sayfa</Link></section>:path==='/'?<Home page={page}/>:path==='/kurumsal'?<Corporate page={page}/>:path==='/iletisim'?<Contact/>:path==='/blank-2-1'?<Gallery page={page}/>:<Product page={page}/>}</main><Footer/></>}
