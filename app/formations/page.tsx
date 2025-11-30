'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Search, Filter } from 'lucide-react'
import Link from 'next/link'

const allTrainings = [
  {
    id: 1,
    title: 'Fondamentaux de la PNL',
    category: 'PNL',
    trainer: 'Dr. Mohamed Alaoui',
    price: '2,500 MAD',
    dates: '15-17 Janvier 2025',
    participants: 12,
    level: 'Débutant',
    description: 'Apprenez les bases de la PNL et comment utiliser ces techniques pour transformer vos pensées et comportements.',
  },
  {
    id: 2,
    title: 'Coaching pour Leaders',
    category: 'Coaching',
    trainer: 'Fatima Bennani',
    price: '3,000 MAD',
    dates: '22-24 Janvier 2025',
    participants: 8,
    level: 'Intermédiaire',
    description: 'Développez vos compétences de leadership et apprenez à coacher votre équipe efficacement.',
  },
  {
    id: 3,
    title: 'Communication Efficace',
    category: 'Soft Skills',
    trainer: 'Hassan Khamlichi',
    price: '2,000 MAD',
    dates: '29-30 Janvier 2025',
    participants: 15,
    level: 'Tous niveaux',
    description: 'Maîtrisez l\'art de la communication pour de meilleures relations professionnelles.',
  },
  {
    id: 4,
    title: 'PNL Avancée',
    category: 'PNL',
    trainer: 'Dr. Mohamed Alaoui',
    price: '3,500 MAD',
    dates: '5-7 Février 2025',
    participants: 10,
    level: 'Avancé',
    description: 'Une plongée profonde dans les techniques avancées de la PNL pour les praticiens confirmés.',
  },
  {
    id: 5,
    title: 'Gestion du Stress',
    category: 'Soft Skills',
    trainer: 'Mariam Tazi',
    price: '1,800 MAD',
    dates: '10-11 Février 2025',
    participants: 20,
    level: 'Tous niveaux',
    description: 'Apprenez à gérer votre stress et à maintenir votre bien-être au travail.',
  },
  {
    id: 6,
    title: 'Coaching d\'Équipe',
    category: 'Coaching',
    trainer: 'Fatima Bennani',
    price: '4,000 MAD',
    dates: '12-14 Février 2025',
    participants: 6,
    level: 'Avancé',
    description: 'Apprenez à créer une dynamique d\'équipe positive et productive grâce au coaching collectif.',
  },
]

export default function FormationsPage() {
  const [isDark, setIsDark] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['Tous', 'PNL', 'Coaching', 'Soft Skills']

  const filteredTrainings = allTrainings.filter((training) => {
    const matchesCategory = selectedCategory === 'Tous' || training.category === selectedCategory
    const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.trainer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    setIsDark(!isDark)
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary/5 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Toutes nos Formations</h1>
            <p className="text-foreground/70">Explorez nos programmes de développement personnel et professionnel</p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 md:space-y-0 md:flex md:gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-foreground/40" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trainings Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTrainings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTrainings.map((training) => (
                  <Link
                    key={training.id}
                    href={`/formations/${training.id}`}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                          training.category === 'PNL' ? 'bg-primary' :
                          training.category === 'Coaching' ? 'bg-secondary' :
                          'bg-accent'
                        }`}>
                          {training.category}
                        </span>
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          {training.level}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{training.title}</h3>
                      <p className="text-foreground/60 text-sm">{training.description}</p>
                      <p className="text-foreground/60 text-sm font-semibold">{training.trainer}</p>
                      <div className="border-t border-border pt-4 flex justify-between items-center">
                        <span className="font-bold text-lg text-primary">{training.price}</span>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                          Détails
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-foreground/70 text-lg">Aucune formation ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
