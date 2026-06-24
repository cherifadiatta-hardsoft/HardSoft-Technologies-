import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Target, Rocket, Lightbulb, Network, MonitorPlay, Code2, PenTool, CheckCircle, GraduationCap, Briefcase, Award, Download, X, Mail } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import ModuleDetails from './ModuleDetails';

export default function AcademySection() {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Simuler l'envoi
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const poles = [
    {
      icon: <Code2 size={24} />,
      title: isFr ? "1. Génie Logiciel & Électronique" : "1. Software & Electronic Eng.",
      slogan: isFr ? "De l'algorithme au système embarqué, concevez les technologies de demain" : "From algorithm to embedded system, design tomorrow's tech",
      desc: isFr
        ? "Développement d'applications web et mobiles robustes, architecture logicielle, IoT et systèmes embarqués intelligents."
        : "Development of robust web and mobile applications, software architecture, IoT, and intelligent embedded systems.",
      tags: ["Développement Web & Mobile", "IoT & Robotique", "AI Assistance"]
    },
    {
      icon: <Network size={24} />,
      title: isFr ? "2. Réseaux Informatiques" : "2. Computer Networks",
      slogan: isFr ? "Architecturez, administrez et sécurisez les infrastructures d'entreprise" : "Architect, administer and secure enterprise infrastructures",
      desc: isFr
        ? "Conception et gestion de réseaux performants, administration de serveurs et initiation aux fondamentaux de la cybersécurité."
        : "Design and management of high-performance networks, server administration, and introduction to cybersecurity fundamentals.",
      tags: ["Architecture Réseau", "Sécurité", "Administration Système"]
    },
    {
      icon: <MonitorPlay size={24} />,
      title: isFr ? "3. Télécommunication" : "3. Telecommunications",
      slogan: isFr ? "Connectez le monde et déployez les infrastructures de communication" : "Connect the world and deploy communication infrastructures",
      desc: isFr 
        ? "Maîtrise des technologies de transmission, des réseaux mobiles, de la fibre optique et des systèmes de communication modernes."
        : "Mastery of transmission technologies, mobile networks, optical fiber, and modern communication systems.",
      tags: ["Fibre Optique", "Réseaux Mobiles", "Transmission"]
    },
    {
      icon: <PenTool size={24} />,
      title: isFr ? "4. Infographie & Multimédia" : "4. Computer Graphics & Multimedia",
      slogan: isFr ? "Donnez vie à vos idées à travers le design et le contenu numérique" : "Bring your ideas to life through design and digital content",
      desc: isFr
        ? "Création visuelle, Design d'interfaces (UI/UX), identité de marque et production de contenus multimédias professionnels."
        : "Visual creation, Interface Design (UI/UX), brand identity, and professional multimedia content production.",
      tags: ["UI/UX Design", "Graphisme", "Création Digitale"]
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
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8"
          >
            {isFr 
              ? "Chez HardSoft Technologies, nous concevons le digital comme un levier de transformation durable. Notre mission : bâtir des solutions innovantes et former les talents de la révolution numérique de demain."
              : "At HardSoft Technologies, we design digital tools as a lever for sustainable transformation. Our mission: build innovative solutions and train the talents of tomorrow's digital revolution."}
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <Download size={20} />
            {isFr ? "Télécharger la brochure complète" : "Download Full Brochure"}
          </motion.button>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {poles.map((pole, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-colors group shadow-sm hover:shadow-md flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {pole.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xl leading-tight">
                    {pole.title}
                  </h4>
                </div>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic mb-4">
                  « {pole.slogan} »
                </p>
                
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6 flex-grow">
                  {pole.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {pole.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Module Details - Génie Logiciel & Électronique */}
        <ModuleDetails />

      </div>

      {/* Brochure Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            key="brochure-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Download size={24} className="text-indigo-600 dark:text-indigo-400" />
                  {isFr ? "Brochure HardSoft Academy" : "HardSoft Academy Brochure"}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                  {isFr 
                    ? "Recevez notre brochure détaillée comprenant le programme complet de nos 4 pôles d'expertise, les modalités d'inscription et les opportunités de carrière." 
                    : "Receive our detailed brochure including the complete curriculum of our 4 areas of expertise, enrollment details, and career opportunities."}
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm uppercase tracking-wider">
                    {isFr ? "Pôles inclus :" : "Included areas:"}
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Télécommunication</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Réseaux</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Génie Logiciel</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Infographie</li>
                  </ul>
                </div>

                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl flex items-center justify-center gap-3 font-medium"
                  >
                    <CheckCircle size={20} />
                    {isFr ? "Brochure envoyée avec succès !" : "Brochure sent successfully!"}
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {isFr ? "Adresse e-mail" : "Email address"}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder={isFr ? "votre@email.com" : "your@email.com"}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-xl"
                    >
                      {isFr ? "Recevoir la brochure" : "Receive the brochure"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
