'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Music, MapPin, Calendar, Users } from 'lucide-react'

export default function EvenementsCulturelsPage() {
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

    const events = [
        {
            title: "Conférence : L'IA et l'Avenir du Travail",
            date: "20 Janvier 2024",
            time: "18:00 - 20:30",
            location: "Grand Auditorium, Casablanca",
            speakers: "Experts Internationaux"
        },
        {
            title: "Workshop : Intelligence Emotionnelle",
            date: "28 Janvier 2024",
            time: "10:00 - 16:00",
            location: "Centre Talents Consulting",
            speakers: "Coachs Certifiés"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                <section className="relative h-[400px] w-full overflow-hidden bg-gradient-to-br from-[#003E6B] to-[#002845]">
                    <div className="absolute inset-0 opacity-40">
                        <Image src="/images/vision.jpg" alt="Culture" fill className="object-cover" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest animate-fade-in-up mb-4">
                            Événements Culturels
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100">
                            Rencontres, ateliers et conférences pour inspirer le changement.
                        </p>
                    </div>
                </section>

                <section className="py-24 px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {events.map((e, idx) => (
                            <div key={idx} className="bg-card rounded-3xl overflow-hidden shadow-2xl border border-border group">
                                <div className="p-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-4 bg-red-600/10 rounded-2xl">
                                            <Calendar className="w-8 h-8 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-red-600 font-bold">{e.date}</p>
                                            <p className="text-muted-foreground text-sm">{e.time}</p>
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-8 group-hover:text-primary transition-colors">{e.title}</h2>

                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <MapPin className="w-5 h-5 text-red-600/60" />
                                            <span>{e.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Users className="w-5 h-5 text-red-600/60" />
                                            <span>Intervenants : {e.speakers}</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02]">
                                        Réserver ma place
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
