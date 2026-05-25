import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function Testimonials() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const testimonials = [
    {
      id: 1,
      quote: isFr 
        ? "L'équipe de HardSoft a transformé notre gestion avec leur logiciel POS. Un gain de temps incroyable et un support toujours réactif."
        : "The HardSoft team transformed our workflow with their POS software. Incredible time savings and always-reactive support.",
      name: "Marie Ndiaye",
      company: isFr ? "Gérante, Boutique Élégance" : "Manager, Elegance Boutique",
    },
    {
      id: 2,
      quote: isFr
        ? "Notre nouveau site web e-commerce est devenu notre premier canal de vente. Très professionnel et design épuré, exactement ce que nous voulions."
        : "Our new e-commerce web platform became our top sales channel. Very professional and sleek design, exactly what we wanted.",
      name: "Amadou Fall",
      company: isFr ? "Directeur, Teranga Shop" : "Director, Teranga Shop",
    },
    {
      id: 3,
      quote: isFr
        ? "L'automatisation de nos processus avec n8n nous a permis de diviser notre temps administratif par deux. Merci pour l'accompagnement complet !"
        : "Automating our workflows with n8n allowed us to divide our administration hours by half. Thank you for the full implementation support!",
      name: "Sophie Diallo",
      company: isFr ? "Opérations, TechVision SN" : "Operations, TechVision SN",
    },
    {
      id: 4,
      quote: isFr
        ? "Excellente formation sur les outils numériques. Nos équipes sont désormais plus autonomes. Un grand professionnalisme."
        : "Outstanding course on professional digital tools. Our teams are now completely autonomous. Truly professional work.",
      name: "Cheikh Diop",
      company: isFr ? "RH, Groupe Horizon" : "HR, Horizon Group",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="temoignages" 
      data-seo-title={isFr ? "Témoignages | HardSoft Technologies" : "Testimonials | HardSoft Technologies"} 
      data-seo-description={isFr ? "Découvrez les avis et retours d'expérience de nos clients partenaires sur nos solutions." : "Discover client reviews and testimonials about our customized digital products."} 
      className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isFr ? "Ce que disent nos clients" : "What Our Clients Say"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {isFr 
              ? "La satisfaction de nos partenaires est notre meilleure preuve de l'efficacité de nos solutions."
              : "The feedback and satisfaction of our premium business partners highlights our daily commitment."}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto h-[350px] sm:h-[250px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full px-4"
            >
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
                <Quote className="mx-auto text-indigo-500/40 mb-6" size={48} />
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-indigo-400 text-sm">{testimonials[currentIndex].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-12 h-12 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10 cursor-pointer"
            onClick={() => paginate(-1)}
            aria-label={isFr ? "Témoignage précédent" : "Previous testimonial"}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-12 h-12 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10 cursor-pointer"
            onClick={() => paginate(1)}
            aria-label={isFr ? "Témoignage suivant" : "Next testimonial"}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8 z-10 relative">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={isFr ? `Aller au témoignage ${index + 1}` : `Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
              className={`h-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all cursor-pointer ${
                index === currentIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
