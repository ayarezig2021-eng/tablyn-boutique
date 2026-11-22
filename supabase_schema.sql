-- ============================================================
-- TABLYN — Supabase schema. Paste ALL of it in SQL Editor > New query > Run.
-- Safe to run more than once.
-- ============================================================

-- 1) Profiles: one row per account, role is NOT editable by users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'client' check (role in ('client','admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name',''))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- helper used by the policies (security definer avoids recursion)
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- 2) Orders
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  customer_name text not null check (char_length(customer_name) between 2 and 120),
  phone text not null check (char_length(phone) between 6 and 30),
  email text not null,
  governorate text not null,
  address text not null check (char_length(address) between 5 and 300),
  notes text check (char_length(notes) <= 1500),
  items jsonb not null check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) between 1 and 20),
  subtotal numeric(10,2) not null check (subtotal >= 0),
  delivery_fee numeric(10,2) not null default 0 check (delivery_fee >= 0),
  total numeric(10,2) not null check (total >= 0),
  status text not null default 'pending'
    check (status in ('pending','confirmed','in_production','shipped','completed','cancelled')),
  created_at timestamptz not null default now()
);
create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists orders_created_idx on public.orders(created_at desc);

-- 3) Row Level Security
alter table public.profiles enable row level security;
alter table public.orders   enable row level security;

drop policy if exists "profiles: read own or admin" on public.profiles;
create policy "profiles: read own or admin" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());
-- (no insert/update policy for users: nobody can make themselves admin)

drop policy if exists "orders: insert own" on public.orders;
create policy "orders: insert own" on public.orders
  for insert to authenticated with check (user_id = auth.uid() and status = 'pending');

drop policy if exists "orders: read own or admin" on public.orders;
create policy "orders: read own or admin" on public.orders
  for select to authenticated using (user_id = auth.uid() or public.is_admin());

drop policy if exists "orders: admin update" on public.orders;
create policy "orders: admin update" on public.orders
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- 4) Backfill profiles for accounts that already exist
insert into public.profiles (id, email, full_name)
select id, email, coalesce(raw_user_meta_data->>'full_name','') from auth.users
on conflict (id) do nothing;

-- 5) MAKE YOURSELF ADMIN: create your account on the site first, then
--    replace the email and run this line ONCE:
-- update public.profiles set role = 'admin' where email = 'YOUR-EMAIL@example.com';

-- ============================================================
-- 6) SERVER-SIDE PRICE CHECK (added). Whatever the browser sends,
--    the database recomputes prices, delivery fee and total.
--    Must match the prices in index.html (MATERIALS, SHAPES, ZONES, FREE_OVER).
-- ============================================================
create or replace function public.orders_enforce_prices() returns trigger
language plpgsql set search_path = public as $$
declare
  it jsonb; new_items jsonb := '[]'::jsonb;
  mat_price numeric; shp_add numeric; qty int; unit numeric; sub numeric := 0;
  zone int; fee numeric;
begin
  for it in select * from jsonb_array_elements(new.items) loop
    mat_price := case it->>'material' when 'black' then 35 when 'bamboo' then 49 when 'steel' then 69 when 'gold' then 99 end;
    shp_add   := case it->>'shape' when 'standard' then 0 when 'rounded' then 2 when 'square' then 4 when 'vertical' then 3 end;
    if mat_price is null or shp_add is null then raise exception 'Invalid product in order'; end if;
    if (it->>'qty') !~ '^[0-9]+$' then raise exception 'Invalid quantity'; end if;
    qty := (it->>'qty')::int;
    if qty < 1 or qty > 500 then raise exception 'Invalid quantity'; end if;
    unit := mat_price + shp_add;
    sub := sub + unit * qty;
    new_items := new_items || jsonb_build_array(jsonb_build_object(
      'material', it->>'material', 'shape', it->>'shape', 'qty', qty, 'unit', unit));
  end loop;

  zone := case
    when new.governorate in ('Tunis','Ariana','Ben Arous','Manouba','Nabeul','Zaghouan','Bizerte') then 1
    when new.governorate in ('Sousse','Monastir','Mahdia','Sfax','Kairouan','Béja','Jendouba','Le Kef','Siliana') then 2
    when new.governorate in ('Kasserine','Sidi Bouzid','Gabès','Médenine','Tataouine','Gafsa','Tozeur','Kébili') then 3
  end;
  if zone is null then raise exception 'Unknown governorate'; end if;
  fee := case when sub >= 200 then 0 else case zone when 1 then 7 when 2 then 8 else 10 end end;

  new.items := new_items; new.subtotal := sub; new.delivery_fee := fee; new.total := sub + fee;
  return new;
end $$;

drop trigger if exists orders_enforce_prices on public.orders;
create trigger orders_enforce_prices before insert on public.orders
  for each row execute function public.orders_enforce_prices();
