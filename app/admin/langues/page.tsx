'use client'
import { API_BASE_URL } from '@/lib/api-config';


import { useState, useEffect, useMemo } from 'react'
import {
    Loader2, Mail, Phone, Globe, Award,
    Users, Search, Download, Filter,
    ChevronLeft, ChevronRight, ArrowUpDown, RefreshCcw,
    AlertCircle, Target
} from 'lucide-react'
import { getToken, removeToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface LanguageInscription {
    id: string;
    language: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    level: string;
    type: string;
    message?: string;
    created_at: string;
}

export default function LanguageInscriptionsManagement() {
    const [inscriptions, setInscriptions] = useState<LanguageInscription[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [languageFilter, setLanguageFilter] = useState('Tous')
    const [sortConfig, setSortConfig] = useState<{ key: keyof LanguageInscription, direction: 'asc' | 'desc' }>({ key: 'created_at', direction: 'desc' })
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const router = useRouter()

    useEffect(() => {
        fetchInscriptions()
    }, [])

    const fetchInscriptions = async () => {
        setLoading(true)
        setError(null)
        const token = getToken()
        try {
            const res = await fetch(`${API_BASE_URL}/api/language-inscriptions`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (!res.ok) {
                if (res.status === 401) {
                    removeToken()
                    router.push('/admin/login')
                    return
                }
                throw new Error("Erreur serveur")
            }
            const data = await res.json()
            if (Array.isArray(data)) setInscriptions(data)
        } catch (err: any) {
            setError("Impossible de charger les inscriptions aux langues.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSort = (key: keyof LanguageInscription) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc'
        setSortConfig({ key, direction })
    }

    const filteredData = useMemo(() => {
        return inscriptions.filter(ins => {
            const matchesSearch =
                `${ins.first_name} ${ins.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ins.language.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLang = languageFilter === 'Tous' || ins.language === languageFilter;
            return matchesSearch && matchesLang;
        }).sort((a, b) => {
            const aVal = a[sortConfig.key] || '';
            const bVal = b[sortConfig.key] || '';
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        })
    }, [inscriptions, searchTerm, languageFilter, sortConfig])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) return;
        const token = getToken();
        try {
            const res = await fetch(`${API_BASE_URL}/api/language-inscriptions/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setInscriptions(prev => prev.filter(ins => ins.id !== id));
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    }

    const exportToExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(filteredData.map(ins => ({
                Nom: ins.last_name,
                Prénom: ins.first_name,
                Email: ins.email,
                Téléphone: ins.phone,
                Langue: ins.language,
                Niveau: ins.level,
                Formule: ins.type,
                Date: new Date(ins.created_at).toLocaleDateString()
            })));
            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, "Inscriptions Langues");
            xlsx.writeFile(workbook, "Inscriptions_Langues.xlsx");
        });
    }

    const getLanguageBadgeStyle = (lang: string) => {
        const l = lang?.toLowerCase() || ''
        if (l.includes('anglais')) return 'bg-red-100 text-red-700 border-red-200'
        if (l.includes('français')) return 'bg-blue-100 text-blue-700 border-blue-200'
        if (l.includes('allemand')) return 'bg-yellow-100 text-yellow-700 border-yellow-200'
        if (l.includes('espagnol')) return 'bg-orange-100 text-orange-700 border-orange-200'
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }

    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                        Inscriptions aux Langues
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1">Gérer les demandes pour les cours de langues étrangères.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchInscriptions} className="p-2.5 border border-border rounded-xl hover:bg-muted transition-all">
                        <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={exportToExcel} className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold shadow-lg shadow-orange-500/20">
                        <Download size={18} /> Exporter Excel
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Nom, Email ou Langue..."
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-2xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-2xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 outline-none font-bold text-sm"
                >
                    <option value="Tous">Toutes les langues</option>
                    <option value="Anglais">Anglais</option>
                    <option value="Français">Français</option>
                    <option value="Allemand">Allemand</option>
                    <option value="Espagnol">Espagnol</option>
                </select>
                <div className="flex items-center px-4 bg-muted/30 rounded-2xl border border-border font-black text-xs uppercase text-muted-foreground tracking-widest">
                    Total: <span className="ml-2 text-orange-600">{filteredData.length}</span>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-border rounded-3xl overflow-hidden shadow-xl">
                {error ? (
                    <div className="py-20 text-center text-red-500 font-bold">{error}</div>
                ) : loading ? (
                    <div className="py-20 text-center flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
                        <p className="font-black text-xs uppercase tracking-widest text-muted-foreground">Chargement...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted/50 border-b border-border">
                                    <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest cursor-pointer" onClick={() => handleSort('last_name')}>Étudiant <ArrowUpDown size={12} className="inline ml-1" /></th>
                                    <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest cursor-pointer" onClick={() => handleSort('language')}>Langue <ArrowUpDown size={12} className="inline ml-1" /></th>
                                    <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest">Type / Niveau</th>
                                    <th className="px-6 py-5 text-right text-xs font-black uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {paginatedData.length === 0 ? (
                                    <tr><td colSpan={4} className="py-20 text-center text-muted-foreground font-bold">Aucune inscription.</td></tr>
                                ) : (
                                    paginatedData.map(ins => (
                                        <tr key={ins.id} className="hover:bg-muted/30 transition-all group">
                                            <td className="px-6 py-6">
                                                <div className="font-black text-foreground uppercase text-sm group-hover:text-orange-600 transition-colors">{ins.first_name} {ins.last_name}</div>
                                                <div className="flex flex-col gap-1 mt-1">
                                                    <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1"><Mail size={12} /> {ins.email}</span>
                                                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><Phone size={12} /> {ins.phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border inline-block ${getLanguageBadgeStyle(ins.language)}`}>
                                                    {ins.language}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-xs font-black text-foreground/80 uppercase tracking-tighter">
                                                        <Target size={14} className="text-orange-600" /> {ins.level}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                                                        <Users size={14} /> {ins.type}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <button
                                                    onClick={() => handleDelete(ins.id)}
                                                    className="px-3 py-2 bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white rounded-xl transition-all shadow-sm text-[10px] font-black uppercase tracking-wider"
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && filteredData.length > 0 && (
                    <div className="px-6 py-5 bg-muted/20 border-t border-border flex justify-between items-center">
                        <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                            Page {currentPage} sur {totalPages}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded-xl disabled:opacity-30"><ChevronLeft size={16} /></button>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border rounded-xl disabled:opacity-30"><ChevronRight size={16} /></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
