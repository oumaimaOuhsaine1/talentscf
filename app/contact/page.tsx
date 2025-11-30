'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [isDark, setIsDark] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    setIsDark(!isDark)
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary/5 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Nous Contacter</h1>
            <p className="text-foreground/70">Des questions ? Nous sommes là pour vous aider !</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-card border border-border rounded-xl p-8">
                  <Mail size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p className="text-foreground/70">info@talents.ma</p>
                  <p className="text-foreground/70 text-sm mt-1">Réponse dans 24h</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-8">
                  <Phone size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Téléphone</h3>
                  <p className="text-foreground/70">+212 5XX XXX XXX</p>
                  <p className="text-foreground/70 text-sm mt-1">Lun-Ven: 09:00 - 18:00</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-8">
                  <MapPin size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Adresse</h3>
                  <p className="text-foreground/70">Centre de Formation Talents</p>
                  <p className="text-foreground/70 text-sm mt-1">Casablanca, Maroc</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-xl p-8">
                  <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                  
                  {submitted && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-700">
                      Merci ! Votre message a été envoyé avec succès.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Nom *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Téléphone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Sujet *</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="Formation">Information sur une formation</option>
                          <option value="Corporate">Formation corporate</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Envoyer le message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
