create table
form (
  id bigint primary key generated always as identity,
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