"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Calendar, MapPin } from 'lucide-react'

export default function EvenementsAcademiquesPage() {
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

    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/news/events')
            .then(res => res.json())
            .then(data => {
                setEvents(Array.isArray(data) ? data : [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                <section className="relative h-[220px] w-full bg-[#003E6B] flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        Événements académiques
                    </h1>
                </section>

                <section className="py-16 px-4 max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                    ) : events.length === 0 ? (
                        <p className="text-center text-muted-foreground py-20 font-medium">Aucun événement prévu pour le moment.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((ev) => (
                                <div key={ev.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl transition-all hover:-translate-y-2">
                                    {ev.image_url && (
                                        <div className="h-48 overflow-hidden">
                                            <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 w-fit px-3 py-1 rounded-full">
                                            <Calendar size={14} />
                                            {ev.event_date ? new Date(ev.event_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                        </div>
                                        <h3 className="text-xl font-bold line-clamp-2 min-h-[3.5rem] leading-tight group-hover:text-primary transition-colors">{ev.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{ev.description}</p>
                                        {ev.location && (
                                            <div className="flex items-start gap-2 text-xs text-muted-foreground font-medium pt-2 border-t border-border/50">
                                                <MapPin size={14} className="text-primary mt-0.5" />
                                                {ev.location}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    )
}
