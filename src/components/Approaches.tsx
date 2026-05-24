import { motion } from 'motion/react';
import { Lightbulb, Code2, Rocket } from 'lucide-react';

const approaches = [
  {
    icon: <Lightbulb size={32} className="text-amber-400" />,
    title: 'Sur-Mesure (Custom Code)',
    description: 'Une conception à partir de zéro avec des technologies modernes (React, Node.js) pour répondre exactement à vos spécifications les plus complexes.',
  },
  {
    icon: <Code2 size={32} className="text-blue-400" />,
    title: 'No-Code / Low-Code',
    description: 'L\'utilisation d\'outils agiles et d\'automatisation (n8n, WordPress) pour un déploiement rapide et des coûts maîtrisés, idéal pour les lancements rapides.',
  },
  {
    icon: <Rocket size={32} className="text-rose-400" />,
    title: 'Écosystème HardSoft',
    description: 'L\'intégration de nos propres solutions prêtes à l\'emploi (Logiciel POS, Plateformes) adaptées et personnalisées à votre image.',
  },
];

export default function Approaches() {
  return (
    <section 
      id="approches"
      data-seo-title="Nos Approches de Développement | HardSoft Technologies" 
      data-seo-description="Sur-mesure, Low-Code/No-Code ou intégration de solutions existantes, nous choisissons la meilleure approche pour votre projet." 
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos 3 Approches de Développement</h2>
          <p className="text-slate-400">
            Nous adaptons notre méthodologie en fonction de vos besoins, de votre budget et de vos délais.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2 text-8xl font-black text-slate-800/30 group-hover:text-slate-800/50 transition-colors z-0">
                {index + 1}
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
                  {approach.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{approach.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {approach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
