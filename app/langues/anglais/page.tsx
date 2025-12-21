'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, BookOpen, MessageCircle, Award, Briefcase } from 'lucide-react'

export default function AnglaisPage() {
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
                            <Image src="/images/uk.jpg" alt="English" fill className="object-cover" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Cours d'Anglais
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Internationalisez votre carrière avec une maîtrise parfaite de l'anglais.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-600/10 rounded-full">
                                    <Briefcase className="w-8 h-8 text-red-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-red-600">
                                    Business English & Plus
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    L'anglais est le passeport indispensable pour le monde des affaires.
                                    Notre centre vous propose des formations ciblées pour répondre aux exigences internationales.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <Award className="text-red-600" />
                                        <span>TOEIC / TOEFL / IELTS</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="text-red-600" />
                                        <span>Anglais Professionnel</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="text-red-600" />
                                        <span>Prise de parole en public</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="text-red-600" />
                                        <span>Rédaction de rapports</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/image.png"
                                alt="Formation Anglais"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white text-xl font-semibold italic">
                                    "Don't just learn English, speak it with confidence."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-red-600">
                            Nos Programmes Spécifiques
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "General English", desc: "Tous niveaux de débutant à avancé." },
                                { title: "Business English", desc: "Management, Marketing, Finance, RH." },
                                { title: "Exam Preparation", desc: "Certification officielle reconnue mondialement." },
                                { title: "Technical English", desc: "Ingénierie, IT, Industrie." },
                                { title: "English for Travel", desc: "Préparer vos déplacements à l'étranger." },
                                { title: "Intensive Bootcamps", desc: "Immersion totale pendant une semaine." }
                            ].map((program, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-red-600">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{program.title}</h4>
                                            <p className="text-muted-foreground">{program.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white text-lg font-bold py-4 px-8 rounded-full transition-all shadow-lg"
                            >
                                Join our classes now
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
