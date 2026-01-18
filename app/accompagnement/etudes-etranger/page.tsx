'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { GraduationCap, CheckCircle, Globe, Plane, Map } from 'lucide-react'

export default function EtudesEtrangerPage() {
    const [isDark, setIsDark] = useState(false)

//     useEffect(() => {
//         const isDarkMoCase à cocher :
//  J’accepte les conditions d’inscription

// Bouton :
// S’inscrirede = document.documentElement.classList.contains('dark')
//         setIsDark(isDarkMode)
//     }, [])

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
                        <Image src="/languages-globe.jpg" alt="Études à l'étranger" fill className="object-cover" />
                    </div>
                    <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        Études à l'Étranger
                    </h1>
                </section>

                <section className="py-20 px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-primary">Un Avenir Sans Frontières</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Nous ouvrons les portes des meilleures universités internationales. Bénéficiez d'un accompagnement personnalisé pour orienter votre parcours académique vers l'excellence mondiale.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Globe className="text-primary" />, text: "Orientation Internationale" },
                                    { icon: <GraduationCap className="text-primary" />, text: "Admission Université" },
                                    { icon: <Map className="text-primary" />, text: "Procédure Visa" },
                                    { icon: <Plane className="text-primary" />, text: "Installation Sur Place" }
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
                                src="/images/vision1.avif"
                                alt="Études à l'étranger"
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
