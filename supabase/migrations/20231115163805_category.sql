create table
category (
  id bigint primary key generated always as identity,
  name text not null
);

alter table category enable row level security;

create policy "Categories are viewable by everyone."
  on public.category for select
  using ( true );