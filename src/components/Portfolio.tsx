import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, Share2, Calendar, Shield, Cpu, Sparkles, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import LazyImage from './LazyImage';
import { useLanguage } from './LanguageProvider';
import SEO from './SEO';

const categories = ['Tous', 'SaaS & Écosystème', 'Institutionnel', 'E-Commerce & Médias'];

const projects = [
  {
    slug: 'pharma24',
    name: 'Pharma24',
    domain: 'pharma24.net',
    description: 'Plateforme connectée et répertoire des pharmacies du Sénégal.',
    descriptionEn: 'Connected platform and pharmacy network registry in Senegal.',
    category: 'SaaS & Écosystème',
    categoryEn: 'SaaS & Ecosystem',
    accent: 'bg-emerald-500',
    isNew: true,
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    highlights: [
      'Recherche géolocalisée intelligente',
      'Pharmacies de garde en temps réel',
      'Base de données médicaments sénégalais'
    ],
    highlightsEn: [
      'Smart localized geo-search',
      'Real-time pharmacy duty rosters',
      'Senegalese medicines lookup'
    ]
  },
  {
    slug: 'teeru',
    name: 'Teeru',
    domain: 'teeru-sn.com',
    description: 'Plateforme de services à la demande.',
    descriptionEn: 'On-demand local booking and services platform.',
    category: 'SaaS & Écosystème',
    categoryEn: 'SaaS & Ecosystem',
    accent: 'bg-blue-500',
    isNew: true,
    tech: ['React Native', 'Node.js', 'Redis', 'WebSockets', 'AWS'],
    highlights: [
      'Réservation en temps réel',
      'Messagerie instantanée interne',
      'Paiement mobile (Wave, Orange Money)'
    ],
    highlightsEn: [
      'Real-time matches & requests',
      'Secure chat module',
      'Integrated African mobile money checks (Wave, OM)'
    ]
  },
  {
    slug: 'smart-display',
    name: 'HardSoft Smart Display',
    domain: 'digitalsignage.hardsoft-technologies.net',
    description: 'Solution de signalisation numérique d\'entreprise.',
    descriptionEn: 'Corporate digital signage solutions network.',
    category: 'SaaS & Écosystème',
    categoryEn: 'SaaS & Ecosystem',
    accent: 'bg-indigo-500',
    isNew: true,
    tech: ['Next.js', 'Electron', 'SQLite', 'Tailwind CSS'],
    highlights: [
      'Gestion à distance en temps réel',
      'Lecteur autonome et hors-ligne',
      'Planification de playlists de contenus'
    ],
    highlightsEn: [
      'Remote centralized console screen management',
      'Offline-first display reader runtime',
      'Complex custom program playback scheduling'
    ]
  },
  {
    slug: 'algs',
    name: 'ALGS',
    domain: 'algs.hardsoft-technologies.net',
    description: 'Application et solution logistique de livraison.',
    descriptionEn: 'Delivery and fleet logistics solution optimizer.',
    category: 'SaaS & Écosystème',
    categoryEn: 'SaaS & Ecosystem',
    accent: 'bg-orange-500',
    tech: ['React', 'Express', 'MongoDB', 'Google Maps API'],
    highlights: [
      'Optimisation intelligente des trajets',
      'Suivi GPS en temps réel des flottes',
      'Module facturation client'
    ],
    highlightsEn: [
      'Dynamic multi-destination route dispatch',
      'Live GPS map status checks',
      'Automated invoice & client portal'
    ]
  },
  {
    slug: 'jikjikoox',
    name: 'JikJikoox',
    domain: 'jikjikoox.com',
    description: 'Plateforme e-commerce / Marketplace.',
    descriptionEn: 'Modern e-commerce and local merchant marketplace.',
    category: 'SaaS & Écosystème',
    categoryEn: 'SaaS & Ecosystem',
    accent: 'bg-violet-500',
    tech: ['Next.js', 'GraphQL', 'PostgreSQL', 'Stripe'],
    highlights: [
      'Multi-vendeurs avec tableaux de bord',
      'Expérience d\'achat instantanée',
      'Gestion avancée des stocks marchands'
    ],
    highlightsEn: [
      'Multi-vendor dedicated stripe dashboards',
      'Optimized lightning-fast product filter checkout',
      'Unified merchant inventory controls'
    ]
  },
  {
    slug: 'sourcedevise',
    name: 'Source Devise Sénégal',
    domain: 'sourcedeviesenegal.com',
    description: 'Plateforme financière/change.',
    descriptionEn: 'Secure financial fiat and foreign exchange dashboard.',
    category: 'Institutionnel',
    categoryEn: 'Institutional',
    accent: 'bg-teal-500',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    highlights: [
      'Visualisation des taux de change',
      'Calculateur de conversion automatique',
      'Actualités financières régionales'
    ],
    highlightsEn: [
      'Live dynamic rate change visualizations',
      'Smart currency converter formulas',
      'West African economic briefing feeds'
    ]
  },
  {
    slug: 'emsarts',
    name: 'Emsarts & Fegomus',
    domain: 'emsarts.com',
    description: 'Vitrines artistiques, événementielles ou d\'agences.',
    descriptionEn: 'Creative, arts, and dynamic booking events hub.',
    category: 'Institutionnel',
    categoryEn: 'Institutional',
    accent: 'bg-rose-500',
    tech: ['Vue.js', 'Vite', 'GSAP', 'CSS Variables'],
    highlights: [
      'Design immersif ultra-fluide',
      'Billetterie en ligne sécurisée',
      'Galeries d\'art haute définition'
    ],
    highlightsEn: [
      'Immersive and fluid motion graphics (GSAP)',
      'Secure digital ticket claims',
      'High fidelity artist assets grids'
    ]
  },
  {
    slug: 'birkama',
    name: 'Birkama Balante',
    domain: 'birkamabalante.com',
    description: 'Site institutionnel ou communautaire.',
    descriptionEn: 'Cultural community portal and institutional platform.',
    category: 'Institutionnel',
    categoryEn: 'Institutional',
    accent: 'bg-green-600',
    tech: ['Astro', 'Tailwind CSS', 'Markdown'],
    highlights: [
      'SEO optimisé pour la visibilité',
      'Gestion simplifiée du contenu',
      'Module d\'archives historiques'
    ],
    highlightsEn: [
      'Blazing-fast light speed Astro builds',
      'Simplified Markdown content edits',
      'Historical archives and documentation'
    ]
  },
  {
    slug: 'jpeedsenegal',
    name: 'JPEED Sénégal',
    domain: 'jpeedsenegal.org',
    description: 'Site d\'organisation/ONG engagée au Sénégal.',
    descriptionEn: 'Institutional NGO platform promoting local development.',
    category: 'Institutionnel',
    categoryEn: 'Institutional',
    accent: 'bg-blue-600',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    highlights: [
      'Collecte de dons en ligne sécurisée',
      'Présentation des projets humanitaires',
      'Espace d\'adhésion pour les membres'
    ],
    highlightsEn: [
      'Fully secure online donations widgets',
      'Public showcase of active programs',
      'Member registration and signup portal'
    ]
  },
  {
    slug: 'eltigroup',
    name: 'Elti Group & ACEVOS',
    domain: 'eltigroup-eg.com',
    description: 'Portails d\'entreprises et structures professionnelles.',
    descriptionEn: 'Professional service corporate portal and resource hub.',
    category: 'Institutionnel',
    categoryEn: 'Institutional',
    accent: 'bg-slate-500',
    tech: ['Gatsby', 'GraphQL', 'Tailwind CSS'],
    highlights: [
      'Architecture hautement sécurisée',
      'Portails clients dédiés',
      'Multilingue intégré out-of-the-box'
    ],
    highlightsEn: [
      'Gatsby highly secure static infrastructure',
      'Dedicated user login folders',
      'Full localization and language toggles'
    ]
  },
  {
    slug: 'terangadrinks',
    name: 'Teranga Drinks',
    domain: 'terangadrinks.com',
    description: 'Boutique en ligne de boissons/produits locaux.',
    descriptionEn: 'Premium Local beverages global e-shop.',
    category: 'E-Commerce & Médias',
    categoryEn: 'E-Commerce & Media',
    accent: 'bg-amber-500',
    tech: ['Shopify', 'Liquid', 'Custom Tailwind Theme'],
    highlights: [
      'Panier client optimisé pour mobile',
      'Paiement wave et africain direct',
      'Gestion intelligente des livraisons'
    ],
    highlightsEn: [
      'Polished checkout flow for mobile devices',
      'Direct Wave / Mobile Money automation integration',
      'Smart Dakar express logistics dispatch plugin'
    ]
  },
  {
    slug: 'sensupply',
    name: 'Sen Supply Service',
    domain: 'sensupplyservice.com',
    description: 'Plateforme de services logistiques et de fourniture.',
    descriptionEn: 'Enterprise procurement and logistics orchestration platform.',
    category: 'E-Commerce & Médias',
    categoryEn: 'E-Commerce & Media',
    accent: 'bg-blue-400',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    highlights: [
      'Catalogue interactif complet de produits',
      'Demandes de devis en ligne',
      'Suivi de commande et factures'
    ],
    highlightsEn: [
      'Interactive service catalogue system',
      'Full online quote compiler',
      'Client tracking with secure invoice receipts'
    ]
  },
  {
    slug: 'sourceinfos',
    name: 'Source Infos',
    domain: 'sourceinfos.com',
    description: 'Portail média et site d\'actualités en ligne.',
    descriptionEn: 'Breaking news and regional media publishing portal.',
    category: 'E-Commerce & Médias',
    categoryEn: 'E-Commerce & Media',
    accent: 'bg-red-500',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
    highlights: [
      'Système d\'articles à forte charge',
      'Notifications push instantanées',
      'Panneau d\'administration éditorial intuitif'
    ],
    highlightsEn: [
      'High-traffic news articles caching optimization',
      'Direct push notification subscription',
      'Clean visual editing news dashboard'
    ]
  }
];

export default function Portfolio() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Parse project parameters from URL query string on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectSlug = params.get('project');
    if (projectSlug) {
      const found = projects.find(p => p.slug === projectSlug);
      if (found) {
        setSelectedProject(found);
      }
    }
  }, []);

  // Sync state back to standard browser history when opening/closing
  const selectProject = (project: typeof projects[0] | null) => {
    setSelectedProject(project);
    if (project) {
      const newUrl = `${window.location.origin}${window.location.pathname}?project=${project.slug}${window.location.hash}`;
      window.history.pushState({ project: project.slug }, '', newUrl);
    } else {
      const newUrl = `${window.location.origin}${window.location.pathname}${window.location.hash}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  // Back-Forward navigation sync
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const projectSlug = params.get('project');
      if (projectSlug) {
        const found = projects.find(p => p.slug === projectSlug);
        setSelectedProject(found || null);
      } else {
        setSelectedProject(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleShare = async (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?project=${slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch (err) {
      console.error('Failed to copy share link: ', err);
    }
  };

  const handleCycle = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.slug === selectedProject.slug);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= projects.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = projects.length - 1;
    selectProject(projects[nextIndex]);
  };

  const filteredProjects = projects.filter((project) => 
    activeCategory === 'Tous' || 
    project.category === activeCategory ||
    (activeCategory === 'SaaS & Écosystème' && project.category === 'SaaS & Écosystème') ||
    (activeCategory === 'E-Commerce & Médias' && project.category === 'E-Commerce & Médias')
  );

  return (
    <section 
      id="portfolio" 
      data-seo-title={isFr ? "Nos Réalisations | HardSoft Technologies" : "Our Projects Portfolio | HardSoft Technologies"} 
      data-seo-description={isFr ? "Découvrez nos projets : sites web, applications SaaS et plateformes développées pour nos clients." : "Discover our enterprise projects and premium custom SaaS ecosystems."} 
      className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800"
    >
      {/* Absolute Dynamic Metadata injection inside React Tree */}
      <AnimatePresence>
        {selectedProject && (
          <SEO
            title={`${selectedProject.name} | ${isFr ? 'Réalisation' : 'Case Study'} HardSoft Technologies`}
            description={isFr ? selectedProject.description : selectedProject.descriptionEn}
            url={`${window.location.origin}${window.location.pathname}?project=${selectedProject.slug}`}
            image={`https://picsum.photos/seed/${selectedProject.slug}/1200/630`}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full select-none">
            {isFr ? "PORTFOLIO" : "OUR WORK"}
          </span>
          <h2 className="font-display text-3xl md:text-5xl 2xl:text-6xl font-bold mb-4 tracking-tight mt-4 text-slate-900 dark:text-white">
            {isFr ? "Nos Réalisations" : "Our Realised Ventures"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg 2xl:text-xl">
            {isFr 
              ? "Découvrez nos propres solutions SaaS ainsi que les plateformes développées sur mesure pour nos clients."
              : "Discover our proprietary SaaS architectures and bespoke web, mobile & cloud solutions deployed globally."}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-650/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {isFr ? category : (category === 'Tous' ? 'All' : (category === 'SaaS & Écosystème' ? 'SaaS & Ecosystem' : (category === 'Institutionnel' ? 'Corporate & NGO' : 'E-Commerce & Media')))}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                onClick={() => selectProject(project)}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-48 sm:h-52 w-full border-b border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <LazyImage 
                    src={`https://picsum.photos/seed/${project.slug}/600/400`} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  {project.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-indigo-600 text-white shadow backdrop-blur rounded-full">
                        {isFr ? "Nouveau" : "New"}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                     <button
                       onClick={(e) => handleShare(e, project.slug)}
                       title={isFr ? "Copier le lien de partage social" : "Copy social share link"}
                       className="p-2 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 backdrop-blur shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
                     >
                       <Share2 size={13} />
                     </button>
                     <span className="text-[11px] font-bold px-2.5 py-1 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 backdrop-blur rounded-full shadow-sm max-w-[140px] truncate">
                        {isFr ? project.category : project.categoryEn}
                     </span>
                  </div>
                </div>
                
                <div className="p-6 2xl:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${project.accent} flex items-center justify-center text-white font-black text-lg select-none`}>
                           {project.name.charAt(0)}
                        </div>
                     </div>
                  </div>
                  
                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-405 transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 leading-relaxed">
                    {isFr ? project.description : project.descriptionEn}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 text-slate-500 dark:text-slate-400">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-bold self-center pl-1">+{project.tech.length - 3}</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs 2xl:text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-bold transition-colors">
                    <span className="underline group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                      {isFr ? "Inspecter le projet →" : "Inspect Case Study →"}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 text-[11px] font-semibold">{project.domain}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modern, Highly Custom Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm">
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh] sm:max-h-[85vh]"
            >
              {/* Top Control Bar */}
              <div className="absolute top-4 right-4 z-40 flex gap-2">
                <button
                  onClick={(e) => handleShare(e, selectedProject.slug)}
                  className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-white backdrop-blur transition-all active:scale-90 flex items-center justify-center cursor-pointer border border-white/10"
                  title={isFr ? "Copier le lien d'intégration social (Open Graph)" : "Copy shared social Open Graph meta-link"}
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => selectProject(null)}
                  className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-white backdrop-blur transition-all active:scale-90 flex items-center justify-center cursor-pointer border border-white/10"
                  aria-label={isFr ? "Fermer modal" : "Close case study modal"}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Area */}
              <div className="overflow-y-auto flex-1">
                {/* Hero Showcase Frame */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <LazyImage
                    src={`https://picsum.photos/seed/${selectedProject.slug}/1200/630`}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-905 via-slate-900/30 to-transparent pointer-events-none" />
                  
                  {/* Title Floating Area */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-600 text-white rounded-full inline-block mb-3 shadow">
                      {isFr ? selectedProject.category : selectedProject.categoryEn}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                      {selectedProject.name}
                    </h1>
                  </div>
                </div>

                {/* Body Details Split */}
                <div className="p-6 sm:p-10 grid md:grid-cols-12 gap-8 text-left">
                  {/* Left Column Description */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                        {isFr ? "Description du Projet" : "Project Summary"}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-350 text-sm sm:text-base leading-relaxed">
                        {isFr ? selectedProject.description : selectedProject.descriptionEn}
                      </p>
                    </div>

                    {/* Features checklist Highlights */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-450 flex items-center gap-1.5">
                        <Sparkles size={14} />
                        <span>{isFr ? "Fonctionnalités Clés & Intégrations" : "Key Outcomes & Components"}</span>
                      </h4>
                      <ul className="grid gap-2.5">
                        {(isFr ? selectedProject.highlights : selectedProject.highlightsEn).map((hl, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold text-[9px]">
                              ✓
                            </span>
                            <span className="leading-snug">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column Specs */}
                  <div className="md:col-span-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl space-y-6">
                    {/* Technology badge tags stack */}
                    <div>
                      <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                        <Cpu size={14} />
                        <span>{isFr ? "Technologies Deploiées" : "Deployed Tech Stack"}</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 font-mono font-bold rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/85 text-slate-700 dark:text-slate-300 shadow-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <hr className="border-slate-200/60 dark:border-slate-800" />

                    {/* Delivery metadata facts */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold block mb-0.5">{isFr ? "Auteur & Deploiement" : "Architect & Deploy"}</span>
                        <span className="dark:text-white font-bold block truncate">HardSoft Technologies</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block mb-0.5">{isFr ? "Garantie" : "Warrant SLA"}</span>
                        <span className="text-emerald-500 font-extrabold flex items-center gap-1">
                          <Shield size={12} />
                          <span>12 Mois</span>
                        </span>
                      </div>
                    </div>

                    {/* Go-to External Site Area */}
                    <div className="pt-2">
                      <a
                        href={`https://${selectedProject.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-indigo-650/20 text-sm cursor-pointer"
                      >
                        <span>{selectedProject.domain}</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Carousel Toolbar / Quick switch */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between pointer-events-auto">
                <button
                  onClick={() => handleCycle('prev')}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer text-xs font-bold"
                >
                  <ArrowLeft size={16} />
                  <span>{isFr ? "Précédent" : "Previous"}</span>
                </button>
                
                {copySuccess ? (
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1 select-none animate-pulse">
                    <Check size={12} />
                    <span>{isFr ? "Lien de partage copié !" : "Share link copied!"}</span>
                  </span>
                ) : (
                  <span className="text-[10px] hidden sm:inline-block text-slate-400 font-medium select-none text-center">
                    {isFr 
                      ? "Partagez ce projet : hardsoft-technologies.net/?project=" + selectedProject.slug 
                      : "Share link: hardsoft-technologies.net/?project=" + selectedProject.slug}
                  </span>
                )}

                <button
                  onClick={() => handleCycle('next')}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer text-xs font-bold"
                >
                  <span>{isFr ? "Suivant" : "Next"}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Share Copied Notification */}
      <AnimatePresence>
        {copySuccess && !selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-50 bg-indigo-650 text-white px-5 py-3 rounded-xl border border-indigo-505 shadow-2xl flex items-center gap-2 text-xs font-semibold select-none"
          >
            <Check size={14} className="text-emerald-400" />
            <span>
              {isFr ? "Lien Open Graph copié dans le presse-papier !" : "Dynamic share link copied successfully!"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
