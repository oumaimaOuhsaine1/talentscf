'use client'

export interface PageData {
  id: string
  title: string
  slug: string
  description: string
  content: string
  sections?: string[]
  image?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface PagesStore {
  pages: PageData[]
}

export const DEFAULT_PAGES: PagesStore = {
  pages: [
    {
      id: 'accueil',
      title: 'Accueil',
      slug: '/',
      description: 'Page d\'accueil principale',
      content: 'Bienvenue chez Talents Consulting & Formation',
      sections: ['hero', 'services', 'trainings', 'testimonials', 'cta'],
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'apropos',
      title: 'À propos',
      slug: '/apropos',
      description: 'Page à propos de notre entreprise',
      content: 'Découvrez qui nous sommes...',
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}

export function getPagesData(): PagesStore {
  if (typeof window === 'undefined') return DEFAULT_PAGES
  try {
    const stored = localStorage.getItem('pages-data')
    return stored ? JSON.parse(stored) : DEFAULT_PAGES
  } catch {
    return DEFAULT_PAGES
  }
}

export function savePageData(data: PagesStore) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('pages-data', JSON.stringify(data))
  }
}

export function addPage(page: PageData) {
  const data = getPagesData()
  data.pages.push(page)
  savePageData(data)
}

export function updatePage(id: string, updates: Partial<PageData>) {
  const data = getPagesData()
  const index = data.pages.findIndex(p => p.id === id)
  if (index !== -1) {
    data.pages[index] = { ...data.pages[index], ...updates, updatedAt: new Date().toISOString() }
    savePageData(data)
  }
}

export function deletePage(id: string) {
  const data = getPagesData()
  data.pages = data.pages.filter(p => p.id !== id)
  savePageData(data)
}
