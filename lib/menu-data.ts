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
        { id: 'equipe', label: 'Notre équipe', href: '/apropos/notre-equipe', image: '/diverse-team-collaboration.png' },
        { id: 'partenaires', label: 'Nos partenaires', href: '/apropos/nos-partenaires' },
        { id: 'clients', label: 'Nos clients', href: '/apropos/nos-clients' },
        { id: 'centre', label: 'Le centre Talents Consulting Formation', href: '/apropos/centre' },
        { id: 'visite', label: 'Visite guidée', href: '/apropos/visite-guidee', image: '/modern-office-tour.png' },
        { id: 'calendrier', label: 'Calendrier des Formations', href: '/apropos/calendrier' },
      ],
    },
    {
      id: 'pnl',
      label: 'PNL',
      href: '/pnl',
      image: '/neuro-linguistic-programming.jpg',
      children: [
        { id: 'certification', label: 'Certification PNL', href: '/pnl/certification', image: '/certificate-achievement.jpg' },
        { id: 'parcours-coaching', label: 'Parcours coaching génératif & PNL', href: '/pnl/parcours-coaching', image: '/coaching-session.png' },
        { id: 'formation-base', label: 'Formation de base en PNL', href: '/pnl/formation-base', image: '/training-course.png' },
        { id: 'cycle-maitre', label: 'Cycle Maître Praticien en PNL', href: '/pnl/cycle-maitre', image: '/master-training.jpg' },
        { id: 'cycle-coaching-gen', label: 'Cycle Coaching Génératif', href: '/pnl/cycle-coaching', image: '/generative-coaching.jpg' },
        { id: 'master-coach', label: 'Cycle Master Coach', href: '/pnl/master-coach', image: '/master-coach.jpg' },
        { id: 'enseignants', label: 'Équipe des enseignants', href: '/pnl/enseignants' },
      ],
    },
    {
      id: 'cycles-pro',
      label: 'Cycles professionnels',
      href: '/cycles-professionnels',
      image: '/professional-development.jpg',
      children: [
        { id: 'dev-perso', label: 'Développement personnel', href: '/cycles-professionnels/dev-personnel', image: '/personal-development.png' },
        { id: 'formation-formateurs', label: 'Formation des Formateurs', href: '/cycles-professionnels/formation-formateurs', image: '/trainer-training.jpg' },
      ],
    },
    {
      id: 'intra-entreprises',
      label: 'Intra-entreprises',
      href: '/intra-entreprises',
      image: '/corporate-training-session.png',
      children: [
        { id: 'commercial', label: 'Commercial & Ventes', href: '/intra-entreprises/commercial-ventes', image: '/sales-training-session.png' },
        { id: 'management', label: 'Management & Leadership', href: '/intra-entreprises/management-leadership', image: '/leadership-training-workshop.png' },
        { id: 'efficacite', label: 'Efficacité Individuelle', href: '/intra-entreprises/efficacite-individuelle', image: '/productivity-training.jpg' },
        { id: 'mind-mapping', label: 'Formation en Mind Mapping', href: '/intra-entreprises/mind-mapping', image: '/mind-mapping-diagram.jpg' },
      ],
    },
    {
      id: 'coaching',
      label: 'Coaching & Consulting',
      href: '/coaching',
      image: '/coaching-consultation.jpg',
      children: [
        { id: 'coaching-indiv', label: 'Coaching individuel', href: '/coaching/coaching-individuel', image: '/one-on-one-coaching.png' },
        { id: 'coaching-equipe', label: 'Coaching d\'équipe', href: '/coaching/coaching-equipe', image: '/team-coaching.jpg' },
        { id: 'coaching-ope', label: 'Coaching opérationnel', href: '/coaching/coaching-operationnel', image: '/operational-coaching.jpg' },
        { id: 'coaching-org', label: 'Coaching organisationnel', href: '/coaching/coaching-organisationnel', image: '/organizational-coaching.jpg' },
        { id: 'team-building', label: 'Team building', href: '/coaching/team-building', image: '/team-building-activities.png' },
        { id: 'bilan-competences', label: 'Bilan des compétences', href: '/coaching/bilan-competences', image: '/skills-assessment.jpg' },
        { id: 'excellence-op', label: 'Excellence opérationnelle', href: '/coaching/excellence-operationnelle', image: '/operational-excellence.jpg' },
        { id: 'organisation', label: 'Organisation', href: '/coaching/organisation', image: '/placeholder.svg?height=40&width=40' },
        { id: 'changement', label: 'Conduite de changement', href: '/coaching/conduite-changement', image: '/placeholder.svg?height=40&width=40' },
      ],
    },
    {
      id: 'location-salles',
      label: 'Location de salles',
      href: '/location-salles',
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
