create table
history (
  user_id uuid references auth.users on delete cascade,
  form_id bigint not null references form,
  lastViewed timestamp
);

alter table history enable row level security;