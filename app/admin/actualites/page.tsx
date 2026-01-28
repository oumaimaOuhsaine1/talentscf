'use client'
import { API_BASE_URL } from '@/lib/api-config';


import { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, Loader2, Save, X, Calendar, MapPin, Link as LinkIcon, AlertCircle, Upload, ImageIcon } from 'lucide-react'
import { getToken } from '@/lib/auth'

type Section = 'events' | 'opportunities' | 'announcements'

export default function ActualitesManagement() {
    const [activeTab, setActiveTab] = useState<Section>('events')
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [selectedItem, setSelectedItem] = useState<any | null>(null)

    // States for shared form data
    const [formData, setFormData] = useState<any>({})
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [activeTab])

    const fetchData = async () => {
        setLoading(true)
        try {
            const endpoint = activeTab === 'events' ? 'events' : activeTab === 'opportunities' ? 'opportunities' : 'announcements'
            const res = await fetch(`${API_BASE_URL}/api/news/${endpoint}`)
            const items = await res.json()
            setData(Array.isArray(items) ? items : [])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (item: any) => {
        setSelectedItem(item)
        setFormData({ ...item })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Voulez-vous vraiment supprimer cet élément ?')) return
        const token = getToken()
        const endpoint = activeTab === 'events' ? 'events' : activeTab === 'opportunities' ? 'opportunities' : 'announcements'
        try {
            await fetch(`${API_BASE_URL}/api/news/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setData(data.filter(i => i.id !== id))
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = getToken()
        const endpoint = activeTab === 'events' ? 'events' : activeTab === 'opportunities' ? 'opportunities' : 'announcements'
        const method = selectedItem ? 'PUT' : 'POST'
        const url = selectedItem
            ? `${API_BASE_URL}/api/news/${endpoint}/${selectedItem.id}`
            : `${API_BASE_URL}/api/news/${endpoint}`

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
                fetchData()
                setShowForm(false)
                setSelectedItem(null)
                setFormData({})
            }
        } catch (error) {
            console.error('Error saving:', error)
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
                setFormData({ ...formData, image_url: result.url })
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

    const openNewForm = () => {
        setSelectedItem(null)
        if (activeTab === 'events') {
            setFormData({ title: '', description: '', event_date: '', location: '', image_url: '' })
        } else if (activeTab === 'opportunities') {
            setFormData({ title: '', description: '', deadline: '', link: '', image_url: '' })
        } else {
            setFormData({ title: '', content: '', importance: 'normal', image_url: '' })
        }
        setShowForm(true)
    }

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Gestion des Actualités
                    </h1>
                    <p className="text-muted-foreground mt-1">Gérez les événements, opportunités et annonces du centre.</p>
                </div>
                <button
                    onClick={openNewForm}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <Plus size={20} />
                    Ajouter {activeTab === 'events' ? 'un événement' : activeTab === 'opportunities' ? 'une opportunité' : 'une annonce'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-muted/50 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('events')}
                    className={`px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'events' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Événements
                </button>
                <button
                    onClick={() => setActiveTab('opportunities')}
                    className={`px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'opportunities' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Opportunités
                </button>
                <button
                    onClick={() => setActiveTab('announcements')}
                    className={`px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'announcements' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Annonces
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl p-8 shadow-xl animate-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{selectedItem ? 'Modifier' : 'Ajouter'} {activeTab === 'events' ? 'un Événement' : activeTab === 'opportunities' ? 'une Opportunité' : 'une Annonce'}</h2>
                        <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Titre</label>
                                <input required className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                    value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            {activeTab === 'events' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold ml-1 italic flex items-center gap-1"><Calendar size={14} /> Date de l'événement</label>
                                        <input type="date" required className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.event_date || ''} onChange={e => setFormData({ ...formData, event_date: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold ml-1 flex items-center gap-1"><MapPin size={14} /> Lieu</label>
                                        <input className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                </>
                            )}

                            {activeTab === 'opportunities' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold ml-1 italic flex items-center gap-1"><Calendar size={14} /> Date limite</label>
                                        <input type="date" className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.deadline || ''} onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold ml-1 flex items-center gap-1"><LinkIcon size={14} /> Lien (URL)</label>
                                        <input className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                                    </div>
                                </>
                            )}

                            {activeTab === 'announcements' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Importance</label>
                                    <select className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                        value={formData.importance || 'normal'} onChange={e => setFormData({ ...formData, importance: e.target.value })}>
                                        <option value="normal">Normale</option>
                                        <option value="important">Importante (Alerte)</option>
                                    </select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1 flex items-center gap-1">
                                    <ImageIcon size={14} /> Image de couverture
                                </label>
                                <div className="flex items-center gap-4">
                                    {formData.image_url && (
                                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-border shadow-sm flex-shrink-0">
                                            <img src={formData.image_url} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <label className={`flex items-center justify-center gap-2 w-full px-4 py-3 border border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                            {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload size={18} />}
                                            <span className="text-sm font-medium">{uploading ? 'Chargement...' : 'Choisir une image locale'}</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        </label>
                                        <p className="text-[10px] text-muted-foreground mt-1 ml-1 truncate max-w-xs">{formData.image_url || 'Aucun fichier sélectionné'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1">Description / Contenu</label>
                            <textarea rows={4} className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none"
                                value={activeTab === 'announcements' ? formData.content : formData.description || ''}
                                onChange={e => activeTab === 'announcements' ? setFormData({ ...formData, content: e.target.value }) : setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">
                                <Save size={20} /> {selectedItem ? 'Mettre à jour' : 'Enregistrer'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 border border-border rounded-xl font-bold hover:bg-muted transition-all">Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl overflow-hidden shadow-lg">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-muted-foreground font-medium">Chargement...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted font-bold text-sm uppercase text-muted-foreground border-b border-border">
                                    <th className="text-left px-8 py-4">Titre</th>
                                    <th className="text-left px-8 py-4">{activeTab === 'events' ? 'Date Event' : activeTab === 'opportunities' ? 'Deadline' : 'Importance'}</th>
                                    <th className="text-right px-8 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {data.length === 0 ? (
                                    <tr><td colSpan={3} className="px-8 py-12 text-center text-muted-foreground">Aucun élément trouvé.</td></tr>
                                ) : (
                                    data.map((item) => (
                                        <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    {item.image_url && <div className="w-10 h-10 rounded overflow-hidden shadow-sm"><img src={item.image_url} className="w-full h-full object-cover" /></div>}
                                                    <span className="font-bold">{item.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                {activeTab === 'events' ? item.event_date : activeTab === 'opportunities' ? item.deadline || '-' : (
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.importance === 'important' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                                        {item.importance}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
