import './style.css';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Bekirağaoğlu Sigorta',description:'Bekirağaoğlu Sigorta',icons:{icon:'/media/5f9784_d390e58c0a8845fbb2d465a2cd79f49a~mv2.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>}
