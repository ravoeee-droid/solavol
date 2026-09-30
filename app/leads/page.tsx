import {leads} from '../../lib/mock';
export default function LeadsPage(){
  const stages=['Neu','Kontaktiert','Termin','Angebot','Gewonnen'];
  return <main style={{padding:32,fontFamily:'system-ui',background:'#f5f7f8',minHeight:'100vh'}}>
    <a href="/" style={{color:'#1e5a46',fontWeight:700,textDecoration:'none'}}>← Übersicht</a>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',margin:'24px 0'}}>
      <div><p style={{fontSize:11,letterSpacing:'.12em',fontWeight:800,color:'#7c8d87',margin:0}}>LEAD-CENTER</p><h1 style={{margin:'6px 0 4px'}}>Interessenten & Pipeline</h1><p style={{margin:0,color:'#6f7e79'}}>Alle Anfragen vom ersten Kontakt bis zum Auftrag.</p></div>
      <button style={{background:'#153d31',color:'#fff',border:0,borderRadius:10,padding:'11px 16px',fontWeight:700}}>+ Lead erfassen</button>
    </div>
    <section style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,overflowX:'auto'}}>
      {stages.map(stage=><div key={stage} style={{minWidth:210,background:'#eef2f0',borderRadius:16,padding:12}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}><b>{stage}</b><span>{leads.filter(l=>l.status===stage).length}</span></div>
        {leads.filter(l=>l.status===stage).map(l=><article key={l.name} style={{background:'#fff',padding:14,borderRadius:12,marginBottom:10,border:'1px solid #e3e9e7'}}>
          <b style={{display:'block',fontSize:14}}>{l.name}</b><span style={{fontSize:11,color:'#87948f'}}>{l.city} · {l.source}</span>
          <strong style={{display:'block',marginTop:14,color:'#153d31'}}>{l.value}</strong>
        </article>)}
      </div>)}
    </section>
  </main>
}