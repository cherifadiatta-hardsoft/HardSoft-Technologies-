import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface FAQItemKeys {
  category: string; // Internal filter key matching category IDs
  categoryTranslationKey: string;
  questionKey: string;
  answerKey: string;
}

const faqsKeys: FAQItemKeys[] = [
  {
    category: "Services",
    categoryTranslationKey: "faq.categories.services",
    questionKey: "faq.q1.question",
    answerKey: "faq.q1.answer"
  },
  {
    category: "Tarifs",
    categoryTranslationKey: "faq.categories.tarifs",
    questionKey: "faq.q2.question",
    answerKey: "faq.q2.answer"
  },
  {
    category: "Processus",
    categoryTranslationKey: "faq.categories.processus",
    questionKey: "faq.q3.question",
    answerKey: "faq.q3.answer"
  },
  {
    category: "Processus",
    categoryTranslationKey: "faq.categories.processus",
    questionKey: "faq.q4.question",
    answerKey: "faq.q4.answer"
  },
  {
    category: "Support",
    categoryTranslationKey: "faq.categories.support",
    questionKey: "faq.q5.question",
    answerKey: "faq.q5.answer"
  }
];

const categories = [
  { id: 'Toutes', labelKey: 'faq.categories.all' },
  ...Array.from(
    new Map(faqsKeys.map(item => [item.category, item.categoryTranslationKey])).entries()
  ).map(([id, labelKey]) => ({ id, labelKey }))
];

export default function FAQ() {
  const { language, t } = useLanguage();
  const isFr = language === 'fr';

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [isFocused, setIsFocused] = useState(false);

  const filteredFaqs = faqsKeys.filter(faq => {
    const question = t(faq.questionKey);
    const answer = t(faq.answerKey);
    
    const matchesSearch = question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Toutes' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section 
      id="faq" 
      data-seo-title={isFr ? "Foire Aux Questions | HardSoft Technologies" : "Frequently Asked Questions | HardSoft Technologies"} 
      data-seo-description={isFr ? "Trouvez des réponses concernant nos tarifs, processus de développement et méthodes de travail." : "Find responses regarding our project pricing, streamlined workflows, and collaboration processes."}
      className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 relative z-10"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-slate-900 dark:text-white">
            {t('faq.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            {t('faq.descr')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-705 text-slate-700 dark:text-slate-400 hover:border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          <motion.div 
            animate={{ 
              scale: isFocused ? 1.025 : 1,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className={`relative max-w-xl mx-auto text-left rounded-xl transition-all duration-300 ${
              isFocused 
                ? 'shadow-lg shadow-indigo-500/15' 
                : 'shadow-none'
            }`}
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search 
                size={20} 
                className={`transition-colors duration-300 ${
                  isFocused ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-450'
                }`} 
              />
            </div>
            <input
              type="text"
              placeholder={t('faq.search_placeholder')}
              className={`w-full bg-slate-50 dark:bg-slate-900 border text-slate-800 dark:text-slate-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none transition-all duration-300 ${
                isFocused 
                  ? 'border-indigo-500 dark:border-indigo-400 ring-4 ring-indigo-505/10 bg-white dark:bg-slate-950 shadow-inner' 
                  : 'border-slate-300 dark:border-slate-700'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-label={t('faq.search_placeholder')}
            />
          </motion.div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={faq.questionKey} 
                className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-700"
              >
                <button
                  type="button"
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl transition-colors cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-bold text-base md:text-lg text-slate-850 dark:text-slate-200 leading-snug">
                    {t(faq.questionKey)}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-indigo-400 shrink-0 ml-4 transition-transform duration-300 ${
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
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        {t(faq.answerKey)}
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
              className="text-center py-16 px-6 bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl"
            >
              <div className="text-4xl mb-4 select-none">🔍</div>
              <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-white mb-2">
                {t('faq.no_results_title')}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-450 max-w-md mx-auto mb-6">
                {t('faq.no_results_desc', { 
                  query: searchQuery, 
                  category: t(categories.find(cat => cat.id === selectedCategory)?.labelKey || 'faq.categories.all') 
                })}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {(searchQuery || selectedCategory !== 'Toutes') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Toutes');
                    }}
                    className="px-5 py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 font-extrabold rounded-xl text-xs transition-all border border-indigo-200/50 dark:border-indigo-900/40 cursor-pointer active:scale-95"
                  >
                    {t('faq.reset_filters')}
                  </button>
                )}
                <a
                  href="#contact"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 dark:bg-slate-900 dark:hover:bg-slate-850 text-white font-bold rounded-xl text-xs transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  {t('faq.ask_question')}
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
