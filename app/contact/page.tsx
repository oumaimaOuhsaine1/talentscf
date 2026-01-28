'use client'

import { useState } from 'react'
import Image from 'next/image'
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
        {/* Header (hero style like Événements Culturels) */}
        <section className="relative h-[400px] w-full overflow-hidden bg-gradient-to-br from-[#003E6B] to-[#002845]">
          <div className="absolute inset-0 opacity-40">
            <Image src="/images/contact.png" alt="Contact" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest animate-fade-in-up mb-4">
              Nous Contacter
            </h1>
            <p className="text-xl text-white/80 max-w-2xl animate-fade-in-up delay-100">
              Des questions ? Nous sommes là pour vous aider !
            </p>
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
                  <p className="text-foreground/70">contact@talentsgrp.com</p>
                  <p className="text-foreground/70 text-sm mt-1">Réponse dans 24h</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-8">
                  <Phone size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Téléphone</h3>
                  <p className="text-foreground/70">0661698359</p>
                  <p className="text-foreground/70 text-sm mt-1">Lun - Sam: 09:00 – 22:00</p>
                  <p className="text-foreground/70 text-sm mt-1">Dimanche: 09:00 – 17:30</p>
                </div>

                {/* Carte déplacée après le formulaire pour s'afficher en pleine largeur */}
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

          {/* Full width map after the form */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="w-full h-96 rounded-lg overflow-hidden border border-border">
              <iframe
                title="Centre d'affaires Malizia - Carte"
                src="https://www.google.com/maps?q=31.6649778,-8.0124168&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
