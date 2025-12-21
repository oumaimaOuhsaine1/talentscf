'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, BookOpen, MessageCircle, TrendingUp, Globe } from 'lucide-react'

export default function AllemandPage() {
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
                        <div className="relative w-20 h-13 mb-4 shadow-lg rounded overflow-hidden border border-white/20">
                            <Image src="/images/allemand.avif" alt="German" fill className="object-cover" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Cours d'Allemand
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Maîtrisez la langue de la première économie d'Europe.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-yellow-500/10 rounded-full">
                                    <TrendingUp className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-yellow-700 dark:text-yellow-500">
                                    Wirtschaftsdeutsch & Opportunités
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    L'allemand est une langue clé pour l'industrie, les sciences et l'innovation.
                                    Apprendre l'allemand avec Talents Consulting vous ouvre des portes vers de nouveaux marchés.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-yellow-600" />
                                        <span>Culture Germanique</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="text-yellow-600" />
                                        <span>Allemand des Affaires</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="text-yellow-600" />
                                        <span>Prononciation & Phonétique</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="text-yellow-600" />
                                        <span>Grammaire structurée</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/master-training.jpg"
                                alt="Formation Allemand"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white text-xl font-semibold italic">
                                    "Deutsch lernen für eine erfolgreiche Zukunft."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advantages Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-yellow-700 dark:text-yellow-500">
                            Pourquoi choisir notre formation d'Allemand?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Niveaux A1 à C1", desc: "De la découverte à la maîtrise experte." },
                                { title: "Préparation Goethe-Institut", desc: "Examens certifiés officiels (Start Deutsch, TestDaF)." },
                                { title: "Vocabulaire Technique", desc: "Adapté pour les ingénieurs et techniciens." },
                                { title: "Échanges Interculturels", desc: "Comprendre les codes du travail en Allemagne." },
                                { title: "Petits Groupes", desc: "Pour maximiser le temps de parole individuel." },
                                { title: "Supports Multimédia", desc: "Apprentissage moderne et dynamique." }
                            ].map((adv, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{adv.title}</h4>
                                            <p className="text-muted-foreground">{adv.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 bg-yellow-600 hover:bg-yellow-700 text-white text-lg font-bold py-4 px-8 rounded-full transition-all shadow-lg"
                            >
                                Jetzt Deutsch lernen
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
