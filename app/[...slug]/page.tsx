'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Page {
  title: string
  description: string
  content: string
  image: string
}

// Sample data for all pages - can be replaced with dynamic data later
const pageData: Record<string, Page> = {
  'qui-sommes-nous': {
    title: 'Qui sommes-nous?',
    description: 'Découvrez l\'histoire et la mission de Talents Consulting & Formation',
    content: 'Talents Consulting & Formation est un centre de formation et de consulting reconnu, spécialisé dans le développement personnel, la PNL, le coaching et les formations intra-entreprises.',
    image: '/placeholder.jpg',
  },
  'notre-equipe': {
    title: 'Notre équipe',
    description: 'Rencontrez les experts et formateurs qualifiés de notre centre',
    content: 'Notre équipe est composée de professionnels expérimentés et certifiés dans leurs domaines respectifs.',
    image: '/placeholder.jpg',
  },
  'nos-partenaires': {
    title: 'Nos partenaires',
    description: 'Découvrez nos partenaires stratégiques',
    content: 'Nous collaborons avec les meilleures organisations pour offrir des formations de qualité.',
    image: '/placeholder.jpg',
  },
  'nos-clients': {
    title: 'Nos clients',
    description: 'Nos clients satisfaits à travers le monde',
    content: 'Plus de 500 entreprises et 10000 participants nous font confiance.',
    image: '/placeholder.jpg',
  },
  'centre': {
    title: 'Le centre Talents Consulting Formation',
    description: 'Bienvenue au cœur de notre centre de formation',
    content: 'Notre centre moderne offre des équipements de pointe et un environnement propice à l\'apprentissage.',
    image: '/placeholder.jpg',
  },
  'visite-guidee': {
    title: 'Visite guidée',
    description: 'Explorez nos installations et nos locaux',
    content: 'Nos salles de formation sont équipées des technologies les plus récentes pour une expérience d\'apprentissage optimale.',
    image: '/placeholder.jpg',
  },
  'calendrier': {
    title: 'Calendrier des Formations',
    description: 'Consultez notre calendrier complet des formations',
    content: 'Découvrez les dates de toutes nos formations pour l\'année en cours.',
    image: '/placeholder.jpg',
  },
  'certification': {
    title: 'Certification PNL',
    description: 'Formation certifiante en Programmation Neurolinguistique',
    content: 'Obtenez une certification reconnue internationalement en PNL.',
    image: '/placeholder.jpg',
  },
  'parcours-coaching': {
    title: 'Parcours coaching génératif & PNL',
    description: 'Développez vos compétences en coaching génératif',
    content: 'Un parcours complet combinant coaching génératif et PNL pour les professionnels.',
    image: '/placeholder.jpg',
  },
  'formation-base': {
    title: 'Formation de base en PNL',
    description: 'Introduction complète à la Programmation Neurolinguistique',
    content: 'Apprenez les fondamentaux de la PNL avec nos formateurs certifiés.',
    image: '/placeholder.jpg',
  },
  'cycle-maitre': {
    title: 'Cycle Maître Praticien en PNL',
    description: 'Devenez Maître Praticien en PNL',
    content: 'Un programme avancé pour maîtriser tous les aspects de la PNL.',
    image: '/placeholder.jpg',
  },
  'cycle-coaching': {
    title: 'Cycle Coaching Génératif',
    description: 'Formation spécialisée en coaching génératif',
    content: 'Découvrez les principes et techniques du coaching génératif.',
    image: '/placeholder.jpg',
  },
  'master-coach': {
    title: 'Cycle Master Coach',
    description: 'Devenir expert en coaching',
    content: 'Un parcours intensif pour devenir un coach professionnel expert.',
    image: '/placeholder.jpg',
  },
  'enseignants': {
    title: 'Équipe des enseignants',
    description: 'Rencontrez nos formateurs PNL certifiés',
    content: 'Notre équipe de formateurs possède une expérience reconnue dans le domaine de la PNL.',
    image: '/placeholder.jpg',
  },
  'dev-personnel': {
    title: 'Développement personnel',
    description: 'Programmes de développement personnel',
    content: 'Nos programmes vous aident à développer votre potentiel personnel.',
    image: '/placeholder.jpg',
  },
  'formation-formateurs': {
    title: 'Formation des Formateurs',
    description: 'Devenir formateur professionnel',
    content: 'Apprenez à former et à transmettre vos connaissances professionnellement.',
    image: '/placeholder.jpg',
  },
  'commercial-ventes': {
    title: 'Commercial & Ventes',
    description: 'Formation intra-entreprises en commercial et ventes',
    content: 'Améliorez vos techniques de vente et de négociation commerciale.',
    image: '/placeholder.jpg',
  },
  'management-leadership': {
    title: 'Management & Leadership',
    description: 'Formation en management et leadership pour les cadres',
    content: 'Développez vos compétences en management et leadership.',
    image: '/placeholder.jpg',
  },
  'efficacite-individuelle': {
    title: 'Efficacité Individuelle',
    description: 'Formation en productivité et efficacité personnelle',
    content: 'Améliorez votre productivité et votre efficacité au travail.',
    image: '/placeholder.jpg',
  },
  'mind-mapping': {
    title: 'Formation en Mind Mapping',
    description: 'Maîtrisez la technique du Mind Mapping',
    content: 'Apprenez à créer et utiliser efficacement les mind maps pour l\'organisation.',
    image: '/placeholder.jpg',
  },
  'coaching-individuel': {
    title: 'Coaching individuel',
    description: 'Services de coaching individuel personnalisé',
    content: 'Un accompagnement personnalisé pour atteindre vos objectifs professionnels.',
    image: '/placeholder.jpg',
  },
  'coaching-equipe': {
    title: 'Coaching d\'équipe',
    description: 'Coaching pour améliorer la performance d\'équipe',
    content: 'Renforcez la cohésion et la performance de votre équipe.',
    image: '/placeholder.jpg',
  },
  'coaching-operationnel': {
    title: 'Coaching opérationnel',
    description: 'Coaching opérationnel pour les projets et opérations',
    content: 'Un accompagnement spécialisé pour réussir vos projets opérationnels.',
    image: '/placeholder.jpg',
  },
  'coaching-organisationnel': {
    title: 'Coaching organisationnel',
    description: 'Transformation et coaching organisationnel',
    content: 'Accompagnement de votre organisation dans ses transformations.',
    image: '/placeholder.jpg',
  },
  'team-building': {
    title: 'Team building',
    description: 'Activités et programmes de team building',
    content: 'Renforcez les liens et la collaboration au sein de votre équipe.',
    image: '/placeholder.jpg',
  },
  'bilan-competences': {
    title: 'Bilan des compétences',
    description: 'Service de bilan des compétences professionnelles',
    content: 'Évaluez vos compétences et définissez votre parcours professionnel.',
    image: '/placeholder.jpg',
  },
  'excellence-operationnelle': {
    title: 'Excellence opérationnelle',
    description: 'Programmes d\'excellence opérationnelle',
    content: 'Optimisez vos processus et atteindre l\'excellence opérationnelle.',
    image: '/placeholder.jpg',
  },
  'organisation': {
    title: 'Organisation',
    description: 'Conseils en organisation et optimisation',
    content: 'Restructurez et optimisez l\'organisation de votre entreprise.',
    image: '/placeholder.jpg',
  },
  'conduite-changement': {
    title: 'Conduite de changement',
    description: 'Accompagnement en gestion du changement',
    content: 'Pilotez et gérez efficacement les changements au sein de votre organisation.',
    image: '/placeholder.jpg',
  },
  'location-salles': {
    title: 'Location de salles',
    description: 'Louez nos salles de formation et de réunion',
    content: 'Nos salles modernes et équipées sont disponibles à la location pour vos événements.',
    image: '/placeholder.jpg',
  },
}

export default function DynamicPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  const lastSlugPart = Array.isArray(params.slug) ? params.slug[params.slug.length - 1] : params.slug
  
  const [isDark, setIsDark] = useState(false)
  const page = pageData[lastSlugPart] || {
    title: 'Page non trouvée',
    description: 'La page que vous cherchez n\'existe pas.',
    content: 'Veuillez retourner à la page d\'accueil.',
    image: '/placeholder.jpg',
  }

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
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft size={16} />
              <span>Retour</span>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{page.title}</h1>
              <p className="text-xl text-foreground/70 mb-6">{page.description}</p>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={page.image || "/placeholder.svg"}
                alt={page.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-8 mb-12">
            <p className="text-lg text-foreground/80 leading-relaxed">{page.content}</p>
          </div>

          {/* Sample sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-full h-40 bg-muted rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold text-primary mb-2">Section {i}</h3>
                <p className="text-foreground/70">Contenu détaillé de cette section pour {page.title}.</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">Intéressé?</h2>
            <p className="text-primary-foreground/90 mb-6">Contactez-nous pour plus d'informations sur {page.title}.</p>
            <Link
              href="/contact"
              className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
