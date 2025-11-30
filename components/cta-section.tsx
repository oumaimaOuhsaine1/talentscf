import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-2xl p-12 md:p-16 text-center text-white relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/images/blob.jfif"
              alt="Background pattern"
              fill
              className="object-cover"
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 z-0"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20 z-0"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à transformer votre carrière ?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Rejoignez des centaines de professionnels qui ont déjà bénéficié de nos formations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/formations"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Explorer nos formations
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
