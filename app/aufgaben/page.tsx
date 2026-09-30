import TaskBoard from './TaskBoard';
export default function Tasks(){
 return <main style={{padding:32,fontFamily:'system-ui',background:'#f5f7f8',minHeight:'100vh'}}>
  <a href="/" style={{color:'#1e5a46',fontWeight:700,textDecoration:'none'}}>← Übersicht</a>
  <div style={{margin:'24px 0'}}><p style={{fontSize:11,letterSpacing:'.12em',fontWeight:800,color:'#7c8d87',margin:0}}>AUFGABEN</p><h1 style={{margin:'6px 0'}}>Wer macht was als Nächstes?</h1></div>
  <TaskBoard />
 </main>
}