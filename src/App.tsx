import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import POS from './components/POS';
import Formations from './components/Formations';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ContactFooter from './components/ContactFooter';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <Header />
      
      <main>
        <Hero />
        <Services />
        <POS />
        <Formations />
        <Portfolio />
        <Testimonials />
      </main>

      <ContactFooter />
      <WhatsAppWidget />
    </div>
  );
}
