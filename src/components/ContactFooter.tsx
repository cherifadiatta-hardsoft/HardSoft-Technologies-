import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_URL } from '../config';

const getSenegalOperator = (normalizedPhone: string) => {
  if (normalizedPhone.startsWith('77') || normalizedPhone.startsWith('78')) {
    return { name: 'Orange', color: 'text-orange-600 dark:text-orange-400', icon: '🧡' };
  } else if (normalizedPhone.startsWith('76')) {
    return { name: 'Free', color: 'text-red-600 dark:text-red-400', icon: '🔴' };
  } else if (normalizedPhone.startsWith('70')) {
    return { name: 'Expresso', color: 'text-sky-600 dark:text-sky-450', icon: '🔵' };
  } else if (normalizedPhone.startsWith('75')) {
    return { name: 'Promobile', color: 'text-purple-600 dark:text-purple-400', icon: '🟣' };
  } else if (normalizedPhone.startsWith('33')) {
    return { name: 'Téléphone Fixe / Sonatel', color: 'text-emerald-600 dark:text-emerald-400', icon: '📞' };
  }
  return null;
};

export default function ContactFooter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showNewsletterToast, setShowNewsletterToast] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    contactMethod: '',
    projectDescription: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isPhoneValidating, setIsPhoneValidating] = useState(false);

  const validatePhoneAsync = async (phoneValue: string): Promise<string> => {
    const rawVal = phoneValue.replace(/[\s\-\(\)]/g, '');
    let normalized = rawVal;
    if (rawVal.startsWith('+221')) {
      normalized = rawVal.slice(4);
    } else if (rawVal.startsWith('221') && rawVal.length > 9) {
      normalized = rawVal.slice(3);
    } else if (rawVal.startsWith('00221')) {
      normalized = rawVal.slice(5);
    }
    
    if (!normalized) {
      return "Le numéro de téléphone est requis";
    }

    if (!/^\d+$/.test(normalized)) {
      return "Le numéro ne doit contenir que des chiffres";
    }

    if (normalized.length !== 9) {
      return "Le numéro doit comporter exactement 9 chiffres (ex: 771234567)";
    }

    const validPrefixes = ['77', '78', '76', '75', '70', '72', '33'];
    const prefix = normalized.substring(0, 2);
    if (!validPrefixes.includes(prefix)) {
      return "Préfixe invalide pour le Sénégal (utilisez 77, 78, 76, 75, 70 ou 33)";
    }

    // Simulate an operator validation query delays to demonstrate UX state changes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(''); // empty means valid
      }, 600);
    });
  };

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
    
    if (name === 'phone') {
      const rawVal = value.replace(/[\s\-\(\)]/g, '');
      if (rawVal.length >= 9) {
        setIsPhoneValidating(true);
        validatePhoneAsync(value).then(err => {
          setIsPhoneValidating(false);
          setErrors(prev => ({ ...prev, phone: err }));
        });
      } else if (touched.phone) {
        setErrors(prev => ({ ...prev, phone: value ? 'Le numéro doit comporter 9 chiffres' : 'Le numéro est requis' }));
      }
    } else if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (name === 'phone') {
      setIsPhoneValidating(true);
      const phoneError = await validatePhoneAsync(value);
      setIsPhoneValidating(false);
      setErrors(prev => ({ ...prev, phone: phoneError }));
    } else {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Validate non-phone fields
    Object.keys(formData).forEach(key => {
      if (key !== 'phone') {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    // Validate phone asynchronously
    setIsPhoneValidating(true);
    const phoneError = await validatePhoneAsync(formData.phone);
    setIsPhoneValidating(false);
    
    if (phoneError) {
      newErrors['phone'] = phoneError;
      isValid = false;
    }

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
                <div className="space-y-1 relative col-span-1">
                  <div className="relative font-sans">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none select-none">
                       <span className="text-xl">🇸🇳</span>
                       <span className="text-slate-500 dark:text-slate-400 text-sm ml-2 font-semibold">+221 ▾</span>
                    </div>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-slate-50 dark:bg-slate-900 border ${errors.phone && touched.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'} rounded-lg pl-24 pr-10 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm`} 
                      placeholder="Numéro de téléphone" 
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {isPhoneValidating && <Loader2 size={16} className="animate-spin text-indigo-500" />}
                      {!isPhoneValidating && touched.phone && !errors.phone && formData.phone && (
                        <CheckCircle size={16} className="text-emerald-500" />
                      )}
                    </div>
                  </div>
                  {errors.phone && touched.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  {!isPhoneValidating && touched.phone && !errors.phone && formData.phone && (
                    (() => {
                      const rawVal = formData.phone.replace(/[\s\-\(\)]/g, '');
                      let normalized = rawVal;
                      if (rawVal.startsWith('+221')) normalized = rawVal.slice(4);
                      else if (rawVal.startsWith('221') && rawVal.length > 9) normalized = rawVal.slice(3);
                      else if (rawVal.startsWith('00221')) normalized = rawVal.slice(5);

                      const op = getSenegalOperator(normalized);
                      if (op) {
                        return (
                          <p className={`text-xs mt-1 ${op.color} font-bold flex items-center gap-1`}>
                            <span>{op.icon}</span> Réseau : {op.name} (Format sénégalais valide)
                          </p>
                        );
                      }
                      return (
                        <p className="text-emerald-500 text-xs mt-1 font-bold flex items-center gap-1">
                          ✓ Format sénégalais valide
                        </p>
                      );
                    })()
                  )}
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

        {/* Footer Navigation & Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-slate-200 dark:border-slate-800 mb-8">
          {/* Section 1: Logo & À propos */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">HardSoft Technologies</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Votre partenaire technologique de confiance pour des solutions digitales innovantes et sur mesure.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
          
          {/* Section 2: Liens Rapides */}
          <div className="flex flex-col gap-6 md:pl-8">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Liens Rapides</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#services" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors text-sm">Nos Services</a></li>
              <li><a href="#portfolio" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors text-sm">Nos Réalisations</a></li>
              <li><a href="#formations" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors text-sm">Formations</a></li>
              <li><a href="#apropos" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors text-sm">À Propos de nous</a></li>
              <li><a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
          
          {/* Section 3: Informations de Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Contact & Support</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">Nord Foire Yoff, Dakar - Sénégal</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href="tel:+221781466421" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors text-sm">+221 78 146 64 21</a>
                  <a href="tel:+221782622977" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors text-sm">+221 78 262 29 77</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                <a href="mailto:contact@hardsoft-technologies.net" className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-colors text-sm break-all">contact@hardsoft-technologies.net</a>
              </li>
            </ul>
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
