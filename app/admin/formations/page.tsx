'use client'

import { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, Loader2, Save, X, Image as ImageIcon, Calendar, Upload } from 'lucide-react'
import { getToken } from '@/lib/auth'

interface Formation {
  id: string;
  title: string;
  description: string;
  category: string;
  trainer: string;
  price: string;
  image_url: string;
  date_formation: string;
}

export default function FormationsManagement() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Soft Skills',
    trainer: '',
    price: '',
    description: '',
    image_url: '',
    date_formation: ''
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchFormations()
  }, [])

  const fetchFormations = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://127.0.0.1:5000/api/formations')
      const data = await res.json()
      // Ensure data is an array
      if (Array.isArray(data)) {
        setFormations(data)
      } else {
        setFormations([])
        console.error('Data received is not an array:', data)
      }
    } catch (error) {
      console.error('Error fetching formations:', error)
      setFormations([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (formation: Formation) => {
    setSelectedFormation(formation)
    setFormData({
      title: formation.title,
      category: formation.category,
      trainer: formation.trainer,
      price: formation.price,
      description: formation.description,
      image_url: formation.image_url || '',
      date_formation: formation.date_formation || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette formation ?')) return
    const token = getToken()
    try {
      await fetch(`http://127.0.0.1:5000/api/formations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setFormations(formations.filter(f => f.id !== id))
    } catch (error) {
      console.error('Error deleting formation:', error)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = getToken()
    const method = selectedFormation ? 'PUT' : 'POST'
    const url = selectedFormation
      ? `http://127.0.0.1:5000/api/formations/${selectedFormation.id}`
      : 'http://127.0.0.1:5000/api/formations'

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
        fetchFormations()
        setShowForm(false)
        setSelectedFormation(null)
        setFormData({ title: '', category: 'Soft Skills', trainer: '', price: '', description: '', image_url: '', date_formation: '' })
      }
    } catch (error) {
      console.error('Error saving formation:', error)
    }
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Gestion du Catalogue Formations
          </h1>
          <p className="text-muted-foreground mt-1">Gérez vos formations et actualités de formation ici.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              import('xlsx').then(xlsx => {
                const worksheet = xlsx.utils.json_to_sheet(formations.map(f => ({
                  Titre: f.title,
                  Catégorie: f.category,
                  Formateur: f.trainer,
                  Prix: f.price,
                  Description: f.description,
                })));
                const workbook = xlsx.utils.book_new();
                xlsx.utils.book_append_sheet(workbook, worksheet, "Formations");
                xlsx.writeFile(workbook, "Catalogue_Formations.xlsx");
              })
            }}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 hover:scale-105 transition-all"
          >
            <Upload size={20} className="rotate-180" />
            Exporter Excel
          </button>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setSelectedFormation(null);
              setFormData({ title: '', category: 'Soft Skills', trainer: '', price: '', description: '', image_url: '', date_formation: '' });
            }}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            <Plus size={20} />
            Nouvelle Formation
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl p-8 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{selectedFormation ? 'Modifier' : 'Ajouter'} une Formation</h2>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Titre de la formation</label>
                <input
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Fondamentaux de la PNL"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Catégorie</label>
                <select
                  className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>PNL</option>
                  <option>Coaching</option>
                  <option>Soft Skills</option>
                  <option>Management</option>
                  <option>Langues</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1 flex items-center gap-1"><Calendar size={14} /> Date de formation</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.date_formation}
                  onChange={e => setFormData({ ...formData, date_formation: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1 flex items-center gap-1"><ImageIcon size={14} /> Image de la formation</label>
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
                    <p className="text-[10px] text-muted-foreground mt-1 ml-1 truncate max-w-xs">{formData.image_url || 'Aucun fichier'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Formateur</label>
                <input
                  className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.trainer}
                  onChange={e => setFormData({ ...formData, trainer: e.target.value })}
                  placeholder="Nom du formateur"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Prix (MAD)</label>
                <input
                  className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Ex: 2500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Description / Contenu</label>
              <textarea
                className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                rows={4}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Détaillez le contenu de la formation..."
              />
            </div>
            <div className="flex gap-4 pt-2">
              <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">
                <Save size={20} />
                {selectedFormation ? 'Mettre à jour' : 'Enregistrer'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 border border-border rounded-xl font-bold hover:bg-muted transition-all">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl overflow-hidden shadow-lg">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground font-medium">Chargement du catalogue...</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden p-4">
              {formations.map((f) => (
                <div key={f.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-border shadow-sm space-y-4 relative overflow-hidden">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-border flex-shrink-0 bg-muted flex items-center justify-center">
                      {f.image_url ? (
                        <img src={f.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="text-muted-foreground w-8 h-8" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-black text-foreground text-sm line-clamp-2">{f.title}</h3>
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 whitespace-nowrap ml-2">
                          {f.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 font-medium">{f.trainer || 'Formateur non spécifié'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-2 border-y border-border/50 border-dashed">
                    <div className="text-xs font-bold text-foreground/80 flex items-center gap-1.5">
                      <Calendar size={12} className="text-primary" />
                      {f.date_formation ? new Date(f.date_formation).toLocaleDateString() : 'Date à définir'}
                    </div>
                    <div className="text-xs font-black text-primary text-right">
                      {f.price ? `${f.price} MAD` : 'Gratuit'}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(f)}
                      className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit size={14} /> Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="flex-1 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-bold hover:bg-orange-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} /> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted font-bold text-sm uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="text-left px-8 py-4">Formation</th>
                    <th className="text-left px-8 py-4">Catégorie</th>
                    <th className="text-left px-8 py-4">Prix</th>
                    <th className="text-right px-8 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {formations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-12 text-center text-muted-foreground">
                        Aucune formation trouvée. Cliquez sur "Nouvelle Formation" pour commencer.
                      </td>
                    </tr>
                  ) : (
                    formations.map((f) => (
                      <tr key={f.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            {f.image_url ? (
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                                <img src={f.image_url} alt="" className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border">
                                <ImageIcon size={20} className="text-muted-foreground" />
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-foreground">{f.title}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[200px]">{f.trainer}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                            {f.category}
                          </span>
                        </td>
                        <td className="px-8 py-5 font-bold text-primary">{f.price ? `${f.price} MAD` : 'Gratuit'}</td>
                        <td className="px-8 py-5">
                          <div className="flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(f)}
                              className="p-2.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(f.id)}
                              className="px-3 py-2 bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white rounded-xl transition-all shadow-sm text-[10px] font-black uppercase tracking-wider"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
