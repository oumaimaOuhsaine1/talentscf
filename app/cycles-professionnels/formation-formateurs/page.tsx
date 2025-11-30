'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'

export default function FormationFormateursPage() {
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
                            src="/images/competence.jpg"
                            alt="Formation des Formateurs"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider animate-fade-in-up text-center px-4">
                            Formation des Formateurs
                        </h1>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-[#005b96] text-center mb-8">
                            Présentation du cycle de Formation des Formateurs
                        </h2>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Left Column - Image */}
                            <div className="flex justify-center items-start">
                                <div className="w-full max-w-sm border-4 border-[#005b96] bg-white p-2">
                                    <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                                        <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Text */}
                            <div className="space-y-4 text-sm text-justify leading-relaxed">
                                <p>
                                    Le paradigme de la formation : <strong>Former des formateurs d'excellence</strong> se basant sur le principe que :
                                </p>
                                <p className="italic text-gray-600">
                                    « Un bon formateur ne transmet pas seulement des connaissances, il inspire et transforme ! »
                                </p>
                                <p>
                                    Face aux évolutions constantes des méthodes pédagogiques et des attentes des apprenants, la maîtrise technique ne suffit plus. La réussite d'un formateur passe aujourd'hui par le <span className="text-red-600 font-semibold">développement de compétences pédagogiques avancées et la maîtrise des outils d'animation</span> pour créer des expériences d'apprentissage engageantes et efficaces.
                                </p>
                            </div>
                        </div>

                        {/* Description Paragraph */}
                        <div className="mb-8 text-sm text-justify leading-relaxed space-y-4">
                            <p>
                                Le centre Talents consulting & coaching propose aux formateurs et futurs formateurs un cycle de formation complet et pratique, afin d'acquérir les méthodes et outils essentiels pour concevoir, animer et évaluer des formations impactantes. Ce parcours permet de développer les compétences pédagogiques, techniques et relationnelles nécessaires pour exercer le métier de formateur professionnel.
                            </p>
                            <p>
                                À la fin du cycle, un certificat de formateur professionnel est délivré aux participants attestant la réussite de leur parcours. A cet égard, ils devront faire preuve de rigueur, d'assiduité et d'implication dans les travaux pratiques, et la réalisation d'un projet de formation complet.
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
                                                <span>Les compétences pédagogiques pour concevoir et animer des formations efficaces</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>La maîtrise des techniques d'animation et de gestion de groupe</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>La capacité à créer des supports pédagogiques attractifs et pertinents</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Les outils d'évaluation des apprentissages et de mesure de l'impact</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>La posture et la communication du formateur professionnel</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Ce cycle sera également un espace de pratique intensive et de retours d'expérience.</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 'population' && (
                                    <div>
                                        <h3 className="font-bold mb-4">Population Cible :</h3>
                                        <p>Ce cycle s'adresse aux formateurs occasionnels ou permanents, consultants, managers, experts métiers souhaitant transmettre leurs compétences, et toute personne désirant se professionnaliser dans le métier de formateur.</p>
                                    </div>
                                )}

                                {activeTab === 'organisation' && (
                                    <div>
                                        <h3 className="font-bold mb-4">Organisation du Cycle :</h3>
                                        <p>Le cycle se déroule sur plusieurs sessions alternant théorie et pratique, avec des mises en situation réelles, des ateliers de conception pédagogique, et un accompagnement personnalisé pour la réalisation d'un projet de formation.</p>
                                    </div>
                                )}

                                {activeTab === 'equipe' && (
                                    <div>
                                        <h3 className="font-bold mb-4">Equipe Pédagogique :</h3>
                                        <p>Notre équipe pédagogique est composée de formateurs de formateurs certifiés, experts en ingénierie pédagogique et en animation de formations professionnelles.</p>
                                        <ul className="space-y-2 mt-4">
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Formateurs certifiés avec plus de 10 ans d'expérience</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Experts en ingénierie pédagogique et digital learning</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-white mt-1">•</span>
                                                <span>Consultants en développement des compétences</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 'programme' && (
                                    <div className="bg-white text-gray-900 p-0 -m-6">
                                        {/* Programme Header */}
                                        <div className="bg-[#0088cc] text-white p-4 font-bold text-base">
                                            Programme du Cycle de Formation des Formateurs - Niveau 1
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
                                            <h4 className="text-lg font-bold text-[#005b96] mb-4">Les fondamentaux de la formation</h4>

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
                                                        <td className="border border-gray-300 px-4 py-2">Action 1 : Accueil + Comprendre le rôle et les missions du formateur</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">6h</td>
                                                    </tr>
                                                    <tr className="bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">Action 2 : Concevoir une action de formation</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">6h</td>
                                                    </tr>
                                                    <tr className="bg-white">
                                                        <td className="border border-gray-300 px-4 py-2">Action 3 : Créer des supports pédagogiques efficaces</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">4h</td>
                                                    </tr>
                                                    <tr className="bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">Action 4 : Animer une session de formation</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">6h</td>
                                                    </tr>
                                                    <tr className="bg-white">
                                                        <td className="border border-gray-300 px-4 py-2">Action 5 : Évaluer les apprentissages et l'impact de la formation</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">4h</td>
                                                    </tr>
                                                    <tr className="bg-gray-100 font-bold">
                                                        <td className="border border-gray-300 px-4 py-2">Total des heures module 1</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-right">26h</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Module 2 Header */}
                                        <div className="bg-[#0088cc] text-white p-4 font-bold text-base mt-6">
                                            Programme du Cycle de Formation des Formateurs - Niveau 2
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
                                    Le parcours de formation des formateurs proposé par Talents consulting & coaching a été conçu en collaboration avec des experts en ingénierie pédagogique. C'est une formation complète de 80h, dispensée en présentiel et à distance, sur 12 jours.
                                </p>
                                <div className="w-full max-w-xs border-4 border-[#005b96] bg-white p-2 mx-auto">
                                    <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4 text-sm text-justify leading-relaxed">
                                <p>
                                    La particularité de ce programme c'est qu'il intègre les dernières innovations en matière de pédagogie active, de digital learning et de neurosciences appliquées à la formation.
                                </p>
                                <p>
                                    Les participants bénéficient d'un accompagnement personnalisé pour concevoir et animer leur première formation, avec des retours d'expérience et des conseils d'experts tout au long du parcours.
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
