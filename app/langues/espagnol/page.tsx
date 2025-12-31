'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, BookOpen, MessageCircle, Sun, Music, Users, User, Users2, Target, Sparkles, Coffee, Presentation, Globe, Award } from 'lucide-react'

export default function EspagnolPage() {
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
                            <Image src="/images/espagnol.avif" alt="Spanish" fill className="object-cover" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Cours d'Espagnol
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Apprenez une langue vibrante et élargissez vos horizons culturels.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-orange-500/10 rounded-full">
                                    <Sun className="w-8 h-8 text-orange-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-orange-600">
                                    Habla Español con confianza
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    Parlé sur plusieurs continents, l'espagnol est indispensable pour les échanges avec l'Amérique Latine et l'Espagne.
                                    Notre programme allie rigueur académique et plaisir d'apprendre.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <Music className="text-orange-600" />
                                        <span>Culture & Civilisation</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Sun className="text-orange-600" />
                                        <span>Espagnol de Voyage</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-orange-600" />
                                        <span>Formation en langues étrangères</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award className="text-orange-600" />
                                        <span>Préparation aux attestations internationales</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="text-orange-600" />
                                        <span>Conversation Thématique</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="text-orange-600" />
                                        <span>Expression Écrite</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/image.png"
                                alt="Formation Espagnol"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white text-xl font-semibold italic">
                                    "Aprender español es descubrir un mundo de possibilities."
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
                                    icon: <Users className="w-8 h-8 text-orange-600" />,
                                    title: "Cours en Groupe",
                                    desc: "Favorise l'interaction et l'apprentissage collaboratif dans une ambiance dynamique."
                                },
                                {
                                    icon: <User className="w-8 h-8 text-orange-600" />,
                                    title: "Cours Individuels",
                                    desc: "Un accompagnement sur-mesure pour une progression rapide et ciblée."
                                },
                                {
                                    icon: <Users2 className="w-8 h-8 text-orange-600" />,
                                    title: "Cours en Binôme",
                                    desc: "Apprenez avec un collègue ou un ami pour une motivation partagée."
                                },
                                {
                                    icon: <Target className="w-8 h-8 text-orange-600" />,
                                    title: "Préparation DELE",
                                    desc: "Entraînement intensif pour réussir vos diplômes d'espagnol comme langue étrangère."
                                }
                            ].map((type, index) => (
                                <div key={index} className="p-8 rounded-2xl bg-muted/50 border border-border hover:border-orange-600/50 transition-all hover:shadow-xl group">
                                    <div className="mb-6 group-hover:scale-110 transition-transform">{type.icon}</div>
                                    <h4 className="text-xl font-bold mb-3">{type.title}</h4>
                                    <p className="text-muted-foreground">{type.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-orange-600">
                            Ce que vous allez acquérir
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Bases Solides", desc: "Maîtriser la conjugaison et les structures clés." },
                                { title: "Préparation DELE", desc: "Diplôme d'Espagnol comme Langue Étrangère." },
                                { title: "Aisance Orale", desc: "Ne plus avoir peur de s'exprimer spontanément." },
                                { title: "Espagnol du Tourisme", desc: "Pour les professionnels de l'hôtellerie et du voyage." },
                                { title: "Compréhension Auditive", desc: "Comprendre différents accents hispaniques." },
                                { title: "Mises en Situation", desc: "Jeux de rôle pour une application réelle." }
                            ].map((benefit, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                                            <p className="text-muted-foreground">{benefit.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Complementary Activities Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-orange-500/5 -skew-y-3 origin-right transform translate-y-12"></div>
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
                                            icon: <Sparkles className="w-6 h-6 text-orange-600" />,
                                            title: "Workshops Thématiques",
                                            desc: "Ateliers ciblés sur la culture, la gastronomie et les affaires dans le monde hispanique."
                                        },
                                        {
                                            icon: <Presentation className="w-6 h-6 text-orange-600" />,
                                            title: "Séminaires Culturels",
                                            desc: "Découvrez l'histoire et les traditions espagnoles et latino-américaines."
                                        },
                                        {
                                            icon: <Coffee className="w-6 h-6 text-orange-600" />,
                                            title: "Sessions One-to-One",
                                            desc: "Pratiquez la conversation avec un coach pour gagner en aisance naturelle."
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
                                        <Image src="/professional-development.jpg" alt="Atelier" fill className="object-cover" />
                                    </div>
                                    <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                                        <Image src="/organizational-coaching.jpg" alt="Séminaire" fill className="object-cover" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                                        <Image src="/master-coach.jpg" alt="Coaching" fill className="object-cover" />
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
                            className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold py-5 px-10 rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-orange-600/20"
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
