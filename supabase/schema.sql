-- SOLAVOL Cockpit M2 data model
create extension if not exists pgcrypto;

create table if not exists public.solavol_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text,
  phone text,
  city text,
  source text not null default 'website',
  campaign text,
  status text not null default 'new' check (status in ('new','contacted','appointment','offer','won','lost')),
  potential_value numeric(12,2) not null default 0,
  notes text,
  meta jsonb not null default '{}'::jsonb
);

create table if not exists public.solavol_campaign_daily (
  id uuid primary key default gen_random_uuid(),
  day date not null,
  platform text not null check (platform in ('meta','google','organic','other')),
  campaign_id text,
  campaign_name text not null,
  spend numeric(12,2) not null default 0,
  impressions bigint not null default 0,
  clicks bigint not null default 0,
  leads integer not null default 0,
  unique(day, platform, campaign_name)
);

create table if not exists public.solavol_tasks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  owner text not null check (owner in ('solavol','digitale_gewinner')),
  status text not null default 'open' check (status in ('open','done')),
  due_at timestamptz,
  priority text not null default 'normal' check (priority in ('low','normal','high'))
);

create table if not exists public.solavol_revenue_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid references public.solavol_leads(id) on delete set null,
  event_type text not null check (event_type in ('offer_created','offer_won','payment_received')),
  amount numeric(12,2) not null default 0,
  external_ref text,
  meta jsonb not null default '{}'::jsonb
);

create index if not exists solavol_leads_status_idx on public.solavol_leads(status);
create index if not exists solavol_leads_created_at_idx on public.solavol_leads(created_at desc);
create index if not exists solavol_campaign_daily_day_idx on public.solavol_campaign_daily(day desc);
create index if not exists solavol_tasks_status_idx on public.solavol_tasks(status);

alter table public.solavol_leads enable row level security;
alter table public.solavol_campaign_daily enable row level security;
alter table public.solavol_tasks enable row level security;
alter table public.solavol_revenue_events enable row level security;

-- Policies are intentionally not opened to anon/authenticated here.
-- Dashboard access will be server-side only after a dedicated SOLAVOL database is connected.
