import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageProvider';
import { 
  Shield, Sparkles, Zap, Globe, Heart, Building, ArrowUpRight, HelpCircle, 
  Activity, Truck, Landmark, Cpu, Store, Sprout, Navigation, Layers, Filter, 
  X, Calendar, BadgeCheck, ExternalLink, Image as ImageIcon, ChevronLeft, ChevronRight, Eye 
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logoType: 'svg' | 'image' | 'text';
  logoUrl?: string; // For physical PNG/JPG logos when uploaded
  svgColor: string; // Tailwind tint for the icon background
  svgIcon: React.ReactNode; 
  category: 'SaaS' | 'Institutionnel' | 'Retail' | 'Digital';
  expertiseFr: string;
  expertiseEn: string;
  descriptionFr: string;
  descriptionEn: string;
  collabFr: string; // Brief collaboration info
  collabEn: string;
  historyFr: string; // Expanded historical background
  historyEn: string;
  milestonesFr: string[]; // Key milestones delivered
  milestonesEn: string[];
  website?: string;
  gallery: {
    url: string;
    titleFr: string;
    titleEn: string;
  }[];
  timeline: {
    dateFr: string;
    dateEn: string;
    titleFr: string;
    titleEn: string;
    milestoneFr: string;
    milestoneEn: string;
    status: 'completed' | 'current' | 'planned';
    deliverableDetails?: {
      fr: string[];
      en: string[];
    };
  }[];
}

// Highly realistic and polished base partners that align with HardSoft Technologies' real Senegal & West Africa focus
const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'pharma24',
    name: 'Pharma24 Sénégal',
    logoType: 'svg',
    svgColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 shadow-sm shadow-emerald-500/5',
    svgIcon: (
      <div className="relative flex items-center justify-center">
        <Activity className="w-8 h-8 stroke-[1.8]" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
      </div>
    ),
    category: 'SaaS',
    expertiseFr: 'Santé',
    expertiseEn: 'Health',
    descriptionFr: 'Plateforme pionnière d’accès aux soins de santé qui répertorie et cartographie en temps réel les pharmacies de garde au Sénégal.',
    descriptionEn: 'Pioneering healthcare network that references and maps on-duty pharmacies in real-time across Senegal.',
    collabFr: 'Déploiement complet de l’architecture cloud, géolocalisation haute précision et base de données synchronisée.',
    collabEn: 'Full deployment of cloud architecture, high-precision geo-routing, and automated database sync workflows.',
    historyFr: "HardSoft Technologies a collaboré étroitement avec l'équipe de Pharma24 dès sa phase pilote en 2024. Nos experts ont développé une architecture de base de données distribuée hautement résiliente capable de supporter des pics d'accès simultanés majeurs lorsque la population recherche des médicaments d'urgence. Nous assurons la maintenance proactive, la géolocalisation de précision par cartographie interactive et l'indexation dynamique des établissements de garde.",
    historyEn: "HardSoft Technologies teamed up with Pharma24 starting from their pilot phase in 2024. Our engineers formulated a distributed and lightweight offline-first database framework capable of supporting critical traffic rushes when patients query emergency stocks. We handle high-frequency GIS mapping updates, real-time sync with local health units, and advanced operational optimizations.",
    milestonesFr: [
      "Mise en place de l'API de géolocalisation haute précision",
      "Optimisation des requêtes de base de données (bande passante -60%)",
      "Plus de 300 pharmacies de garde synchronisées chaque nuit",
      "Système d'alertes automatisées pour les astreintes"
    ],
    milestonesEn: [
      "High-precision GIS mapping API deployment",
      "Database query footprint reduction (-60% data consumption)",
      "300+ pharmacies on active nocturnal rotation live-synced",
      "Automated critical notification system for pharmacies"
    ],
    website: 'https://pharma24.net',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
        titleFr: 'Interface Professionnelle & Statistiques de Garde',
        titleEn: 'Main Admin Panel & On-Duty Pharmacy Stats'
      },
      {
        url: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=800',
        titleFr: 'Cartographie des Services en temps réel',
        titleEn: 'Live GIS Health Services Indexing Screen'
      },
      {
        url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
        titleFr: 'Visualisation de Base de Données des Stocks',
        titleEn: 'Live Medical Stock Database Monitor'
      }
    ],
    timeline: [
      {
        dateFr: "Mars 2024",
        dateEn: "March 2024",
        titleFr: "Initialisation & Cartographie",
        titleEn: "Initialization & Mapping",
        milestoneFr: "Audit technique de l'infrastructure nationale et cartographie interactive sous-seconde.",
        milestoneEn: "Complete technical audit of national pharmacy tracking frameworks with sub-second maps.",
        status: "completed",
        deliverableDetails: {
          fr: ["Analyse de couverture nationale", "Conception des schémas d'index SIG", "Prototypes d'interfaces cartographiques"],
          en: ["National GIS coverage audit", "GIS indexing database planning", "Interactive map interface wireframing"]
        }
      },
      {
        dateFr: "Juin 2024",
        dateEn: "June 2024",
        titleFr: "Moteur de Géolocalisation",
        titleEn: "Geolocation Engine Dev",
        milestoneFr: "Calcul automatisé des trajets optimisés vers les pharmacies de garde ouvertes.",
        milestoneEn: "Automated route-ranking rendering clients to nearest emergency units on high-frequency GIS.",
        status: "completed",
        deliverableDetails: {
          fr: ["Développement de l'algorithme de routage", "Optimisation des temps de calcul cartographique", "Intégration de l'API de localisation GPS"],
          en: ["Routing matrix algorithm setup", "Sub-second database search tuning", "GPS localization API integrations"]
        }
      },
      {
        dateFr: "Octobre 2024",
        dateEn: "October 2024",
        titleFr: "Synchro de Masse Temps Réel",
        titleEn: "Massive Live-Sync Ingestion",
        milestoneFr: "Intégration et mise à jour automatique en direct pour plus de 300 établissements la nuit.",
        milestoneEn: "Nocturnal automated data-pushed sync launched across 300+ connected healthcare hubs.",
        status: "completed",
        deliverableDetails: {
          fr: ["Mise en place des WebSockets temps réel", "Optimisation de la bande passante mobile (-60%)", "Scripts automatiques de nettoyage nocturne"],
          en: ["Interactive push-notification channels", "Mobile payload reduction (-60%)", "Nocturnal cluster health sanity checks"]
        }
      },
      {
        dateFr: "Actuel",
        dateEn: "Current",
        titleFr: "Supervision Proactive AI",
        titleEn: "Proactive AI Monitoring",
        milestoneFr: "Algorithme intelligent d'anticipation des ruptures de stock de médicaments critiques.",
        milestoneEn: "Intelligent analytics predicting rare medicine distribution deficits before shortages happen.",
        status: "current",
        deliverableDetails: {
          fr: ["Modélisation prédictive des pénuries", "Alertes intelligentes par SMS", "Tableau de bord de répartition prévisionnelle"],
          en: ["Predictive shortage trends algorithm", "Smart SMS warning dispatches", "Consolidated supply projection logs"]
        }
      }
    ]
  },
  {
    id: 'teeru',
    name: 'Projet Teeru',
    logoType: 'svg',
    svgColor: 'text-sky-500 bg-sky-50 dark:bg-sky-950/40 border border-sky-500/20 shadow-sm shadow-sky-500/5',
    svgIcon: (
      <div className="relative flex items-center justify-center">
        <Truck className="w-8 h-8 stroke-[1.8]" />
        <Navigation className="absolute w-4 h-4 text-sky-600 dark:text-sky-400 translate-x-3 -translate-y-3 rotate-45 stroke-[2.5]" />
      </div>
    ),
    category: 'SaaS',
    expertiseFr: 'Logistique',
    expertiseEn: 'Logistics',
    descriptionFr: 'Solution omnicanale de mise en relation client, de transport urbain et d’acheminement logistique à la demande.',
    descriptionEn: 'On-demand fleet logistics orchestrator enabling local parcel delivery and professional transport dispatching.',
    collabFr: 'Création des applications natives iOS & Android avec passerelles SMS et paiements mobiles Wave & Orange Money.',
    collabEn: 'Custom coding of high-performance mobile apps with integrated Wave/OM mobile money checkpoints and real-time maps.',
    historyFr: "Le projet Teeru avait pour enjeu majeur de fluidifier la logistique et le transport à la demande de colis dans les grandes agglomérations. HardSoft Technologies a programmé la quasi-intégralité de l'infrastructure d'acheminement, de la répartition intelligente des chauffeurs par proximité jusqu'aux passerelles de paiement électronique locales. L'application mobile se distingue par son mode offline fluide et sa fluidité sur téléphones d'entrée de gamme.",
    historyEn: "The Teeru project focus was to resolve delivery optimization and high-frequency dispatch bottlenecks. HardSoft Technologies coded the driver routing core, linking parcel requests with nearest active agents based on custom routing matrices, alongside localized mobile payment gateways (Wave, Orange Money). The responsive mobile interface performs beautifully on all entry-level Android/iOS devices.",
    milestonesFr: [
      "Conception du système de calcul de trajet optimal",
      "Passerelle unifiée Wave, Orange Money & Free Money",
      "Déploiement Android & iOS réussi",
      "Système de notifications SMS de suivi en temps réel"
    ],
    milestonesEn: [
      "Intelligent routing matrix algorithm design",
      "Unified Wave, OM & Free Money checkout APIs",
      "Complete deployment across Google Play and App Store",
      "Instantly automated SMS push notifications for parcels"
    ],
    website: 'https://teeru-sn.com',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=800',
        titleFr: "Application Mobile de Suivi de Course Chauffeur",
        titleEn: "Native Mobile Interface for Active Drivers"
      },
      {
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
        titleFr: "Tableau de Bord Logistique d'Administration Globale",
        titleEn: "Global Logistics and Courier Dispatch Control center"
      }
    ],
    timeline: [
      {
        dateFr: "Février 2024",
        dateEn: "February 2024",
        titleFr: "Spécifications & Maquettes",
        titleEn: "Specifications & Wireframes",
        milestoneFr: "Validation interactive du double flux utilisateur pour les acheminements de colis.",
        milestoneEn: "Driver spatial assignment and parcel journey workflow approved by early logistics experts.",
        status: "completed",
        deliverableDetails: {
          fr: ["Planification des parcours de chauffeurs", "Maquettes UX/UI du tableau de bord", "Spécifications de la file d'attente d'attribution"],
          en: ["Driver spatial dispatch roadmap", "Full UX/UI Figma/interactive drafts", "Queue assignment logic specs"]
        }
      },
      {
        dateFr: "Juillet 2024",
        dateEn: "July 2024",
        titleFr: "Intégration Mobile Money",
        titleEn: "Wave & OM Checkout Sync",
        milestoneFr: "Passerelles de paiement locales prêtes avec validation cryptographique instantanée.",
        milestoneEn: "Secured checkout checkpoints with direct Wave money API and SMS confirmations.",
        status: "completed",
        deliverableDetails: {
          fr: ["API de paiement Wave intégrée", "Callbacks sécurisés Orange Money", "Validation cryptographique instantanée"],
          en: ["Wave Checkout SDK implementation", "Orange Money webhook triggers", "Immediate client-ledger verification"]
        }
      },
      {
        dateFr: "Décembre 2024",
        dateEn: "December 2024",
        titleFr: "Lancement Grand Public",
        titleEn: "App Stores Release",
        milestoneFr: "Déploiement Android/iOS. Plus de 5 000 colis acheminés dès le premier mois.",
        milestoneEn: "Official stores rollout. 5,000+ localized transport order coordinates executed safely.",
        status: "completed",
        deliverableDetails: {
          fr: ["Déploiement App Store & Google Play", "Système de suivi SMS en temps réel", "Tests de charge en conditions réelles"],
          en: ["Google Play & iOS App Store releases", "Real-time delivery SMS updates", "High-concurrency load benchmark tests"]
        }
      },
      {
        dateFr: "Actuel",
        dateEn: "Current",
        titleFr: "Dispatcher Prédictif",
        titleEn: "Predictive Dispatching",
        milestoneFr: "Calcul automatisé réduisant les temps de parcours ruraux et urbains de 30%.",
        milestoneEn: "Advanced routing algorithms minimizing transition delays and vehicle dispatch gaps.",
        status: "current",
        deliverableDetails: {
          fr: ["Calcul automatisé d'itinéraire optimal", "Algorithme d'affectation dynamique de ressources", "Optimisation de la consommation de batterie"],
          en: ["Optimal shortest-path routing", "Smart background pooling engine", "Resource allocation battery optimizations"]
        }
      }
    ]
  },
  {
    id: 'birkama',
    name: 'Birkama Balante',
    logoType: 'svg',
    svgColor: 'text-green-600 bg-green-50 dark:bg-green-950/40 border border-green-600/20 shadow-sm shadow-green-600/5',
    svgIcon: (
      <div className="flex items-center justify-center">
        <Landmark className="w-8 h-8 stroke-[1.8]" />
      </div>
    ),
    category: 'Institutionnel',
    expertiseFr: 'Secteur Public',
    expertiseEn: 'Public Sector',
    descriptionFr: 'Portail officiel d’information publique, d’attractivité territoriale et de valorisation culturelle de la localité.',
    descriptionEn: 'Official digital municipality portal, hosting public communication and cultural legacy archives.',
    collabFr: 'Développement d’un CMS statique JAMstack de dernière génération, performant et hautement sécurisé.',
    collabEn: 'Sub-second serverless architecture engineered with a customized, lightweight Markdown content pipeline.',
    historyFr: "HardSoft Technologies a été sélectionné pour concevoir la vitrine numérique de Birkama Balante, afin de booster la visibilité de l'administration locale et le tourisme culturel. Afin d'offrir une fluidité remarquable même sur de faibles connexions régionales, nous avons opté pour un déploiement JAMstack statique sécurisé relié à un CMS simple d'utilisation pour les agents publics sans bagage technique particulier.",
    historyEn: "HardSoft Technologies was chosen to develop the formal digital gateway for Birkama Balante to foster tourism and administrative transparency. To provide fluid reading speeds on regional slow networks, we rolled out a reliable serverless JAMstack structure integrated with an intuitive markdown content generator easily handled by non-technical municipal workers.",
    milestonesFr: [
      "Temps de chargement inférieur à 0.4 seconde (JAMstack)",
      "Intégration d'archives historiques interactives",
      "Système de réclamation publique et suivi citoyen",
      "Autonomie totale de l'équipe administrative locale"
    ],
    milestonesEn: [
      "Outstanding loading benchmarks (sub-second performance)",
      "Interactive media legacy & archive timeline",
      "Public municipal suggestions & civic complaint channel",
      "Complete autonomy achieved by the regional admin team"
    ],
    website: 'https://birkamabalante.com',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        titleFr: "Portail Institutionnel & Plateforme Citoyenne",
        titleEn: "Institutional Portal and Citizen Portal Interface"
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
        titleFr: "Console d’Administration du Contenu Local",
        titleEn: "Sub-Admin CMS & Regional Event Publisher"
      }
    ],
    timeline: [
      {
        dateFr: "Janvier 2024",
        dateEn: "January 2024",
        titleFr: "Ateliers de Cocréation",
        titleEn: "Community Design Workshops",
        milestoneFr: "Collecte des prérequis d'accès citoyen avec le conseil municipal.",
        milestoneEn: "Gathering direct civic accessibility factors with regional municipality leads.",
        status: "completed",
        deliverableDetails: {
          fr: ["Interviews des citoyens locaux", "Cartographie des besoins d'e-gouvernance", "Conception de l'architecture d'information"],
          en: ["Civic design feedback surveys", "Interactive public services mapping", "Simplified site layout architecture"]
        }
      },
      {
        dateFr: "Juin 2024",
        dateEn: "June 2024",
        titleFr: "Déploiement Serverless",
        titleEn: "Serverless JAMstack Deploy",
        milestoneFr: "Site web ultra-rapide sous-seconde insensible aux coupures réseau.",
        milestoneEn: "Sub-second loading times secured against poor local broadband structures.",
        status: "completed",
        deliverableDetails: {
          fr: ["Configuration du CDN multi-régions", "Architecture JAMstack ultra-performante", "Sécurisation contre les attaques DDoS"],
          en: ["Edge CDN multi-region routing", "Serverless static rendering configuration", "DDoS mitigation firewall protocols"]
        }
      },
      {
        dateFr: "Novembre 2024",
        dateEn: "November 2024",
        titleFr: "Transfert d'Autonomie",
        titleEn: "CMS Hand-off & Training",
        milestoneFr: "Prise en main du CMS décentralisé par 15 agents communaux sans formation technique préalable.",
        milestoneEn: "Complete autonomy reached by 15 local municipal administrators on the CMS dashboard.",
        status: "completed",
        deliverableDetails: {
          fr: ["Développement d'un CMS Markdown intuitif", "Sessions de formation des agents", "Documentation technique illustrée"],
          en: ["Custom lightweight markdown editor", "Interactive municipal onboarding", "Full operations documentation manual"]
        }
      },
      {
        dateFr: "Actuel",
        dateEn: "Current",
        titleFr: "Suivi des Doléances",
        titleEn: "Civic Resolution Pipeline",
        milestoneFr: "Traitement transparent en ligne des réclamations avec suivi d'impact en temps réel.",
        milestoneEn: "Direct civic feedback form handling active case monitoring in local regions.",
        status: "current",
        deliverableDetails: {
          fr: ["Formulaire de doléances chiffré", "Pipeline d'assignation communale", "Indicateurs de résolution publique"],
          en: ["Encrypted online feedback input form", "Municipality ticket resolver pipeline", "Civic completion statistics panels"]
        }
      }
    ]
  },
  {
    id: 'dakartech',
    name: 'Dakar Digital Center',
    logoType: 'svg',
    svgColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/20 shadow-sm shadow-indigo-500/5',
    svgIcon: (
      <div className="relative flex items-center justify-center">
        <Cpu className="w-8 h-8 stroke-[1.8]" />
        <Layers className="absolute w-4 h-4 text-indigo-600 dark:text-indigo-400 translate-y-3 opacity-60 stroke-[2]" />
      </div>
    ),
    category: 'Digital',
    expertiseFr: 'Tech & Formation',
    expertiseEn: 'EdTech & Tech',
    descriptionFr: 'Hub technologique régional d’accompagnement vers l’emploi et de perfectionnement aux enjeux de l’économie numérique.',
    descriptionEn: 'Regional premier digital skill forge providing mentorship, incubation services, and state-of-the-art tech workspace.',
    collabFr: 'Formations approfondies dispensées en synergie sur l’architecture Angular, React, Node.js et les outils cloud.',
    collabEn: 'Joint executive masterclasses covering modern full-stack methodologies and cloud automation workflows.',
    historyFr: "Face aux besoins exponentiels en compétences numériques avancées en Afrique de l'Ouest, HardSoft Technologies et Dakar Digital Center unissent périodiquement leurs forces. Nous fournissons des programmes de cours actualisés, des exercices concrets et des interventions d'experts-développeurs pour former la future génération d'ingénieurs en génie logiciel.",
    historyEn: "Addressing West Africa's rapid demand for specialized digital engineering talents, HardSoft Technologies and Dakar Digital Center organize continuous education events. We bring up-to-date program matrices, concrete case simulations, and senior engineering lectures on advanced Javascript frameworks and cloud DevOps.",
    milestonesFr: [
      "Plus de 150 développeurs formés aux technologies modernes",
      "Mentorat intensif pour l'insertion des apprenants",
      "Hackathons conjoints sur les défis technologiques locaux",
      "Soutien aux projets et startups incubées par le centre"
    ],
    milestonesEn: [
      "150+ professional junior engineers successfully upskilled",
      "Direct placement and active recruitment pipelines",
      "Co-hosted Hackathons targeting regional socioeconomic challenges",
      "Active technology support given to on-site incubated startups"
    ],
    website: '#',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
        titleFr: "Conférence Technique et Session de Mentorat Collectif",
        titleEn: "Technical Bootcamp & Collaborative Coding Labs"
      },
      {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
        titleFr: "Présentation Finale des Projets Innovants de fin de Cycle",
        titleEn: "Product Demos and Startup Mentorship Events"
      }
    ],
    timeline: [
      {
        dateFr: "Avril 2024",
        dateEn: "April 2024",
        titleFr: "Ingénierie du Programme",
        titleEn: "Syllabus Structuring",
        milestoneFr: "Conception conjointe du curriculum ciblant React, TypeScript et Node sur-mesure.",
        milestoneEn: "Interactive syllabus draft completed and approved by regional EdTech authorities.",
        status: "completed",
        deliverableDetails: {
          fr: ["Syllabus axé sur React et TypeScript", "Préparation des cas d'études industriels", "Mise en place des environnements Cloud"],
          en: ["Tailwind & TypeScript tech syllabus", "Real-world engineering case setups", "Sandbox development platform configuration"]
        }
      },
      {
        dateFr: "Août 2024",
        dateEn: "August 2024",
        titleFr: "Bootcamp React & Cloud",
        titleEn: "React & Cloud Intensive",
        milestoneFr: "Taux d'insertion professionnelle immédiat élevé de la première promotion d'étudiants.",
        milestoneEn: "94% successful graduation rate on complex production-grade assignments.",
        status: "completed",
        deliverableDetails: {
          fr: ["9 modules de formation intensive", "Séminaires d'architecture logicielle", "Évaluation des projets professionnels de fin d'études"],
          en: ["9 focused codebase building sprints", "Senior software patterns lecturing", "Industrial graduation project oversight"]
        }
      },
      {
        dateFr: "Janvier 2025",
        dateEn: "January 2025",
        titleFr: "Incubateur de Startups",
        titleEn: "Startup Sandbox Labs",
        milestoneFr: "Soutien et mentorship technologique intense donné à 3 projets digitaux émergents.",
        milestoneEn: "Full development resources and technical feedback loops shared with 3 early-stage projects.",
        status: "completed",
        deliverableDetails: {
          fr: ["Coaching technique quotidien pour 3 startups", "Revues de code d'applications de production", "Préparation aux démonstrations techniques"],
          en: ["On-demand coding mentorship", "Production core security reviews", "Pre-demo testing simulation days"]
        }
      },
      {
        dateFr: "Actuel",
        dateEn: "Current",
        titleFr: "Passerelle Carrières SN",
        titleEn: "Employer Bridge Engine",
        milestoneFr: "Mise en relation directe avec les recruteurs partenaires d'Afrique de l'Ouest.",
        milestoneEn: "Connecting senior students with recruiting local businesses and regional tech leaders.",
        status: "current",
        deliverableDetails: {
          fr: ["Mise en place de la plateforme d'emplois", "Portfolios d'étudiants vérifiés", "Partenariats avec des recruteurs locaux"],
          en: ["Dynamic placement platform launched", "Verified student project directory", "Co-arranged recruiter matchmaking"]
        }
      }
    ]
  },
  {
    id: 'superboutique',
    name: 'Boutiques Unies - POS',
    logoType: 'svg',
    svgColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20 shadow-sm shadow-amber-500/5',
    svgIcon: (
      <div className="flex items-center justify-center">
        <Store className="w-8 h-8 stroke-[1.8]" />
      </div>
    ),
    category: 'Retail',
    expertiseFr: 'Fintech & Commerce',
    expertiseEn: 'Fintech & Retail',
    descriptionFr: 'Groupement de commerçants indépendants équipés de terminaux de paiement modernes et intelligents interconnectés.',
    descriptionEn: 'A retail merchant association leveraging offline-first smart payment terminals and inventory dashboards.',
    collabFr: 'Déploiement, configuration et maintenance de notre solution logicielle d’encaissement HardSoft POS.',
    collabEn: 'System deployment of our point-of-sale firmware equipped with continuous local offline storage syncing.',
    historyFr: "L'écosystème HardSoft POS a été développé pour éradiquer le manque de traçabilité comptable et les pertes de stock dans les commerces de détail sénégalais. En équipant les Boutiques Unies de nos systèmes tactiles en mode hors-ligne crypté, nous avons permis aux détaillants d'avoir un bilan financier quotidien clair, de scanner les codes-barres en un clin d'œil, et d'enregistrer les paiements via téléphones d'une manière fiable.",
    historyEn: "The HardSoft POS ecosystem was coded specifically to combat low visibility on retail margins and stock discrepancies. Deploying tactile hardware on site with cryptographically guarded local offline storage, we granted family-run stores professional tools to scan barcodes, access reliable profit sheets, and execute smart checkouts easily.",
    milestonesFr: [
      "50+ boutiques équipées avec succès à Dakar et Ziguinchor",
      "Multiplication par deux de la vitesse de passage en caisse",
      "Synchronisation automatique et transparente dès connexion Internet",
      "Suivi des pertes et relance des stocks automatisé"
    ],
    milestonesEn: [
      "50+ local grocery stores equipped in Dakar & Ziguinchor",
      "Checkout waiting lines reduced by nearly 50%",
      "Seamless push-sync triggered as soon as network is detected",
      "Automated low-inventory notifications preventing out-of-stock events"
    ],
    website: '#',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
        titleFr: "Interface d’Encaissement Tactile Optimisée",
        titleEn: "Tactile POS Cashier Terminal Workflow Layout"
      },
      {
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
        titleFr: "Suivi des Ventes Globale Sur Tableau de Bord Web Admin",
        titleEn: "Unified Analytics & Margin Tracking Dashboard"
      }
    ],
    timeline: [
      {
        dateFr: "Mai 2024",
        dateEn: "May 2024",
        titleFr: "Lancement Pilote Offline",
        titleEn: "Offline Pilot Phase",
        milestoneFr: "Mise à l'épreuve de l'application tactile d'encaissement dans 10 boutiques d'alimentation.",
        milestoneEn: "Placing tactile offline-first machines inside 10 family retail stores.",
        status: "completed",
        deliverableDetails: {
          fr: ["Interface homme-machine tactile conçue", "Stockage localisé chiffré sur l'appareil", "Matériel d'essai installé sur 10 points"],
          en: ["Tactile responsive UI layout system", "IndexedDB client storage configuration", "Terminal pilot testing kits deployed"]
        }
      },
      {
        dateFr: "Septembre 2024",
        dateEn: "September 2024",
        titleFr: "Moteur de Synchronisation",
        titleEn: "Auto Sync Engine v2",
        milestoneFr: "Zéro perte de données en cas d'interruption électrique ou de coupure réseau.",
        milestoneEn: "Synchronizing offline sales transparently as soon as an active signal is detected.",
        status: "completed",
        deliverableDetails: {
          fr: ["Algorithme de réconciliation de ventes", "Gestion intelligente des conflits de stock", "Compression de charge utile réseau"],
          en: ["Algorithmic double-booking checks", "Auto conflict-resolution engine", "Payload chunking during weak networks"]
        }
      },
      {
        dateFr: "Janvier 2025",
        dateEn: "January 2025",
        titleFr: "Déploiement de Masse",
        titleEn: "Massive Retail Expansion",
        milestoneFr: "Plus de 50 boutiques équipées et formées à Dakar et à Ziguinchor.",
        milestoneEn: "50+ active retailers transacting millions of CFA weekly with complete stock visibility.",
        status: "completed",
        deliverableDetails: {
          fr: ["Installation de 50+ terminaux physiques", "Formation rapide des commerçants de quartier", "Tableaux de bord d'administration globale"],
          en: ["Rollout across 50+ corner stores", "Merchant visual quick-guides", "Admin centralized store monitor panels"]
        }
      },
      {
        dateFr: "Actuel",
        dateEn: "Current",
        titleFr: "Portail Métier des Marges",
        titleEn: "Unified Insights Panel",
        milestoneFr: "Aperçu de la rentabilité globale en un coup d'œil pour le groupement de commerçants.",
        milestoneEn: "Advanced inventory analytics tools allowing vendors to plan strategic bulk buying.",
        status: "current",
        deliverableDetails: {
          fr: ["Rapports de rentabilité en temps réel", "Outils de prédiction des stocks restants", "Export de données comptables certifiées"],
          en: ["Live gross-margin calculations", "Predictive replenishment trigger alerts", "Certified spreadsheet bookkeeping exports"]
        }
      }
    ]
  },
  {
    id: 'sahelsol',
    name: 'Sahel Agro Solutions',
    logoType: 'svg',
    svgColor: 'text-teal-500 bg-teal-50 dark:bg-teal-950/40 border border-teal-500/20 shadow-sm shadow-teal-500/5',
    svgIcon: (
      <div className="flex items-center justify-center">
        <Sprout className="w-8 h-8 stroke-[1.8]" />
      </div>
    ),
    category: 'Institutionnel',
    expertiseFr: 'AgriTech',
    expertiseEn: 'AgriTech',
    descriptionFr: 'Acteur majeur de l’agrobusiness axé sur la structuration, le conditionnement et l’exportation de ressources agricoles.',
    descriptionEn: 'Agribusiness leader focused on local food packaging, organic resources sourcing, and rural logistics networks.',
    collabFr: 'Mise en place d’un gestionnaire de commandes automatisé relié à un bot de suivi de stocks WhatsApp.',
    collabEn: 'Implementation of custom-programmed logistics dispatch triggers and automated customer contact loops.',
    historyFr: "Afin de surmonter les obstacles logistiques entre les fermes rurales de Casamance et les centrales de conditionnement de Dakar, Sahel Agro Solutions a mandaté HardSoft Technologies pour concevoir un tracker d'inventaire couplé à des services de messagerie automatisés. Les responsables d'exploitation peuvent saisir l'état des récoltes directement via un assistant WhatsApp intelligent, synchronisant automatiquement l'ERP cloud central.",
    historyEn: "To bridge the regional transit barriers separating deep Casamance farms with Dakar's packaging facilities, Sahel Agro Solutions tasked HardSoft Technologies with engineering an inventory monitor paired with messaging bots. Farm leaders enter harvest weights via automated WhatsApp bots, instantly updating the central cloud ERP.",
    milestonesFr: [
      "Automatisation complète des rapports de cueillette par WhatsApp",
      "Économie de près de 30% sur les pertes logistiques de transport",
      "Base de données centralisée accessible par les investisseurs",
      "Traçabilité totale des produits du champ jusqu'à l'export"
    ],
    milestonesEn: [
      "WhatsApp automated harvest tracking & report collection bots",
      "Transport logistics delivery losses trimmed by 30%",
      "Consolidated real-time operational dashboard for investors",
      "Complete field-to-export product tracking & verification metrics"
    ],
    website: '#',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
        titleFr: "Système Centralisé de Gestion Agro-logistique",
        titleEn: "Agri-Supply Logistics Operations Portal"
      },
      {
        url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800',
        titleFr: "Reporting de récolte automatisé et assistant WhatsApp",
        titleEn: "WhatsApp Harvesting Log Integration Screen"
      }
    ],
    timeline: [
      {
        dateFr: "Juin 2024",
        dateEn: "June 2024",
        titleFr: "Étude Terrain Casamance",
        titleEn: "Casamance Field Audit",
        milestoneFr: "Audit et cartographie des durées de transit des fruits de Casamance vers Dakar.",
        milestoneEn: "Mapping supply chain transit bottlenecks and harvest decay factors on deep routes.",
        status: "completed",
        deliverableDetails: {
          fr: ["Enquêtes logistiques de transit", "Mesures d'humidité et de pourrissement", "Élaboration du plan de contrôle mobile"],
          en: ["Agricultural logistics bottleneck survey", "Fruit storage condition benchmarks", "Supply chain digital workflow roadmap"]
        }
      },
      {
        dateFr: "Novembre 2024",
        dateEn: "November 2024",
        titleFr: "Assistant Bot WhatsApp",
        titleEn: "WhatsApp Harvesting Bot",
        milestoneFr: "La saisie des volumes récoltés est simplifiée à l'extrême pour les producteurs ruraux.",
        milestoneEn: "Interactive automated WhatsApp chat templates adopted on-site by rural teams.",
        status: "completed",
        deliverableDetails: {
          fr: ["Arbres de décision automatisés par SMS", "Parsing intelligent des poids récoltés", "Confirmation instantanée par SMS"],
          en: ["Automated WhatsApp dialogue tree", "RegEx harvest-input parsing model", "Immediate confirmation logs back to farmers"]
        }
      },
      {
        dateFr: "Février 2025",
        dateEn: "February 2025",
        titleFr: "Déploiement Synchronisé ERP",
        titleEn: "ERP Centralization Engine",
        milestoneFr: "Réduction immédiate de 30% des pertes financières liées aux écarts de pesage.",
        milestoneEn: "Unified ledger reducing agricultural transaction errors and weight claims by 30%.",
        status: "completed",
        deliverableDetails: {
          fr: ["Intégration d'API centrale multilatérale", "Tableau de statistiques de pesage", "Alertes d'écarts logistiques en temps réel"],
          en: ["ERP REST middleware integrations", "Digital logging of scale metrics", "Live real-time transit delta triggers"]
        }
      },
      {
        dateFr: "Actuel",
        dateEn: "Current",
        titleFr: "Traceur Qualité Exportation",
        titleEn: "Export Trust & Verification",
        milestoneFr: "Mise en place de QR codes d'origine garantissant la traçabilité biologique absolue.",
        milestoneEn: "Organic status tracking allowing international buyers to scan origins easily.",
        status: "current",
        deliverableDetails: {
          fr: ["Générateur de QR codes uniques de traçabilité", "Certificats biologiques chiffrés", "Portail public d'origine des palettes"],
          en: ["Cryptographic tracing QR generator", "Organic certification metadata registry", "Overseas buyers origin mapping page"]
        }
      }
    ]
  }
];

const EXPERTISE_FILTERS = [
  { fr: 'Tous', en: 'All' },
  { fr: 'Santé', en: 'Health' },
  { fr: 'Logistique', en: 'Logistics' },
  { fr: 'Fintech & Commerce', en: 'Fintech & Retail' },
  { fr: 'AgriTech', en: 'AgriTech' },
  { fr: 'Secteur Public', en: 'Public Sector' },
  { fr: 'Tech & Formation', en: 'EdTech & Tech' }
];

const CATEGORY_FILTERS = [
  { fr: 'Tous', en: 'All' },
  { fr: 'SaaS', en: 'SaaS' },
  { fr: 'Institutionnel', en: 'Corporate & NGO' },
  { fr: 'Retail', en: 'Retail' },
  { fr: 'Digital', en: 'Digital' }
];

export default function Partners() {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [filterType, setFilterType] = useState<'expertise' | 'category'>('expertise');
  const [activeExpertise, setActiveExpertise] = useState<string>('Tous');
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  
  // Modal detailing specific selected partner
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  // Lightbox for selected gallery image inside modal
  const [activeZoomImage, setActiveZoomImage] = useState<string | null>(null);
  const [activeZoomTitle, setActiveZoomTitle] = useState<string>('');

  // Filter partners based on chosen type and selected value
  const filteredPartners = partners.filter((p) => {
    if (filterType === 'expertise') {
      if (activeExpertise === 'Tous') return true;
      return p.expertiseFr === activeExpertise;
    } else {
      if (activeCategory === 'Tous') return true;
      return p.category === activeCategory;
    }
  });

  const handleFilterTypeChange = (type: 'expertise' | 'category') => {
    setFilterType(type);
    // Reset secondary states to 'Tous' on switch
    setActiveExpertise('Tous');
    setActiveCategory('Tous');
  };

  const openPartnerDetails = (partner: Partner) => {
    setSelectedPartner(partner);
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closePartnerDetails = () => {
    setSelectedPartner(null);
    setActiveZoomImage(null);
    document.body.style.overflow = 'unset'; // Unlock scroll
  };

  const triggerZoomImage = (url: string, title: string) => {
    setActiveZoomImage(url);
    setActiveZoomTitle(title);
  };

  const closeZoomImage = () => {
    setActiveZoomImage(null);
  };

  return (
    <section 
      id="partners" 
      data-seo-title={isFr ? "Nos Partenaires de Confiance | HardSoft Technologies" : "Our Trusted Partners | HardSoft Technologies"} 
      data-seo-description={isFr ? "Découvrez les entreprises, startups et institutions qui font confiance à HardSoft Technologies pour leur transformation digitale." : "Discover the businesses, startups, and institutions that trust HardSoft Technologies for their digital scaling."}
      className="py-24 px-6 bg-white dark:bg-slate-950 border-t border-slate-205 dark:border-slate-800"
    >
      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-55/10 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full select-none">
            {isFr ? "PARTENARIATS" : "TRUST AND PARTNERS"}
          </span>
          <h2 className="font-display text-3xl md:text-5xl 2xl:text-6xl font-bold mb-4 tracking-tight mt-4 text-slate-900 dark:text-white">
            {isFr ? "Ils nous font confiance" : "Trusted by Forward-Thinking Brands"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg 2xl:text-xl leading-relaxed">
            {isFr 
              ? "Nous collaborons avec des startups innovantes, des institutions locales et des commerces de premier plan pour concevoir des solutions performantes." 
              : "We collaborate with innovative startups, local institutions, and reference retailers to deploy robust software solutions."}
          </p>
        </div>

        {/* Unified Interactive Control Panel */}
        <div className="max-w-3xl mx-auto mb-10 p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 shadow-sm/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-505 dark:text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {isFr ? "Trier par :" : "Filter by :"}
              </span>
            </div>
            
            {/* Filter Type Toggle Switch */}
            <div className="flex bg-slate-200/60 dark:bg-slate-950 p-1 rounded-xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleFilterTypeChange('expertise')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-300 ${
                  filterType === 'expertise'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isFr ? "Secteur d'activité" : "Expertise Domain"}
              </button>
              <button
                type="button"
                onClick={() => handleFilterTypeChange('category')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all duration-300 ${
                  filterType === 'category'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isFr ? "Type de structure" : "Structure Type"}
              </button>
            </div>
          </div>

          {/* Sub-Tabs Selector based on toggle */}
          <div className="pt-4 overflow-x-auto scrollbar-none">
            <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
              <AnimatePresence mode="wait">
                {filterType === 'expertise' ? (
                  <motion.div
                    key="expertise-buttons"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-wrap gap-1.5"
                  >
                    {EXPERTISE_FILTERS.map((item) => (
                      <button
                        key={item.fr}
                        onClick={() => setActiveExpertise(item.fr)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeExpertise === item.fr
                            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                            : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-850'
                        }`}
                      >
                        {isFr ? item.fr : item.en}
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="category-buttons"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-wrap gap-1.5"
                  >
                    {CATEGORY_FILTERS.map((item) => (
                      <button
                        key={item.fr}
                        onClick={() => setActiveCategory(item.fr)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeCategory === item.fr
                            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                            : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-850'
                        }`}
                      >
                        {isFr ? item.fr : item.en}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((partner) => (
              <motion.div
                key={partner.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-6 flex flex-col hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-550/5 transition-all duration-300"
              >
                {/* Visual Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-505/10 to-transparent group-hover:via-indigo-505/40 rounded-t-2xl transition-all duration-500" />
                
                {/* Header Information */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Brand Visual Logo */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${partner.svgColor}`}>
                    {partner.logoType === 'image' && partner.logoUrl ? (
                      <img 
                        src={partner.logoUrl} 
                        alt={partner.name} 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-contain" 
                      />
                    ) : (
                      partner.svgIcon
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-x-1.5 items-center">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-550 dark:text-indigo-400 font-display">
                        {partner.category}
                      </span>
                      <span className="text-[10px] text-slate-300 dark:text-slate-700 font-bold">•</span>
                      <span className="text-[10px] uppercase font-mono font-extrabold tracking-tight text-slate-500 dark:text-slate-400 bg-slate-200/40 dark:bg-slate-950/80 px-1.5 py-0.5 rounded">
                        {isFr ? partner.expertiseFr : partner.expertiseEn}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight truncate mt-1">
                      {partner.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 pr-1 line-clamp-3">
                  {isFr ? partner.descriptionFr : partner.descriptionEn}
                </p>

                {/* Collaboration Box Details */}
                <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-3.5 space-y-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">
                      {isFr ? 'Secteur d’impact' : 'Impact Sector'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-350 leading-relaxed truncate">
                    {isFr ? partner.collabFr : partner.collabEn}
                  </p>
                </div>

                {/* Action Links & Interactive View Case triggering */}
                <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-slate-200/40 dark:border-slate-800/60">
                  <button
                    type="button"
                    onClick={() => openPartnerDetails(partner)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <span>{isFr ? "Voir la collaboration →" : "View partnership →"}</span>
                  </button>

                  {partner.website && partner.website !== '#' && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} // Avoid triggering cart click
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-indigo-550 dark:hover:text-indigo-400 transition-colors cursor-pointer group/link"
                      title={isFr ? "Visiter le portail officiel" : "Visit official portal"}
                    >
                      <ArrowUpRight size={13} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Edit Guidance Box for the User (Elegant and Professional helper) */}
        <div className="mt-16 bg-indigo-50/50 dark:bg-slate-900/40 p-6 rounded-2xl border border-indigo-150/40 dark:border-slate-800/80 max-w-4xl mx-auto flex flex-col md:flex-row gap-5 items-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              {isFr ? "Information pour l'administration" : "Developer & Administration notice"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {isFr 
                ? "Cliquez sur n'importe quel partenaire pour ouvrir une fiche détaillée interactive présentant l'historique complet de la collaboration, les jalons atteints et une galerie d'images des réalisations."
                : "Click on any partner card to overlay an interactive case file showing complete collaboration history, key milestones delivered, and robust screens layouts."}
            </p>
          </div>
        </div>

      </div>

      {/* DETAILED INTERACTIVE PARTNER MODAL */}
      <AnimatePresence>
        {selectedPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 mb-0 overflow-y-auto">
            
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePartnerDetails}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-5xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl shadow-indigo-500/10 overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              
              {/* Sticky Top bar */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedPartner.svgColor}`}>
                    {selectedPartner.logoType === 'image' && selectedPartner.logoUrl ? (
                      <img 
                        src={selectedPartner.logoUrl} 
                        alt={selectedPartner.name} 
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 object-contain" 
                      />
                    ) : (
                      selectedPartner.svgIcon
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight leading-tight">
                      {selectedPartner.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      <span>{selectedPartner.category}</span>
                      <span>•</span>
                      <span>{isFr ? selectedPartner.expertiseFr : selectedPartner.expertiseEn}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedPartner.website && selectedPartner.website !== '#' && (
                    <a
                      href={selectedPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-205 dark:border-slate-800"
                    >
                      <span className="hidden sm:inline">{isFr ? "Site web" : "Website"}</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={closePartnerDetails}
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
                
                {/* Visual Intro Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Extensive Historical Background */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <Calendar size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider font-display">
                          {isFr ? "Historique de la collaboration" : "Collaboration Case History"}
                        </span>
                      </div>
                      <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-xl sm:text-2xl tracking-tight leading-snug">
                        {isFr ? "Innover ensemble face aux défis métiers" : "Engineering complex workflows, together"}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans pt-1">
                        {isFr ? selectedPartner.historyFr : selectedPartner.historyEn}
                      </p>
                    </div>

                    {/* Milestones / Delivered outputs list */}
                    {selectedPartner.milestonesFr && (
                      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-150/60 dark:border-slate-800/80 space-y-4">
                        <div className="flex items-center gap-2">
                          <BadgeCheck className="w-5 h-5 text-indigo-500" />
                          <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-display">
                            {isFr ? "Jalons Clés et Livrables Atteints" : "Key Milestones & Delivered Success"}
                          </h5>
                        </div>

                        <ul className="space-y-3">
                          {(isFr ? selectedPartner.milestonesFr : selectedPartner.milestonesEn).map((milestone, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-450 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                              <span className="font-semibold">{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Interactive Gallery of Accomplished interfaces */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                      <ImageIcon size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider font-display">
                        {isFr ? "Réalisations en image" : "Screenshots & Mockups"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
                      {isFr 
                        ? "Cliquez sur une diapositive pour agrandir la vue de l'interface conçue par HardSoft." 
                        : "Click on any grid interface preview to zoom into high-fidelity mockups crafted by HardSoft."}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {selectedPartner.gallery.map((img, index) => (
                        <div 
                          key={index}
                          onClick={() => triggerZoomImage(img.url, isFr ? img.titleFr : img.titleEn)}
                          className="group relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 aspect-video cursor-zoom-in shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <img 
                            src={img.url} 
                            alt={isFr ? img.titleFr : img.titleEn}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
                            <div className="h-9 w-9 rounded-full bg-white dark:bg-slate-950 text-slate-800 dark:text-white flex items-center justify-center shadow">
                              <Eye size={16} />
                            </div>
                          </div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent">
                            <span className="text-[10px] font-bold text-white block truncate">
                              {isFr ? img.titleFr : img.titleEn}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quality statement block */}
                    <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center bg-slate-50/40 dark:bg-transparent">
                      <span className="text-[10px] text-slate-400 dark:text-slate-550 block leading-relaxed font-mono">
                        {isFr 
                          ? "Ces vues correspondent aux maquettes fonctionnelles et interfaces d'applications approuvées." 
                          : "These previews illustrate formal interface models approved for active system modules."}
                      </span>
                    </div>
                  </div>

                </div>

                {/* VISUAL STRATEGIC DELIVERY TIMELINE LINKING DELIVERABLES TO CLIENT SUCCESS MILESTONES */}
                {selectedPartner.timeline && (
                  <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2 text-indigo-650 dark:text-indigo-400">
                          <span className="flex h-2 w-2 rounded-full bg-indigo-505 animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-wider font-display">
                            {isFr ? "Chronologie de Livraison & Indicateurs de Succès" : "Implementation Timeline & Success Indicators"}
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-slate-900 dark:text-white text-lg sm:text-xl tracking-tight">
                          {isFr ? "Jalons de livraison technique & Impact client mesurable" : "Technical Delivery Iterations & Linked Client Growth Impact"}
                        </h4>
                      </div>

                      {/* Timeline Legend */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850 shadow-sm/30 select-none">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white">✓</span>
                          <span>{isFr ? "Livré d'après contrat" : "Contract Delivered"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                          <span>{isFr ? "En Cours d'activation" : "Active & Tuning"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Tracker Lane */}
                    <div className="relative pt-4">
                      
                      {/* Horizontal connecting track on desktop */}
                      <div className="absolute top-[34px] left-[50px] right-[50px] h-0.5 bg-slate-250 dark:bg-slate-800 hidden lg:block" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        {selectedPartner.timeline.map((item, idx) => {
                          const isCompleted = item.status === 'completed';
                          const isCurrent = item.status === 'current';
                          
                          // Safely resolve the parallel success milestone
                          const linkedMilestone = isFr 
                            ? selectedPartner.milestonesFr[idx] 
                            : selectedPartner.milestonesEn[idx];
                          
                          return (
                            <div key={idx} className="relative flex flex-col items-start gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/70 dark:border-slate-850/80 hover:border-indigo-500/20 dark:hover:border-indigo-400/20 hover:shadow-lg transition-all duration-300">
                              
                              {/* Connector track details on item level */}
                              <div className="flex items-center justify-between w-full">
                                <span className={`font-mono text-[10px] items-center px-2.5 py-1 rounded font-extrabold tracking-wide uppercase ${
                                  isCompleted 
                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' 
                                    : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                                }`}>
                                  {isFr ? item.dateFr : item.dateEn}
                                </span>

                                <div className="flex items-center justify-center">
                                  {isCompleted ? (
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-emerald-500/10">
                                      ✓
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-indigo-600/10 animate-pulse">
                                      ●
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Text Block Content */}
                              <div className="space-y-2 text-left w-full flex-grow">
                                <h5 className="font-display font-extrabold text-[#0D0E11] dark:text-white text-xs sm:text-sm tracking-tight">
                                  {isFr ? item.titleFr : item.titleEn}
                                </h5>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
                                  {isFr ? item.milestoneFr : item.milestoneEn}
                                </p>

                                {/* Bulleted list of technical achievements */}
                                {item.deliverableDetails && (
                                  <ul className="mt-2.5 space-y-1.5 list-disc pl-4.5 text-slate-500 dark:text-slate-400 text-[11px] leading-normal font-sans">
                                    {(isFr ? item.deliverableDetails.fr : item.deliverableDetails.en).map((detail, dIdx) => (
                                      <li key={dIdx} className="marker:text-indigo-400 dark:marker:text-indigo-500">
                                        {detail}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>

                              {/* Linked success milestone banner showing real world validation */}
                              {linkedMilestone && (
                                <div className="w-full mt-2 pt-3 border-t border-dashed border-slate-200 dark:border-slate-850/80 text-left">
                                  <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-display mb-1 select-none">
                                    <BadgeCheck className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                                    <span>{isFr ? "Impact & Succès client :" : "Client success link :"}</span>
                                  </div>
                                  <p className="text-[10px] font-bold text-slate-700 dark:text-slate-305 leading-normal pl-5 italic">
                                    "{linkedMilestone}"
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Backing note footer */}
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-900 flex justify-center text-center">
                <span className="text-[10.5px] font-bold text-indigo-500/80 tracking-wide font-display">
                  {isFr 
                    ? `PARTENAIRE CERTIFIÉ HARDSOFT TECHNOLOGIE • ${selectedPartner.category.toUpperCase()}` 
                    : `CERTIFIED OPERATIONAL PARTNER / HARDSOFT • ${selectedPartner.category.toUpperCase()}`}
                </span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX FOR ZOOMED GALLERY IMAGE */}
      <AnimatePresence>
        {activeZoomImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeZoomImage}
              className="fixed inset-0 bg-slate-950/95"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full z-10 flex flex-col items-center gap-4"
            >
              <button
                type="button"
                onClick={closeZoomImage}
                className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer shadow"
                aria-label="Close Preview"
              >
                <X size={20} />
              </button>

              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 max-h-[75vh]">
                <img 
                  src={activeZoomImage} 
                  alt="Zoomed Realisation" 
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[70vh] object-contain" 
                />
              </div>

              <span className="text-sm font-bold text-white tracking-tight bg-slate-900/80 px-4 py-2 rounded-full border border-white/5 shadow">
                {activeZoomTitle}
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
