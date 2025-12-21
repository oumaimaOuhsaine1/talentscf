'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function NotreEquipePage() {
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
                            alt="Notre Équipe"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up">
                            NOTRE ÉQUIPE
                        </h1>
                    </div>
                </section>

                {/* Team Members Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

                        {/* Member 1: MAHDI MOUATASSIME */}
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            {/* Image Container */}
                            <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                                <div className="relative w-64 h-64 bg-white p-2 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <div className="relative w-full h-full bg-gray-200 overflow-hidden">
                                        <Image
                                            src="/images/mrSamir.jpg"
                                            alt="Samir Zahir"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="inline-block">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#005b96] uppercase mb-2">
                                        ZAHIR SAMIR
                                    </h2>
                                    <div className="h-1 w-24 bg-[#FF8A00]"></div>
                                </div>

                                <div className="space-y-4 text-foreground/80 leading-relaxed text-justify">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                    <p>
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Member 2: RIAHI CHABBA */}
                        <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
                            {/* Image Container */}
                            <div className="w-full md:w-1/3 flex justify-center md:justify-end">
                                <div className="relative w-64 h-64 bg-white p-2 shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <div className="relative w-full h-full bg-gray-200 overflow-hidden">
                                        <Image
                                            src="/images/mrDriss.jpg"
                                            alt="Docteur Arfa Driss"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="inline-block">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#005b96] uppercase mb-2">
                                        DOCTEUR ARFA DRISS
                                    </h2>
                                    <div className="h-1 w-24 bg-[#FF8A00]"></div>
                                </div>

                                <div className="space-y-4 text-foreground/80 leading-relaxed text-justify">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                    <p>
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
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
