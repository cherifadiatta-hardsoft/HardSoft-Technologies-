import { useState, useEffect } from 'react';
import { Menu, X, Code2, Moon, Sun, Search, Languages, WifiOff, Home, Cpu, Store, GraduationCap, Briefcase, User, HelpCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';
import { useSectionObserver } from '../hooks/useSectionObserver';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { name: t('nav.accueil'), href: '#accueil', icon: Home },
    { name: t('nav.services'), href: '#services', icon: Cpu },
    { name: t('nav.pos'), href: '#pos', icon: Store },
    { name: t('nav.formations'), href: '#formations', icon: GraduationCap },
    { name: t('nav.portfolio'), href: '#portfolio', icon: Briefcase },
    { name: t('nav.apropos'), href: '#about', icon: User },
    { name: t('nav.faq'), href: '#faq', icon: HelpCircle },
    { name: t('nav.contact'), href: '#contact', icon: Phone },
  ];

  useEffect(() => {
    if (activeSection) {
      const idx = navLinks.findIndex(link => link.href === `#${activeSection.id}`);
      if (idx !== -1) {
        setActiveIdx(idx);
      }
    } else if (typeof window !== 'undefined') {
      const currentHash = window.location.hash;
      const idx = navLinks.findIndex(link => link.href === currentHash);
      if (idx !== -1) {
        setActiveIdx(idx);
      }
    }
  }, [activeSection]);

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

        {/* Desktop Primary Nav: Magical Liquid Tab Bar */}
        <nav className="hidden xl:flex items-center relative py-2">
          <div className="relative bg-slate-100/90 dark:bg-slate-900/95 border border-slate-200/50 dark:border-slate-800/80 rounded-full flex items-center justify-center shadow-lg h-[56px] w-[576px] px-2 transition-all duration-300">
            <ul className="relative flex items-center justify-between w-full h-full">
              {navLinks.map((link, idx) => {
                const isActive = idx === activeIdx;
                const IconComponent = link.icon;
                const isContact = link.href === '#contact';
                return (
                  <li key={link.name} className="relative z-10 flex-1 h-full flex items-center justify-center">
                    <a
                      href={link.href}
                      onClick={() => setActiveIdx(idx)}
                      className="relative flex flex-col items-center justify-center w-full h-full text-center text-decoration-none group cursor-pointer"
                    >
                      {/* Active raised icon or inactive centered icon */}
                      <span className={`absolute flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.25,1.15,0.45,1.02)] ${
                        isActive 
                          ? 'text-white -translate-y-[26px] scale-110 z-20' 
                          : isContact
                            ? 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 translate-y-0 scale-100 font-extrabold'
                            : 'text-slate-650 dark:text-slate-350 hover:text-indigo-600 dark:hover:text-indigo-400 translate-y-0 scale-100'
                      }`}>
                        {isContact && !isActive && (
                          <span className="absolute -inset-2 rounded-full bg-indigo-500/15 dark:bg-indigo-400/10 animate-pulse border border-indigo-500/30 dark:border-indigo-400/20" />
                        )}
                        <IconComponent size={isActive ? 18 : 16} />
                      </span>
                      
                      {/* Slid-up navigation item title */}
                      <span className={`absolute text-[8.5px] font-extrabold uppercase tracking-widest transition-all duration-500 font-sans ${
                        isActive 
                          ? 'opacity-100 translate-y-[14px] text-indigo-600 dark:text-indigo-400 font-extrabold' 
                          : isContact
                            ? 'opacity-90 translate-y-[18px] text-indigo-600 dark:text-indigo-400 text-[7px] font-extrabold'
                            : 'opacity-0 translate-y-[24px] text-transparent'
                      }`}>
                        {link.name}
                      </span>
                    </a>
                  </li>
                );
              })}
              
              {/* Dynamic Fluid Liquid Background Circle */}
              <div 
                className="absolute top-[-21px] w-[46px] h-[46px] rounded-full border-[4px] border-white dark:border-slate-950 transition-all duration-500 ease-[cubic-bezier(0.25,1.15,0.45,1.02)] shadow-lg bg-gradient-to-tr from-indigo-600 to-indigo-505 dark:from-indigo-500 dark:to-cyan-400"
                style={{
                  left: `calc((${activeIdx} * (100% / 8)) + ((100% / 8 - 46px) / 2))`,
                }}
              />
            </ul>
          </div>
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
            className="relative ml-2 flex items-center gap-1.5 px-4.5 py-1.5 bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-500 dark:to-cyan-400 text-white text-xs font-bold rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(79,70,229,0.25)] hover:shadow-[0_0_18px_rgba(79,70,229,0.5)] hover:scale-105 active:scale-98 whitespace-nowrap group"
          >
            {/* Pulsating back ring wave for immediate visual notice */}
            <span className="absolute inset-0 rounded-full border border-indigo-500/55 dark:border-indigo-400/55 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60 pointer-events-none" />
            
            <Phone size={13} className="animate-wiggle group-hover:rotate-12 transition-transform" />
            <span>{t('nav.contact')}</span>
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
