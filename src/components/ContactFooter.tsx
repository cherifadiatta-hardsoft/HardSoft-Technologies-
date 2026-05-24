import React from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../config';

export default function ContactFooter() {
  const whatsappNumber = "221781466421"; // Utiliser un des numéros

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    const mailtoLink = `mailto:contact@hardsoft-technologies.net?subject=${encodeURIComponent(
      subject as string
    )}&body=${encodeURIComponent(
      `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-800 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Prêt à démarrer ?</h2>
            <p className="text-slate-400 mb-8">
              Discutons de votre projet et trouvons la solution logicielle parfaite pour votre entreprise.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">Nom complet</label>
                  <input type="text" id="name" name="name" required className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                  <input type="email" id="email" name="email" required className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="jean@entreprise.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-300">Sujet</label>
                <input type="text" id="subject" name="subject" required className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Demande de devis pour un site web" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                <textarea id="message" name="message" required rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" placeholder="Parlez-nous de votre projet..."></textarea>
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-4 flex items-center justify-center gap-2 transition-colors">
                <Send size={18} />
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-6 text-white">Nos Coordonnées</h3>
            
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 text-indigo-400 rounded-xl flex items-center justify-center shrink-0 border border-slate-800">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Adresse</h4>
                  <p className="text-slate-400">Nord Foire Yoff<br/>Dakar - Sénégal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 text-indigo-400 rounded-xl flex items-center justify-center shrink-0 border border-slate-800">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Téléphone</h4>
                  <p className="text-slate-400">+221 78 146 64 21</p>
                  <p className="text-slate-400">+221 78 262 29 77</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 text-indigo-400 rounded-xl flex items-center justify-center shrink-0 border border-slate-800">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">E-mail</h4>
                  <a href="mailto:contact@hardsoft-technologies.net" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    contact@hardsoft-technologies.net
                  </a>
                </div>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-lg transition-colors mb-8 max-w-full"
            >
              <MessageCircle size={20} className="shrink-0" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">Demander un devis sur WhatsApp</span>
            </a>

            {/* Simple Map Placeholder (Gray box to keep minimalism and privacy, or generic Google Map embed) */}
            <div className="mt-auto w-full h-48 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden relative">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15433.024501305417!2d-17.472918!3d14.755252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ1JzE4LjkiTiAxN8KwMjgnMjIuNSJX!5e0!3m2!1sen!2ssn!4v1600000000000!5m2!1sen!2ssn" 
                width="100%" 
                height="100%" 
                style={{ border: 0, opacity: 0.8, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                title="Google Maps Nord Foire"
               ></iframe>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} HardSoft Technologies. Tous droits réservés.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-slate-300">Mentions Légales</a>
             <a href="#" className="hover:text-slate-300">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
