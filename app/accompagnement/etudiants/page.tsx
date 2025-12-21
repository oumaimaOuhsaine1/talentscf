'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { GraduationCap, CheckCircle, Target, BookOpen, UserCheck } from 'lucide-react'

export default function EtudiantsPage() {
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
                <section className="relative h-[300px] w-full bg-[#7a0000] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <Image src="/images/bansection.jpg" alt="Students" fill className="object-cover" />
                    </div>
                    <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        Accompagnement Étudiants
                    </h1>
                </section>

                <section className="py-20 px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 bg-card p-10 rounded-3xl shadow-2xl border border-border">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <CheckCircle className="text-red-600" /> Réussir son Parcours
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    "Bilan d'orientation et projet professionnel.",
                                    "Coaching de motivation et gestion du stress.",
                                    "Méthodologie de travail et apprentissage efficace.",
                                    "Préparation aux examens, concours et entretiens.",
                                    "Appui à la recherche de stages et premier emploi."
                                ].map((item, id) => (
                                    <li key={id} className="flex items-start gap-4">
                                        <div className="h-2 w-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <h2 className="text-3xl font-bold text-red-600">Votre Réussite est Notre Priorité</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Nous offrons aux étudiants un cadre de soutien personnalisé pour surmonter les obstacles académiques et construire une carrière solide. Notre approche combine coaching psychopédagogique et outils pratiques.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Target className="text-red-600" />, text: "Objectifs clairs" },
                                    { icon: <BookOpen className="text-red-600" />, text: "Méthodes agiles" },
                                    { icon: <UserCheck className="text-red-600" />, text: "Coaching Individuel" },
                                    { icon: <GraduationCap className="text-red-600" />, text: "Succès Académique" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                        {item.icon}
                                        <span className="font-semibold">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
