'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, Target, Users, Zap, Heart } from 'lucide-react'

export default function ArfaDevPage() {
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
                {/* Banner Section */}
                <section className="relative h-[400px] w-full overflow-hidden bg-[#003E6B]">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <Image
                            src="/neuro-linguistic-programming.jpg"
                            alt="Arfa Développement"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-6">
                            Arfa Développement
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-4xl animate-fade-in-up delay-100">
                            L'excellence en PNL, Coaching et Consulting pour votre transformation.
                        </p>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-primary">Un Accompagnement Holistique</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Arfa Développement regroupe nos expertises phares en Programmation Neuro-Linguistique (PNL) et en Coaching & Consulting.
                                Notre mission est de libérer le potentiel des individus et des organisations à travers des méthodes éprouvées et innovantes.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Target className="text-primary w-6 h-6" />
                                    <span className="font-semibold">Performance</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Users className="text-primary w-6 h-6" />
                                    <span className="font-semibold">Leadership</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Zap className="text-primary w-6 h-6" />
                                    <span className="font-semibold">Innovation</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                                    <Heart className="text-primary w-6 h-6" />
                                    <span className="font-semibold">Bien-être</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform">
                            <Image
                                src="/coaching-consultation.jpg"
                                alt="Coaching Session"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Services Summary */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Nos Domaines d'Intervention</h2>
                            <div className="w-24 h-1 bg-primary mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* PNL Column */}
                            <div className="bg-card p-10 rounded-2xl shadow-xl border-t-8 border-primary">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Zap className="text-primary" /> PNL & Evolution
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Certifications Internationales PNL",
                                        "Parcours Coaching Génératif",
                                        "Maîtrise de la Communication",
                                        "Libération des blocages internes"
                                    ].map((item, id) => (
                                        <li key={id} className="flex items-start gap-3">
                                            <CheckCircle className="text-primary w-5 h-5 mt-1 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/pnl" className="inline-flex items-center gap-2 mt-8 text-primary font-bold hover:gap-3 transition-all">
                                    Détails PNL <ArrowRight size={18} />
                                </Link>
                            </div>

                            {/* Coaching Column */}
                            <div className="bg-card p-10 rounded-2xl shadow-xl border-t-8 border-primary">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Users className="text-primary" /> Coaching & Consulting
                                </h3>
                                <ul className="space-y-4">
                                    {[
                                        "Coaching de Dirigeants & Managers",
                                        "Accompagnement d'Équipes",
                                        "Conseil en Organisation et RH",
                                        "Gestion de la Conduite du Changement"
                                    ].map((item, id) => (
                                        <li key={id} className="flex items-start gap-3">
                                            <CheckCircle className="text-primary w-5 h-5 mt-1 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/coaching" className="inline-flex items-center gap-2 mt-8 text-primary font-bold hover:gap-3 transition-all">
                                    Détails Coaching <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
