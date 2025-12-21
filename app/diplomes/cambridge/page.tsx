'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, Award, Globe, BookOpen, GraduationCap } from 'lucide-react'

export default function CambridgePage() {
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
                <section className="relative h-[300px] w-full overflow-hidden bg-[#003E6B]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Cambridge English
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Certifications internationales reconnues mondialement
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-600/10 rounded-full">
                                    <Award className="w-8 h-8 text-red-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-red-600">
                                    Excellence Linguistique
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    Les examens Cambridge English sont reconnus par des milliers d'organisations dans le monde entier.
                                    Ils attestent de votre niveau d'anglais selon le Cadre Européen Commun de Référence pour les Langues (CECRL).
                                </p>
                                <p>
                                    Talents Consulting vous prépare à ces certifications prestigieuses pour booster votre carrière et vos opportunités internationales.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-red-600" />
                                        <span>Reconnaissance Mondiale</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="text-red-600" />
                                        <span>Niveaux CECRL (A1 à C2)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="text-red-600" />
                                        <span>Préparation Intensive</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award className="text-red-600" />
                                        <span>Certificat à Vie</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/image.png"
                                alt="Cambridge Certifications"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white text-xl font-semibold italic">
                                    "Ouvrez-vous les portes du monde avec une certification Cambridge."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Exams Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-primary">
                            Nos Préparations aux Examens
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "B1 Preliminary (PET)", desc: "Maîtriser les bases de l'anglais pour un usage quotidien." },
                                { title: "B2 First (FCE)", desc: "Prouver que vous pouvez communiquer avec assurance dans un environnement anglophone." },
                                { title: "C1 Advanced (CAE)", desc: "La certification de haut niveau pour les études ou la vie professionnelle." },
                                { title: "C2 Proficiency (CPE)", desc: "Le niveau le plus élevé, attestant d'une maîtrise exceptionnelle." },
                                { title: "Examens pour Enfants", desc: "Starters, Movers, Flyers pour encourager les plus jeunes." },
                                { title: "IELTS & LINGUASKILL", desc: "Tests rapides et précis pour les besoins académiques et pro." }
                            ].map((exam, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-red-600">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{exam.title}</h4>
                                            <p className="text-muted-foreground">{exam.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-8 rounded-full transition-all shadow-lg"
                            >
                                Réserver une évaluation gratuite
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
