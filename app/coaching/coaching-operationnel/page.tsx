'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function CoachingOperationnelPage() {
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
                            Coaching Opérationnel
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                            {/* Left Column - Image with Green Shape */}
                            <div className="relative flex justify-center md:justify-end pr-8">
                                {/* Fresh Sky Background Shape */}
                                <div className="absolute top-0 right-10 w-[280px] h-[450px] bg-[#00AEEF] rounded-[100px] transform -rotate-6 z-0"></div>

                                {/* Image */}
                                <div className="relative z-10 mt-10 mr-4">
                                    <div className="relative w-[300px] h-[400px] overflow-hidden rounded-b-full">
                                        <Image
                                            src="/corporate-training-session.png"
                                            alt="Coaching Opérationnel"
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Content & Accordion */}
                            <div className="space-y-8 pt-4">
                                <p className="text-xs text-justify leading-relaxed text-gray-600">
                                    Le coaching opérationnel est centré sur l'action et les résultats immédiats. Il s'adresse aux managers et collaborateurs souhaitant améliorer leur efficacité au quotidien, résoudre des problèmes concrets ou développer des compétences spécifiques liées à leur poste.
                                </p>

                                {/* Accordion */}
                                <div className="space-y-1">
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('what-is')}
                                            className="w-full flex items-center justify-between p-3 bg-[#00AEEF] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'what-is' ? '-' : '+'}</span>
                                                <span>Objectifs du Coaching Opérationnel</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'what-is' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <ul className="list-disc pl-4 space-y-1">
                                                    <li>Améliorer la gestion du temps et des priorités</li>
                                                    <li>Optimiser la prise de décision</li>
                                                    <li>Préparer une négociation ou une réunion importante</li>
                                                    <li>Développer son leadership de proximité</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('target')}
                                            className="w-full flex items-center justify-between p-3 bg-[#00AEEF] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'target' ? '-' : '+'}</span>
                                                <span>Pour qui ?</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'target' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Ce coaching s'adresse aux managers de terrain, chefs de projet, commerciaux et toute personne ayant des objectifs opérationnels à atteindre rapidement.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('benefits')}
                                            className="w-full flex items-center justify-between p-3 bg-[#00AEEF] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'benefits' ? '-' : '+'}</span>
                                                <span>Bénéfices attendus</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'benefits' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Des résultats concrets et mesurables, une meilleure confiance en ses capacités, et une boîte à outils pratique pour gérer les situations du quotidien.
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
