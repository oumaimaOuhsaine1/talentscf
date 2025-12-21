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
      { id: 'wesford', name: 'Wesford Genève', logo: '/images/wesford.png' },
      { id: 'efv', name: 'EFV', logo: '/images/efv.png' },
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

                  <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {s.title}
                  </h2>
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
              <p className="text-base md:text-lg text-foreground/70">
                Impact Global <span className="text-red-600 font-semibold">Excellence</span> Partenariat Confiance Innovation
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
            {partners.map((p) => (
              <div key={p.id} className="relative group">
                {/* decorative red circle behind the card */}
                <div
                  aria-hidden="true"
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full bg-red-600/10 dark:bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />

                <div className="bg-white dark:bg-card rounded-2xl p-8 flex flex-col items-center justify-center gap-4 shadow-lg hover:shadow-2xl transform transition-all hover:-translate-y-3 border border-border relative z-10 w-64 h-48">
                  {/** logo if exists, else placeholder */}
                  {p.logo ? (
                    <div className="w-40 h-24 relative">
                      <Image src={p.logo} alt={p.name} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-40 h-24 flex items-center justify-center bg-muted rounded-xl">{p.name}</div>
                  )}
                  <div className="text-center text-base font-bold text-foreground/80">{p.name}</div>
                </div>
              </div>
            ))}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    id: 'vision', title: 'Notre Vision', content: "Nous accompagnons les professionnels et les équipes pour développer des compétences durables, favoriser l'innovation et créer des environnements de travail performants et bienveillants.", icon: <Eye size={28} color="#f97316" />
                  },
                  {
                    id: 'mission', title: 'Notre Mission', content: "Nous accompagnons les individus et les organisations pour renforcer les compétences, l'autonomie et la performance durable.", icon: <Flag size={28} color="#f97316" />
                  },
                  {
                    id: 'valeurs', title: 'Nos Valeurs', content: "Intégrité, excellence, responsabilité et bienveillance guident nos interventions.", icon: <Star size={28} color="#f97316" />
                  },
                  {
                    id: 'approche', title: 'Notre Approche', content: "Approche pédagogique active et expérientielle, centrée sur la pratique et l'intelligence collective.", icon: <Compass size={28} color="#f97316" />
                  },
                ].map((card) => {
                  const flipped = !!flipState[card.id]
                  return (
                    <div
                      key={card.id}
                      className="relative w-full h-52 perspective group cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-pressed={flipped}
                      onClick={() => setFlipState((s) => ({ ...s, [card.id]: !s[card.id] }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setFlipState((s) => ({ ...s, [card.id]: !s[card.id] }))
                        }
                      }}
                    >
                      <div
                        className={`relative w-full h-full transition-transform duration-600 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''} md:group-hover:rotate-y-180`}
                        style={{
                          transformStyle: 'preserve-3d',
                          WebkitTransformStyle: 'preserve-3d',
                        }}
                      >
                        {/* Front face - dark blue (primary) background */}
                        <div className="absolute inset-0 rounded-lg shadow-lg p-8 backface-hidden flex flex-col items-center justify-center bg-white text-gray-800">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-2 rounded-md bg-primary/10 text-primary">{card.icon}</div>
                            <h4 className="text-lg font-semibold">{card.title}</h4>
                          </div>
                        </div>

                        {/* Back face - content paragraph (lighter overlay) */}
                        <div
                          className="absolute inset-0 rounded-lg shadow-lg p-6 backface-hidden bg-white text-gray-800 flex items-center justify-center"
                          style={{ transform: 'rotateY(180deg)' }}
                        >

                          <p className="text-sm text-gray-700 text-center">{card.content}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by — simple image cards */}

      <div className="relative z-10 mt-12 py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Titre centré / orange / gras */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-primary uppercase">Ils nous ont fait confiance</h3>
          </div>

          <div className="flex items-center gap-4">

            {/* Bouton précédent */}
            <button
              onClick={() => setTrustIndex((i) => (i - 1 + trustLogos.length) % trustLogos.length)}
              className="p-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700"
              aria-label="Précédent"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Slider */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500"
                style={{ transform: `translateX(-${trustIndex * (100 / trustVisible)}%)` }}
              >
                {trustLogos.concat(trustLogos).map((t, idx) => (
                  <div
                    key={`${t.id}-${idx}`}
                    className="min-w-[25%] flex-shrink-0 bg-white/70 backdrop-blur-md rounded-lg p-6 flex items-center justify-center shadow-sm h-40"
                  >
                    <div className="w-48 h-24 relative">
                      <Image src={t.logo} alt={`trust-${t.id}`} fill className="object-contain" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton suivant */}
            <button
              onClick={() => setTrustIndex((i) => (i + 1) % trustLogos.length)}
              className="p-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700"
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}
