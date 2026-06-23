import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CompanyStats from './components/CompanyStats';
import Services from './components/Services';
import POS from './components/POS';
import Formations from './components/Formations';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Partners from './components/Partners';
import ProjectEstimator from './components/ProjectEstimator';
import SaaSOffer from './components/SaaSOffer';
import ContactFooter from './components/ContactFooter';
import WhatsAppWidget from './components/WhatsAppWidget';
import ChatbotWidget from './components/ChatbotWidget';
import Approaches from './components/Approaches';
import Technologies from './components/Technologies';
import BackToTop from './components/BackToTop';
import SEO from './components/SEO';
import SeoAnalyzer from './components/SeoAnalyzer';
import { useSectionObserver } from './hooks/useSectionObserver';

const LazyFAQ = lazy(() => import('./components/FAQ'));

function FAQSection() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id="faq" className="scroll-mt-24">
      {isInView ? (
        <Suspense fallback={<div className="py-24 text-center text-slate-500 min-h-[400px] flex items-center justify-center">Chargement de la FAQ...</div>}>
          <LazyFAQ />
        </Suspense>
      ) : (
        <div className="py-24 min-h-[400px]" />
      )}
    </div>
  );
}

export default function App() {
  const activeSection = useSectionObserver();

  const defaultSEO = {
    title: "HardSoft Technologies | Solution Logicielle et Création Web",
    description: "HardSoft Technologies est une agence spécialisée dans la création de sites web, d'applications SaaS et mobiles pour la transformation digitale et l'automatisation."
  };

  const seoTitle = activeSection?.title || defaultSEO.title;
  const seoDescription = activeSection?.description || defaultSEO.description;
  const seoUrl = activeSection ? `https://hardsoft-technologies.net/#${activeSection.id}` : 'https://hardsoft-technologies.net/';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-indigo-500/30">
      <SEO 
        title={seoTitle} 
        description={seoDescription} 
        url={seoUrl} 
      />
      <Header />
      
      <main>
        <Hero />
        <CompanyStats />
        <Approaches />
        <Services />
        <Technologies />
        <POS />
        <Formations />
        <Portfolio />
        <Partners />
        <About />
        <Testimonials />
        <FAQSection />
        <SaaSOffer />
        <ProjectEstimator />
      </main>

      <ContactFooter />
      <WhatsAppWidget />
      <ChatbotWidget />
      <BackToTop />
      <SeoAnalyzer />
    </div>
  );
}
