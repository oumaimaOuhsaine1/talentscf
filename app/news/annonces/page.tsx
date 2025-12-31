'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Bell, Tag, ArrowRight } from 'lucide-react'

export default function AnnoncesPage() {
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

    const annonces = [
        {
            title: "Nouveau Partenariat avec Wesford Genève",
            content: "Nous sommes fiers d'annoncer une collaboration stratégique pour offrir des diplômes internationaux d'excellence.",
            date: "10 Décembre 2023",
            tag: "Partenariat"
        },
        {
            title: "Ouverture des inscriptions Bachelor 2024",
            content: "Les inscriptions pour notre programme Bachelor Management sont désormais ouvertes. Places limitées.",
            date: "05 Décembre 2023",
            tag: "Formation"
        }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                <section className="relative h-[250px] w-full bg-[#004d7a] flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider text-center px-4">
                        "use client"

                        import { useEffect } from 'react'

                        export default function AnnoncesPage() {
                            useEffect(() => {
                                if (typeof window !== 'undefined') {
                                    window.location.replace('/actualites/annonces-partenariats')
                                }
                            }, [])

                            return null
                        }
                                    <span className="text-muted-foreground text-sm ml-auto">{a.date}</span>
