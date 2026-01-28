import { API_BASE_URL } from '@/lib/api-config';
"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'

import { Calendar, ExternalLink, ArrowRight } from 'lucide-react'

export default function OpportunitesBeneficiairesPage() {
    const [isDark, setIsDark] = useState(false)
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)

        fetch(`${API_BASE_URL}/api/news/opportunities`)
            .then(res => res.json())
            .then(data => {
                setItems(Array.isArray(data) ? data : [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
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
                <section className="relative h-[220px] w-full bg-[#003E6B] flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        Opportunités pour les bénéficiaires
                    </h1>
                </section>

                <section className="py-16 px-4 max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground font-medium">Aucune opportunité disponible actuellement.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {items.map((it) => (
                                <div key={it.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="flex flex-col md:flex-row h-full">
                                        {it.image_url && (
                                            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                                                <img src={it.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div className="space-y-3">
                                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{it.title}</h3>
                                                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{it.description}</p>
                                            </div>
                                            <div className="mt-6 flex items-center justify-between border-t pt-4 border-border/50">
                                                {it.deadline && (
                                                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                                        <Calendar size={14} />
                                                        Expire le {new Date(it.deadline).toLocaleDateString('fr-FR')}
                                                    </div>
                                                )}
                                                <Link href={`/actualites/opportunites-beneficiaires/${it.id}`} className="flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
                                                    Voir les détails <ArrowRight size={16} />
                                                </Link>
                                            </div>
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
