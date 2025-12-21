'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { GraduationCap, Microscope, CheckCircle, ArrowRight } from 'lucide-react'

export default function AccompagnementPage() {
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

    const segments = [
        {
            id: 'chercheurs',
            title: "Chercheurs",
            description: "Accompagnement méthodologique, aide à la publication et soutien à la recherche scientifique.",
            icon: <Microscope className="w-12 h-12 text-primary" />,
            href: "/accompagnement/chercheurs",
            features: ["Méthodologie de recherche", "Relecture scientifique", "Aide à la publication"]
        },
        {
            id: 'etudiants',
            title: "Étudiants",
            description: "Orientation académique, coaching de réussite et préparation aux examens et concours.",
            icon: <GraduationCap className="w-12 h-12 text-red-600" />,
            href: "/accompagnement/etudiants",
            features: ["Orientation scolaire", "Coaching de réussite", "Soft Skills & Examens"]
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[400px] w-full overflow-hidden bg-[#003E6B]">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <Image
                            src="/images/bansection.jpg"
                            alt="Accompagnement"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-6">
                            Accompagnement
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-4xl animate-fade-in-up delay-100">
                            Un soutien sur mesure pour votre parcours académique et scientifique.
                        </p>
                    </div>
                </section>

                {/* Segments Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {segments.map((segment, idx) => (
                            <div key={idx} className="bg-card rounded-3xl p-10 shadow-2xl border border-border flex flex-col group hover:border-primary transition-all">
                                <div className="mb-8 p-4 bg-muted rounded-2xl w-fit group-hover:bg-primary/10 transition-colors">
                                    {segment.icon}
                                </div>
                                <h2 className="text-3xl font-bold mb-6">{segment.title}</h2>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    {segment.description}
                                </p>
                                <ul className="space-y-4 mb-10 flex-1">
                                    {segment.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle className="text-primary w-5 h-5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={segment.href}
                                    className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform"
                                >
                                    En savoir plus <ArrowRight size={20} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
