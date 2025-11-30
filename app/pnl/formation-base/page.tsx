'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function FormationBasePage() {
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
                            src="/images/competence.jpg"
                            alt="Formation de Base PNL"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Formation de Base en PNL
                        </h1>
                    </div>
                </section>

                {/* Objectifs Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#005b96] uppercase animate-fade-in-up">
                                LES OBJECTIFS DE LA <span className="relative inline-block text-red-600">
                                    FORMATION
                                    <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                </span>
                            </h2>
                            <p className="text-xl text-foreground/80 font-medium max-w-3xl mx-auto">
                                Maîtrisez les clés de la communication interpersonnelle et du développement personnel.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Communication Efficace",
                                    desc: "Comprendre et utiliser les mécanismes de la communication verbale et non-verbale.",
                                    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                },
                                {
                                    title: "Acuité Sensorielle",
                                    desc: "Développer votre capacité à observer et calibrer les états internes de vos interlocuteurs.",
                                    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                },
                                {
                                    title: "Rapport de Qualité",
                                    desc: "Créer et maintenir une relation de confiance instantanée avec la synchronisation.",
                                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                },
                                {
                                    title: "Gestion des États",
                                    desc: "Apprendre à gérer ses émotions et accéder à ses ressources personnelles à la demande.",
                                    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                },
                                {
                                    title: "Définition d'Objectifs",
                                    desc: "Savoir formuler des objectifs clairs, précis et réalisables pour soi et les autres.",
                                    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                },
                                {
                                    title: "Feedback Constructif",
                                    desc: "Donner et recevoir du feedback de manière constructive pour favoriser l'apprentissage.",
                                    icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                }
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-red-600 group">
                                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#005b96] mb-2">{item.title}</h3>
                                    <p className="text-foreground/70">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contenu Section */}
                <section className="relative py-20 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/images/competence.jpg')" }}>
                    <div className="absolute inset-0 bg-blue-900/80"></div>
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase animate-fade-in-up">
                                CONTENU DE LA <span className="relative inline-block text-white">
                                    FORMATION
                                    <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                </span>
                            </h2>
                            <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto">
                                Un programme complet alliant théorie et pratique pour une intégration immédiate.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Module 1 : Les Bases de la PNL",
                                    items: ["Histoire et présupposés", "Le modèle de communication", "Les systèmes de représentation (VAKOG)"],
                                    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                },
                                {
                                    title: "Module 2 : La Relation",
                                    items: ["La calibration sensorielle", "La synchronisation verbale et non-verbale", "Créer le rapport"],
                                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                },
                                {
                                    title: "Module 3 : Les Ressources",
                                    items: ["L'ancrage de ressources", "Le cercle d'excellence", "La gestion des états internes"],
                                    icon: "M13 10V3L4 14h7v7l9-11h-7z"
                                },
                                {
                                    title: "Module 4 : Le Changement",
                                    items: ["Le recadrage de contexte et de sens", "Les positions perceptuelles", "Le feedback"],
                                    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                }
                            ].map((module, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={module.icon} />
                                            </svg>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-bold text-white">{module.title}</h3>
                                            <ul className="space-y-2">
                                                {module.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-gray-200">
                                                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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
