create table
question (
  id bigint primary key generated always as identity,
  form_id bigint not null references form,
  title text not null,
  answer text not null,
  photo_url text,
  is_evaluable boolean not null
);