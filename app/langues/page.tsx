'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Globe, ArrowRight, Languages, BookOpen, MessageSquare, GraduationCap } from 'lucide-react'

const languages = [
    {
        id: 'francais',
        name: 'Français',
        description: 'De l\'initiation au perfectionnement, maîtrisez la langue de Molière.',
        flag: '/images/french.png',
        href: '/langues/francais',
        color: 'border-blue-500'
    },
    {
        id: 'anglais',
        name: 'Anglais',
        description: 'Boostez votre carrière avec une maîtrise parfaite de la langue internationale.',
        flag: '/images/uk.jpg',
        href: '/langues/anglais',
        color: 'border-red-500'
    },
    {
        id: 'allemand',
        name: 'Allemand',
        description: 'Ouvrez-vous aux opportunités économiques de la première puissance européenne.',
        flag: '/images/allemand.avif',
        href: '/langues/allemand',
        color: 'border-yellow-500'
    },
    {
        id: 'espagnol',
        name: 'Espagnol',
        description: 'Apprenez la deuxième langue la plus parlée au monde et explorez de nouvelles cultures.',
        flag: '/images/espagnol.avif',
        href: '/langues/espagnol',
        color: 'border-orange-500'
    }
]

export default function LanguesPage() {
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
                            src="/languages-globe.jpg"
                            alt="Languages Globe"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-6">
                            Nos Formations en Langues
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Développez vos compétences linguistiques pour réussir dans un environnement globalisé.
                        </p>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                            <Languages className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-primary">Pourquoi apprendre une langue avec nous?</h2>
                        <p className="text-lg text-muted-foreground">
                            Nous proposons des méthodes d'apprentissage modernes, interactives et centrées sur l'apprenant.
                            Que ce soit pour des besoins professionnels, académiques ou personnels, nos programmes s'adaptent à votre rythme.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {languages.map((lang) => (
                            <Link
                                key={lang.id}
                                href={lang.href}
                                className={`group relative bg-card hover:bg-accent transition-all duration-300 p-8 rounded-2xl shadow-lg border-b-4 ${lang.color} overflow-hidden`}
                            >
                                <div className="relative w-16 h-10 mb-6 mx-auto shadow-sm rounded overflow-hidden">
                                    <Image src={lang.flag} alt={lang.name} fill className="object-cover" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{lang.name}</h3>
                                <p className="text-muted-foreground mb-6 line-clamp-3">{lang.description}</p>
                                <span className="inline-flex items-center gap-2 text-primary font-semibold">
                                    En savoir plus <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-muted/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-primary text-primary-foreground rounded-2xl">
                                    <BookOpen className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold">Méthodes Innovantes</h4>
                                <p className="text-muted-foreground">Une approche pédagogique basée sur la communication et l'immersion.</p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-primary text-primary-foreground rounded-2xl">
                                    <MessageSquare className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold">Pratique Intensive</h4>
                                <p className="text-muted-foreground">Des ateliers de conversation pour libérer votre expression orale.</p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-primary text-primary-foreground rounded-2xl">
                                    <GraduationCap className="w-8 h-8" />
                                </div>
                                <h4 className="text-xl font-bold">Certifications</h4>
                                <p className="text-muted-foreground">Préparation aux examens internationaux (TOEIC, TOEFL, DELF, etc.).</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
