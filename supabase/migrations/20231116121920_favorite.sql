create table
favorite (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users on delete cascade not null
);

alter table favorite enable row level security;

create policy "Favorites are viewable by everyone."
  on public.favorite for select
  using ( true );

create policy "Users can insert their own favorites."
  on public.favorite for insert
  to authenticated
  with check (true);

create policy "Users can delete their own favorites."
  on public.favorite for delete
  to authenticated
  using (true);