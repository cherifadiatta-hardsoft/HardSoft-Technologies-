import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Shield, Zap, Target, Flame, Lightbulb, GraduationCap, ChevronRight, CheckCircle2, Award, Calendar, Layers, Activity, X, Clock, Check, Video, Phone } from 'lucide-react';
import LazyImage from './LazyImage';
import cherifImg from '../assets/images/founder_profile_cherif_1779706726535.png';
import { useLanguage } from './LanguageProvider';

export default function About() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'enterprise' | 'methods' | 'founder'>('enterprise');

  // Scheduler modal and form states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [meetingType, setMeetingType] = useState<'intro' | 'tech' | 'architecture'>('intro');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Get dynamic working days helper (next 5 working days excluding Sunday/Saturday)
  const getNextWorkingDays = () => {
    const days = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    const current = new Date();
    let added = 0;
    
    while (added < 5) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sunday (0) and Saturday (6)
        const dateStr = current.toISOString().split('T')[0];
        const label = current.toLocaleDateString('fr-FR', options);
        days.push({ dateStr, label });
        added++;
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const workingDays = getNextWorkingDays();

  // Set default selected date once when working days are available, but don't cause infinite updates
  if (!selectedDate && workingDays.length > 0) {
    setSelectedDate(workingDays[0].dateStr);
  }

  const timeSlots = [
    "09:30 - 10:00",
    "10:30 - 11:00",
    "11:30 - 12:00",
    "14:30 - 15:00",
    "15:30 - 16:00",
    "16:30 - 17:00"
  ];

  if (!selectedTime) {
    setSelectedTime(timeSlots[0]);
  }

  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingEmail.trim()) return;
    
    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setBookingSubmitted(true);
    }, 1200);
  };

  const scrollToContact = () => {
    setIsBookingModalOpen(false);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getGoogleCalendarUrl = () => {
    try {
      if (!selectedDate || !selectedTime) return '';
      
      // selectedDate is in YYYY-MM-DD format, remove dashes to get YYYYMMDD
      const dateParts = selectedDate.replace(/-/g, '');
      const times = selectedTime.split(' - ');
      if (times.length !== 2) return '';
      
      const startTimeRaw = times[0].replace(':', '');
      const endTimeRaw = times[1].replace(':', '');
      
      const startDateTime = `${dateParts}T${startTimeRaw}00Z`;
      const endDateTime = `${dateParts}T${endTimeRaw}00Z`;
      
      const title = encodeURIComponent("Cadrage Projet Logique & Technique - HardSoft");
      const details = encodeURIComponent(
        `Session de cadrage de projet avec Chérif Alioune Diatta.\n\n` +
        `Client : ${bookingName} (${bookingEmail})\n` +
        `Type : ${meetingType === 'intro' ? 'Café Virtuel (15m)' : meetingType === 'tech' ? 'Démo Technique (30m)' : 'Cadrage Logiciel (45m)'}\n` +
        `Notes : ${bookingNotes || 'Aucune note spécifiée.'}\n\n` +
        `Visioconférence Google Meet`
      );
      const location = encodeURIComponent("Google Meet (En ligne)");
      
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime}/${endDateTime}&details=${details}&location=${location}`;
    } catch (e) {
      return '';
    }
  };

  const getShareEmailUrl = () => {
    try {
      const isFr = language === 'fr';
      const subject = encodeURIComponent(
        isFr 
          ? "Confirmation de Rendez-vous - HardSoft Technologies" 
          : "Meeting Confirmation - HardSoft Technologies"
      );
      const dateLabel = workingDays.find(d => d.dateStr === selectedDate)?.label || selectedDate;
      const typeLabel = meetingType === 'intro' 
        ? (isFr 
            ? '☕ Café Virtuel - Introduction & Prise de contact (15 minutes)' 
            : '☕ Virtual Coffee - Introduction & First contact (15 minutes)')
        : meetingType === 'tech' 
          ? (isFr 
              ? '💻 Démo Technique - Avis commercial & Technique (30 minutes)' 
              : '💻 Tech Demo - Commercial & Technical Overview (30 minutes)') 
          : (isFr 
              ? '🚀 Session de Cadrage de Projet Logiciel (45 minutes)' 
              : '🚀 Software Project Scoping Session (45 minutes)');
      
      const formattedNotes = bookingNotes?.trim() 
        ? `« ${bookingNotes.trim()} »` 
        : (isFr ? 'Aucune description ou note particulière fournie.' : 'No description or specific notes provided.');
      
      const emailBody = isFr ? (
        `Bonjour,\n\n` +
        `Voici le récapitulatif complet de la session de cadrage planifiée avec Chérif Alioune Diatta :\n\n` +
        `==================================================\n` +
        ` 📅 DÉTAILS DE LA RÉSERVATION\n` +
        `==================================================\n` +
        `• Objet du RDV : ${typeLabel}\n` +
        `• Date retenue : ${dateLabel}\n` +
        `• Heure locale : ${selectedTime} (GMT / Heure de Dakar)\n` +
        `• Plateforme  : Google Meet Visioconférence (Lien inclus dans l'invitation/agenda)\n\n` +
        `👤 INFORMATIONS VISITEUR\n` +
        `--------------------------------------------------\n` +
        `• Client principal : ${bookingName}\n` +
        `• Adresse E-mail   : ${bookingEmail}\n\n` +
        `📝 NOTES & PRÉCISIONS DU PROJET\n` +
        `--------------------------------------------------\n` +
        `${formattedNotes}\n\n` +
        `==================================================\n\n` +
        `Un e-mail d'invitation avec les accès sécurisés à la visioconférence (Google Meet) a été automatiquement généré pour l'adresse ${bookingEmail}.\n\n` +
        `Pour toute urgence ou question complémentaire, vous pouvez nous contacter via WhatsApp ou directement en répondant à ce courriel.\n\n` +
        `Cordialement,\n` +
        `Chérif Alioune Diatta\n` +
        `HardSoft Technologies\n` +
        `https://hardsoft-technologies.net`
      ) : (
        `Hello,\n\n` +
        `Here is the complete summary of the scoping session planned with Chérif Alioune Diatta :\n\n` +
        `==================================================\n` +
        ` 📅 RESERVATION DETAILS\n` +
        `==================================================\n` +
        `• Meeting Subject: ${typeLabel}\n` +
        `• Selected Date   : ${dateLabel}\n` +
        `• Local Time      : ${selectedTime} (GMT / Dakar Time)\n` +
        `• Platform        : Google Meet Videoconference (Link included in calendar invite)\n\n` +
        `👤 VISITOR INFORMATION\n` +
        `--------------------------------------------------\n` +
        `• Main Client : ${bookingName}\n` +
        `• Email       : ${bookingEmail}\n\n` +
        `📝 PROJECT NOTES & RECAP\n` +
        `--------------------------------------------------\n` +
        `${formattedNotes}\n\n` +
        `==================================================\n\n` +
        `An invitation email with secure access to the videoconference (Google Meet) has been automatically generated for ${bookingEmail}.\n\n` +
        `For any emergency or follow-up question, you can contact us via WhatsApp or directly by replying to this email.\n\n` +
        `Best regards,\n` +
        `Chérif Alioune Diatta\n` +
        `HardSoft Technologies\n` +
        `https://hardsoft-technologies.net`
      );
 
      return `mailto:?subject=${subject}&body=${encodeURIComponent(emailBody)}`;
    } catch (e) {
      return '';
    }
  };

  const expertises = [
    {
      title: "Applications Web & Platformes SaaS",
      description: "Conception d'architectures web modernes, rapides et hautement sécurisées (notamment avec React et Next.js) pour digitaliser vos processus métiers ou lancer votre produit sur le marché.",
      icon: "🌐",
      techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
      title: "Applications Mobiles Multiplateformes",
      description: "Développement d'applications intuitives et ultras performantes propulsées par Flutter, offrant une expérience utilisateur fluide d'une fluidité exceptionnelle sur Android et iOS.",
      icon: "📱",
      techs: ["Flutter", "Dart", "Android", "iOS"]
    },
    {
      title: "Automatisation & Intégration d'API",
      description: "Optimisation de vos flux de travail grâce à la connexion d'API tierces (Google Maps, services de paiement, outils de messagerie comme WhatsApp) et l'automatisation via des outils avancés comme n8n.",
      icon: "⚡",
      techs: ["n8n", "REST APIs", "Webhooks", "Stripe", "WhatsApp API"]
    },
    {
      title: "Gestion de Données & Backend Scalables",
      description: "Mise en place d'architectures de bases de données solides, sécurisées, résilientes et hautement scalables utilisant des technologies modernes comme Supabase et Firebase.",
      icon: "🗄️",
      techs: ["Firebase", "Supabase", "PostgreSQL", "Firestore"]
    }
  ];

  const methodologySteps = [
    {
      num: "01",
      title: "Cadrage & Co-conception",
      description: "Nous analysons attentivement vos besoins spécifiques pour concevoir le cahier des charges optimal et définir l'architecture technique idéale de votre futur logiciel."
    },
    {
      num: "02",
      title: "Développement Agile",
      description: "Vous suivez l'évolution et l'avancement du projet étape par étape grâce à des cycles de livraison courts (Sprints), transparents et directement testables."
    },
    {
      num: "03",
      title: "Tests & Déploiement",
      description: "Une phase stricte, rigoureuse et automatisée de contrôle qualité (QA) avant la mise en production sur des infrastructures cloud à haute disponibilité."
    },
    {
      num: "04",
      title: "Maintenance & Évolution",
      description: "Un accompagnement proactif continu pour s'assurer que votre logiciel s'adapte, évolue et grandit en parfaite symbiose avec votre entreprise."
    }
  ];

  const advantages = [
    {
      title: "Expertise locale & standards internationaux",
      descr: "Basés fièrement à Dakar, nous comprenons parfaitement les infrastructures, la connectivité, les usages et les opportunités spécifiques du marché sénégalais et ouest-africain.",
      icon: <Award className="w-6 h-6 text-indigo-500" />
    },
    {
      title: "Stack technologique moderne",
      descr: "Nous préconisons et utilisons exclusivement les technologies et frameworks de pointe pour garantir vitesse de chargement, sécurité renforcée et pérennité opérationnelle.",
      icon: <Zap className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "Engagement & Partenariat durable",
      descr: "Plus qu'un prestataire technique standard, nous agissons comme le prolongement technologique de votre équipe pour pérenniser vos investissements digitaux.",
      icon: <Shield className="w-6 h-6 text-violet-500" />
    }
  ];

  return (
    <section 
      id="about" 
      data-seo-title="À Propos | HardSoft Technologies" 
      data-seo-description="Fondée en 2017 à Dakar, HardSoft Technologies est une entreprise d'ingénierie logicielle dédiée à la construction d'éco-systèmes applicatifs sur mesure de classe mondiale." 
      className="py-24 lg:py-32 bg-white dark:bg-slate-950 relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-550/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-550/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-650 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
            🔥 À Propos de Nous
          </div>
          <h2 className="font-display text-3xl sm:text-5xl 2xl:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white leading-[1.1]">
            L'Ingénierie Logicielle à <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-400">votre service</span>.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg 2xl:text-xl leading-relaxed">
            Découvrez notre histoire, notre vision stratégique pour la transformation numérique en Afrique, nos expertises logicielles pointues et l'équipe motivée qui propulse vos ambitions.
          </p>
        </div>

        {/* Tab Buttons Control */}
        <div className="flex justify-center p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl max-w-lg mx-auto mb-16 border border-slate-200/50 dark:border-slate-800/80">
          <button
            onClick={() => setActiveTab('enterprise')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'enterprise'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Notre Vision</span>
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'methods'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 shrink-0" />
            <span>Expertises & Méthode</span>
          </button>
          <button
            onClick={() => setActiveTab('founder')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'founder'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>Le Fondateur</span>
          </button>
        </div>

        {/* Dynamic Tab Content Wrapper */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* Tab 1: Enterprise Story & Vision */}
            {activeTab === 'enterprise' && (
              <motion.div
                key="enterprise-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                      À propos de HardSoft Technologies
                    </h3>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                      Bienvenue chez <strong>HardSoft Technologies</strong>, votre partenaire de confiance dans la transformation digitale et l'innovation technologique au Sénégal et en Afrique.
                    </p>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mt-4">
                      Fondée en <strong>avril 2017</strong>, notre entreprise s'est initialement imposée comme un acteur clé de la fourniture de solutions informatiques globales. Aujourd'hui, pour répondre aux défis de plus en plus complexes de l'écosystème numérique, HardSoft Technologies franchit un cap stratégique majeur en affirmant sa nouvelle identité : <strong>une entreprise d'ingénierie dédiée à la construction de logiciels d'exception sur mesure</strong>.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/50 dark:bg-slate-900/40 border border-indigo-550/10 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Target className="w-32 h-32" />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 select-none text-xl">
                        🎯
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">Notre Vision</h4>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                          Dans un monde où le digital redéfinit chaque secteur d'activité, les solutions standards ("prêtes à l'emploi") ne suffisent plus pour se démarquer. Nous croyons fermement que <strong>la technologie doit s'adapter à votre vision, et non l'inverse</strong>.
                        </p>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mt-2.5">
                          Notre ambition absolue est de propulser la croissance des entreprises, des startups et des institutions à travers des architectures logicielles uniques, performantes, évolutives et parfaitement alignées sur les réalités du marché local et international.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid of Advantages / Corporate Pillars */}
                <div className="lg:col-span-5 space-y-6">
                  <h4 className="font-display text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500" /> Pourquoi nous choisir ?
                  </h4>
                  {advantages.map((adv, idx) => (
                    <div 
                      key={idx}
                      className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/80 hover:border-indigo-500/20 dark:hover:border-indigo-500/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
                          {adv.icon}
                        </div>
                        <h5 className="font-display text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {adv.title}
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {adv.descr}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 2: Expertises & Methods */}
            {activeTab === 'methods' && (
              <motion.div
                key="methods-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                
                {/* Expertises Block */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 text-center">
                    La Construction de Logiciels sur Mesure
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto text-sm sm:text-base mb-10">
                    Chez HardSoft Technologies, nous ne faisons pas que développer du code ; nous bâtissons des écosystèmes numériques robustes en adoptant une approche <strong>Mobile-First</strong> et <strong>Cloud-Native</strong>.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {expertises.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-150 dark:border-slate-800/70 hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="w-12 h-12 bg-white dark:bg-slate-800 shadow-sm border border-slate-200/20 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform select-none">
                            {item.icon}
                          </div>
                          <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/30 dark:border-slate-800/50">
                          {item.techs.map((tech) => (
                            <span 
                              key={tech}
                              className="text-[10px] font-semibold tracking-wider font-mono px-2 py-0.5 roundedbg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-indigo-400 border border-transparent dark:border-slate-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Methodology Steps timeline */}
                <div className="pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 text-center">
                    Notre Approche Méthodologique
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-center max-w-xl mx-auto text-sm sm:text-base mb-12">
                    Pour garantir le succès de chaque projet, nous appliquons une méthodologie rigoureuse centrée sur la valeur métier :
                  </p>

                  <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connecting line on desktop */}
                    <div className="absolute top-[28px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/20 via-emerald-500/20 to-indigo-500/20 z-0 hidden md:block"></div>

                    {methodologySteps.map((step, idx) => (
                      <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                        <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-slate-900 border-2 border-indigo-550 dark:border-indigo-500 hover:border-emerald-555 flex items-center justify-center font-display text-sm font-extrabold text-indigo-600 dark:text-indigo-400 mb-4 shadow-sm group-hover:scale-105 transition-all duration-300">
                          {step.num}
                        </div>
                        <h4 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Detailed Founder bio */}
            {activeTab === 'founder' && (
              <motion.div
                key="founder-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/5] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden relative shadow-2xl">
                    <LazyImage 
                      src={cherifImg} 
                      alt="Photo de profil de Chérif Alioune Diatta"
                      containerClassName="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 dark:from-slate-900 via-transparent to-indigo-900/30 mix-blend-multiply pointer-events-none"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white dark:from-slate-950 via-white dark:via-slate-950/80 to-transparent">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
                        💡 L'Expertise & La Vision
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4 select-none">
                    Dirigeant & Ingénieur Principal
                  </div>
                  <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                    Chérif Alioune Diatta
                  </h3>
                  <h4 className="text-lg sm:text-xl text-indigo-500 dark:text-indigo-400 font-bold mb-6">
                    Fondateur & Directeur Général de HardSoft Technologies
                  </h4>
                  
                  <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    <p>
                      Expert chevronné en technologies de l'information et passionné par l'ingénierie logicielle avancée, <strong>Chérif Alioune Diatta</strong> impulse la vision technique et opérationnelle de HardSoft Technologies à Dakar.
                    </p>
                    <p>
                      Spécialisé en architectures de systèmes, développement d'applications cloud-native, applications mobiles multiplateformes (Flutter) et applications d'entreprise robustes, il accompagne personnellement les structures de toutes tailles dans l'automatisation intelligente de leurs flux de travail et l'intégration d'API stratégiques.
                    </p>
                    <p>
                      Sous sa gouverne stratégique, HardSoft Technologies s'impose comme un pilier d'innovation et le partenaire technologique incontesté pour concrétiser vos idées les plus audacieuses en plateformes logicielles pérennes et hautement optimisées.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap gap-4 items-center">
                    <button 
                      onClick={() => {
                        setBookingSubmitted(false);
                        setIsBookingModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 cursor-pointer border border-emerald-400/10 group active:scale-95"
                    >
                      <Calendar size={16} className="animate-pulse shrink-0 text-emerald-100 group-hover:scale-110 transition-transform" />
                      <span>Planifier un rendez-vous</span>
                    </button>
                    <a 
                      href="mailto:contact@hardsoft-technologies.net" 
                      className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs sm:text-sm border border-slate-200/65 dark:border-slate-800/80 transition-all cursor-pointer"
                    >
                      <Mail size={16} className="text-slate-500 dark:text-slate-400" />
                      <span>Email de Chérif</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/ch%C3%A9rif-alioune-diatta-4a9497bb/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-150/40 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs sm:text-sm border border-slate-200/30 dark:border-slate-800/50 transition-all cursor-pointer"
                    >
                      <span>LinkedIn</span>
                      <ChevronRight size={14} className="text-slate-400" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Floating Schedule Meeting FAB - Appears only when founder tab is active */}
      <AnimatePresence>
        {activeTab === 'founder' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <button
              onClick={() => {
                setBookingSubmitted(false);
                setIsBookingModalOpen(true);
              }}
              className="flex items-center gap-2.5 px-5 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-555 hover:to-teal-655 text-white font-extrabold rounded-full shadow-2xl hover:shadow-emerald-550/30 dark:hover:shadow-emerald-950/50 transition-all duration-300 group cursor-pointer border border-emerald-400/20 active:scale-95"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
              </div>
              <Calendar className="w-5 h-5 animate-pulse group-hover:scale-110 transition-transform text-emerald-100" />
              <span className="text-sm tracking-wide">Prendre RDV</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scheduler Dialog Overlay & Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto max-w-lg h-fit max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 flex flex-col p-0"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg select-none">
                    📅
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                      Planifier une session de cadrage
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Avec Chérif Alioune Diatta
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="p-1 px-1.5 h-8 w-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center border border-slate-200/40 dark:border-slate-700/50"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body with dynamic views */}
              <div className="overflow-y-auto p-6 flex-1 space-y-6">
                {!bookingSubmitted ? (
                  <form onSubmit={handleBookMeeting} className="space-y-4">
                    
                    {/* Meeting Type / Duration Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                        1. Type de rendez-vous
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setMeetingType('intro')}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 cursor-pointer ${
                            meetingType === 'intro'
                              ? 'border-emerald-500 dark:border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-55/60 dark:hover:bg-slate-800/25'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm">☕ Intro</span>
                            {meetingType === 'intro' && <Check size={14} className="text-emerald-500" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">Café Virtuel</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">15 minutes</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setMeetingType('tech')}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 cursor-pointer ${
                            meetingType === 'tech'
                              ? 'border-emerald-500 dark:border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-55/65 dark:hover:bg-slate-800/25'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm">💻 Avis</span>
                            {meetingType === 'tech' && <Check size={14} className="text-emerald-500" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">Démo Technique</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">30 minutes</p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setMeetingType('architecture')}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 cursor-pointer ${
                            meetingType === 'architecture'
                              ? 'border-emerald-500 dark:border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-55/65 dark:hover:bg-slate-800/25'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm">🚀 Projet</span>
                            {meetingType === 'architecture' && <Check size={14} className="text-emerald-500" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white font-sans">Cadrage Logiciel</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">45 minutes</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Date picker dynamic carousel */}
                    <div>
                      <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>2. Choisir une date disponible</span>
                        <span className="text-[10px] text-indigo-550 dark:text-indigo-400 font-mono capitalize">UTC / Heure du Sénégal</span>
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {workingDays.map((day) => (
                          <button
                            key={day.dateStr}
                            type="button"
                            onClick={() => setSelectedDate(day.dateStr)}
                            className={`py-2 px-1 rounded-xl border transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                              selectedDate === day.dateStr
                                ? 'border-emerald-500 bg-emerald-500 text-white shadow-md'
                                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-55 dark:hover:bg-slate-800/30 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className={`text-[10px] font-bold uppercase ${selectedDate === day.dateStr ? 'text-emerald-50' : 'text-slate-400'}`}>
                              {day.label.split(' ')[0]}
                            </span>
                            <span className="text-sm font-extrabold block">
                              {day.label.split(' ')[1] || day.label}
                            </span>
                            <span className={`text-[9px] uppercase font-semibold ${selectedDate === day.dateStr ? 'text-emerald-100' : 'text-slate-550 dark:text-slate-500'}`}>
                              {day.label.split(' ')[2] || ''}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time slots picker */}
                    <div>
                      <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Clock size={12} className="text-slate-455" />
                        <span>3. Sélection de l'heure</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all text-center cursor-pointer ${
                              selectedTime === slot
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold ring-1 ring-emerald-500'
                                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-55/50 dark:hover:bg-slate-850/30 text-slate-650 dark:text-slate-400'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Direct forms inputs */}
                    <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        {language === 'fr' ? '4. Vos coordonnées' : '4. Your contact details'}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <input
                            type="text"
                            required
                            placeholder={language === 'fr' ? "Nom complet *" : "Full name *"}
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 text-xs placeholder:text-slate-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <input
                            type="email"
                            required
                            placeholder={language === 'fr' ? "Adresse email *" : "Business email *"}
                            value={bookingEmail}
                            onChange={(e) => setBookingEmail(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 text-xs placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        placeholder={language === 'fr' ? "Quels sont les détails importants de votre projet ?" : "What are the important details or goals of your project?"}
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-555 rounded-lg p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 text-xs placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    {/* Book / Option triggers */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={bookingLoading || !bookingName.trim() || !bookingEmail.trim()}
                        className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold rounded-xl text-center text-xs sm:text-sm cursor-pointer transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2"
                      >
                        {bookingLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin"></div>
                            <span>{language === 'fr' ? 'Prise de rendez-vous...' : 'Booking meeting...'}</span>
                          </>
                        ) : (
                          <>
                            <Check size={16} />
                            <span>{language === 'fr' ? 'Confirmer le rendez-vous' : 'Confirm reservation'}</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={scrollToContact}
                        className="w-full sm:w-auto px-4 py-3.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-605 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold rounded-xl text-xs text-center cursor-pointer transition-all"
                      >
                        {language === 'fr' ? 'Utiliser le formulaire classique' : 'Use standard message form'}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Success Booking State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-550 border border-emerald-550/20 flex items-center justify-center text-3xl mx-auto shadow-inner animate-bounce mb-2">
                      🎉
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                        {t('about.booking.success_title')}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                        {t('about.booking.success_desc', {
                          name: bookingName,
                          type: meetingType === 'intro' ? (language === 'fr' ? 'Café Virtuel' : 'Virtual Coffee') : meetingType === 'tech' ? (language === 'fr' ? 'Démo Technique' : 'Tech Demo') : (language === 'fr' ? 'Session de Cadrage' : 'Scoping Call'),
                          date: workingDays.find(d => d.dateStr === selectedDate)?.label || selectedDate,
                          time: selectedTime
                        })}
                      </p>
                    </div>

                    {/* Scheduled recap badge & details */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 text-left max-w-sm mx-auto space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span className="text-emerald-500 text-sm">📅</span>
                        <span>{language === 'fr' ? 'Date : ' : 'Date: '} {workingDays.find(d => d.dateStr === selectedDate)?.label || selectedDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 border-t border-slate-150/50 dark:border-slate-800/50 pt-2">
                        <span className="text-emerald-500 text-sm">🕰️</span>
                        <span>{language === 'fr' ? 'Heure : ' : 'Time: '} {selectedTime} (GMT {language === 'fr' ? '/ Heure du Sénégal' : '/ Dakar Time'})</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 border-t border-slate-150/50 dark:border-slate-800/50 pt-2">
                        <span className="text-indigo-500 text-sm">📹</span>
                        <span>{language === 'fr' ? 'Canal : Visioconférence Google Meet (Lien inclus dans l\'invitation)' : 'Meeting Channel: Google Meet Videoconference (Link included in invite)'}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-550 dark:text-slate-400 max-w-sm mx-auto">
                      {language === 'fr' 
                        ? <>Un email de confirmation contenant l'invitation de calendrier et le lien Google Meet vous a été envoyé à <strong>{bookingEmail}</strong>.</>
                        : <>A confirmation email containing the calendar invite and Google Meet link has been sent to <strong>{bookingEmail}</strong>.</>
                      }
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                      <a
                        href={getGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-2.5 bg-[#4285F4] hover:bg-[#357ae8] text-white font-extrabold rounded-xl text-xs border border-blue-400/20 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 hover:-translate-y-0.5 cursor-pointer active:scale-95 group"
                      >
                        <Calendar size={14} className="text-white shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
                        <span>{language === 'fr' ? 'Ajouter à mon agenda' : 'Add to Calendar'}</span>
                      </a>
                      <a
                        href={getShareEmailUrl()}
                        className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold rounded-xl text-xs border border-slate-200 dark:border-slate-700/60 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md hover:scale-105 hover:-translate-y-0.5 cursor-pointer active:scale-95 group"
                      >
                        <Mail size={14} className="text-slate-500 dark:text-slate-400 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span>{language === 'fr' ? 'Partager par e-mail' : 'Share via Email'}</span>
                      </a>
                      <a
                        href="https://wa.me/221774249333"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-xs border border-emerald-400/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Phone size={14} className="shrink-0" />
                        <span>WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setIsBookingModalOpen(false)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-extrabold rounded-xl text-xs cursor-pointer transition-all shadow-md active:scale-95"
                      >
                        Fermer
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
