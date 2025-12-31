'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, BookOpen, MessageCircle, Award, Briefcase, Users, User, Users2, Target, Sparkles, Coffee, Presentation, Plane, Globe } from 'lucide-react'

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
                                        <Globe className="text-red-600" />
                                        <span>Formation en langues étrangères</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award className="text-red-600" />
                                        <span>Préparation aux attestations internationales</span>
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

                {/* Formation Types Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Types de Formation</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Choisissez le format qui correspond le mieux à votre rythme et à vos objectifs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: <Users className="w-8 h-8 text-red-600" />,
                                    title: "Cours en Groupe",
                                    desc: "Favorise l'interaction et l'apprentissage collaboratif dans une ambiance dynamique."
                                },
                                {
                                    icon: <User className="w-8 h-8 text-red-600" />,
                                    title: "Cours Individuels",
                                    desc: "Un accompagnement sur-mesure pour une progression rapide et ciblée."
                                },
                                {
                                    icon: <Users2 className="w-8 h-8 text-red-600" />,
                                    title: "Cours en Binôme",
                                    desc: "Apprenez avec un collègue ou un ami pour une motivation partagée."
                                },
                                {
                                    icon: <Target className="w-8 h-8 text-red-600" />,
                                    title: "Préparation TCF/TOEFL",
                                    desc: "Entraînement intensif pour réussir vos certifications internationales."
                                }
                            ].map((type, index) => (
                                <div key={index} className="p-8 rounded-2xl bg-muted/50 border border-border hover:border-red-600/50 transition-all hover:shadow-xl group">
                                    <div className="mb-6 group-hover:scale-110 transition-transform">{type.icon}</div>
                                    <h4 className="text-xl font-bold mb-3">{type.title}</h4>
                                    <p className="text-muted-foreground">{type.desc}</p>
                                </div>
                            ))}
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

                    </div>
                </section>

                {/* Partnership and Travel Section */}
                <section className="py-20 bg-background overflow-hidden border-y border-border/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Cambridge Partnership */}
                            <div className="space-y-8 animate-fade-in-left">
                                <h2 className="text-3xl font-bold text-red-600 flex items-center gap-3">
                                    <Award className="w-10 h-10" />
                                    Diplômes en langue anglaise
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    En partenariat avec <strong>l'Université de CAMBRIDGE</strong>, nous vous offrons l'opportunité d'obtenir des diplômes certifiés et reconnus à l'échelle internationale. Validez vos compétences avec l'excellence académique de Cambridge et propulsez votre carrière vers de nouveaux sommets.
                                </p>
                                <div className="flex items-center justify-center gap-12 p-8 bg-white dark:bg-card rounded-3xl shadow-xl border border-border hover:shadow-2xl transition-shadow">
                                    <div className="relative w-32 h-32 group">
                                        <Image src="/images/logo.jpg" alt="Centre Logo" fill className="object-contain" />
                                    </div>
                                    <div className="text-4xl font-bold text-red-600">+</div>
                                    <div className="relative w-40 h-32 group">
                                        <Image src="/cambridge.png" alt="Cambridge Logo" fill className="object-contain" />
                                    </div>
                                </div>
                            </div>

                            {/* London Trips */}
                            <div className="space-y-8 animate-fade-in-right">
                                <h2 className="text-3xl font-bold text-red-600 flex items-center gap-3">
                                    <Plane className="w-10 h-10" />
                                    Voyages linguistiques à Londres
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Découvrez Londres tout en apprenant ! Nos voyages linguistiques offrent une immersion totale au cœur de la capitale britannique. Alliez cours intensifs et découvertes culturelles pour une progression fulgurante dans un environnement authentique et stimulant.
                                </p>
                                <div className="relative h-[300px] w-full rounded-3xl overflow-hidden shadow-2xl group">
                                    <Image
                                        src="/images/london_trip.png"
                                        alt="Voyage à Londres"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                        <span className="text-white font-bold text-2xl uppercase tracking-widest mb-2">Expérience Londres</span>
                                        <div className="h-1 w-20 bg-red-600 group-hover:w-32 transition-all duration-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Complementary Activities Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-600/5 -skew-y-3 origin-right transform translate-y-12"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Activités Complémentaires</h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    En plus de vos cours, profitez de moments d'échange et d'ateliers pratiques pour perfectionner votre pratique en situation réelle.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: <Sparkles className="w-6 h-6 text-red-600" />,
                                            title: "Workshops Thématiques",
                                            desc: "Ateliers ciblés sur des compétences spécifiques (e-mails, réunions, présentations)."
                                        },
                                        {
                                            icon: <Presentation className="w-6 h-6 text-red-600" />,
                                            title: "Séminaires",
                                            desc: "Conférences et discussions sur des sujets d'actualité et de culture."
                                        },
                                        {
                                            icon: <Coffee className="w-6 h-6 text-red-600" />,
                                            title: "Sessions One-to-One",
                                            desc: "Moments d'échange privilégiés pour lever vos blocages linguistiques."
                                        }
                                    ].map((activity, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                                            <div>
                                                <h5 className="font-bold text-lg">{activity.title}</h5>
                                                <p className="text-muted-foreground">{activity.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                                <div className="space-y-4 pt-8">
                                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                                        <Image src="/professional-development.jpg" alt="Workshop" fill className="object-cover" />
                                    </div>
                                    <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                                        <Image src="/organizational-coaching.jpg" alt="Seminar" fill className="object-cover" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                                        <Image src="/master-coach.jpg" alt="One to One" fill className="object-cover" />
                                    </div>
                                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                                        <Image src="/master-training.jpg" alt="Conversation" fill className="object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="py-12 bg-background border-t border-border">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <Link
                            href="/contact/inscriptions-en-ligne"
                            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-5 px-10 rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-red-600/20"
                        >
                            S'inscrire à une session
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
