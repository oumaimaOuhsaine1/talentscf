'use client'

import { useState, useEffect } from 'react'
import { getPagesData, savePageData, PageData, addPage, updatePage, deletePage } from '@/lib/pages-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Trash2, Plus, Edit2, Save, X, Eye, EyeOff } from 'lucide-react'

export default function PagesManagement() {
  const [pages, setPages] = useState<PageData[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<PageData>>({})
  const [showForm, setShowForm] = useState(false)
  const [newPage, setNewPage] = useState<Partial<PageData>>({
    title: '',
    slug: '',
    description: '',
    content: '',
    isPublished: true,
  })

  useEffect(() => {
    setPages(getPagesData().pages)
  }, [])

  const handleAddPage = () => {
    if (!newPage.title || !newPage.slug) {
      alert('Veuillez remplir le titre et le slug')
      return
    }

    const page: PageData = {
      id: `page-${Date.now()}`,
      title: newPage.title || '',
      slug: newPage.slug || '',
      description: newPage.description || '',
      content: newPage.content || '',
      isPublished: newPage.isPublished ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addPage(page)
    setPages([...pages, page])
    setNewPage({ title: '', slug: '', description: '', content: '', isPublished: true })
    setShowForm(false)
    alert('Page créée avec succès!')
  }

  const handleEdit = (page: PageData) => {
    setEditingId(page.id)
    setEditData({ ...page })
  }

  const handleSaveEdit = () => {
    if (!editingId) return

    updatePage(editingId, editData)
    setPages(pages.map(p => (p.id === editingId ? { ...p, ...editData } : p) as PageData))
    setEditingId(null)
    setEditData({})
    alert('Page mise à jour!')
  }

  const handleDeletePage = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette page?')) {
      deletePage(id)
      setPages(pages.filter(p => p.id !== id))
    }
  }

  const togglePublish = (page: PageData) => {
    updatePage(page.id, { isPublished: !page.isPublished })
    setPages(pages.map(p => (p.id === page.id ? { ...p, isPublished: !p.isPublished } : p)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Gestion des Pages</h1>
          <p className="text-foreground/70">Créez, modifiez ou supprimez des pages</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-primary">
          <Plus size={16} /> Nouvelle Page
        </Button>
      </div>

      {/* Add New Page Form */}
      {showForm && (
        <Card className="p-6 border-primary bg-primary/5">
          <h2 className="text-xl font-semibold mb-4">Créer une nouvelle page</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <Input
                value={newPage.title || ''}
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                placeholder="Titre de la page"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug (URL)</label>
              <Input
                value={newPage.slug || ''}
                onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                placeholder="/chemin-page"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Input
                value={newPage.description || ''}
                onChange={(e) => setNewPage({ ...newPage, description: e.target.value })}
                placeholder="Courte description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contenu</label>
              <textarea
                value={newPage.content || ''}
                onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                placeholder="Contenu de la page"
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddPage} className="bg-primary">
                <Save size={16} /> Créer la page
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                <X size={16} /> Annuler
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Pages List */}
      <div className="grid gap-4">
        {pages.length === 0 ? (
          <Card className="p-8 text-center text-foreground/70">
            <p>Aucune page trouvée. Créez votre première page!</p>
          </Card>
        ) : (
          pages.map(page => (
            <Card
              key={page.id}
              className={`p-6 ${editingId === page.id ? 'border-primary bg-primary/5' : ''}`}
            >
              {editingId === page.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre</label>
                    <Input
                      value={editData.title || ''}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <Input
                      value={editData.slug || ''}
                      onChange={(e) => setEditData({ ...editData, slug: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Input
                      value={editData.description || ''}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contenu</label>
                    <textarea
                      value={editData.content || ''}
                      onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveEdit} className="bg-primary">
                      <Save size={16} /> Enregistrer
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingId(null)
                        setEditData({})
                      }}
                    >
                      <X size={16} /> Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-primary">{page.title}</h3>
                      {page.isPublished ? (
                        <Eye size={16} className="text-green-500" />
                      ) : (
                        <EyeOff size={16} className="text-foreground/50" />
                      )}
                    </div>
                    <p className="text-sm text-foreground/70 mb-2">{page.slug}</p>
                    <p className="text-sm text-foreground/60">{page.description}</p>
                    <p className="text-xs text-foreground/50 mt-2">
                      Modifié: {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublish(page)}
                      title={page.isPublished ? 'Dépublier' : 'Publier'}
                    >
                      {page.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(page)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePage(page.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
