alter table public.birthday_photos
add column if not exists caption text not null default '';

alter table public.birthday_photos
drop constraint if exists birthday_photos_caption_check;

alter table public.birthday_photos
add constraint birthday_photos_caption_check check (char_length(caption) <= 120);
