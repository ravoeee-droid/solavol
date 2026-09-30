import { NextResponse } from 'next/server';
export async function GET(){
  return NextResponse.json({
    databaseUrl: Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
    serviceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    anonKey: Boolean(process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    databaseReady: Boolean(process.env.SOLAVOL_DATABASE_READY),
  });
}