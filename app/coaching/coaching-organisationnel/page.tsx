'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function CoachingOrganisationnelPage() {
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
                            Coaching Organisationnel
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
                                    Le coaching organisationnel accompagne l'entreprise dans ses transformations profondes. Il vise à aligner la culture, les processus et les hommes pour réussir le changement et assurer la pérennité de l'organisation. C'est une approche globale qui prend en compte la complexité du système entreprise.
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
                                                <span>Enjeux du Coaching Organisationnel</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'what-is' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <ul className="list-disc pl-4 space-y-1">
                                                    <li>Accompagner une fusion ou une restructuration</li>
                                                    <li>Faire évoluer la culture d'entreprise</li>
                                                    <li>Mettre en place une nouvelle organisation du travail</li>
                                                    <li>Gérer une crise majeure</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('approach')}
                                            className="w-full flex items-center justify-between p-3 bg-[#FF8A00] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'approach' ? '-' : '+'}</span>
                                                <span>Notre Approche Systémique</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'approach' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Nous intervenons à différents niveaux (individus, équipes, organisation) pour créer une dynamique de changement cohérente et durable.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('results')}
                                            className="w-full flex items-center justify-between p-3 bg-[#FF8A00] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'results' ? '-' : '+'}</span>
                                                <span>Résultats pour l'Entreprise</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'results' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Une organisation plus agile, des collaborateurs engagés, une culture forte et une meilleure capacité d'adaptation aux évolutions du marché.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Image with Red Shape (Swapped) */}
                            <div className="relative flex justify-center md:justify-start pl-8 order-1 md:order-2">
                                {/* Dark Orange Background Shape */}
                                <div className="absolute top-0 left-10 w-[280px] h-[450px] bg-[#FF8A00] rounded-[100px] transform rotate-3 z-0"></div>

                                {/* Image */}
                                <div className="relative z-10 mt-10 ml-4">
                                    <div className="relative w-[300px] h-[400px] overflow-hidden rounded-b-full">
                                        <Image
                                            src="/images/vision.jpg"
                                            alt="Coaching Organisationnel"
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
