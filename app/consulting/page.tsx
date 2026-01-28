'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ClipboardCheck, Briefcase, TrendingUp, Handshake, Target } from 'lucide-react'

export default function ConsultingPage() {
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
                <section className="relative h-[350px] w-full overflow-hidden bg-[#003E6B]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight animate-fade-in-up mb-6 leading-tight max-w-4xl">
                            Consulting & formation professionnelle pour les entreprises marocaines
                        </h1>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-primary flex items-center gap-4">
                                <Briefcase className="w-10 h-10" />
                                Accompagnement Stratégique
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-lg text-foreground/80 space-y-6 leading-relaxed">
                                <p>
                                    TALENTS Consulting & Formation accompagne les entreprises marocaines (personnes morales) dans la conception, la mise en œuvre et le financement de leurs projets de formation professionnelle, en lien avec leurs enjeux de performance, de compétitivité et de développement des compétences.
                                </p>
                                <p>
                                    Notre approche s’adresse aux PME, grandes entreprises, coopératives et organisations professionnelles, souhaitant investir durablement dans le capital humain.
                                </p>
                            </div>
                        </div>

                        <div className="relative h-[400px] flex items-center justify-center bg-white dark:bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
                            <div className="relative w-80 h-80 transform transition-transform hover:scale-110 duration-500">
                                <Image
                                    src="/images/logo-talents.png"
                                    alt="TALENTS Consulting Logo"
                                    fill
                                    className="object-contain p-8"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Objectives Section */}
                <section className="py-24 bg-muted/30 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                                Objectifs du volet consulting entreprises
                            </h2>
                            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "Développer les compétences techniques, managériales et comportementales du personnel", icon: <Target className="w-8 h-8 text-primary" /> },
                                { title: "Aligner les actions de formation avec la stratégie de l’entreprise", icon: <TrendingUp className="w-8 h-8 text-primary" /> },
                                { title: "Améliorer la performance organisationnelle et opérationnelle", icon: <CheckCircle className="w-8 h-8 text-primary" /> },
                                { title: "Faciliter l’accès aux mécanismes nationaux de financement de la formation", icon: <ClipboardCheck className="w-8 h-8 text-primary" /> }
                            ].map((obj, index) => (
                                <div key={index} className="bg-white dark:bg-card p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-border group hover:-translate-y-2">
                                    <div className="bg-primary/5 p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform">
                                        {obj.icon}
                                    </div>
                                    <p className="font-bold text-lg leading-snug text-foreground/90">
                                        {obj.title}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 max-w-4xl mx-auto bg-primary/10 border-l-8 border-primary p-8 rounded-2xl backdrop-blur-sm shadow-xl animate-fade-in">
                            <p className="text-xl md:text-2xl font-bold text-primary leading-relaxed italic text-center">
                                "Les entreprises peuvent bénéficier d’un remboursement pouvant aller jusqu’à 80 % du budget de formation engagé, sous réserve d’éligibilité et de conformité du dossier."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Strategy 2026 Section */}
                <section className="py-24 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2">
                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                        Accompagnement des dossiers de financement de la formation
                                    </h2>
                                    <div className="h-1.5 w-24 bg-primary rounded-full"></div>
                                    <p className="text-xl text-foreground font-semibold leading-relaxed">
                                        Dans le cadre de ses objectifs stratégiques 2026, TALENTS Consulting & Formation propose un accompagnement spécialisé des entreprises marocaines dans le montage et le suivi des dossiers de financement.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full">
                                <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl group">
                                    <Image
                                        src="/images/collab2.jpg"
                                        alt="Accompagnement Stratégique"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-24 text-center">
                            <Link
                                href="/contact/pre-diagnostics"
                                className="inline-flex items-center gap-4 bg-[#FF8A00] hover:bg-[#E67C00] text-white px-10 py-6 rounded-3xl font-black text-xl md:text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-orange-500/30 active:scale-95"
                            >
                                <ClipboardCheck className="w-8 h-8" />
                                Demander un diagnostic gratuit
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
