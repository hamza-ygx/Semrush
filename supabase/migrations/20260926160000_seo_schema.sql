create schema if not exists seo;
revoke all on schema seo from public, anon;
grant usage on schema seo to authenticated, service_role;

create or replace function seo.is_staff() returns boolean
language sql stable security invoker set search_path = ''
as $$ select coalesce(lower(auth.jwt() ->> 'email') like '%@rkjh.se', false) $$;

create table seo.projects (
  id uuid primary key default gen_random_uuid(),
  domain text not null unique check (domain ~ '^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$'),
  name text not null,
  gsc_property text,
  crawl_limit int not null default 200 check (crawl_limit between 1 and 1000),
  created_by uuid default auth.uid() references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table seo.crawls (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references seo.projects(id) on delete cascade,
  status text not null default 'running' check (status in ('running','done','failed')),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  pages_crawled int not null default 0,
  health int,
  errors int not null default 0,
  warnings int not null default 0,
  notices int not null default 0,
  error text,
  started_by uuid default auth.uid() references auth.users(id) on delete set null
);
create index on seo.crawls (project_id, started_at desc);

create table seo.crawl_pages (
  crawl_id uuid not null references seo.crawls(id) on delete cascade,
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

create table seo.crawl_issues (
  id bigint generated always as identity primary key,
  crawl_id uuid not null references seo.crawls(id) on delete cascade,
  check_id text not null,
  severity text not null check (severity in ('error','warning','notice')),
  url text not null,
  detail text
);
create index on seo.crawl_issues (crawl_id, check_id);

create table seo.gsc_daily (
  project_id uuid not null references seo.projects(id) on delete cascade,
  date date not null,
  clicks int not null,
  impressions int not null,
  ctr double precision not null,
  position double precision not null,
  primary key (project_id, date)
);

create table seo.gsc_query_daily (
  project_id uuid not null references seo.projects(id) on delete cascade,
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
create index on seo.gsc_query_daily (project_id, query, date);

create table seo.gsc_syncs (
  id bigint generated always as identity primary key,
  project_id uuid not null references seo.projects(id) on delete cascade,
  synced_at timestamptz not null default now(),
  start_date date not null,
  end_date date not null,
  rows int not null default 0,
  error text,
  synced_by uuid default auth.uid() references auth.users(id) on delete set null
);
create index on seo.gsc_syncs (project_id, synced_at desc);

do $$ declare t text; begin
  foreach t in array array['projects','crawls','crawl_pages','crawl_issues','gsc_daily','gsc_query_daily','gsc_syncs'] loop
    execute format('alter table seo.%I enable row level security', t);
    execute format('create policy staff_all on seo.%I for all to authenticated using ((select seo.is_staff())) with check ((select seo.is_staff()))', t);
    execute format('grant select, insert, update, delete on seo.%I to authenticated', t);
    execute format('grant all on seo.%I to service_role', t);
  end loop;
end $$;
grant execute on function seo.is_staff() to authenticated;
grant usage, select on all sequences in schema seo to authenticated, service_role;

insert into seo.projects (domain, name, gsc_property) values ('www.rkjh.se', 'www.rkjh.se', 'sc-domain:rkjh.se');

alter role authenticator set pgrst.db_schemas = 'public, graphql_public, seo';
notify pgrst, 'reload config';

create or replace function seo.rank_history(p_project uuid, p_queries text[], p_since date)
returns table (query text, day date, avg_position double precision, clicks bigint, impressions bigint)
language sql stable security invoker set search_path = ''
as $$
  select d.query, d.date,
         sum(d.position * d.impressions) / nullif(sum(d.impressions), 0),
         sum(d.clicks), sum(d.impressions)
  from seo.gsc_query_daily d
  where d.project_id = p_project and d.query = any(p_queries) and d.date >= p_since
  group by d.query, d.date
$$;
revoke all on function seo.rank_history(uuid, text[], date) from public, anon;
grant execute on function seo.rank_history(uuid, text[], date) to authenticated;
