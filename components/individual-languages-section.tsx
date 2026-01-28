'use client'

import React from 'react'
import Image from 'next/image'

const individualLanguages = [
    {
        name: 'Turc',
        flag: '/images/turque.avif',
        desc: 'Bénéficiez d\'un accompagnement personnalisé pour maîtriser le turc.'
    },
    {
        name: 'Néerlandais',
        flag: '/images/netherland.png',
        desc: 'Cours individuels adaptés à votre niveau et à vos objectifs professionnels.'
    },
    {
        name: 'Chinois',
        flag: '/images/chine.avif',
        desc: 'Initiez-vous ou perfectionnez votre mandarin avec nos experts.'
    },
    {
        name: 'Italien',
        flag: '/images/italie.png',
        desc: 'Plongez dans la langue et la culture italienne en format sur mesure.'
    }
]

export default function IndividualLanguagesSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border/50">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Formation Individuelle & Autres Langues</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Nous proposons également des cours particuliers et des formations intensives sur mesure pour d'autres langues selon vos besoins spécifiques.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {individualLanguages.map((lang, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-20 h-20 rounded-full bg-background shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden relative">
                            <Image
                                src={lang.flag}
                                alt={lang.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{lang.name}</h3>
                        <p className="text-foreground/70 mb-6 flex-grow">{lang.desc}</p>
                        <div className="mt-auto">
                            <div className="px-4 py-2 bg-orange-500/10 text-orange-600 rounded-lg text-sm font-bold uppercase tracking-wider inline-block">
                                Formation Individuelle
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
