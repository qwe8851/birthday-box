drop policy if exists "users upload own birthday images" on storage.objects;

create policy "users upload own birthday images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'birthday-images'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
