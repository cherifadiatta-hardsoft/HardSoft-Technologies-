import Header from './components/Header';
import Hero from './components/Hero';
import CompanyStats from './components/CompanyStats';
import Services from './components/Services';
import POS from './components/POS';
import Formations from './components/Formations';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Founder from './components/Founder';
import FAQ from './components/FAQ';
import ProjectEstimator from './components/ProjectEstimator';
import ContactFooter from './components/ContactFooter';
import WhatsAppWidget from './components/WhatsAppWidget';
import Approaches from './components/Approaches';
import Technologies from './components/Technologies';
import BackToTop from './components/BackToTop';
import SEO from './components/SEO';
import { useSectionObserver } from './hooks/useSectionObserver';

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
        <Founder />
        <Testimonials />
        <FAQ />
      </main>

      <ProjectEstimator />
      <ContactFooter />
      <WhatsAppWidget />
      <BackToTop />
    </div>
  );
}
