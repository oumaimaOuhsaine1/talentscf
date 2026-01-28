'use client'

import { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, Loader2, Save, X, Image as ImageIcon, Upload } from 'lucide-react'
import { getToken } from '@/lib/auth'

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    order_index: number;
}

export default function TeamManagement() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        image: '',
        order_index: 0
    })
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchMembers()
    }, [])

    const fetchMembers = async () => {
        setLoading(true)
        try {
            const res = await fetch('http://127.0.0.1:5000/api/team')
            const data = await res.json()
            if (Array.isArray(data)) {
                setMembers(data)
            }
        } catch (error) {
            console.error('Error fetching team members:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const token = getToken()
        const body = new FormData()
        body.append('image', file)

        try {
            const res = await fetch('http://127.0.0.1:5000/api/upload/image', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body
            })
            const result = await res.json()
            if (res.ok) {
                setFormData({ ...formData, image: result.url })
            } else {
                alert('Erreur upload: ' + result.message)
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Erreur de connexion lors de l\'upload')
        } finally {
            setUploading(false)
        }
    }

    const handleEdit = (member: TeamMember) => {
        setSelectedMember(member)
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio,
            image: member.image,
            order_index: member.order_index
        })
        setShowForm(true)
    }

    const [deleteModal, setDeleteModal] = useState({ show: false, id: '' })

    const confirmDelete = async () => {
        if (!deleteModal.id) return
        const token = getToken()
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/team/${deleteModal.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.ok) {
                setMembers(members.filter(m => m.id !== deleteModal.id))
                setDeleteModal({ show: false, id: '' })
            }
        } catch (error) {
            console.error('Error deleting member:', error)
        }
    }

    const handleDelete = (id: string) => {
        setDeleteModal({ show: true, id })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = getToken()
        const method = selectedMember ? 'PUT' : 'POST'
        const url = selectedMember
            ? `http://127.0.0.1:5000/api/team/${selectedMember.id}`
            : 'http://127.0.0.1:5000/api/team'

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                fetchMembers()
                setShowForm(false)
                setSelectedMember(null)
                setFormData({ name: '', role: '', bio: '', image: '', order_index: members.length })
            }
        } catch (error) {
            console.error('Error saving member:', error)
        }
    }

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                        Gestion de l'Équipe
                    </h1>
                    <p className="text-muted-foreground mt-1">Gérez les membres de votre équipe dynamique.</p>
                </div>
                <button
                    onClick={() => {
                        setSelectedMember(null)
                        setFormData({ name: '', role: '', bio: '', image: '', order_index: members.length })
                        setShowForm(true)
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all"
                >
                    <Plus size={20} />
                    Ajouter un membre
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto text-orange-600">
                            <Trash2 size={24} />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-bold">Confirmer la suppression</h3>
                            <p className="text-sm text-muted-foreground">
                                Êtes-vous sûr de vouloir supprimer ce membre de l'équipe ? Cette action est irréversible.
                            </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setDeleteModal({ show: false, id: '' })}
                                className="flex-1 px-4 py-2 border border-border rounded-xl font-bold hover:bg-muted transition-all"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl p-8 shadow-xl animate-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{selectedMember ? 'Modifier le membre' : 'Ajouter un membre'}</h2>
                        <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Nom complet</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Rôle / Titre</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Ordre d'affichage</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                    value={formData.order_index}
                                    onChange={e => setFormData({ ...formData, order_index: e.target.value === '' ? 0 : parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1 flex items-center gap-1"><ImageIcon size={14} /> Photo du membre</label>
                                <div className="flex items-center gap-4">
                                    {formData.image && (
                                        <div className="w-16 h-16 rounded-full overflow-hidden border border-border shadow-sm flex-shrink-0">
                                            <img src={formData.image} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <label className={`flex items-center justify-center gap-2 w-full px-4 py-3 border border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload size={18} />}
                                            <span className="text-sm font-medium">{uploading ? 'Chargement...' : 'Charger une photo'}</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Biographie / Description</label>
                            <textarea
                                className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                                rows={4}
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            />
                        </div>
                        <div className="flex gap-4 pt-2">
                            <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20">
                                <Save size={20} />
                                {selectedMember ? 'Mettre à jour' : 'Enregistrer'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 border border-border rounded-xl font-bold hover:bg-muted transition-all">
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl overflow-hidden shadow-lg p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
                        <p className="text-muted-foreground font-medium">Chargement des membres...</p>
                    </div>
                ) : (
                    members.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-muted-foreground font-medium">
                            Aucun membre dans l'équipe pour le moment.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {members.map((member) => (
                                <div key={member.id} className="bg-muted/30 border border-border rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-all group relative">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 bg-white">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{member.name}</h3>
                                        <p className="text-xs text-primary font-bold uppercase tracking-wider">{member.role}</p>
                                    </div>
                                    <div className="bg-gray-200 h-[1px] w-full my-2" />
                                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{member.bio}</p>
                                    <div className="flex gap-2 pt-2 mt-auto">
                                        <button
                                            onClick={() => handleEdit(member)}
                                            className="p-2 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                                            title="Modifier"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
