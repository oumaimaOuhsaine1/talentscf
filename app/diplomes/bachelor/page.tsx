'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import { CheckCircle, ArrowRight, GraduationCap, Handshake, Target } from 'lucide-react'

export default function BachelorPage() {
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
                            Bachelor
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Formation professionnalisante et tremplin vers l'emploi
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
                                    Ensemble, nous proposons des parcours Bachelor conçus pour former les professionnels de demain,
                                    directement opérationnels et adaptés aux besoins du marché.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                                    <GraduationCap className="w-5 h-5 text-[#005A9C]" />
                                    <span className="font-medium">Diplôme Reconnu (Bac+3)</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                                    <Target className="w-5 h-5 text-[#005A9C]" />
                                    <span className="font-medium">Compétences Opérationnelles</span>
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
                                "Acquérir les fondamentaux du management et de la gestion",
                                "Développer des compétences opérationnelles concrètes",
                                "Maîtriser les outils numériques et professionnels",
                                "Savoir travailler en mode projet et en équipe",
                                "Développer son employabilité et son réseau professionnel",
                                "Préparer son entrée sur le marché du travail ou la poursuite d'études"
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

                        {/* Programme table (replaces CTA) */}
                        <div className="mt-12">
                            <h3 className="text-2xl font-semibold mb-4 text-center text-[#005A9C]">Programmes Bachelor</h3>

                            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-[#003E6B]">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-white">
                                                Thème
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                        {[
                                            'Responsable de clientèle Banque Finance Assurance',
                                            'Responsable en Développement Commercial et Marketing',
                                            'Chargé(e) de Communication Digitale et Évènementiel',
                                            'Ressources Humaines E-GRH',
                                            'Logistique et Transport (Stratégie achats et approvisionnements)',
                                            'Chargé(e) de développement de produit de tourisme',
                                            'Bachelor Informatique et Cybersécurité'
                                        ].map((row, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                    {row}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
