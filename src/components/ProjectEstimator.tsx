import React, { useState, useEffect } from 'react';

const ProjectEstimator = () => {
  // Constantes de tarification de base (en FCFA)
  const MIN_LOGICIEL = 250000;
  const MIN_SITE_WEB = 100000;
  const MIN_AUTRES = 50000;

  // États du formulaire
  const [service, setService] = useState('logiciel');
  const [companySize, setCompanySize] = useState('pme');
  const [techStack, setTechStack] = useState('standard');
  const [customFeatures, setCustomFeatures] = useState(false);
  const [estimatedBudget, setEstimatedBudget] = useState(0);

  // Calcul dynamique du budget
  useEffect(() => {
    let basePrice = 0;

    // 1. Détermination du prix plancher par type de service
    if (service === 'logiciel') basePrice = MIN_LOGICIEL;
    else if (service === 'siteweb') basePrice = MIN_SITE_WEB;
    else basePrice = MIN_AUTRES;

    // 2. Multiplicateur selon la taille de l'entreprise
    let companyMultiplier = 1.0;
    if (companySize === 'pme') companyMultiplier = 1.2;
    if (companySize === 'grand_compte') companyMultiplier = 1.6;

    // 3. Multiplicateur selon le choix technologique (Solutions sur mesure complexes)
    let techMultiplier = 1.0;
    if (techStack === 'avancee') techMultiplier = 1.3; // ex: Mobile multiplateforme, IA, Temps réel

    // 4. Besoins spécifiques / Fonctionnalités complexes
    let extraCost = customFeatures ? basePrice * 0.25 : 0; // +25% si besoins complexes

    // Calcul final
    const total = (basePrice * companyMultiplier * techMultiplier) + extraCost;
    setEstimatedBudget(Math.round(total));
  }, [service, companySize, techStack, customFeatures]);

  // Génération d'une fourchette (ex: -15% à +20%)
  const minBudget = Math.round(estimatedBudget * 0.85);
  const maxBudget = Math.round(estimatedBudget * 1.25);

  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
        
        {/* En-tête */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold font-sans tracking-tight">Estimez votre Projet Digital</h2>
          <p className="mt-3 text-base text-indigo-100 max-w-2xl mx-auto">
            Obtenez une estimation de budget initial basée sur vos besoins spécifiques.
          </p>
        </div>

        {/* Formulaire / Contenu */}
        <div className="p-8 md:p-10 space-y-8">
          
          {/* 1. Type de Service */}
          <div>
            <label className="block text-base font-semibold text-slate-900 dark:text-white mb-4">
              1. De quel type de solution avez-vous besoin ?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setService('logiciel')}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  service === 'logiciel'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="font-bold text-lg mb-1">Logiciel / App Mobile</div>
                <div className="text-sm opacity-80 mt-2">Applications iOS/Android, Outils métiers, Logiciels SaaS...</div>
              </button>

              <button
                type="button"
                onClick={() => setService('siteweb')}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  service === 'siteweb'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="font-bold text-lg mb-1">Site Internet</div>
                <div className="text-sm opacity-80 mt-2">Sites vitrines, E-commerce, Portails web, Plateformes...</div>
              </button>

              <button
                type="button"
                onClick={() => setService('configuration')}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  service === 'configuration'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="font-bold text-lg mb-1">Configuration / Autre</div>
                <div className="text-sm opacity-80 mt-2">Services cloud, infrastructure, cybersécurité, audits...</div>
              </button>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* 2. Taille de l'entreprise */}
          <div>
            <label className="block text-base font-semibold text-slate-900 dark:text-white mb-3">
              2. Taille de votre structure / Envergure du projet
            </label>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="startup">Porteur de projet / Startup / Particulier</option>
              <option value="pme">PME / Entreprise locale</option>
              <option value="grand_compte">Grande Entreprise / Institution</option>
            </select>
          </div>

          {/* 3. Choix Technologique */}
          <div>
            <label className="block text-base font-semibold text-slate-900 dark:text-white mb-3">
              3. Préférence technologique
            </label>
            <select
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="standard">Standard (Technologies web efficaces, CMS ou stack optimisée)</option>
              <option value="avancee">Sur-mesure complexe (React, Next.js, Flutter, API dédiée, Cloud)</option>
            </select>
          </div>

          {/* 4. Besoins spécifiques additionnels */}
          <div className="flex items-start mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center h-6">
              <input
                id="customFeatures"
                type="checkbox"
                checked={customFeatures}
                onChange={(e) => setCustomFeatures(e.target.checked)}
                className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700"
              />
            </div>
            <div className="ml-4 text-sm">
              <label htmlFor="customFeatures" className="font-semibold text-slate-900 dark:text-white cursor-pointer">
                Mon projet nécessite des fonctionnalités sur mesure très complexes
              </label>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Ex: Intégrations de paiement locales multiples, géolocalisation avancée, temps réel, système de réservation massif...</p>
            </div>
          </div>

          {/* Section Résultat et Appel à l'action */}
          <div className="mt-10 bg-indigo-50 dark:bg-slate-800/80 rounded-2xl border border-indigo-100 dark:border-slate-700 overflow-hidden">
            <div className="p-8 text-center border-b border-indigo-100 dark:border-slate-700/80">
              <span className="text-sm font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-100/50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">Résumé de l'Estimation</span>
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mt-6 mb-2">Budget approximatif (Fourchette)</h3>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-2 flex-wrap">
                <span>{minBudget.toLocaleString()}</span> 
                <span className="text-xl md:text-2xl text-slate-400 font-normal">à</span> 
                <span>{maxBudget.toLocaleString()}</span> 
                <span className="text-2xl md:text-3xl text-indigo-600 font-bold ml-1">FCFA</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-4">
                *Cette estimation budgétaire est fournie à titre indicatif et ne constitue pas un devis final. Elle peut varier selon le cahier des charges détaillé.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-900 flex justify-center">
              <a
                href="#contact"
                className="inline-flex justify-center items-center gap-2 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 text-base"
              >
                Discuter de ce budget avec un expert
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectEstimator;
