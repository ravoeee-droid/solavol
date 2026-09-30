import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || !body.name) {
    return NextResponse.json({ok:false,error:'name_required'},{status:400});
  }

  // M2 contract: once the dedicated SOLAVOL database is connected,
  // this endpoint writes into solavol_leads. Until then we fail closed
  // instead of pretending a lead was stored.
  if (!process.env.SOLAVOL_DATABASE_READY) {
    return NextResponse.json(
      {ok:false,error:'database_not_connected'},
      {status:503},
    );
  }

  return NextResponse.json({ok:false,error:'database_adapter_pending'},{status:503});
}
