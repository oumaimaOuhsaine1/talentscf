'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Bell, Tag, ArrowRight } from 'lucide-react'

export default function AnnoncesPage() {
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

    const annonces = [
        {
            title: "Nouveau Partenariat avec Wesford Genève",
            content: "Nous sommes fiers d'annoncer une collaboration stratégique pour offrir des diplômes internationaux d'excellence.",
            date: "10 Décembre 2023",
            tag: "Partenariat"
        },
        {
            title: "Ouverture des inscriptions Bachelor 2024",
            content: "Les inscriptions pour notre programme Bachelor Management sont désormais ouvertes. Places limitées.",
            date: "05 Décembre 2023",
            tag: "Formation"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                <section className="relative h-[250px] w-full bg-[#004d7a] flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        Annonces & Actualités
                    </h1>
                </section>

                <section className="py-20 px-4 max-w-5xl mx-auto">
                    <div className="space-y-12">
                        {annonces.map((a, idx) => (
                            <div key={idx} className="bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-border relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                                <div className="flex items-center gap-3 mb-6">
                                    <Tag className="text-primary w-5 h-5" />
                                    <span className="font-bold text-primary tracking-widest text-sm uppercase">{a.tag}</span>
                                    <span className="text-muted-foreground text-sm ml-auto">{a.date}</span>
                                </div>

                                <h2 className="text-3xl font-bold mb-6 text-foreground tracking-tight">{a.title}</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    {a.content}
                                </p>

                                <button className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all">
                                    Lire la suite <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
