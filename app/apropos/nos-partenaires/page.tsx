'use client'
import { API_BASE_URL } from '@/lib/api-config';


import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect, useRef } from 'react'

export default function NosPartenairesPage() {
    const partnersContainerRef = useRef<HTMLDivElement>(null)

    const [isDark, setIsDark] = useState(false)
    const [partners, setPartners] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)

        fetch(`${API_BASE_URL}/api/news/partnerships`)
            .then(res => res.json())
            .then(data => {
                const fetchedPartners = Array.isArray(data) ? data : []
                const staticPartner = {
                    id: 'static-arfa',
                    name: 'ARFA',
                    logo_url: '/arfa.png',
                    website_url: '#'
                }
                setPartners([...fetchedPartners, staticPartner])
                setLoading(false)
            })
            .catch(() => {
                setPartners([{
                    id: 'static-arfa',
                    name: 'ARFA',
                    logo_url: '/arfa.png',
                    website_url: '#'
                }])
                setLoading(false)
            })
    }, [])

    const toggleTheme = () => {
        const html = document.documentElement
        html.classList.toggle('dark')
        setIsDark(!isDark)
        localStorage.setItem('theme', isDark ? 'light' : 'dark')
    }

    // Auto-slide functionality for partners carousel
    useEffect(() => {
        if (partners.length === 0) return
        const container = partnersContainerRef.current
        if (!container) return

        const slideTimer = setInterval(() => {
            const maxScroll = container.scrollWidth - container.clientWidth
            const nextScroll = container.scrollLeft + 300

            if (container.scrollLeft >= maxScroll - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' })
            } else {
                container.scrollTo({ left: nextScroll, behavior: 'smooth' })
            }
        }, 3000)

        return () => clearInterval(slideTimer)
    }, [partners])

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[300px] w-full overflow-hidden">
                    <div className="animate-fade-in">
                        <Image
                            src="/images/equipe.jfif"
                            alt="Nos partenaires"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center">
                            Nos partenaires
                        </h1>
                    </div>
                </section>

                {/* Partners Section */}
                <section className="py-20 bg-background animate-fade-in-up">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-primary uppercase">
                                NOS <span style={{ color: '#BC0C1B' }}>PARTENAIRES</span> INTERNATIONAUX
                            </h3>
                            <h6 className="text-xl text-[#005b96] font-medium">
                                Une renommée et expertise internationale
                            </h6>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                        ) : partners.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-3xl">
                                <p className="font-bold">Nos partenariats seront bientôt affichés ici.</p>
                            </div>
                        ) : (
                            <div className="relative px-12">
                                {/* Previous Button */}
                                <button
                                    onClick={() => {
                                        if (partnersContainerRef.current) partnersContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                                    }}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#005b96] hover:bg-[#004a7a] text-white p-3 rounded-full shadow-lg transition-all duration-300"
                                    aria-label="Previous"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Partners Slider */}
                                <div
                                    ref={partnersContainerRef}
                                    id="partners-container"
                                    className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide py-4"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {partners.map((partner, index) => (
                                        <div
                                            key={partner.id || index}
                                            className="flex-shrink-0 w-64 h-40 flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-100 group"
                                        >
                                            <div className="relative w-full h-full">
                                                {partner.website_url ? (
                                                    <a href={partner.website_url} target="_blank" className="block w-full h-full relative">
                                                        <img
                                                            src={partner.logo_url}
                                                            alt={partner.name}
                                                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                                        />
                                                    </a>
                                                ) : (
                                                    <img
                                                        src={partner.logo_url}
                                                        alt={partner.name}
                                                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => {
                                        if (partnersContainerRef.current) partnersContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                                    }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#005b96] hover:bg-[#004a7a] text-white p-3 rounded-full shadow-lg transition-all duration-300"
                                    aria-label="Next"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
