'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function EfficaciteIndividuellePage() {
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
                <section className="relative h-[200px] w-full overflow-hidden bg-[#003d5c]">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Efficacité Individuelle
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {/* Left Column - Image with arrows */}
                            <div className="flex justify-center items-center">
                                <div className="relative w-full max-w-md">
                                    {/* Placeholder for person image */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-40 bg-gray-200 border-2 border-gray-300 flex items-center justify-center z-10">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>

                                    {/* Arrow diagram */}
                                    <div className="ml-24 space-y-1">
                                        {[...Array(7)].map((_, i) => (
                                            <div key={i} className="flex items-center">
                                                <div className={`h-8 flex items-center ${i === 0 ? 'bg-[#0088cc]' : 'bg-[#4a9db5]'} text-white text-xs px-3 clip-arrow`} style={{
                                                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)',
                                                    width: i === 0 ? '280px' : '240px',
                                                    marginLeft: i === 0 ? '0' : '40px'
                                                }}>
                                                    <span className="ml-3">Étape {i + 1}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Objectifs */}
                            <div>
                                <h2 className="text-xl font-bold text-[#0088cc] mb-4 border-b-2 border-red-600 pb-2">
                                    Objectifs
                                </h2>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 mt-1 flex-shrink-0">⊙</span>
                                        <span className="text-gray-700">Optimiser la gestion de son temps et ses priorités.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">⊙</span>
                                        <span className="text-gray-700">Développer son organisation personnelle et professionnelle.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-600 mt-1 flex-shrink-0">⊙</span>
                                        <span className="text-gray-700">Améliorer sa concentration et sa productivité.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">⊙</span>
                                        <span className="text-gray-700">Gérer son stress et maintenir son équilibre professionnel.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Modules Section */}
                        <div className="mt-12">
                            <h2 className="text-xl font-bold text-[#0088cc] mb-6 border-b-2 border-red-600 pb-2">
                                Modules
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                {/* Left Column */}
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">●</span>
                                        <span className="text-gray-700">Gestion du temps et des priorités</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">●</span>
                                        <span className="text-gray-700">Organisation personnelle</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">●</span>
                                        <span className="text-gray-700">Gestion du stress</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">●</span>
                                        <span className="text-gray-700">Concentration et focus</span>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">●</span>
                                        <span className="text-gray-700">Productivité et performance</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">●</span>
                                        <span className="text-gray-700">Équilibre vie pro/perso</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">●</span>
                                        <span className="text-gray-700">Méthodes d'organisation</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-[#0088cc] mt-1 flex-shrink-0">●</span>
                                        <span className="text-gray-700">Gestion de l'énergie</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-12">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 uppercase tracking-wider text-sm">
                                Demander un devis
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
