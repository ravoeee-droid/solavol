import LeadBoard from './LeadBoard';
export default function LeadsPage(){
  return <main style={{padding:32,fontFamily:'system-ui',background:'#f5f7f8',minHeight:'100vh'}}>
    <a href="/" style={{color:'#1e5a46',fontWeight:700,textDecoration:'none'}}>← Übersicht</a>
    <LeadBoard />
  </main>
}