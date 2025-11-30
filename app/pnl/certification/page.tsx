'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function CertificationPNLPage() {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
    }, [])

    const toggleTheme = () => {
        const html = document.documentElement
        html.classList.toggle('dark')
        setIsDark(!isDark)
        localStorage.setItem('theme', isDark ? 'light' : 'dark')
    }

    const levels = [
        {
            title: "Technicien PNL",
            duration: "8 jours",
            description: "Les bases fondamentales de la PNL pour améliorer sa communication et comprendre ses propres fonctionnements.",
            modules: [
                "Les présupposés de la PNL",
                "Le rapport et la calibration",
                "Les systèmes de représentation (VAKOG)",
                "Les ancrages de ressources",
                "La définition d'objectifs"
            ]
        },
        {
            title: "Praticien PNL",
            duration: "10 jours",
            description: "Intégrer les outils de changement et développer sa flexibilité comportementale.",
            modules: [
                "Le méta-modèle",
                "Le recadrage",
                "Les stratégies mentales",
                "Le changement d'histoire personnelle",
                "La négociation de parties"
            ]
        },
        {
            title: "Maître Praticien PNL",
            duration: "14 jours",
            description: "La maîtrise des niveaux logiques, des croyances et de la modélisation.",
            modules: [
                "Les niveaux logiques de Dilts",
                "Le travail sur les croyances et les valeurs",
                "La modélisation de l'excellence",
                "Les métaphores thérapeutiques",
                "L'identité et la mission de vie"
            ]
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[300px] w-full overflow-hidden">
                    <div className="animate-fade-in">
                        <Image
                            src="/images/competence.jpg"
                            alt="Certification PNL"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Certification PNL
                        </h1>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                        <h2 className="text-3xl font-bold text-[#005b96] uppercase">
                            UN PARCOURS D'<span style={{ color: '#BC0C1B' }}>EXCELLENCE</span>
                        </h2>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            Nos formations certifiantes en PNL sont reconnues internationalement. Elles respectent les standards de qualité les plus élevés et sont dispensées par des enseignants certifiés INLPTA.
                        </p>
                    </div>
                </section>

                {/* Levels Grid */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {levels.map((level, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-xl overflow-hidden border-t-4 border-[#BC0C1B] hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <div className="p-6 bg-gray-50 border-b border-gray-100">
                                        <h3 className="text-2xl font-bold text-[#005b96] mb-2">{level.title}</h3>
                                        <div className="inline-block px-3 py-1 bg-blue-100 text-[#005b96] text-sm font-semibold rounded-full">
                                            Durée: {level.duration}
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <p className="text-foreground/70 italic">
                                            {level.description}
                                        </p>
                                        <div>
                                            <h4 className="font-bold text-[#BC0C1B] mb-3 uppercase text-sm tracking-wide">Au programme :</h4>
                                            <ul className="space-y-2">
                                                {level.modules.map((module, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                                                        <svg className="w-5 h-5 text-[#005b96] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {module}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button className="w-full py-3 bg-[#005b96] hover:bg-[#004a7a] text-white font-bold rounded transition-colors duration-300">
                                            S'inscrire
                                        </button>
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
