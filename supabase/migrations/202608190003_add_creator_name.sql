alter table public.birthday_gifts
add column if not exists creator_name text not null default '보낸 사람';

alter table public.birthday_gifts
drop constraint if exists birthday_gifts_creator_name_check;

alter table public.birthday_gifts
add constraint birthday_gifts_creator_name_check
check (char_length(creator_name) between 1 and 50);

notify pgrst, 'reload schema';
