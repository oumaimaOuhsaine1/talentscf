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
        { id: 'location-salles', label: 'Location de salles', href: '/location-salles' },
      ],
    },
    {
      id: 'coaching-soft-skills-pnl',
      label: 'Coaching- Soft Skills- PNL',
      href: '/coaching-soft-skills-pnl',
      image: '/neuro-linguistic-programming.jpg',
      children: [
        { id: 'coaching-individuel', label: 'Coaching individuel', href: '/coaching-soft-skills-pnl/coaching-individuel' },
        { id: 'pnl', label: 'Programmation Neuro-Linguistique (PNL)', href: '/coaching-soft-skills-pnl/pnl' },
        { id: 'soft-skills', label: 'Soft Skills', href: '/coaching-soft-skills-pnl/soft-skills' },
        { id: 'dev-perso', label: 'Développement personnel', href: '/coaching-soft-skills-pnl/developpement-personnel' },
        { id: 'consulting-psy', label: 'Consulting en psychologie cognitive', href: '/coaching-soft-skills-pnl/consulting-psychologie-cognitive' },
        { id: 'tot', label: 'Formation des formateurs (TOT)', href: '/coaching-soft-skills-pnl/formation-formateurs' },
        { id: 'bilan-competences', label: 'Bilan de compétences', href: '/coaching-soft-skills-pnl/bilan-competences' },
      ],
    },
    {
      id: 'consulting',
      label: 'Consulting',
      href: '/consulting',
      image: '/coaching-consultation.jpg',
      children: [
        {
          id: 'diplomes-group',
          label: 'Diplômes',
          href: '/diplomes',
          children: [
            { id: 'bachelor', label: 'Bachelor', href: '/diplomes/bachelor' },
            { id: 'mba', label: 'MBA', href: '/diplomes/mba' },
            { id: 'dba', label: 'DBA', href: '/diplomes/dba' },
          ],
        },
        {
          id: 'formations-certifiantes-group',
          label: 'Formations certifiantes internationales',
          href: '/formations-certifiantes',
          children: [
            { id: 'u-blue-hills', label: 'U Blue Hills', href: '/formations-certifiantes/u-blue-hills' },
            { id: 'revue-sciences-gestion', label: 'La Revue de Sciences de Gestion', href: '/formations-certifiantes/revue-sciences-gestion' },
          ],
        },
      ],
    },
    {
      id: 'accompagnement',
      label: 'Accompagnement',
      href: '/accompagnement',
      children: [
        { id: 'chercheurs', label: 'Chercheurs', href: '/accompagnement/chercheurs' },
        { id: 'insertion-professionnelle', label: 'L’insertion professionnelle des lauréats', href: '/accompagnement/insertion-professionnelle' },
        { id: 'porteurs-projets', label: 'Porteurs de projets', href: '/accompagnement/porteurs-projets' },
        { id: 'etudes-etranger', label: 'Les études à l’étranger', href: '/accompagnement/etudes-etranger' },
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
      id: 'blog',
      label: 'Blog',
      href: '/blog',
    },
    {
      id: 'actualites',
      label: 'Actualités',
      href: '/actualites',
      image: '/images/bansection.jpg',
      children: [
        { id: 'nouveautes-formations', label: 'Nouveautés formations', href: '/actualites/novetautes-formations' },
        { id: 'evenements-academiques', label: 'Événements académiques', href: '/actualites/evenements-academiques' },
        { id: 'opportunites-beneficiaires', label: 'Opportunités pour les bénéficiaires', href: '/actualites/opportunites-beneficiaires' },
        { id: 'annonces-partenariats', label: 'Annonces et partenariats', href: '/actualites/annonces-partenariats' },
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact',
      image: '/images/contact.png',
      children: [
        { id: 'inscriptions-en-ligne', label: 'Inscriptions en ligne', href: '/contact/inscriptions-en-ligne' },
        { id: 'demandes-information', label: 'Demandes d’information', href: '/contact/demandes-information' },
        { id: 'pre-diagnostics', label: 'Pré-diagnostics de besoins', href: '/contact/pre-diagnostics' },
      ],
    },

  ],
}

// Get menu from localStorage or return default
export function getMenuData(): MenuDataStore {
  if (typeof window === 'undefined') return DEFAULT_MENU
  try {
    const stored = localStorage.getItem('menu-data-v2')
    return stored ? JSON.parse(stored) : DEFAULT_MENU
  } catch {
    return DEFAULT_MENU
  }
}

// Save menu to localStorage
export function saveMenuData(data: MenuDataStore) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('menu-data-v2', JSON.stringify(data))
  }
}
