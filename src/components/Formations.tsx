import { motion } from 'motion/react';
import { BookOpen, Users, PlayCircle } from 'lucide-react';

export default function Formations() {
  return (
    <section id="formations" className="py-24 relative overflow-hidden">
      <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Formations en Informatique</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Envie de monter en compétences ou de former vos équipes ? Nous proposons des modules de formation pratiques et adaptés au marché actuel : Développement, outils numériques et bureautique.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
               <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon /> Cycle complet Développeur
               </li>
               <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon /> Outils d'Automatisation (n8n)
               </li>
               <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon /> Maîtrise Bureautique & Web
               </li>
               <li className="flex items-center gap-2 text-slate-300">
                  <CheckIcon /> Sessions Intra/Inter Entreprise
               </li>
            </ul>
             <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500 hover:text-white font-semibold rounded-lg transition-all"
            >
              Voir le programme
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative"
          >
             <div className="aspect-video bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer flex items-center justify-center">
                {/* Placeholder for training session image or video thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-indigo-900/40 opacity-80 mix-blend-multiply"></div>
                <Users size={64} className="text-slate-700 absolute opacity-20" />
                
                <div className="w-16 h-16 bg-white/10 backdrop-blur text-white rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 transition-all z-10">
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
