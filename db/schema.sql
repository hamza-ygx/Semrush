create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  domain text not null unique check (domain ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$'),
  name text not null,
  gsc_property text,
  crawl_limit int not null default 200 check (crawl_limit between 1 and 1000),
  created_by text,
  created_at timestamptz not null default now()
);

create table if not exists crawls (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  status text not null default 'running' check (status in ('running','done','failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  pages_crawled int not null default 0,
  health int,
  errors int not null default 0,
  warnings int not null default 0,
  notices int not null default 0,
  error text,
  started_by text
);
create index if not exists crawls_project_started on crawls (project_id, started_at desc);

create table if not exists crawl_pages (
  crawl_id uuid not null references crawls(id) on delete cascade,
  url text not null,
  status int,
  redirect_to text,
  content_type text,
  bytes int,
  ms int,
  depth int not null default 0,
  title text,
  meta_description text,
  h1 text,
  h1_count int,
  canonical text,
  noindex boolean not null default false,
  word_count int,
  internal_links int,
  external_links int,
  images int,
  images_missing_alt int,
  primary key (crawl_id, url)
);

create table if not exists crawl_issues (
  id bigint generated always as identity primary key,
  crawl_id uuid not null references crawls(id) on delete cascade,
  check_id text not null,
  severity text not null check (severity in ('error','warning','notice')),
  url text not null,
  detail text
);
create index if not exists crawl_issues_crawl_check on crawl_issues (crawl_id, check_id);

create table if not exists gsc_daily (
  project_id uuid not null references projects(id) on delete cascade,
  date date not null,
  clicks int not null,
  impressions int not null,
  ctr double precision not null,
  position double precision not null,
  primary key (project_id, date)
);

create table if not exists gsc_query_daily (
  project_id uuid not null references projects(id) on delete cascade,
  date date not null,
  query text not null,
  page text not null,
  country text not null,
  device text not null,
  clicks int not null,
  impressions int not null,
  position double precision not null,
  primary key (project_id, date, query, page, country, device)
);
create index if not exists gsc_query_daily_query on gsc_query_daily (project_id, query, date);

create table if not exists gsc_syncs (
  id bigint generated always as identity primary key,
  project_id uuid not null references projects(id) on delete cascade,
  synced_at timestamptz not null default now(),
  start_date date not null,
  end_date date not null,
  rows int not null default 0,
  error text,
  synced_by text
);
create index if not exists gsc_syncs_project on gsc_syncs (project_id, synced_at desc);

insert into projects (domain, name, gsc_property) values ('www.rkjh.se', 'www.rkjh.se', 'sc-domain:rkjh.se') on conflict (domain) do nothing;
