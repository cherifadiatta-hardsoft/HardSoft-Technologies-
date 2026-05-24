import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_URL } from '../config';

export default function ContactFooter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showNewsletterToast, setShowNewsletterToast] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Diatta Cherif A',
    email: 'jik.jikoox@gmail.com',
    phone: '781466421',
    service: '',
    contactMethod: '',
    projectDescription: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'Le nom est requis' : '';
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Format d\'email invalide' : '';
      case 'service':
        return !value ? 'Veuillez sélectionner un service' : '';
      case 'contactMethod':
        return !value ? 'Veuillez sélectionner une méthode de contact' : '';
      case 'projectDescription':
        return !value.trim() ? 'La description est requise' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    let isValid = true;
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!isValid) return;

    setIsSubmitting(true);
    
    const { name, email, phone, service, contactMethod, projectDescription } = formData;

    const mailtoLink = `mailto:contact@hardsoft-technologies.net?subject=${encodeURIComponent(
      'Nouvelle demande de projet'
    )}&body=${encodeURIComponent(
      `Nom : ${name}\nEmail : ${email}\nTéléphone : +221${phone}\nService souhaité : ${service}\nMéthode de contact : ${contactMethod}\n\nDescription du projet :\n${projectDescription}`
    )}`;

    // Simulation de délai de traitement
    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsSubmitting(false);
      setShowToast(true);
      
      // Retirer le message de succès après 5 secondes
      setTimeout(() => setShowToast(false), 5000);
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowNewsletterToast(true);
    e.currentTarget.reset();
    setTimeout(() => setShowNewsletterToast(false), 5000);
  };

  return (
    <footer id="contact" className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-16 mb-24">
          
          {/* Contact Form */}
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white text-center">Lancer votre projet</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-center max-w-2xl mx-auto">
              Parlez-nous de votre projet. Choisissez vos services et vos préférences de contact pour démarrer.
            </p>

            <form className="space-y-6 max-w-3xl mx-auto" onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.name && touched.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'} rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm`} 
                    placeholder="Nom complet" 
                  />
                  {errors.name && touched.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.email && touched.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'} rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm`} 
                    placeholder="Email" 
                  />
                  {errors.email && touched.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-1 relative">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                       <span className="text-xl">🇸🇳</span>
                       <span className="text-slate-600 dark:text-slate-400 text-sm ml-2">+221 ▾</span>
                    </div>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg pl-24 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm" 
                      placeholder="Numéro de téléphone" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1 relative">
                  <div className="relative">
                    <select 
                      id="service" 
                      name="service" 
                      value={formData.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.service && touched.service ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'} rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 transition-all appearance-none text-sm`} 
                    >
                       <option value="" disabled>Sélectionnez un service principal</option>
                       <option value="developpement-web">Développement Web (Site, E-commerce, Sur mesure)</option>
                       <option value="application-mobile">Application Mobile (iOS & Android)</option>
                       <option value="logiciel-pos">Logiciel de Caisse (POS)</option>
                       <option value="ui-ux-design">Design UI/UX & Maquettage</option>
                       <option value="formation">Formation en développement</option>
                       <option value="autre">Autre demande</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                       <span className="text-slate-500 dark:text-slate-400 text-sm">▾</span>
                    </div>
                  </div>
                  {errors.service && touched.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                </div>

                <div className="space-y-1 relative">
                  <div className="relative">
                    <select 
                      id="contactMethod" 
                      name="contactMethod" 
                      value={formData.contactMethod}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.contactMethod && touched.contactMethod ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'} rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 transition-all appearance-none text-sm`} 
                    >
                       <option value="" disabled>Comment souhaitez-vous procéder ?</option>
                       <option value="video-call">Réserver un appel vidéo</option>
                       <option value="whatsapp">Discuter via WhatsApp</option>
                       <option value="email">Décrire le projet par e-mail</option>
                       <option value="rendez-vous">Planifier un rendez-vous physique</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                       <span className="text-slate-500 dark:text-slate-400 text-sm">▾</span>
                    </div>
                  </div>
                  {errors.contactMethod && touched.contactMethod && <p className="text-red-500 text-xs mt-1">{errors.contactMethod}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <textarea 
                  id="projectDescription" 
                  name="projectDescription" 
                  value={formData.projectDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4} 
                  className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.projectDescription && touched.projectDescription ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'} rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm resize-none`} 
                  placeholder="Décrivez brièvement votre projet, vos objectifs et vos attentes..."
                ></textarea>
                {errors.projectDescription && touched.projectDescription && <p className="text-red-500 text-xs mt-1">{errors.projectDescription}</p>}
              </div>

              <div className="pt-6 flex justify-center">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`bg-[#0047a5] hover:bg-[#003882] text-white font-medium rounded-full px-8 py-3 transition-colors shadow-md flex items-center justify-center gap-2 min-w-[280px] w-full sm:w-auto ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    'Obtenir votre rendez-vous avec Chérif'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="grid md:grid-cols-2 gap-12 border-t border-slate-200 dark:border-slate-800 pt-16">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Nos Coordonnées</h3>
              
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 text-indigo-400 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Adresse</h4>
                    <p className="text-slate-600 dark:text-slate-400">Nord Foire Yoff<br/>Dakar - Sénégal</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 text-indigo-400 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Téléphone</h4>
                    <p className="text-slate-600 dark:text-slate-400">+221 78 146 64 21</p>
                    <p className="text-slate-600 dark:text-slate-400">+221 78 262 29 77</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 text-indigo-400 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">E-mail</h4>
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-slate-900 dark:text-white font-semibold rounded-lg transition-colors max-w-full"
              >
                <MessageCircle size={20} className="shrink-0" />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">Demander un devis sur WhatsApp</span>
              </a>
            </div>

            {/* Simple Map Placeholder (Gray box to keep minimalism and privacy, or generic Google Map embed) */}
            <div className="w-full h-full min-h-[300px] bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
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

        {/* Newsletter Section */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 text-center mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-indigo-900/20 pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <Mail className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">Abonnez-vous à notre Newsletter</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Restez à l'affût des dernières tendances technologiques, de nos nouvelles offres et de nos conseils en développement web.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={handleNewsletterSubmit}
            >
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="Votre adresse e-mail" 
                className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-full px-6 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-slate-900 dark:text-white font-medium rounded-full px-8 py-3 transition-colors shadow-md text-sm whitespace-nowrap"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} HardSoft Technologies. Tous droits réservés.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-slate-700 dark:text-slate-300">Mentions Légales</a>
             <a href="#" className="hover:text-slate-700 dark:text-slate-300">Confidentialité</a>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-50 bg-emerald-600 text-slate-900 dark:text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500 max-w-sm"
          >
            <CheckCircle size={24} className="shrink-0" />
            <div>
              <p className="font-semibold text-sm">Demande en cours d'envoi</p>
              <p className="text-emerald-100 text-xs">Votre client de messagerie s'est ouvert pour l'envoi final de votre demande.</p>
            </div>
          </motion.div>
        )}
        
        {showNewsletterToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 sm:bottom-6 sm:right-6 z-50 bg-indigo-600 text-slate-900 dark:text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-indigo-500 max-w-sm"
          >
            <CheckCircle size={24} className="shrink-0" />
            <div>
              <p className="font-semibold text-sm">Inscription réussie !</p>
              <p className="text-indigo-100 text-xs">Merci de vous être abonné à notre newsletter.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
