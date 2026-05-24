import { motion } from 'motion/react';

const frontendFrameworks = [
  'Angular', 'Astro', 'Next.js', 'Nuxt', 'Parcel', 'React', 'React Router', 'Svelte', 'SvelteKit', 'Vite', 'Vue.js'
];

const backendFrameworks = [
  'Astro', 'Express', 'Fastify', 'Hono', 'NestJS', 'Next.js', 'Nuxt', 'React Router', 'SvelteKit'
];

export default function Technologies() {
  return (
    <section 
      id="technologies"
      data-seo-title="Nos Technologies & Frameworks | HardSoft Technologies" 
      data-seo-description="Découvrez les frameworks que nous maitrisons : React, Angular, Vue, Next.js, Express, NestJS et bien plus." 
      className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frameworks pris en charge</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Nous utilisons et déployons les frameworks JavaScript les plus populaires pour garantir des performances optimales (compatibles avec des environnements comme Hostinger).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800"
          >
            <h3 className="text-xl font-bold text-indigo-400 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-xl">🎨</span>
              Frontend
            </h3>
            <div className="flex flex-wrap gap-3">
              {frontendFrameworks.map((fw) => (
                <span key={fw} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-default">
                  {fw}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800"
          >
            <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xl">⚙️</span>
              Backend
            </h3>
            <div className="flex flex-wrap gap-3">
              {backendFrameworks.map((fw) => (
                <span key={fw} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:border-emerald-500 hover:text-emerald-400 transition-colors cursor-default">
                  {fw}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
