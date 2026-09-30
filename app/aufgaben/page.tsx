import {tasks} from '../../lib/mock';
export default function Tasks(){
 return <main style={{padding:32,fontFamily:'system-ui',background:'#f5f7f8',minHeight:'100vh'}}>
  <a href="/" style={{color:'#1e5a46',fontWeight:700,textDecoration:'none'}}>← Übersicht</a>
  <div style={{margin:'24px 0'}}><p style={{fontSize:11,letterSpacing:'.12em',fontWeight:800,color:'#7c8d87',margin:0}}>AUFGABEN</p><h1 style={{margin:'6px 0'}}>Wer macht was als Nächstes?</h1></div>
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
   {['SOLAVOL','Digitale Gewinner'].map(owner=><section key={owner} style={{background:'#fff',border:'1px solid #e3e9e7',borderRadius:16,padding:20}}>
    <h2 style={{fontSize:17}}>{owner}</h2>
    {tasks.filter(t=>t.owner===owner).map(t=><div key={t.task} style={{display:'flex',gap:12,padding:'14px 0',borderTop:'1px solid #edf1ef'}}><button style={{width:28,height:28,borderRadius:9,border:'1px solid #d6dfdb',background:'#fff'}}>✓</button><div><b style={{fontSize:13}}>{t.task}</b><span style={{display:'block',fontSize:11,color:'#87948f',marginTop:4}}>Fällig: {t.due}</span></div></div>)}
   </section>)}
  </div>
 </main>
}