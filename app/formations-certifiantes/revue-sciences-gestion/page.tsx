'use client'

import React from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function RevueSciencesGestionPage() {
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
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
                {/* Banner */}
                <section className="relative h-[400px] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/revue.jpg"
                            alt="La Revue de Sciences de Gestion"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4 animate-fade-in-up">
                                La Revue de Sciences de Gestion
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20 bg-background">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                        {/* Collaboration block styled before the card: larger logos + red '+' */}
                        <div className="mb-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-center gap-6">
                                <Image
                                    src="/revue.jpg"
                                    alt="Revue logo"
                                    width={260}
                                    height={130}
                                    className="object-contain"
                                />

                                <div className="text-red-600 text-4xl font-extrabold select-none">+</div>

                                <Image
                                    src="/images/logo-talents.png"
                                    alt="Logo du centre"
                                    width={240}
                                    height={120}
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold mb-4 text-[#005b96]">Excellence Académique</h2>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                En partenariat avec <strong>La Revue de Sciences de Gestion</strong>, nous proposons des formations adossées à une recherche académique rigoureuse, permettant aux professionnels d'accéder aux dernières avancées en management et gestion.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
