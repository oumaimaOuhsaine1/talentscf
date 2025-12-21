export interface MenuItemConfig {
  id: string
  label: string
  href: string
  image?: string
  children?: MenuItemConfig[]
}

export interface MenuDataStore {
  items: MenuItemConfig[]
}

// Default menu structure
export const DEFAULT_MENU: MenuDataStore = {
  items: [
    {
      id: 'accueil',
      label: 'Accueil',
      href: '/',
    },
    {
      id: 'apropos',
      label: 'À propos',
      href: '/apropos',
      children: [
        { id: 'qui-sommes', label: 'Qui sommes-nous?', href: '/apropos/qui-sommes-nous' },
        { id: 'equipe', label: 'Notre équipe', href: '/apropos/notre-equipe' },
        { id: 'partenaires', label: 'Nos partenaires', href: '/apropos/nos-partenaires' },
        { id: 'clients', label: 'Nos clients', href: '/apropos/nos-clients' },
        { id: 'centre', label: 'Le centre Talents Consulting Formation', href: '/apropos/centre' },
        { id: 'location-salle', label: 'Location de salle', href: '/location-salles' },
        { id: 'calendrier', label: 'Calendrier des Formations', href: '/apropos/calendrier' },
      ],
    },
    {
      id: 'arfa-dev',
      label: 'Arfa Développement',
      href: '/arfa-developpement',
      image: '/neuro-linguistic-programming.jpg',
      children: [
        { id: 'certification', label: 'Certification PNL', href: '/pnl/certification' },
        { id: 'parcours-coaching', label: 'Parcours coaching génératif & PNL', href: '/pnl/parcours-coaching' },
        { id: 'formation-base', label: 'Formation de base en PNL', href: '/pnl/formation-base' },
        { id: 'cycle-maitre', label: 'Cycle Maître Praticien en PNL', href: '/pnl/cycle-maitre' },
        { id: 'cycle-coaching-gen', label: 'Cycle Coaching Génératif', href: '/pnl/cycle-coaching' },
        { id: 'master-coach', label: 'Cycle Master Coach', href: '/pnl/master-coach' },
        { id: 'enseignants', label: 'Équipe des enseignants', href: '/pnl/enseignants' },
        { id: 'coaching-indiv', label: 'Coaching individuel', href: '/coaching/coaching-individuel' },
        { id: 'coaching-equipe', label: 'Coaching d\'équipe', href: '/coaching/coaching-equipe' },
        { id: 'coaching-ope', label: 'Coaching opérationnel', href: '/coaching/coaching-operationnel' },
        { id: 'coaching-org', label: 'Coaching organisationnel', href: '/coaching/coaching-organisationnel' },
        { id: 'team-building', label: 'Team building', href: '/coaching/team-building' },
        { id: 'bilan-competences', label: 'Bilan des compétences', href: '/coaching/bilan-competences' },
        { id: 'excellence-op', label: 'Excellence opérationnelle', href: '/coaching/excellence-operationnelle' },
        { id: 'organisation', label: 'Organisation', href: '/coaching/organisation' },
        { id: 'changement', label: 'Conduite de changement', href: '/coaching/conduite-changement' },
      ],
    },
    {
      id: 'cycles-pro',
      label: 'Cycles professionnels',
      href: '/cycles-professionnels',
      image: '/professional-development.jpg',
      children: [
        { id: 'dev-perso', label: 'Développement personnel', href: '/cycles-professionnels/dev-personnel' },
        { id: 'formation-formateurs', label: 'Formation des Formateurs', href: '/cycles-professionnels/formation-formateurs' },
      ],
    },
    {
      id: 'intra-entreprises',
      label: 'Intra-entreprises',
      href: '/intra-entreprises',
      image: '/corporate-training-session.png',
      children: [
        { id: 'commercial', label: 'Commercial & Ventes', href: '/intra-entreprises/commercial-ventes' },
        { id: 'management', label: 'Management & Leadership', href: '/intra-entreprises/management-leadership' },
        { id: 'efficacite', label: 'Efficacité Individuelle', href: '/intra-entreprises/efficacite-individuelle' },
        { id: 'mind-mapping', label: 'Formation en Mind Mapping', href: '/intra-entreprises/mind-mapping' },
        { id: 'assurance', label: 'Assurance', href: '/intra-entreprises/assurance' },
        { id: 'ai', label: 'Intelligence Artificielle', href: '/intra-entreprises/ai' },
        { id: 'informatique', label: 'Informatique & IT', href: '/intra-entreprises/informatique' },
      ],
    },
    {
      id: 'diplomes',
      label: 'Diplômes',
      href: '/diplomes',
      image: '/certificate-achievement.jpg',
      children: [
        { id: 'bachelor', label: 'Bachelor', href: '/diplomes/bachelor' },
        { id: 'cambridge', label: 'Cambridge', href: '/diplomes/cambridge' },
        { id: 'mba', label: 'MBA', href: '/diplomes/mba' },
        { id: 'dba', label: 'DBA', href: '/diplomes/dba' },
      ],
    },
    {
      id: 'news',
      label: 'News',
      href: '/news',
      image: '/images/bansection.jpg',
      children: [
        { id: 'prochaines-formations', label: 'Prochaines Formations', href: '/news/formations' },
        { id: 'annonces', label: 'Annonces', href: '/news/annonces' },
        { id: 'evenements-culturels', label: 'Événements Culturels', href: '/news/evenements-culturels' },
      ],
    },
    {
      id: 'langues',
      label: 'Langues',
      href: '/langues',
      image: '/languages-globe.jpg',
      children: [
        { id: 'francais', label: 'Français', href: '/langues/francais', image: '/images/french.png' },
        { id: 'anglais', label: 'Anglais', href: '/langues/anglais', image: '/images/uk.jpg' },
        { id: 'allemand', label: 'Allemand', href: '/langues/allemand', image: '/images/allemand.avif' },
        { id: 'espagnol', label: 'Espagnol', href: '/langues/espagnol', image: '/images/espagnol.avif' },
      ],
    },
    {
      id: 'accompagnement',
      label: 'Accompagnement',
      href: '/accompagnement',
      children: [
        { id: 'chercheurs', label: 'Chercheurs', href: '/accompagnement/chercheurs' },
        { id: 'etudiants', label: 'Étudiants', href: '/accompagnement/etudiants' },
      ],
    },
  ],
}

// Get menu from localStorage or return default
export function getMenuData(): MenuDataStore {
  if (typeof window === 'undefined') return DEFAULT_MENU
  try {
    const stored = localStorage.getItem('menu-data')
    return stored ? JSON.parse(stored) : DEFAULT_MENU
  } catch {
    return DEFAULT_MENU
  }
}

// Save menu to localStorage
export function saveMenuData(data: MenuDataStore) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('menu-data', JSON.stringify(data))
  }
}
