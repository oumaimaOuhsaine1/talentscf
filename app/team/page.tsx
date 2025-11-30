'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const teamMembers = [
  {
    name: 'Dr. Mohamed Alaoui',
    role: 'Formateur PNL',
    bio: 'Expert en PNL avec 15 ans d\'expérience en transformation personnelle et professionnelle.',
    email: 'm.alaoui@talents.ma'
  },
  {
    name: 'Fatima Bennani',
    role: 'Coach Certifiée',
    bio: 'Spécialiste du coaching exécutif et du développement du leadership d\'équipe.',
    email: 'f.bennani@talents.ma'
  },
  {
    name: 'Hassan Khamlichi',
    role: 'Formateur Soft Skills',
    bio: 'Expert en communication et gestion d\'équipe avec une expertise dans le secteur corporate.',
    email: 'h.khamlichi@talents.ma'
  },
  {
    name: 'Mariam Tazi',
    role: 'Formateur Bien-être',
    bio: 'Spécialiste en gestion du stress et bien-être en milieu professionnel.',
    email: 'm.tazi@talents.ma'
  },
]

export default function TeamPage() {
  const [isDark, setIsDark] = useState(false)

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
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Notre Équipe</h1>
            <p className="text-foreground/70">Des experts passionnés par votre développement</p>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="bg-gradient-to-br from-primary/30 to-secondary/30 h-40 flex items-center justify-center">
                    <span className="text-5xl">👤</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                    <p className="text-foreground/70 text-sm mb-4">{member.bio}</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-primary hover:text-primary/80 text-sm font-semibold"
                    >
                      Contacter
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
