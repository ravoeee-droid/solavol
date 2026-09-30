export default function Reports(){
 const rows=[['Werbeausgaben','1.245 €'],['Anfragen','27'],['Termine','14'],['Angebote','5'],['Pot. Angebotswert','84.500 €'],['Gewonnener Umsatz','39.800 €'],['ROAS','31,97×']];
 return <main style={{padding:32,fontFamily:'system-ui',background:'#f5f7f8',minHeight:'100vh'}}>
  <a href="/" style={{color:'#1e5a46',fontWeight:700,textDecoration:'none'}}>← Übersicht</a>
  <div style={{margin:'24px 0'}}><p style={{fontSize:11,letterSpacing:'.12em',fontWeight:800,color:'#7c8d87',margin:0}}>REPORT</p><h1 style={{margin:'6px 0'}}>Marketing → Umsatz</h1><p style={{color:'#6f7e79'}}>Nicht Reichweite, sondern Geschäftsergebnis.</p></div>
  <section style={{background:'linear-gradient(120deg,#153c31,#1e5a46)',color:'#fff',borderRadius:20,padding:26,marginBottom:16}}><span style={{fontSize:11,color:'#cde84d',fontWeight:800}}>MONATLICHER RETURN</span><strong style={{display:'block',fontSize:44,margin:'8px 0'}}>31,97× ROAS</strong><p style={{color:'#c7d6d1',margin:0}}>Aus 1.245 € Werbebudget wurden aktuell 39.800 € gewonnener Umsatz erfasst.</p></section>
  <section style={{background:'#fff',border:'1px solid #e3e9e7',borderRadius:16,padding:20}}>{rows.map(r=><div key={r[0]} style={{display:'flex',justifyContent:'space-between',padding:'14px 0',borderBottom:'1px solid #edf1ef'}}><span style={{color:'#6f7e79'}}>{r[0]}</span><b>{r[1]}</b></div>)}</section>
 </main>
}