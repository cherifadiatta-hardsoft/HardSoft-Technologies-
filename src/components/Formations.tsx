import { motion } from 'motion/react';
import { BookOpen, PlayCircle } from 'lucide-react';
import LazyImage from './LazyImage';
import { useLanguage } from './LanguageProvider';

export default function Formations() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <section 
      id="formations" 
      data-seo-title={isFr ? "Formations en Informatique | HardSoft Technologies" : "IT & Software Training | HardSoft Technologies"} 
      data-seo-description={isFr ? "Découvrez nos formations pratiques en développement web et mobile, adaptées aux débutants." : "Discover our practical custom web and mobile programming courses for professionals and beginners."} 
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-16 2xl:p-20 flex flex-col md:flex-row items-center justify-between gap-12 2xl:gap-16 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="w-16 h-16 bg-indigo-500/20 text-indigo-650 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen size={32} />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">
              {isFr ? "Formations en Informatique" : "IT & Software Training"}
            </h2>
            <p className="text-base sm:text-lg 2xl:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {isFr 
                ? "Envie de monter en compétences ou de former vos équipes ? Nous proposons des modules de formation pratiques et adaptés au marché actuel : Développement, outils numériques et bureautique."
                : "Want to expand your skillset or train your teams? We provide hands-on, market-aligned training programs: advanced programming, automation workflows and modern business tools."}
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8 text-sm sm:text-base">
               <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                  <CheckIcon /> {isFr ? "Cycle complet Développeur" : "Full Developer Track"}
               </li>
               <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                  <CheckIcon /> {isFr ? "Outils d'Automatisation (n8n)" : "Automation Systems (n8n)"}
               </li>
               <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                  <CheckIcon /> {isFr ? "Executive Education (Diplôme)" : "Executive Education (Diploma)"}
               </li>
               <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                  <CheckIcon /> {isFr ? "Sessions Intra/Inter Entreprise" : "Corporate & Custom Training"}
               </li>
            </ul>
             <div className="mb-6 inline-flex items-center rounded-xl bg-amber-500/10 px-4 py-2.5 border border-amber-500/20 max-w-full">
               <p className="text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-semibold italic">
                 {isFr 
                   ? '"S\'armer pour l\'indépendance. Postulez pour le programme d\'Executive Education."'
                   : '"Empower yourself for independence. Apply now for the Executive Education course."'}
               </p>
             </div>
             <br />
             <a
               href="#contact"
               className="inline-flex items-center gap-2 px-6 py-3.5 border border-indigo-550 text-indigo-650 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white dark:hover:text-slate-950 font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base shadow-sm cursor-pointer"
             >
               {isFr ? "Voir le programme" : "View Curriculum"}
             </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative"
          >
             <div className="aspect-video bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer flex items-center justify-center">
                {/* Lazy Loaded Image for training session */}
                <LazyImage
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000"
                  alt={isFr ? "Session de formation en informatique" : "Developer training class session"}
                  containerClassName="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 dark:from-slate-900 via-transparent to-indigo-900/40 opacity-80 mix-blend-multiply pointer-events-none"></div>
                
                <div className="w-16 h-16 bg-slate-900/10 dark:bg-white/10 backdrop-blur text-slate-900 dark:text-white rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 transition-all z-10">
                   <PlayCircle size={32} className="ml-1" />
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
    return <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
}
