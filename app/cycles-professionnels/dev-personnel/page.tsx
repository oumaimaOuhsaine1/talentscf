'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function DeveloppementPersonnelPage() {
    const [isDark, setIsDark] = useState(false)
    const [activeTab, setActiveTab] = useState('objectifs')

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
                            src="/images/vision.jpg"
                            alt="Développement Personnel"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Développement Personnel pour Manager
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-[#005b96] text-center mb-8">
                            Présentation du cycle de Développement personnel pour manager
                        </h2>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Left Column - Image */}
                            <div className="flex justify-center items-start">
                                <div className="w-full max-w-sm border-4 border-[#005b96] bg-white p-2">
                                    <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                                        <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Text */}
                            <div className="space-y-4 text-sm text-justify leading-relaxed">
                                <p>
                                    Le paradigme de la formation : <strong>Aller de l'extérieur vers l'intérieur</strong> se basant sur le principe que :
                                </p>
                                <p className="italic text-gray-600">
                                    « Les managers qui ont acquis une case en carrières, en peuvent pas gérer les autres ! »
                                </p>
                                <p>
                                    Face aux changements que vit votre société et notamment vos entreprises, la maîtrise technique et le savoir-faire ne suffisent plus pour réussir et évoluer dans le contexte professionnel. La réussite personnelle et professionnelle passe aujourd'hui par le <span className="text-red-600 font-semibold">développement de son savoir-être et l'actualisation de son potentiel émotionnel</span> et relationnel pour mieux gérer les tensions et s'adapter à un environnement en pleine mutation.
                                </p>
                            </div>
                        </div>

                        {/* Description Paragraph */}
                        <div className="mb-8 text-sm text-justify leading-relaxed space-y-4">
                            <p>
                                Le centre Talents consulting & coaching propose aux personnes soucieuses de leur développement personnel et de leur efficacité professionnelle, un cycle de formation pratique et concret, afin d'acquérir des méthodes et outils essentiels, issus du monde de l'économie, sciences de développement personnel. Ces acquis ont méthode qui participent de développer des habiletés entrepreneuriales et organisationnelles afin d'avoir une posture situationnelle de vue et boucler leur environnement en pleine mutation.
                            </p>
                            <p>
                                À la fin du cycle, un certificat est délivré aux participants attestant la réussite de leur parcours. A cet égard, ils devront faire preuve de rigueur, d'assiduité et d'implication dans les travaux en groupe, et la remise de leur expertise à la fin du cycle.
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="mb-6">
                            <div className="flex flex-wrap border-b-0">
                                <button
                                    onClick={() => setActiveTab('objectifs')}
                                    className={`px-4 py-3 text-xs font-semibold transition-colors border-2 border-[#005b96] ${activeTab === 'objectifs'
                                        ? 'bg-[#005b96] text-white'
                                        : 'bg-white text-[#005b96] hover:bg-gray-100'
                                        }`}
                                >
                                    Objectifs du Cycle
                                </button>
                                <button
                                    onClick={() => setActiveTab('population')}
                                    className={`px-4 py-3 text-xs font-semibold transition-colors border-2 border-[#005b96] border-l-0 ${activeTab === 'population'
                                        ? 'bg-[#005b96] text-white'
                                        : 'bg-white text-[#005b96] hover:bg-gray-100'
                                        }`}
                                >
                                    Population Cible
                                </button>
                                <button
                                    onClick={() => setActiveTab('organisation')}
                                    className={`px-4 py-3 text-xs font-semibold transition-colors border-2 border-[#005b96] border-l-0 ${activeTab === 'organisation'
                                        ? 'bg-[#005b96] text-white'
                                        : 'bg-white text-[#005b96] hover:bg-gray-100'
                                        }`}
                                >
                                    Organisation du Cycle
                                </button>
                                <button
                                    onClick={() => setActiveTab('equipe')}
                                    className={`px-4 py-3 text-xs font-semibold transition-colors border-2 border-[#005b96] border-l-0 ${activeTab === 'equipe'
                                        ? 'bg-[#005b96] text-white'
                                        : 'bg-white text-[#005b96] hover:bg-gray-100'
                                        }`}
                                >
                                    Equipe Pédagogique
                                </button>
                                <button
                                    onClick={() => setActiveTab('programme')}
                                    className={`px-4 py-3 text-xs font-semibold transition-colors border-2 border-[#005b96] border-l-0 ${activeTab === 'programme'
                                        ? 'bg-[#005b96] text-white'
                                        : 'bg-white text-[#005b96] hover:bg-gray-100'
                                        }`}
                                >
                                    Programme
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="bg-[#0088cc] text-white p-6 text-sm border-2 border-[#005b96]">
                                {activeTab === 'objectifs' && (
                                    <div>
                                        <h3 className="font-bold mb-4">Permettre aux participants de développer :</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Les principales compétences et outils essentiels pour le développement personnel</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>La connaissance de Soi pour mieux se connaître et développer ses habiletés personnelles</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>L'intelligence émotionnelle : la conscience, permanence et la compétence sociale</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Le leadership, autonomie et sa flexibilité comportementale</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>La capacité à gérer le stress et les conflits</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Ce cycle sera également un espace d'échange et de partage des bonnes pratiques en développement personnel.</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 'population' && (
                                    <div>
                                        <h3 className="font-bold mb-4">Population Cible :</h3>
                                        <p>Ce cycle s'adresse aux managers, cadres, responsables d'équipe et toute personne souhaitant développer ses compétences en développement personnel et leadership.</p>
                                    </div>
                                )}

                                {activeTab === 'organisation' && (
                                    <div>
                                        <h3 className="font-bold mb-4">Organisation du Cycle :</h3>
                                        <p>Le cycle se déroule sur plusieurs sessions de formation pratique, avec des ateliers interactifs, des études de cas et des exercices de mise en situation.</p>
                                    </div>
                                )}

                                {activeTab === 'equipe' && (
                                    <div>
                                        <h3 className="font-bold mb-4">Equipe Pédagogique :</h3>
                                        <p>Notre équipe pédagogique est composée de formateurs certifiés et expérimentés dans le domaine du développement personnel et du coaching professionnel.</p>
                                        <ul className="space-y-2 mt-4">
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Formateurs certifiés en PNL et coaching</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Experts en développement personnel et leadership</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Consultants en management et ressources humaines</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 'programme' && (
                                    <div className="bg-white text-gray-900 p-0 -m-6">
                                        {/* Programme Header */}
                                        <div className="bg-[#0088cc] text-white p-4 font-bold text-base">
                                            Programme du Cycle de Formation Niveau 1
                                        </div>

                                        {/* Module Tabs */}
                                        <div className="flex border-b border-gray-300">
                                            <div className="flex-1 bg-[#0088cc] text-white text-center py-3 text-sm font-semibold">
                                                📄 Module 1
                                            </div>
                                            <div className="flex-1 bg-gray-300 text-gray-700 text-center py-3 text-sm font-semibold">
                                                📄 Module 2
                                            </div>
                                            <div className="flex-1 bg-gray-300 text-gray-700 text-center py-3 text-sm font-semibold">
                                                📄 Module 3
                                            </div>
                                        </div>

                                        {/* Module Content */}
                                        <div className="p-6">
                                            <h4 className="text-lg font-bold text-[#005b96] mb-4">Le développement de soi</h4>

                                            {/* Table */}
                                            <table className="w-full border-collapse border border-gray-300 text-sm">
                                                <thead>
                                                    <tr className="bg-[#003d5c] text-white">
                                                        <th className="border border-gray-300 px-4 py-2 text-left font-bold">Actions de formation</th>
                                                        <th className="border border-gray-300 px-4 py-2 text-right font-bold">Durée</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-white">
                                                        <td className="border border-gray-300 px-4 py-2">Action 1 : Acceuil + Comprendre son propre fonctionnement</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">6h</td>
                                                    </tr>
                                                    <tr className="bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">Action 2 : Savoir ancrer & Mobiliser ses ressources internes</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">3h</td>
                                                    </tr>
                                                    <tr className="bg-white">
                                                        <td className="border border-gray-300 px-4 py-2">Action 3 : Gérer son temps et ses priorités</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">3h</td>
                                                    </tr>
                                                    <tr className="bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">Action 4 : Créativité & Innovation</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">3h</td>
                                                    </tr>
                                                    <tr className="bg-white">
                                                        <td className="border border-gray-300 px-4 py-2">Action 5 : Gérer ses émotions & son stress</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">6h</td>
                                                    </tr>
                                                    <tr className="bg-gray-100 font-bold">
                                                        <td className="border border-gray-300 px-4 py-2">Total des heures module 1</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">21h</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Module 2 Header */}
                                        <div className="bg-[#0088cc] text-white p-4 font-bold text-base mt-6">
                                            Programme du Cycle de Formation Niveau 2
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <p className="text-sm text-justify leading-relaxed">
                                    Le parcours de formation ce PNL, Talents consulting & coaching = NLPNL a été conçu en collaboration avec les fondateurs de la PNL. C'est une formation de 80 h, dispensée en développeur de la PNL. C'est une formation de 80 h, dispensée en présentiel sur 10 jours.
                                </p>
                                <div className="w-full max-w-xs border-4 border-[#005b96] bg-white p-2 mx-auto">
                                    <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4 text-sm text-justify leading-relaxed">
                                <p>
                                    La particularité du programme de NLPNL c'est qu'il intègre tous les développements et les évolutions que la PNL a connu, depuis ses débuts par John Grinder et Richard Bandler, en 1975 à l'an présent.
                                </p>
                                <p>
                                    Raison dans cette celui qui a le plus travaillé sur ces développements, a conçu ce qui est maintenant appelé la 3ème génération de la PNL.
                                </p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-12">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 uppercase tracking-wider text-sm">
                                S'inscrire à la formation
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
