import { motion } from 'motion/react';
import { Code, Globe, Workflow, Mail, MapPin, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../config';

const services = [
  {
    icon: <Code size={32} className="text-indigo-400" />,
    title: 'Développement de Logiciels sur Mesure',
    description: 'Des solutions uniques adaptées aux besoins spécifiques de votre entreprise pour optimiser votre gestion.',
  },
  {
    icon: <Globe size={32} className="text-violet-400" />,
    title: 'Sites Web & Applications Mobiles',
    description: 'Des plateformes performantes, sécurisées et adaptées à tous les écrans (iOS, Android, Web).',
  },
  {
    icon: <Workflow size={32} className="text-emerald-400" />,
    title: 'Automatisation de Processus (n8n)',
    description: 'Gagnez du temps et de l\'efficacité en connectant vos outils et en automatisant vos tâches répétitives.',
  },
  {
    icon: <Mail size={32} className="text-blue-400" />,
    title: 'Identité Professionnelle',
    description: 'Configuration d\'e-mails professionnels avec votre propre nom de domaine (ex: contact@votreentreprise.com).',
  },
  {
    icon: <MapPin size={32} className="text-red-400" />,
    title: 'Visibilité Locale',
    description: 'Configuration et optimisation de votre fiche Google My Business pour attirer des clients locaux.',
  },
];

export default function Services() {
  return (
    <section 
      id="services" 
      data-seo-title="Nos Services | HardSoft Technologies" 
      data-seo-description="Développement sur-mesure, automatisation n8n, création de sites web et applications mobiles." 
      className="py-24 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que nous faisons</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Un accompagnement complet pour digitaliser, automatiser et propulser votre activité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-slate-100 dark:bg-slate-800/50 transition-all group"
            >
              <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <a
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-slate-900 dark:text-white font-semibold rounded-full transition-colors shadow-lg shadow-[#25D366]/20 max-w-full"
            >
              <MessageCircle size={20} className="shrink-0" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">Demander un devis sur WhatsApp</span>
            </a>
        </div>
      </div>
    </section>
  );
}
