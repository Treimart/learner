create table
form (
  id bigint primary key generated always as identity,
  /* user_id bigint not null references user, */
  category_id bigint not null references category,
  title text not null,
  description text,
  status int not null,
  created timestamp not null,
  updated timestamp,
  is_deleted boolean not null,
  deleted timestamp
);

alter table favorite
  add column form_id bigint not null references form