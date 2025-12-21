'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { CheckCircle, ArrowRight, ShieldCheck, FileText, BarChart, Users } from 'lucide-react'

export default function AssurancePage() {
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
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image
                            src="/images/bansection.jpg"
                            alt="Assurance Training"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Formation Assurance
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Expertise technique et maîtrise réglementaire pour les professionnels du secteur.
                        </p>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-blue-600/10 rounded-full">
                                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-400">
                                    Maîtriser les Enjeux de l'Assurance
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    Le secteur de l'assurance est en constante mutation. Nos formations sont conçues pour apporter une réponse concrète aux défis techniques, juridiques et commerciaux des assureurs et courtiers.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-blue-600" />
                                        <span>Techniques d'Assurance</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="text-blue-600" />
                                        <span>Gestion des Risques</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BarChart className="text-blue-600" />
                                        <span>Développement Commercial</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="text-blue-600" />
                                        <span>Relation Client & Sinistres</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/competence.jpg"
                                alt="Assurance Expertise"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white text-xl font-semibold italic">
                                    "Sécurisez l'avenir de vos clients par une expertise renforcée."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Modules Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-blue-800 dark:text-blue-400">
                            Nos Modules de Spécialisation
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Assurance Vie", desc: "Produits d'épargne, de retraite et de prévoyance individuelle." },
                                { title: "Assurance IARD", desc: "Incendie, accidents et risques divers pour particuliers et pros." },
                                { title: "Responsabilité Civile", desc: "Enjeux juridiques et analyse des contrats complexes." },
                                { title: "Droit des Assurances", desc: "Le cadre législatif et réglementaire (Code des assurances)." },
                                { title: "Vente & Négociation", desc: "Techniques de closing adaptées aux produits financiers." },
                                { title: "Gestion des Sinistres", desc: "De la déclaration à l'indemnisation : optimiser les processus." }
                            ].map((module, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-blue-600">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{module.title}</h4>
                                            <p className="text-muted-foreground">{module.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link href="/contact" className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105">
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
