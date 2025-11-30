'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function CoachingEquipePage() {
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
                            Coaching d'Équipe
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                            {/* Left Column - Content & Accordion (Swapped position) */}
                            <div className="space-y-8 pt-4 order-2 md:order-1">
                                <p className="text-xs text-justify leading-relaxed text-gray-600">
                                    Le coaching d'équipe vise à accompagner le développement de la performance collective d'une équipe, de façon suivie et mesurée, afin que le résultat opérationnel de l'ensemble dépasse largement le potentiel de la somme de ses membres. C'est un processus qui permet de développer l'autonomie, la responsabilité et la performance de l'équipe.
                                </p>

                                {/* Accordion */}
                                <div className="space-y-1">
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('what-is')}
                                            className="w-full flex items-center justify-between p-3 bg-[#005A9C] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'what-is' ? '-' : '+'}</span>
                                                <span>Qu'est ce que le Coaching d'Équipe ?</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'what-is' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    C'est un accompagnement qui permet à l'équipe de prendre conscience de son mode de fonctionnement, de ses forces et de ses axes d'amélioration pour gagner en efficacité et en sérénité.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('objectives')}
                                            className="w-full flex items-center justify-between p-3 bg-[#005A9C] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'objectives' ? '-' : '+'}</span>
                                                <span>Objectifs du Coaching d'Équipe</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'objectives' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <ul className="list-disc pl-4 space-y-1">
                                                    <li>Renforcer la cohésion et l'esprit d'équipe</li>
                                                    <li>Aligner l'équipe sur une vision et des objectifs communs</li>
                                                    <li>Améliorer la communication et la gestion des conflits</li>
                                                    <li>Développer l'intelligence collective</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('methodology')}
                                            className="w-full flex items-center justify-between p-3 bg-[#005A9C] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'methodology' ? '-' : '+'}</span>
                                                <span>Notre Méthodologie</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'methodology' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Nous utilisons une approche systémique combinée à des outils de PNL et d'analyse transactionnelle pour intervenir sur les interactions et la dynamique de groupe.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Image with Blue Shape (Swapped position) */}
                            <div className="relative flex justify-center md:justify-start pl-8 order-1 md:order-2">
                                {/* Baltic Blue Background Shape */}
                                <div className="absolute top-0 left-10 w-[280px] h-[450px] bg-[#005A9C] rounded-[100px] transform rotate-12 z-0"></div>

                                {/* Image */}
                                <div className="relative z-10 mt-10 ml-4">
                                    <div className="relative w-[300px] h-[400px] overflow-hidden rounded-b-full">
                                        <Image
                                            src="/master-training.jpg"
                                            alt="Coaching d'équipe"
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
