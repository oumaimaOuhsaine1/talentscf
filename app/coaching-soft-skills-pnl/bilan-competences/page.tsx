'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import { Sparkles, Target } from 'lucide-react'

export default function BilanCompetencesPage() {
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
                <section className="relative h-[400px] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/skills-assessment.jpg"
                            alt="Bilan de compétences"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4 animate-fade-in-up">
                                Bilan de compétences
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                        {/* First Block - Engaging Introduction */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 md:p-12 shadow-sm transform hover:scale-[1.01] transition-transform duration-300">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
                                <Sparkles size={120} />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
                                <div className="flex-shrink-0 p-4 bg-white dark:bg-gray-800 rounded-full shadow-md text-[#BC0C1B]">
                                    <Sparkles size={32} />
                                </div>
                                <p className="text-xl md:text-2xl font-light text-foreground/90 leading-relaxed text-center md:text-left">
                                    Chacun de ces parcours est conçu <span className="font-bold text-[#BC0C1B] relative inline-block">
                                        spécialement pour vous
                                        <span className="absolute bottom-1 left-0 w-full h-1 bg-[#BC0C1B]/20 rounded-full"></span>
                                    </span>, avec une approche personnalisée.
                                </p>
                            </div>
                        </div>

                        {/* Second Block - Mission Statement (Fun Style) */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF8A00] to-[#BC0C1B] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative rounded-2xl bg-white dark:bg-gray-900 p-8 md:p-12 border border-gray-100 dark:border-gray-800">
                                <div className="flex flex-col items-center justify-center text-center gap-6">
                                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#BC0C1B] flex items-center gap-3">
                                        <Target size={32} className="text-[#FF8A00]" />
                                        Notre but ?
                                    </h2>
                                    <p className="text-xl md:text-2xl text-foreground/80 font-medium leading-relaxed max-w-3xl">
                                        "Vous aider à <span className="text-[#005b96] font-bold">exceller</span>, à gagner en <span className="text-[#005b96] font-bold">autonomie</span> et à obtenir des résultats <span className="underline decoration-[#FF8A00] decoration-4 underline-offset-4">concrets et durables</span> dans votre parcours."
                                    </p>
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
