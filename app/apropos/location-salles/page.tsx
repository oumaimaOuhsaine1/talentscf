'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Users, CheckCircle, Clock, ArrowRight } from 'lucide-react'

export default function LocationSallePage() {
    const [isDark, setIsDark] = useState(false)

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

    const salles = [
        {
            title: "Salle Polyvalente",
            capacity: "20-25 personnes",
            features: ["Vidéoprojecteur", "Tableau blanc", "Climatisation", "Wi-Fi Haut Débit"],
            image: "/images/centre.png"
        },
        {
            title: "Salle de Séminaire",
            capacity: "15-20 personnes",
            features: ["Écran LED", "Système Sonore", "Espace Café", "Lumière Naturelle"],
            image: "/images/equipe.jfif"
        },
        {
            title: "Bureau de Coaching",
            capacity: "2-4 personnes",
            features: ["Espace Intime", "Table Basse", "Fauteuils Confortables", "Insonorisation"],
            image: "/images/vision.jpg"
        }
    ]

    // Modal & form state
    const [showModal, setShowModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState('')
    const [form, setForm] = useState({ nom: '', prenom: '', telephone: '', type: 'renseignement', message: '' })
    const openModal = (roomTitle: string) => { setSelectedRoom(roomTitle); setShowModal(true) }
    const closeModal = () => setShowModal(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement
        setForm(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.nom || !form.prenom || !form.telephone) {
            alert('Veuillez renseigner nom, prénom et téléphone')
            return
        }
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/location-reservations` : 'http://localhost:4000/api/location-reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, room_id: selectedRoom })
            })
            if (res.ok) {
                alert('Demande envoyée, nous vous contacterons bientôt.')
                setForm({ nom: '', prenom: '', telephone: '', type: 'renseignement', message: '' })
                closeModal()
            } else {
                const err = await res.json()
                alert('Erreur: ' + (err?.error || res.statusText))
            }
        } catch (err) {
            console.error(err)
            alert('Impossible de joindre le serveur backend.')
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[300px] w-full overflow-hidden bg-[#003d5c]">
                    <div className="absolute inset-0 z-0 opacity-40">
                        <Image
                            src="/images/equipe.jfif"
                            alt="Location de salles"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest animate-fade-in-up">
                            Location de Salles
                        </h1>
                        <p className="mt-4 text-xl text-white/90 max-w-2xl animate-fade-in-up delay-100">
                            Des espaces professionnels et équipés pour vos formations et réunions.
                        </p>
                    </div>
                </section>

                {/* Intro Section */}
                <section className="py-20 px-4 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-primary">Des Espaces Adaptés à Vos Besoins</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Le centre Talents Consulting Formation met à votre disposition des salles modernes, lumineuses et entièrement équipées au cœur de la ville. Que ce soit pour une formation, un séminaire ou une séance de coaching, nous vous offrons un environnement propice à la réussite.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-red-600" /> <span>Emplacement Central</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="text-red-600" /> <span>Location Flexible</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="text-red-600" /> <span>Capacités Variées</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="text-red-600" /> <span>Équipements Inclus</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image src="/images/centre.png" alt="Nos locaux" fill className="object-cover" />
                        </div>
                    </div>
                </section>

                {/* Salles Grid */}
                <section className="py-20 bg-muted/30 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest text-primary">
                            Nos Espaces Disponibles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {salles.map((salle, idx) => (
                                <div key={idx} className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border group hover:border-primary transition-all duration-300">
                                    <div className="relative h-56 w-full">
                                        <Image src={salle.image} alt={salle.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                            {salle.capacity}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold mb-4">{salle.title}</h3>
                                        <ul className="space-y-3 mb-8">
                                            {salle.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <button onClick={() => openModal(salle.title)} className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all">
                                            Réserver <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-2xl bg-card rounded-xl p-6 shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold">Réserver — {selectedRoom}</h3>
                                <button onClick={closeModal} className="text-muted-foreground">Fermer</button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" className="input" />
                                    <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" className="input" />
                                    <input name="telephone" value={form.telephone} onChange={handleChange} placeholder="Téléphone" className="input col-span-1 md:col-span-2" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="type" value="renseignement" checked={form.type === 'renseignement'} onChange={handleChange} />
                                        Renseignement
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="type" value="reservation" checked={form.type === 'reservation'} onChange={handleChange} />
                                        Réservation
                                    </label>
                                </div>
                                <div>
                                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="textarea w-full" rows={4} />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button type="button" onClick={closeModal} className="btn-secondary">Annuler</button>
                                    <button type="submit" className="btn-primary">Envoyer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
