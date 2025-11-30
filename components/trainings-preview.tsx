import Link from 'next/link'
import { Clock, Users, MapPin } from 'lucide-react'

const trainings = [
  {
    id: 1,
    title: 'Fondamentaux de la PNL',
    category: 'PNL',
    trainer: 'Dr. Mohamed Alaoui',
    price: '2,500 MAD',
    dates: '15-17 Janvier 2025',
    participants: 12,
    level: 'Débutant',
    color: 'bg-primary'
  },
  {
    id: 2,
    title: 'Coaching pour Leaders',
    category: 'Coaching',
    trainer: 'Fatima Bennani',
    price: '3,000 MAD',
    dates: '22-24 Janvier 2025',
    participants: 8,
    level: 'Intermédiaire',
    color: 'bg-secondary'
  },
  {
    id: 3,
    title: 'Communication Efficace',
    category: 'Soft Skills',
    trainer: 'Hassan Khamlichi',
    price: '2,000 MAD',
    dates: '29-30 Janvier 2025',
    participants: 15,
    level: 'Tous niveaux',
    color: 'bg-accent'
  },
]

export default function TrainingsPreview() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Formations Populaires</h2>
            <p className="text-foreground/70 text-lg">Inscrivez-vous à nos prochaines sessions</p>
          </div>
          <Link
            href="/formations"
            className="text-primary font-semibold hover:gap-2 transition-all inline-flex items-center gap-1"
          >
            Voir toutes les formations →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainings.map((training) => (
            <Link
              key={training.id}
              href={`/formations/${training.id}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300"
            >
              {/* Category badge */}
              <div className={`h-2 ${training.color}`}></div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${training.color}`}>
                    {training.category}
                  </span>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                    {training.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {training.title}
                </h3>
                <p className="text-foreground/60 text-sm mb-4">{training.trainer}</p>

                <div className="space-y-3 mb-4 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Clock size={16} />
                    {training.dates}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Users size={16} />
                    {training.participants} participants max
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="font-bold text-lg text-primary">{training.price}</span>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                    En savoir plus
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
