'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function NotreEquipePage() {
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
                            alt="Notre Équipe"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up">
                            NOTRE ÉQUIPE
                        </h1>
                    </div>
                </section>

                {/* Team Members Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">


                        {/* Member 1: SAMIR ZAHIR - Centered */}
                        <div className="flex flex-col gap-12 items-center text-center max-w-4xl mx-auto">
                            {/* Image Container */}
                            <div className="flex justify-center">
                                <div className="relative w-64 h-64 bg-white p-2 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <div className="relative w-full h-full bg-gray-200 overflow-hidden">
                                        <Image
                                            src="/images/mrSamir.jpg"
                                            alt="Samir Zahir"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-8 w-full">
                                <div className="flex flex-col items-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-[#005b96] uppercase mb-2">
                                        ZAHIR SAMIR
                                    </h2>
                                    <p className="text-xl font-semibold text-[#FF8A00] uppercase tracking-wide mb-4">
                                        Directeur du centre 'Talents Consulting & Formations'
                                    </p>
                                    <div className="h-1 w-24 bg-[#FF8A00]"></div>
                                </div>

                                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-sm border border-gray-100 text-left">
                                    <p className="text-lg text-foreground/80 leading-relaxed mb-6 font-medium">
                                        Pour vous accompagner au mieux, notre équipe rassemble des talents variés notamment :
                                    </p>

                                    <ul className="space-y-4 mb-8 pl-4">
                                        {[
                                            "Des spécialistes titulaires de doctorats et engagés dans la recherche et l'enseignement ;",
                                            "Des professionnels certifiés en ingénierie pédagogique ;",
                                            "Des praticiens spécialisés en accompagnement individualisé du développement personnel et professionnel;",
                                            "Des spécialistes de l’humain, des consultants experts en psychologie cognitive et en dynamique du développement humain."
                                        ].map((item, index) => (
                                            <li key={index} className="flex items-start gap-3 text-base text-foreground/70 group">
                                                <span className="mt-2 w-2 h-2 rounded-full bg-[#FF8A00] flex-shrink-0 group-hover:scale-125 transition-transform" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="relative pl-6 border-l-4 border-[#005b96] py-2 bg-blue-50/50 rounded-r-lg">
                                        <p className="text-lg text-[#005b96] italic font-medium leading-relaxed">
                                            "Cette synergie de compétences assure une approche intégrée, conciliant une rigueur scientifique et conceptuelle, une expertise opérationnelle avérée, et un accompagnement individualisé et stratégique."
                                        </p>
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
