create table
category (
  id bigint primary key generated always as identity,
  name text not null
);