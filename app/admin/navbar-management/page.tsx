'use client'

import { useState, useEffect } from 'react'
import { getMenuData, saveMenuData, MenuItemConfig, DEFAULT_MENU } from '@/lib/menu-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Trash2, Plus, Edit2, Save, X, ChevronRight, ImageIcon } from 'lucide-react'

export default function NavbarManagement() {
  const [menuData, setMenuData] = useState<MenuItemConfig[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<MenuItemConfig>>({})
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    setMenuData(getMenuData().items)
  }, [])

  const handleSave = () => {
    saveMenuData({ items: menuData })
    alert('Menu navbarre sauvegardé avec succès!')
  }

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le menu par défaut?')) {
      setMenuData(DEFAULT_MENU.items)
      saveMenuData(DEFAULT_MENU)
    }
  }

  const handleEdit = (item: MenuItemConfig) => {
    setEditingId(item.id)
    setEditData({ ...item })
  }

  const handleSaveEdit = () => {
    if (!editingId) return

    const updateItem = (items: MenuItemConfig[]): MenuItemConfig[] => {
      return items.map(item => {
        if (item.id === editingId) {
          return { ...item, ...editData } as MenuItemConfig
        }
        return {
          ...item,
          children: item.children ? updateItem(item.children) : undefined,
        }
      })
    }

    setMenuData(updateItem(menuData))
    setEditingId(null)
    setEditData({})
  }

  const handleDeleteItem = (id: string) => {
    const deleteFromArray = (items: MenuItemConfig[]): MenuItemConfig[] => {
      return items
        .filter(item => item.id !== id)
        .map(item => ({
          ...item,
          children: item.children ? deleteFromArray(item.children) : undefined,
        }))
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément?')) {
      setMenuData(deleteFromArray(menuData))
    }
  }

  const handleAddChild = (parentId: string) => {
    const newChild: MenuItemConfig = {
      id: `item-${Date.now()}`,
      label: 'Nouvel élément',
      href: '/nouveau',
    }

    const addToParent = (items: MenuItemConfig[]): MenuItemConfig[] => {
      return items.map(item => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...(item.children || []), newChild],
          }
        }
        return {
          ...item,
          children: item.children ? addToParent(item.children) : undefined,
        }
      })
    }

    setMenuData(addToParent(menuData))
  }

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const MenuItem = ({ item, depth = 0 }: { item: MenuItemConfig; depth?: number }) => {
    const isEditing = editingId === item.id
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)

    return (
      <div className="mb-3" style={{ marginLeft: `${depth * 24}px` }}>
        <Card className={`p-4 ${isEditing ? 'border-primary bg-primary/5' : ''}`}>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <Input
                  value={editData.label || ''}
                  onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                  placeholder="Nom du menu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <Input
                  value={editData.href || ''}
                  onChange={(e) => setEditData({ ...editData, href: e.target.value })}
                  placeholder="/chemin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image (optionnel)</label>
                <Input
                  value={editData.image || ''}
                  onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                  placeholder="/path/to/image.jpg"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveEdit} size="sm" className="bg-primary">
                  <Save size={16} /> Enregistrer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingId(null)
                    setEditData({})
                  }}
                  size="sm"
                >
                  <X size={16} /> Annuler
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-3">
                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="text-foreground/60 hover:text-foreground"
                  >
                    <ChevronRight size={20} className={isExpanded ? 'rotate-90' : ''} />
                  </button>
                )}
                {!hasChildren && <div className="w-5" />}
                <div className="flex-1">
                  <p className="font-semibold text-primary">{item.label}</p>
                  <p className="text-sm text-foreground/60">{item.href}</p>
                  {item.image && (
                    <p className="text-xs text-foreground/50 flex items-center gap-1 mt-1">
                      <ImageIcon size={12} /> {item.image}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  title="Modifier"
                >
                  <Edit2 size={16} />
                </Button>
                {hasChildren && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddChild(item.id)}
                    title="Ajouter un sous-menu"
                  >
                    <Plus size={16} />
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          )}

          {hasChildren && isExpanded && (
            <div className="mt-4 space-y-2">
              {item.children?.map(child => (
                <MenuItem key={child.id} item={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Gestion de la Navbar</h1>
        <p className="text-foreground/70">Gérez les éléments du menu de navigation</p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Structure du Menu</h2>
        <div className="space-y-2">
          {menuData.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </Card>

      <div className="flex gap-4 flex-wrap">
        <Button onClick={handleSave} className="bg-primary">
          Enregistrer les modifications
        </Button>
        <Button onClick={handleReset} variant="outline">
          Réinitialiser par défaut
        </Button>
      </div>
    </div>
  )
}
