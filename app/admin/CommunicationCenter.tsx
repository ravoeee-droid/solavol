'use client';
import {useMemo,useState} from 'react';
import './communication.css';

type Tab='inbox'|'followups'|'compose';
type Channel='E-Mail'|'WhatsApp';
type Thread={id:number;name:string;channel:Channel;subject:string;preview:string;date:string;unread:boolean;conversation:{from:'customer'|'solavol';text:string;at:string}[]};
type Followup={id:number;name:string;task:string;due:string;channel:Channel;done:boolean};
type Draft={id:number;name:string;subject:string;text:string;channel:Channel};
const seedThreads:Thread[]=[
 {id:1,name:'Familie Muster',channel:'E-Mail',subject:'Anfrage Solaranlage mit Speicher',preview:'Wir möchten gerne wissen, ob unser Dach geeignet ist.',date:'09:42',unread:true,conversation:[
 {from:'customer',text:'Guten Tag, wir interessieren uns für eine Solaranlage mit Speicher für unser Einfamilienhaus in Ortenberg. Können wir einen Beratungstermin vereinbaren?',at:'09:42'}]},
 {id:2,name:'Julia Mustermann',channel:'WhatsApp',subject:'Rückfrage zum Angebot',preview:'Kann man den Speicher später erweitern?',date:'Gestern',unread:true,conversation:[
 {from:'solavol',text:'Guten Tag, wir haben Ihr Angebot vorbereitet. Melden Sie sich gerne bei Fragen.',at:'Mo 15:30'},
 {from:'customer',text:'Vielen Dank! Kann man den Speicher später erweitern?',at:'Gestern'}]},
 {id:3,name:'Thomas Demo',channel:'E-Mail',subject:'Terminbestätigung',preview:'Donnerstag passt uns sehr gut.',date:'Gestern',unread:false,conversation:[
 {from:'customer',text:'Donnerstag passt uns sehr gut. Können Sie uns noch die genaue Uhrzeit bestätigen?',at:'Gestern'}]},
 {id:4,name:'Sophie Beispiel',channel:'E-Mail',subject:'Angebot Photovoltaik',preview:'Wir schauen uns das Angebot am Wochenende an.',date:'Mo',unread:false,conversation:[
 {from:'solavol',text:'Vielen Dank für das Gespräch. Anbei erhalten Sie unser Angebot.',at:'Mo 09:30'},
 {from:'customer',text:'Danke! Wir schauen uns das Angebot am Wochenende an und melden uns.',at:'Mo 11:45'}]}
];
const seedFollowups:Followup[]=[
{id:1,name:'Sophie Beispiel',task:'Nachfrage zum offenen PV-Angebot',due:'Heute',channel:'E-Mail',done:false},
{id:2,name:'Familie Muster',task:'Erstkontakt zur Solaranfrage',due:'Heute',channel:'E-Mail',done:false},
{id:3,name:'Julia Mustermann',task:'Speicherfrage beantworten',due:'Überfällig',channel:'WhatsApp',done:false},
{id:4,name:'Thomas Demo',task:'Beratungstermin bestätigen',due:'Morgen',channel:'E-Mail',done:false}];
const templates=[
 {id:'first',label:'Neue Anfrage beantworten',subject:'Ihre Anfrage bei SOLAVOL',text:'Guten Tag,\n\nvielen Dank für Ihr Interesse an einer Photovoltaiklösung von SOLAVOL. Gerne besprechen wir Ihre Wünsche und die Möglichkeiten für Ihr Haus.\n\nWann erreichen wir Sie am besten für ein kurzes Gespräch?\n\nFreundliche Grüße\nIhr SOLAVOL-Team'},
 {id:'offer',label:'Angebot nachfassen',subject:'Kurze Rückfrage zu Ihrem Solavol-Angebot',text:'Guten Tag,\n\nich wollte mich kurz erkundigen, ob Sie unser Angebot in Ruhe anschauen konnten und ob noch Fragen offen sind.\n\nGerne können wir die nächsten Schritte gemeinsam besprechen.\n\nFreundliche Grüße\nIhr SOLAVOL-Team'},
 {id:'meeting',label:'Beratungstermin bestätigen',subject:'Ihr Beratungstermin mit SOLAVOL',text:'Guten Tag,\n\nvielen Dank für das freundliche Gespräch. Hiermit bestätigen wir unseren Beratungstermin.\n\nBitte teilen Sie uns mit, falls wir vorab noch etwas berücksichtigen sollen.\n\nFreundliche Grüße\nIhr SOLAVOL-Team'}
];
function Label({children,color='gray'}:{children:React.ReactNode;color?:'green'|'yellow'|'gray'}){return <span className={'cm-tag '+color}>{children}</span>}
export default function CommunicationCenter({leadNames,onGoLeads}:{leadNames:string[];onGoLeads:()=>void}){
 const [tab,setTab]=useState<Tab>('inbox');
 const [threads,setThreads]=useState(seedThreads);
 const [current,setCurrent]=useState(1);
 const [followups,setFollowups]=useState(seedFollowups);
 const [drafts,setDrafts]=useState<Draft[]>([]);
 const [search,setSearch]=useState('');
 const [toast,setToast]=useState('');
 const [reply,setReply]=useState('');
 const [creatingFollowup,setCreatingFollowup]=useState(false);
 const [newFollowup,setNewFollowup]=useState({name:'',task:'Angebot nachfassen',due:'Morgen',channel:'E-Mail' as Channel});
 const [compose,setCompose]=useState<{name:string;subject:string;text:string;channel:Channel}>({name:'',subject:'',text:'',channel:'E-Mail'});
 const [template,setTemplate]=useState('');
 const openThread=(id:number)=>{setCurrent(id);setThreads(rows=>rows.map(t=>t.id===id?{...t,unread:false}:t));setReply('')};
 const selected=threads.find(t=>t.id===current)??threads[0];
 const unseen=threads.filter(t=>t.unread).length;
 const due=followups.filter(f=>!f.done&&(f.due==='Heute'||f.due==='Überfällig')).length;
 const sortedFollowups=useMemo(()=>[...followups].sort((a,b)=>Number(a.done)-Number(b.done)),[followups]);
 const notify=(s:string)=>setToast(s);
 const insertTemplate=(which:string,name?:string,channel:Channel='E-Mail')=>{
   const t=templates.find(x=>x.id===which);
   if(!t)return;
   setTemplate(which);setCompose({name:name??compose.name,subject:t.subject,text:t.text,channel});setTab('compose');
 };
 const saveDraft=()=>{
   if(!compose.text.trim()||!compose.name.trim()){notify('Bitte Kontakt und Nachricht eingeben.');return;}
   setDrafts(p=>[{id:Date.now(),name:compose.name.trim(),subject:compose.subject.trim(),text:compose.text.trim(),channel:compose.channel},...p]);
   notify('Nachrichtenentwurf in dieser Demo gespeichert. Es wurde nichts versendet.');
 };
 const copyText=(value:string)=>{if(!value.trim())return;void navigator.clipboard?.writeText(value).then(()=>notify('Text kopiert. Noch keine Nachricht versendet.')).catch(()=>notify('Kopieren nicht möglich. Text bitte markieren.'))};
 const markRead=()=>setThreads(rows=>rows.map(t=>t.id===selected.id?{...t,unread:false}:t));
 const saveReply=()=>{
  if(!reply.trim())return;
  setDrafts(p=>[{id:Date.now(),name:selected.name,subject:selected.subject,text:reply.trim(),channel:selected.channel},...p]);
  notify('Antwort als Entwurf gespeichert – nicht gesendet.');
 };
 const addFollowup=()=>{
  if(!newFollowup.name.trim()||!newFollowup.task.trim())return;
  setFollowups(items=>[{id:Date.now(),name:newFollowup.name.trim(),task:newFollowup.task.trim(),due:newFollowup.due,channel:newFollowup.channel,done:false},...items]);
  setCreatingFollowup(false);
  setNewFollowup({name:'',task:'Angebot nachfassen',due:'Morgen',channel:'E-Mail'});
  notify('Wiedervorlage in der Demo erstellt.');
 };
 return <div className="cm">
  <div className="cm-heading">
   <div><span className="cm-kicker">KUNDENKOMMUNIKATION</span><h1>Nachrichten & Follow-ups</h1><p>Antworten, nachfassen und keine Anfrage liegen lassen. Alles an einem Ort.</p></div>
   <button className="cm-primary" onClick={()=>{setTab('compose');setCompose({name:'',subject:'',text:'',channel:'E-Mail'});setTemplate('')}}>✉ Nachricht schreiben</button>
  </div>
  <div className="cm-stats">
   <button onClick={()=>setTab('inbox')}><span>Offene Nachrichten</span><strong>{unseen}</strong><small>Antworten prüfen →</small></button>
   <button onClick={()=>setTab('followups')}><span>Heute nachfassen</span><strong>{due}</strong><small>Wiedervorlagen anzeigen →</small></button>
   <button onClick={()=>setTab('compose')}><span>Gespeicherte Entwürfe</span><strong>{drafts.length}</strong><small>E-Mails & WhatsApp →</small></button>
  </div>
  <div className="cm-tabs">
   <button className={tab==='inbox'?'current':''} onClick={()=>setTab('inbox')}>✉ Posteingang {unseen>0&&<span>{unseen}</span>}</button>
   <button className={tab==='followups'?'current':''} onClick={()=>setTab('followups')}>◷ Follow-ups {due>0&&<span>{due}</span>}</button>
   <button className={tab==='compose'?'current':''} onClick={()=>setTab('compose')}>✎ E-Mail & WhatsApp</button>
  </div>
  {toast&&<div className="cm-notice"><span>✓ {toast}</span><button onClick={()=>setToast('')}>×</button></div>}
  {tab==='inbox'&&<div className="cm-mail">
    <section className="cm-thread-list">
      <div className="cm-listhead"><h2>Nachrichten <Label color="yellow">DEMO</Label></h2><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="⌕  Kontakt suchen"/></div>
      {threads.filter(t=>(t.name+' '+t.subject).toLocaleLowerCase('de-DE').includes(search.toLocaleLowerCase('de-DE'))).map(t=><button key={t.id} className={'cm-thread '+(current===t.id?'chosen ':'')+(t.unread?'unread':'')} onClick={()=>openThread(t.id)}>
       <span className="cm-avatar">{t.name[0]}</span><span className="cm-thread-text"><span><b>{t.name}</b><small>{t.date}</small></span><strong>{t.subject}</strong><em>{t.preview}</em></span>{t.unread&&<i className="cm-unread"/>}
      </button>)}
      {threads.filter(t=>(t.name+' '+t.subject).toLocaleLowerCase('de-DE').includes(search.toLocaleLowerCase('de-DE'))).length===0&&<p className="cm-empty">Kein passender Kontakt.</p>}
    </section>
    <section className="cm-conversation">
      <div className="cm-conv-head"><div><h2>{selected.name}</h2><p>{selected.subject}</p></div><Label>{selected.channel}</Label></div>
      <div className="cm-messages">{selected.conversation.map((m,i)=><div className={'cm-bubble '+(m.from==='solavol'?'out':'in')} key={i}><small>{m.from==='solavol'?'SOLAVOL':selected.name} · {m.at}</small><p>{m.text}</p></div>)}</div>
      <div className="cm-answer"><label htmlFor="cm-reply">Antwort als Entwurf schreiben</label><textarea id="cm-reply" placeholder="Hier antworten …" rows={3} value={reply} onChange={e=>setReply(e.target.value)}/><div><button className="cm-outline" onClick={()=>{setReply(selected.channel==='WhatsApp'?'Hallo, vielen Dank für Ihre Nachricht! Gerne klären wir das kurz gemeinsam. Wann passt Ihnen ein Gespräch?':'Guten Tag,\n\nvielen Dank für Ihre Rückmeldung. Gerne besprechen wir Ihre Frage und die nächsten Schritte.\n\nFreundliche Grüße\nIhr SOLAVOL-Team');markRead()}}>✦ Antwortvorschlag</button><button className="cm-primary" disabled={!reply.trim()} onClick={saveReply}>Als Entwurf speichern</button></div></div>
    </section>
  </div>}
  {tab==='followups'&&<div className="cm-panel">
    <div className="cm-panel-head"><div><h2>Heute nachfassen</h2><p>Wiedervorlagen, offene Angebote und Rückrufe im Blick.</p></div><button className="cm-primary" onClick={()=>setCreatingFollowup(v=>!v)}>{creatingFollowup?'Schließen':'+ Follow-up'}</button></div>
    {creatingFollowup&&<div className="cm-follow-create">
      <label>Kontakt<select value={newFollowup.name} onChange={e=>setNewFollowup(p=>({...p,name:e.target.value}))}><option value="">Kontakt auswählen</option>{leadNames.map(l=><option key={l}>{l}</option>)}</select></label>
      <label>Aufgabe<input value={newFollowup.task} onChange={e=>setNewFollowup(p=>({...p,task:e.target.value}))}/></label>
      <label>Wann<select value={newFollowup.due} onChange={e=>setNewFollowup(p=>({...p,due:e.target.value}))}><option>Heute</option><option>Morgen</option><option>In 3 Tagen</option><option>Nächste Woche</option></select></label>
      <label>Kanal<select value={newFollowup.channel} onChange={e=>setNewFollowup(p=>({...p,channel:e.target.value as Channel}))}><option>E-Mail</option><option>WhatsApp</option></select></label>
      <button className="cm-primary" disabled={!newFollowup.name.trim()} onClick={addFollowup}>Anlegen</button>
    </div>}
    <div className="cm-follow-list">{sortedFollowups.map(f=><div key={f.id} className={f.done?'done':''}>
      <button className="cm-check" onClick={()=>{setFollowups(rows=>rows.map(x=>x.id===f.id?{...x,done:!x.done}:x));notify(f.done?'Wiedervorlage wieder geöffnet.':'Wiedervorlage erledigt.')}} title={f.done?'Wieder öffnen':'Als erledigt markieren'}>{f.done?'✓':''}</button>
      <span className="cm-follow-detail"><b>{f.name}</b><small>{f.task}</small></span>
      <Label color={f.done?'green':f.due==='Überfällig'?'yellow':'gray'}>{f.done?'Erledigt':f.due}</Label>
      <span className="cm-follow-channel">{f.channel}</span>
      {!f.done&&<div className="cm-follow-actions"><button onClick={()=>{setFollowups(rows=>rows.map(x=>x.id===f.id?{...x,due:'Morgen'}:x));notify('Wiedervorlage auf morgen gesetzt.')}}>Morgen</button><button className="cm-primary" onClick={()=>insertTemplate('offer',f.name,f.channel)}>Nachricht ↗</button></div>}
    </div>)}</div>
    <div className="cm-helper"><strong>Später automatisierbar:</strong> Bleibt eine Anfrage ohne Antwort, erstellt das System automatisch eine Wiedervorlage. Das ist hier noch eine Demo, keine laufende Automatik.</div>
  </div>}
  {tab==='compose'&&<div className="cm-compose">
   <section className="cm-panel">
    <div className="cm-panel-head"><div><h2>Nachricht vorbereiten</h2><p>Einfach E-Mail oder WhatsApp auswählen.</p></div><Label color="yellow">Noch kein Versand</Label></div>
    <div className="cm-choice"><button className={compose.channel==='E-Mail'?'on':''} onClick={()=>setCompose(p=>({...p,channel:'E-Mail'}))}>✉ E-Mail</button><button className={compose.channel==='WhatsApp'?'on':''} onClick={()=>setCompose(p=>({...p,channel:'WhatsApp'}))}>◉ WhatsApp</button></div>
    <div className="cm-form">
     <label>Empfänger<input list="cm-leads" placeholder="Kontakt auswählen oder eingeben" value={compose.name} onChange={e=>setCompose(p=>({...p,name:e.target.value}))}/><datalist id="cm-leads">{leadNames.map(name=><option value={name} key={name}/>)}</datalist></label>
     <label>Vorlage<select value={template} onChange={e=>{const t=templates.find(t=>t.id===e.target.value);setTemplate(e.target.value);if(t)setCompose(p=>({...p,subject:t.subject,text:t.text}))}}><option value="">Freie Nachricht</option>{templates.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></label>
     {compose.channel==='E-Mail'&&<label>Betreff<input placeholder="Betreff" value={compose.subject} onChange={e=>setCompose(p=>({...p,subject:e.target.value}))}/></label>}
     <label>Nachricht<textarea rows={8} placeholder="Nachricht an deinen Interessenten…" value={compose.text} onChange={e=>setCompose(p=>({...p,text:e.target.value}))}/></label>
    </div>
    <div className="cm-compose-actions"><button className="cm-outline" onClick={()=>copyText((compose.channel==='E-Mail'?('Betreff: '+compose.subject+'\n\n'):'')+compose.text)} disabled={!compose.text.trim()}>Text kopieren</button><button className="cm-primary" onClick={saveDraft} disabled={!compose.text.trim()||!compose.name.trim()}>Entwurf speichern</button></div>
   </section>
   <section className="cm-panel"><div className="cm-panel-head"><div><h2>Deine Entwürfe</h2><p>Vorbereitete Nachrichten in dieser Sitzung.</p></div><Label>{drafts.length}</Label></div>{drafts.length===0?<div className="cm-empty-state"><span>✉</span><b>Noch keine Entwürfe</b><p>Wähle eine Vorlage und speichere deine Nachricht. Hier bleibt alles übersichtlich.</p></div>:<div className="cm-drafts">{drafts.map(d=><div key={d.id}><div><b>{d.name}</b><small>{d.channel} · {d.subject||'Ohne Betreff'}</small></div><button onClick={()=>{setCompose({name:d.name,subject:d.subject,text:d.text,channel:d.channel});setTemplate('');notify('Entwurf zum Bearbeiten geöffnet.')}}>Öffnen →</button></div>)}</div>}
    <div className="cm-helper"><strong>Für den Echtbetrieb:</strong> E-Mail-Postfach sowie WhatsApp Business mit Freigabe verbinden. Bis dahin werden keine Nachrichten tatsächlich gesendet.</div>
   </section>
  </div>}
  <div className="cm-disclaimer">Präsentationsdemo mit fiktiven Kontakten. Nachrichten, Wiedervorlagen und Entwürfe werden nur während dieser Sitzung im Browser verwaltet.</div>
 </div>;
}
