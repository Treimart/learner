create table
category (
  id bigint primary key generated always as identity,
  name text not null,
  user_id uuid references auth.users on delete cascade
);

alter table category enable row level security;

create policy "Categories are viewable by everyone."
  on public.category for select
  using ( true );

create policy "Users can insert their own categories."
  on public.category for insert
  to authenticated
  with check (true);

create policy "Users can delete their own categories."
  on public.category for delete
  to authenticated
  using (true);