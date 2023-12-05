create table
history (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users on delete cascade,
  form_id bigint not null references form,
  lastcompletion timestamp
);

alter table history enable row level security;

create policy "History is viewable by everyone."
  on public.history for select
  using ( true );

create policy "Users can insert their own history."
  on public.history for insert
  to authenticated
  with check (true);

CREATE POLICY "History is updatable by user"
ON public.history
FOR UPDATE USING (
  auth.uid() = user_id
)  WITH CHECK (
  auth.uid() = user_id
);