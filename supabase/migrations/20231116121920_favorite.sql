create table
favorite (
    user_id uuid not null references auth.users on delete cascade
);

alter table favorite enable row level security;