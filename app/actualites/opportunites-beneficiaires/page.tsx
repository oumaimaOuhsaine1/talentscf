"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function OpportunitesBeneficiairesPage() {
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

    const items = [
        'Offres de stage partenaires - postulez via votre espace',
        'Bourse de formation partielle pour candidatures méritantes',
        'Programme de mentorat pour les anciens participants'
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                <section className="relative h-[220px] w-full bg-[#003E6B] flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        Opportunités pour les bénéficiaires
                    </h1>
                </section>

                <section className="py-12 px-4 max-w-5xl mx-auto">
                    <ul className="space-y-4">
                        {items.map((it, idx) => (
                            <li key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                {it}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    )
}
