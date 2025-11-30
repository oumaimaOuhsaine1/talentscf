'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function VisiteGuideePage() {
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

    // Placeholder images for the gallery - reusing centre.png for now
    const galleryImages = [
        { src: "/images/centre.png", alt: "Accueil et Réception", title: "Accueil" },
        { src: "/images/centre.png", alt: "Salle de Formation 1", title: "Salle PNL" },
        { src: "/images/centre.png", alt: "Espace Détente", title: "Espace Détente" },
        { src: "/images/centre.png", alt: "Salle de Coaching", title: "Bureau Coaching" },
        { src: "/images/centre.png", alt: "Salle de Conférence", title: "Grande Salle" },
        { src: "/images/centre.png", alt: "Vue Extérieure", title: "Entrée" },
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
                            alt="Visite Guidée"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up">
                            Visite Guidée
                        </h1>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase animate-fade-in-up">
                                DÉCOUVREZ{' '}
                                <span className="relative inline-block text-red-600">
                                    NOS LOCAUX
                                    <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                </span>
                            </h2>
                            <p className="text-xl text-[#005b96] font-medium">
                                Une immersion dans notre environnement d'apprentissage
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "Espace Accueil" },
                                { title: "Salle de Formation A" },
                                { title: "Espace Détente" },
                                { title: "Salle de Conférence" },
                                { title: "Espace Coaching" },
                                { title: "Espace Pause" }
                            ].map((space, index) => (
                                <div key={index} className="group relative h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer bg-gray-200">
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <h3 className="text-white text-xl font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            {space.title}
                                        </h3>
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
