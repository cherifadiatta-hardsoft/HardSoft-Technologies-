import { motion } from 'motion/react';
import { Code2, Network, Radio, PenTool, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function Formations() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const modules = [
    {
      id: 1,
      icon: <Code2 size={32} />,
      title: isFr ? "Génie Logiciel & Électronique" : "Software & Electronic Engineering",
      slogan: isFr ? "De l'algorithme au système embarqué, concevez les technologies de demain." : "From algorithms to embedded systems, design the technologies of tomorrow.",
      overview: isFr ? "Un pôle d'excellence dédié à la création d'applications modernes, d'architectures logicielles robustes et à l'intégration de systèmes électroniques intelligents." : "A center of excellence dedicated to creating modern applications, robust software architectures, and integrating intelligent electronic systems.",
      target: isFr ? "Futurs développeurs, ingénieurs logiciels, passionnés d'IoT et de robotique." : "Future developers, software engineers, IoT and robotics enthusiasts.",
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 dark:bg-blue-900/10",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: 2,
      icon: <Network size={32} />,
      title: isFr ? "Réseaux Informatiques" : "Computer Networks",
      slogan: isFr ? "Architecturez, administrez et sécurisez les infrastructures d'entreprise." : "Architect, administer, and secure enterprise infrastructures.",
      overview: isFr ? "Maîtrisez l'art de connecter les organisations en apprenant à concevoir des réseaux informatiques fiables, performants et hautement sécurisés contre les cybermenaces." : "Master the art of connecting organizations by learning to design reliable, high-performance, and highly secure computer networks against cyber threats.",
      target: isFr ? "Futurs administrateurs réseaux, techniciens support, experts en sécurité informatique." : "Future network administrators, support technicians, cybersecurity experts.",
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 dark:bg-emerald-900/10",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      id: 3,
      icon: <Radio size={32} />,
      title: isFr ? "Télécommunication" : "Telecommunications",
      slogan: isFr ? "Connectez le monde et déployez les infrastructures de communication." : "Connect the world and deploy communication infrastructures.",
      overview: isFr ? "Plongez au cœur des technologies de transmission, des réseaux mobiles, de la fibre optique et des systèmes de communication par satellite." : "Dive into transmission technologies, mobile networks, fiber optics, and satellite communication systems.",
      target: isFr ? "Futurs techniciens et ingénieurs télécoms, installateurs d'infrastructures réseau." : "Future telecom technicians and engineers, network infrastructure installers.",
      color: "from-orange-500 to-red-600",
      bgLight: "bg-orange-50 dark:bg-orange-900/10",
      iconColor: "text-orange-600 dark:text-orange-400"
    },
    {
      id: 4,
      icon: <PenTool size={32} />,
      title: isFr ? "Infographie & Multimédia" : "Computer Graphics & Multimedia",
      slogan: isFr ? "Donnez vie à vos idées à travers le design et le contenu numérique." : "Bring your ideas to life through design and digital content.",
      overview: isFr ? "Alliez art et technologie en apprenant à concevoir des interfaces graphiques captivantes (UI/UX), des identités visuelles marquantes et des productions multimédias professionnelles." : "Combine art and technology by learning to design captivating graphical interfaces (UI/UX), striking visual identities, and professional multimedia productions.",
      target: isFr ? "Futurs UI/UX designers, graphistes, créateurs de contenu, webmasters." : "Future UI/UX designers, graphic designers, content creators, webmasters.",
      color: "from-purple-500 to-pink-600",
      bgLight: "bg-purple-50 dark:bg-purple-900/10",
      iconColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <section 
      id="catalogue-formations" 
      data-seo-title={isFr ? "Catalogue de Formations | HardSoft Academy" : "Training Catalog | HardSoft Academy"} 
      data-seo-description={isFr ? "Découvrez notre catalogue de formations: Génie Logiciel, Réseaux, Télécoms, Infographie." : "Discover our training catalog: Software Engineering, Networks, Telecoms, Graphics."} 
      className="py-24 relative overflow-hidden bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm mb-6 border border-slate-200 dark:border-slate-700"
          >
            📂 {isFr ? "Notre Catalogue" : "Our Catalog"}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            {isFr ? "Catalogue de Formations" : "Training Catalog"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            {isFr 
              ? "Découvrez nos modules de formation spécialisés, conçus pour vous préparer aux métiers de demain avec une approche résolument pratique."
              : "Discover our specialized training modules, designed to prepare you for the jobs of tomorrow with a resolutely practical approach."}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((mod, idx) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity rounded-bl-full`}></div>
              
              <div className="flex items-start gap-5 mb-6">
                <div className={`w-16 h-16 rounded-2xl ${mod.bgLight} ${mod.iconColor} flex items-center justify-center shrink-0`}>
                  {mod.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-1 tracking-wider uppercase">
                    {isFr ? `Module ${mod.id}` : `Module ${mod.id}`}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {mod.title}
                  </h3>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 italic">
                  "{mod.slogan}"
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  <span className="font-semibold text-slate-900 dark:text-white">{isFr ? "Aperçu : " : "Overview: "}</span>
                  {mod.overview}
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-900 dark:text-white">{isFr ? "Public cible : " : "Target Audience: "}</span>
                  {mod.target}
                </p>
              </div>

              <a
                href="#contact"
                className={`inline-flex items-center gap-2 font-bold text-sm sm:text-base transition-colors group-hover:underline ${mod.iconColor}`}
              >
                {isFr ? "Découvrir les formations de ce module" : "Discover the courses of this module"}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
