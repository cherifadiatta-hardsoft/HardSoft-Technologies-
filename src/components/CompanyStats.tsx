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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  {stat.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
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
