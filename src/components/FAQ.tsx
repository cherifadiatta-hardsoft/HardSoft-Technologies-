import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search } from 'lucide-react';

const faqs = [
  {
    category: "Services",
    question: "Quels types de solutions logicielles développez-vous ?",
    answer: "Nous concevons des sites web vitrines, des plateformes e-commerce, des applications web complexes (SaaS), des applications mobiles (iOS et Android) ainsi que des logiciels de point de vente (POS) personnalisés. Nous avons également des compétences en automatisation avec n8n."
  },
  {
    category: "Tarifs",
    question: "Comment déterminez-vous le prix d'un projet ?",
    answer: "La tarification dépend de la complexité du projet, des fonctionnalités requises et du temps de développement estimé. Nous privilégions une approche transparente : après un premier échange pour comprendre vos besoins (cahier des charges), nous vous fournissons un devis détaillé, personnalisé et gratuit."
  },
  {
    category: "Processus",
    question: "Quelle est votre méthodologie de développement ?",
    answer: "Nous utilisons des méthodes agiles pour garantir une flexibilité et une excellente qualité technique. Le processus inclut : l'analyse des besoins, la conception graphique (maquettes UI/UX), le développement itératif (avec des points réguliers), les tests poussés, et enfin le déploiement de la solution."
  },
  {
    category: "Processus",
    question: "Combien de temps faut-il pour créer une application ?",
    answer: "Un site vitrine peut être finalisé entre 2 et 4 semaines, tandis qu'une application sur mesure ou un SaaS complexe demande généralement de 2 à 6 mois selon sa complexité. Nos solutions \"No-Code / Low-Code\" peuvent permettre des lancements express en quelques jours ou semaines."
  },
  {
    category: "Support",
    question: "Proposez-vous un support et une maintenance après le lancement ?",
    answer: "Absolument. Nous proposons différents forfaits de maintenance pour garantir que votre application reste sécurisée, de fonctionner correctement avec de bonnes performances et s'enrichisse de nouvelles fonctionnalités sur le long terme."
  }
];

const categories = ["Toutes", ...Array.from(new Set(faqs.map(faq => faq.category)))];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section 
      id="faq" 
      data-seo-title="Foire Aux Questions | HardSoft Technologies" 
      data-seo-description="Trouvez des réponses concernant nos tarifs, processus de développement et méthodes de travail." 
      className="py-24 bg-slate-950 border-t border-slate-800 relative z-10"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Foire Aux Questions</h2>
          <p className="text-slate-400 mb-8">
            Trouvez les réponses à vos questions concernant nos services, nos tarifs et notre méthodologie.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenIndex(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative max-w-xl mx-auto text-left">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une question..."
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Rechercher dans la FAQ"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-800 bg-slate-900 rounded-2xl overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-lg text-slate-200">{faq.question}</span>
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
                      <div className="px-6 pb-5 text-slate-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500">
              <p>Aucun résultat trouvé pour "{searchQuery}".</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
