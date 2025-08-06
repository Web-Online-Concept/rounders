import { useState, useEffect } from 'react';
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
  // Anglais par défaut
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // Récupérer la langue sauvegardée ou utiliser l'anglais par défaut
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
    } else {
      // Détecter la langue du navigateur
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        setLocale(browserLang);
      }
    }
  }, []);

  const changeLanguage = (newLocale) => {
    if (translations[newLocale]) {
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
      
      // Recharger la page pour appliquer les changements
      window.location.reload();
    }
  };

  const t = translations[locale] || translations.en;

  return {
    t,
    locale,
    changeLanguage
  };
}