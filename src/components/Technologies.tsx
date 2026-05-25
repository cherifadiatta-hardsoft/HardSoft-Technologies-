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
      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-5xl 2xl:text-6xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Frameworks préconisés</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg 2xl:text-xl">
            Nous utilisons et déployons les frameworks JavaScript les plus robustes pour garantir des performances optimales et une compatibilité maximale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 2xl:gap-16">
          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-950 p-8 2xl:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h3 className="font-display text-xl 2xl:text-2xl font-bold text-indigo-500 dark:text-indigo-400 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl select-none">🎨</span>
              Frontend
            </h3>
            <div className="flex flex-wrap gap-3">
              {frontendFrameworks.map((fw) => (
                <span key={fw} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold hover:border-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-default">
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
            className="bg-white dark:bg-slate-950 p-8 2xl:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <h3 className="font-display text-xl 2xl:text-2xl font-bold text-emerald-500 dark:text-emerald-400 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl select-none">⚙️</span>
              Backend
            </h3>
            <div className="flex flex-wrap gap-3">
              {backendFrameworks.map((fw) => (
                <span key={fw} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-default">
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
