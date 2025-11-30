'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function AboutPage() {
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
      <main
        className="flex-1"
        style={{
          backgroundImage: 'url(/vision.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Header */}
        <section className="bg-primary/5 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">À Propos de Nous</h1>
            <p className="text-foreground/70">Découvrez notre mission et nos valeurs</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  Talents Consulting & Formation a été fondée avec une vision claire : transformer vies et carrières par l'éducation et le développement personnel.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Depuis notre lancement, nous avons accompagné plus de 500 professionnels à travers nos formations innovantes en PNL, Coaching et Soft Skills.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl h-96 flex items-center justify-center">
                <span className="text-6xl">📚</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-border">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
                <p className="text-foreground/70">Participants satisfaits</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
                <p className="text-foreground/70">Sessions organisées</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">95%</h3>
                <p className="text-foreground/70">Taux de satisfaction</p>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Nos Valeurs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-card border border-border rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-primary">Excellence</h3>
                  <p className="text-foreground/70">Nous nous engageons à offrir le meilleur apprentissage pour nos participants.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-secondary">Innovation</h3>
                  <p className="text-foreground/70">Nos méthodes sont modernes et adaptées aux réalités du marché actuel.</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4 text-accent">Transformation</h3>
                  <p className="text-foreground/70">Nous transformons les vies en créant des opportunités de croissance.</p>
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
