import { cookies, headers } from 'next/headers';
import { getMessages, localeCookieName, resolveLocale } from './i18n';

export async function getServerI18n() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = resolveLocale(
    cookieStore.get(localeCookieName)?.value,
    headerStore.get('accept-language'),
  );

  return {
    locale,
    messages: getMessages(locale),
  };
}
