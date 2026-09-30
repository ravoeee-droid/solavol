'use client';
import {useEffect,useState} from 'react';
import {getSession,listTasks,toggleTask} from '../../lib/solavol-data';

type Task={id:string;title:string;owner:'solavol'|'digitale_gewinner';status:'open'|'done';due_at:string|null};

export default function TaskBoard(){
 const [tasks,setTasks]=useState<Task[]>([]);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');

 useEffect(()=>{(async()=>{
  try{
   const session=await getSession();
   if(!session){window.location.href='/login';return;}
   setTasks(await listTasks() as Task[]);
  }catch(e:any){setError(e?.message||'Aufgaben konnten nicht geladen werden');}
  finally{setLoading(false);}
 })()},[]);

 async function toggle(id:string,current:'open'|'done'){
  const next=current==='done'?'open':'done';
  const old=tasks;
  setTasks(t=>t.map(x=>x.id===id?{...x,status:next}:x));
  try{await toggleTask(id,next);}catch(e:any){setTasks(old);setError(e?.message||'Aufgabe konnte nicht gespeichert werden');}
 }

 if(loading)return <p style={{color:'#6f7e79'}}>Aufgaben werden geladen…</p>;

 return <>
 {error&&<p style={{background:'#fff0ed',color:'#8a3528',padding:10,borderRadius:10}}>{error}</p>}
 <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
 {(['SOLAVOL','Digitale Gewinner'] as const).map(owner=><section key={owner} style={{background:'#fff',border:'1px solid #e3e9e7',borderRadius:16,padding:20}}>
  <h2 style={{fontSize:17}}>{owner}</h2>
  {tasks.filter(t=>(owner==='SOLAVOL'?t.owner==='solavol':t.owner==='digitale_gewinner')).map(t=><div key={t.id} style={{display:'flex',gap:12,padding:'14px 0',borderTop:'1px solid #edf1ef',opacity:t.status==='done'?.55:1}}>
   <button onClick={()=>toggle(t.id,t.status)} style={{width:28,height:28,borderRadius:9,border:'1px solid #d6dfdb',background:t.status==='done'?'#153d31':'#fff',color:t.status==='done'?'#fff':'#71817b'}}>✓</button>
   <div><b style={{fontSize:13,textDecoration:t.status==='done'?'line-through':'none'}}>{t.title}</b><span style={{display:'block',fontSize:11,color:'#87948f',marginTop:4}}>Fällig: {t.due_at?new Date(t.due_at).toLocaleDateString('de-DE'):'ohne Datum'}</span></div>
  </div>)}
  {tasks.filter(t=>(owner==='SOLAVOL'?t.owner==='solavol':t.owner==='digitale_gewinner')).length===0&&<p style={{fontSize:12,color:'#87948f'}}>Keine offenen Aufgaben.</p>}
 </section>)}</div></>
}