'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Calendar, Bell, Music, ArrowRight } from 'lucide-react'

export default function NewsPage() {
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

    const newsCategories = [
        {
            title: "Prochaines Formations",
            description: "Découvrez notre calendrier des sessions de formation à venir et réservez votre place.",
            icon: <Calendar className="w-12 h-12 text-primary" />,
            href: "/news/formations",
            image: "/images/bansection.jpg"
        },
        {
            title: "Annonces",
            description: "Restez informé des dernières nouvelles, partenariats et mises à jour du centre.",
            icon: <Bell className="w-12 h-12 text-blue-600" />,
            href: "/news/annonces",
            image: "/images/image.png"
        },
        {
            title: "Événements Culturels",
            description: "Participez à nos conférences, ateliers et rencontres culturelles pour enrichir votre réseau.",
            icon: <Music className="w-12 h-12 text-purple-600" />,
            href: "/news/evenements-culturels",
            image: "/images/vision.jpg"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[300px] w-full overflow-hidden bg-[#003E6B]">
                    <div className="absolute inset-0 z-0 opacity-40">
                        <Image
                            src="/images/bansection.jpg"
                            alt="News & Events"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Actualités & Événements
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Suivez toute l'actualité de Talents Consulting Formation.
                        </p>
                    </div>
                </section>

                {/* News Categories Grid */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {newsCategories.map((cat, idx) => (
                            <Link
                                key={idx}
                                href={cat.href}
                                className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-border"
                            >
                                <div className="relative h-48 w-full">
                                    <Image src={cat.image} alt={cat.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                    <div className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-black/80 rounded-full shadow-lg">
                                        {cat.icon}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{cat.title}</h2>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {cat.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        En savoir plus <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
