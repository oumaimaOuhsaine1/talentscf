'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, Mail, Clock } from 'lucide-react'

export default function DemandesInfoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement
    setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch('http://127.0.0.1:5000/api/contact/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (response.ok) {
        setSubmitted(true)
        setForm({ nom: '', prenom: '', email: '', telephone: '', sujet: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar isDark={false} onToggleTheme={() => { }} />

      <main className="flex-1">
        <section className="relative h-56 w-full overflow-hidden bg-gradient-to-r from-[#003E6B] to-[#002845]">
          <div className="absolute inset-0 opacity-30">
            <Image src="/images/contact.png" alt="contact" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Demandes d'information</h1>
            <p className="text-white/80 mt-2 max-w-2xl">Posez vos questions — nous répondrons rapidement.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-9">
                <div className="bg-white dark:bg-gray-800 border border-border rounded-xl p-10 shadow-sm">
                  {submitted ? (
                    <div className="flex items-center gap-4 p-4 rounded-md bg-green-50 border border-green-200 text-green-800">
                      <CheckCircle className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Votre demande a été envoyée</div>
                        <div className="text-sm">Nous vous répondrons sous 24h.</div>
                      </div>
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nom</label>
                        <input name="nom" value={form.nom} onChange={handleChange} required className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Prénom</label>
                        <input name="prenom" value={form.prenom} onChange={handleChange} required className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Téléphone</label>
                        <input name="telephone" value={form.telephone} onChange={handleChange} className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Sujet</label>
                        <input name="sujet" value={form.sujet} onChange={handleChange} className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base resize-none" />
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <button type="submit" disabled={submitting} className="px-6 py-3 bg-[#005A9C] hover:bg-[#004a7f] text-white font-semibold rounded-lg">
                        {submitting ? 'Envoi...' : 'Envoyer'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <aside className="lg:col-span-3">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#e6f0ff] rounded-md">
                        <Mail className="w-6 h-6 text-[#052A63]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Email</h4>
                        <div className="text-foreground/70">contact@talentsgrp.com</div>
                        <div className="text-sm text-foreground/50 mt-1">Réponse dans 24h</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#e6f0ff] rounded-md">
                        <Clock className="w-6 h-6 text-[#052A63]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Horaires</h4>
                        <div className="text-foreground/70 text-sm">Lun - Sam: 09:00 – 22:00</div>
                        <div className="text-foreground/70 text-sm">Dimanche: 09:00 – 17:30</div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-8">
            <div className="bg-white dark:bg-gray-800 border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Localisation du centre</h3>
                <div className="text-foreground/70 mb-4">Bureau no 40 et no 41, Centre d'affaire MALIZIA — Allal El Fassi, Marrakech 40000</div>
                <div className="w-full h-72 rounded-md overflow-hidden border">
                  <iframe
                    title="Centre d'affaire MALIZIA - Carte"
                    src="https://www.google.com/maps?q=31.6649778,-8.0124168&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
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
