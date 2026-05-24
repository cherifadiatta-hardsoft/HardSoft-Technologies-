import { motion } from 'motion/react';
import { User, Linkedin, Twitter, Mail } from 'lucide-react';
import { WHATSAPP_URL } from '../config';
import LazyImage from './LazyImage';

export default function Founder() {
  return (
    <section 
      id="about" 
      data-seo-title="À Propos du Fondateur | HardSoft Technologies" 
      data-seo-description="Rencontrez l'équipe dirigeante derrière HardSoft Technologies, experte en développement informatique." 
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative shadow-2xl">
               {/* Photo du fondateur en Lazy Loading */}
               <LazyImage 
                 src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1000" 
                 alt="Photo de profil de Chérif Alioune Diatta"
                 containerClassName="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-transparent to-indigo-900/30 mix-blend-multiply pointer-events-none"></div>
               
               <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                    L'Expertise & La Vision
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-3">Chérif Alioune Diatta</h2>
            <h3 className="text-xl md:text-2xl text-indigo-400 font-medium mb-8">
              Fondateur & Directeur Général de HardSoft Technologies
            </h3>
            
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                Expert en technologies de l'information et passionné par l'innovation logicielle, Chérif Alioune Diatta est le Fondateur et Directeur Général de HardSoft Technologies à Dakar. Spécialisé en développement web, mobile, Progressive Web Apps (PWA) et en transformation digitale, il accompagne les entreprises dans la modernisation de leur infrastructure technologique.
              </p>
              <p>
                Visionnaire et orienté vers les solutions concrètes, il conçoit des écosystèmes performants (plateformes SaaS, marketplaces, solutions e-commerce) et place l'automatisation des processus au cœur de la croissance des organisations. Sous sa direction, HardSoft Technologies s'impose comme un partenaire de confiance pour propulser le business local et international grâce à des outils numériques sur mesure, sécurisés et innovants.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
               <a 
                 href="mailto:contact@hardsoft-technologies.net" 
                 className="w-12 h-12 bg-slate-900 border border-slate-800 hover:border-slate-600 hover:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all"
                 aria-label="Email"
               >
                 <Mail size={20} />
               </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
