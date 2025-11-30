import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <Image
                src="/images/image.png"
                alt="Talents Consulting & Formation"
                width={150}
                height={75}
                className="object-contain"
              />
            </div>
            <div className="h-px w-full bg-border my-4"></div>
            <div className="text-center">
              <h4 className="font-semibold mb-3 text-sm">Nous suivre</h4>
              <div className="flex gap-3 justify-center">
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors"><Twitter size={20} /></a>
              </div>
            </div>
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-bold mb-4">À propos de Talents Formation & Coaching</h3>
            <ul className="space-y-2">
              <li><Link href="/apropos/qui-sommes-nous" className="text-foreground/60 hover:text-primary transition-colors text-sm">Qui sommes-nous?</Link></li>
              <li><Link href="/apropos/notre-equipe" className="text-foreground/60 hover:text-primary transition-colors text-sm">Notre équipe</Link></li>
              <li><Link href="/apropos/nos-partenaires" className="text-foreground/60 hover:text-primary transition-colors text-sm">Nos partenaires</Link></li>
              <li><Link href="/apropos/nos-clients" className="text-foreground/60 hover:text-primary transition-colors text-sm">Nos clients</Link></li>
              <li><Link href="/apropos/centre" className="text-foreground/60 hover:text-primary transition-colors text-sm">Le centre Talents Consulting Formation</Link></li>
              <li><Link href="/apropos/visite-guidee" className="text-foreground/60 hover:text-primary transition-colors text-sm">Visite guidée</Link></li>
              <li><Link href="/apropos/calendrier" className="text-foreground/60 hover:text-primary transition-colors text-sm">Calendrier des Formations</Link></li>
            </ul>
          </div>

          {/* Les Formations */}
          <div>
            <h3 className="font-bold mb-4">Les Formations</h3>
            <ul className="space-y-2">
              <li><Link href="/pnl/formation-base" className="text-foreground/60 hover:text-primary transition-colors text-sm">Formation en PNL</Link></li>
              <li><Link href="/coaching/coaching-equipe" className="text-foreground/60 hover:text-primary transition-colors text-sm">Coaching d'équipe</Link></li>
              <li><Link href="/coaching/coaching-individuel" className="text-foreground/60 hover:text-primary transition-colors text-sm">Coaching professionnel</Link></li>
              <li><Link href="/cycles-professionnels/dev-personnel" className="text-foreground/60 hover:text-primary transition-colors text-sm">Cycle de Développement personnel pour manager</Link></li>
              <li><Link href="/intra-entreprises/commercial-ventes" className="text-foreground/60 hover:text-primary transition-colors text-sm">Commercial & Ventes</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Nous Contacter</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span className="text-foreground/60 text-sm">+212 5XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span className="text-foreground/60 text-sm">info@talents.ma</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground/60 text-sm">Casablanca, Maroc</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-foreground/60 text-sm">© 2025 Talents Consulting & Formation. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
