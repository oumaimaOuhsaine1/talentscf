'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function BilanCompetencesPage() {
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
                            Bilan de Compétences
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                            {/* Left Column - Image with Pink Shape */}
                            <div className="relative flex justify-center md:justify-end pr-8">
                                {/* Yale Blue Background Shape */}
                                <div className="absolute top-0 right-10 w-[280px] h-[450px] bg-[#003E6B] rounded-[100px] transform -rotate-3 z-0"></div>

                                {/* Image */}
                                <div className="relative z-10 mt-10 mr-4">
                                    <div className="relative w-[300px] h-[400px] overflow-hidden rounded-b-full">
                                        <Image
                                            src="/skills-assessment.jpg"
                                            alt="Bilan de Compétences"
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Content & Accordion */}
                            <div className="space-y-8 pt-4">
                                <p className="text-xs text-justify leading-relaxed text-gray-600">
                                    Le bilan de compétences est une étape clé pour faire le point sur votre carrière, analyser vos aptitudes, vos motivations et définir un projet professionnel cohérent et réaliste. C'est un moment privilégié pour prendre du recul et envisager l'avenir avec sérénité.
                                </p>

                                {/* Accordion */}
                                <div className="space-y-1">
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('what-is')}
                                            className="w-full flex items-center justify-between p-3 bg-[#003E6B] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'what-is' ? '-' : '+'}</span>
                                                <span>Les Étapes du Bilan</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'what-is' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <ul className="list-disc pl-4 space-y-1">
                                                    <li>Phase préliminaire : analyse de la demande</li>
                                                    <li>Phase d'investigation : exploration du parcours et des compétences</li>
                                                    <li>Phase de conclusion : définition du projet et plan d'action</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('why-do-it')}
                                            className="w-full flex items-center justify-between p-3 bg-[#003E6B] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'why-do-it' ? '-' : '+'}</span>
                                                <span>Pourquoi faire un bilan ?</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'why-do-it' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Pour envisager une reconversion, évoluer en interne, valider un projet de formation ou simplement reprendre confiance en son potentiel professionnel.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('financing')}
                                            className="w-full flex items-center justify-between p-3 bg-[#003E6B] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'financing' ? '-' : '+'}</span>
                                                <span>Financement</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'financing' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Le bilan de compétences peut être financé par le CPF (Compte Personnel de Formation), le plan de développement des compétences de l'entreprise ou par Pôle Emploi.
                                                </p>
                                            </div>
                                        )}
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
