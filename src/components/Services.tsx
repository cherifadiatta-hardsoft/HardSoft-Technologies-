import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Globe, Workflow, Mail, MapPin, MessageCircle, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { WHATSAPP_URL } from '../config';
import { useLanguage } from './LanguageProvider';
import LazyImage from './LazyImage';
import cherifImg from '../assets/images/cherif_diatta_profile_1779710074650.png';

export default function Services() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  // Team Carousel Setup
  const teamMembers = [
    {
      name: "Fatou Ndiaye",
      roleFr: "DESIGNER UI/UX LEAD",
      roleEn: "LEAD UI/UX DESIGNER",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500"
    },
    {
      name: "Amadou Sall",
      roleFr: "DÉVELOPPEUR MOBILE SENIOR",
      roleEn: "SENIOR MOBILE ENGINEER",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500"
    },
    {
      name: "Chérif Alioune Diatta",
      roleFr: "FONDATEUR & INGENIEUR EN CHEF",
      roleEn: "FOUNDER & CORE ARCHITECT",
      img: cherifImg
    },
    {
      name: "Ousmane Diop",
      roleFr: "EXPERT CLOUD & AUTOMATISATION",
      roleEn: "CLOUD & AUTOMATION EXPERT",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500"
    },
    {
      name: "Awa Cissé",
      roleFr: "DIRECTRICE DES PROJETS (DELIVERY)",
      roleEn: "DELIVERY & OPERATIONS MANAGER",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500"
    }
  ];

  const [carouselIndex, setCarouselIndex] = useState(2);
  const totalCards = teamMembers.length;

  const goToIndex = (index: number) => {
    setCarouselIndex(index);
  };

  const nextCard = () => {
    setCarouselIndex((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setCarouselIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const categories = isFr 
    ? ['Tous', 'Développement', 'Automatisation', 'Design & Identité', 'Marketing & Visibilité']
    : ['All', 'Development', 'Automation', 'Design & Branding', 'Marketing & Visibility'];

  const services = [
    {
      icon: <Code size={32} className="text-indigo-400" />,
      title: isFr ? 'Développement de Logiciels sur Mesure' : 'Custom Software Development',
      description: isFr 
        ? 'Des solutions uniques adaptées aux besoins spécifiques de votre entreprise pour optimiser votre gestion.'
        : 'Unique, tailored solutions crafted around your exact company processes to optimize management and efficiency.',
      category: isFr ? 'Développement' : 'Development',
    },
    {
      icon: <Globe size={32} className="text-violet-400" />,
      title: isFr ? 'Conception de Sites & Applications Web' : 'Web Design & Web Applications',
      description: isFr 
        ? 'Design d\'interfaces modernes (UI/UX) et développement de plateformes web réactives, fluides et sécurisées.'
        : 'Modern interface design (UI/UX) and development of highly responsive, smooth, and secure web platforms.',
      category: isFr ? 'Développement' : 'Development',
    },
    {
      icon: <Workflow size={32} className="text-emerald-400" />,
      title: isFr ? 'Automatisation de Processus (n8n)' : 'Process Automation (n8n)',
      description: isFr 
        ? 'Gagnez du temps et de l\'efficacité en connectant vos outils et en automatisant vos tâches répétitives.'
        : 'Save crucial operational hours by linking your cloud tools together and fully automating tedious, repetitive tasks.',
      category: isFr ? 'Automatisation' : 'Automation',
    },
    {
      icon: <Mail size={32} className="text-blue-400" />,
      title: isFr ? 'Identité Professionnelle & Design' : 'Professional Identity & Design',
      description: isFr 
        ? 'Configuration d\'e-mails professionnels avec votre propre nom de domaine et conception d\'identités visuelles percutantes.'
        : 'Custom setup of professional business emails with your own domain, alongside sleek digital graphic layout systems.',
      category: isFr ? 'Design & Identité' : 'Design & Branding',
    },
    {
      icon: <MapPin size={32} className="text-red-400" />,
      title: isFr ? 'Visibilité Locale & SEO' : 'Local Visibility & Search SEO',
      description: isFr 
        ? 'Configuration et optimisation de votre fiche Google My Business pour attirer des clients locaux.'
        : 'Creation and expert ranking configuration of your Google Business profile to seamlessly channel local organic leads.',
      category: isFr ? 'Marketing & Visibilité' : 'Marketing & Visibility',
    },
  ];

  const defaultCategory = isFr ? 'Tous' : 'All';
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const filteredServices = (activeCategory === 'Tous' || activeCategory === 'All')
    ? services
    : services.filter(service => {
        if (activeCategory === 'Développement' || activeCategory === 'Development') {
          return service.category === (isFr ? 'Développement' : 'Development');
        }
        if (activeCategory === 'Automatisation' || activeCategory === 'Automation') {
          return service.category === (isFr ? 'Automatisation' : 'Automation');
        }
        if (activeCategory === 'Design & Identité' || activeCategory === 'Design & Branding') {
          return service.category === (isFr ? 'Design & Identité' : 'Design & Branding');
        }
        if (activeCategory === 'Marketing & Visibilité' || activeCategory === 'Marketing & Visibility') {
          return service.category === (isFr ? 'Marketing & Visibilité' : 'Marketing & Visibility');
        }
        return service.category === activeCategory;
      });

  return (
    <section 
      id="services" 
      data-seo-title={isFr ? "Nos Services | HardSoft Technologies" : "Our Services | HardSoft Technologies"} 
      data-seo-description={isFr ? "Expertise en conception de sites et d'applications web, automatisation n8n et logiciels sur mesure." : "Expertise in web design, web applications, n8n automations, and bespoke software development."} 
      className="py-24 relative overflow-hidden scroll-mt-24"
    >
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto px-6"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-5xl 2xl:text-6xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">
            {isFr ? "Ce que nous faisons" : "What We Do"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg 2xl:text-xl">
            {isFr 
              ? "Notre expertise en conception de sites et d'applications web au service de votre réussite digitale."
              : "Our expertise in web design and web applications dedicated to your digital success."}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-4xl mx-auto px-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat || 
              ((cat === 'Tous' || cat === 'All') && (activeCategory === 'Tous' || activeCategory === 'All')) ||
              ((cat === 'Développement' || cat === 'Development') && (activeCategory === 'Développement' || activeCategory === 'Development')) ||
              ((cat === 'Automatisation' || cat === 'Automation') && (activeCategory === 'Automatisation' || activeCategory === 'Automation')) ||
              ((cat === 'Design & Identité' || cat === 'Design & Branding') && (activeCategory === 'Design & Identité' || activeCategory === 'Design & Branding')) ||
              ((cat === 'Marketing & Visibilité' || cat === 'Marketing & Visibility') && (activeCategory === 'Marketing & Visibilité' || activeCategory === 'Marketing & Visibility'));

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/15 scale-105'
                    : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && <Check size={14} className="shrink-0" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid with Animation */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                layout
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 2xl:p-10 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-300 shadow-sm hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 2xl:w-18 2xl:h-18 rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border select-none ${
                      service.category === (isFr ? 'Développement' : 'Development')
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30'
                        : service.category === (isFr ? 'Automatisation' : 'Automation')
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                        : service.category === (isFr ? 'Design & Identité' : 'Design & Branding')
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30'
                        : 'bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30'
                    }`}>
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl 2xl:text-2xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm 2xl:text-base">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modern 3D Team Stack Carousel Section */}
        <section id="team-carousel-section" className="mt-28 mb-16 relative w-full flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-14 px-4">
            <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-[11px] font-extrabold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-indigo-500/20 font-mono mb-4">
              ✨ {isFr ? "NOTRE ÉQUIPE D'EXPERTS" : "OUR EXPERT TEAM"}
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-3">
              {isFr ? "Des experts à votre service" : "High-Performance Talent at Your Service"}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              {isFr 
                ? "Découvrez l'équipe d'ingénieurs et de concepteurs séniors qui conçoit, automatise et livre vos produits de classe mondiale."
                : "Meet the engineers, designers, and systems architects behind our high-performance solutions and automations."}
            </p>
          </div>

          {/* 3D Carousel Wrapper */}
          <div 
            id="team-carousel-wrapper" 
            className="relative w-full max-w-[1000px] h-[450px] flex items-center justify-center overflow-visible select-none px-4"
            style={{ perspective: "1000px" }}
          >
            {/* Nav Prev Button */}
            <button 
              id="team-carousel-btn-prev"
              onClick={prevCard}
              className="absolute left-2 sm:left-4 z-40 bg-slate-900/90 dark:bg-slate-900 text-white hover:bg-indigo-600 dark:hover:bg-indigo-600 border border-slate-800 rounded-full w-12 h-12 flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-90"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Carousel Tracks Containing Cards */}
            <div className="relative w-full h-full flex items-center justify-center">
              {teamMembers.map((member, index) => {
                const isActive = index === carouselIndex;
                const isPrev = index === (carouselIndex - 1 + totalCards) % totalCards;
                const isNext = index === (carouselIndex + 1) % totalCards;
                const isFarPrev = index === (carouselIndex - 2 + totalCards) % totalCards;
                const isFarNext = index === (carouselIndex + 2) % totalCards;

                // Determine transform offsets and classes dynamically with extreme precision
                let transformClass = "opacity-0 scale-50 z-0 pointer-events-none translate-x-0";
                let legacyClass = "card";

                if (isActive) {
                  transformClass = "opacity-100 scale-105 sm:scale-110 z-30 pointer-events-auto translate-x-0";
                  legacyClass = "card active";
                } else if (isPrev) {
                  transformClass = "opacity-60 sm:opacity-75 scale-80 sm:scale-85 z-20 pointer-events-auto -translate-x-[90px] xs:-translate-x-[140px] sm:-translate-x-[220px]";
                  legacyClass = "card prev";
                } else if (isNext) {
                  transformClass = "opacity-60 sm:opacity-75 scale-80 sm:scale-85 z-20 pointer-events-auto translate-x-[90px] xs:translate-x-[140px] sm:translate-x-[220px]";
                  legacyClass = "card next";
                } else if (isFarPrev) {
                  transformClass = "opacity-25 sm:opacity-35 scale-65 sm:scale-70 z-10 pointer-events-auto -translate-x-[160px] xs:-translate-x-[240px] sm:-translate-x-[380px] hidden md:block";
                  legacyClass = "card far-prev";
                } else if (isFarNext) {
                  transformClass = "opacity-25 sm:opacity-35 scale-65 sm:scale-70 z-10 pointer-events-auto translate-x-[160px] xs:translate-x-[240px] sm:translate-x-[380px] hidden md:block";
                  legacyClass = "card far-next";
                }

                return (
                  <div
                    key={index}
                    id={`team-card-${index}`}
                    onClick={() => goToIndex(index)}
                    className={`absolute w-[220px] sm:w-[240px] h-[320px] sm:h-[340px] rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 group transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] flex flex-col justify-end cursor-pointer ${transformClass} ${legacyClass}`}
                  >
                    {/* Background Grayscale Image to Colored Overlay */}
                    <div className="absolute inset-0 z-0">
                      <LazyImage 
                        src={member.img} 
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        containerClassName="w-full h-full"
                        imageClassName={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                      />
                    </div>
                    
                    {/* Visual Vignette Radial Dark Overlay for active readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                    {/* Member Info Sliding in based on isActive */}
                    <div 
                      className={`absolute left-0 bottom-0 w-full p-6 text-center transition-all duration-500 ease-out z-20 flex flex-col items-center ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <h4 className="font-display font-extrabold text-[#ffffff] text-base leading-snug tracking-tight">
                        {member.name}
                      </h4>
                      <p className="text-[10px] font-semibold text-indigo-300 font-sans tracking-widest uppercase mt-1">
                        {isFr ? member.roleFr : member.roleEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nav Next Button */}
            <button 
              id="team-carousel-btn-next"
              onClick={nextCard}
              className="absolute right-2 sm:right-4 z-40 bg-slate-900/90 dark:bg-slate-900 text-white hover:bg-indigo-600 dark:hover:bg-indigo-600 border border-slate-800 rounded-full w-12 h-12 flex items-center justify-center transition-all cursor-pointer shadow-xl active:scale-90"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Carousel Dots Indicators */}
          <div id="team-carousel-dots" className="flex items-center justify-center gap-2.5 mt-4 overflow-visible">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                id={`team-dot-${index}`}
                onClick={() => goToIndex(index)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === carouselIndex 
                    ? 'w-6 bg-indigo-600 dark:bg-indigo-500' 
                    : 'w-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <div className="mt-16 text-center">
            <a
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 2xl:px-10 2xl:py-5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-full transition-colors shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transform hover:-translate-y-0.5 text-sm sm:text-base max-w-full cursor-pointer"
            >
              <MessageCircle size={20} className="shrink-0" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {isFr ? "Demander un devis sur WhatsApp" : "Request a quote on WhatsApp"}
              </span>
            </a>
        </div>
      </motion.div>
    </section>
  );
}
