'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function CycleCoachingPage() {
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

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[300px] w-full overflow-hidden">
                    <div className="animate-fade-in">
                        <Image
                            src="/images/vision.jpg"
                            alt="Cycle Coaching Génératif"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Cycle Coaching Génératif
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 bg-gray-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#005b96] uppercase mb-3 animate-fade-in-up">
                                LIBÉREZ LA <span className="relative inline-block text-red-600">
                                    CRÉATIVITÉ
                                    <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                </span>
                            </h2>
                            <p className="text-base text-foreground/80 max-w-3xl mx-auto">
                                Le Coaching Génératif est une approche de troisième génération qui met l'accent sur la créativité et l'émergence de nouvelles possibilités.
                            </p>
                        </div>

                        {/* Objectifs Section */}
                        <div className="mb-12">
                            <h3 className="text-xl md:text-2xl font-bold text-[#005b96] uppercase mb-6 text-center">
                                Les 6 étapes du <span className="text-red-600">changement génératif</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "Champ génératif",
                                        desc: "Ouvrir un champ génératif (COACH State)",
                                        icon: "M13 10V3L4 14h7v7l9-11h-7z"
                                    },
                                    {
                                        title: "Intention claire",
                                        desc: "Poser une intention claire et alignée",
                                        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    },
                                    {
                                        title: "État de ressources",
                                        desc: "Développer un état de ressources puissant",
                                        icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    },
                                    {
                                        title: "Transformer obstacles",
                                        desc: "Transformer les obstacles en ressources",
                                        icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    },
                                    {
                                        title: "Intégration",
                                        desc: "Intégrer les ressources dans le système",
                                        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    },
                                    {
                                        title: "Action",
                                        desc: "Mettre en action et ancrer le changement",
                                        icon: "M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-300 group">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-[#005b96] mb-1 group-hover:text-red-600 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs text-foreground/70 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programme Section */}
                <section className="relative py-12 bg-cover bg-center" style={{ backgroundImage: "url('/images/coaching-session.jpg')" }}>
                    <div className="absolute inset-0 bg-blue-900/40"></div>
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10 space-y-3">
                            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase animate-fade-in-up">
                                PROGRAMME DE LA <span className="relative inline-block text-red-600">
                                    FORMATION
                                    <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                </span>
                            </h2>
                            <p className="text-base text-gray-200 font-medium max-w-3xl mx-auto">
                                Un parcours complet pour maîtriser le Coaching Génératif.
                            </p>
                        </div>

                        {/* Table Format */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#005b96] text-white">
                                        <th className="px-4 py-3 text-left text-sm font-bold uppercase">Module</th>
                                        <th className="px-4 py-3 text-left text-sm font-bold uppercase">Contenu</th>
                                        <th className="px-4 py-3 text-center text-sm font-bold uppercase">Durée</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        {
                                            title: "Fondamentaux du coaching génératif",
                                            items: "COACH State • Présence • Centrage • Ouverture • Connexion • Holding",
                                            duration: "3J"
                                        },
                                        {
                                            title: "Travail avec les états",
                                            items: "États de ressources • Transformation • Sponsorship • Patterns génératifs",
                                            duration: "3J"
                                        },
                                        {
                                            title: "Obstacles et ressources",
                                            items: "Identifier obstacles • Transformer en ressources • Intégration • Ancrage",
                                            duration: "2J"
                                        },
                                        {
                                            title: "Créativité et émergence",
                                            items: "Processus créatifs • Émergence • Innovation • Solutions nouvelles",
                                            duration: "2J"
                                        },
                                        {
                                            title: "Pratique et supervision",
                                            items: "Sessions pratiques • Feedback • Supervision • Certification",
                                            duration: "2J"
                                        }
                                    ].map((module, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-sm font-semibold text-[#005b96]">{module.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-gray-700">{module.items}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                                                    {module.duration}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="text-center mt-10">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 uppercase tracking-wider text-sm">
                                S'inscrire à la formation
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
