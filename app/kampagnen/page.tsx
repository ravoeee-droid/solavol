const campaigns=[
{name:'Eigenheim + Stromkosten',platform:'Meta Ads',spend:'412 €',leads:15,cpl:'27,47 €',trend:'+22 %'},
{name:'Referenzprojekt',platform:'Meta Ads',spend:'286 €',leads:7,cpl:'40,86 €',trend:'+8 %'},
{name:'Photovoltaik Beratung',platform:'Google Ads',spend:'547 €',leads:5,cpl:'109,40 €',trend:'-5 %'}
];
export default function Campaigns(){
 return <main style={{padding:32,fontFamily:'system-ui',background:'#f5f7f8',minHeight:'100vh'}}>
  <a href="/" style={{color:'#1e5a46',fontWeight:700,textDecoration:'none'}}>← Übersicht</a>
  <div style={{margin:'24px 0'}}><p style={{fontSize:11,letterSpacing:'.12em',fontWeight:800,color:'#7c8d87',margin:0}}>KAMPAGNEN</p><h1 style={{margin:'6px 0'}}>Werbung & Performance</h1><p style={{color:'#6f7e79'}}>Welche Kampagnen Anfragen bringen – und zu welchem Preis.</p></div>
  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:18}}>
   {[['Werbeausgaben','1.245 €'],['Anfragen','27'],['Ø CPL','46,11 €'],['Beste Kampagne','27,47 € CPL']].map(x=><article key={x[0]} style={{background:'#fff',border:'1px solid #e3e9e7',borderRadius:15,padding:18}}><span style={{fontSize:11,color:'#768680'}}>{x[0]}</span><strong style={{display:'block',fontSize:25,marginTop:8}}>{x[1]}</strong></article>)}
  </div>
  <section style={{background:'#fff',border:'1px solid #e3e9e7',borderRadius:16,padding:20}}>
   {campaigns.map(c=><div key={c.name} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:16,padding:'16px 0',borderBottom:'1px solid #edf1ef',alignItems:'center'}}>
     <div><b>{c.name}</b><span style={{display:'block',fontSize:11,color:'#87948f',marginTop:3}}>{c.platform}</span></div><span>{c.spend}</span><b>{c.leads} Leads</b><strong>{c.cpl}</strong><span style={{color:c.trend.startsWith('+')?'#4f7a00':'#9a442f'}}>{c.trend}</span>
   </div>)}
  </section>
 </main>
}