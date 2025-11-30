'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function MasterCoachPage() {
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
                            alt="Cycle Master Coach"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Cycle Master Coach
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 bg-gray-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#005b96] uppercase mb-3 animate-fade-in-up">
                                L'ÉLITE DU <span className="relative inline-block text-red-600">
                                    COACHING
                                    <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                </span>
                            </h2>
                            <p className="text-base text-foreground/80 max-w-3xl mx-auto">
                                Ce cycle est destiné aux coachs expérimentés souhaitant atteindre un niveau d'excellence supérieur.
                            </p>
                        </div>

                        {/* Objectifs Section */}
                        <div className="mb-12">
                            <h3 className="text-xl md:text-2xl font-bold text-[#005b96] uppercase mb-6 text-center">
                                Compétences <span className="text-red-600">avancées</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        title: "Supervision avancée",
                                        desc: "Supervision de groupe et individuelle pour affiner votre style",
                                        icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                    },
                                    {
                                        title: "Coaching d'équipe",
                                        desc: "Accompagner les équipes vers la performance",
                                        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    },
                                    {
                                        title: "Neurosciences",
                                        desc: "Intégrer les dernières avancées scientifiques",
                                        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    },
                                    {
                                        title: "Coaching systémique",
                                        desc: "Travailler avec les systèmes organisationnels",
                                        icon: "M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                                    },
                                    {
                                        title: "Leadership coaching",
                                        desc: "Développer le leadership des dirigeants",
                                        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    },
                                    {
                                        title: "Certification ICF",
                                        desc: "Préparation à la certification Master Coach",
                                        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
                                Un parcours d'excellence pour les coachs professionnels.
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
                                            title: "Supervision et excellence",
                                            items: "Analyse de pratique • Supervision individuelle • Supervision de groupe • Développement style",
                                            duration: "4J"
                                        },
                                        {
                                            title: "Coaching d'équipe et systémique",
                                            items: "Dynamiques d'équipe • Coaching collectif • Systèmes organisationnels • Performance",
                                            duration: "4J"
                                        },
                                        {
                                            title: "Neurosciences et coaching",
                                            items: "Neurosciences appliquées • Neuroplasticité • Émotions • Changement durable",
                                            duration: "3J"
                                        },
                                        {
                                            title: "Leadership et transformation",
                                            items: "Leadership coaching • Transformation organisationnelle • Coaching de dirigeants",
                                            duration: "3J"
                                        },
                                        {
                                            title: "Certification et pratique",
                                            items: "Préparation ICF • Sessions supervisées • Évaluation • Certification Master Coach",
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
