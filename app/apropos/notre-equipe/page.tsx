'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    order_index: number;
}

export default function NotreEquipePage() {
    const [isDark, setIsDark] = useState(false)
    const [members, setMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
        fetchMembers()
    }, [])

    const fetchMembers = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/api/team')
            const data = await res.json()
            if (Array.isArray(data)) {
                setMembers(data)
            }
        } catch (error) {
            console.error('Error fetching team members:', error)
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

    const expertiseList = [
        "Des spécialistes titulaires de doctorats et engagés dans la recherche et l'enseignement ;",
        "Des professionnels certifiés en ingénierie pédagogique ;",
        "Des praticiens spécialisés en accompagnement individualisé du développement personnel et professionnel;",
        "Des spécialistes de l’humain, des consultants experts en psychologie cognitive et en dynamique du développement humain."
    ];

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
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            [...members].sort((a, b) => a.order_index - b.order_index).map((member, idx) => (
                                <div
                                    key={member.id}
                                    className={`flex flex-col md:flex-row gap-10 lg:gap-16 items-start ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Image Section */}
                                    <div className="w-full md:w-auto flex justify-center flex-shrink-0 group">
                                        <div className="relative p-2 bg-white shadow-xl shadow-gray-200 border border-gray-100 rounded-sm transform transition-transform duration-300 hover:scale-105 rotate-0">
                                            <div className="w-64 h-64 md:w-56 md:h-56 overflow-hidden">
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h2 className="text-3xl font-black text-[#00609C] uppercase tracking-wide">
                                                {member.name}
                                            </h2>
                                            <div className="h-1 w-20 bg-[#F97316] mt-2 mb-4"></div>
                                            {member.role && (
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                    {member.role}
                                                </p>
                                            )}
                                        </div>

                                        <div className="text-gray-600 dark:text-gray-300 text-justify leading-relaxed whitespace-pre-wrap">
                                            {member.bio}
                                        </div>

                                        {/* Keep specific content for the first member if strictly needed, or move it. 
                                            The user wants the DESIGN. The content 'expertiseList' was hardcoded to idx===0. 
                                            I will append it after the bio if it's the first member to preserve content but fix layout.
                                        */}
                                        {idx === 0 && (
                                            <div className="mt-8 pt-6 border-t border-gray-100">
                                                <p className="text-lg text-foreground/80 leading-relaxed mb-4 font-medium">
                                                    Pour vous accompagner au mieux, notre équipe rassemble des talents variés notamment :
                                                </p>
                                                <ul className="space-y-2 pl-4 mb-6">
                                                    {expertiseList.map((item, index) => (
                                                        <li key={index} className="flex items-start gap-3 text-sm text-foreground/70">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0" />
                                                            <span className="leading-relaxed">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="pl-4 border-l-4 border-[#00609C] py-1 bg-blue-50/50 rounded-r-lg">
                                                    <p className="text-sm text-[#00609C] italic font-medium leading-relaxed">
                                                        "Cette synergie de compétences assure une approche intégrée..."
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}

                        {!loading && members.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-xl text-muted-foreground">Aucun membre d'équipe à afficher.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

