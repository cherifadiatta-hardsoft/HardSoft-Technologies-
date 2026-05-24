import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import LazyImage from './LazyImage';

const categories = ['Tous', 'SaaS & Écosystème', 'Institutionnel', 'E-Commerce & Médias'];

const projects = [
  {
    name: 'Pharma24',
    domain: 'pharma24.net',
    description: 'Plateforme connectée et répertoire des pharmacies du Sénégal.',
    category: 'SaaS & Écosystème',
    accent: 'bg-emerald-500',
    isNew: true,
  },
  {
    name: 'Teeru',
    domain: 'teeru-sn.com',
    description: 'Plateforme de services à la demande.',
    category: 'SaaS & Écosystème',
    accent: 'bg-blue-500',
    isNew: true,
  },
  {
    name: 'HardSoft Smart Display',
    domain: 'digitalsignage.hardsoft-technologies.net',
    description: 'Solution de signalisation numérique d\'entreprise.',
    category: 'SaaS & Écosystème',
    accent: 'bg-indigo-500',
    isNew: true,
  },
  {
    name: 'ALGS',
    domain: 'algs.hardsoft-technologies.net',
    description: 'Application et solution logistique de livraison.',
    category: 'SaaS & Écosystème',
    accent: 'bg-orange-500',
  },
  {
    name: 'JikJikoox',
    domain: 'jikjikoox.com',
    description: 'Plateforme e-commerce / Marketplace.',
    category: 'SaaS & Écosystème',
    accent: 'bg-violet-500',
  },
  {
    name: 'Source Devise Sénégal',
    domain: 'sourcedeviesenegal.com',
    description: 'Plateforme financière/change.',
    category: 'Institutionnel',
    accent: 'bg-teal-500',
  },
  {
    name: 'Emsarts & Fegomus',
    domain: 'emsarts.com',
    description: 'Vitrines artistiques, événementielles ou d\'agences.',
    category: 'Institutionnel',
    accent: 'bg-rose-500',
  },
  {
    name: 'Birkama Balante',
    domain: 'birkamabalante.com',
    description: 'Site institutionnel ou communautaire.',
    category: 'Institutionnel',
    accent: 'bg-green-600',
  },
  {
    name: 'JPEED Sénégal',
    domain: 'jpeedsenegal.org',
    description: 'Site d\'organisation/ONG engagée au Sénégal.',
    category: 'Institutionnel',
    accent: 'bg-blue-600',
  },
  {
    name: 'Elti Group & ACEVOS',
    domain: 'eltigroup-eg.com',
    description: 'Portails d\'entreprises et structures professionnelles.',
    category: 'Institutionnel',
    accent: 'bg-slate-500',
  },
  {
    name: 'Teranga Drinks',
    domain: 'terangadrinks.com',
    description: 'Boutique en ligne de boissons/produits locaux.',
    category: 'E-Commerce & Médias',
    accent: 'bg-amber-500',
  },
  {
    name: 'Sen Supply Service',
    domain: 'sensupplyservice.com',
    description: 'Plateforme de services logistiques et de fourniture.',
    category: 'E-Commerce & Médias',
    accent: 'bg-blue-400',
  },
  {
    name: 'Source Infos',
    domain: 'sourceinfos.com',
    description: 'Portail média et site d\'actualités en ligne.',
    category: 'E-Commerce & Médias',
    accent: 'bg-red-500',
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filteredProjects = projects.filter((project) => 
    activeCategory === 'Tous' || project.category === activeCategory
  );

  return (
    <section 
      id="portfolio" 
      data-seo-title="Nos Réalisations | HardSoft Technologies" 
      data-seo-description="Découvrez nos projets : sites web, applications SaaS et plateformes développées pour nos clients." 
      className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Réalisations</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Découvrez nos propres solutions SaaS ainsi que les plateformes développées pour nos clients.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-indigo-600 text-slate-900 dark:text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:bg-slate-700 hover:text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.domain}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-colors flex flex-col"
              >
                <div className="relative h-48 w-full border-b border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <LazyImage 
                    src={`https://picsum.photos/seed/${project.domain}/600/400`} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  {(project as any).isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-indigo-600 text-white shadow backdrop-blur rounded-full">
                        Nouveau
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                     <span className="text-xs font-medium px-2.5 py-1 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 backdrop-blur rounded-full shadow-sm">
                        {project.category}
                     </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-lg ${project.accent} flex items-center justify-center text-slate-900 dark:text-white font-bold text-lg`}>
                          {project.name.charAt(0)}
                       </div>
                     </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{project.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">{project.description}</p>
                  
                  <a 
                    href={`https://${project.domain}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    <span>{project.domain}</span>
                    <ExternalLink size={14} className="group-hover:-mt-1 group-hover:ml-1 transition-all" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
