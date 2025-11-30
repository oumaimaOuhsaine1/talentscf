import Image from "next/image"
import { Brain, Users, Zap, Lightbulb } from "lucide-react"

const servicesTop = [
  {
    icon: Brain,
    title: "Certifications PNL",
    description: "Certifications du niveau base au Master Coach."
  },
  {
    icon: Users,
    title: "Coaching",
    description: "Coaching personnel, familial ou en entreprise."
  },
  {
    icon: Zap,
    title: "Cycles Professionnels",
    description: "Programmes dans différents domaines."
  }
]

const servicesMiddle = [
  {
    icon: Lightbulb,
    title: "Formations Intra-entreprises",
    description: "Développer les compétences de vos équipes."
  },
  {
    icon: Brain,
    title: "Consulting",
    description: "Diagnostic RH, formation, outils RH."
  }
]

const servicesBottom = [
  {
    icon: Brain,
    title: "Location de Salles",
    description: "Salles modernes équipées pour formations."
  },
  {
    icon: Users,
    title: "Formations à la Carte",
    description: "Programmes sur mesure."
  },
  {
    icon: Zap,
    title: "Soirées Découverte",
    description: "Découvrez notre centre & équipe."
  }
]

export default function ServicesSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/R.jfif"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/80" /> {/* Overlay for readability */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center gap-16">

        {/* TITRE */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 uppercase">Nos Services</h2>
        </div>

        {/* GRID LAYOUT: 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">

          {/* TOP ROW */}
          {servicesTop.map((s, i) => <ServiceCard key={`top-${i}`} {...s} />)}

          {/* MIDDLE ROW */}
          {/* Left */}
          <ServiceCard {...servicesMiddle[0]} />

          {/* Center: LOGO */}
          <div className="flex justify-center items-center p-6">
            <Image
              src="/images/image.png"
              width={230}
              height={230}
              alt="Logo centre"
              className="object-contain"
            />
          </div>

          {/* Right */}
          <ServiceCard {...servicesMiddle[1]} />

          {/* BOTTOM ROW */}
          {servicesBottom.map((s, i) => <ServiceCard key={`bottom-${i}`} {...s} />)}

        </div>

      </div>
    </section>
  )
}


interface ServiceCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 w-72 mx-auto text-center">
      <Icon size={36} className="text-primary mx-auto mb-3" />
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </div>
  )
}
