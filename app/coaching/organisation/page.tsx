'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function OrganisationPage() {
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
                            Organisation
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                            {/* Left Column - Image with Indigo Shape */}
                            <div className="relative flex justify-center md:justify-end pr-8">
                                {/* Deep Navy Background Shape */}
                                <div className="absolute top-0 right-10 w-[280px] h-[450px] bg-[#0A1929] rounded-[100px] transform -rotate-6 z-0"></div>

                                {/* Image */}
                                <div className="relative z-10 mt-10 mr-4">
                                    <div className="relative w-[300px] h-[400px] overflow-hidden rounded-b-full">
                                        <Image
                                            src="/modern-office-tour.png"
                                            alt="Organisation"
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Content & Accordion */}
                            <div className="space-y-8 pt-4">
                                <p className="text-xs text-justify leading-relaxed text-gray-600">
                                    Une organisation performante est une organisation alignée, agile et capable de s'adapter rapidement. Nous vous aidons à structurer vos activités, clarifier les rôles et responsabilités, et optimiser vos modes de fonctionnement pour gagner en efficacité.
                                </p>

                                {/* Accordion */}
                                <div className="space-y-1">
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('what-is')}
                                            className="w-full flex items-center justify-between p-3 bg-[#0A1929] text-white text-sm font-bold hover:brightness-110 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'what-is' ? '-' : '+'}</span>
                                                <span>Nos Services en Organisation</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'what-is' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <ul className="list-disc pl-4 space-y-1">
                                                    <li>Audit organisationnel et diagnostic</li>
                                                    <li>Refonte des organigrammes et fiches de poste</li>
                                                    <li>Optimisation des processus décisionnels</li>
                                                    <li>Accompagnement à la mise en place de nouvelles structures</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('approach')}
                                            className="w-full flex items-center justify-between p-3 bg-[#0A1929] text-white text-sm font-bold hover:brightness-110 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'approach' ? '-' : '+'}</span>
                                                <span>Notre Approche</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'approach' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Pragmatique et collaborative, notre approche vise à co-construire des solutions adaptées à votre réalité terrain et à votre culture d'entreprise.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('benefits')}
                                            className="w-full flex items-center justify-between p-3 bg-[#0A1929] text-white text-sm font-bold hover:brightness-110 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'benefits' ? '-' : '+'}</span>
                                                <span>Bénéfices</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'benefits' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Fluidité des échanges, clarification des responsabilités, gain de temps et meilleure réactivité face aux demandes clients.
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
