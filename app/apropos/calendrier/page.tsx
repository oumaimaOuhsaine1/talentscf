'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function CalendrierPage() {
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

    const events = [
        {
            date: "15 - 17 Octobre 2023",
            title: "Praticien PNL - Module 1",
            duration: "3 Jours",
            status: "Complet",
            type: "PNL"
        },
        {
            date: "22 - 24 Octobre 2023",
            title: "Hypnose Ericksonienne - Bases",
            duration: "3 Jours",
            status: "Disponible",
            type: "Hypnose"
        },
        {
            date: "05 - 06 Novembre 2023",
            title: "Leadership & Management",
            duration: "2 Jours",
            status: "Disponible",
            type: "Management"
        },
        {
            date: "12 - 14 Novembre 2023",
            title: "Praticien PNL - Module 2",
            duration: "3 Jours",
            status: "Disponible",
            type: "PNL"
        },
        {
            date: "26 - 28 Novembre 2023",
            title: "Coaching d'Équipe",
            duration: "3 Jours",
            status: "Bientôt",
            type: "Coaching"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[300px] w-full overflow-hidden">
                    <div className="animate-fade-in">
                        <Image
                            src="/images/competence.jpg"
                            alt="Calendrier des formations"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Calendrier des Formations
                        </h1>
                    </div>
                </section>

                {/* Calendar Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase animate-fade-in-up">
                                PROCHAINES{' '}
                                <span className="relative inline-block text-red-600">
                                    SESSIONS
                                    <span className="absolute left-0 bottom-0 h-1 bg-red-600 animate-draw-line"></span>
                                </span>
                            </h2>
                            <p className="text-xl text-[#005b96] font-medium">
                                Planifiez votre développement professionnel
                            </p>
                        </div>

                        {/* Events List */}
                        <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-t-4 border-red-600">
                            <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-gray-50 text-primary font-bold uppercase text-sm tracking-wider border-b border-gray-200">
                                <div className="col-span-3">Date</div>
                                <div className="col-span-4">Formation</div>
                                <div className="col-span-2">Durée</div>
                                <div className="col-span-2">Type</div>
                                <div className="col-span-1 text-center">Statut</div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {events.map((event, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center hover:bg-red-50/30 transition-colors duration-300 group"
                                    >
                                        <div className="col-span-3 font-semibold text-[#005b96] flex items-center gap-3">
                                            <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                                                <svg className="w-5 h-5 text-red-600 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            {event.date}
                                        </div>
                                        <div className="col-span-4 font-bold text-gray-800 text-lg md:text-base group-hover:text-red-600 transition-colors">
                                            {event.title}
                                        </div>
                                        <div className="col-span-2 text-gray-600 text-sm md:text-base">
                                            <span className="md:hidden font-semibold mr-2">Durée:</span>
                                            {event.duration}
                                        </div>
                                        <div className="col-span-2">
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#005b96] border border-blue-100">
                                                {event.type}
                                            </span>
                                        </div>
                                        <div className="col-span-1 flex justify-start md:justify-center mt-2 md:mt-0">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${event.status === 'Complet'
                                                ? 'bg-red-100 text-red-600'
                                                : event.status === 'Bientôt'
                                                    ? 'bg-orange-100 text-orange-600'
                                                    : 'bg-green-100 text-green-600'
                                                }`}>
                                                {event.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 uppercase tracking-wider text-sm">
                                Télécharger le catalogue complet
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
