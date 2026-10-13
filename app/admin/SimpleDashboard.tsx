'use client';
import {useMemo,useState} from 'react';
import './simple.css';

type Screen='home'|'leads'|'ads'|'google'|'website'|'settings';
type Lead={id:number;name:string;city:string;project:string;source:string;stage:string;value:number};
const stages=['Neu','Kontaktiert','Termin','Angebot','Gewonnen'];
const startLeads:Lead[]=[
{id:1,name:'Max Beispiel',city:'Offenburg',project:'PV + Speicher',source:'Meta',stage:'Neu',value:18500},
{id:2,name:'Julia Mustermann',city:'Lahr',project:'PV 12 kWp',source:'Google',stage:'Kontaktiert',value:21000},
{id:3,name:'Thomas Demo',city:'Kehl',project:'Speicher nachrüsten',source:'Website',stage:'Termin',value:7800},
{id:4,name:'Sophie Beispiel',city:'Achern',project:'PV + Wallbox',source:'Meta',stage:'Angebot',value:23900},
{id:5,name:'Daniel Muster',city:'Gengenbach',project:'PV Komplettpaket',source:'Website',stage:'Gewonnen',value:19900},
{id:6,name:'Familie Muster',city:'Ortenberg',project:'PV + Speicher',source:'Meta',stage:'Neu',value:17200}
];
const channels=[{name:'Meta Ads',logo:'m',cost:698,leads:17,description:'Anfragen von Hausbesitzern',color:'#2467c7'},{name:'Google Ads',logo:'G',cost:547,leads:5,description:'Aktive Nachfrage über Google',color:'#ea9c21'}];
const format=(v:number)=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(v);
const menu:{key:Screen;label:string;icon:string}[]=[{key:'home',label:'Übersicht',icon:'▦'},{key:'leads',label:'Anfragen & CRM',icon:'◎'},{key:'ads',label:'Werbung',icon:'↗'},{key:'google',label:'Google & Bewertungen',icon:'☆'},{key:'website',label:'Website & Blog',icon:'▣'}];
const defaultReviews=[{name:'Demokunde nach Installation',status:'Vorbereitet'},{name:'Musterprojekt',status:'Vorbereitet'}];
function Pill({children,color='gray'}:{children:React.ReactNode;color?:'gray'|'green'|'yellow'}){return <span className={'sx-pill '+color}>{children}</span>}
function Metric({label,value,desc}:{label:string;value:string;desc:string}){return <div className="sx-metric"><span>{label}</span><strong>{value}</strong><small>{desc}</small></div>}
function Header({mini,title,desc,action}:{mini:string;title:string;desc:string;action?:React.ReactNode}){return <div className="sx-heading"><div><span className="sx-kicker">{mini}</span><h1>{title}</h1><p>{desc}</p></div>{action}</div>}
function Card({title,sub,children,action}:{title:string;sub?:string;children:React.ReactNode;action?:React.ReactNode}){return <section className="sx-card"><div className="sx-cardhead"><div><h2>{title}</h2>{sub&&<p>{sub}</p>}</div>{action}</div>{children}</section>}
export default function SimpleDashboard(){
 const [screen,setScreen]=useState<Screen>('home');
 const [leads,setLeads]=useState<Lead[]>(startLeads);
 const [query,setQuery]=useState('');
 const [adding,setAdding]=useState(false);
 const [newLead,setNewLead]=useState({name:'',city:'',project:'PV + Speicher'});
 const [googleTab,setGoogleTab]=useState<'profile'|'reviews'>('reviews');
 const [webTab,setWebTab]=useState<'web'|'blog'>('blog');
 const [requestName,setRequestName]=useState('');
 const [reviews,setReviews]=useState(defaultReviews);
 const [reviewReply,setReviewReply]=useState('');
 const [postInput,setPostInput]=useState('');
 const [posts,setPosts]=useState(['Neues Solarprojekt aus der Region']);
 const [blogTopic,setBlogTopic]=useState('Lohnt sich eine Solaranlage mit Speicher?');
 const [blogTown,setBlogTown]=useState('Ortenau');
 const [blogText,setBlogText]=useState('');
 const [blogSaved,setBlogSaved]=useState(false);
 const [message,setMessage]=useState('');
 const [mobile,setMobile]=useState(false);
 const [connectGuide,setConnectGuide]=useState('');
 const go=(v:Screen,tab?:string)=>{setScreen(v);if(v==='google'&&tab)setGoogleTab(tab as 'profile'|'reviews');if(v==='website'&&tab)setWebTab(tab as 'web'|'blog');setMessage('');setMobile(false);window.scrollTo?.({top:0,behavior:'smooth'})};
 const visible=useMemo(()=>leads.filter(l=>(l.name+' '+l.city+' '+l.project+' '+l.source).toLocaleLowerCase('de-DE').includes(query.toLocaleLowerCase('de-DE'))),[leads,query]);
 const show=(text:string)=>setMessage(text);
 const addLead=()=>{if(!newLead.name.trim())return;setLeads(s=>[{id:Date.now(),name:newLead.name.trim(),city:newLead.city.trim()||'Nicht angegeben',project:newLead.project,source:'Manuell',stage:'Neu',value:0},...s]);setNewLead({name:'',city:'',project:'PV + Speicher'});setAdding(false);show('Demo-Kontakt hinzugefügt – nur für diese Sitzung.')};
 const generateBlog=()=>{const town=blogTown.trim()||'Ihrer Region';setBlogText('# '+blogTopic+' – Photovoltaik in '+town+'\n\nViele Hauseigentümer möchten ihre Energiekosten langfristig senken. Doch welche Solarlösung passt wirklich zum eigenen Zuhause?\n\n## Worauf sollte man achten?\n\n- Wie viel Strom verbraucht der Haushalt tatsächlich?\n- Ist das Dach geeignet und wie hoch ist die nutzbare Fläche?\n- Wie groß sollte ein Batteriespeicher sein?\n- Sind Wallbox oder Wärmepumpe geplant?\n\n## Persönliche Beratung statt Pauschalantwort\n\nSOLAVOL unterstützt Eigentümer bei der Planung einer passenden Photovoltaiklösung. Jedes Dach und jedes Verbrauchsprofil ist anders.\n\n**Jetzt unverbindlich beraten lassen.**\n\nHinweis: Redaktioneller Demo-Entwurf. Fakten, lokale Angaben und SEO-Inhalte vor Veröffentlichung prüfen.');setBlogSaved(false);show('Artikelentwurf erstellt. Es wurde nichts veröffentlicht.')};
 return <div className="sx">
  <div className={'sx-side '+(mobile?'mobile':'')}>
   <div className="sx-brand"><div className="sx-mark">◒</div><div><b>SOLAVOL</b><small>GROWTH COCKPIT</small></div></div>
   <div className="sx-navtitle">MENÜ</div>
   <nav aria-label="Hauptmenü">{menu.map(x=><button key={x.key} className={screen===x.key?'active':''} onClick={()=>go(x.key)}><span className="sx-icon">{x.icon}</span>{x.label}{screen===x.key&&<i>›</i>}</button>)}</nav>
   <div className="sx-sidebottom"><button className={screen==='settings'?'active':''} onClick={()=>go('settings')}><span className="sx-icon">⚙</span>Verbindungen<i>›</i></button><div className="sx-powered"><span className="sx-powered-icon">✳</span><div><b>Digitale Gewinner</b><small>Wachstumssystem für SOLAVOL</small></div></div></div>
  </div>
  {mobile&&<button className="sx-shade" aria-label="Menü schließen" onClick={()=>setMobile(false)}/>}
  <div className="sx-work">
   <div className="sx-topbar"><button className="sx-menu" aria-label="Menü öffnen" onClick={()=>setMobile(true)}>☰</button><span><b>SOLAVOL</b> <i>/</i> {screen==='settings'?'Verbindungen':menu.find(x=>x.key===screen)?.label}</span><div><Pill color="yellow">● Demo</Pill><span className="sx-user">SO</span></div></div>
   <main className="sx-inner">
    {message&&<div className="sx-toast"><span>✓ {message}</span><button onClick={()=>setMessage('')}>×</button></div>}
    {screen==='home'&&<>
      <Header mini="DEIN COCKPIT" title="Alles im Blick. Ganz einfach." desc="Neue Kunden gewinnen, Anfragen bearbeiten und sichtbar bleiben." action={<button className="sx-outline" onClick={()=>go('leads')}>Alle Anfragen ansehen <span>→</span></button>}/>
      <div className="sx-highlight"><div><span className="sx-highlight-tag">SOLAVOL WACHSTUMSSYSTEM</span><h2>Mehr PV-Aufträge.<br/><em>Weniger Aufwand.</em></h2><p>Werbung, Kundenanfragen und Google-Präsenz an einem Ort.</p><button onClick={()=>go('leads')}>Jetzt Anfragen bearbeiten <span>→</span></button></div><div className="sx-deco"><div className="sx-deco-ring"/><div className="sx-deco-core">↗</div></div></div>
      <div className="sx-metrics"><Metric label="Neue Anfragen" value="27" desc="im Beispielmonat"/><Metric label="Beratungstermine" value="14" desc="vereinbart"/><Metric label="Offene Angebote" value="5" desc="in Bearbeitung"/><Metric label="Aufträge" value="2" desc="gewonnen"/></div>
      <div className="sx-two">
       <Card title="Heute wichtig" sub="Drei Dinge, die jetzt Umsatz bringen"><div className="sx-actions">
        <button onClick={()=>go('leads')}><span className="sx-action-icon">◎</span><div><b>Neue Anfragen kontaktieren</b><small>Interessenten im CRM bearbeiten</small></div><strong>→</strong></button>
        <button onClick={()=>go('google','reviews')}><span className="sx-action-icon">☆</span><div><b>Google-Bewertungen anfragen</b><small>Bewertungsnachricht vorbereiten</small></div><strong>→</strong></button>
        <button onClick={()=>go('website','blog')}><span className="sx-action-icon">✦</span><div><b>Neuen Blogbeitrag erstellen</b><small>In wenigen Klicks einen SEO-Entwurf schreiben</small></div><strong>→</strong></button>
       </div></Card>
       <Card title="Letzte Anfragen" sub="Beispielkontakte aus dem CRM" action={<button className="sx-link" onClick={()=>go('leads')}>Alle ansehen →</button>}><div className="sx-recent">{leads.slice(0,4).map(l=><div key={l.id}><span className="sx-avatar">{l.name.slice(0,1)}</span><div><b>{l.name}</b><small>{l.project} · {l.city}</small></div><Pill color={l.stage==='Neu'?'yellow':l.stage==='Gewonnen'?'green':'gray'}>{l.stage}</Pill></div>)}</div></Card>
      </div>
      <div className="sx-footnote">Alle Kennzahlen und Kontakte sind zurzeit Beispieldaten für den Termin. Live-Daten folgen nach der Kontoanbindung.</div>
    </>}
    {screen==='leads'&&<>
      <Header mini="KUNDENANFRAGEN" title="Keinen Interessenten verlieren." desc="Alle PV-Anfragen von der ersten Nachricht bis zum Auftrag." action={<button className="sx-primary" onClick={()=>setAdding(v=>!v)}>{adding?'Schließen':'+ Anfrage hinzufügen'}</button>}/>
      <div className="sx-metrics three"><Metric label="Kontakte im Demo-CRM" value={String(leads.length)} desc="gespeicherte Beispieldaten"/><Metric label="Offene Angebote" value={String(leads.filter(l=>l.stage==='Angebot').length)} desc="im CRM"/><Metric label="Gewonnene Kunden" value={String(leads.filter(l=>l.stage==='Gewonnen').length)} desc="Beispielabschlüsse"/></div>
      {adding&&<Card title="Neue Anfrage erfassen"><div className="sx-formrow"><label>Name<input value={newLead.name} onChange={e=>setNewLead(v=>({...v,name:e.target.value}))} placeholder="Vor- und Nachname"/></label><label>Ort<input value={newLead.city} onChange={e=>setNewLead(v=>({...v,city:e.target.value}))} placeholder="z. B. Offenburg"/></label><label>Interesse<select value={newLead.project} onChange={e=>setNewLead(v=>({...v,project:e.target.value}))}><option>PV + Speicher</option><option>Photovoltaik</option><option>Speicher nachrüsten</option><option>PV + Wallbox</option></select></label><button className="sx-primary" disabled={!newLead.name.trim()} onClick={addLead}>Speichern</button></div></Card>}
      <Card title="Alle Anfragen" sub="Status direkt ändern – die Demo speichert nur für diese Sitzung" action={<input className="sx-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="⌕  Namen oder Ort suchen"/>}>
       <div className="sx-tablewrap"><table className="sx-table"><thead><tr><th>Kontakt</th><th>Interesse</th><th>Quelle</th><th>Status ändern</th></tr></thead><tbody>{visible.map(l=><tr key={l.id}><td><div className="sx-contact"><span className="sx-avatar">{l.name.slice(0,1)}</span><div><b>{l.name}</b><small>{l.city}</small></div></div></td><td>{l.project}</td><td>{l.source}</td><td><select aria-label={'Status von '+l.name} value={l.stage} onChange={e=>setLeads(s=>s.map(a=>a.id===l.id?{...a,stage:e.target.value}:a))}>{stages.map(s=><option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table>{visible.length===0&&<p className="sx-empty">Keine passenden Kontakte gefunden.</p>}</div>
      </Card>
     </>}
     {screen==='ads'&&<>
      <Header mini="WERBUNG" title="Welche Werbung bringt Kunden?" desc="Meta und Google einfach vergleichen – ohne komplizierte Berichte." action={<button className="sx-outline" onClick={()=>go('settings')}>Werbekonten verbinden →</button>}/>
      <div className="sx-metrics three"><Metric label="Werbebudget" value="1.245 €" desc="Beispielmonat"/><Metric label="Anfragen über Werbung" value="22" desc="Meta + Google"/><Metric label="Ø Kosten / Anfrage" value="56,59 €" desc="Beispielwert"/></div>
      <div className="sx-two">{channels.map(ch=><Card key={ch.name} title={ch.name} sub={ch.description} action={<span className="sx-network-icon" style={{background:ch.color}}>{ch.logo}</span>}><div className="sx-adbig"><div><span>Neue Anfragen</span><strong>{ch.leads}</strong></div><div><span>Kosten pro Anfrage</span><strong>{(ch.cost/ch.leads).toLocaleString('de-DE',{style:'currency',currency:'EUR'})}</strong></div></div><div className="sx-adfooter"><span>Werbeausgaben</span><b>{format(ch.cost)}</b></div></Card>)}</div>
      <Card title="Was wir daraus lernen" sub="Einfach erklärt"><p className="sx-shortcopy">Im Demo-Beispiel liefert Meta mehr Anfragen zu niedrigeren Kosten. Ob daraus auch mehr Aufträge entstehen, sehen wir erst, wenn wir die Leads mit dem CRM verbinden.</p><button className="sx-primary" onClick={()=>go('leads')}>Anfragen im CRM ansehen →</button></Card>
     </>}
     {screen==='google'&&<>
      <Header mini="GOOGLE SICHTBARKEIT" title="Gefunden werden. Vertrauen aufbauen." desc="Google-Unternehmensprofil und Bewertungen an einer Stelle." action={<button className="sx-outline" onClick={()=>go('settings')}>Google verbinden →</button>}/>
      <div className="sx-tabs"><button className={googleTab==='reviews'?'chosen':''} onClick={()=>setGoogleTab('reviews')}>☆ Bewertungen</button><button className={googleTab==='profile'?'chosen':''} onClick={()=>setGoogleTab('profile')}>⌖ Unternehmensprofil</button></div>
      {googleTab==='reviews'?<div className="sx-two">
        <Card title="Bewertung anfragen" sub="Nach einem abgeschlossenen Solarprojekt"><p className="sx-shortcopy">Das System soll zufriedene und unzufriedene Kunden gleichermaßen zu einer ehrlichen Google-Bewertung einladen.</p><label className="sx-field">Kundenname<input placeholder="z. B. Familie Müller" value={requestName} onChange={e=>setRequestName(e.target.value)}/></label><button className="sx-primary full" disabled={!requestName.trim()} onClick={()=>{setReviews(s=>[{name:requestName.trim(),status:'Vorbereitet'},...s]);setRequestName('');show('Bewertungsanfrage als Demo-Entwurf vorbereitet. Keine Nachricht versendet.')}}>Bewertungsanfrage vorbereiten →</button><div className="sx-subtle">Kein automatischer Versand ohne Freigabe und passenden Bewertungslink.</div></Card>
        <Card title="Anfragen in Vorbereitung" sub="Nur Demo – noch nicht versendet"><div className="sx-review-list">{reviews.map((r,i)=><div key={i}><span className="sx-action-icon">✉</span><div><b>{r.name}</b><small>Google-Bewertung einladen</small></div><Pill color="yellow">{r.status}</Pill></div>)}</div></Card>
       </div>:<div className="sx-two">
        <Card title="Google-Profil von SOLAVOL" sub="Wie Kunden dein Unternehmen finden"><div className="sx-gprofile"><div className="sx-gcover">☀</div><h3>SOLAVOL</h3><p>Photovoltaik · Speicher · Solarenergie</p><Pill color="yellow">Google-Konto nicht verbunden</Pill></div></Card>
        <Card title="Einfach aktuell bleiben" sub="Beiträge und Projektbilder veröffentlichen"><label className="sx-field">Neuer Google-Beitrag<input placeholder="z. B. Neue PV-Anlage in der Ortenau" value={postInput} onChange={e=>setPostInput(e.target.value)}/></label><button className="sx-primary full" disabled={!postInput.trim()} onClick={()=>{setPosts(s=>[postInput.trim(),...s]);setPostInput('');show('Google-Beitrag als Demo-Entwurf gespeichert. Keine Veröffentlichung.')}}>Beitrag vorbereiten →</button><div className="sx-review-list">{posts.map((p,i)=><div key={i}><span className="sx-action-icon">▣</span><div><b>{p}</b><small>Beitragsentwurf</small></div><Pill>Entwurf</Pill></div>)}</div></Card>
       </div>}
      <Card title="Bewertungen einfach beantworten" sub="Beispiel: Positive Google-Bewertung"><div className="sx-sample-review"><span>★★★★★</span><p>„Tolle Beratung und eine saubere Installation. Wir sind sehr zufrieden.“</p><small>Beispielbewertung, nicht von Google geladen</small></div>{reviewReply&&<textarea className="sx-reply" value={reviewReply} onChange={e=>setReviewReply(e.target.value)}/>}<div className="sx-btnrow"><button className="sx-outline" onClick={()=>{setReviewReply('Vielen Dank für Ihr positives Feedback! Wir freuen uns, dass Sie mit Beratung und Installation zufrieden sind. Viel Freude mit Ihrem Solarstrom! Ihr SOLAVOL-Team.');show('Antwortentwurf erstellt – nicht veröffentlicht.')}}>✦ Antwort vorschlagen</button>{reviewReply&&<button className="sx-primary" onClick={()=>{navigator.clipboard?.writeText(reviewReply);show('Antwort zum Kopieren vorbereitet.')}}>Text kopieren</button>}</div></Card>
     </>}
     {screen==='website'&&<>
       <Header mini="DEINE WEBSITE" title="Aus Besuchern Kunden machen." desc="Website-Ergebnisse verstehen und neue Inhalte erstellen." action={<button className="sx-outline" onClick={()=>go('settings')}>Tracking verbinden →</button>}/>
       <div className="sx-tabs"><button className={webTab==='web'?'chosen':''} onClick={()=>setWebTab('web')}>▣ Website</button><button className={webTab==='blog'?'chosen':''} onClick={()=>setWebTab('blog')}>✦ Blog-Engine</button></div>
       {webTab==='web'?<><div className="sx-metrics three"><Metric label="Besucher" value="1.842" desc="Demo-Monatswert"/><Metric label="Website-Anfragen" value="5" desc="Demo-Monatswert"/><Metric label="Besucher zu Anfrage" value="0,27 %" desc="Demowert"/></div><div className="sx-two"><Card title="Die wichtigsten Website-Ziele" sub="Worauf es wirklich ankommt"><div className="sx-simplelist">{['PV-Angebote verständlich zeigen','Kontaktformular einfach halten','Mobile Nutzung optimieren','Besucherquellen messen'].map(t=><div key={t}><span>✓</span><b>{t}</b></div>)}</div></Card><Card title="Mehr Anfragen über Google" sub="Lokale Inhalte unterstützen die Sichtbarkeit"><p className="sx-shortcopy">Passende Ratgeber und Projektberichte helfen Eigentümern bei der Entscheidung. Der Blog-Assistent erstellt dafür einen ersten Entwurf.</p><button className="sx-primary" onClick={()=>setWebTab('blog')}>Blogbeitrag erstellen →</button></Card></div></>:<div className="sx-two">
        <Card title="Neuen Blogbeitrag erstellen" sub="Thema eingeben, Entwurf erhalten, prüfen"><label className="sx-field">Thema<input value={blogTopic} onChange={e=>setBlogTopic(e.target.value)} placeholder="Thema des Beitrags"/></label><label className="sx-field">Region<input value={blogTown} onChange={e=>setBlogTown(e.target.value)} placeholder="z. B. Ortenau"/></label><button className="sx-primary full" onClick={generateBlog} disabled={!blogTopic.trim()}>✦ Artikelentwurf erstellen</button><div className="sx-subtle">Vorlagenbasierte Demo. Keine KI-API oder Website-Veröffentlichung angeschlossen.</div></Card>
        <Card title="Dein Artikel" sub="Frei bearbeitbarer SEO-Entwurf"><textarea className="sx-blog" value={blogText} onChange={e=>{setBlogText(e.target.value);setBlogSaved(false)}} placeholder="Hier erscheint der neue Artikel …"/><div className="sx-btnrow"><button className="sx-outline" disabled={!blogText.trim()} onClick={()=>{setBlogSaved(true);show('Demo-Artikel in dieser Sitzung als Entwurf markiert.')}}>{blogSaved?'✓ Als Entwurf markiert':'Als Entwurf merken'}</button><button className="sx-primary" disabled={!blogText.trim()} onClick={()=>{navigator.clipboard?.writeText(blogText);show('Artikeltext zum Kopieren vorbereitet.')}}>Kopieren</button></div></Card>
       </div>}
     </>}
     {screen==='settings'&&<>
       <Header mini="EINRICHTUNG" title="Konten verbinden." desc="Sobald die Zugänge freigegeben sind, fließen echte Daten in das Cockpit."/>
       <div className="sx-connections">{[{name:'Meta Ads',short:'Werbekampagnen und Leads'},{name:'Google Ads',short:'Suchkampagnen und Anfragen'},{name:'Google Unternehmensprofil',short:'Profil, Beiträge und Bewertungen'},{name:'Website & Analytics',short:'Besucher und Formulare'}].map(x=><div key={x.name}><div><b>{x.name}</b><small>{x.short}</small></div><Pill color="yellow">Nicht verbunden</Pill><button onClick={()=>setConnectGuide(connectGuide===x.name?'':x.name)}>{connectGuide===x.name?'Weniger':'So geht’s'} <span>↗</span></button>{connectGuide===x.name&&<p>Der Kontoinhaber autorisiert SOLAVOL über die sichere Anmeldung beim jeweiligen Dienst. Danach richten wir die passende Schnittstelle und Berechtigungen ein.</p>}</div>)}</div>
       <div className="sx-footnote">Die Demo sendet keine Nachrichten, schaltet keine Anzeigen und veröffentlicht keine Beiträge.</div>
     </>}
     <footer className="sx-footer"><span>SOLAVOL Growth Cockpit · von Digitale Gewinner</span><span>Präsentationsdemo · Beispielwerte · kein Livezugriff</span></footer>
   </main>
  </div>
 </div>;
}
