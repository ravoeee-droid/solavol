import {kpis,leads,tasks} from '../lib/mock';

const nav=['Übersicht','Leads','Kampagnen','Website','Content','Aufgaben','Reports'];

export default function Home(){
  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="mark">S</div><div><strong>SOLAVOL</strong><span>Growth Cockpit</span></div></div>
      <nav>{nav.map((n,i)=><button className={i===0?'active':''} key={n}><span>{['⌂','◎','↗','◫','◉','✓','▥'][i]}</span>{n}</button>)}</nav>
      <div className="sidecard"><small>DIGITALE GEWINNER</small><b>Betreuung aktiv</b><p>Website · Meta Ads · Optimierung</p><div className="pulse">● Alles läuft</div></div>
      <div className="profile"><div className="avatar">SO</div><div><b>SOLAVOL Team</b><span>Kundenkonto</span></div><button>⋯</button></div>
    </aside>
    <section className="content">
      <header><div><p className="eyebrow">MITTWOCH, 30. SEPTEMBER</p><h1>Guten Morgen 👋</h1><p>Hier siehst du auf einen Blick, was gerade passiert und was als Nächstes wichtig ist.</p></div><div className="header-actions"><button className="ghost">↻ Aktualisieren</button><button className="primary">+ Neue Aufgabe</button></div></header>

      <section className="hero"><div><span className="badge">MONATSÜBERSICHT</span><h2>27 neue Anfragen</h2><p>Die Kampagnen liegen aktuell <b>18 % über dem Vormonat</b>. Der Leadpreis ist gleichzeitig gesunken.</p></div><div className="heroMetric"><span>Pot. Angebotswert</span><strong>84.500 €</strong><small>aus aktuell 5 offenen Angeboten</small></div></section>

      <section className="kpis">{kpis.map((k,i)=><article key={k.label}><div className="metricTop"><span>{k.label}</span><i>{['↗','€','◇','◔'][i]}</i></div><strong>{k.value}</strong><div className="delta"><b>{k.delta}</b><span>{k.hint}</span></div></article>)}</section>

      <section className="grid two">
        <article className="panel chart"><div className="panelHead"><div><span>ANFRAGEN & CPL</span><h3>Performance der letzten 30 Tage</h3></div><button>30 Tage⌄</button></div><div className="chartArea"><div className="bars">{[42,54,47,68,74,61,86,78,92,83,96,88].map((h,i)=><div key={i} style={{height:`${h}%`}}><span></span></div>)}</div><svg viewBox="0 0 600 140" preserveAspectRatio="none"><path d="M0,115 C55,100 70,118 120,87 S200,95 245,62 S330,81 370,50 S455,60 505,35 S560,45 600,20" fill="none" stroke="currentColor" strokeWidth="3"/></svg></div><div className="legend"><span><i className="dot solid"></i>Anfragen</span><span><i className="dot line"></i>Leadpreis</span></div></article>
        <article className="panel funnel"><div className="panelHead"><div><span>FUNNEL</span><h3>Vom Klick zum Auftrag</h3></div><b className="green">+12,4 % CVR</b></div>
          {[['Website-Besucher','1.842','100%'],['Interessenten','196','10,6%'],['Anfragen','27','13,8%'],['Termine','14','51,9%'],['Angebote','5','35,7%'],['Gewonnen','2','40,0%']].map((r,i)=><div className="frow" key={r[0]}><div><span>{r[0]}</span><b>{r[1]}</b></div><div className="track"><i style={{width:`${[100,72,55,42,31,22][i]}%`}}></i></div><small>{r[2]}</small></div>)}
        </article>
      </section>

      <section className="grid two lower">
        <article className="panel"><div className="panelHead"><div><span>LEAD-CENTER</span><h3>Neueste Interessenten</h3></div><button>Alle Leads →</button></div><div className="leadTable">{leads.map(l=><div className="lead" key={l.name}><div className="person"><i>{l.name.split(' ').map(x=>x[0]).join('')}</i><div><b>{l.name}</b><span>{l.city} · {l.source}</span></div></div><span className={'status '+l.status.toLowerCase()}>{l.status}</span><b>{l.value}</b></div>)}</div></article>
        <article className="panel"><div className="panelHead"><div><span>NÄCHSTE SCHRITTE</span><h3>Offene Aufgaben</h3></div><button>Alle Aufgaben →</button></div><div className="taskList">{tasks.map((t,i)=><div className="task" key={i}><button className="check">✓</button><div><b>{t.task}</b><span><em>{t.owner}</em> · {t.due}</span></div></div>)}</div><div className="insight"><span>✦ KI-INSIGHT</span><b>Creative „Eigenheim + Stromkosten“ erzeugt aktuell 38 % günstigere Leads.</b><p>Empfehlung: Budget von Creative C auf B verschieben.</p><button>Empfehlung ansehen →</button></div></article>
      </section>
    </section>
  </main>
}