'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function QuiSommesNousPage() {
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
                            src="/images/qui.jpg"
                            alt="Qui sommes-nous"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h1 className="text-2xl md:text-4xl font-bold text-white uppercase animate-fade-in-up">
                            QUI SOMMES-NOUS?
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            {/* Image */}
                            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src="/images/centre.png"
                                    alt="Centre Talents Consulting & Formation"
                                    fill
                                    className="object-cover"
                                    quality={100}
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                    Le Centre Talents Consulting & Formation
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-base text-foreground/80 leading-relaxed">
                                        Le Centre Emway a été créé en Août 2010 en vue de faire bénéficier le Maroc de l'expertise acquise dans d'autres pays, notamment le Canada et la France, dans les domaines du coaching, de la PNL, de l'Hypnose et de la formation en développement personnel ainsi que dans les champs de l'accompagnement des individus, des équipes et des entreprises.
                                    </p>
                                    <p className="text-base text-foreground/80 leading-relaxed">
                                        Emway intervient aussi dans le domaine du sport en accompagnant les athlètes et les équipes sportives pour optimiser leurs performances et atteindre l'excellence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ils nous font confiance Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
                            Ils nous ont fait <span style={{ color: '#FF8A00' }}>Confiance</span>
                        </h2>

                        {/* Carousel Container */}
                        <div className="relative">
                            {/* Previous Button */}
                            <button
                                onClick={() => {
                                    const container = document.getElementById('logos-container');
                                    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
                                aria-label="Previous"
                            >
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Logos Slider */}
                            <div
                                id="logos-container"
                                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-12"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <div
                                        key={item}
                                        className="flex-shrink-0 w-64 h-32 flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                                    >
                                        <div className="text-center text-muted-foreground font-semibold">
                                            Logo {item}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => {
                                    const container = document.getElementById('logos-container');
                                    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
                                aria-label="Next"
                            >
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Domaines de compétences Section */}
                <section className="relative py-20 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/competence.jpg"
                            alt="Domaines de compétences"
                            fill
                            className="object-cover"
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 uppercase">
                            Domaines de <span className="relative inline-block" style={{ color: '#FF8A00' }}>
                                compétences
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF8A00] animate-draw-line"></span>
                            </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Formations Certifiantes */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Formations Certifiantes</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Formations certifiantes en PNL, Hypnose, Manager-Coach, Leader-Coach, Coach Commercial, Expertise RH et Coaching sportif.
                                </p>
                            </div>

                            {/* Coaching */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Coaching</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Individuel, des équipes, opérationnel et organisationnel
                                </p>
                            </div>

                            {/* Accompagnement */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Accompagnement</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Accompagnement des entreprises dans des missions d'organisation, de conduite de changement, de mise en place de la vision, définition de la mission et de transformation de la culture d'entreprise.
                                </p>
                            </div>

                            {/* Formations Pour Entreprises */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Formations Pour Entreprises</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Formation aux métiers de l'entreprise, du management et du Leadership pour développer les performances individuelles et collectives des collaborateurs.
                                </p>
                            </div>

                            {/* Parcours Professionnel */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Parcours Professionnel</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Nous offrons à nos clients plusieurs parcours professionnels dans des domaines divers et variés.
                                </p>
                            </div>

                            {/* Location des Salles */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Location des Salles</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    3 salles de formation agencées et équipées offrent un espace convivial propice à l'apprentissage et à la pratique professionnelle supervisée.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    )
}
