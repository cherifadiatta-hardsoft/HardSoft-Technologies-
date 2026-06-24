import { motion } from 'motion/react';
import { Code2, CheckCircle, Cpu, Globe, Database, Smartphone, LayoutTemplate } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function ModuleDetails() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const skills = isFr ? [
    "Algorithmique avancée et structures de données",
    "Développement Web Full-Stack (React, Node.js)",
    "Création d'applications mobiles natives et hybrides",
    "Architecture logicielle et Microservices",
    "Programmation de systèmes embarqués (IoT)",
    "Intégration et déploiement continus (CI/CD)"
  ] : [
    "Advanced algorithms and data structures",
    "Full-Stack Web Development (React, Node.js)",
    "Native and hybrid mobile app creation",
    "Software architecture and Microservices",
    "Embedded systems programming (IoT)",
    "Continuous Integration and Deployment (CI/CD)"
  ];

  const curriculum = [
    {
      title: isFr ? "Fondamentaux & Logique" : "Fundamentals & Logic",
      desc: isFr ? "Maîtrise des algorithmes de base, paradigmes de programmation et gestion de version avec Git." : "Mastery of basic algorithms, programming paradigms, and version control with Git.",
      icon: <LayoutTemplate size={24} />
    },
    {
      title: isFr ? "Ingénierie Web & Bases de Données" : "Web Engineering & Databases",
      desc: isFr ? "Création d'interfaces modernes, conception de bases de données relationnelles et NoSQL, et développement d'APIs." : "Creation of modern interfaces, design of relational and NoSQL databases, and API development.",
      icon: <Globe size={24} />
    },
    {
      title: isFr ? "Mobilité & Systèmes Embarqués" : "Mobility & Embedded Systems",
      desc: isFr ? "Développement pour iOS/Android et interaction avec des capteurs matériels pour l'Internet des Objets (IoT)." : "Development for iOS/Android and interaction with hardware sensors for the Internet of Things (IoT).",
      icon: <Cpu size={24} />
    }
  ];

  return (
    <div className="mt-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shrink-0">
          <Code2 size={32} />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {isFr ? "Zoom sur : Génie Logiciel & Électronique" : "Focus on: Software & Electronic Engineering"}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            {isFr ? "Le programme phare de notre Academy" : "The flagship program of our Academy"}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {isFr ? "Compétences Acquises" : "Acquired Skills"}
          </h4>
          <div className="space-y-4">
            {skills.map((skill, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle size={20} className="text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            {isFr ? "Structure du Cursus" : "Curriculum Structure"}
          </h4>
          <div className="space-y-6">
            {curriculum.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50"
              >
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm text-indigo-600 dark:text-indigo-400 shrink-0 h-fit">
                  {item.icon}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
