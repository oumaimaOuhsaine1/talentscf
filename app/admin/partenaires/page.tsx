'use client'
import { API_BASE_URL } from '@/lib/api-config';


import { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, Loader2, Save, X, Globe, Image as ImageIcon, Upload } from 'lucide-react'
import { getToken } from '@/lib/auth'

export default function PartenairesManagement() {
    const [partners, setPartners] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [selectedPartner, setSelectedPartner] = useState<any | null>(null)
    const [formData, setFormData] = useState({ name: '', logo_url: '', website_url: '' })
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchPartners()
    }, [])

    const fetchPartners = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE_URL}/api/news/partnerships`)
            const data = await res.json()
            setPartners(data)
        } catch (error) {
            console.error('Error fetching partners:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (partner: any) => {
        setSelectedPartner(partner)
        setFormData({ name: partner.name, logo_url: partner.logo_url, website_url: partner.website_url || '' })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Voulez-vous vraiment supprimer ce partenaire ?')) return
        const token = getToken()
        try {
            await fetch(`${API_BASE_URL}/api/news/partnerships/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setPartners(partners.filter(p => p.id !== id))
        } catch (error) {
            console.error('Error deleting partner:', error)
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
            const res = await fetch(`${API_BASE_URL}/api/upload/image`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body
            })
            const result = await res.json()
            if (res.ok) {
                setFormData({ ...formData, logo_url: result.url })
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = getToken()
        const method = selectedPartner ? 'PUT' : 'POST'
        const url = selectedPartner
            ? `${API_BASE_URL}/api/news/partnerships/${selectedPartner.id}`
            : `${API_BASE_URL}/api/news/partnerships`

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
                fetchPartners()
                setShowForm(false)
                setSelectedPartner(null)
                setFormData({ name: '', logo_url: '', website_url: '' })
            }
        } catch (error) {
            console.error('Error saving partner:', error)
        }
    }

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Gestion des Partenariats
                    </h1>
                    <p className="text-muted-foreground mt-1">Gérez vos partenaires internationaux et leurs logos.</p>
                </div>
                <button
                    onClick={() => { setShowForm(true); setSelectedPartner(null); setFormData({ name: '', logo_url: '', website_url: '' }); }}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <Plus size={20} /> Nouveau Partenaire
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl p-8 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{selectedPartner ? 'Modifier' : 'Ajouter'} un Partenaire</h2>
                        <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Nom du partenaire</label>
                                <input required className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-1"><Globe size={14} /> Site Web (Optionnel)</label>
                                <input className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                    value={formData.website_url} onChange={e => setFormData({ ...formData, website_url: e.target.value })} placeholder="https://..." />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold flex items-center gap-1"><ImageIcon size={14} /> Logo du partenaire</label>
                                <div className="flex items-center gap-4">
                                    {formData.logo_url && (
                                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-border shadow-sm flex-shrink-0 flex items-center justify-center p-2">
                                            <img src={formData.logo_url} className="max-w-full max-h-full object-contain" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <label className={`flex items-center justify-center gap-2 w-full px-4 py-3 border border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload size={18} />}
                                            <span className="text-sm font-medium">{uploading ? 'Chargement...' : 'Choisir un logo local'}</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        </label>
                                        <p className="text-[10px] text-muted-foreground mt-1 ml-1 truncate max-w-xs">{formData.logo_url || 'Aucun logo'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">
                                <Save size={20} /> {selectedPartner ? 'Mettre à jour' : 'Enregistrer'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 border border-border rounded-xl font-bold hover:bg-muted transition-all">Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-muted-foreground font-medium">Chargement des partenaires...</p>
                    </div>
                ) : partners.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-muted-foreground">Aucun partenaire trouvé.</div>
                ) : (
                    partners.map((partner) => (
                        <div key={partner.id} className="bg-white dark:bg-gray-800 border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative">
                            <div className="flex justify-end gap-2 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(partner)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg shadow-sm bg-white border border-border"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(partner.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg shadow-sm bg-white border border-border"><Trash2 size={16} /></button>
                            </div>
                            <div className="h-24 flex items-center justify-center mb-4">
                                <img src={partner.logo_url} alt={partner.name} className="max-h-full max-w-full object-contain" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-foreground">{partner.name}</h3>
                                {partner.website_url && <a href={partner.website_url} target="_blank" className="text-xs text-primary hover:underline truncate block mt-1">{partner.website_url}</a>}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
