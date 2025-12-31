'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Briefcase, CheckCircle, FileText, UserPlus, Users } from 'lucide-react'

export default function InsertionProfessionnellePage() {
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
                        <Image src="/images/image.png" alt="Insertion Professionnelle" fill className="object-cover" />
                    </div>
                    <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        Insertion Professionnelle
                    </h1>
                </section>

                <section className="py-20 px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-primary">Boostez votre Carrière</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Nous accompagnons les lauréats et chercheurs d'emploi dans leurs démarches pour une insertion réussie. Notre programme est conçu pour maximiser vos chances de décrocher le poste de vos rêves.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <FileText className="text-primary" />, text: "Rédaction de CV Impactant" },
                                    { icon: <Users className="text-primary" />, text: "Simulation d'Entretien" },
                                    { icon: <UserPlus className="text-primary" />, text: "Networking Efficace" },
                                    { icon: <Briefcase className="text-primary" />, text: "Stratégie de Recherche" }
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
                                src="/images/coaching.jfif"
                                alt="Insertion Professionnelle"
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
