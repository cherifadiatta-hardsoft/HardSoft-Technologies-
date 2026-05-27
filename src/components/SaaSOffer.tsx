import { motion } from 'motion/react';
import { useLanguage } from './LanguageProvider';
import { 
  Smartphone, Globe, Zap, Package, Activity, Building, GraduationCap, ArrowRight, MessageSquare, TrendingUp 
} from 'lucide-react';

export default function SaaSOffer() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const WHATSAPP_NUMBER = "221781466421";
  const whatsappMessage = encodeURIComponent(
    isFr 
      ? "Bonjour HardSoft Technologies ! J'aimerais discuter avec un architecte de ma vision pour concevoir un SaaS sur mesure au Sénégal."
      : "Hello HardSoft Technologies! I would like to discuss my ideas with a SaaS architect regarding bespoke software product scaling in Senegal."
  );

  return (
    <section 
      id="saas-offer" 
      data-seo-title={isFr ? "Solution SaaS Sur-Mesures au Sénégal | HardSoft Technologies" : "Bespoke SaaS Solutions in Senegal | HardSoft Technologies"} 
      data-seo-description={isFr ? "Digitalisez, centralisez vos services et optimisez vos processus administratifs grâce aux applications SaaS mobiles sur-mesure de HardSoft." : "Scale up, centralize operations and automate workflows with high-performance custom cloud databases and bespoke SaaS programs by HardSoft."}
      className="bg-[#0b0f19] text-gray-200 py-24 px-6 md:px-8 font-sans border-t border-slate-800"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-purple-900/50 text-purple-400 text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full border border-purple-500/30 font-display"
          >
            {isFr ? "Nouvelle Offre Stratégique" : "New Strategic Offer"}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white mt-5 tracking-tight leading-tight font-display"
          >
            {isFr ? (
              <>
                L’Ère du SaaS sur Mesure au Sénégal : <br className="hidden md:inline"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                  Digitalisez, Centralisez, Dominez votre Marché.
                </span>
              </>
            ) : (
              <>
                The Bespoke SaaS Era in Senegal: <br className="hidden md:inline"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                  Digitally Automate, Centralize, Lead Your Industry.
                </span>
              </>
            )}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-left md:text-center"
          >
            {isFr ? (
              <>
                Bonjour, je suis ravi de vous présenter notre vision chez <strong className="text-white">HardSoft Technologies</strong>. Si vous êtes sur cette page, c’est que vous savez qu'un logiciel standard conçu à l'étranger ne s'adapte pas aux réalités et à la vitesse du marché sénégalais. Pour propulser votre activité, il vous faut un <strong className="text-purple-400">SaaS (Software as a Service) sur mesure</strong> : une plateforme cloud ultra-accessible qui automatise vos processus ou génère des revenus récurrents par abonnement.
              </>
            ) : (
              <>
                Welcome! I am glad to share our mission here at <strong className="text-white">HardSoft Technologies</strong>. If you arrived here, you already understand that offshore, standardized software packages fail to catch the local rhythms and speed of the West African markets. To propel your company forward, a <strong className="text-purple-400">bespoke SaaS (Software as a Service) system</strong> is required: an ultra-accessible, mobile-first cloud database designed from scratch to streamline your custom workflows or unlock recurring subscription incomes.
              </>
            )}
          </motion.p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#121826] p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all group duration-300"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 transition-transform group-hover:scale-110">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              {isFr ? "100% Mobile-First & Cloud" : "100% Mobile-First & Cloud"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isFr 
                ? "Vos équipes ou clients accèdent à la plateforme depuis n'importe quel smartphone à Dakar ou en région. Pas besoin d'infrastructures lourdes chez vous."
                : "Your internal staff or external customers access secure data from any entry-level Android or iOS phone in Dakar or regional centers. Zero local servers required on your end."}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#121826] p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all group duration-300"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 transition-transform group-hover:scale-110">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              {isFr ? "Ancré dans la Réalité Locale" : "Anchored in Local Reality"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isFr ? (
                <>
                  Interconnexion native avec les paiements incontournables (<strong className="text-gray-300">Wave, Orange Money, TouchPay</strong>) et notifications automatisées via l'<strong className="text-gray-300">API WhatsApp Cloud</strong>.
                </>
              ) : (
                <>
                  Native checkouts and API hookups with critical regional wallets (<strong className="text-gray-300">Wave, Orange Money, TouchPay</strong>) combined with instant, automated user alert alerts via the <strong className="text-gray-300">WhatsApp Cloud API</strong>.
                </>
              )}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#121826] p-6 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all group duration-300"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-4 transition-transform group-hover:scale-110">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              {isFr ? "Automatisé avec n8n" : "Automated with n8n"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isFr 
                ? "Des workflows intelligents qui travaillent pour vous en arrière-plan : relances, synchronisation des stocks et rapports financiers en temps réel."
                : "Intelligent background sync processes running around the clock: automated reminders, high-frequency stock alignment, and real-time financial margin summaries."}
            </p>
          </motion.div>

        </div>

        {/* Sectors urgency checklist cards */}
        <div className="bg-[#121826] rounded-3xl p-6 md:p-10 border border-gray-800 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-2 font-display">
            {isFr ? "Quels secteurs ont une urgence absolue d'un SaaS ?" : "Which Sectors Need an Urgent SaaS Shift?"}
          </h3>
          <p className="text-gray-400 text-center text-sm mb-8 max-w-xl mx-auto">
            {isFr 
              ? "Si vous opérez dans l’un de ces secteurs au Sénégal, chaque jour sans outil sur mesure vous fait perdre du terrain."
              : "If you operate in any of these spaces in West Africa, every day running on paper or generic tools is leaking valuable efficiency and margins."}
          </p>
          
          <div className="space-y-6">
            
            <div className="border-b border-gray-800/80 pb-6 last:border-0 last:pb-0">
              <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2 font-display">
                <Package className="w-5 h-5" />
                {isFr ? "Logistique, Livraison & Flotte" : "Logistics, Delivery & Fleet Operations"}
              </h4>
              <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                {isFr ? (
                  <>
                    <span className="text-red-400 font-bold">Le problème :</span> Suivi de coursier approximatif et clients qui saturent vos lignes. <br className="hidden md:inline"/>
                    <span className="text-green-400 font-bold">La solution SaaS :</span> Un dispatching centralisé générant des liens de suivi précis envoyés automatiquement sur WhatsApp aux clients.
                  </>
                ) : (
                  <>
                    <span className="text-red-400 font-bold">The Problem:</span> Approximate courier live-tracking and client calls continuously saturating your support agents. <br className="hidden md:inline"/>
                    <span className="text-green-400 font-bold">Our SaaS Answer:</span> Unified central dispatcher automatically sending high-precision tracking links to recipients on WhatsApp.
                  </>
                )}
              </p>
            </div>

            <div className="border-b border-gray-800/80 pb-6 last:border-0 last:pb-0">
              <h4 className="text-lg font-bold text-purple-400 flex items-center gap-2 font-display">
                <Activity className="w-5 h-5" />
                {isFr ? "Santé & Officines Médicales" : "Healthcare & Medical Networks"}
              </h4>
              <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                {isFr ? (
                  <>
                    <span className="text-red-400 font-bold">Le problème :</span> Gestion des dossiers sur papier et opacité des stocks entre plusieurs cliniques ou pharmacies de garde. <br className="hidden md:inline"/>
                    <span className="text-green-400 font-bold">La solution SaaS :</span> Un écosystème cloud hautement sécurisé pour centraliser les données patients et suivre l'état des stocks d'urgence en direct.
                  </>
                ) : (
                  <>
                    <span className="text-red-400 font-bold">The Problem:</span> Messy paper health cards and total opacity on stocks rotating across multiple clinics or on-duty pharmacy branches. <br className="hidden md:inline"/>
                    <span className="text-green-400 font-bold">Our SaaS Answer:</span> A robust, HIPAA-style cloud matrix centralizing patient charts and keeping instant track of medical stocks live.
                  </>
                )}
              </p>
            </div>

            <div className="border-b border-gray-800/80 pb-6 last:border-0 last:pb-0">
              <h4 className="text-lg font-bold text-green-400 flex items-center gap-2 font-display">
                <Building className="w-5 h-5" />
                {isFr ? "Immobilier & Gestion Locative" : "Real Estate & Rent Collection"}
              </h4>
              <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                {isFr ? (
                  <>
                    <span className="text-red-400 font-bold">Le problème :</span> Retards de loyers complexes à suivre et édition manuelle fastidieuse des quittances. <br className="hidden md:inline"/>
                    <span className="text-green-400 font-bold">La solution SaaS :</span> Relances automatisées via WhatsApp, interconnexion directe avec Wave/Orange Money, et tableau de bord de rentabilité pour les propriétaires.
                  </>
                ) : (
                  <>
                    <span className="text-red-400 font-bold">The Problem:</span> Stressful follow-ups on late rent payments and tedious manual printing of physical payment receipts. <br className="hidden md:inline"/>
                    <span className="text-green-400 font-bold">Our SaaS Answer:</span> Automatic WhatsApp reminders, native Orange Money / Wave click-to-pay integration, and instant profitability dashboards for property owners.
                  </>
                )}
              </p>
            </div>

            <div className="border-b border-gray-800/80 pb-6 last:border-0 last:pb-0">
              <h4 className="text-lg font-bold text-yellow-400 flex items-center gap-2 font-display">
                <GraduationCap className="w-5 h-5" />
                {isFr ? "Écoles & Instituts de Formation" : "Schools & Academic Platforms"}
              </h4>
              <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                {isFr ? (
                  <>
                    <span className="text-red-400 font-bold">Le problème :</span> Mensualités impayées difficiles à recouvrir et fiches de notes éparpillées. <br className="hidden md:inline"/>
                    <span className="text-green-400 font-bold">La solution SaaS :</span> Un portail académique centralisé qui alerte instantanément les parents par SMS/WhatsApp en cas de retard de scolarité ou d'absence.
                  </>
                ) : (
                  <>
                    <span className="text-red-400 font-bold">The Problem:</span> School tuition dues slipping through manual logs and fragmented Excel grade systems. <br className="hidden md:inline"/>
                    <span className="text-green-400 font-bold">Our SaaS Answer:</span> Centralized student database alerting parents automatically via WhatsApp/SMS for pending tuition deadlines or sudden absences.
                  </>
                )}
              </p>
            </div>

          </div>
        </div>

        {/* Static Tech Stack Badges */}
        <div className="text-center mb-16 bg-[#0e1422] py-8 rounded-2xl border border-gray-800/60 font-sans">
          <p className="text-xs uppercase font-bold tracking-widest text-slate-500 mb-4 font-display">
            {isFr ? "Notre Stack Technologique de Pointe" : "Our Modern Technology Stack"}
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-mono text-gray-400 px-4">
            <span className="bg-[#161f32] px-3.5 py-1.5 rounded-lg border border-gray-800/85 font-medium">React / Next.js</span>
            <span className="bg-[#161f32] px-3.5 py-1.5 rounded-lg border border-gray-800/85 font-medium">Flutter</span>
            <span className="bg-[#161f32] px-3.5 py-1.5 rounded-lg border border-gray-800/85 font-medium">Python (FastAPI / Django)</span>
            <span className="bg-[#161f32] px-3.5 py-1.5 rounded-lg border border-gray-800/85 font-medium">PHP (Laravel)</span>
            <span className="bg-[#161f32] px-3.5 py-1.5 rounded-lg border border-gray-800/85 font-medium">Node.js</span>
            <span className="bg-[#161f32] px-3.5 py-1.5 rounded-lg border border-gray-800/85 font-medium">n8n Automation</span>
            <span className="bg-[#161f32] px-3.5 py-1.5 rounded-lg border border-gray-800/85 font-medium font-bold text-indigo-400">WhatsApp Cloud API</span>
          </div>
        </div>

        {/* SaaS Success Case: Pharma24 Spotlight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#121826]/70 border border-indigo-500/10 rounded-3xl p-6 md:p-10 mb-16 relative overflow-hidden text-left font-sans"
        >
          {/* Ambient light streak */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col lg:flex-row items-stretch gap-8">
            
            {/* Left Column: Success Overview and Context */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border border-emerald-500/20 font-mono">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {isFr ? "Étude de Cas Réel" : "Real Case Study"}
                  </span>
                  <span className="text-xs font-mono text-slate-550">Pharma24</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-display mb-3">
                  {isFr ? "Pharma24 : Automatisation de la Santé d'Urgence" : "Pharma24: Emergency Healthcare Automation"}
                </h3>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                  {isFr 
                    ? "Déployé en partenariat avec les officines locales au Sénégal, Pharma24 est un système SaaS intelligent qui centralise la disponibilité des médicaments critiques en direct et automatise les réservations via un assistant WhatsApp autonome connecté aux API de paiements locaux."
                    : "Deployed in collaboration with West African health hubs, Pharma24 is an automated cloud SaaS that centralizes real-time distribution charts for critical pharmaceuticals, managing bookings via an autonomous WhatsApp bot synced to local payment gateways."}
                </p>
                
                {/* Visual stats panel in mini layout */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-[#161f32]/60 p-4 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-indigo-400 font-display">320+</div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono mt-1">
                      {isFr ? "Pharmacies connectées" : "Connected Pharmacies"}
                    </div>
                  </div>
                  <div className="bg-[#161f32]/60 p-4 rounded-xl border border-slate-800">
                    <div className="text-2xl font-black text-emerald-400 font-display font-bold">45,000+</div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono mt-1">
                      {isFr ? "Vérifications / Mois" : "Monthly Live Matches"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stack items linked */}
              <div className="mt-6 flex flex-wrap items-center gap-2 pt-6 border-t border-slate-800/60 text-xs text-slate-500">
                <span className="text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider">{isFr ? "MOTEURS INTÉGRÉS :" : "INTEGRATED ENGINES:"}</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">n8n Flows</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">Wave API</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">Orange Money</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-400">WhatsApp API</span>
              </div>
            </div>

            {/* Right Column: Visual Interactive Progress Bars of Efficiency Gains */}
            <div className="w-full lg:w-[420px] bg-[#0e1422] border border-slate-800 p-6 rounded-2xl flex flex-col justify-center">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-display">
                    {isFr ? "Gain Global d'Efficacité" : "Overall Automation Yield"}
                  </span>
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-mono">
                    +92%
                  </span>
                </div>
                {/* Master Progress Bar */}
                <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden p-[2px] border border-slate-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "92%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className="p-3 bg-[#121826]/50 rounded-xl border border-slate-800/40">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">{isFr ? "Mise à Jour des Stocks" : "Live Inventory Updates"}</span>
                    <span className="font-mono text-emerald-400 font-bold">94% {isFr ? "Auto" : "Auto"}</span>
                  </div>
                  <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "94%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {isFr ? "Remplacement complet de l'encaissement manuel fastidieux." : "Saves pharmacies hours of daily manual status updates."}
                  </p>
                </div>

                <div className="p-3 bg-[#121826]/50 rounded-xl border border-slate-800/40">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">{isFr ? "Réduction des Appels Urgents" : "Support Load Reduction"}</span>
                    <span className="font-mono text-blue-400 font-bold">85% {isFr ? "Résolu" : "Solved"}</span>
                  </div>
                  <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {isFr ? "Routage instantané vers le bot WhatsApp automatisé." : "Over 85% of medicine availability queries resolved via AI bot."}
                  </p>
                </div>

                <div className="p-3 bg-[#121826]/50 rounded-xl border border-slate-800/40">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">{isFr ? "Sécurisation des Réserves" : "Pre-booking Secure Payments"}</span>
                    <span className="font-mono text-purple-400 font-bold">99.2% {isFr ? "Précis" : "Accurate"}</span>
                  </div>
                  <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "99.2%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      className="h-full bg-purple-500 rounded-full"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {isFr ? "Validation cryptographique Wave & OM temps réel." : "Live algorithmic validations prevent pharmacy over-bookings."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Ultimate Call To Action Gradient Card */}
        <div className="bg-gradient-to-br from-indigo-950 via-[#121826] to-[#0b0f19] border border-indigo-500/30 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display tracking-tight">
            {isFr ? "Prêt à transformer votre vision en un actif puissant ?" : "Ready to Turn Your Vision Into an Asset?"}
          </h3>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            {isFr 
              ? "Ne laissez pas des processus artisanaux ou des logiciels génériques freiner la croissance de votre entreprise. Configurons ensemble le SaaS taillé pour vos ambitions."
              : "Don't let manual administration spreadsheets hold back your dynamic expansion. Let's configure the exact SaaS product required to lead your target market."}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <a 
              href="#estimateur" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl shadow-purple-950/20 text-center text-sm md:text-base cursor-pointer hover:scale-[1.01]"
            >
              {isFr ? "Estimer mon projet en 1 min" : "Estimate my project in 1 min"}
            </a>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#161f32] hover:bg-[#1e2942] text-white font-semibold px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-650 transition-all flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>{isFr ? "Parler avec un architecte SaaS" : "Talk with a SaaS Architect"}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
