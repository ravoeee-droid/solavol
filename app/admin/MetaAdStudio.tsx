'use client';
import {useState} from 'react';
import './meta-studio.css';

type Creative={id:number;title:string;stage:string;temperature:string;headline:string;text:string;cta:string;goal:string;psychology:string;warning?:string};
const creatives:Creative[]=[
{id:1,title:'Dein Zuhause kann mehr',stage:'Aufmerksamkeit',temperature:'Kalt',headline:'Was, wenn dein Zuhause dir jeden Monat Geld zurückgeben könnte?',text:'Dein Zuhause ist mehr als nur ein Dach über dem Kopf. Mit einer durchdachten Photovoltaiklösung kannst du eigenen Solarstrom erzeugen. SOLAVOL begleitet Familien in der Ortenau persönlich und verständlich.',cta:'Mehr erfahren',goal:'Neugier und emotionale Verbindung',psychology:'Zukunft der Familie, Kontrolle und ein positives Lebensgefühl – noch kein Verkaufsdruck.'},
{id:2,title:'Stromkosten im Griff',stage:'Problem erkannt',temperature:'Kalt',headline:'Immer höhere Stromkosten – aber dein Dach macht noch nichts für dich?',text:'Viele Hauseigentümer möchten Stromkosten langfristig besser kontrollieren. Wir schauen gemeinsam, welches Solarpotenzial dein Dach bietet – persönlich, regional und ohne Pauschalversprechen.',cta:'Potenzial prüfen',goal:'Problemrelevanz und Handlungsinteresse',psychology:'Das bisher ungenutzte Hausdach als Chance verständlich machen; ohne garantierte Ersparnisse.'},
{id:3,title:'Passt das zu meinem Haus?',stage:'Lösung gesucht',temperature:'Kalt',headline:'Photovoltaik klingt gut – aber passt das überhaupt zu meinem Haus?',text:'Dach, Verbrauch, Speicher und Familienalltag: Bei SOLAVOL schauen wir uns an, welche Lösung für dein Zuhause wirklich sinnvoll ist. Statt Standardpaket gibt es eine persönliche Einschätzung.',cta:'Erstberatung anfragen',goal:'Unsicherheit in Orientierung verwandeln',psychology:'Sicherheitsbedürfnis adressieren, Kompetenz durch individuelle Beratung zeigen.'},
{id:4,title:'Menschen aus der Region',stage:'Anbieter vergleichen',temperature:'Warm',headline:'Warum einen regionalen Photovoltaikpartner wählen?',text:'Bei einer Photovoltaikanlage zählt nicht nur die Technik. Vertrauen, Erreichbarkeit und die Zusammenarbeit machen den Unterschied. Lerne SOLAVOL und die Menschen hinter dem Unternehmen kennen.',cta:'SOLAVOL kennenlernen',goal:'Persönliches Vertrauen aufbauen',psychology:'Nähe, Wiedererkennung und Erreichbarkeit statt austauschbarer Preisvergleiche.'},
{id:5,title:'Echte Erfahrungen',stage:'Vertrauen stärken',temperature:'Warm',headline:'So erleben Kunden die Zusammenarbeit mit SOLAVOL.',text:'Eine Solaranlage ist Vertrauenssache. Entdecke echte Projektbeispiele und erfahre, wie Beratung, Planung und Umsetzung ablaufen. Wir zeigen dir transparent, worauf wir Wert legen.',cta:'Referenzen ansehen',goal:'Glaubwürdigkeit durch echte Belege',psychology:'Sozialer Beweis wirkt nur mit tatsächlich freigegebenen Kundenstimmen und Projekten.',warning:'Das generierte Bild enthält ein erfundenes Kunden-Zitat. Vor echter Schaltung gegen eine nachweisbare, freigegebene Referenz austauschen.'},
{id:6,title:'Ehrlich erklärt',stage:'Einwände klären',temperature:'Warm',headline:'Zu teuer? Zu kompliziert? Zu viel Aufwand?',text:'Lohnt sich Photovoltaik? Wie groß sollte der Speicher sein? Und was kostet die Installation? Wir beantworten deine Fragen verständlich und zeigen dir die möglichen nächsten Schritte.',cta:'Fragen klären',goal:'Risiken und Unsicherheiten reduzieren',psychology:'Einwände offen ansprechen und durch Klarheit statt Druck auflösen.'},
{id:7,title:'Jetzt Klarheit bekommen',stage:'Bereit zur Anfrage',temperature:'Heiß',headline:'Du denkst schon länger über Photovoltaik nach?',text:'Lass uns gemeinsam prüfen, was für dein Zuhause sinnvoll ist. In einem unverbindlichen Erstgespräch besprechen wir Dach, Bedarf und mögliche Lösungen – persönlich und ohne Verkaufsdruck.',cta:'Jetzt Beratung anfragen',goal:'Qualifizierte Beratungsanfrage',psychology:'Niedrige Einstiegshürde, konkreter nächster Schritt und die Sicherheit, noch keine Kaufentscheidung treffen zu müssen.'}
];
export default function MetaAdStudio(){
 const [active,setActive]=useState(1);
 const [status,setStatus]=useState<Record<number,string>>({});
 const [copied,setCopied]=useState('');
 const [filter,setFilter]=useState('Alle');
 const chosen=creatives.find(c=>c.id===active)??creatives[0];
 const visible=filter==='Alle'?creatives:creatives.filter(c=>c.temperature===filter);
 const copy=(text:string)=>{void navigator.clipboard?.writeText(text).then(()=>setCopied('Text kopiert')).catch(()=>setCopied('Bitte Text manuell kopieren.'));};
 const sprite=(index:number)=>({backgroundImage:"url('/meta-creatives-preview.webp')",backgroundSize:'700% 100%',backgroundPosition:`${(index-1)*100/6}% 50%`});
 const adcopy=(a:Creative)=>[a.headline,'',a.text,'',`CTA: ${a.cta}`].join('\n');
 return <section className="ms-wrap">
  <div className="ms-intro"><div><span className="ms-kicker">CREATIVE LIBRARY · INSTAGRAM</span><h3>7 Werbemotive für jede Kaufphase</h3><p>Vom ersten Interesse bis zur Anfrage. Klicke ein Motiv an und sieh Botschaft, Ziel und den passenden Funnel-Schritt.</p></div><span className="ms-demo">● 7 ENTWÜRFE · NICHT LIVE</span></div>
  <div className="ms-filters">{['Alle','Kalt','Warm','Heiß'].map(f=><button key={f} className={filter===f?'on':''} onClick={()=>{setFilter(f);if(f!=='Alle'&&chosen.temperature!==f)setActive((creatives.find(c=>c.temperature===f)??creatives[0]).id)}}>{f==='Alle'?'Alle Motive':f+'e Zielgruppe'}</button>)}</div>
  <div className="ms-thumbnails">{visible.map(ad=><button aria-label={'Werbemotiv '+ad.id+' auswählen'} onClick={()=>{setActive(ad.id);setCopied('')}} key={ad.id} className={'ms-thumb '+(active===ad.id?'current':'')}><div className="ms-thumb-image" style={sprite(ad.id)}/><span><b>0{ad.id}</b><small>{ad.stage}</small></span></button>)}</div>
  <div className="ms-details">
   <div className="ms-poster"><div className="ms-poster-image" style={sprite(chosen.id)} role="img" aria-label={'Vorschau Anzeigenmotiv '+chosen.id}/><div className="ms-poster-caption">Motiv 0{chosen.id} / 07 · Vorschau</div></div>
   <div className="ms-right">
    <div className="ms-stage"><span>STADIUM 0{chosen.id} VON 07</span><span className={'ms-temperature '+chosen.temperature.toLowerCase()}>{chosen.temperature}</span></div>
    <h3>{chosen.title}</h3>
    <div className="ms-label">ANZEIGEN-HOOK</div><p className="ms-headline">{chosen.headline}</p>
    <div className="ms-label">META-ANZEIGENTEXT</div><p className="ms-bodycopy">{chosen.text}</p>
    <div className="ms-info"><span>Ziel dieser Anzeige</span><strong>{chosen.goal}</strong><small>{chosen.psychology}</small></div>
    {chosen.warning&&<p className="ms-warning">⚠ {chosen.warning}</p>}
    <div className="ms-metaaction"><button className="ms-mainbtn" onClick={()=>copy(adcopy(chosen))}>✧ Anzeigentext kopieren</button><select aria-label="Status des Werbemotivs" value={status[chosen.id]||'Entwurf'} onChange={e=>setStatus(s=>({...s,[chosen.id]:e.target.value}))}><option>Entwurf</option><option>Zur Prüfung</option><option>Freigegeben</option></select></div>
    {copied&&<p className="ms-copyhint">{copied}</p>}
   </div>
  </div>
  <div className="ms-endnote"><b>Für die Freigabe:</b> Bildmaterial, lokale Aussagen und Referenzen prüfen. Der Entwurfsstatus ist nur eine lokale Demo-Einstellung; Anzeigen werden nicht an Meta übertragen oder live geschaltet.</div>
 </section>
}