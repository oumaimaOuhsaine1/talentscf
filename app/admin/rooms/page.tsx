'use client'
import { API_BASE_URL } from '@/lib/api-config';


import { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, Loader2, Save, X, Building2, Users, Maximize, Monitor, Upload } from 'lucide-react'
import { getToken } from '@/lib/auth'

interface Room {
    id: string;
    name: string;
    image: string;
    capacity: number;
    surface: string;
    description: string;
    equipments: string[];
    images: string[];
}

export default function RoomsManagement() {
    const [rooms, setRooms] = useState<Room[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        capacity: 0,
        surface: 0,
        description: '',
        images: [] as string[],
        equipments: ''
    })

    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/rooms`)
            const data = await res.json()
            setRooms(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error fetching rooms:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (room: Room) => {
        setSelectedRoom(room)
        setFormData({
            name: room.name,
            capacity: room.capacity,
            surface: parseInt(room.surface) || 0,
            description: room.description,
            images: room.images || [],
            equipments: room.equipments?.join(', ') || ''
        })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Voulez-vous vraiment supprimer cette salle ?')) return
        const token = getToken()
        try {
            await fetch(`${API_BASE_URL}/api/rooms/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setRooms(rooms.filter(r => r.id !== id))
        } catch (error) {
            console.error('Error deleting room:', error)
        }
    }

    // Single image upload removed as per request

    const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        const token = getToken()
        const uploadedUrls: string[] = []

        try {
            for (let i = 0; i < files.length; i++) {
                const body = new FormData()
                body.append('image', files[i])
                const res = await fetch(`${API_BASE_URL}/api/upload/image`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body
                })
                const result = await res.json()
                if (res.ok) {
                    uploadedUrls.push(result.url)
                }
            }
            setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }))
        } catch (error) {
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (url: string) => {
        setFormData(prev => ({ ...prev, images: prev.images.filter(img => img !== url) }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = getToken()
        const method = selectedRoom ? 'PUT' : 'POST'
        const url = selectedRoom
            ? `${API_BASE_URL}/api/rooms/${selectedRoom.id}`
            : `${API_BASE_URL}/api/rooms`

        const payload = {
            ...formData,
            surface: `${formData.surface} m²`,
            image: formData.images[0] || '', // Use first gallery image as main image
            equipments: formData.equipments.split(',').map(e => e.trim()).filter(e => e !== '')
        }

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            })
            if (res.ok) {
                fetchRooms()
                setShowForm(false)
                setSelectedRoom(null)
                setFormData({ name: '', capacity: 0, surface: 0, description: '', images: [], equipments: '' })
            }
        } catch (error) {
            console.error('Error saving room:', error)
        }
    }

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Gestion des Salles
                    </h1>
                    <p className="text-muted-foreground mt-1">Gérez vos espaces de location et leurs services inclus.</p>
                </div>
                <button
                    onClick={() => { setShowForm(true); setSelectedRoom(null); setFormData({ name: '', capacity: 0, surface: 0, description: '', images: [], equipments: '' }); }}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all text-sm"
                >
                    <Plus size={20} /> Nouvelle Salle
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl p-8 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{selectedRoom ? 'Modifier' : 'Ajouter'} une Salle</h2>
                        <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Nom de la salle</label>
                                <input required className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Ex: Salle de Conférence" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Capacité (personnes)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                    value={isNaN(formData.capacity) ? '' : formData.capacity}
                                    onChange={e => {
                                        const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                                        setFormData({ ...formData, capacity: val });
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Surface (m²)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none pr-12"
                                        value={formData.surface === 0 ? '' : formData.surface}
                                        onChange={e => setFormData({ ...formData, surface: parseInt(e.target.value) || 0 })}
                                        placeholder="Ex: 80"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">m²</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Galerie d'images (Supporte plusieurs sélections)</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                {formData.images.map((url, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border group">
                                        <img src={url} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(url)}
                                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                <label className={`flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    {uploading ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : <Plus size={24} className="text-muted-foreground" />}
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleMultipleImagesUpload} />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Services Inclus (séparés par des virgules)</label>
                            <input className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                value={formData.equipments} onChange={e => setFormData({ ...formData, equipments: e.target.value })} placeholder="Ex: Wifi, Vidéoprojecteur, Café" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Description</label>
                            <textarea rows={3} className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none resize-none"
                                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Description détaillée de l'espace..." />
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">
                                <Save size={20} /> {selectedRoom ? 'Mettre à jour' : 'Enregistrer'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 border border-border rounded-xl font-bold hover:bg-muted transition-all">Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center">
                        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Chargement des espaces...</p>
                    </div>
                ) : (
                    rooms.map(room => (
                        <div key={room.id} className="bg-white dark:bg-gray-800 border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                            <div className="relative h-48 w-full group-hover:cursor-pointer">
                                <img src={(room.images && room.images[0]) || room.image || '/images/image.png'} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={(e) => { e.stopPropagation(); handleEdit(room); }} className="p-2 bg-white/90 dark:bg-gray-900/90 text-blue-600 rounded-lg shadow-sm hover:scale-110 mb-1"><Edit size={16} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(room.id); }} className="p-2 bg-white/90 dark:bg-gray-900/90 text-red-600 rounded-lg shadow-sm hover:scale-110 mb-1"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-extrabold text-foreground mb-4">{room.name}</h3>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                        <Users size={14} className="text-primary" /> {room.capacity} pers.
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                        <Maximize size={14} className="text-primary" /> {room.surface}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest flex items-center gap-1 mb-2">
                                        <Monitor size={12} /> Services Inclus
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {room.equipments?.map((eq, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-primary/5 text-primary border border-primary/20 rounded-md text-[10px] font-bold">{eq}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
