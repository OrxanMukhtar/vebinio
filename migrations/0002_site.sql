create table if not exists site_copy (
  id int primary key,
  body text not null,
  updated_at timestamptz not null default now(),
  constraint site_copy_singleton check (id = 1)
);

create table if not exists site_owner (
  id int primary key,
  user_id text not null unique,
  created_at timestamptz not null default now(),
  constraint site_owner_singleton check (id = 1)
);
