import { useRouter } from 'next/router';
import fr from '../locales/fr';
import en from '../locales/en';
import es from '../locales/es';
import ru from '../locales/ru';

const translations = {
  fr,
  en,
  es,
  ru
};

export function useTranslation() {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (newLocale) => {
    if (translations[newLocale]) {
      // Utilise le système de routing de Next.js pour changer la langue
      router.push(router.pathname, router.asPath, { locale: newLocale });
    }
  };

  const t = translations[locale] || translations.fr;

  return {
    t,
    locale,
    changeLanguage
  };
}