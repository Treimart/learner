create table
public.user (
  user_id uuid not null primary key references auth.users on delete cascade,
  username text,
  is_deleted boolean,
  deleted timestamp
);

alter table favorite
  add column user_id uuid not null references public.user;

alter table form
  add column user_id uuid not null references public.user;

alter table history
  add column user_id uuid not null references public.user;


alter table public.user enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.user for select
  using ( true );

create policy "Users can insert their own profile."
  on public.user for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own profile."
  on public.user for update
  using ( auth.uid() = user_id );
