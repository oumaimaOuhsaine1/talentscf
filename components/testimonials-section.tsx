import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Ahmed Bouhmidi',
    role: 'Chef de Projet',
    text: 'La formation en PNL m\'a vraiment transformé. J\'ai pu identifier et transformer mes croyances limitantes.',
    rating: 5
  },
  {
    name: 'Leila Mansouri',
    role: 'Manager Commercial',
    text: 'Excellente formation ! Les techniques de coaching m\'ont permis de mieux motiver mon équipe.',
    rating: 5
  },
  {
    name: 'Karim Bencheikh',
    role: 'Entrepreneur',
    text: 'Les soft skills acquis m\'ont ouvert de nouvelles portes professionnelles. Je recommande vivement !',
    rating: 5
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 uppercase">Ce que disent nos participants</h2>
          <p className="text-foreground/70 text-lg">Découvrez les témoignages de ceux qui ont transformé leur vie</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 mb-6 leading-relaxed">{testimonial.text}</p>
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-foreground/60 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
