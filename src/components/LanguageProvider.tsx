import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'fr' | 'en';

type Translations = Record<string, string>;

const translations: Record<Language, Translations> = {
  fr: {
    'nav.services': 'Services',
    'nav.portfolio': 'Réalisations',
    'nav.formations': 'Formations',
    'nav.apropos': 'À Propos',
    'nav.contact': 'Contact',
    'search.placeholder': 'Rechercher...',
    'search.no_results': 'Aucun résultat',
    'network.offline': 'Vous êtes hors ligne. Vérifiez votre connexion internet.',
  },
  en: {
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.formations': 'Training',
    'nav.apropos': 'About',
    'nav.contact': 'Contact',
    'search.placeholder': 'Search...',
    'search.no_results': 'No results found',
    'network.offline': 'You are offline. Please check your internet connection.',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const toggleLanguage = () => {
    handleSetLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
