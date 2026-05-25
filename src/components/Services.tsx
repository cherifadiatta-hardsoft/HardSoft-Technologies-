import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Globe, Workflow, Mail, MapPin, MessageCircle, Check } from 'lucide-react';
import { WHATSAPP_URL } from '../config';

const categories = ['Tous', 'Développement', 'Automatisation', 'Design & Identité', 'Marketing & Visibilité'];

const services = [
  {
    icon: <Code size={32} className="text-indigo-400" />,
    title: 'Développement de Logiciels sur Mesure',
    description: 'Des solutions uniques adaptées aux besoins spécifiques de votre entreprise pour optimiser votre gestion.',
    category: 'Développement',
  },
  {
    icon: <Globe size={32} className="text-violet-400" />,
    title: 'Sites Web & Applications Mobiles',
    description: 'Des plateformes performantes, sécurisées et adaptées à tous les écrans (iOS, Android, Web).',
    category: 'Développement',
  },
  {
    icon: <Workflow size={32} className="text-emerald-400" />,
    title: 'Automatisation de Processus (n8n)',
    description: 'Gagnez du temps et de l\'efficacité en connectant vos outils et en automatisant vos tâches répétitives.',
    category: 'Automatisation',
  },
  {
    icon: <Mail size={32} className="text-blue-400" />,
    title: 'Identité Professionnelle & Design',
    description: 'Configuration d\'e-mails professionnels avec votre propre nom de domaine et conception d\'identités visuelles percutantes.',
    category: 'Design & Identité',
  },
  {
    icon: <MapPin size={32} className="text-red-400" />,
    title: 'Visibilité Locale & SEO',
    description: 'Configuration et optimisation de votre fiche Google My Business pour attirer des clients locaux.',
    category: 'Marketing & Visibilité',
  },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filteredServices = activeCategory === 'Tous'
    ? services
    : services.filter(service => service.category === activeCategory);

  return (
    <section 
      id="services" 
      data-seo-title="Nos Services | HardSoft Technologies" 
      data-seo-description="Développement sur-mesure, automatisation n8n, création de sites web et applications mobiles." 
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-5xl 2xl:text-6xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Ce que nous faisons</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg 2xl:text-xl">
            Un accompagnement complet pour digitaliser, automatiser et propulser votre activité.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-4xl mx-auto px-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/15 scale-105'
                    : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && <Check size={14} className="shrink-0" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid with Animation */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                layout
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 2xl:p-10 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-300 shadow-sm hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 2xl:w-18 2xl:h-18 rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border select-none ${
                      service.category === 'Développement'
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30'
                        : service.category === 'Automatisation'
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                        : service.category === 'Design & Identité'
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30'
                        : 'bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30'
                    }`}>
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl 2xl:text-2xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm 2xl:text-base">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
            <a
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 2xl:px-10 2xl:py-5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-full transition-colors shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transform hover:-translate-y-0.5 text-sm sm:text-base max-w-full"
            >
              <MessageCircle size={20} className="shrink-0" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">Demander un devis sur WhatsApp</span>
            </a>
        </div>
      </div>
    </section>
  );
}
