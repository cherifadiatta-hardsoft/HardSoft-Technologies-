import { motion } from 'motion/react';
import { ArrowRight, Terminal, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../config';
import { useLanguage } from './LanguageProvider';

export default function Hero() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <section 
      id="accueil" 
      data-seo-title={isFr ? "HardSoft Technologies | Accueil" : "HardSoft Technologies | Home"} 
      data-seo-description={isFr ? "Découvrez nos solutions logicielles et nos services de développement pour l'innovation technologique." : "Discover our premium custom software and digitalization solutions for modern business innovation."} 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-white dark:via-slate-950 to-white dark:to-slate-950 -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-10"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-6 grid lg:grid-cols-2 gap-12 2xl:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-650 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide">
            <Terminal size={14} className="sm:w-4 sm:h-4 text-indigo-500" />
            <span>{isFr ? "Digitalisation & Logiciel sur mesure" : "Custom Software & Digitalization"}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-bold tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white">
            {isFr ? (
              <>Propulsez votre entreprise grâce au <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-400">digital sur mesure.</span></>
            ) : (
              <>Propel your business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-400">tailored digital solutions.</span></>
            )}
          </h1>
          <p className="text-base sm:text-lg 2xl:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl 2xl:max-w-2xl">
            {isFr 
              ? "De la création de votre site web à l'automatisation de vos processus, HardSoft Technologies conçoit les solutions logicielles qui feront grandir votre activité."
              : "From creating your website to automating your internal business processes, HardSoft Technologies designs software that scales your operations."}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 2xl:gap-6">
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 2xl:px-10 2xl:py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transform hover:-translate-y-0.5 group shrink-0 text-sm sm:text-base"
            >
              <span className="whitespace-nowrap">{isFr ? "Découvrir nos services" : "Discover our services"}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 2xl:px-10 2xl:py-5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold rounded-full border border-[#25D366]/30 transition-all duration-300 transform hover:-translate-y-0.5 group shrink-0 text-sm sm:text-base"
            >
              <MessageCircle size={20} className="shrink-0" />
              <span className="whitespace-nowrap">{isFr ? "Demander un devis sur WhatsApp" : "Request a quote on WhatsApp"}</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Abstract Tech Illustration Placeholder */}
          <div className="relative w-full aspect-square max-w-md 2xl:max-w-lg 3xl:max-w-xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
            <div className="absolute inset-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col">
              <div className="h-8 bg-slate-100 dark:bg-slate-800/50 border-b border-slate-300 dark:border-slate-700/50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
              <div className="p-6 2xl:p-10 font-mono text-sm 2xl:text-base text-indigo-400 dark:text-indigo-300 opacity-90 flex-1 flex flex-col justify-center">
                <p>const <span className="text-blue-500 dark:text-blue-400">company</span> = new HardSoft();</p>
                <p className="mt-2">company.build({'{'}</p>
                <p className="ml-4 text-emerald-600 dark:text-emerald-400">webApp: true,</p>
                <p className="ml-4 text-emerald-600 dark:text-emerald-400">automation: 'n8n',</p>
                <p className="ml-4 text-emerald-600 dark:text-emerald-400">posSystem: 'advanced'</p>
                <p>{'})'}</p>
                <p className="mt-4 animate-pulse text-indigo-600 dark:text-indigo-400">.then(success {'=>'} scaleBusiness());</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
