'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, BookOpen, MessageCircle, Award, Users, User, Users2, Target, Sparkles, Coffee, Presentation } from 'lucide-react'

export default function FrancaisPage() {
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
                            <Image src="/images/french.png" alt="France" fill className="object-cover" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Cours de Français
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Maîtrisez le français pour vos projets professionnels et personnels.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <BookOpen className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold text-primary">
                                    Apprendre le Français à Talents Consulting
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    Le français est une langue de culture, de diplomatie et une langue économique majeure.
                                    Nos cours sont conçus pour vous donner les outils nécessaires pour communiquer avec aisance.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="text-primary" />
                                        <span>Communication Orale</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award className="text-primary" />
                                        <span>Préparation DELF/DALF</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="text-primary" />
                                        <span>Français des Affaires</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="text-primary" />
                                        <span>Grammaire & Syntaxe</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/training-course.png"
                                alt="Formation Français"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white text-xl font-semibold italic">
                                    "Une méthode immersive pour des progrès rapides et durables."
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
                                    icon: <Users className="w-8 h-8 text-primary" />,
                                    title: "Cours en Groupe",
                                    desc: "Favorise l'interaction et l'apprentissage collaboratif dans une ambiance dynamique."
                                },
                                {
                                    icon: <User className="w-8 h-8 text-primary" />,
                                    title: "Cours Individuels",
                                    desc: "Un accompagnement sur-mesure pour une progression rapide et ciblée."
                                },
                                {
                                    icon: <Users2 className="w-8 h-8 text-primary" />,
                                    title: "Cours en Binôme",
                                    desc: "Apprenez avec un collègue ou un ami pour une motivation partagée."
                                },
                                {
                                    icon: <Target className="w-8 h-8 text-primary" />,
                                    title: "Préparation TCF/DELF",
                                    desc: "Entraînement intensif pour réussir vos certifications de langue française."
                                }
                            ].map((type, index) => (
                                <div key={index} className="p-8 rounded-2xl bg-muted/50 border border-border hover:border-primary/50 transition-all hover:shadow-xl group">
                                    <div className="mb-6 group-hover:scale-110 transition-transform">{type.icon}</div>
                                    <h4 className="text-xl font-bold mb-3">{type.title}</h4>
                                    <p className="text-muted-foreground">{type.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Levels Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-primary">
                            Nos Niveaux de Formation
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Niveau Débutant (A1-A2)", desc: "Acquérir les bases de la communication quotidienne." },
                                { title: "Niveau Intermédiaire (B1-B2)", desc: "Devenir autonome dans la plupart des situations professionnelles." },
                                { title: "Niveau Avancé (C1-C2)", desc: "Maîtriser les nuances et argumenter avec précision." },
                                { title: "Français Médical / Juridique", desc: "Vocabulaire spécifique adapté à votre secteur d'activité." },
                                { title: "Ateliers de Conversation", desc: "Pratique intensive pour gagner en fluidité." },
                                { title: "Coaching Individuel", desc: "Un programme sur-mesure selon vos objectifs spécifiques." }
                            ].map((level, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-primary">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{level.title}</h4>
                                            <p className="text-muted-foreground">{level.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold py-4 px-8 rounded-full transition-all shadow-lg"
                            >
                                S'inscrire à une session
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Complementary Activities Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-right transform translate-y-12"></div>
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
                                            icon: <Sparkles className="w-6 h-6 text-primary" />,
                                            title: "Workshops Thématiques",
                                            desc: "Ateliers ciblés sur des compétences spécifiques (écriture, prise de parole, débats)."
                                        },
                                        {
                                            icon: <Presentation className="w-6 h-6 text-primary" />,
                                            title: "Séminaires Culturels",
                                            desc: "Découvrez la culture française et francophone à travers des sessions thématiques."
                                        },
                                        {
                                            icon: <Coffee className="w-6 h-6 text-primary" />,
                                            title: "Sessions One-to-One",
                                            desc: "Échanges personnalisés pour renforcer votre aisance à l'oral."
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
            </main>

            <Footer />
        </div>
    )
}
