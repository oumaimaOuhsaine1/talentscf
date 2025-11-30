'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function ConduiteChangementPage() {
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
                            Conduite du Changement
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
                                    La conduite du changement est l'ensemble des opérations effectuées au sein d'une organisation pour lui permettre de s'adapter au changement et de l'évoluer. Nous vous aidons à piloter ces transformations humaines pour en faire de véritables opportunités de croissance.
                                </p>

                                {/* Accordion */}
                                <div className="space-y-1">
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('what-is')}
                                            className="w-full flex items-center justify-between p-3 bg-[#8B0000] text-white text-sm font-bold hover:brightness-110 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'what-is' ? '-' : '+'}</span>
                                                <span>Les Clés de la Réussite</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'what-is' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <ul className="list-disc pl-4 space-y-1">
                                                    <li>Communication transparente et régulière</li>
                                                    <li>Implication des acteurs clés dès le début</li>
                                                    <li>Formation et accompagnement des équipes</li>
                                                    <li>Gestion des résistances et valorisation des succès</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('methodology')}
                                            className="w-full flex items-center justify-between p-3 bg-[#8B0000] text-white text-sm font-bold hover:brightness-110 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'methodology' ? '-' : '+'}</span>
                                                <span>Notre Méthodologie</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'methodology' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Nous utilisons des modèles éprouvés (Kotter, ADKAR) adaptés à votre contexte spécifique pour structurer et piloter le changement étape par étape.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('results')}
                                            className="w-full flex items-center justify-between p-3 bg-[#8B0000] text-white text-sm font-bold hover:brightness-110 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'results' ? '-' : '+'}</span>
                                                <span>Pourquoi nous choisir ?</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'results' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Pour notre expertise en psychologie du travail, notre expérience terrain et notre capacité à mobiliser les énergies positives au service de votre projet.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Image with Rose Shape (Swapped) */}
                            <div className="relative flex justify-center md:justify-start pl-8 order-1 md:order-2">
                                {/* Dark Red Background Shape */}
                                <div className="absolute top-0 left-10 w-[280px] h-[450px] bg-[#8B0000] rounded-[100px] transform rotate-3 z-0"></div>

                                {/* Image */}
                                <div className="relative z-10 mt-10 ml-4">
                                    <div className="relative w-[300px] h-[400px] overflow-hidden rounded-b-full">
                                        <Image
                                            src="/diverse-team-collaboration.png"
                                            alt="Conduite du Changement"
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
