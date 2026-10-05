-- Safe additive setup for an existing e-Vote Supabase project.
alter table public.elections add column if not exists banner_url text;
alter table public.candidates add column if not exists reviewer_note text;
alter table public.elections add column if not exists time_zone text;

-- Existing datetime-local values were previously stored as UTC wall times.
-- This guarded update converts those old values once to Africa/Kampala instants.
update public.elections
set starts_at = starts_at - interval '3 hours',
    ends_at = ends_at - interval '3 hours',
    time_zone = 'Africa/Kampala'
where time_zone is null;

alter table public.elections alter column time_zone set default 'Africa/Kampala';
alter table public.elections alter column time_zone set not null;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'election-media',
  'election-media',
  true,
  4194304,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Election media is publicly readable" on storage.objects;
create policy "Election media is publicly readable" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'election-media');