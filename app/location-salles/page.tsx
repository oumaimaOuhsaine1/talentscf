'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import { Users, Wifi, Monitor, Coffee, Projector, AirVent, CheckCircle } from 'lucide-react'

interface Room {
    id: string
    name: string
    image: string
    capacity: number
    surface: string
    description: string
    equipments: string[]
    layout: string[]
}

const rooms: Room[] = [
    {
        id: 'salle-conference',
        name: 'Salle de Conférence',
        image: '/corporate-training-session.png',
        capacity: 50,
        surface: '80 m²',
        description: 'Salle spacieuse idéale pour les conférences, séminaires et formations de grande envergure.',
        equipments: [
            'Vidéoprojecteur HD',
            'Système audio professionnel',
            'Écran de projection motorisé',
            'Wifi haut débit',
            'Climatisation',
            'Tableau blanc interactif'
        ],
        layout: ['Théâtre', 'Classe', 'U', 'Cocktail']
    },
    {
        id: 'salle-formation',
        name: 'Salle de Formation',
        image: '/master-training.jpg',
        capacity: 25,
        surface: '50 m²',
        description: 'Espace modulable parfait pour les formations interactives et ateliers pratiques.',
        equipments: [
            'Écran LED 65"',
            'Paperboard',
            'Wifi haut débit',
            'Climatisation',
            'Tables modulables',
            'Chaises ergonomiques'
        ],
        layout: ['Classe', 'U', 'Îlots', 'Cercle']
    },
    {
        id: 'salle-reunion',
        name: 'Salle de Réunion',
        image: '/modern-office-tour.png',
        capacity: 12,
        surface: '30 m²',
        description: 'Salle intimiste pour réunions d\'équipe, entretiens et sessions de coaching.',
        equipments: [
            'Écran tactile 55"',
            'Système de visioconférence',
            'Wifi haut débit',
            'Climatisation',
            'Table de réunion ovale',
            'Espace café'
        ],
        layout: ['Table ovale', 'U', 'Face à face']
    },
    {
        id: 'salle-workshop',
        name: 'Salle Workshop',
        image: '/team-building-activities.png',
        capacity: 30,
        surface: '60 m²',
        description: 'Espace créatif conçu pour les ateliers collaboratifs et team building.',
        equipments: [
            'Murs d\'écriture',
            'Matériel créatif',
            'Wifi haut débit',
            'Climatisation',
            'Mobilier modulable',
            'Zone détente'
        ],
        layout: ['Îlots', 'Cercle', 'Libre', 'Cocktail']
    }
]

export default function LocationSallePage() {
    const [isDark, setIsDark] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        type: 'renseignement',
        message: ''
    })
    const [submitting, setSubmitting] = useState(false)

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
                {/* Banner Section */}
                <section className="relative h-[200px] w-full overflow-hidden bg-gradient-to-r from-[#003E6B] to-[#005A9C]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold text-white tracking-wider animate-fade-in-up text-center px-4">
                            Location de Salle
                        </h1>
                        <p className="text-white/90 mt-3 text-center text-sm max-w-2xl px-4">
                            Des espaces professionnels équipés pour vos formations, séminaires et événements
                        </p>
                    </div>
                </section>

                {/* Rooms Grid Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {rooms.map((room) => (
                                <div
                                    key={room.id}
                                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                                >
                                    {/* Room Image */}
                                    <div className="relative h-64 w-full overflow-hidden group">
                                        <Image
                                            src={room.image}
                                            alt={room.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-[#FF8A00] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                                            {room.capacity} personnes
                                        </div>
                                    </div>

                                    {/* Room Info */}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            {room.name}
                                        </h3>

                                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{room.capacity} pers.</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold">{room.surface}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                            {room.description}
                                        </p>

                                        {/* Equipments */}
                                        <div className="mb-4">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm flex items-center gap-2">
                                                <Monitor className="w-4 h-4 text-[#005A9C]" />
                                                Équipements
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {room.equipments.map((equipment, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
                                                    >
                                                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                                                        <span>{equipment}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Layout Options */}
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                                                Configurations disponibles
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {room.layout.map((layout, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-[#00AEEF]/10 text-[#005A9C] dark:bg-[#005A9C]/20 dark:text-[#00AEEF] rounded-full text-xs font-medium"
                                                    >
                                                        {layout}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <button
                                            onClick={() => { setSelectedRoom(room.id); setShowModal(true) }}
                                            className="mt-6 w-full bg-[#005A9C] hover:bg-[#003E6B] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-sm"
                                        >
                                            Réserver cette salle
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal - Reservation Form */}
                        {showModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg mx-4 p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Réserver / Renseignements</h3>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault()
                                        if (submitting) return
                                        setSubmitting(true)
                                        try {
                                            const payload = { ...form, room_id: selectedRoom }
                                            await fetch('/api/location-reservations', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(payload)
                                            })
                                            alert('Merci — votre demande a été envoyée.')
                                            setForm({ nom: '', prenom: '', telephone: '', type: 'renseignement', message: '' })
                                            setShowModal(false)
                                        } catch (err) {
                                            console.error(err)
                                            alert('Erreur lors de l\'envoi. Réessayez plus tard.')
                                        } finally { setSubmitting(false) }
                                    }}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom" required className="p-2 border rounded bg-white dark:bg-gray-700" />
                                            <input value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="Prénom" required className="p-2 border rounded bg-white dark:bg-gray-700" />
                                        </div>
                                        <div className="mt-3">
                                            <input value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} placeholder="Téléphone" required className="w-full p-2 border rounded bg-white dark:bg-gray-700" />
                                        </div>
                                        <div className="mt-3">
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input type="radio" name="type" value="renseignement" checked={form.type === 'renseignement'} onChange={(e) => setForm({ ...form, type: e.target.value })} />
                                                    <span className="ml-1">Renseignement</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="radio" name="type" value="reservation" checked={form.type === 'reservation'} onChange={(e) => setForm({ ...form, type: e.target.value })} />
                                                    <span className="ml-1">Réservation</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Votre message" rows={4} className="w-full p-2 border rounded bg-white dark:bg-gray-700" />
                                        </div>
                                        <div className="mt-4 flex items-center gap-3">
                                            <button type="submit" disabled={submitting} className="bg-[#005A9C] text-white px-4 py-2 rounded">
                                                {submitting ? 'Envoi...' : 'Envoyer'}
                                            </button>
                                            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">Annuler</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Additional Info Section */}
                        <div className="mt-16 bg-gradient-to-r from-[#005A9C]/10 to-[#00AEEF]/10 dark:from-[#005A9C]/20 dark:to-[#00AEEF]/20 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                Services Inclus
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#FF8A00] p-3 rounded-lg">
                                        <Wifi className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Wifi Haut Débit</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Connexion internet fibre optique</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#00AEEF] p-3 rounded-lg">
                                        <Coffee className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Espace Café</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Pause-café et rafraîchissements</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#005A9C] p-3 rounded-lg">
                                        <AirVent className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Climatisation</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Confort optimal toute l'année</p>
                                    </div>
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
