'use client';
import {useEffect,useMemo,useState} from 'react';
import {createLead,getSession,listLeads,updateLeadStatus} from '../../lib/solavol-data';

type Lead={id:string;name:string;city:string|null;source:string;status:string;potential_value:number};
const stageMap:Record<string,string>={Neu:'new',Kontaktiert:'contacted',Termin:'appointment',Angebot:'offer',Gewonnen:'won'};
const reverse:Record<string,string>={new:'Neu',contacted:'Kontaktiert',appointment:'Termin',offer:'Angebot',won:'Gewonnen',lost:'Verloren'};
const stages=['Neu','Kontaktiert','Termin','Angebot','Gewonnen'];

export default function LeadBoard(){
 const [leads,setLeads]=useState<Lead[]>([]);
 const [draft,setDraft]=useState({name:'',city:'',source:'Website',value:'0'});
 const [open,setOpen]=useState(false);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');

 async function refresh(){
  try{
   setError('');
   const session=await getSession();
   if(!session){window.location.href='/login';return;}
   const rows=await listLeads();
   setLeads(rows as Lead[]);
  }catch(e:any){setError(e?.message||'Daten konnten nicht geladen werden');}
  finally{setLoading(false);}
 }
 useEffect(()=>{refresh()},[]);
 const count=useMemo(()=>leads.length,[leads]);

 async function move(id:string,statusLabel:string){
   const old=leads;
   const dbStatus=stageMap[statusLabel];
   setLeads(x=>x.map(l=>l.id===id?{...l,status:dbStatus}:l));
   try{await updateLeadStatus(id,dbStatus);}catch(e:any){setLeads(old);setError(e?.message||'Status konnte nicht gespeichert werden');}
 }

 async function add(){
   if(!draft.name.trim())return;
   try{
    const row=await createLead({name:draft.name.trim(),city:draft.city.trim(),source:draft.source.trim()||'Website',potential_value:Number(draft.value.replace(/[^0-9.,-]/g,'').replace(',','.'))||0});
    setLeads(x=>[row as Lead,...x]);
    setDraft({name:'',city:'',source:'Website',value:'0'});
    setOpen(false);
   }catch(e:any){setError(e?.message||'Lead konnte nicht gespeichert werden');}
 }

 if(loading)return <p style={{padding:'24px 0',color:'#6f7e79'}}>Leads werden geladen…</p>;

 return <>
 <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',margin:'24px 0'}}>
   <div><p style={{fontSize:11,letterSpacing:'.12em',fontWeight:800,color:'#7c8d87',margin:0}}>LEAD-CENTER</p><h1 style={{margin:'6px 0 4px'}}>Interessenten & Pipeline</h1><p style={{margin:0,color:'#6f7e79'}}>{count} echte Leads · Änderungen werden gespeichert</p></div>
   <button onClick={()=>setOpen(!open)} style={{background:'#153d31',color:'#fff',border:0,borderRadius:10,padding:'11px 16px',fontWeight:700}}>+ Lead erfassen</button>
 </div>
 {error&&<p style={{background:'#fff0ed',color:'#8a3528',padding:10,borderRadius:10}}>{error}</p>}
 {open&&<div style={{background:'#fff',padding:16,borderRadius:14,border:'1px solid #e3e9e7',marginBottom:16,display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr auto',gap:10}}>
  <input placeholder="Name" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/>
  <input placeholder="Ort" value={draft.city} onChange={e=>setDraft({...draft,city:e.target.value})}/>
  <input placeholder="Quelle" value={draft.source} onChange={e=>setDraft({...draft,source:e.target.value})}/>
  <input placeholder="Pot. Wert €" value={draft.value} onChange={e=>setDraft({...draft,value:e.target.value})}/>
  <button onClick={add} style={{background:'#153d31',color:'#fff',border:0,borderRadius:9,padding:'10px 14px'}}>Speichern</button>
 </div>}
 <section style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,overflowX:'auto'}}>
 {stages.map(stage=><div key={stage} style={{minWidth:210,background:'#eef2f0',borderRadius:16,padding:12}}>
  <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><b>{stage}</b><span>{leads.filter(l=>reverse[l.status]===stage).length}</span></div>
  {leads.filter(l=>reverse[l.status]===stage).map(l=><article draggable onDragStart={e=>e.dataTransfer.setData('lead',l.id)} key={l.id} style={{background:'#fff',padding:14,borderRadius:12,marginBottom:10,border:'1px solid #e3e9e7',cursor:'grab'}}>
   <b style={{display:'block',fontSize:14}}>{l.name}</b><span style={{fontSize:11,color:'#87948f'}}>{l.city||'—'} · {l.source}</span><strong style={{display:'block',marginTop:14,color:'#153d31'}}>{Number(l.potential_value||0).toLocaleString('de-DE',{style:'currency',currency:'EUR'})}</strong>
   <select value={reverse[l.status]||'Neu'} onChange={e=>move(l.id,e.target.value)} style={{marginTop:12,width:'100%',padding:8,borderRadius:8,border:'1px solid #dce4e1'}}>{stages.map(s=><option key={s}>{s}</option>)}</select>
  </article>)}
  <div onDragOver={e=>e.preventDefault()} onDrop={e=>move(e.dataTransfer.getData('lead'),stage)} style={{height:34,border:'1px dashed #c9d3cf',borderRadius:9,display:'grid',placeItems:'center',fontSize:10,color:'#8b9994'}}>Hier ablegen</div>
 </div>)}
 </section></>
}