import { motion } from 'motion/react';
import { ArrowRight, Terminal, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../config';

export default function Hero() {
  return (
    <section 
      id="accueil" 
      data-seo-title="HardSoft Technologies | Accueil" 
      data-seo-description="Découvrez nos solutions logicielles et nos services de développement pour la transformation digitale." 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay -z-10"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
            <Terminal size={16} />
            <span>Digitalisation & Logiciel sur mesure</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Propulsez votre entreprise grâce au <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">digital sur mesure.</span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl">
            De la création de votre site web à l'automatisation de vos processus, HardSoft Technologies conçoit les solutions logicielles qui feront grandir votre activité.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all group shrink-0"
            >
              <span className="whitespace-nowrap">Découvrir nos services</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-semibold rounded-full border border-[#25D366]/30 transition-all group shrink-0"
            >
              <MessageCircle size={20} className="shrink-0" />
              <span className="whitespace-nowrap">Demander un devis sur WhatsApp</span>
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
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
            <div className="absolute inset-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col">
              <div className="h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
              <div className="p-6 font-mono text-sm text-indigo-300 opacity-80 flex-1 flex flex-col justify-center">
                <p>const <span className="text-blue-400">company</span> = new HardSoft();</p>
                <p className="mt-2">company.build({'{'}</p>
                <p className="ml-4 text-emerald-400">webApp: true,</p>
                <p className="ml-4 text-emerald-400">automation: 'n8n',</p>
                <p className="ml-4 text-emerald-400">posSystem: 'advanced'</p>
                <p>{'})'})</p>
                <p className="mt-4 animate-pulse">.then(success {'=>'} scaleBusiness());</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
