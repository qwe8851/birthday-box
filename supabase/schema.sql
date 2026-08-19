create extension if not exists pgcrypto;

create table public.birthday_gifts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  public_id text not null unique check (public_id ~ '^[A-Za-z0-9_-]{8,32}$'),
  recipient_name text not null check (char_length(recipient_name) between 1 and 50),
  creator_name text not null check (char_length(creator_name) between 1 and 50),
  event_type text not null default 'birthday' check (event_type in ('birthday', 'anniversary', 'congratulations', 'thanks', 'cheer')),
  theme_color text not null default 'pink' check (theme_color in ('red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink')),
  birthday date not null,
  cover_image text,
  letter text not null default '' check (char_length(letter) <= 10000),
  gift jsonb not null default '{}'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.birthday_photos (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references public.birthday_gifts(id) on delete cascade,
  url text not null,
  storage_path text not null,
  caption text not null default '' check (char_length(caption) <= 120),
  sort_order integer not null default 0 check (sort_order >= 0)
);

create table public.contract_terms (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references public.birthday_gifts(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 1000),
  sort_order integer not null default 0 check (sort_order >= 0)
);

create index birthday_gifts_user_id_idx on public.birthday_gifts(user_id);
create index birthday_gifts_public_lookup_idx on public.birthday_gifts(public_id) where is_published = true;
create index birthday_photos_gift_id_idx on public.birthday_photos(gift_id, sort_order);
create index contract_terms_gift_id_idx on public.contract_terms(gift_id, sort_order);

create or replace function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger set_birthday_gifts_updated_at before update on public.birthday_gifts
for each row execute function public.set_updated_at();

alter table public.birthday_gifts enable row level security;
alter table public.birthday_photos enable row level security;
alter table public.contract_terms enable row level security;

create policy "owners manage gifts" on public.birthday_gifts for all to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "anyone reads published gifts" on public.birthday_gifts for select to anon, authenticated
using (is_published = true);

create policy "owners manage photos" on public.birthday_photos for all to authenticated
using (exists (select 1 from public.birthday_gifts g where g.id = gift_id and g.user_id = (select auth.uid())))
with check (exists (select 1 from public.birthday_gifts g where g.id = gift_id and g.user_id = (select auth.uid())));
create policy "anyone reads published photos" on public.birthday_photos for select to anon, authenticated
using (exists (select 1 from public.birthday_gifts g where g.id = gift_id and g.is_published = true));

create policy "owners manage contract terms" on public.contract_terms for all to authenticated
using (exists (select 1 from public.birthday_gifts g where g.id = gift_id and g.user_id = (select auth.uid())))
with check (exists (select 1 from public.birthday_gifts g where g.id = gift_id and g.user_id = (select auth.uid())));
create policy "anyone reads published contract terms" on public.contract_terms for select to anon, authenticated
using (exists (select 1 from public.birthday_gifts g where g.id = gift_id and g.is_published = true));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('birthday-images', 'birthday-images', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update set public = excluded.public,
file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "users upload own birthday images" on storage.objects for insert to authenticated
with check (bucket_id = 'birthday-images' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "users update own birthday images" on storage.objects for update to authenticated
using (bucket_id = 'birthday-images' and owner_id = (select auth.uid()::text))
with check (bucket_id = 'birthday-images' and owner_id = (select auth.uid()::text));
create policy "users delete own birthday images" on storage.objects for delete to authenticated
using (bucket_id = 'birthday-images' and owner_id = (select auth.uid()::text));
