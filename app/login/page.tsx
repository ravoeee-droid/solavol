'use client';
import {useState} from 'react';
import {supabase} from '../../lib/supabase-browser';

export default function LoginPage(){
  const [email,setEmail]=useState('digitalegewinner@gmail.com');
  const [password,setPassword]=useState('');
  const [mode,setMode]=useState<'login'|'signup'>('login');
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);

  async function submit(){
    setBusy(true); setMessage('');
    const res = mode==='login'
      ? await supabase.auth.signInWithPassword({email,password})
      : await supabase.auth.signUp({email,password});
    setBusy(false);
    if(res.error){ setMessage(res.error.message); return; }
    if(mode==='signup' && !res.data.session){
      setMessage('Konto erstellt. Bitte bestätige die E-Mail und melde dich danach an.');
      return;
    }
    window.location.href='/';
  }

  return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#f5f7f8',fontFamily:'system-ui',padding:20}}>
    <section style={{width:'100%',maxWidth:420,background:'#fff',border:'1px solid #e3e9e7',borderRadius:20,padding:26,boxShadow:'0 16px 44px rgba(20,35,30,.08)'}}>
      <div style={{width:44,height:44,borderRadius:13,display:'grid',placeItems:'center',background:'#cde84d',color:'#0f2e25',fontWeight:900,fontSize:22}}>S</div>
      <p style={{fontSize:10,letterSpacing:'.13em',fontWeight:900,color:'#7c8d87',marginTop:20}}>SOLAVOL GROWTH COCKPIT</p>
      <h1 style={{margin:'5px 0 8px'}}>Sicher anmelden</h1>
      <p style={{color:'#6f7e79',fontSize:13,lineHeight:1.5}}>Nur freigegebene SOLAVOL-Konten erhalten Zugriff auf Leads, Aufgaben und Umsatzdaten.</p>
      <label style={{display:'block',fontSize:11,fontWeight:800,marginTop:18}}>E-Mail</label>
      <input value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:12,border:'1px solid #dce4e1',borderRadius:10,marginTop:6}} />
      <label style={{display:'block',fontSize:11,fontWeight:800,marginTop:14}}>Passwort</label>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:12,border:'1px solid #dce4e1',borderRadius:10,marginTop:6}} />
      <button onClick={submit} disabled={busy||password.length<8} style={{width:'100%',marginTop:18,padding:12,border:0,borderRadius:10,background:'#153d31',color:'#fff',fontWeight:800,opacity:busy||password.length<8?.6:1}}>{busy?'Bitte warten…':mode==='login'?'Anmelden':'Konto anlegen'}</button>
      {message&&<p style={{fontSize:12,color:'#6f7e79',background:'#f4f7f5',padding:10,borderRadius:9}}>{message}</p>}
      <button onClick={()=>setMode(mode==='login'?'signup':'login')} style={{width:'100%',border:0,background:'transparent',padding:10,color:'#1e5a46',fontWeight:800}}>{mode==='login'?'Erstes Login? Konto anlegen':'Bereits Konto? Anmelden'}</button>
    </section>
  </main>
}