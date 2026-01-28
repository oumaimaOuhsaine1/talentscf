'use client'
import { API_BASE_URL } from '@/lib/api-config';


import React, { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, Send, Clock, MapPin, Briefcase } from 'lucide-react'

export default function OpportunityDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const { id } = params

    // Parse ID
    const stringId = Array.isArray(id) ? id[0] : id;

    const [isDark, setIsDark] = useState(false)
    const [opportunity, setOpportunity] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)

        if (stringId) {
            fetch(`${API_BASE_URL}/api/news/opportunities/${stringId}`)
                .then(res => {
                    if (!res.ok) throw new Error('Not found')
                    return res.json()
                })
                .then(data => {
                    setOpportunity(data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err)
                    setLoading(false)
                })
        }
    }, [stringId])

    const toggleTheme = () => {
        const html = document.documentElement
        html.classList.toggle('dark')
        setIsDark(!isDark)
        localStorage.setItem('theme', isDark ? 'light' : 'dark')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-background text-foreground">
                <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <Footer />
            </div>
        )
    }

    if (!opportunity) {
        return (
            <div className="min-h-screen flex flex-col bg-background text-foreground">
                <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">Opportunité introuvable</h2>
                    <Link href="/actualites/opportunites-beneficiaires" className="text-primary hover:underline font-bold">
                        Retourner à la liste
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Hero / Header */}
                <section className="relative h-[300px] w-full bg-[#003E6B] flex flex-col items-center justify-center px-4">
                    <div className="absolute top-6 left-6 z-10">
                        <Link href="/actualites/opportunites-beneficiaires" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-semibold bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <ArrowLeft size={18} />
                            Retour
                        </Link>
                    </div>
                    <div className="text-center max-w-4xl mx-auto z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider mb-4 border border-amber-500/30">
                            <Briefcase size={14} />
                            Opportunité
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                            {opportunity.title}
                        </h1>
                        {opportunity.deadline && (
                            <div className="flex items-center justify-center gap-2 text-white/80 font-medium">
                                <Clock size={14} />
                                Deadline : {new Date(opportunity.deadline).toLocaleDateString('fr-FR')}
                            </div>
                        )}
                    </div>
                </section>

                <section className="py-12 md:py-20 px-4 max-w-5xl mx-auto -mt-16 relative z-20">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-border">
                        {opportunity.image_url && (
                            <div className="w-full h-64 md:h-96 relative">
                                <img src={opportunity.image_url} className="w-full h-full object-cover" alt={opportunity.title} />
                            </div>
                        )}

                        <div className="p-8 md:p-12">
                            <div className="prose dark:prose-invert max-w-none mb-10 text-lg leading-relaxed text-foreground/80">
                                {opportunity.description?.split('\n').map((line: string, i: number) => (
                                    <p key={i} className="mb-4">{line}</p>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
                                <div className="text-sm text-muted-foreground">
                                    Publié le {new Date(opportunity.created_at).toLocaleDateString('fr-FR')}
                                </div>

                                <Link
                                    href={`/contact/inscriptions-en-ligne?type=opportunity&id=${opportunity.id}&title=${encodeURIComponent(opportunity.title)}`}
                                    className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-lg shadow-primary/25"
                                >
                                    <Send size={20} />
                                    Postuler pour cette opportunité
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
