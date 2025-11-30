'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function CoachingIndividuelPage() {
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
                            Coaching Individuel
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                            {/* Left Column - Image with Red Shape */}
                            <div className="relative flex justify-center md:justify-end pr-8">
                                {/* Mahogany Red Background Shape */}
                                <div className="absolute top-0 right-10 w-[280px] h-[450px] bg-[#BC0C1B] rounded-[100px] transform -rotate-12 z-0"></div>

                                {/* Image */}
                                <div className="relative z-10 mt-10 mr-4">
                                    <div className="relative w-[300px] h-[400px] overflow-hidden rounded-b-full">
                                        <Image
                                            src="/images/coaching-individuel.jpg"
                                            alt="Coach Professionnel"
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Content & Accordion */}
                            <div className="space-y-8 pt-4">
                                <p className="text-xs text-justify leading-relaxed text-gray-600">
                                    S'inspirant des thérapies brèves, cognitives et comportementales, ainsi que du coaching génératif, le coaching individuel adopte une approche pratique où le coach se concentre sur les comportements, les capacités, les croyances et l'identité profonde du client. Le coaching génératif, en particulier, vise à stimuler la créativité et l'innovation du client, favorisant ainsi un état de "générativité" où de nouvelles idées et perspectives émergent naturellement.
                                </p>

                                {/* Accordion */}
                                <div className="space-y-1">
                                    {/* Item 1 */}
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('what-is')}
                                            className="w-full flex items-center justify-between p-3 bg-[#BC0C1B] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'what-is' ? '-' : '+'}</span>
                                                <span>Qu'est ce que le Coaching par PNL?</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'what-is' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Le Coaching en PNL se fonde sur l'approche et les techniques de la PNL (programmation neuro linguistique), considérée aujourd'hui comme la méthode thérapeutique et/ou d'encadrement la plus complète pour intervenir au niveau des processus de changement d'une personne, quel que soit son âge ou ses difficultés. Depuis plus de 30 ans, la PNL a fait ses preuves comme outil extraordinaire de changement et de croissance personnelle auprès des multiples spécialistes de la psychologie et de la relation d'aide. Le Coaching en PNL est une approche orientée vers les objectifs et centrée sur les forces positives du client.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Item 2 */}
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('why-choose')}
                                            className="w-full flex items-center justify-between p-3 bg-[#BC0C1B] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'why-choose' ? '-' : '+'}</span>
                                                <span>Pourquoi choisir le Coaching Individuel ?</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'why-choose' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Le coaching individuel offre un espace privilégié pour travailler sur soi, dépasser ses blocages et atteindre ses objectifs personnels et professionnels avec un accompagnement sur mesure.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Item 3 */}
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('difficulties')}
                                            className="w-full flex items-center justify-between p-3 bg-[#BC0C1B] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'difficulties' ? '-' : '+'}</span>
                                                <span>Le Coaching PNL est adapté aux quelles difficultés ?</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'difficulties' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Il est adapté pour la gestion du stress, les phobies, les conflits relationnels, le manque de confiance en soi, la transition de carrière, et bien d'autres défis de la vie.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Item 4 */}
                                    <div className="border-b border-white">
                                        <button
                                            onClick={() => toggleAccordion('professionals')}
                                            className="w-full flex items-center justify-between p-3 bg-[#BC0C1B] text-white text-sm font-bold hover:brightness-90 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold">{openAccordion === 'professionals' ? '-' : '+'}</span>
                                                <span>Nos Professionnels</span>
                                            </div>
                                        </button>
                                        {openAccordion === 'professionals' && (
                                            <div className="bg-gray-50 p-4 text-xs text-justify leading-relaxed text-gray-700 border border-gray-200">
                                                <p>
                                                    Nos coachs sont certifiés en PNL et possèdent une solide expérience dans l'accompagnement individuel et professionnel.
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
