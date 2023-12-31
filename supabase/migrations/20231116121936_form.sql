create table
form (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users on delete cascade,
  category_id bigint not null references category,
  title text not null,
  description text,
  status int not null,
  created timestamp not null,
  updated timestamp,
  deleted timestamp
);

alter table favorite
  add column form_id bigint not null references form;

alter table form enable row level security;

create policy "Forms are viewable by everyone."
  on public.form for select
using ( true );

create policy "Users can create a form."
  on public.form for insert
  to authenticated
  with check (true);

CREATE POLICY "Enable update for users based on user_id" ON "public"."form"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Form is updatable by user"
ON public.form
FOR UPDATE USING (
  auth.uid() = user_id
)  WITH CHECK (
  auth.uid() = user_id
);