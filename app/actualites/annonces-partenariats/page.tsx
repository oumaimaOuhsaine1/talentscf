"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

import { Bell, Info, AlertCircle } from 'lucide-react'

export default function AnnoncesPartenariatsPage() {
    const [isDark, setIsDark] = useState(false)
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)

        fetch('http://127.0.0.1:5000/api/news/announcements')
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
                        Annonces et partenariats
                    </h1>
                </section>

                <section className="py-16 px-4 max-w-5xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border/50">
                            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground font-medium">Aucune annonce récente.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((it) => (
                                <div key={it.id} className={`p-6 rounded-2xl border transition-all ${it.importance === 'important' ? 'bg-red-50/50 border-red-200 shadow-sm' : 'bg-white border-border shadow-md'}`}>
                                    <div className="flex gap-4">
                                        <div className={`mt-1 p-2 rounded-xl border flex-shrink-0 ${it.importance === 'important' ? 'bg-red-100 border-red-200 text-red-600' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                                            {it.importance === 'important' ? <AlertCircle size={24} /> : <Info size={24} />}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className={`text-xl font-extrabold ${it.importance === 'important' ? 'text-red-900' : 'text-foreground'}`}>{it.title}</h3>
                                                {it.importance === 'important' && (
                                                    <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded animate-pulse">Important</span>
                                                )}
                                            </div>
                                            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: it.content }}></div>
                                            <div className="text-[10px] text-muted-foreground/60 font-semibold pt-4 uppercase tracking-tighter">
                                                Publié le {new Date(it.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
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
