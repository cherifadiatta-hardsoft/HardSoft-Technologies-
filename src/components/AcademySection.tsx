import { motion } from 'motion/react';
import { BookOpen, Target, Rocket, Lightbulb, Network, MonitorPlay, Code2, PenTool, CheckCircle, GraduationCap, Briefcase, Award } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function AcademySection() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const poles = [
    {
      icon: <Network size={24} />,
      title: isFr ? "1. Télécommunication" : "1. Telecommunications",
      desc: isFr 
        ? "Conception, déploiement et optimisation des infrastructures de communication modernes pour interconnecter les services et garantir la continuité des flux de données."
        : "Design, deployment, and optimization of modern communication infrastructures to interconnect services and ensure continuous data flow."
    },
    {
      icon: <MonitorPlay size={24} />,
      title: isFr ? "2. Réseaux Informatiques" : "2. Computer Networks",
      desc: isFr
        ? "Architecture, sécurisation et administration des infrastructures réseaux d’entreprise, garantissant une connectivité fiable, rapide et hautement sécurisée."
        : "Architecture, securing, and administration of enterprise network infrastructures, ensuring reliable, fast, and highly secure connectivity."
    },
    {
      icon: <Code2 size={24} />,
      title: isFr ? "3. Génie Logiciel & Électronique" : "3. Software & Electronic Eng.",
      desc: isFr
        ? "Développement d'applications web, mobiles et de systèmes embarqués sur mesure. De la logique métier à l'intégration matérielle, nous formons à concevoir des architectures robustes."
        : "Development of custom web, mobile apps, and embedded systems. From business logic to hardware integration, we train you to design robust software architectures."
    },
    {
      icon: <PenTool size={24} />,
      title: isFr ? "4. Infographie - Multimédia" : "4. Computer Graphics - Multimedia",
      desc: isFr
        ? "Création visuelle, design d'interfaces (UI/UX) et production de contenus multimédias. Nous combinons esthétique, ergonomie et performance pour des expériences mémorables."
        : "Visual creation, interface design (UI/UX), and multimedia content production. We combine aesthetics, ergonomics, and performance for memorable user experiences."
    }
  ];

  const objectives = [
    {
      icon: <Rocket size={20} className="text-indigo-500" />,
      title: isFr ? "Accélérer l'insertion" : "Accelerate Integration",
      desc: isFr ? "Cursus immersifs répondant aux besoins réels des entreprises." : "Immersive courses answering the real needs of companies."
    },
    {
      icon: <Target size={20} className="text-indigo-500" />,
      title: isFr ? "Pratiquer pour maîtriser" : "Learning by Doing",
      desc: isFr ? "Immersion au cœur de projets réels et de la production." : "Immersion at the heart of real projects and production."
    },
    {
      icon: <Lightbulb size={20} className="text-indigo-500" />,
      title: isFr ? "Anticiper la Tech" : "Anticipate Tech Future",
      desc: isFr ? "Assistance IA (Vibe Coding) et méthodes modernes." : "AI assistance (Vibe Coding) and modern development methods."
    }
  ];

  const reasons = [
    {
      icon: <Briefcase size={20} className="text-emerald-500" />,
      title: isFr ? "Expertise Terrain" : "Field Expertise",
      desc: isFr ? "Apprenez aux côtés d'ingénieurs et de consultants certifiés." : "Learn alongside certified engineers and consultants."
    },
    {
      icon: <GraduationCap size={20} className="text-emerald-500" />,
      title: isFr ? "Cadre Professionnel" : "Professional Env.",
      desc: isFr ? "Immersion totale au sein d'une entreprise tech en croissance." : "Total immersion within a growing tech company."
    },
    {
      icon: <Award size={20} className="text-emerald-500" />,
      title: isFr ? "Préparation Certifications" : "Certifications Prep",
      desc: isFr ? "Programmes structurés pour maximiser votre employabilité." : "Structured programs to maximize your global employability."
    }
  ];

  return (
    <section 
      id="academy" 
      data-seo-title={isFr ? "HardSoft Academy | Formations en Informatique" : "HardSoft Academy | IT Training"} 
      data-seo-description={isFr ? "Formations pratiques en développement, réseaux et multimédia par HardSoft Technologies." : "Practical training in software development, networks, and multimedia by HardSoft."} 
      className="py-24 relative overflow-hidden scroll-mt-24 bg-slate-50 dark:bg-[#0B1120]"
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-6"
          >
            <BookOpen size={18} />
            HardSoft Academy
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6"
          >
            {isFr ? "Innover par le Logiciel, Former pour l'Avenir" : "Innovating through Software, Training for the Future"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            {isFr 
              ? "Chez HardSoft Technologies, nous concevons le digital comme un levier de transformation durable. Notre mission : bâtir des solutions innovantes et former les talents de la révolution numérique de demain."
              : "At HardSoft Technologies, we design digital tools as a lever for sustainable transformation. Our mission: build innovative solutions and train the talents of tomorrow's digital revolution."}
          </motion.p>
        </div>

        {/* Vision & Objectives Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-sm"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Target size={24} />
              </span>
              {isFr ? "Notre Vision" : "Our Vision"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              {isFr 
                ? "Devenir le catalyseur de référence de l’excellence technologique en Afrique. Nous croyons que l’avenir de l’économie numérique repose sur la qualification de ses acteurs. À travers notre pôle de formation, nous voulons combler le fossé entre la théorie académique et les réalités du marché en formant des professionnels directement opérationnels, hautement qualifiés et dotés d’un esprit d’innovation."
                : "To become the leading catalyst for technological excellence in Africa. We aim to permanently bridge the gap between academic theory and market realities by training professionals who are highly qualified, immediately operational, and driven by an innovative spirit."}
            </p>

            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {isFr ? "Nos Objectifs Stratégiques" : "Strategic Objectives"}
            </h4>
            <div className="space-y-4">
              {objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg">
                    {obj.icon}
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white">{obj.title}</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-sm"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle size={24} />
              </span>
              {isFr ? "Pourquoi Nous Choisir ?" : "Why Choose Us?"}
            </h3>
            
            <div className="space-y-6">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm">
                    {reason.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white mb-1">{reason.title}</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
               <a
                 href="#contact"
                 className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
               >
                 {isFr ? "Postuler à l'Academy" : "Apply to the Academy"}
               </a>
            </div>
          </motion.div>
        </div>

        {/* Pôles d'Expertise */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {isFr ? "Nos Pôles d'Expertise & de Formation" : "Our Poles of Expertise & Training"}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {isFr 
                ? "Nos cursus et compétences d'ingénierie s'articulent autour de quatre grands axes stratégiques."
                : "Our academic roadmaps and engineering skills are structured around four main strategic axes."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {poles.map((pole, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-colors group shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {pole.icon}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg leading-tight">
                  {pole.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {pole.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
