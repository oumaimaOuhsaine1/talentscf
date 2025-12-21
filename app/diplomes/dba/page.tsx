'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, GraduationCap, Briefcase, TrendingUp, Handshake } from 'lucide-react'

export default function DBAPage() {
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
                            DBA
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Doctorate of Business Administration - Sommet de l'Excellence Managériale
                        </p>
                    </div>
                </section>

                {/* Collaboration Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Handshake className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold text-primary">
                                    En Partenariat avec Wesford
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    Le Doctor of Business Administration (DBA) est le diplôme de gestion le plus élevé, conçu pour les cadres expérimentés et les dirigeants souhaitant valider leur expertise par une recherche académique appliquée.
                                </p>
                                <p>
                                    En collaboration avec <strong>Wesford</strong>, nous proposons un parcours d'excellence qui allie réflexion stratégique et impact opérationnel immédiat.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="text-primary" />
                                        <span>Expertise Stratégique</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="text-primary" />
                                        <span>Parcours pour Dirigeants</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="text-primary" />
                                        <span>Niveau Grade de Docteur</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="text-primary" />
                                        <span>Thèse Professionnelle</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl h-full min-h-[400px]">
                            <div className="relative w-40 h-40 md:w-56 md:h-56 transform hover:scale-105 transition-transform">
                                <Image src="/images/image.png" alt="Talents Consulting" fill className="object-contain" />
                            </div>
                            <div className="text-5xl font-bold text-primary">+</div>
                            <div className="relative w-40 h-40 md:w-56 md:h-56 transform hover:scale-105 transition-transform">
                                <Image src="/images/wesford.png" alt="Wesford" fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Program Details */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-primary">
                            Structure du Doctorat
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Méthodologie de Recherche", desc: "Acquérir les outils pour mener une recherche rigoureuse." },
                                { title: "Séminaires Thématiques", desc: "Approfondir les concepts de management stratégique." },
                                { title: "Accompagnement Thèse", desc: "Suivi personnalisé par un directeur de recherche." },
                                { title: "Impact Professionnel", desc: "Résoudre des problèmes complexes en entreprise." },
                                { title: "Réseau International", desc: "Échanges avec des experts et doctorants mondiaux." },
                                { title: "Soutenance Publique", desc: "Validation finale devant un jury académique." }
                            ].map((item, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-primary">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                            <p className="text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <a
                                href="https://www.wesford.ifc.fr/formation/?_niveau=doctorat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold py-4 px-8 rounded-full transition-all shadow-lg"
                            >
                                Explorer le cursus DBA
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
