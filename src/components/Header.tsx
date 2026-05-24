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
    { name: 'Accueil', href: '#accueil' },
    { name: t('nav.services'), href: '#services' },
    { name: 'Logiciel POS', href: '#pos' },
    { name: t('nav.formations'), href: '#formations' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.apropos'), href: '#about' },
    { name: 'FAQ', href: '#faq' },
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Row / Primary Nav */}
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-3' : 'pt-5 pb-3'}`}>
          <a href="#accueil" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-slate-900 dark:text-white group-hover:scale-105 transition-transform">
              <Code2 size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              HardSoft <span className="text-indigo-400">Tech</span>
            </span>
          </a>

          {/* Desktop Primary Nav */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                 <li key={link.name}>
                   <a
                     href={link.href}
                     className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white transition-colors whitespace-nowrap"
                   >
                     {link.name}
                   </a>
                 </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle (Only Mobile) */}
          <div className="flex lg:hidden items-center">
            <button
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Secondary Row / Utilities (Bottom) */}
        <div className={`hidden lg:flex items-center justify-end gap-3 xl:gap-4 transition-all duration-300 ${isScrolled ? 'pb-3' : 'pb-4'}`}>
          <div className="relative">
            <div className="flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-64 pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white outline-none transition-all"
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
                      className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {link.name}
                    </a>
                  ))
                ) : (
                  <span className="px-4 py-2 text-sm text-slate-500">{t('search.no_results')}</span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors flex items-center gap-1.5"
            aria-label="Changer de langue"
          >
            <Languages size={14} />
            <span>{language}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            aria-label="Basculer le thème"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#contact"
            className="px-5 py-2 bg-indigo-600 text-white dark:bg-white dark:text-slate-950 text-sm font-semibold rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-50 transition-colors whitespace-nowrap shadow-sm hover:shadow-md ml-2"
          >
            Demander un devis
          </a>
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
                Demander un devis
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
