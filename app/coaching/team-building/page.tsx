'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function TeamBuildingPage() {
    const [isDark, setIsDark] = useState(false)
    const [openAccordion, setOpenAccordion] = useState<string | null>('what-is')

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

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id)
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[150px] w-full overflow-hidden bg-[#003d5c]">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-3xl font-bold text-white tracking-wider animate-fade-in-up text-center px-4">
                            Team Building
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                            {/* Left Column - Content & Accordion (Swapped) */}
                            <div className="space-y-8 pt-4 order-2 md:order-1">
                                <p className="text-xs text-justify leading-relaxed text-gray-600">
                                    Le Team Building est bien plus qu'une simple activité ludique. C'est un outil puissant pour renforcer les liens, améliorer la communication et créer une véritable cohésion au sein de vos équipes. Nos séminaires sont conçus pour être à la fois engageants, amusants et porteurs de sens pour l'entreprise.
                                </p>

                                {/* Accordion */}
                                <div className="space-y-1">
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('what-is')}
                                            className="w-full flex items-center justify-between p-3 bg-[#FF8A00] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'what-is' ? '-' : '+'}</span>
                                                <span>Nos Activités de Team Building</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'what-is' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <ul className="list-disc pl-4 space-y-1">
                                                    <li>Ateliers créatifs et artistiques</li>
                                                    <li>Challenges sportifs et dépassement de soi</li>
                                                    <li>Jeux de rôle et mises en situation</li>
                                                    <li>Escape games et résolution d'énigmes</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('objectives')}
                                            className="w-full flex items-center justify-between p-3 bg-[#FF8A00] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'objectives' ? '-' : '+'}</span>
                                                <span>Pourquoi organiser un Team Building ?</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'objectives' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Pour intégrer de nouveaux collaborateurs, motiver les troupes après une période intense, apaiser des tensions ou simplement célébrer des succès collectifs.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('custom')}
                                            className="w-full flex items-center justify-between p-3 bg-[#FF8A00] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'custom' ? '-' : '+'}</span>
                                                <span>Une Approche Sur-Mesure</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'custom' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Nous adaptons chaque événement à votre culture d'entreprise, à vos objectifs spécifiques et au profil de vos participants pour garantir un impact maximal.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Image with Yellow Shape (Swapped) */}
                            <div className="relative flex justify-center md:justify-start pl-8 order-1 md:order-2">
                                {/* Dark Orange Background Shape */}
                                <div className="absolute top-0 left-10 w-[280px] h-[450px] bg-[#FF8A00] rounded-[100px] transform rotate-6 z-0"></div>

                                {/* Image */}
                                <div className="relative z-10 mt-10 ml-4">
                                    <div className="relative w-[300px] h-[400px] overflow-hidden rounded-b-full">
                                        <Image
                                            src="/team-building-activities.png"
                                            alt="Team Building"
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
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
