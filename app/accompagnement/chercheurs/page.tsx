'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Microscope, CheckCircle, FileText, Search, Brain } from 'lucide-react'

export default function ChercheursPage() {
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
                {/* Header */}
                <section className="relative h-[300px] w-full bg-[#003d5c] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <Image src="/images/vision.jpg" alt="Research" fill className="object-cover" />
                    </div>
                    <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        Accompagnement Chercheurs
                    </h1>
                </section>

                <section className="py-20 px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-primary">Soutenir l'Excellence Scientifique</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Nous accompagnons les doctorants et chercheurs dans les étapes cruciales de leur parcours. Notre expertise couvre la structuration de la pensée scientifique, la rigueur méthodologique et la visibilité des travaux.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Search className="text-primary" />, text: "Méthodologie PhD" },
                                    { icon: <FileText className="text-primary" />, text: "Aide à la rédaction" },
                                    { icon: <Brain className="text-primary" />, text: "Analyse de données" },
                                    { icon: <Microscope className="text-primary" />, text: "Veille scientifique" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                        {item.icon}
                                        <span className="font-semibold">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/competence.jpg"
                                alt="Accompagnement Chercheurs"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
