import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'fr' | 'en';

export type Translations = Record<string, string>;

const translations: Record<Language, Translations> = {
  fr: {
    // Navigation / General
    'nav.accueil': 'Accueil',
    'nav.services': 'Services',
    'nav.pos': 'Logiciel POS',
    'nav.formations': 'Formations',
    'nav.portfolio': 'Réalisations',
    'nav.apropos': 'À Propos',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'search.placeholder': 'Rechercher...',
    'search.no_results': 'Aucun résultat',
    'network.offline': 'Vous êtes hors ligne. Vérifiez votre connexion internet.',
    
    // Hero Section
    'hero.badge': 'Digitalisation & Logiciel sur mesure',
    'hero.title.part1': 'Propulsez votre entreprise grâce au ',
    'hero.title.highlight': 'digital sur mesure.',
    'hero.subtitle': 'De la création de votre site web à l\'automatisation de vos processus, HardSoft Technologies conçoit les solutions logicielles qui feront grandir votre activité.',
    'hero.btn_services': 'Découvrir nos services',
    'hero.btn_whatsapp': 'Demander un devis sur WhatsApp',
    'hero.code_comment': 'const client = s’épanouir();',

    // CompanyStats Section
    'stats.projects.title': 'Projets Livrés',
    'stats.projects.desc': 'En Afrique et à l’international',
    'stats.satisfaction.title': 'Clients Satisfaits',
    'stats.satisfaction.desc': 'Accompagnement de bout en bout',
    'stats.support.title': 'Support Réactif',
    'stats.support.desc': 'Disponible 7/7j',
    'stats.students.title': 'Élèves Formés',
    'stats.students.desc': 'Sur les technos modernes',

    // Methodology (Approaches) Section
    'approaches.badge': 'Notre Méthodologie',
    'approaches.title': 'Comment nous travaillons pour assurer votre succès',
    'approaches.descr': 'De la première discussion au déploiement final, nous suivons un processus rigoureux et collaboratif.',
    'approaches.step1.title': '1. Cadrage & Stratégie',
    'approaches.step1.desc': 'Nous analysons en profondeur vos processus pour définir un cahier des charges fonctionnel précis.',
    'approaches.step2.title': '2. Prototype & UX Design',
    'approaches.step2.desc': 'Conception d’interfaces élégantes et hautement intuitives axées sur l’expérience utilisateur.',
    'approaches.step3.title': '3. Développement Agile',
    'approaches.step3.desc': 'Architecture logicielle robuste et codage propre avec livraisons régulières.',
    'approaches.step4.title': '4. Recette & Go-Live',
    'approaches.step4.desc': 'Tests automatisés poussés avant la mise en production sur des serveurs hautement sécurisés.',

    // Services Section
    'services.badge': 'Nos Expertises',
    'services.title': 'Des solutions adaptées à vos besoins',
    'services.descr': 'Nous concevons des outils modernes pour transformer votre façon de travailler.',
    'services.web.title': 'Applications Web & Plateformes SaaS',
    'services.web.desc': 'Solutions web robustes et évolutives bâties sur mesure pour votre secteur d\'activité.',
    'services.automation.title': 'Automatisation & Intégration',
    'services.automation.desc': 'Interconnexion de vos outils (n8n, APIs) pour supprimer les tâches fastidieuses et répétitives.',
    'services.mobile.title': 'Applications Mobiles',
    'services.mobile.desc': 'Expériences natives et hybrides Android et iOS d’une fluidité absolue en déplacement.',
    'services.consulting.title': 'Architecture & Conseil',
    'services.consulting.desc': 'Audit de vos systèmes d\'information et accompagnement stratégique sur mesure.',
    'services.learn_more': 'En savoir plus',

    // Technologies Section
    'tech.badge': 'Notre Stack',
    'tech.title': 'Des technologies modernes, pérennes et éprouvées',
    'tech.descr': 'Nous sélectionnons avec soin les outils technologiques les plus fiables du marché pour garantir performance absolue et évolutivité.',

    // POS Section
    'pos.badge': 'Solution d’encaissement',
    'pos.title': 'Gérez votre commerce en toute simplicité',
    'pos.descr': 'Notre logiciel de Point de Vente (POS) est conçu spécifiquement pour les boutiques, supérettes, restaurants et commerces de détails modernes.',
    'pos.features.offline': 'Fonctionnement hors-ligne autonome',
    'pos.features.stock': 'Suivi des stocks en temps réel',
    'pos.features.stats': 'Indicateurs de performance et rapports',
    'pos.features.multi': 'Gestion multi-boutiques unifiée',

    // Formations Section
    'formations.badge': 'Apprentissage & Formation',
    'formations.title': 'Formez-vous aux technologies de demain',
    'formations.descr': 'Nous coachons et formons les talents aux meilleurs outils et architectures technologiques du marché.',
    'formations.dev.title': 'Développement Full-Stack',
    'formations.dev.desc': 'Devenez autonome sur React, Node.js et les architectures serveurs performantes.',
    'formations.automation.title': 'Maîtrise du NoCode & Automatisation',
    'formations.automation.desc': 'Apprenez à automatiser n\'importe quel workflow grâce à n8n, Make et l\'intégration IA.',
    'formations.btn_join': 'S’inscrire à la session',

    // Portfolio Section
    'portfolio.badge': 'Nos Réalisations',
    'portfolio.title': 'Des projets d’excellence qui font la différence',
    'portfolio.descr': 'Une sélection rigoureuse de projets récents que nous avons fièrement conçus et déployés.',

    // About Section
    'about.badge': 'Qui sommes-nous',
    'about.title': 'HardSoft Technologies & Chérif Alioune Diatta',
    'about.descr': 'Créateur d\'excellence logicielle basé à Dakar, nous construisons l’avenir du Web pour nos clients.',
    'about.tab.enterprise': 'L’Entreprise',
    'about.tab.methods': 'Méthode',
    'about.tab.founder': 'Le Fondateur',
    'about.booking.title': '📅 Réservez votre session de cadrage offerte',
    'about.booking.desc': 'Prenez un créneau pour échanger directement de votre projet avec notre concepteur logiciel.',
    'about.booking.success_title': 'Rendez-vous Confirmé ! 🎉',
    'about.booking.success_desc': 'Merci {name}. Votre rendez-vous de cadrage pour {type} a bien été enregistré pour le {date} à {time}.',
    'about.booking.btn_meeting': 'Prendre un rendez-vous gratuit',

    // Testimonials Section
    'testimonials.badge': 'Témoignages',
    'testimonials.title': 'Ce que nos partenaires disent de nous',
    'testimonials.descr': 'La plus belle des récompenses est le succès des plateformes que nous bâtissons pour nos clients.',

    // FAQ Section
    'faq.badge': 'FAQ',
    'faq.title': 'Des réponses claires à vos questions',
    'faq.descr': 'Tout ce que vous devez savoir pour démarrer sereinement votre projet avec notre agence.',

    // Estimator Section
    'estimator.badge': 'Budget Estimator',
    'estimator.title': 'Estimez votre projet digital en 1 minute',
    'estimator.descr': 'Sélectionnez vos besoins ci-dessous pour obtenir instantanément une estimation budgétaire indicative pour votre projet.',

    // Contact & Footer Section
    'contact.badge': 'Contact',
    'contact.title': 'Démarrons un projet ensemble.',
    'contact.descr': 'Vous avez un projet de développement ou d\'automatisation ? Parlons-en de vive voix ! Notre équipe vous répond sous 24h ouvrées.',
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Adresse E-mail',
    'contact.form.phone': 'Téléphone (WhatsApp)',
    'contact.form.message': 'Décrivez votre projet...',
    'contact.form.submit': 'Envoyer ma demande',
    'contact.form.sending': 'Envoi en cours...',
    'contact.form.success': 'Votre message a été transmis avec succès. À très bientôt !',
  },
  en: {
    // Navigation / General
    'nav.accueil': 'Home',
    'nav.services': 'Services',
    'nav.pos': 'POS Software',
    'nav.formations': 'Training',
    'nav.portfolio': 'Portfolio',
    'nav.apropos': 'About',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'search.placeholder': 'Search...',
    'search.no_results': 'No results found',
    'network.offline': 'You are offline. Please check your internet connection.',
    
    // Hero Section
    'hero.badge': 'Custom Software & Digitalization',
    'hero.title.part1': 'Propel your business thanks to ',
    'hero.title.highlight': 'bespoke digital solutions.',
    'hero.subtitle': 'From creating your website to automating your internal business processes, HardSoft Technologies designs software that scales your operations.',
    'hero.btn_services': 'Discover our services',
    'hero.btn_whatsapp': 'Request a quote on WhatsApp',
    'hero.code_comment': 'const client = thrive();',

    // CompanyStats Section
    'stats.projects.title': 'Projects Delivered',
    'stats.projects.desc': 'In Africa and internationally',
    'stats.satisfaction.title': 'Satisfied Clients',
    'stats.satisfaction.desc': 'End-to-end dedicated support',
    'stats.support.title': 'Support Desk',
    'stats.support.desc': 'Available 7/7 days',
    'stats.students.title': 'Talents Trained',
    'stats.students.desc': 'On advanced technologies',

    // Methodology (Approaches) Section
    'approaches.badge': 'Our Methodology',
    'approaches.title': 'How we work to guarantee your success',
    'approaches.descr': 'From the initial scope analysis to final production launch, we deploy an agile workflow.',
    'approaches.step1.title': '1. Scoping & Strategy',
    'approaches.step1.desc': 'We deep-dive into your processes to draft clear blueprint and functional requirements.',
    'approaches.step2.title': '2. Prototype & UX Design',
    'approaches.step2.desc': 'Designing elegant, intuitive UI mockups centered on standard conversion rates.',
    'approaches.step3.title': '3. Agile Programming',
    'approaches.step3.desc': 'Building highly secure codebases and backend engines with consistent feature delivery.',
    'approaches.step4.title': '4. QA & Go-Live',
    'approaches.step4.desc': 'Extensive quality assurance tests before hosting on secure distributed modern cloud servers.',

    // Services Section
    'services.badge': 'Our Areas of Expertise',
    'services.title': 'Bespoke solutions for modern business',
    'services.descr': 'We build custom engines to transform the daily productivity of your company.',
    'services.web.title': 'Web Applications & SaaS Systems',
    'services.web.desc': 'Robust, scalable digital experiences tailored specfically for your exact industry.',
    'services.automation.title': 'Automation & Workflows',
    'services.automation.desc': 'Connecting all your SaaS tools (n8n, APIs) to eliminate error-prone repetitive tasks.',
    'services.mobile.title': 'Mobile Development',
    'services.mobile.desc': 'Flawless native and hybrid Android & iOS apps to support clients on the move.',
    'services.consulting.title': 'Audit & Architecture',
    'services.consulting.desc': 'Consulting on systems architecture, tech audits, and secure workspace transformation.',
    'services.learn_more': 'Learn more',

    // Technologies Section
    'tech.badge': 'Our Technology Stack',
    'tech.title': 'Modern, long-lasting & ultra-responsive tools',
    'tech.descr': 'We carefully curate the best-performing stacks to warrant speed, security and perfect maintainability.',

    // POS Section
    'pos.badge': 'Checkout Tooling',
    'pos.title': 'Run your local business with absolute friction-free control',
    'pos.descr': 'Bespoke Point of Sale (POS) application made for retail stores, supermarkets, restaurants and boutique shops.',
    'pos.features.offline': 'Offline resilient fallback',
    'pos.features.stock': 'Real-time stock level tracker',
    'pos.features.stats': 'Performance metrics and charts',
    'pos.features.multi': 'Unified multi-location settings',

    // Formations Section
    'formations.badge': 'Training & Workshops',
    'formations.title': 'Upskill your talent on advanced modern engines',
    'formations.descr': 'Practical, hands-on, expert-led curricula to master real-world coding and process optimization.',
    'formations.dev.title': 'Full-Stack Development Cursus',
    'formations.dev.desc': 'Build autonomous mastery over React, Node.js engines and advanced architectures.',
    'formations.automation.title': 'NoCode Workflow Automation',
    'formations.automation.desc': 'Automate any workflows using leading edge automated services like n8n and AI tools.',
    'formations.btn_join': 'Register for next batch',

    // Portfolio Section
    'portfolio.badge': 'Success Stories',
    'portfolio.title': 'High-performance projects designed for real impact',
    'portfolio.descr': 'Explore user-first systems, mobile applications and business tools we successfully drafted.',

    // About Section
    'about.badge': 'Who we are',
    'about.title': 'Bespoke Digital Creators & Technology Lead',
    'about.descr': 'Based in Dakar, Senegal, we craft highly optimized codebases to empower business growth.',
    'about.tab.enterprise': 'The Company',
    'about.tab.methods': 'Method',
    'about.tab.founder': 'The Founder',
    'about.founder.bio': 'With over 8 years of specialized software architecture consulting, Chérif Alioune Diatta guides enterprise digitization curves.',
    'about.booking.title': '📅 Secure your free scoping session now',
    'about.booking.desc': 'Select your preferred window to lock in a discussion with our lead chief developer.',
    'about.booking.success_title': 'Booking Confirmed! 🎉',
    'about.booking.success_desc': 'Thank you {name}. Your scoping session for {type} has been successfully scheduled for {date} at {time}.',
    'about.booking.btn_meeting': 'Schedule free call now',

    // Testimonials Section
    'testimonials.badge': 'Client Reviews',
    'testimonials.title': 'What digital visionaries say about our code',
    'testimonials.descr': 'Our main reward is witnessing the positive growth and adoption rates of the custom apps we deliver.',

    // FAQ Section
    'faq.badge': 'FAQ',
    'faq.title': 'Clear answers to standard client questions',
    'faq.descr': 'Everything you need to know about setting up a successful partnership with our technical team.',

    // Estimator Section
    'estimator.badge': 'Pricing Estimator',
    'estimator.title': 'Estimate your custom development cost in 1 minute',
    'estimator.descr': 'Configure your requirements below to immediately calculate an approximate development price range.',

    // Contact & Footer Section
    'contact.badge': 'Contact Us',
    'contact.title': 'Let’s construct elite software together.',
    'contact.descr': 'Got an application idea or need immediate process automation? Mail us or WhatsApp us right away!',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Business Email',
    'contact.form.phone': 'Phone number (WhatsApp)',
    'contact.form.message': 'Project brief and goals...',
    'contact.form.submit': 'Send Request',
    'contact.form.sending': 'Sending mail...',
    'contact.form.success': 'Your detailed message was sent! We will follow up matching your workflow.',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
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

  // Upgraded dynamic/parameterized custom translate function
  const t = (key: string, params?: Record<string, string | number>): string => {
    let value = translations[language]?.[key] || translations['fr']?.[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(new RegExp(`{${k}}`, 'g'), String(v));
      });
    }
    return value;
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
