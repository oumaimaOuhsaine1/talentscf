'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Brain, Cpu, MessageSquare, Lightbulb } from 'lucide-react'

export default function AIPage() {
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
                <section className="relative h-[300px] w-full overflow-hidden bg-[#001B33]">
                    <div className="absolute inset-0 z-0 opacity-40">
                        <Image
                            src="/images/bansection.jpg"
                            alt="AI Technology"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Intelligence Artificielle
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Propulsez votre entreprise dans l'ère de l'innovation avec l'IA.
                        </p>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-purple-600/10 rounded-full">
                                    <Brain className="w-8 h-8 text-purple-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-400">
                                    L'IA au Service de votre Performance
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    L'intelligence artificielle n'est plus une option mais une nécessité stratégique. Nos formations Intra-entreprises vous accompagnent dans l'acculturation et l'implémentation des outils IA pour optimiser vos processus.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="text-purple-600" />
                                        <span>IA Générative (ChatGPT, etc.)</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Cpu className="text-purple-600" />
                                        <span>Automatisation Intelligente</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Lightbulb className="text-purple-600" />
                                        <span>Stratégie & Innovation</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Brain className="text-purple-600" />
                                        <span>Éthique & Gouvernance</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900 to-blue-900">
                            <Image
                                src="/images/image.png"
                                alt="AI Concept"
                                fill
                                className="object-cover mix-blend-overlay"
                            />
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <p className="text-white text-2xl font-bold text-center leading-relaxed">
                                    "L'IA ne remplacera pas l'humain, mais l'humain qui utilise l'IA remplacera celui qui ne l'utilise pas."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-purple-800 dark:text-purple-400">
                            Formations IA sur Mesure
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Acculturation à l'IA", desc: "Comprendre les bases et les enjeux pour tous les collaborateurs." },
                                { title: "IA pour le Marketing", desc: "Création de contenu, segmentation et personnalisation." },
                                { title: "IA pour les RH", desc: "Optimiser le recrutement et la gestion des talents." },
                                { title: "Prompt Engineering", desc: "Maîtriser l'art de commander aux modèles de langage." },
                                { title: "IA & Productivité", desc: "Utiliser les assistants IA pour gagner 30% de temps au quotidien." },
                                { title: "Cybersécurité & IA", desc: "Se protéger des menaces à l'ère de l'intelligence artificielle." }
                            ].map((p, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-purple-600">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{p.title}</h4>
                                            <p className="text-muted-foreground">{p.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link href="/contact" className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105">
                                Demander un devis
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
