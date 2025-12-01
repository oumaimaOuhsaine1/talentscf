'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import { CheckCircle, ArrowRight, GraduationCap, Handshake, Target } from 'lucide-react'

export default function MBAPage() {
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
                {/* Banner Section - Navy Blue Background */}
                <section className="relative h-[300px] w-full overflow-hidden bg-[#003E6B]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            MBA - Master of Business Administration
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Excellence académique et expertise professionnelle
                        </p>
                    </div>
                </section>

                {/* Collaboration Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[#005A9C]/10 rounded-full">
                                    <Handshake className="w-8 h-8 text-[#005A9C]" />
                                </div>
                                <h2 className="text-3xl font-bold text-[#005A9C]">
                                    Une Collaboration d'Excellence
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-gray-700 dark:text-gray-300 space-y-6">
                                <p>
                                    Talents Consulting Formation est fier d'annoncer son partenariat stratégique avec
                                    <strong> Wesford</strong>, école supérieure de commerce et de management reconnue.
                                </p>
                                <p>
                                    Cette collaboration unique permet de combiner l'expertise terrain et l'approche pédagogique
                                    innovante de Talents Consulting avec l'excellence académique et la reconnaissance
                                    internationale des diplômes Wesford.
                                </p>
                                <p>
                                    Ensemble, nous proposons des parcours MBA conçus pour former les leaders de demain,
                                    capables de relever les défis complexes du monde des affaires globalisé.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                                    <GraduationCap className="w-5 h-5 text-[#005A9C]" />
                                    <span className="font-medium">Diplôme Reconnu</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                                    <Target className="w-5 h-5 text-[#005A9C]" />
                                    <span className="font-medium">Expertise Métier</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl h-full min-h-[400px]">
                            <div className="relative w-48 h-48 md:w-64 md:h-64 transform hover:scale-110 transition-transform duration-300">
                                <Image
                                    src="/images/image.png"
                                    alt="Talents Consulting"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="text-6xl md:text-8xl font-bold text-[#005A9C] animate-pulse">+</div>

                            <div className="relative w-48 h-48 md:w-64 md:h-64 transform hover:scale-110 transition-transform duration-300">
                                <Image
                                    src="/images/wesford.png"
                                    alt="Wesford"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Objectifs Section */}
                <section className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-[#005A9C]">
                            Objectifs de la Formation
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                "Développer une vision stratégique globale de l'entreprise",
                                "Maîtriser les outils de pilotage de la performance",
                                "Renforcer ses compétences en leadership et management d'équipe",
                                "Acquérir une expertise en gestion de projet complexe",
                                "Développer son intelligence émotionnelle et relationnelle",
                                "Préparer aux fonctions de direction et de cadre supérieur"
                            ].map((objectif, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-[#005A9C]">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-[#005A9C] flex-shrink-0 mt-1" />
                                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                                            {objectif}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="mt-16 text-center">
                            <a
                                href="https://www.wesford.ifc.fr/formation/?_niveau=bac-plus-4-bac-plus-5"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#005A9C] hover:bg-[#003E6B] text-white text-lg font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                            >
                                Consulter le programme complet
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                Vous serez redirigé vers le site officiel de Wesford
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
