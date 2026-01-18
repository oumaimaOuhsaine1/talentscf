'use client'

import { ArrowRight, ChevronLeft, ChevronRight, Eye, Flag, Star, Compass } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'

type Slide = {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  image: string
}

const slides: Slide[] = [
  {
    title: 'PNL & Coaching Génératif',
    subtitle: "Développez vos compétences transversales et transformez vos pratiques professionnelles.",
    ctaLabel: 'En savoir plus',
    ctaHref: '/formations',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=60',
  },
  {
    title: 'Ateliers Soft Skills',
    subtitle: "Communication, leadership et gestion du stress pour des équipes performantes.",
    ctaLabel: 'En savoir plus',
    ctaHref: '/formations',
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=60',
  },
  {
    title: 'Coaching Individuel',
    subtitle: "Accompagnement personnalisé pour atteindre vos objectifs professionnels.",
    ctaLabel: 'En savoir plus',
    ctaHref: '/contact',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=60',
  },
]

export default function HeroSection() {
  const [index, setIndex] = useState(0)

  // Partners and trust/carousel state
  const partners = useMemo(
    () => [
      { id: 'wesford', name: 'WESFORD Business School', logo: '/images/wesford.png' },
      { id: 'cambridge', name: 'Université de CAMBRIDGE', logo: '/cambridge.png' },
      { id: 'revue', name: 'La Revue de Sciences de Gestion', logo: '/revue.jpg' },
      { id: 'ublue', name: 'U Blue Hills', logo: '/Ublue.png' },
      { id: 'efv', name: 'EFV Management', logo: '/images/efv.png' },
      { id: 'speak', name: 'SPEAK GROUPE', logo: '/digitalspeak.png' },
      { id: 'loyds', name: 'LOYDS', logo: '/lloyds.PNG' },
    ],
    []
  )

  const trustLogos = useMemo(
    () => [
      { id: 't1', logo: '/images/trust1.svg' },
      { id: 't2', logo: '/images/trust2.svg' },
      { id: 't3', logo: '/images/trust3.svg' },
      { id: 't4', logo: '/images/trust4.svg' },
      { id: 't5', logo: '/images/trust5.svg' },
      { id: 't6', logo: '/images/trust6.svg' },
    ],
    []
  )

  // flip state for Vision/Mission cards (supports click/focus/touch) and trust carousel index
  const [flipState, setFlipState] = useState<Record<string, boolean>>({})
  const [trustIndex, setTrustIndex] = useState(0)
  // number of visible logos in carousel view
  const trustVisible = 4

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  // (carousel removed) no auto-advance needed

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[560px] md:h-[640px] w-full">
        {/* Slides */}
        <div className="absolute inset-0">

          {slides.map((s, i) => (
            <div
              key={i}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out transform-gpu
                ${i === index ? 'opacity-100 z-20' : 'opacity-0 z-10 pointer-events-none'}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${s.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/60" />

              <div className="relative z-30 max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex items-center">
                <div className="max-w-2xl text-white">

                  <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {s.title}
                  </h1>
                  {s.subtitle && (
                    <p className="mt-4 text-lg text-white/90 leading-relaxed">{s.subtitle}</p>
                  )}
                  <div className="mt-8">
                    <Link
                      href={s.ctaHref ?? '/'}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors"
                    >
                      {s.ctaLabel ?? 'En savoir plus'}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls / Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${i === index ? 'bg-primary w-8 rounded-full' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="relative z-10 mt-12 py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-primary uppercase">Nos partenaires internationaux</h3>
            <div className="mt-3 inline-flex items-center justify-center gap-3">
              <span className="w-1.5 h-6 rounded-full bg-red-600" aria-hidden="true" />
              <h6 className="text-base md:text-lg text-foreground/70 font-normal">
                Impact Global <span className="text-red-600 font-semibold">Excellence</span> Partenariat Confiance Innovation
              </h6>
            </div>
          </div>
          <div className="relative mt-8 group/slider">
            {/* Navigation Arrows */}
            <button
              onClick={() => {
                const container = document.getElementById('partners-slider');
                if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/80 dark:bg-card/80 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 border border-border"
              aria-label="Previous partner"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => {
                const container = document.getElementById('partners-slider');
                if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/80 dark:bg-card/80 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 border border-border"
              aria-label="Next partner"
            >
              <ChevronRight size={24} />
            </button>

            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

            {/* Partners Slider Wrapper */}
            <div
              id="partners-slider"
              className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-12"
            >
              {partners.map((p, idx) => (
                <div key={`${p.id}-${idx}`} className="flex-shrink-0 snap-center">
                  <div className="relative group">
                    <div
                      aria-hidden="true"
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-red-600/5 dark:bg-red-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="bg-white dark:bg-card rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-xl transform transition-all hover:-translate-y-2 border border-border/50 relative z-10 w-56 h-40">
                      {p.logo ? (
                        <div className="w-32 h-20 relative">
                          <Image src={p.logo} alt={p.name} fill className="object-contain transition-all duration-500" />
                        </div>
                      ) : (
                        <div className="w-32 h-20 flex items-center justify-center bg-muted rounded-xl text-xs font-bold text-center px-2">{p.name}</div>
                      )}
                      <div className="text-center text-xs font-bold text-foreground/60 group-hover:text-primary transition-colors line-clamp-1">{p.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vision / Mission / Valeurs / Approche - Flip Cards */}

      <div className="relative z-10 mt-12 py-12">
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-[length:100%_auto]"
          style={{ backgroundImage: `url('/images/vision1.avif')` }}
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="relative">
            {/* large background image for the section — replace '/images/success-bg.jpg' with your image in /public/images */}
            <div className="absolute inset-0">

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
              <div className="flex flex-col gap-6">
                {[
                  {
                    id: 'vision',
                    number: '01',
                    title: 'Notre Vision',
                    color: 'bg-orange-500',
                    content: (
                      <div className="space-y-4">
                        <p>
                          Notre ambition est de devenir le partenaire de choix en formation et en consulting pour ceux que nous accompagnons.
                        </p>
                        <p>
                          Nous souhaitons aider un maximum de personnes en leur proposant des parcours d'apprentissage et des conseils variés, modernes, conçus pour être un bon investissement pour tous, et surtout, qui font une vraie différence dans leur progression.
                        </p>
                      </div>
                    ),
                    icon: <Eye size={32} className="text-orange-500" />
                  },
                  {
                    id: 'mission',
                    number: '02',
                    title: 'Notre Mission',
                    color: 'bg-blue-600',
                    content: (
                      <div className="space-y-4 text-sm">
                        <p>
                          Chez nous, notre cœur de métier, c'est de vous proposer une gamme de formations et de services variés et stimulants, élaborés avec grand soin pour votre développement.
                        </p>
                        <div className="pl-4 border-l-2 border-blue-200">
                          <p className="font-semibold mb-1">Nous soutenons :</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Les jeunes en quête de savoir (élèves, étudiants, doctorants)</li>
                            <li>Les professionnels en activité</li>
                            <li>Les entrepreneurs qui bâtissent leur projet</li>
                          </ul>
                        </div>
                      </div>
                    ),
                    icon: <Flag size={32} className="text-blue-600" />
                  },
                  {
                    id: 'valeurs',
                    number: '03',
                    title: 'Nos Valeurs',
                    color: 'bg-purple-600',
                    content: (
                      <div className="space-y-3 text-sm">
                        <p className="font-semibold">Les valeurs de TALENTS Consulting & Formation reposent sur :</p>
                        <ul className="space-y-2">
                          <li>
                            <strong className="text-purple-700">Valeurs fondamentales :</strong> Transparence, responsabilité, intégrité
                          </li>
                          <li>
                            <strong className="text-purple-700">Valeurs de progrès :</strong> Goût de l’effort, persévérance, culture du succès
                          </li>
                          <li>
                            <strong className="text-purple-700">Valeurs professionnelles :</strong> Innovation, créativité
                          </li>
                          <li>
                            <strong className="text-purple-700">Valeurs collectives :</strong> Equité, sentiment d’appartenance
                          </li>
                        </ul>
                      </div>
                    ),
                    icon: <Star size={32} className="text-purple-600" />
                  },
                  {
                    id: 'objectif',
                    number: '04',
                    title: 'Notre Objectif',
                    color: 'bg-green-600',
                    content: (
                      <div className="space-y-4 text-sm">
                        <p>
                          L'objectif fondamental de notre institution est de permettre aux individus de concrétiser leurs aspirations et d'atteindre un niveau d'excellence optimal.
                        </p>
                        <p>
                          Cet accomplissement est rendu possible par le déploiement de dispositifs de formation rigoureusement individualisés, conçus en adéquation étroite avec leurs exigences intrinsèques et leurs projets de développement professionnel et personnel.
                        </p>
                      </div>
                    ),
                    icon: <Compass size={32} className="text-green-600" />
                  },
                ].map((card, index) => {
                  const isEven = index % 2 === 0
                  return (
                    <div
                      key={card.id}
                      className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden min-h-[180px] flex flex-col md:flex-row"
                    >
                      {/* Left Colored Section (for Even items) */}
                      {isEven && (
                        <div className={`w-full md:w-32 ${card.color} flex flex-row md:flex-col items-center justify-between md:justify-center p-4 md:p-0 text-white`}>
                          <span className="text-3xl font-bold opacity-80">{card.number}</span>
                          <div className="bg-white p-3 rounded-full shadow-md mt-0 md:mt-4">
                            {card.icon}
                          </div>
                        </div>
                      )}

                      {/* Content Section */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center bg-white text-gray-800">
                        <h3 className={`text-xl font-bold mb-4 ${card.color.replace('bg-', 'text-')}`}>
                          {card.title}
                        </h3>
                        <div className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {card.content}
                        </div>
                      </div>

                      {/* Right Colored Section (for Odd items) */}
                      {!isEven && (
                        <div className={`w-full md:w-32 ${card.color} flex flex-row-reverse md:flex-col items-center justify-between md:justify-center p-4 md:p-0 text-white order-first md:order-last`}>
                          <span className="text-3xl font-bold opacity-80">{card.number}</span>
                          <div className="bg-white p-3 rounded-full shadow-md mt-0 md:mt-4">
                            {card.icon}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}
