import { useState, useEffect } from 'react';
import { Menu, X, Code2, Moon, Sun, Search, Languages, WifiOff } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

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

  const navLinks = [
    { name: t('nav.accueil'), href: '#accueil' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.pos'), href: '#pos' },
    { name: t('nav.formations'), href: '#formations' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.apropos'), href: '#about' },
    { name: t('nav.faq'), href: '#faq' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const filteredLinks = searchQuery ? navLinks.filter(link => link.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-slate-950/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      {/* Offline Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-500 text-white overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-2 text-sm font-medium">
              <WifiOff size={16} />
              <span>{t('network.offline')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-md">
            <Code2 size={18} className="sm:size-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
              HardSoft
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 leading-none mt-0.5 sm:mt-1">
              Technologies
            </span>
          </div>
        </a>

        {/* Desktop Primary Nav */}
        <nav className="hidden xl:flex items-center">
          <ul className="flex items-center gap-5 2xl:gap-7">
            {navLinks.map((link) => (
               <li key={link.name}>
                 <a
                   href={link.href}
                   className="text-[13px] font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap"
                 >
                   {link.name}
                 </a>
               </li>
            ))}
          </ul>
        </nav>

        {/* Utilities & Search (Desktop) */}
        <div className="hidden xl:flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center">
              <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 2xl:w-44 pl-8 pr-3 py-1.5 bg-slate-100/80 dark:bg-slate-800/80 border border-transparent rounded-full text-xs focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>
            
            {searchQuery && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 py-2 flex flex-col z-50">
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

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center p-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Changer de langue"
            title={language === 'fr' ? 'Passer en anglais' : 'Switch to French'}
          >
            <Languages size={16} />
            <span className="ml-1 text-[10px] font-bold uppercase">{language}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-1.5 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Basculer le thème"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#contact"
            className="ml-2 px-4 py-1.5 bg-indigo-600 text-white dark:bg-white dark:text-slate-950 text-xs font-semibold rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-50 transition-colors whitespace-nowrap shadow-sm hover:shadow-md"
          >
            {language === 'fr' ? 'Devis' : 'Quote'}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex xl:hidden items-center gap-4">
          <div className="flex xl:hidden items-center gap-1 sm:gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2 sm:px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[10px] sm:text-xs uppercase hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Languages size={14} />
              <span>{language}</span>
            </button>
          </div>
          
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
              
              {/* Mobile Utilities (Lang & Theme) */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={toggleLanguage}
                  className="px-4 py-2 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-bold text-sm uppercase transition-colors flex items-center gap-2"
                  aria-label="Changer de langue"
                >
                  <Languages size={18} />
                  {language === 'fr' ? 'Français' : 'English'}
                </button>

                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  aria-label="Basculer le thème"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
                {searchQuery && (
                  <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 flex flex-col z-50 overflow-hidden">
                    {filteredLinks.length > 0 ? (
                      filteredLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={() => {
                            setSearchQuery('');
                            setMobileMenuOpen(false);
                          }}
                          className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-0"
                        >
                          {link.name}
                        </a>
                      ))
                    ) : (
                      <span className="px-4 py-3 text-sm text-slate-500">{t('search.no_results')}</span>
                    )}
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-4 px-6 py-3 bg-indigo-600 text-white text-center font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {language === 'fr' ? 'Demander un devis' : 'Get a free quote'}
              </a>
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
