'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { GraduationCap, ArrowRight, Award, BookOpen, Globe, Briefcase } from 'lucide-react'

const diplomas = [
    {
        id: 'bachelor',
        name: 'Bachelor',
        description: 'Formation professionnalisante (Bac+3) en collaboration avec Wesford.',
        icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
        href: '/diplomes/bachelor',
        color: 'border-blue-500'
    },
    {
        id: 'mba',
        name: 'MBA',
        description: 'Master of Business Administration pour propulser votre carrière managériale.',
        icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
        href: '/diplomes/mba',
        color: 'border-indigo-500'
    },
    {
        id: 'cambridge',
        name: 'Cambridge English',
        description: 'Certifications de prestige reconnues par les entreprises et universités mondiales.',
        icon: <Award className="w-8 h-8 text-red-600" />,
        href: '/diplomes/cambridge',
        color: 'border-red-500'
    },
    {
        id: 'dba',
        name: 'DBA',
        description: 'Doctor of Business Administration : le plus haut niveau d\'excellence académique.',
        icon: <BookOpen className="w-8 h-8 text-slate-700" />,
        href: '/diplomes/dba',
        color: 'border-slate-700'
    }
]

export default function DiplomesPage() {
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
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image
                            src="/images/bansection.jpg"
                            alt="Diplômes Background"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-6">
                            Nos Diplômes & Certifications
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Des parcours d'excellence pour valider vos compétences au plus haut niveau.
                        </p>
                    </div>
                </section>

                {/* Hub Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {diplomas.map((diploma) => (
                            <Link
                                key={diploma.id}
                                href={diploma.href}
                                className={`group relative bg-card hover:bg-accent transition-all duration-300 p-8 rounded-2xl shadow-lg border-b-4 ${diploma.color} flex flex-col items-center text-center`}
                            >
                                <div className="mb-6 p-4 bg-muted rounded-full group-hover:scale-110 transition-transform">
                                    {diploma.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{diploma.name}</h3>
                                <p className="text-muted-foreground mb-6 flex-1">{diploma.description}</p>
                                <span className="inline-flex items-center gap-2 text-primary font-semibold">
                                    Découvrir <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Info Section */}
                <section className="py-20 bg-muted/50">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8">Pourquoi choisir nos diplômes ?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="space-y-4">
                                <h4 className="font-bold text-lg flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    Reconnaissance
                                </h4>
                                <p className="text-muted-foreground">Des titres reconnus internationalement par le monde académique et professionnel.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-lg flex items-center gap-2">
                                    <Award className="w-5 h-5 text-primary" />
                                    Excellence
                                </h4>
                                <p className="text-muted-foreground">Une rigueur pédagogique garantissant la valeur de votre diplôme sur le marché du travail.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-lg flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                    Carrière
                                </h4>
                                <p className="text-muted-foreground">Des parcours conçus pour maximiser votre employabilité et votre évolution hiérarchique.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
