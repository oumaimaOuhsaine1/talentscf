'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function NosClientsPage() {
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
                <section className="relative h-[300px] w-full overflow-hidden">
                    <div className="animate-fade-in">
                        <Image
                            src="/images/equipe.jfif"
                            alt="Nos clients"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up">
                            Nos clients
                        </h1>
                    </div>
                </section>

                {/* Clients Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">
                                Nos clients et <span className="text-[#BC0C1B]">bénéficiaires</span>
                            </h2>
                            <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                                Nous sommes fiers d'accompagner une diversité de talents vers l'excellence.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    title: "Étudiants et lauréats",
                                    image: "/personal-development.png", // Using relevant image from public folder
                                    description: "Accompagnement dans la réussite académique et l'insertion professionnelle."
                                },
                                {
                                    title: "Professionnels et cadres",
                                    image: "/professional-development.jpg", // Using relevant image
                                    description: "Développement des compétences et accélération de carrière."
                                },
                                {
                                    title: "Entrepreneurs et porteurs de projets",
                                    image: "/corporate-training-session.png", // Using relevant image
                                    description: "Soutien à la création et au développement d'entreprises innovantes."
                                },
                                {
                                    title: "Chercheurs et doctorants",
                                    image: "/diverse-team-collaboration.png", // Using relevant image
                                    description: "Issus de divers secteurs d’activité, pour une recherche impactante."
                                }
                            ].map((client, index) => (
                                <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-96">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={client.image}
                                            alt={client.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform transition-transform duration-300">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="w-12 h-1 bg-[#FF8A00] mb-4 transition-all duration-300 group-hover:w-20" />
                                            <h3 className="text-xl font-bold mb-2 uppercase leading-snug">
                                                {client.title}
                                            </h3>
                                            <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 leading-relaxed">
                                                {client.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
