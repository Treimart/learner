create table
question (
  id bigint primary key generated always as identity,
  form_id bigint not null references form,
  title text not null,
  answer text not null,
  photo_url text,
  is_evaluable boolean not null
);

alter table question enable row level security;

create policy "Questions are viewable by everyone."
  on public.question for select
using ( true );

create policy "Users can create a question."
  on public.question for insert
  to authenticated
  with check (true);