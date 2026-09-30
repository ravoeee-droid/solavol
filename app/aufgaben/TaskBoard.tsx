'use client';
import {useState} from 'react';
const seed=[
{owner:'SOLAVOL',task:'3 neue Projektfotos hochladen',due:'Heute',done:false},
{owner:'Digitale Gewinner',task:'Creative B gegen Creative D testen',due:'Heute',done:false},
{owner:'SOLAVOL',task:'GF-Video für Landingpage freigeben',due:'Morgen',done:false},
{owner:'Digitale Gewinner',task:'Formular-Abbruch auf Mobile prüfen',due:'Morgen',done:false}
];
export default function TaskBoard(){
 const [tasks,setTasks]=useState(seed);
 const toggle=(i:number)=>setTasks(t=>t.map((x,n)=>n===i?{...x,done:!x.done}:x));
 return <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
 {['SOLAVOL','Digitale Gewinner'].map(owner=><section key={owner} style={{background:'#fff',border:'1px solid #e3e9e7',borderRadius:16,padding:20}}>
  <h2 style={{fontSize:17}}>{owner}</h2>
  {tasks.map((t,i)=>({t,i})).filter(x=>x.t.owner===owner).map(({t,i})=><div key={i} style={{display:'flex',gap:12,padding:'14px 0',borderTop:'1px solid #edf1ef',opacity:t.done?.55:1}}>
   <button onClick={()=>toggle(i)} style={{width:28,height:28,borderRadius:9,border:'1px solid #d6dfdb',background:t.done?'#153d31':'#fff',color:t.done?'#fff':'#71817b'}}>✓</button>
   <div><b style={{fontSize:13,textDecoration:t.done?'line-through':'none'}}>{t.task}</b><span style={{display:'block',fontSize:11,color:'#87948f',marginTop:4}}>Fällig: {t.due}</span></div>
  </div>)}
 </section>)}</div>
}