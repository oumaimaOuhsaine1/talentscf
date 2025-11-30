'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Clock, Users, MapPin, Star, Check } from 'lucide-react'
import Link from 'next/link'

export default function FormationDetailPage({ params }: { params: { id: string } }) {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    setIsDark(!isDark)
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
  }

  // Mock data - in a real app, this would be fetched based on params.id
  const training = {
    id: params.id,
    title: 'Fondamentaux de la PNL',
    category: 'PNL',
    trainer: 'Dr. Mohamed Alaoui',
    price: '2,500 MAD',
    dates: '15-17 Janvier 2025',
    time: '09:00 - 17:00',
    location: 'Centre de Formation, Casablanca',
    participants: 12,
    level: 'Débutant',
    description: 'Une introduction complète aux principes et techniques de la Programmation Neuro-Linguistique pour transformer votre vie personnelle et professionnelle.',
    objectives: [
      'Comprendre les fondamentaux de la PNL',
      'Maîtriser les techniques de base du changement personnel',
      'Apprendre à utiliser l\'anchoring et le reframing',
      'Développer votre intelligence émotionnelle',
      'Créer un plan d\'action pour votre transformation',
    ],
    program: [
      { day: 'Jour 1', topics: ['Introduction à la PNL', 'Les présupposés de la PNL', 'Sensory Acuity', 'Rapport et Synchronisation'] },
      { day: 'Jour 2', topics: ['Modélisation', 'Ancres et Ressources', 'Reframing', 'Stratégies de Succès'] },
      { day: 'Jour 3', topics: ['États Modifiés', 'Communication Efficace', 'Résolution de Conflits', 'Plan d\'Action Personnel'] },
    ],
    materials: [
      'Manuel de formation complète',
      'Ressources en ligne exclusives',
      'Certificat de participation',
      'Accès à la communauté privée',
    ],
    requirements: [
      'Motivation et engagement personnel',
      'Disponibilité pour les 3 jours complets',
      'Ordinateur portable (optionnel)',
      'Ouverture d\'esprit',
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-white text-xs font-semibold bg-primary">
                {training.category}
              </span>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                {training.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{training.title}</h1>
            <p className="text-foreground/70 text-lg">Par {training.trainer}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <div className="bg-card border border-border rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-4">À Propos de cette Formation</h2>
                  <p className="text-foreground/70 leading-relaxed mb-6">{training.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <Clock size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-semibold">{training.time}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <Users size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-semibold">{training.participants} max</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <MapPin size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-semibold">Casablanca</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <Star size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-semibold">4.8/5 (12 avis)</p>
                    </div>
                  </div>
                </div>

                {/* Objectives */}
                <div className="bg-card border border-border rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-4">Objectifs de la Formation</h2>
                  <ul className="space-y-3">
                    {training.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check size={20} className="text-primary flex-shrink-0 mt-1" />
                        <span className="text-foreground/80">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Program */}
                <div className="bg-card border border-border rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-4">Programme Détaillé</h2>
                  <div className="space-y-6">
                    {training.program.map((dayProgram, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h3 className="font-bold text-lg mb-2">{dayProgram.day}</h3>
                        <ul className="space-y-1">
                          {dayProgram.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="text-foreground/70">• {topic}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div className="bg-card border border-border rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-4">Ce qui est inclus</h2>
                  <ul className="space-y-3">
                    {training.materials.map((material, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check size={20} className="text-secondary" />
                        <span className="text-foreground/80">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-8 sticky top-20 space-y-6">
                  <div>
                    <p className="text-foreground/70 text-sm mb-2">Prix</p>
                    <p className="text-4xl font-bold text-primary">{training.price}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-foreground/70 text-sm mb-1">Dates</p>
                      <p className="font-semibold">{training.dates}</p>
                    </div>
                    <div>
                      <p className="text-foreground/70 text-sm mb-1">Horaires</p>
                      <p className="font-semibold">{training.time}</p>
                    </div>
                    <div>
                      <p className="text-foreground/70 text-sm mb-1">Lieu</p>
                      <p className="font-semibold">{training.location}</p>
                    </div>
                  </div>

                  <button className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                    S'inscrire Maintenant
                  </button>

                  <Link
                    href="/contact"
                    className="block w-full px-6 py-3 border-2 border-primary text-primary text-center font-bold rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    Plus d'Informations
                  </Link>

                  {/* Requirements */}
                  <div className="pt-6 border-t border-border">
                    <h3 className="font-bold mb-3">Prérequis</h3>
                    <ul className="space-y-2">
                      {training.requirements.map((req, index) => (
                        <li key={index} className="text-foreground/70 text-sm">• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
