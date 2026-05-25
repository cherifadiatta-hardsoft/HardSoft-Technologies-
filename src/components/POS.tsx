import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, Laptop, HeadphonesIcon } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function POS() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const highlights = [
    { icon: <Laptop size={20} />, text: isFr ? 'Facile à prendre en main' : 'Intuitive & easy to learn' },
    { icon: <TrendingUp size={20} />, text: isFr ? 'Rapports détaillés' : 'Detailed analytics' },
    { icon: <HeadphonesIcon size={20} />, text: isFr ? 'Support technique local' : 'Local technical support' },
  ];

  return (
    <section 
      id="pos" 
      data-seo-title={isFr ? "Solution POS & Caisse Enregistreuse | HardSoft Technologies" : "POS Solution & Cash Registers | HardSoft Technologies"} 
      data-seo-description={isFr ? "Simplifiez la gestion de votre point de vente, gérez les stocks et analysez vos ventes en temps réel." : "Simplify point of sale management, oversee inventory, and optimize real-time receipts."} 
      className="py-24 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 2xl:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 aspect-[4/3] flex items-center justify-center">
              {/* POS Abstract Dashboard Representation */}
             <div className="w-full h-full p-6 flex flex-col gap-4 opacity-80">
                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-300 dark:border-slate-700/50">
                   <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                   <div className="flex gap-2">
                       <div className="h-8 w-8 bg-indigo-500/50 rounded-lg"></div>
                       <div className="h-8 w-24 bg-indigo-600 rounded-lg"></div>
                   </div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="col-span-2 flex flex-col gap-4">
                        <div className="h-1/2 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl p-4 flex flex-col gap-2 justify-end">
                            <div className="flex items-end gap-2 h-full">
                               {[40, 70, 45, 90, 60, 100, 80].map((h, i) => (
                                 <div key={i} className="flex-1 bg-indigo-500/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
                               ))}
                            </div>
                        </div>
                         <div className="h-1/2 flex gap-4">
                            <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl"></div>
                            <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl"></div>
                         </div>
                    </div>
                    <div className="col-span-1 bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 rounded-xl p-4 flex flex-col gap-3">
                        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                        {[1, 2, 3, 4, 5].map((i) => (
                             <div key={i} className="h-12 bg-slate-200 dark:bg-slate-700/30 rounded flex items-center px-3 justify-between">
                                 <div className="h-3 w-16 bg-slate-600 rounded"></div>
                                 <div className="h-4 w-8 bg-green-500/40 rounded"></div>
                             </div>
                        ))}
                    </div>
                </div>
             </div>
             
             {/* Glow effect */}
             <div className="absolute inset-0 bg-indigo-500/10 blur-xl"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide select-none">
              {isFr ? "Notre Solution Phare" : "Our Flagship Solution"}
            </div>
            <h2 className="font-display text-3xl md:text-5xl 2xl:text-6xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              {isFr ? "Simplifiez la gestion de votre commerce avec notre Logiciel POS." : "Simplify business management with our custom POS Software."}
            </h2>
            <p className="text-base sm:text-lg 2xl:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {isFr 
                ? "Une solution complète de Point de Vente pour gérer vos stocks, suivre vos ventes en temps réel et piloter votre entreprise en toute simplicité. Conçu pour s'adapter à votre activité."
                : "A complete Point of Sale solution to track stock, monitor remote sales in real-time, and run your retail or wholesale store with peace of mind. Highly adaptable."}
            </p>

            <ul className="space-y-4 mb-8">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-semibold text-sm sm:text-base">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 dark:bg-white text-white dark:text-slate-950 font-bold rounded-lg hover:bg-indigo-700 dark:hover:bg-slate-200 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base cursor-pointer"
            >
              {isFr ? "Demander une démo" : "Request a Demo"}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
