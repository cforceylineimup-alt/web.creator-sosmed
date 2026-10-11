-- Jalankan sekali di Supabase: SQL Editor > New query > Run
create table if not exists public.saluran_docs (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.saluran_docs enable row level security;

drop policy if exists "saluran_baca"  on public.saluran_docs;
drop policy if exists "saluran_tambah" on public.saluran_docs;
drop policy if exists "saluran_ubah"  on public.saluran_docs;

create policy "saluran_baca"   on public.saluran_docs for select using (true);
create policy "saluran_tambah" on public.saluran_docs for insert with check (true);
create policy "saluran_ubah"   on public.saluran_docs for update using (true) with check (true);
