import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';

const ProjectEstimator = () => {
  const { language, t } = useLanguage();
  const isFr = language === 'fr';

  // Constantes de tarification de base (en FCFA)
  const MIN_LOGICIEL = 250000;
  const MIN_SITE_WEB = 100000;
  const MIN_AUTRES = 50000;

  // États du formulaire
  const [service, setService] = useState('logiciel');
  const [companySize, setCompanySize] = useState('pme');
  const [techStack, setTechStack] = useState('standard');
  const [selectedSubTechs, setSelectedSubTechs] = useState<string[]>([]);
  const [customFeatures, setCustomFeatures] = useState(false);
  const [estimatedBudget, setEstimatedBudget] = useState(0);
  const [copied, setCopied] = useState(false);

  // Configuration copy summary generator to improve visitor conversions
  const handleCopyConfig = () => {
    const serviceName = service === 'logiciel' 
      ? (isFr ? 'Logiciel / Application Mobile' : 'Software / Mobile App')
      : service === 'siteweb'
      ? (isFr ? 'Site Internet' : 'Website')
      : (isFr ? 'Configuration / Autre' : 'Configuration / Other');
      
    const sizeName = companySize === 'startup'
      ? (isFr ? 'Startup / Porteur de projet' : 'Individual / Startup')
      : companySize === 'pme'
      ? (isFr ? 'PME / Entreprise locale' : 'SME / Local Business')
      : (isFr ? 'Grande Entreprise' : 'Enterprise');
      
    const stackName = techStack === 'standard'
      ? (isFr ? 'Standard (CMS, PHP / Laravel)' : 'Standard (CMS, PHP / Laravel)')
      : (isFr ? `Sur-mesure complexe (${selectedSubTechs.length > 0 ? selectedSubTechs.join(', ') : 'Next.js / Cloud'})` : `Bespoke (${selectedSubTechs.length > 0 ? selectedSubTechs.join(', ') : 'Next.js / Cloud'})`);

    const textBrief = isFr 
      ? `Estimation Projet HardSoft Technologies :
• Solution : ${serviceName}
• Profil client : ${sizeName}
• Stack demandée : ${stackName}
• Besoins complexes : ${customFeatures ? 'Oui' : 'Non'}
• Budget estimé : ${minBudget.toLocaleString()} - ${maxBudget.toLocaleString()} FCFA`
      : `Project Brief Estimation | HardSoft Technologies:
• Requested Solution: ${serviceName}
• Profile size: ${sizeName}
• Technical stack: ${stackName}
• Custom core complex needs: ${customFeatures ? 'Yes' : 'No'}
• Total budget approximation: ${minBudget.toLocaleString()} - ${maxBudget.toLocaleString()} FCFA`;

    navigator.clipboard.writeText(textBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Subtech definition with custom coefficient factors or flat cost additions in FCFA
  const SUB_TECHS = [
    { id: 'nextjs', labelFr: 'React / Next.js (Web Frontend)', labelEn: 'React / Next.js (Modern Web UI)', cost: 50000 },
    { id: 'flutter', labelFr: 'Flutter (Mobile Multiplateforme)', labelEn: 'Flutter (Cross-platform Mobile)', cost: 90000 },
    { id: 'python', labelFr: 'Python (Django, FastAPI - IA / Backend)', labelEn: 'Python (Django, FastAPI - AI / Backend)', cost: 70000 },
    { id: 'laravel', labelFr: 'PHP (Laravel, Symfony - App Métier)', labelEn: 'PHP (Laravel, Symfony - Business Logic)', cost: 50000 },
    { id: 'whatsapp', labelFr: 'WhatsApp Business Cloud API (Messagerie)', labelEn: 'WhatsApp Business Cloud API (Messaging)', cost: 85000 },
    { id: 'n8n', labelFr: 'Automatisation n8n (Workflows & Bots)', labelEn: 'n8n Workflow Automation (Sync & Bots)', cost: 80000 },
    { id: 'maps', labelFr: 'API Google Maps (Géolocalisation)', labelEn: 'Google Maps API (Geo-tracking)', cost: 40000 },
  ];

  // Reset selected subtechs when changing technology selection to standard
  useEffect(() => {
    if (techStack === 'standard') {
      setSelectedSubTechs([]);
    }
  }, [techStack]);

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

    // 3. Multiplicateur selon le choix technologique
    let techMultiplier = 1.0;
    if (techStack === 'avancee') techMultiplier = 1.35; // increased slightly for Whatsapp & n8n cloud hosting costs

    // 4. Besoins spécifiques / Fonctionnalités complexes
    let extraCost = customFeatures ? basePrice * 0.25 : 0; // +25% si besoins complexes

    // 5. Ajout des sous-technologies sélectionnées
    let subTechExtra = 0;
    if (techStack === 'avancee') {
      subTechExtra = selectedSubTechs.reduce((sum, techId) => {
        const matchingTech = SUB_TECHS.find(t => t.id === techId);
        return sum + (matchingTech ? matchingTech.cost : 0);
      }, 0);
    }

    // Calcul final
    const total = (basePrice * companyMultiplier * techMultiplier) + extraCost + subTechExtra;
    setEstimatedBudget(Math.round(total));
  }, [service, companySize, techStack, selectedSubTechs, customFeatures]);

  // Génération d'une fourchette (ex: -15% à +20%)
  const minBudget = Math.round(estimatedBudget * 0.85);
  const maxBudget = Math.round(estimatedBudget * 1.25);

  return (
    <section id="estimateur" className="py-24 px-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
        
        {/* En-tête */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 text-center text-white">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {isFr ? "Estimateur de Budget" : "Budget Estimator"}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-display tracking-tight mt-4">
            {t('estimator.title')}
          </h2>
          <p className="mt-3 text-sm md:text-base text-indigo-100 max-w-2xl mx-auto">
            {t('estimator.descr')}
          </p>
        </div>

        {/* Formulaire / Contenu */}
        <div className="p-8 md:p-10 space-y-8">
          
          {/* 1. Type de Service */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-955/60 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-xs shadow-sm shadow-indigo-500/5">
                1
              </span>
              <label className="block text-base font-bold text-slate-900 dark:text-white">
                {isFr ? "De quel type de solution avez-vous besoin ?" : "What type of solution do you need?"}
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setService('logiciel')}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                  service === 'logiciel'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="font-bold text-base md:text-lg mb-1">{isFr ? "Logiciel / App Mobile" : "Software / Mobile App"}</div>
                <div className="text-xs md:text-sm opacity-80 mt-2">
                  {isFr ? "Applications iOS/Android, Outils métiers, Logiciels SaaS..." : "iOS/Android apps, custom business tools, SaaS systems..."}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setService('siteweb')}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                  service === 'siteweb'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="font-bold text-base md:text-lg mb-1">{isFr ? "Site Internet" : "Website"}</div>
                <div className="text-xs md:text-sm opacity-80 mt-2">
                  {isFr ? "Sites vitrines, E-commerce, Portails web, Plateformes..." : "Showcase projects, E-commerce, custom portables, platforms..."}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setService('configuration')}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                  service === 'configuration'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 ring-2 ring-indigo-600/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="font-bold text-base md:text-lg mb-1">{isFr ? "Configuration / Autre" : "Configuration / Other"}</div>
                <div className="text-xs md:text-sm opacity-80 mt-2">
                  {isFr ? "Services cloud, infrastructure, cybersécurité, audits..." : "Cloud setups, automation systems, technical infrastructure..."}
                </div>
              </button>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* 2. Taille de l'entreprise */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-955/60 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-xs shadow-sm shadow-indigo-500/5">
                2
              </span>
              <label className="block text-base font-bold text-slate-900 dark:text-white">
                {isFr ? "Taille de votre structure / Envergure du projet" : "Scale of your company / Project scope"}
              </label>
            </div>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="startup">
                {isFr ? "Porteur de projet / Startup / Particulier" : "Individual Project / Tech Startup / Solo Venture"}
              </option>
              <option value="pme">
                {isFr ? "PME / Entreprise locale" : "SME / Local Established Business"}
              </option>
              <option value="grand_compte">
                {isFr ? "Grande Entreprise / Institution" : "Major Enterprise / Dynamic Institution"}
              </option>
            </select>
          </div>

          {/* 3. Choix Technologique */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-955/60 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-xs shadow-sm shadow-indigo-500/5">
                3
              </span>
              <label className="block text-base font-bold text-slate-900 dark:text-white">
                {isFr ? "Préférence technologique et architecture" : "Technology preference and architecture"}
              </label>
            </div>
            <select
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-505 transition-all cursor-pointer font-medium"
            >
              <option value="standard">
                {isFr 
                  ? "Standard (CMS, solutions low-code ou stacks classiques : WordPress, Shopify, HTML5 / CSS3, PHP / Laravel)" 
                  : "Standard (CMS, low-code solutions or classic stacks: WordPress, Shopify, HTML5 / CSS3, PHP / Laravel)"}
              </option>
              <option value="avancee">
                {isFr 
                  ? "Sur-mesure complexe (React, Next.js, Flutter, API WhatsApp, Automatisation n8n, Cloud)" 
                  : "Sur-mesure complexe (React, Next.js, Flutter, WhatsApp API, n8n Automation, Cloud)"}
              </option>
            </select>

            {/* Micro-checkbox list that loads dynamically when advanced stack is chosen */}
            {techStack === 'avancee' && (
              <div className="mt-4 p-5 rounded-2xl bg-indigo-55/10 dark:bg-slate-900/60 border border-indigo-200/20 dark:border-slate-800 animate-fadeIn space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-650 dark:text-indigo-400">
                    {isFr ? "Spécifications technologiques de votre projet" : "Custom Technology Specifications"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isFr ? "Optionnel - cochez pour affiner" : "Optional - tick to refine"}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {SUB_TECHS.map((tech) => {
                    const isChecked = selectedSubTechs.includes(tech.id);
                    return (
                      <label 
                        key={tech.id} 
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-white dark:bg-slate-950 border-indigo-500/30 shadow-sm' 
                            : 'bg-transparent border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 cursor-pointer"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSubTechs([...selectedSubTechs, tech.id]);
                            } else {
                              setSelectedSubTechs(selectedSubTechs.filter(id => id !== tech.id));
                            }
                          }}
                        />
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-850 dark:text-slate-200 block">
                            {isFr ? tech.labelFr : tech.labelEn}
                          </span>
                          <span className="text-[10px] bg-slate-200/60 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 font-extrabold px-1 py-0.2 rounded inline-block">
                            {isFr ? `+${tech.cost.toLocaleString()} FCFA est.` : `+${tech.cost.toLocaleString()} FCFA est.`}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 4. Besoins spécifiques additionnels */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
            <div className="flex items-center h-6">
              <input
                id="customFeatures"
                type="checkbox"
                checked={customFeatures}
                onChange={(e) => setCustomFeatures(e.target.checked)}
                className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-505 dark:border-slate-705 dark:bg-slate-950 cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="customFeatures" className="font-bold text-sm md:text-base text-slate-900 dark:text-white cursor-pointer select-none">
                {isFr ? "Optionnel : Besoins complexes ou fonctionnalités très spécifiques" : "Optional: Highly complex custom needs or specific requirements"}
              </label>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                {isFr 
                  ? "Ex: Intégration de paiements locaux (Wave, OM), authentification complexe, géolocalisation ou workflows d'arrière-plan avancés." 
                  : "E.g. Local payments api integration, complex user credentials, live geo-tracking or tailored background workflows."}
              </p>
            </div>
          </div>

          {/* Section Résultat et Appel à l'action */}
          <div className="mt-10 bg-indigo-50 dark:bg-slate-800/80 rounded-2xl border border-indigo-100 dark:border-slate-700 overflow-hidden">
            <div className="p-8 text-center border-b border-indigo-100 dark:border-slate-700/80">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-100/50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                {isFr ? "Résumé de l'Estimation" : "Estimated Budget Range"}
              </span>
              <h3 className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300 mt-6 mb-2">
                {isFr ? "Budget approximatif (Fourchette)" : "Approximate budget bracket"}
              </h3>
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-2 flex-wrap font-display">
                <span>{minBudget.toLocaleString()}</span> 
                <span className="text-lg md:text-xl text-slate-400 font-normal">{isFr ? "à" : "to"}</span> 
                <span>{maxBudget.toLocaleString()}</span> 
                <span className="text-xl sm:text-2xl md:text-3xl text-indigo-600 font-extrabold ml-1">{isFr ? "FCFA" : "FCFA"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-4 leading-relaxed">
                {isFr 
                  ? "*Cette estimation budgétaire est fournie à titre indicatif et ne constitue pas un devis final. Elle peut varier selon le cahier des charges détaillé." 
                  : "*This budgetary bracket is shared as guidance only and doesn't constitute a final binding contract. It naturally adjusts after detailed functional mapping."}
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleCopyConfig}
                className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold border transition-all cursor-pointer select-none active:scale-95 ${
                  copied 
                    ? 'bg-emerald-500/10 border-emerald-555 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm'
                }`}
              >
                {copied ? (isFr ? '✓ Configuration Copiée !' : '✓ Brief Copied!') : (isFr ? '📋 Copier résumé du projet' : '📋 Copy Brief Summary')}
              </button>
              
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-indigo-650 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 text-sm md:text-base cursor-pointer text-center"
              >
                {isFr ? "Discuter de ce budget avec un expert" : "Discuss this budget with an engineer"}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectEstimator;
