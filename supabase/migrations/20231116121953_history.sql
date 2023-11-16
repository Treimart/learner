create table
history (
  /* user_id bigint not null references user,*/
  form_id bigint not null references form,
  lastViewed timestamp
);