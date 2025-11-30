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
                                ILS NOUS ONT FAIT{' '}
                                <span className="relative inline-block text-red-600">
                                    CONFIANCE
                                    <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                </span>
                            </h2>
                            <p className="text-xl text-[#005b96] font-medium">
                                Des collaborations réussies avec des entreprises de renom
                            </p>
                        </div>

                        {/* Clients Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                                <div
                                    key={item}
                                    className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-100 group"
                                >
                                    <div className="w-full aspect-video flex items-center justify-center bg-gray-50 rounded group-hover:bg-white transition-colors">
                                        <span className="text-gray-400 font-semibold group-hover:text-[#005b96] transition-colors">Client {item}</span>
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
