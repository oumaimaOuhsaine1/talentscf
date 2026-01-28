import { API_BASE_URL } from '@/lib/api-config';
"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { GraduationCap, Calendar, ChevronRight, Loader2, Image as ImageIcon } from 'lucide-react'

interface Formation {
    id: string;
    title: string;
    description: string;
    category: string;
    trainer: string;
    price: string;
    image_url: string;
    date_formation: string;
    created_at: string;
}

export default function NouveautesFormationsPage() {
    const [isDark, setIsDark] = useState(false)
    const [formations, setFormations] = useState<Formation[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
        fetchFormations()
    }, [])

    const fetchFormations = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/formations`)
            const data = await res.json()
            if (Array.isArray(data)) {
                setFormations(data)
            } else {
                setFormations([])
            }
        } catch (error) {
            console.error('Error fetching formations:', error)
            setFormations([])
        } finally {
            setLoading(false)
        }
    }

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
                {/* Banner Header */}
                <section className="relative py-24 w-full bg-[#003E6B] overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            Nouveautés Formations
                        </h1>
                        <div className="h-1.5 w-32 bg-[#FF8A00] mx-auto rounded-full mb-8"></div>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
                            Découvrez nos nouvelles sessions de formation et restez à la pointe des compétences de demain.
                        </p>
                    </div>
                </section>

                <section className="py-20 px-4 max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-12 h-12 animate-spin text-primary" />
                            <p className="text-muted-foreground text-lg font-medium">Récupération des formations...</p>
                        </div>
                    ) : formations.length === 0 ? (
                        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                            <p className="text-xl text-muted-foreground font-semibold">Aucune nouvelle formation pour le moment.</p>
                            <p className="text-muted-foreground mt-2">Revenez bientôt pour découvrir nos nouveautés !</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {formations.map((f) => (
                                <div key={f.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="relative h-56 bg-gradient-to-br from-[#003E6B] to-[#005A9C] overflow-hidden">
                                        {f.image_url ? (
                                            <img src={f.image_url} alt={f.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <GraduationCap className="w-20 h-20 text-white opacity-20" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs font-bold uppercase">
                                                {f.category}
                                            </span>
                                        </div>
                                        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white leading-tight">
                                            {f.title}
                                        </h3>
                                    </div>
                                    <div className="p-8 space-y-4">
                                        <p className="text-muted-foreground line-clamp-3 text-sm min-h-[60px]">
                                            {f.description || "Détails à venir pour cette formation d'excellence."}
                                        </p>

                                        <div className="pt-4 flex flex-col gap-3">
                                            <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                <span>Session: {f.date_formation ? new Date(f.date_formation).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'À définir'}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                                    TC
                                                </div>
                                                <span>Expert: {f.trainer || 'Expert Talents'}</span>
                                            </div>
                                        </div>

                                        <div className="pt-6 flex items-center justify-between border-t border-border mt-4">
                                            <div className="font-bold text-lg text-primary">
                                                {f.price ? `${f.price} MAD` : 'Sur devis'}
                                            </div>
                                            <button className="flex items-center gap-2 text-sm font-extrabold text-[#FF8A00] hover:text-[#E67C00] transition-colors underline-offset-4 hover:underline">
                                                Détails
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
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
