'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function EnseignantsPage() {
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

    const teachers = [
        {
            name: "Mahdi MOUATASSIME",
            description: "Consultant – Coach certifié en PNL, formé au CQPNL – Montréal et à L'IFHE – Paris. Il est spécialisé dans le management des ressources humaines, le coaching opérationnel et de la conduite du changement.",
            additionalInfo: "Mahdi MOUTASSIME est le fondateur et directeur du centre Emway. Il est aussi Maître-Praticien en Hypnose Ericksonienne et Enseignant certifié en PNL par Olivier LOCKERT, à l'Institut Français d'Hypnose Ericksonienne à Paris."
        },
        {
            name: "Riahi CHABBA",
            description: "Riahi CHABBA est Enseignant de la Programmation Neuro-Linguistique (PNL) certifié par l'Institut Français de l'Hypnose Ericksonienne à Paris (IFHE). Consultant et Coach professionnel certifié en PNL par le Centre Québécois de la PNL.",
            additionalInfo: "Certifié en techniques de présentation et d'animation des formations par DOOR INTERNATIONAL – Training & Consulting. Membre de la Société Internationale des Coachs PNL (SICPNL)."
        },
        {
            name: "Robert Dilts",
            description: "Est écrivain, coach, consultant et chercheur de renommée internationale. Il est, depuis 1975, l'un des principaux développeurs et formateurs en Programmation Neuro-Linguistique (PNL).",
            additionalInfo: "Ses travaux sur les stratégies, les croyances, la santé et les systèmes de leadership ont été appliqués dans le monde entier."
        },
        {
            name: "Colette Normandeau",
            description: "Enseignante et coach professionnelle certifiée en PNL, Colette est formée en synergologie, hypnose thérapeutique, communication non violente et en créativité.",
            additionalInfo: "Depuis une dizaine d'années, elle intervient en formation et en coaching auprès d'entrepreneurs et de gestionnaires."
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[300px] w-full overflow-hidden">
                    <div className="animate-fade-in">
                        <Image
                            src="/images/equipe.jfif"
                            alt="Équipe Enseignants"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Nos Enseignants
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#005b96] uppercase mb-3">
                                UNE ÉQUIPE D'<span className="relative inline-block text-red-600">
                                    EXPERTS
                                    <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                </span>
                            </h2>
                            <p className="text-base text-foreground/80 max-w-3xl mx-auto">
                                Nos enseignants sont tous certifiés par les plus grandes instances internationales de la PNL.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {teachers.map((teacher, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row gap-6 items-start"
                                >
                                    {/* Placeholder Image */}
                                    <div className="flex-shrink-0 w-24 h-32 bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-[#005b96] mb-3">
                                            {teacher.name}
                                        </h3>
                                        <p className="text-sm text-foreground/80 leading-relaxed mb-3 text-justify">
                                            {teacher.description}
                                        </p>
                                        <p className="text-sm text-foreground/70 leading-relaxed text-justify">
                                            {teacher.additionalInfo}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
