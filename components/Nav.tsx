'use client';
import {usePathname} from 'next/navigation';
const items=[['/','Übersicht','⌂'],['/leads','Leads','◎'],['/kampagnen','Kampagnen','↗'],['/aufgaben','Aufgaben','✓'],['/reports','Reports','▥'],['/admin','Growth OS Demo','✧']];
export default function Nav(){
 const path=usePathname();
 return <nav>{items.map(([href,label,icon])=><a key={href} href={href} className={path===href?'active':''}><span>{icon}</span>{label}</a>)}</nav>
}