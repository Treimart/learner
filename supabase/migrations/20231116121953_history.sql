create table
history (
  form_id bigint not null references form,
  lastViewed timestamp
);

alter table history enable row level security;