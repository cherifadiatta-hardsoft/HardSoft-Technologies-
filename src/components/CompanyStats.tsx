import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Users, Award, Briefcase } from 'lucide-react';

const stats = [
  {
    id: 1,
    name: 'Projets Réalisés',
    value: '50+',
    icon: Briefcase,
    description: 'Livrés avec succès',
  },
  {
    id: 2,
    name: 'Clients Satisfaits',
    value: '100%',
    icon: Users,
    description: 'Notre priorité absolue',
  },
  {
    id: 3,
    name: 'Années d\'Expérience',
    value: '5+',
    icon: Award,
    description: 'Expertise technique',
  },
  {
    id: 4,
    name: 'Technologies Maîtrisées',
    value: '12+',
    icon: CheckCircle2,
    description: 'Solutions sur mesure',
  },
];

export default function CompanyStats() {
  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 2xl:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group p-4 sm:p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/20 border border-transparent hover:border-indigo-500/10 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300"
              >
                <div className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 2xl:w-7 2xl:h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="font-display text-3xl sm:text-4xl 2xl:text-5xl font-extrabold text-slate-900 dark:text-white mb-1.5 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm 2xl:text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {stat.name}
                </div>
                <div className="text-xs 2xl:text-sm text-slate-500 dark:text-slate-400">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
