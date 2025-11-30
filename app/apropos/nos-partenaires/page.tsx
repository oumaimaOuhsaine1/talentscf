'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect, useRef } from 'react'

export default function NosPartenairesPage() {
    const [isDark, setIsDark] = useState(false)
    const partnersContainerRef = useRef<HTMLDivElement>(null)
    const trainersContainerRef = useRef<HTMLDivElement>(null)

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

    // Custom hook for auto-sliding carousel (item by item)
    const useAutoSlide = (ref: React.RefObject<HTMLDivElement>, interval: number = 3000, itemWidth: number = 300) => {
        useEffect(() => {
            const container = ref.current
            if (!container) return

            const slideTimer = setInterval(() => {
                if (container) {
                    const maxScroll = container.scrollWidth - container.clientWidth
                    const nextScroll = container.scrollLeft + itemWidth

                    if (container.scrollLeft >= maxScroll - 10) { // Tolerance
                        container.scrollTo({ left: 0, behavior: 'smooth' })
                    } else {
                        container.scrollTo({ left: nextScroll, behavior: 'smooth' })
                    }
                }
            }, interval)

            return () => clearInterval(slideTimer)
        }, [ref, interval, itemWidth])
    }

    // Apply auto-slide to both containers
    useAutoSlide(partnersContainerRef, 3000, 300)
    useAutoSlide(trainersContainerRef, 5000, 400) // Slower for trainers to allow reading

    const trainers = [
        {
            name: "Colette Normandeau",
            description: "Enseignante et coach professionnelle certifiée en PNL, Colette est formée en synergologie, hypnose thérapeutique, communication non violente et en créativité. Depuis une dizaine d'années, elle intervient en formation et en coaching auprès d'entrepreneurs et de gestionnaires. Femme passionnée et authentique, Colette a pour mission de participer au développement de l'être et de l'agir par l'intelligence du cœur et de la créativité. Elle vous guidera avec cœur à la rencontre de votre potentiel.",
            image: "/images/centre.png" // Placeholder
        },
        {
            name: "Catherine Pruvost",
            description: "Enseignante et coach certifiée en PNL, Catherine est issue du monde de la vente et des métiers de service. Ses années d'expérience comme propriétaire d'entreprise alliées à cinq années de formation soutenues en PNL et autres approches stratégiques font d'elle une coach intuitive et déterminée qui sait créer un climat favorable à un processus de transformation. Formatrice dynamique et enthousiaste, elle a à cœur de partager sa passion de la PNL avec clarté, rigueur et générosité, facilitant ainsi l'intégration et l'application des outils de cette discipline pour les participants.",
            image: "/images/centre.png" // Placeholder
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
                            src="/images/equipe.jfif"
                            alt="Nos partenaires"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up">
                            Nos partenaires
                        </h1>
                    </div>
                </section>

                {/* Partners Section */}
                <section className="py-20 bg-background animate-fade-in-up">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">
                                NOS <span style={{ color: '#BC0C1B' }}>PARTENAIRES</span> INTERNATIONAUX
                            </h2>
                            <p className="text-xl text-[#005b96] font-medium">
                                Une renommée et expertise internationale
                            </p>
                        </div>

                        {/* Carousel Container */}
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
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div
                                        key={item}
                                        className="flex-shrink-0 w-64 h-40 flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                                    >
                                        {/* Placeholder for Partner Logos */}
                                        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                                            <span className="text-gray-400 font-semibold">Partner {item}</span>
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
                    </div>
                </section>

                {/* Trainers Section */}
                <section className="py-20 bg-muted/30 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">
                                NOS <span style={{ color: '#BC0C1B' }}>FORMATEURS</span> INTERNATIONAUX
                            </h2>
                            <p className="text-xl text-[#005b96] font-medium">
                                Qualité-Ouverture-Echange
                            </p>
                        </div>

                        {/* Trainers Carousel */}
                        <div className="relative px-12">
                            <button
                                onClick={() => {
                                    if (trainersContainerRef.current) trainersContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                                }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#005b96] hover:bg-[#004a7a] text-white p-3 rounded-full shadow-lg transition-all duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div
                                ref={trainersContainerRef}
                                className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide py-8"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {trainers.map((trainer, index) => (
                                    <div key={index} className="flex-shrink-0 w-full md:w-[600px] flex flex-col md:flex-row gap-8 items-start bg-transparent p-4">
                                        {/* Image */}
                                        <div className="w-full md:w-1/3 flex justify-center">
                                            <div className="relative w-48 h-56 bg-white p-2 shadow-lg rotate-2 hover:rotate-0 transition-transform duration-300">
                                                <div className="relative w-full h-full bg-gray-200 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                                    <Image
                                                        src={trainer.image}
                                                        alt={trainer.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="w-full md:w-2/3 space-y-3">
                                            <h3 className="text-2xl font-bold text-[#BC0C1B]">
                                                {trainer.name}
                                            </h3>
                                            <p className="text-sm text-foreground/70 leading-relaxed text-justify">
                                                {trainer.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    if (trainersContainerRef.current) trainersContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                                }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#005b96] hover:bg-[#004a7a] text-white p-3 rounded-full shadow-lg transition-all duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Pagination Dots */}
                            <div className="flex justify-center gap-2 mt-8">
                                <div className="w-2 h-2 rounded-full bg-[#005b96]"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
