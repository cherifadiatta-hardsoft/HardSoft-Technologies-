import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageProvider';
import { 
  Smartphone, Globe, Zap, Package, Activity, Building, GraduationCap, ArrowRight, MessageSquare, TrendingUp,
  User, Phone, Mail, Sparkles, Send, CheckCircle, ShieldCheck
} from 'lucide-react';

export default function SaaSOffer() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    sector: isFr ? 'Logistique, Livraison & Flotte' : 'Logistics, Delivery & Fleet Operations',
    projectDesc: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'fullname':
        return !value.trim() ? (isFr ? 'Le nom est requis' : 'Name is required') : '';
      case 'phone':
        if (!value.trim()) return isFr ? 'Le numéro de téléphone est requis' : 'Phone number is required';
        return !/^\+?\d{9,15}$/.test(value.replace(/[\s-]/g, '')) ? (isFr ? 'Format de téléphone invalide' : 'Invalid phone format') : '';
      case 'email':
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return isFr ? "Format d'email invalide" : "Invalid email format";
        }
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields on submit
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (Object.keys(newErrors).length > 0) return;
    
    setIsSubmitting(true);
    
    // Simulate real server response for local storage/validation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const WHATSAPP_NUMBER = "221781466421";
  const whatsappMessage = encodeURIComponent(
    isFr 
      ? "Bonjour HardSoft Technologies ! J'aimerais discuter avec un architecte de ma vision pour concevoir un SaaS sur mesure au Sénégal."
      : "Hello HardSoft Technologies! I would like to discuss my ideas with a SaaS architect regarding bespoke software product scaling in Senegal."
  );

  const generateSubmittedWhatsAppMessage = () => {
    const msg = isFr 
      ? `Bonjour HardSoft Technologies ! Je suis ${formData.fullname} (Tél: ${formData.phone}). Je viens de soumettre ma demande de démo express de SaaS pour le secteur "${formData.sector}" (Email: ${formData.email || 'Aucun'}). Discutons de mon projet !`
      : `Hello HardSoft Technologies! I'm ${formData.fullname} (Tel: ${formData.phone}). I have just submitted my express SaaS demo request for the "${formData.sector}" sector (Email: ${formData.email || 'None'}). Let's discuss my project!`;
    return encodeURIComponent(msg);
  };

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
            className="bg-[#121826] p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all group duration-300 flex flex-col"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 transition-transform group-hover:scale-110">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              {isFr ? "100% Mobile-First & Cloud" : "100% Mobile-First & Cloud"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {isFr 
                ? "Vos équipes ou clients accèdent à la plateforme depuis n'importe quel smartphone à Dakar ou en région. Pas besoin d'infrastructures lourdes chez vous."
                : "Your internal staff or external customers access secure data from any entry-level Android or iOS phone in Dakar or regional centers. Zero local servers required on your end."}
            </p>
            <div className="mt-auto">
              <a href="#demande-demo-express" className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                {isFr ? "Demander une démo" : "Request a demo"} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#121826] p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all group duration-300 flex flex-col"
          >
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 transition-transform group-hover:scale-110">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              {isFr ? "Ancré dans la Réalité Locale" : "Anchored in Local Reality"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
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
            <div className="mt-auto">
              <a href="#demande-demo-express" className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors">
                {isFr ? "Demander une démo" : "Request a demo"} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#121826] p-6 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all group duration-300 flex flex-col"
          >
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-4 transition-transform group-hover:scale-110">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              {isFr ? "Automatisé avec n8n" : "Automated with n8n"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {isFr 
                ? "Des workflows intelligents qui travaillent pour vous en arrière-plan : relances, synchronisation des stocks et rapports financiers en temps réel."
                : "Intelligent background sync processes running around the clock: automated reminders, high-frequency stock alignment, and real-time financial margin summaries."}
            </p>
            <div className="mt-auto">
              <a href="#demande-demo-express" className="inline-flex items-center gap-2 text-sm font-bold text-green-400 hover:text-green-300 transition-colors">
                {isFr ? "Demander une démo" : "Request a demo"} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
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
                <div className="shrink-0 mt-2 md:mt-0">
                  <a href="#demande-demo-express" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg transition-colors">
                    {isFr ? "Demander une démo" : "Request a demo"} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-800/80 pb-6 last:border-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
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
                <div className="shrink-0 mt-2 md:mt-0">
                  <a href="#demande-demo-express" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg transition-colors">
                    {isFr ? "Demander une démo" : "Request a demo"} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-800/80 pb-6 last:border-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
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
                <div className="shrink-0 mt-2 md:mt-0">
                  <a href="#demande-demo-express" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg transition-colors">
                    {isFr ? "Demander une démo" : "Request a demo"} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-800/80 pb-6 last:border-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
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
                <div className="shrink-0 mt-2 md:mt-0">
                  <a href="#demande-demo-express" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg transition-colors">
                    {isFr ? "Demander une démo" : "Request a demo"} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
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

        {/* Ultimate Call To Action Split Layout with Live Express Demo Request Form */}
        <div id="demande-demo-express" className="bg-gradient-to-br from-indigo-950 via-[#121826] to-[#0b0f19] border border-indigo-500/30 rounded-3xl p-6 md:p-10 relative overflow-hidden text-left shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 relative z-10 items-stretch">
            {/* Left Column: Context Call */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-indigo-500/15 text-indigo-300 text-[10px] font-extrabold tracking-wider uppercase px-3.5 py-1 rounded-full border border-indigo-500/20 font-mono mb-4">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
                  {isFr ? "Option exclusive" : "Exclusive option"}
                </span>
                
                <h3 className="text-2xl md:text-3.5xl font-extrabold text-white mb-4 font-display tracking-tight leading-tight">
                  {isFr ? "Prêt à transformer votre vision en un actif puissant ?" : "Ready to Turn Your Vision Into an Asset?"}
                </h3>
                
                <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
                  {isFr 
                    ? "Ne laissez pas des processus artisanaux ou des logiciels génériques freiner la croissance de votre entreprise. Remplissez le formulaire express pour obtenir une démo interactive calibrée sur votre marché par notre équipe."
                    : "Don't let manual administration spreadsheets hold back your dynamic expansion. Complete our express form to get an interactive demo customized for your specific sector."}
                </p>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {isFr 
                        ? "Démonstration fonctionnelle générée en 48/72 heures" 
                        : "Functional interactive prototype ready in 48/72 hours"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {isFr 
                        ? "Consultation préalable d'architecture 100% gratuite" 
                        : "Initial systems architecture consultation 100% free"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {isFr 
                        ? "Strict respect de la confidentialité et accord de NDA sur demande" 
                        : "Full corporate privacy safeguards & standard NDAs available"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Auxiliary Quick Links */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-4">
                <a 
                  href="#estimateur" 
                  className="text-xs font-semibold text-slate-300 hover:text-indigo-400 flex items-center gap-1 transition-colors group cursor-pointer"
                >
                  <span>{isFr ? "Calculer mon budget d'abord" : "Estimate my budget first"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Live Form */}
            <div className="lg:col-span-7 bg-[#0e1422]/90 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl relative min-h-[380px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="demo-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
                      <div>
                        <h4 className="text-base font-bold text-white font-display">
                          {isFr ? "Formulaire de Démo Express" : "Express Demo Request"}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {isFr ? "Complétez ces détails pour concevoir votre univers SaaS." : "Provide these details to map your custom SaaS application."}
                        </p>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-teal-900/20">
                        {isFr ? "Gratuit" : "Free"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          {isFr ? "Nom & Prénom" : "Full Name"} <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="text" 
                            name="fullname"
                            placeholder={isFr ? "Ex: Amadou Diop" : "e.g., Amadou Diop"}
                            value={formData.fullname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full bg-[#121826] border ${errors.fullname && touched.fullname ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors`}
                          />
                        </div>
                        {errors.fullname && touched.fullname && <p className="text-red-500 text-[10px] mt-1">{errors.fullname}</p>}
                      </div>

                      {/* Phone input */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          {isFr ? "Numéro de Téléphone" : "Phone Number"} <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="tel" 
                            name="phone"
                            placeholder="Ex: +221 77 123 45 67"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full bg-[#121826] border ${errors.phone && touched.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors`}
                          />
                        </div>
                        {errors.phone && touched.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email input */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          {isFr ? "Adresse Email" : "Email Address"}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="email" 
                            name="email"
                            placeholder="Ex: contact@entreprise.sn"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full bg-[#121826] border ${errors.email && touched.email ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors`}
                          />
                        </div>
                        {errors.email && touched.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                      </div>

                      {/* Sector dropdown */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          {isFr ? "Secteur d'Activité" : "Industry / Sector"}
                        </label>
                        <select 
                          name="sector"
                          value={formData.sector}
                          onChange={handleChange}
                          className="w-full bg-[#121826] border border-slate-800 rounded-lg py-2 px-3 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                        >
                          {isFr ? (
                            <>
                              <option value="Logistique, Livraison & Flotte">Logistique, Livraison & Flotte</option>
                              <option value="Santé & Officine Médicale">Santé & Officine Médicale</option>
                              <option value="Immobilier & Gestion Locative">Immobilier & Gestion Locative</option>
                              <option value="Écoles & Institut de Formation">Écoles & Institut de Formation</option>
                              <option value="Finance & Fintech">Finance & Fintech</option>
                              <option value="Commerce & POS">Commerce & Point de Vente (POS)</option>
                              <option value="Autre SaaS Personnalisé">Autre SaaS Personnalisé</option>
                            </>
                          ) : (
                            <>
                              <option value="Logistics, Delivery & Fleet Operations">Logistics, Delivery & Fleet Operations</option>
                              <option value="Healthcare & Medical Networks">Healthcare & Medical Networks</option>
                              <option value="Real Estate & Rent Collection">Real Estate & Rent Collection</option>
                              <option value="Schools & Educational Platforms">Schools & Educational Platforms</option>
                              <option value="Finance & Fintech">Finance & Fintech</option>
                              <option value="Retail & POS Terminals">Retail & Points of Sale (POS)</option>
                              <option value="Other Custom SaaS ideas">Other Custom SaaS ideas</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Brief description */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        {isFr ? "Décrivez brièvement votre besoin" : "Briefly describe your requirements"}
                      </label>
                      <textarea 
                        name="projectDesc"
                        rows={2}
                        placeholder={isFr ? "Ex: Automatiser la gestion locative avec relance par WhatsApp et Wave..." : "e.g., Automate rent collection via WhatsApp and Wave payments..."}
                        value={formData.projectDesc}
                        onChange={handleChange}
                        className="w-full bg-[#121826] border border-slate-800 rounded-lg py-2 px-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-extrabold rounded-lg text-sm transition-all focus:outline-none shadow-lg shadow-indigo-950/40 cursor-pointer text-center flex items-center justify-center gap-2 overflow-hidden group hover:scale-[1.01]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{isFr ? "Transmission en cours..." : "Submitting your details..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          <span>{isFr ? "Obtenir mon architecture et ma démo" : "Get My Custom SaaS Architecture & Demo"}</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-slate-600 flex items-center justify-center gap-1.5 font-sans">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                      <span>{isFr ? "Données cryptées & 100% sécurisées. Réponse garantie sous 24h." : "Data encrypted & 100% confidential. Live reply in 24h."}</span>
                    </p>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center space-y-6 py-6"
                  >
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/20">
                      <CheckCircle className="w-8 h-8 animate-bounce" />
                    </div>

                    <div className="font-sans">
                      <h4 className="text-xl md:text-2xl font-black text-white font-display">
                        {isFr ? `Merci ${formData.fullname} !` : `Thank You, ${formData.fullname}!`}
                      </h4>
                      <p className="text-slate-300 text-xs md:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                        {isFr 
                          ? "Votre demande a été analysée avec succès par nos ingénieurs. Nous allons concevoir une ébauche d'architecture et de maquette personnalisée pour votre projet."
                          : "Your express inquiry is successfully cataloged. Our engineers will draft a custom system diagram and prototype interface for your sector."}
                      </p>
                    </div>

                    <div className="bg-[#121826] p-4.5 rounded-xl border border-slate-800/80 max-w-sm mx-auto text-left gap-1.5 flex flex-col font-sans">
                      <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest font-mono">
                        {isFr ? "Synthèse de votre Envoi" : "Inquiry Summary"}
                      </div>
                      <div className="text-xs text-slate-300 space-y-1 mt-1 font-mono">
                        <div><strong className="text-slate-500">{isFr ? "Secteur :" : "Sector:"}</strong> {formData.sector}</div>
                        <div><strong className="text-slate-500">{isFr ? "Téléphone :" : "Phone:"}</strong> {formData.phone}</div>
                        {formData.email && <div><strong className="text-slate-500">Email :</strong> {formData.email}</div>}
                      </div>
                    </div>

                    {/* Direct-Action WhatsApp Acceleration */}
                    <div className="space-y-3 max-w-md mx-auto font-sans">
                      <a 
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${generateSubmittedWhatsAppMessage()}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full relative py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm transition-all shadow-lg shadow-emerald-950/30 flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <MessageSquare className="w-5 h-5 animate-pulse text-white" />
                        <span>{isFr ? "Accélérer la démo sur WhatsApp" : "Accelerate My Demo on WhatsApp"}</span>
                      </a>
                      
                      <button 
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ fullname: '', phone: '', email: '', sector: isFr ? 'Logistique' : 'Logistics', projectDesc: '' });
                        }}
                        className="text-xs text-slate-500 hover:text-slate-400 underline transition-colors cursor-pointer"
                      >
                        {isFr ? "Soumettre une autre demande" : "Submit another request"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
