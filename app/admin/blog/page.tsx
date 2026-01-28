'use client'

import { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, Loader2, Save, X, Image as ImageIcon, Calendar, Sparkles, Wand2, Eye, Upload } from 'lucide-react'
import { getToken } from '@/lib/auth'
import Link from 'next/link'

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    category: string;
    read_time: string;
}

export default function BlogManagement() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [generating, setGenerating] = useState(false)
    const [generatingBatch, setGeneratingBatch] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        category: 'Formation',
        excerpt: '',
        content: '',
        image: '',
        read_time: '5 min'
    })
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        setLoading(true)
        try {
            const res = await fetch('http://127.0.0.1:5000/api/blog')
            const data = await res.json()
            if (Array.isArray(data)) {
                setPosts(data)
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error)
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

    const handleTriggerAI = async () => {
        if (!confirm('Voulez-vous générer un nouvel article avec l\'IA ? Cela prendra environ 30 secondes.')) return

        setGenerating(true)
        const token = getToken()
        try {
            const res = await fetch('http://127.0.0.1:5000/api/blog/generate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.ok) {
                const newPost = await res.json()
                setPosts([newPost, ...posts])
                alert('Article généré avec succès !')
            } else {
                const error = await res.json()
                alert('Erreur: ' + (error.details || error.message || 'Inconnue'))
            }
        } catch (error) {
            console.error('Error generating post:', error)
            alert('Erreur de connexion au serveur.')
        } finally {
            setGenerating(false)
        }
    }

    const handleGenerate3Posts = async () => {
        if (!confirm('Voulez-vous générer 3 nouveaux articles avec Gemini AI ? Cela prendra environ 1-2 minutes.')) return

        setGeneratingBatch(true)
        const token = getToken()
        try {
            const res = await fetch('http://127.0.0.1:5000/api/blog/generate-multiple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ count: 3 })
            })
            if (res.ok) {
                const result = await res.json()
                alert(result.message)
                fetchPosts() // Recharger tous les articles
            } else {
                const error = await res.json()
                alert('Erreur lors de la génération: ' + (error.message || 'Inconnue'))
            }
        } catch (error) {
            console.error('Error generating posts:', error)
            alert('Erreur de connexion au serveur.')
        } finally {
            setGeneratingBatch(false)
        }
    }

    const handleEdit = (post: BlogPost) => {
        setSelectedPost(post)
        setFormData({
            title: post.title,
            category: post.category,
            excerpt: post.excerpt,
            content: post.content,
            image: post.image,
            read_time: post.read_time
        })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return
        const token = getToken()
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/blog/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id))
            }
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = getToken()
        const method = 'PUT'
        const url = `http://127.0.0.1:5000/api/blog/${selectedPost?.id}`

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
                fetchPosts()
                setShowForm(false)
                setSelectedPost(null)
            }
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#BC0C1B] to-orange-600 bg-clip-text text-transparent">
                    Gestion du Blog & IA
                </h1>
                <p className="text-muted-foreground mt-1">Les articles sont générés automatiquement chaque jour (3/jour).</p>
            </div>
            {
                showForm && (
                    <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl p-8 shadow-xl animate-in slide-in-from-top-4 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Modifier l'article</h2>
                            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Titre de l'article</label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Catégorie</label>
                                    <select
                                        className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Formation</option>
                                        <option>Coaching</option>
                                        <option>PNL</option>
                                        <option>Soft Skills</option>
                                        <option>Langues</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Temps de lecture</label>
                                    <input
                                        className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all"
                                        value={formData.read_time}
                                        onChange={e => setFormData({ ...formData, read_time: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1 flex items-center gap-1"><ImageIcon size={14} /> Image de l'article</label>
                                    <div className="flex items-center gap-4">
                                        {formData.image && (
                                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-border shadow-sm flex-shrink-0">
                                                <img src={formData.image} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <label className={`flex items-center justify-center gap-2 w-full px-4 py-3 border border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload size={18} />}
                                                <span className="text-sm font-medium">{uploading ? 'Chargement...' : 'Charger une image locale'}</span>
                                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                            </label>
                                            <p className="text-[10px] text-muted-foreground mt-1 ml-1 truncate max-w-xs">{formData.image || 'Aucune image'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Résumé (SEO)</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all resize-none"
                                    rows={2}
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Contenu (HTML)</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all font-mono text-sm"
                                    rows={12}
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 pt-2">
                                <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-[#BC0C1B] text-white rounded-xl font-bold hover:bg-[#a00a17] transition-all shadow-lg shadow-red-500/20">
                                    <Save size={20} />
                                    Mettre à jour
                                </button>
                                <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 border border-border rounded-xl font-bold hover:bg-muted transition-all">
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }

            <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl overflow-hidden shadow-lg">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-[#BC0C1B]" />
                        <p className="text-muted-foreground font-medium">Chargement des articles...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted font-bold text-sm uppercase tracking-wider text-muted-foreground border-b border-border">
                                    <th className="text-left px-8 py-4">Article</th>
                                    <th className="text-left px-8 py-4">Catégorie</th>
                                    <th className="text-left px-8 py-4">Date</th>
                                    <th className="text-right px-8 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-12 text-center text-muted-foreground font-medium">
                                            Aucun article pour le moment.
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-border shadow-sm">
                                                        <img src={post.image} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="max-w-md">
                                                        <div className="font-bold text-foreground truncate">{post.title}</div>
                                                        <div className="text-xs text-muted-foreground truncate">{post.excerpt}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950 text-orange-600 border border-orange-200 dark:border-orange-900">
                                                    {post.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-medium text-muted-foreground">
                                                {new Date(post.date).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/blog/${post.id}`}
                                                        target="_blank"
                                                        className="p-2.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                        title="Voir l'article"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleEdit(post)}
                                                        className="p-2.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="p-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
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
        </div >
    )
}
