'use client';
import {useMemo,useState} from 'react';
type Lead={name:string;city:string;source:string;status:string;value:string};
const initial:Lead[]=[
{name:'Martin Keller',city:'Stuttgart',source:'Meta · Eigenheim',status:'Neu',value:'18.000 €'},
{name:'Laura Schneider',city:'Ulm',source:'Meta · Stromkosten',status:'Kontaktiert',value:'22.500 €'},
{name:'Tobias Wagner',city:'Reutlingen',source:'Website',status:'Termin',value:'15.800 €'},
{name:'Anna Richter',city:'Tübingen',source:'Meta · Referenz',status:'Angebot',value:'28.200 €'},
{name:'Daniel Schmid',city:'Balingen',source:'Google',status:'Gewonnen',value:'19.900 €'}];
const stages=['Neu','Kontaktiert','Termin','Angebot','Gewonnen'];
export default function LeadBoard(){
 const [leads,setLeads]=useState(initial);
 const [draft,setDraft]=useState({name:'',city:'',source:'Website',value:'0 €'});
 const [open,setOpen]=useState(false);
 const count=useMemo(()=>leads.length,[leads]);
 function move(name:string,status:string){setLeads(x=>x.map(l=>l.name===name?{...l,status}:l))}
 function add(){if(!draft.name.trim())return;setLeads(x=>[{...draft,status:'Neu'},...x]);setDraft({name:'',city:'',source:'Website',value:'0 €'});setOpen(false)}
 return <>
 <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',margin:'24px 0'}}>
   <div><p style={{fontSize:11,letterSpacing:'.12em',fontWeight:800,color:'#7c8d87',margin:0}}>LEAD-CENTER</p><h1 style={{margin:'6px 0 4px'}}>Interessenten & Pipeline</h1><p style={{margin:0,color:'#6f7e79'}}>{count} Leads · Status direkt änderbar</p></div>
   <button onClick={()=>setOpen(!open)} style={{background:'#153d31',color:'#fff',border:0,borderRadius:10,padding:'11px 16px',fontWeight:700}}>+ Lead erfassen</button>
 </div>
 {open&&<div style={{background:'#fff',padding:16,borderRadius:14,border:'1px solid #e3e9e7',marginBottom:16,display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr auto',gap:10}}>
  <input placeholder="Name" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/>
  <input placeholder="Ort" value={draft.city} onChange={e=>setDraft({...draft,city:e.target.value})}/>
  <input placeholder="Quelle" value={draft.source} onChange={e=>setDraft({...draft,source:e.target.value})}/>
  <input placeholder="Wert" value={draft.value} onChange={e=>setDraft({...draft,value:e.target.value})}/>
  <button onClick={add} style={{background:'#153d31',color:'#fff',border:0,borderRadius:9,padding:'10px 14px'}}>Speichern</button>
 </div>}
 <section style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,overflowX:'auto'}}>
 {stages.map(stage=><div key={stage} style={{minWidth:210,background:'#eef2f0',borderRadius:16,padding:12}}>
  <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><b>{stage}</b><span>{leads.filter(l=>l.status===stage).length}</span></div>
  {leads.filter(l=>l.status===stage).map(l=><article draggable onDragStart={e=>e.dataTransfer.setData('lead',l.name)} key={l.name} style={{background:'#fff',padding:14,borderRadius:12,marginBottom:10,border:'1px solid #e3e9e7',cursor:'grab'}}>
   <b style={{display:'block',fontSize:14}}>{l.name}</b><span style={{fontSize:11,color:'#87948f'}}>{l.city} · {l.source}</span><strong style={{display:'block',marginTop:14,color:'#153d31'}}>{l.value}</strong>
   <select value={l.status} onChange={e=>move(l.name,e.target.value)} style={{marginTop:12,width:'100%',padding:8,borderRadius:8,border:'1px solid #dce4e1'}}>{stages.map(s=><option key={s}>{s}</option>)}</select>
  </article>)}
  <div onDragOver={e=>e.preventDefault()} onDrop={e=>move(e.dataTransfer.getData('lead'),stage)} style={{height:34,border:'1px dashed #c9d3cf',borderRadius:9,display:'grid',placeItems:'center',fontSize:10,color:'#8b9994'}}>Hier ablegen</div>
 </div>)}
 </section></>
}