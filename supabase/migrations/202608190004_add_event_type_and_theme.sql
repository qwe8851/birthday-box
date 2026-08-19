alter table public.birthday_gifts
add column if not exists event_type text not null default 'birthday';

alter table public.birthday_gifts
add column if not exists theme_color text not null default 'pink';

alter table public.birthday_gifts
drop constraint if exists birthday_gifts_event_type_check;

alter table public.birthday_gifts
add constraint birthday_gifts_event_type_check
check (event_type in ('birthday', 'anniversary', 'congratulations', 'thanks', 'cheer'));

alter table public.birthday_gifts
drop constraint if exists birthday_gifts_theme_color_check;

alter table public.birthday_gifts
add constraint birthday_gifts_theme_color_check
check (theme_color in ('red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'));

notify pgrst, 'reload schema';
