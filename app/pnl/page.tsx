'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PNLPage() {
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

    const programs = [
        {
            title: "Certification PNL",
            description: "Devenez un praticien certifié et maîtrisez les outils fondamentaux de la PNL.",
            link: "/pnl/certification",
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
            title: "Parcours Coaching",
            description: "Un parcours complet pour devenir coach professionnel avec la PNL.",
            link: "/pnl/parcours-coaching",
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        },
        {
            title: "Formation de Base",
            description: "Initiez-vous aux concepts clés de la Programmation Neuro-Linguistique.",
            link: "/pnl/formation-base",
            icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        },
        {
            title: "Cycle Maître Praticien",
            description: "Approfondissez vos connaissances et développez votre expertise.",
            link: "/pnl/cycle-maitre",
            icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        },
        {
            title: "Cycle Coaching Génératif",
            description: "Une approche avancée pour le changement transformationnel.",
            link: "/pnl/cycle-coaching",
            icon: "M13 10V3L4 14h7v7l9-11h-7z"
        },
        {
            title: "Cycle Master Coach",
            description: "L'excellence en coaching pour les professionnels expérimentés.",
            link: "/pnl/master-coach",
            icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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
                            alt="PNL - Programmation Neuro-Linguistique"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Programmation Neuro-Linguistique (PNL)
                        </h1>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                        <h2 className="text-3xl font-bold text-[#005b96] uppercase">
                            DÉCOUVREZ LA PUISSANCE DE LA <span style={{ color: '#BC0C1B' }}>PNL</span>
                        </h2>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            La Programmation Neuro-Linguistique est une approche puissante de communication et de changement. Elle offre des outils concrets pour comprendre le fonctionnement humain, développer ses compétences et atteindre ses objectifs.
                        </p>
                    </div>
                </section>

                {/* Programs Grid */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {programs.map((program, index) => (
                                <Link
                                    href={program.link}
                                    key={index}
                                    className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300 group border border-gray-100"
                                >
                                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#005b96] transition-colors duration-300">
                                        <svg className="w-8 h-8 text-[#005b96] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={program.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#005b96] mb-3 group-hover:text-[#BC0C1B] transition-colors duration-300">
                                        {program.title}
                                    </h3>
                                    <p className="text-foreground/70 mb-4">
                                        {program.description}
                                    </p>
                                    <div className="flex items-center text-[#BC0C1B] font-semibold text-sm uppercase tracking-wide">
                                        En savoir plus
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
