import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Code, ShoppingCart, Workflow, Mail, GraduationCap } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export default function WhatsAppWidget() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const options = [
    {
      id: 'dev',
      icon: <Code size={18} />,
      label: isFr ? "Logiciel sur mesure / Site Web / App Mobile" : "Bespoke Software / Website / Mobile App",
      message: isFr 
        ? "Bonjour HardSoft Technologies ! J'aimerais discuter d'un projet de Logiciel sur mesure, Site Web ou Application Mobile. Pouvez-vous m'accompagner ?"
        : "Hello HardSoft Technologies! I would love to discuss a premium custom Software, Website, or Mobile Application project. Can you guide me?"
    },
    {
      id: 'pos',
      icon: <ShoppingCart size={18} />,
      label: isFr ? "Logiciel POS (Point de Vente)" : "POS Software (Point of Sale)",
      message: isFr 
        ? "Bonjour HardSoft Technologies ! Je souhaite avoir des informations et un devis pour votre Logiciel POS (Point de Vente). Comment procéder ?"
        : "Hello HardSoft Technologies! I want to receive information and a quote for your Point of Sale (POS) software setup. How do we proceed?"
    },
    {
      id: 'n8n',
      icon: <Workflow size={18} />,
      label: isFr ? "Automatisation de processus avec n8n" : "Workflow Automation with n8n",
      message: isFr 
        ? "Bonjour HardSoft Technologies ! Je suis intéressé par l'Automatisation de processus avec n8n pour mon entreprise. Pouvez-vous m'aider ?"
        : "Hello HardSoft Technologies! I am interested in process automation workflows with n8n for my company. Can you help?"
    },
    {
      id: 'emails',
      icon: <Mail size={18} />,
      label: isFr ? "E-mails professionnels & Google My Business" : "Professional Domain Mails & SEO Profile",
      message: isFr 
        ? "Bonjour HardSoft Technologies ! J'aimerais avoir plus d'informations sur la configuration des E-mails professionnels et Google My Business."
        : "Hello HardSoft Technologies! I would love some info regarding professional domain email configuration and Google My Business profile optimization."
    },
    {
      id: 'formation',
      icon: <GraduationCap size={18} />,
      label: isFr ? "Formations en Informatique" : "IT & Developer Training",
      message: isFr 
        ? "Bonjour HardSoft Technologies ! Je souhaite avoir des informations sur vos Formations en Informatique. Comment procéder ?"
        : "Hello HardSoft Technologies! I want to inquire about your professional developer and software training courses. How do I proceed?"
    }
  ];

  const WHATSAPP_NUMBER = "221781466421"; 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<typeof options[0] | null>(null);

  const handleOpenWhatsApp = () => {
    if (!selectedOption) return;
    const text = encodeURIComponent(selectedOption.message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[380px] bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#25D366] font-bold">
                    H
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#25D366] rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-semibold leading-tight">HardSoft Support</h3>
                  <p className="text-slate-900 dark:text-white/90 text-xs mt-0.5">
                    {isFr ? "En ligne • Répond instantanément 🟢" : "Online • Responds instantly 🟢"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-900 dark:text-white hover:bg-white/20 p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white cursor-pointer animate-none"
                aria-label={isFr ? "Fermer la fenêtre de chat" : "Close chat window"}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[#0c1317]">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-800 dark:text-slate-200 mb-4 shadow-sm inline-block max-w-[95%] border border-slate-300 dark:border-slate-700 relative">
                <p>{isFr ? "Bonjour ! Comment allez-vous ? 👋" : "Hello! How can we help you today? 👋"}</p>
                <p className="mt-2">{isFr ? "Comment pouvons-nous vous aider aujourd'hui ?" : "Select a topic of discussion below to initialize WhatsApp chat with our engineers:"}</p>
                {isFr && <p className="mt-4 text-emerald-400 font-medium text-xs">Veuillez sélectionner le service qui vous intéresse pour lancer la discussion sur WhatsApp :</p>}
              </div>

              <div className="flex flex-col gap-2">
                {options.map((opt) => (
                  <label 
                    key={opt.id} 
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedOption?.id === opt.id 
                        ? 'border-[#25D366] bg-[#25D366]/10 text-slate-900 dark:text-white' 
                        : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:bg-slate-700 hover:border-slate-600'
                    }`}
                    onClick={() => setSelectedOption(opt)}
                  >
                    <div className={`p-1.5 rounded-lg ${selectedOption?.id === opt.id ? 'text-[#25D366]' : 'text-slate-600 dark:text-slate-400'}`}>
                       {opt.icon}
                    </div>
                    <span className="text-sm font-medium flex-1 leading-snug">{opt.label}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedOption?.id === opt.id ? 'border-[#25D366]' : 'border-slate-500'}`}>
                      {selectedOption?.id === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <button 
                onClick={handleOpenWhatsApp}
                disabled={!selectedOption}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3.5 px-4 rounded-xl transition-all cursor-pointer ${
                  selectedOption 
                    ? 'bg-[#25D366] hover:bg-[#128C7E] text-slate-900 dark:text-white shadow-lg shadow-[#25D366]/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                <MessageCircle size={20} />
                {isFr ? "Discuter sur WhatsApp" : "Start WhatsApp Discussion"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? (isFr ? "Fermer le widget WhatsApp" : "Close WhatsApp support widget") : (isFr ? "Ouvrir le support WhatsApp" : "Open WhatsApp support channel")}
        aria-expanded={isOpen}
        className="group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#128C7E] text-slate-900 dark:text-white rounded-full shadow-xl shadow-[#25D366]/30 transition-all z-50 relative focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 cursor-pointer"
      >
        {isOpen ? <X size={28} className="transform transition-transform" /> : <MessageCircle size={32} className="group-hover:scale-110 transition-transform" />}
      </button>
      
      {/* Pulse effect when closed */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping -z-10"></div>
      )}
    </div>
  );
}
