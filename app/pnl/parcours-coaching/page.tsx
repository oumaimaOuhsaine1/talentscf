'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function ParcoursCoachingPage() {
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

    const steps = [
        {
            title: "Fondamentaux du Coaching",
            description: "Acquérir la posture de coach et les compétences de base pour accompagner le changement.",
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        },
        {
            title: "Outils PNL pour Coachs",
            description: "Intégrer les techniques puissantes de la PNL dans votre pratique de coaching.",
            icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        },
        {
            title: "Coaching Génératif",
            description: "Aller au-delà de la résolution de problèmes pour libérer la créativité et le potentiel.",
            icon: "M13 10V3L4 14h7v7l9-11h-7z"
        },
        {
            title: "Supervision et Pratique",
            description: "Séances supervisées pour affiner votre style et garantir une pratique éthique.",
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
                            src="/images/vision.jpg"
                            alt="Parcours Coaching"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Parcours Coaching
                        </h1>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                        <h2 className="text-3xl font-bold text-[#005b96] uppercase animate-fade-in-up">
                            DEVENEZ UN COACH{' '}
                            <span className="relative inline-block text-red-600">
                                PROFESSIONNEL
                                <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                            </span>
                        </h2>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            Notre parcours de coaching certifiant allie la rigueur de la PNL à la souplesse de l'accompagnement humaniste. Il vous prépare à accompagner individus et équipes vers l'atteinte de leurs objectifs avec éthique et professionnalisme.
                        </p>
                    </div>
                </section>

                {/* Steps Grid */}
                <section className="relative py-20 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/images/competence.jpg')" }}>
                    <div className="absolute inset-0 bg-black/70"></div>
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex gap-6 items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform"
                                >
                                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-8 h-8 text-[#005b96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                                        </svg>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-[#005b96]">{step.title}</h3>
                                        <p className="text-foreground/70 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 uppercase tracking-wider">
                                Télécharger la brochure
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
