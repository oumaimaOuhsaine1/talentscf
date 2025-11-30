'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function LeCentrePage() {
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
                            src="/images/equipe.jfif"
                            alt="Le Centre"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Le Centre Talents Consulting Formation
                        </h1>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-[#005b96] uppercase animate-fade-in-up">
                                    UN ESPACE DÉDIÉ À{' '}
                                    <span className="relative inline-block text-red-600">
                                        L'EXCELLENCE
                                        <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                    </span>
                                </h2>
                                <p className="text-lg text-foreground/80 leading-relaxed text-justify">
                                    Situé au cœur de la ville, le Centre Talents Consulting & Formation offre un cadre d'apprentissage exceptionnel. Nos locaux ont été pensés pour favoriser la concentration, la créativité et les échanges.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Salles de formation modernes et équipées",
                                        "Espaces de détente conviviaux",
                                        "Matériel pédagogique de pointe",
                                        "Accessibilité et confort optimal"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-foreground/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl group">
                                <Image
                                    src="/images/centre.png"
                                    alt="Locaux du centre"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="relative py-20 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/images/bansection.jpg')" }}>
                    <div className="absolute inset-0 bg-black/70"></div>
                    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#005b96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#005b96] mb-4">Infrastructure Moderne</h3>
                                <p className="text-foreground/70">
                                    Des espaces conçus pour optimiser l'expérience d'apprentissage avec des équipements de dernière génération.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#FF8A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#005b96] mb-4">Pédagogie Active</h3>
                                <p className="text-foreground/70">
                                    Une approche centrée sur la pratique et l'interaction pour un ancrage durable des compétences.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#005b96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#005b96] mb-4">Communauté</h3>
                                <p className="text-foreground/70">
                                    Un lieu de rencontre et d'échange pour les professionnels passionnés par le développement humain.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


            </main>

            <Footer />
        </div>
    )
}
