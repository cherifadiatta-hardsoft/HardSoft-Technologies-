import { useState, useEffect } from 'react';
import { Menu, X, Code2, Moon, Sun, Search, Languages, WifiOff, Home, Cpu, Store, GraduationCap, Briefcase, User, HelpCircle, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';
import { useSectionObserver } from '../hooks/useSectionObserver';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secondaryMenuOpen, setSecondaryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const activeSection = useSectionObserver();
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const mainNavLinks = [
    { name: t('nav.services'), href: '#services', icon: Cpu },
    { name: t('nav.pos'), href: '#pos', icon: Store },
    { name: t('nav.formations'), href: '#formations', icon: GraduationCap },
    { name: t('nav.portfolio'), href: '#portfolio', icon: Briefcase },
  ];

  const secondaryNavLinks = [
    { name: t('nav.apropos'), href: '#about', icon: User },
    { name: t('nav.faq'), href: '#faq', icon: HelpCircle },
  ];

  const allLinks = [...mainNavLinks, ...secondaryNavLinks, { name: t('nav.contact'), href: '#contact', icon: Phone }];

  useEffect(() => {
    if (activeSection) {
      const idx = mainNavLinks.findIndex(link => link.href === `#${activeSection.id}`);
      if (idx !== -1) setActiveIdx(idx);
    } else if (typeof window !== 'undefined') {
      const currentHash = window.location.hash;
      const idx = mainNavLinks.findIndex(link => link.href === currentHash);
      if (idx !== -1) setActiveIdx(idx);
    }
  }, [activeSection, mainNavLinks]);

  const filteredLinks = searchQuery ? allLinks.filter(link => link.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4`}
    >
      {/* Offline Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-red-500 text-white overflow-hidden shadow-md rounded-t-lg mt-2 max-w-5xl mx-auto"
          >
            <div className="px-6 py-1.5 flex items-center justify-center gap-2 text-sm font-medium">
              <WifiOff size={16} />
              <span>{t('network.offline')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`max-w-[1400px] mx-auto w-full px-4 sm:px-6 flex items-center justify-between transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-slate-200/60 dark:border-slate-800/80 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] ${isScrolled ? 'h-[64px] mt-2 lg:mt-3' : 'h-[72px] mt-4 lg:mt-6'}`}>
        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-2 sm:gap-3 group shrink-0 ml-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-md">
            <Code2 size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
              HardSoft
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 leading-none mt-1">
              Technologies
            </span>
          </div>
        </a>

        {/* Desktop Primary Nav: Dynamic Clean Links */}
        <nav className="hidden xl:flex items-center relative py-2 mx-4 flex-1 justify-center">
          <div className="relative flex items-center justify-center h-full">
            <ul className="relative flex items-center w-full h-full p-1 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-full">
              {mainNavLinks.map((link, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <li key={link.name} className="relative z-10 px-1.5 sm:px-3">
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-white dark:bg-slate-700 shadow-sm rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <a
                      href={link.href}
                      onClick={() => setActiveIdx(idx)}
                      className="relative z-20 px-1 py-1.5 flex items-center justify-center w-full h-full text-center group cursor-pointer transition-colors"
                    >
                      <span className={`whitespace-nowrap font-sans uppercase tracking-wider transition-all duration-300 ${
                        isActive 
                          ? 'text-indigo-600 dark:text-indigo-400 text-[11px] font-black' 
                          : 'text-slate-500 dark:text-slate-400 text-[10px] sm:text-[11px] font-bold group-hover:text-slate-900 dark:group-hover:text-slate-100'
                      }`}>
                        {link.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Utilities & Search (Desktop) */}
        <div className="hidden xl:flex items-center justify-end gap-3 shrink-0 mr-1">
          {/* Secondary Links */}
          <div className="hidden xl:flex items-center gap-1 mr-2">
            {secondaryNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden xl:block w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
          <div className="relative">
            <div className="flex items-center">
              <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 lg:w-44 pl-8 pr-3 py-1.5 bg-slate-100/80 dark:bg-slate-800/80 border border-transparent rounded-full text-xs focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>
            
            {searchQuery && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 py-2 flex flex-col z-50">
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {link.name}
                    </a>
                  ))
                ) : (
                  <span className="px-4 py-2 text-xs text-slate-500">{t('search.no_results')}</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center bg-slate-100/50 dark:bg-slate-800/50 rounded-full border border-slate-200/50 dark:border-slate-700/50 p-1">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => language !== 'fr' && toggleLanguage()}
                className={`flex items-center justify-center px-2 py-1 rounded-full text-[10px] font-bold transition-all ${language === 'fr' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                title="Français"
              >
                FR
              </button>
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`flex items-center justify-center px-2 py-1 rounded-full text-[10px] font-bold transition-all ${language === 'en' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
                title="English"
              >
                EN
              </button>
            </div>

            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              aria-label="Basculer le thème"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
          
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-800 dark:border-slate-200 hover:bg-slate-800 dark:hover:bg-slate-100 text-[11px] font-bold rounded-full transition-transform hover:scale-105 active:scale-95 group shrink-0 shadow-sm"
          >
            <Phone size={12} className="group-hover:rotate-12 transition-transform" />
            <span>{t('nav.contact')}</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex xl:hidden items-center gap-4">
          <button
            className="p-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>



      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col p-6 gap-2">
              
              {mainNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 py-3 px-4 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              {/* Accordion for Secondary Links */}
              <div className="flex flex-col rounded-xl overflow-hidden mt-1">
                <button
                  onClick={() => setSecondaryMenuOpen(!secondaryMenuOpen)}
                  className="flex items-center justify-between text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 py-3 px-4 rounded-xl transition-all"
                >
                  <span>{t('nav.plus') || 'Plus'}</span>
                  <ChevronDown size={20} className={`transition-transform duration-300 ${secondaryMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {secondaryMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-slate-100/50 dark:bg-slate-800/30 rounded-b-xl px-2"
                    >
                      <div className="flex flex-col py-2 gap-1">
                         {secondaryNavLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 py-2.5 px-4 rounded-lg transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.name}
                          </a>
                        ))}
                        <a
                           href="#contact"
                           className="text-base font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 py-2.5 px-4 rounded-lg transition-all"
                           onClick={() => setMobileMenuOpen(false)}
                        >
                           {t('nav.contact')}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ergonomic Bottom Utilities Menu (Mobile) */}
              <div className="mt-4 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
                
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t('search.placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-2xl text-base focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#0f172a] text-slate-900 dark:text-white transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <div className="absolute bottom-full mb-2 w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-2 flex flex-col z-50 overflow-hidden">
                      {filteredLinks.length > 0 ? (
                        filteredLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.href}
                            onClick={() => {
                              setSearchQuery('');
                              setMobileMenuOpen(false);
                            }}
                            className="px-5 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-0"
                          >
                            {link.name}
                          </a>
                        ))
                      ) : (
                        <span className="px-5 py-3 text-sm text-slate-500">{t('search.no_results')}</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center space-x-1 bg-white dark:bg-slate-700 p-1 rounded-full shadow-sm">
                      <button
                        onClick={() => language !== 'fr' && toggleLanguage()}
                        className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase transition-all ${language === 'fr' ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                      >
                        Français
                      </button>
                      <button
                        onClick={() => language !== 'en' && toggleLanguage()}
                        className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase transition-all ${language === 'en' ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                      >
                        English
                      </button>
                    </div>

                    <button
                      onClick={toggleTheme}
                      className="p-2.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500 hover:scale-105 transition-all text-slate-700 dark:text-slate-300"
                      aria-label="Basculer le thème"
                    >
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="mt-2 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black tracking-wide rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone size={18} className="animate-wiggle" />
                  {language === 'fr' ? 'Demander un devis' : 'Get a free quote'}
                </a>

              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 origin-left"
        style={{ scaleX }}
      />
    </header>
  );
}
