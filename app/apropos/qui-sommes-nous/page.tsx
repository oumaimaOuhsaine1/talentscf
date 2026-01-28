'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function QuiSommesNousPage() {
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

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[300px] w-full overflow-hidden">
                    <div className="animate-fade-in">
                        <Image
                            src="/images/qui.jpg"
                            alt="Qui sommes-nous"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h1 className="text-2xl md:text-4xl font-bold text-white uppercase animate-fade-in-up">
                            QUI SOMMES-NOUS?
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            {/* Image */}
                            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src="/images/logo-talents.png"
                                    alt="Logo Talents Consulting & Formation"
                                    fill
                                    className="object-contain p-4"
                                    quality={100}
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                    Le Centre Talents Consulting & Formation
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-base text-foreground/80 leading-relaxed">
                                        TALENTS Consulting & Formation est un centre de formation et de consulting spécialisé dans le développement des compétences humaines, académiques et professionnelles.
                                    </p>
                                    <p className="text-base text-foreground/80 leading-relaxed">
                                        Nous accompagnons les étudiants, les professionnels, les entrepreneurs et les chercheurs à travers des formations certifiantes, diplômantes et personnalisées, conçues selon les standards académiques et les exigences du marché du travail.
                                    </p>
                                    <p className="text-base text-foreground/80 leading-relaxed">
                                        Grâce à une approche fondée sur la rigueur scientifique, expertise terrain et innovation pédagogique, avec pour objectif de renforcer l’employabilité, la performance et l’excellence durable de nos bénéficiaires et une évolution professionnelle réussie, au Maroc et à l’international.
                                    </p>
                                    <p className="text-base text-foreground/80 leading-relaxed">
                                        TALENTS Consulting & Formation accompagne le développement des compétences humaines, académiques et professionnelles à travers des formations et des dispositifs d’accompagnement innovants, personnalisés et orientés performance.
                                    </p>
                                    <p className="text-base text-foreground/80 leading-relaxed">
                                        Ce que nous voulons avant tout, c'est proposer à nos bénéficiaires des solutions et services avec une approche vraiment nouvelle, créative et inspirante, pour qu'on se démarque nettement des autres.
                                    </p>
                                    <p className="text-xl font-bold font-serif italic text-center leading-relaxed text-[#800020] mt-6">
                                        Notre but principal est d'apporter à ceux qui nous font confiance des choses et des services qui sortent de l'ordinaire
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Domaines de compétences Section */}
                <section className="relative py-20 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/competence.jpg"
                            alt="Domaines de compétences"
                            fill
                            className="object-cover"
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 uppercase">
                            Domaines de <span className="relative inline-block" style={{ color: '#FF8A00' }}>
                                compétences
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF8A00] animate-draw-line"></span>
                            </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Formations Certifiantes */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Formations Certifiantes</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Formations certifiantes en PNL, Hypnose, Manager-Coach, Leader-Coach, Coach Commercial, Expertise RH et Coaching sportif.
                                </p>
                            </div>

                            {/* Coaching */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Coaching</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Individuel, des équipes, opérationnel et organisationnel
                                </p>
                            </div>

                            {/* Accompagnement */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Accompagnement</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Accompagnement des entreprises dans des missions d'organisation, de conduite de changement, de mise en place de la vision, définition de la mission et de transformation de la culture d'entreprise.
                                </p>
                            </div>

                            {/* Formations Pour Entreprises */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Formations Pour Entreprises</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Formation aux métiers de l'entreprise, du management et du Leadership pour développer les performances individuelles et collectives des collaborateurs.
                                </p>
                            </div>

                            {/* Parcours Professionnel */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Parcours Professionnel</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    Nous offrons à nos clients plusieurs parcours professionnels dans des domaines divers et variés.
                                </p>
                            </div>

                            {/* Location des Salles */}
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                <h3 className="text-xl font-bold text-primary mb-3">Location des Salles</h3>
                                <p className="text-sm text-foreground/70 leading-relaxed">
                                    3 salles de formation agencées et équipées offrent un espace convivial propice à l'apprentissage et à la pratique professionnelle supervisée.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-20 bg-muted/30">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-border">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                                Pourquoi choisir <span className="text-primary">TALENTS Consulting & Formation</span> ?
                            </h2>

                            <div className="flex flex-wrap justify-center gap-6 mb-12">
                                {[
                                    { title: "Expertise en ingénierie de formation", desc: "Une maîtrise complète de la conception pédagogique." },
                                    { title: "Accompagnement administratif et stratégique", desc: "Soutien dans le montage et le suivi de vos projets." },
                                    { title: "Connaissance du cadre institutionnel marocain", desc: "Conformité totale avec les régulations locales." },
                                    { title: "Formations personnalisées et orientées résultats", desc: "Des programmes sur mesure pour vos besoins réels." },
                                    { title: "Optimisation du financement de la formation", desc: "Maximisez vos remboursements et subventions." }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-muted/50 p-8 rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group w-full md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] min-h-[160px] flex flex-col justify-center text-center">
                                        <h3 className="font-bold text-lg mb-3 text-primary group-hover:scale-105 transition-transform">{item.title}</h3>
                                        <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <Link
                                    href="/contact/pre-diagnostics"
                                    className="inline-flex items-center gap-2 bg-[#FF8A00] hover:bg-[#E67C00] text-white px-6 py-2 rounded-lg font-semibold text-base transition-all transform hover:scale-105 shadow-md shadow-orange-500/20"
                                >
                                    Connectez-vous
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    )
}
