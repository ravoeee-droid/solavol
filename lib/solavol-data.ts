import {supabase} from './supabase-browser';

export async function getSession(){
  return (await supabase.auth.getSession()).data.session;
}

export async function listLeads(){
  const {data,error}=await supabase.from('solavol_leads').select('*').order('created_at',{ascending:false});
  if(error) throw error;
  return data ?? [];
}

export async function createLead(input:{name:string;city?:string;source:string;potential_value?:number}){
  const {data,error}=await supabase.from('solavol_leads').insert({
    name:input.name,
    city:input.city||null,
    source:input.source,
    potential_value:input.potential_value||0,
    status:'new'
  }).select().single();
  if(error) throw error;
  return data;
}

export async function updateLeadStatus(id:string,status:string){
  const {error}=await supabase.from('solavol_leads').update({status,updated_at:new Date().toISOString()}).eq('id',id);
  if(error) throw error;
}

export async function listTasks(){
  const {data,error}=await supabase.from('solavol_tasks').select('*').order('created_at',{ascending:false});
  if(error) throw error;
  return data ?? [];
}

export async function toggleTask(id:string,status:'open'|'done'){
  const {error}=await supabase.from('solavol_tasks').update({status}).eq('id',id);
  if(error) throw error;
}
