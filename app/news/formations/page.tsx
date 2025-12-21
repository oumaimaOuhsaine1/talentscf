'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function ProchainesFormationsPage() {
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

    const formations = [
        {
            title: "Certification PNL - Praticien",
            date: "15 Janvier 2024",
            location: "Casablanca / En ligne",
            duration: "8 Jours",
            category: "PNL"
        },
        {
            title: "Management & Leadership Agile",
            date: "22 Janvier 2024",
            location: "Rabat",
            duration: "3 Jours",
            category: "Management"
        },
        {
            title: "Intelligence Artificielle pour Managers",
            date: "05 Février 2024",
            location: "En ligne",
            duration: "2 Jours",
            category: "Innovation"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                <section className="relative h-[250px] w-full bg-[#003d5c] flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        Prochaines Formations
                    </h1>
                </section>

                <section className="py-20 px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 gap-8">
                        {formations.map((f, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row bg-card rounded-2xl shadow-lg border border-border overflow-hidden group hover:border-primary transition-colors">
                                <div className="md:w-1/4 bg-primary/10 flex flex-col items-center justify-center p-8 text-center border-b md:border-b-0 md:border-r border-border">
                                    <Calendar className="w-10 h-10 text-primary mb-2" />
                                    <span className="font-bold text-lg">{f.date}</span>
                                </div>
                                <div className="flex-1 p-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-tighter">
                                            {f.category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4">{f.title}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" /> {f.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" /> {f.duration}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex items-center justify-center bg-muted/30">
                                    <button className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                                        S'inscrire <ArrowRight className="w-4 h-4" />
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
