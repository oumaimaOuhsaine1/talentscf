'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, ArrowRight, BookOpen, MessageCircle, TrendingUp, Globe, Users, User, Users2, Target, Sparkles, Coffee, Presentation, Award } from 'lucide-react'
import LanguageInscriptionModal from '@/components/language-inscription-modal'

export default function AllemandPage() {
    const [isDark, setIsDark] = useState(false)
    const [showModal, setShowModal] = useState(false)

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
                        <div className="relative w-20 h-13 mb-4 shadow-lg rounded overflow-hidden border border-white/20">
                            <Image src="/images/allemand.avif" alt="German" fill className="object-cover" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in-up mb-4">
                            Cours d'Allemand
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl animate-fade-in-up delay-100">
                            Maîtrisez la langue de la première économie d'Europe.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-yellow-500/10 rounded-full">
                                    <TrendingUp className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-yellow-700 dark:text-yellow-500">
                                    Wirtschaftsdeutsch & Opportunités
                                </h2>
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground space-y-6">
                                <p>
                                    L'allemand est une langue clé pour l'industrie, les sciences et l'innovation.
                                    Apprendre l'allemand avec Talents Consulting vous ouvre des portes vers de nouveaux marchés.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-foreground font-medium">
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-yellow-600" />
                                        <span>Culture Germanique</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="text-yellow-600" />
                                        <span>Allemand des Affaires</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-yellow-600" />
                                        <span>Formation en langues étrangères</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award className="text-yellow-600" />
                                        <span>Préparation aux attestations internationales</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="text-yellow-600" />
                                        <span>Prononciation & Phonétique</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen className="text-yellow-600" />
                                        <span>Grammaire structurée</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/master-training.jpg"
                                alt="Formation Allemand"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white text-xl font-semibold italic">
                                    "Deutsch lernen für eine erfolgreiche Zukunft."
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
                                    icon: <Users className="w-8 h-8 text-yellow-600" />,
                                    title: "Cours en Groupe",
                                    desc: "Favorise l'interaction et l'apprentissage collaboratif dans une ambiance dynamique."
                                },
                                {
                                    icon: <User className="w-8 h-8 text-yellow-600" />,
                                    title: "Cours Individuels",
                                    desc: "Un accompagnement sur-mesure pour une progression rapide et ciblée."
                                },
                                {
                                    icon: <Users2 className="w-8 h-8 text-yellow-600" />,
                                    title: "Cours en Binôme",
                                    desc: "Apprenez avec un collègue ou un ami pour une motivation partagée."
                                },
                                {
                                    icon: <Target className="w-8 h-8 text-yellow-600" />,
                                    title: "Préparation Certifications",
                                    desc: "Entraînement intensif pour réussir les examens du Goethe-Institut et TestDaF."
                                }
                            ].map((type, index) => (
                                <div key={index} className="p-8 rounded-2xl bg-muted/50 border border-border hover:border-yellow-600/50 transition-all hover:shadow-xl group">
                                    <div className="mb-6 group-hover:scale-110 transition-transform">{type.icon}</div>
                                    <h4 className="text-xl font-bold mb-3">{type.title}</h4>
                                    <p className="text-muted-foreground">{type.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Advantages Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-16 text-yellow-700 dark:text-yellow-500">
                            Pourquoi choisir notre formation d'Allemand?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "Niveaux A1 à C1", desc: "De la découverte à la maîtrise experte." },
                                { title: "Préparation Goethe-Institut", desc: "Examens certifiés officiels (Start Deutsch, TestDaF)." },
                                { title: "Vocabulaire Technique", desc: "Adapté pour les ingénieurs et techniciens." },
                                { title: "Échanges Interculturels", desc: "Comprendre les codes du travail en Allemagne." },
                                { title: "Petits Groupes", desc: "Pour maximiser le temps de parole individuel." },
                                { title: "Supports Multimédia", desc: "Apprentissage moderne et dynamique." }
                            ].map((adv, index) => (
                                <div key={index} className="bg-card p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{adv.title}</h4>
                                            <p className="text-muted-foreground">{adv.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Complementary Activities Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-500/5 -skew-y-3 origin-right transform translate-y-12"></div>
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
                                            icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
                                            title: "Workshops Thématiques",
                                            desc: "Ateliers ciblés sur l'allemand professionnel et technique."
                                        },
                                        {
                                            icon: <Presentation className="w-6 h-6 text-yellow-600" />,
                                            title: "Séminaires Culturels",
                                            desc: "Conférences sur l'économie et la culture des pays germanophones."
                                        },
                                        {
                                            icon: <Coffee className="w-6 h-6 text-yellow-600" />,
                                            title: "Sessions One-to-One",
                                            desc: "Échanges personnalisés pour lever vos blocages et améliorer votre fluidité."
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

                <section className="py-12 bg-background border-t border-border">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-3 bg-yellow-600 hover:bg-yellow-700 text-white text-xl font-bold py-5 px-10 rounded-full transition-all hover:scale-105 shadow-xl hover:shadow-yellow-600/20"
                        >
                            S'inscrire à une session
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>
                </section>

                <LanguageInscriptionModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    language="Allemand"
                />
            </main>

            <Footer />
        </div>
    )
}
