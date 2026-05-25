import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function FAQ() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const faqs = [
    {
      category: isFr ? "Services" : "Services",
      question: isFr 
        ? "Quels types de solutions logicielles développez-vous ?" 
        : "What types of software solutions do you develop?",
      answer: isFr 
        ? "Nous concevons des sites web vitrines, des plateformes e-commerce, des applications web complexes (SaaS), des applications mobiles (iOS et Android) ainsi que des logiciels de point de vente (POS) personnalisés. Nous avons également des compétences en automatisation avec n8n."
        : "We design premium showcase websites, e-commerce storefronts, SaaS applications, cross-platform mobile apps (iOS & Android) and tailored POS software ecosystems. We also specialize in n8n process automations."
    },
    {
      category: isFr ? "Tarifs" : "Pricing",
      question: isFr 
        ? "Comment déterminez-vous le prix d'un projet ?" 
        : "How do you determine a project's price?",
      answer: isFr 
        ? "La tarification dépend de la complexité du projet, des fonctionnalités requises et du temps de développement estimé. Nous privilégions une approche transparente : après un premier échange pour comprendre vos besoins, nous vous fournissons un devis détaillé, personnalisé et gratuit."
        : "Pricing is based on requirements, complexity levels and development timeline. We deliver transparent, tailored estimates following a client consultation to draft a precise and structured milestone roadmap."
    },
    {
      category: isFr ? "Processus" : "Process",
      question: isFr 
        ? "Quelle est votre méthodologie de développement ?" 
        : "What is your default development methodology?",
      answer: isFr 
        ? "Nous utilisons des méthodes agiles pour garantir une flexibilité et une excellente qualité technique. Le processus inclut : l'analyse des besoins, la conception graphique (maquettes UI/UX), le développement itératif (avec des points réguliers), les tests poussés, et enfin le déploiement de la solution."
        : "We leverage agile methods to guarantee seamless iteration and supreme technical quality. This process spans requirements analysis, refined designs (UI/UX maquettes), continuous delivery, automated testing, and secure launches."
    },
    {
      category: isFr ? "Processus" : "Process",
      question: isFr 
        ? "Combien de temps faut-il pour créer une application ?" 
        : "How much time does it take to build an application?",
      answer: isFr 
        ? "Un site vitrine peut être finalisé entre 2 et 4 semaines, tandis qu'une application sur mesure ou un SaaS complexe demande généralement de 2 à 6 mois selon sa complexité. Nos solutions \"No-Code / Low-Code\" peuvent permettre des lancements express en quelques jours ou semaines."
        : "A showcase portal takes 2-4 weeks. Extensive SaaS or custom systems generally require 2-6 months depending on architecture. Our low-code setups support express launches within days."
    },
    {
      category: isFr ? "Support" : "Support",
      question: isFr 
        ? "Proposez-vous un support et une maintenance après le lancement ?" 
        : "Do you offer post-launch support and application maintenance?",
      answer: isFr 
        ? "Absolument. Nous proposons différents forfaits de maintenance pour garantir que votre application reste sécurisée, fonctionne correctement avec de bonnes performances et s'enrichisse de nouvelles fonctionnalités sur le long terme."
        : "Absolutely. We offer specialized support packs to verify security patches, performance optimization runs, and seamless long-term feature releases."
    }
  ];

  const defaultCategory = isFr ? "Toutes" : "All";
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const categories = isFr 
    ? ["Toutes", "Services", "Tarifs", "Processus", "Support"]
    : ["All", "Services", "Pricing", "Process", "Support"];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = false;
    if (selectedCategory === 'Toutes' || selectedCategory === 'All') {
      matchesCategory = true;
    } else {
      // Map cross-language matches
      if (selectedCategory === 'Tarifs' || selectedCategory === 'Pricing') {
        matchesCategory = faq.category === 'Tarifs' || faq.category === 'Pricing';
      } else if (selectedCategory === 'Processus' || selectedCategory === 'Process') {
        matchesCategory = faq.category === 'Processus' || faq.category === 'Process';
      } else {
        matchesCategory = faq.category === selectedCategory;
      }
    }
    return matchesSearch && matchesCategory;
  });

  return (
    <section 
      id="faq" 
      data-seo-title={isFr ? "Foire Aux Questions | HardSoft Technologies" : "Frequently Asked Questions | HardSoft Technologies"} 
      data-seo-description={isFr ? "Trouvez des réponses concernant nos tarifs, processus de développement et méthodes de travail." : "Find answers regarding our custom development rates, agile workflows, and support channels."} 
      className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 relative z-10"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isFr ? "Foire Aux Questions" : "Frequently Asked Questions"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {isFr 
              ? "Trouvez les réponses à vos questions concernant nos services, nos tarifs et notre méthodologie."
              : "Find premium technical answers covering our agile methods, custom pricing, and workflow structures."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => {
              const isActive = selectedCategory === category ||
                ((category === 'Toutes' || category === 'All') && (selectedCategory === 'Toutes' || selectedCategory === 'All')) ||
                ((category === 'Tarifs' || category === 'Pricing') && (selectedCategory === 'Tarifs' || selectedCategory === 'Pricing')) ||
                ((category === 'Processus' || category === 'Process') && (selectedCategory === 'Processus' || selectedCategory === 'Process')) ||
                ((category === 'Support' || category === 'Support') && (selectedCategory === 'Support' || selectedCategory === 'Support')) ||
                ((category === 'Services' || category === 'Services') && (selectedCategory === 'Services' || selectedCategory === 'Services'));

              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setOpenIndex(null);
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-slate-100 dark:text-white shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-500 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-900 dark:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative max-w-xl mx-auto text-left">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-slate-500 dark:text-slate-400" />
            </div>
            <input
              type="text"
              placeholder={isFr ? "Rechercher une question..." : "Search a question..."}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={isFr ? "Rechercher dans la FAQ" : "Search in FAQ"}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden transition-colors hover:border-slate-300 dark:border-slate-700"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl transition-colors cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-lg text-slate-800 dark:text-slate-200">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-indigo-400 transition-transform duration-300 shrink-0 ml-4 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-6 bg-slate-50 dark:bg-slate-900/45 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl"
            >
              <div className="text-4xl mb-4 select-none">🔍</div>
              <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-2">
                {isFr ? "Aucune question ne correspond à votre recherche" : "No questions match your current search terms"}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                {isFr 
                  ? <>Nous n'avons trouvé aucun résultat pour « <strong className="text-indigo-500">{searchQuery}</strong> » dans la catégorie « <strong className="text-indigo-500">{selectedCategory}</strong> ». Essayez d'utiliser des termes différents ou de réinitialiser la recherche.</>
                  : <>We could not locate any technical results for “<strong className="text-indigo-500">{searchQuery}</strong>” inside the filter “<strong className="text-indigo-500">{selectedCategory}</strong>”. Try different terms or reset search filters.</>}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {(searchQuery || (selectedCategory !== 'Toutes' && selectedCategory !== 'All')) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(isFr ? 'Toutes' : 'All');
                    }}
                    className="px-5 py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl text-xs transition-all border border-indigo-200 dark:border-indigo-900/40 cursor-pointer active:scale-95"
                  >
                    {isFr ? "Réinitialiser les filtres" : "Reset Filters"}
                  </button>
                )}
                <a
                  href="#contact"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  {isFr ? "Nous poser votre question" : "Ask Us Directly"}
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
