'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Monitor, Server, Database, Lock } from 'lucide-react'

export default function InformatiquePage() {
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
                <section className="relative h-[300px] w-full overflow-hidden bg-[#0A0A0A]">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <Image
                            src="/images/bansection.jpg"
                            alt="IT Technology"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Informatique & IT
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Maîtrisez les technologies qui propulsent votre entreprise.
                        </p>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-slate-600/10 rounded-full">
                                    <Monitor className="w-8 h-8 text-slate-800 dark:text-slate-200" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                    Solutions de Formation IT
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    Dans un environnement numérique en perpétuelle évolution, la mise à jour des compétences IT est cruciale. Nos formations couvrent l'ensemble du spectre informatique, du support utilisateur à l'administration système.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <Monitor className="text-slate-700" />
                                        <span>Bureautique Avancée</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Server className="text-slate-700" />
                                        <span>Cloud & Serveurs</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Database className="text-slate-700" />
                                        <span>Data & Bases de données</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Lock className="text-slate-700" />
                                        <span>Sécurité Informatique</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/vision.jpg"
                                alt="IT Excellence"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                                <p className="text-white text-xl font-semibold italic">
                                    "La technologie est un levier de croissance, maîtrisez-la."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-slate-100">
                            Nos Pôles d'Expertise IT
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Pack Office & Collaboration", desc: "Excel expert, Teams, SharePoint pour une productivité maximale." },
                                { title: "Systèmes & Réseaux", desc: "Administration Windows/Linux, virtualisation et maintenance." },
                                { title: "Cybersécurité Professionnelle", desc: "Bonnes pratiques, protection des données et hygiène informatique." },
                                { title: "Développement & Web", desc: "Introduction au code, CMS (WordPress) et gestion de projets web." },
                                { title: "Cloud Computing", desc: "Migration et gestion des services Azure, AWS ou Google Cloud." },
                                { title: "Business Intelligence", desc: "Power BI, analyse de données et reporting stratégique." }
                            ].map((p, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-slate-700">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-slate-700 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{p.title}</h4>
                                            <p className="text-muted-foreground">{p.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link href="/contact" className="inline-flex items-center gap-3 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105">
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
