import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Services', href: '#services' },
    { name: 'Logiciel POS', href: '#pos' },
    { name: 'Formations', href: '#formations' },
    { name: 'Réalisations', href: '#portfolio' },
    { name: 'À Propos', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#accueil" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
            <Code2 size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            HardSoft <span className="text-indigo-400">Tech</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="px-5 py-2.5 bg-white text-slate-950 text-sm font-semibold rounded-full hover:bg-indigo-50 transition-colors"
          >
            Demander un devis
          </a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 shadow-xl md:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-300 hover:text-white py-2"
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
