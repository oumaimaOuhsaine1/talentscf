'use client'

import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useState, useEffect } from 'react'
import { Users, Wifi, Monitor, Coffee, Projector, AirVent, CheckCircle, Loader2, ChevronLeft, ChevronRight, X, Maximize2, Maximize } from 'lucide-react'

interface Room {
    id: string
    name: string
    image: string
    images: string[]
    capacity: number
    surface: string
    description: string
    equipments: string[]
}

const FETCH_URL = 'http://127.0.0.1:5000/api/rooms'

export default function LocationSallePage() {
    const [isDark, setIsDark] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [form, setForm] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        type: 'renseignement' as 'renseignement' | 'reservation',
        date: '',
        duration: '1',
        message: ''
    })
    const [submitting, setSubmitting] = useState(false)

    const [rooms, setRooms] = useState<Room[]>([])
    const [roomsLoading, setRoomsLoading] = useState(true)

    // Lightbox State
    const [activeGalleryRoom, setActiveGalleryRoom] = useState<Room | null>(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
        fetchRooms()
    }, [])

    const fetchRooms = async () => {
        try {
            const res = await fetch(FETCH_URL)
            const data = await res.json()
            const sanitizedData = Array.isArray(data) ? data.map((room: any) => ({
                ...room,
                images: Array.isArray(room.images) ? room.images : []
            })) : []
            setRooms(sanitizedData)
        } catch (error) {
            console.error('Error fetching rooms:', error)
        } finally {
            setRoomsLoading(false)
        }
    }



    const toggleTheme = () => {
        const html = document.documentElement
        html.classList.toggle('dark')
        setIsDark(!isDark)
        localStorage.setItem('theme', isDark ? 'light' : 'dark')
    }

    const openLightbox = (room: Room, index: number = 0) => {
        const sanitizedRoom = {
            ...room,
            images: Array.isArray(room.images) && room.images.length > 0
                ? room.images
                : (room.image ? [room.image] : [])
        }
        setActiveGalleryRoom(sanitizedRoom)
        setActiveImageIndex(index)
    }

    const closeLightbox = () => {
        setActiveGalleryRoom(null)
        setActiveImageIndex(0)
    }

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (!activeGalleryRoom || !activeGalleryRoom.images) return
        setActiveImageIndex((prev) => (prev + 1) % activeGalleryRoom.images.length)
    }

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (!activeGalleryRoom || !activeGalleryRoom.images) return
        setActiveImageIndex((prev) => (prev - 1 + activeGalleryRoom.images.length) % activeGalleryRoom.images.length)
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

            <main className="flex-1">
                {/* Banner Section */}
                <section className="relative h-[250px] w-full overflow-hidden bg-gradient-to-r from-[#003E6B] to-[#005A9C]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight animate-fade-in-up text-center px-4 drop-shadow-lg">
                            Nos Espaces de Formation
                        </h1>
                        <p className="text-white/90 mt-4 text-center text-lg max-w-2xl px-4 font-medium">
                            Découvrez des salles modernes et équipées au cœur d'un environnement professionnel.
                        </p>
                    </div>
                </section>

                {/* Rooms Grid Section */}
                <section className="py-20 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {roomsLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                                <p className="text-muted-foreground font-medium">Chargement de nos espaces...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {rooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 flex flex-col"
                                    >
                                        {/* Room Image - Clicking opens lightbox */}
                                        <div
                                            className="relative h-72 w-full overflow-hidden cursor-pointer"
                                            onClick={() => openLightbox(room, 0)}
                                        >
                                            <Image
                                                src={(room.images && room.images[0]) || room.image || '/images/image.png'}
                                                alt={room.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/50">
                                                    <Maximize2 className="text-white w-8 h-8" />
                                                </div>
                                            </div>
                                            <div className="absolute top-6 right-6 bg-primary text-white px-5 py-2 rounded-full font-bold text-sm shadow-xl backdrop-blur-sm border border-white/20">
                                                {room.capacity} personnes
                                            </div>
                                        </div>

                                        {/* Room Info */}
                                        <div className="p-8 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                                                    {room.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-[#005A9C] dark:text-[#00AEEF] font-bold">
                                                    <Maximize2 size={18} />
                                                    <span>{room.surface.includes('m²') ? room.surface : `${room.surface} m²`}</span>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed line-clamp-3">
                                                {room.description}
                                            </p>



                                            {/* Mini Gallery (Previews) */}
                                            {room.images && room.images.length > 1 && (
                                                <div className="mb-8">
                                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Galerie Photos</h4>
                                                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                                        {room.images.map((img, i) => (
                                                            <div
                                                                key={i}
                                                                className="relative w-20 h-14 flex-shrink-0 cursor-pointer rounded-xl overflow-hidden ring-2 ring-transparent hover:ring-primary transition-all shadow-sm"
                                                                onClick={(e) => { e.stopPropagation(); openLightbox(room, i); }}
                                                            >
                                                                <Image src={img} alt={`${room.name} ${i}`} fill className="object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-auto space-y-6">
                                                <div className="grid grid-cols-2 gap-3">
                                                    {room.equipments.slice(0, 4).map((equipment, index) => (
                                                        <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{equipment}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={() => { setSelectedRoomId(room.id); setShowModal(true) }}
                                                    className="w-full bg-gradient-to-r from-[#005A9C] to-[#00AEEF] hover:from-[#003E6B] hover:to-[#005A9C] text-white font-black py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95"
                                                >
                                                    Réserver cette salle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Lightbox / Slider Overlay */}
                {activeGalleryRoom && (
                    <div
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 z-[110]"
                            onClick={closeLightbox}
                        >
                            <X size={40} />
                        </button>

                        <div className="relative w-full max-w-5xl aspect-video px-4" onClick={(e) => e.stopPropagation()}>
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <Image
                                    src={activeGalleryRoom.images[activeImageIndex]}
                                    alt={activeGalleryRoom.name}
                                    fill
                                    className="object-contain"
                                    priority
                                />

                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-10">
                                    <h4 className="text-2xl font-bold text-white mb-2">{activeGalleryRoom.name}</h4>
                                    <p className="text-white/60">Image {activeImageIndex + 1} sur {activeGalleryRoom.images.length}</p>
                                </div>
                            </div>

                            {/* Navigation Controls */}
                            <button
                                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20"
                                onClick={prevImage}
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20"
                                onClick={nextImage}
                            >
                                <ChevronRight size={32} />
                            </button>
                        </div>

                        {/* Thumbnails Strip */}
                        <div className="absolute bottom-10 flex gap-3 px-4 overflow-x-auto max-w-full no-scrollbar" onClick={(e) => e.stopPropagation()}>
                            {activeGalleryRoom.images.map((img, i) => (
                                <div
                                    key={i}
                                    className={`relative w-24 h-16 rounded-lg overflow-hidden cursor-pointer transition-all ${i === activeImageIndex ? 'ring-4 ring-primary scale-110 shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                                    onClick={() => setActiveImageIndex(i)}
                                >
                                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modal - Reservation Form */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-xl mx-4 p-10 shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-3xl font-black bg-gradient-to-r from-[#005A9C] to-[#00AEEF] bg-clip-text text-transparent">
                                    Votre Demande
                                </h3>
                                <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                    <X size={28} />
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={async (e) => {
                                e.preventDefault()
                                if (submitting) return
                                setSubmitting(true)
                                try {
                                    const room = rooms.find(r => r.id === selectedRoomId)
                                    const payload = {
                                        room_id: selectedRoomId,
                                        room_name: room?.name || 'Inconnue',
                                        last_name: form.nom,
                                        first_name: form.prenom,
                                        phone: form.telephone,
                                        type: form.type,
                                        reservation_date: form.type === 'reservation' ? form.date : undefined,
                                        duration: form.type === 'reservation' ? parseInt(form.duration) : undefined,
                                        message: form.message
                                    }
                                    await fetch('http://127.0.0.1:5000/api/rooms/reservations', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(payload)
                                    })

                                    setShowModal(false)
                                    setShowSuccessModal(true)
                                    setForm({ nom: '', prenom: '', telephone: '', type: 'renseignement', date: '', duration: '1', message: '' })
                                } catch (err) {
                                    console.error(err)
                                    alert('Erreur lors de l\'envoi.')
                                } finally { setSubmitting(false) }
                            }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Nom</label>
                                        <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="votre nom" required className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary/20 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Prénom</label>
                                        <input value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="votre prénom" required className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary/20 outline-none transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Téléphone</label>
                                    <input value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} placeholder="numéro de téléphone" required className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary/20 outline-none transition-all" />
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
                                    <label className={`flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all border-2 ${form.type === 'renseignement' ? 'bg-primary/10 border-primary text-primary' : 'bg-white dark:bg-gray-900 border-transparent text-gray-500'}`}>
                                        <input type="radio" name="type" className="hidden" value="renseignement" checked={form.type === 'renseignement'} onChange={(e) => setForm({ ...form, type: e.target.value as 'renseignement' | 'reservation' })} />
                                        <span className="font-bold">Info</span>
                                    </label>
                                    <label className={`flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all border-2 ${form.type === 'reservation' ? 'bg-primary/10 border-primary text-primary' : 'bg-white dark:bg-gray-900 border-transparent text-gray-500'}`}>
                                        <input type="radio" name="type" className="hidden" value="reservation" checked={form.type === 'reservation'} onChange={(e) => setForm({ ...form, type: e.target.value as 'renseignement' | 'reservation' })} />
                                        <span className="font-bold">Réserver</span>
                                    </label>
                                </div>

                                {form.type === 'reservation' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Date</label>
                                            <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setForm({ ...form, date: e.target.value })} required className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary/20 outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Durée (jours)</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={form.duration}
                                                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary/20 outline-none"
                                                placeholder="Ex: 3"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">Message</label>
                                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Vos besoins spécifiques..." rows={3} className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800/50 focus:ring-4 focus:ring-primary/20 outline-none resize-none" />
                                </div>

                                <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-[#005A9C] to-[#00AEEF] text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-2xl transition-all disabled:opacity-50">
                                    {submitting ? 'Envoi...' : 'Envoyer la demande'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Success Modal */}
                {showSuccessModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-sm mx-4 p-10 text-center shadow-2xl animate-in zoom-in-95">
                            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-3xl font-black mb-4">C'est envoyé !</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">
                                Nous avons bien reçu votre demande. Notre équipe reviendra vers vous très rapidement.
                            </p>
                            <button onClick={() => setShowSuccessModal(false)} className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-black py-4 rounded-2xl hover:scale-105 transition-all">
                                Super, merci !
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
