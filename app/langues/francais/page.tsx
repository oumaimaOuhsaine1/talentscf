'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, BookOpen, MessageCircle, Award, Users } from 'lucide-react'

export default function FrancaisPage() {
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
                        <div className="relative w-20 h-13 mb-4 shadow-lg rounded overflow-hidden">
                            <Image src="/images/french.png" alt="France" fill className="object-cover" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Cours de Français
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Maîtrisez le français pour vos projets professionnels et personnels.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <BookOpen className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold text-primary">
                                    Apprendre le Français à Talents Consulting
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    Le français est une langue de culture, de diplomatie et une langue économique majeure.
                                    Nos cours sont conçus pour vous donner les outils nécessaires pour communiquer avec aisance.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="text-primary" />
                                        <span>Communication Orale</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award className="text-primary" />
                                        <span>Préparation DELF/DALF</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="text-primary" />
                                        <span>Français des Affaires</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="text-primary" />
                                        <span>Grammaire & Syntaxe</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/training-course.png"
                                alt="Formation Français"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white text-xl font-semibold italic">
                                    "Une méthode immersive pour des progrès rapides et durables."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Levels Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-primary">
                            Nos Niveaux de Formation
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Niveau Débutant (A1-A2)", desc: "Acquérir les bases de la communication quotidienne." },
                                { title: "Niveau Intermédiaire (B1-B2)", desc: "Devenir autonome dans la plupart des situations professionnelles." },
                                { title: "Niveau Avancé (C1-C2)", desc: "Maîtriser les nuances et argumenter avec précision." },
                                { title: "Français Médical / Juridique", desc: "Vocabulaire spécifique adapté à votre secteur d'activité." },
                                { title: "Ateliers de Conversation", desc: "Pratique intensive pour gagner en fluidité." },
                                { title: "Coaching Individuel", desc: "Un programme sur-mesure selon vos objectifs spécifiques." }
                            ].map((level, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-primary">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{level.title}</h4>
                                            <p className="text-muted-foreground">{level.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold py-4 px-8 rounded-full transition-all shadow-lg"
                            >
                                S'inscrire à une session
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
