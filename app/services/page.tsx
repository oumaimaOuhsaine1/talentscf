'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Brain, Users, Zap, Briefcase } from 'lucide-react'

const services = [
  {
    icon: Brain,
    title: 'PNL (Programmation Neuro-Linguistique)',
    description: 'Apprenez les techniques éprouvées de la PNL pour transformer vos croyances et atteindre vos objectifs.',
    features: [
      'Fondamentaux de la PNL',
      'Techniques d\'anchoring',
      'Reframing et modélisation',
      'Stratégies de succès',
    ],
    color: 'bg-primary'
  },
  {
    icon: Users,
    title: 'Coaching Personnel et Professionnel',
    description: 'Un accompagnement individualisé pour définir, planifier et atteindre vos objectifs.',
    features: [
      'Coaching exécutif',
      'Coaching de carrière',
      'Coaching d\'équipe',
      'Accompagnement continu',
    ],
    color: 'bg-secondary'
  },
  {
    icon: Zap,
    title: 'Soft Skills',
    description: 'Développez vos compétences interpersonnelles essentielles pour progresser professionnellement.',
    features: [
      'Communication efficace',
      'Leadership et management',
      'Gestion du stress',
      'Intelligence émotionnelle',
    ],
    color: 'bg-accent'
  },
  {
    icon: Briefcase,
    title: 'Formations Corporatives',
    description: 'Des programmes sur mesure adaptés aux besoins spécifiques de votre organisation.',
    features: [
      'Audit de compétences',
      'Programmes personnalisés',
      'Formation d\'équipe',
      'Suivi et évaluation',
    ],
    color: 'bg-[#FF8C42]'
  },
]

export default function ServicesPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Nos Services</h1>
            <p className="text-foreground/70">Solutions complètes pour votre développement personnel et professionnel</p>
          </div>
        </section>

        {/* Services */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {services.map((service, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div>
                        <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                          <service.icon size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                        <p className="text-foreground/70 mb-6 leading-relaxed">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-3 text-foreground/80">
                              <span className={`w-2 h-2 ${service.color} rounded-full`}></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`h-80 ${service.color} rounded-xl opacity-20`}></div>
                    </>
                  ) : (
                    <>
                      <div className={`h-80 ${service.color} rounded-xl opacity-20`}></div>
                      <div>
                        <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                          <service.icon size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                        <p className="text-foreground/70 mb-6 leading-relaxed">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-3 text-foreground/80">
                              <span className={`w-2 h-2 ${service.color} rounded-full`}></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
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
