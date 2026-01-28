'use client'

import { useState, useEffect, useMemo } from 'react'
import {
    Loader2, Mail, Phone, Calendar, MapPin,
    GraduationCap, Search, Download, Filter,
    ChevronLeft, ChevronRight, ArrowUpDown, RefreshCcw,
    AlertCircle, FileText
} from 'lucide-react'
import { getToken, removeToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface Inscription {
    id: string;
    diploma_type: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    pays: string;
    ville: string;
    niveau_etudes: string;
    date_naissance: string;
    message?: string;
    status: string;
    created_at: string;
}

export default function InscriptionsManagement() {
    const [inscriptions, setInscriptions] = useState<Inscription[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [programFilter, setProgramFilter] = useState('Tous')
    const [sortConfig, setSortConfig] = useState<{ key: keyof Inscription, direction: 'asc' | 'desc' }>({ key: 'created_at', direction: 'desc' })
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
            const res = await fetch('http://127.0.0.1:5000/api/inscriptions', {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (!res.ok) {
                if (res.status === 401) {
                    removeToken()
                    router.push('/admin/login')
                    return
                }
                throw new Error(`Erreur serveur: ${res.status}`)
            }

            const data = await res.json()
            if (Array.isArray(data)) {
                setInscriptions(data)
            } else {
                setInscriptions([])
            }
        } catch (err: any) {
            console.error('Error fetching inscriptions:', err)
            setError(err.name === 'AbortError' ? "Le serveur ne répond pas (Timeout)" : "Impossible de charger les données. Vérifiez que le serveur backend est lancé.")
            setInscriptions([])
        } finally {
            setLoading(false)
        }
    }

    // -- Logique du DataTable --

    const handleSort = (key: keyof Inscription) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const filteredData = useMemo(() => {
        return inscriptions.filter(ins => {
            const search = searchTerm.toLowerCase();
            const matchesSearch =
                `${ins.first_name} ${ins.last_name}`.toLowerCase().includes(search) ||
                ins.email.toLowerCase().includes(search) ||
                (ins.phone && ins.phone.includes(search)) ||
                ins.ville.toLowerCase().includes(search) ||
                ins.pays.toLowerCase().includes(search);

            const matchesProgram = programFilter === 'Tous' || ins.diploma_type === programFilter;

            return matchesSearch && matchesProgram;
        }).sort((a, b) => {
            const aVal = a[sortConfig.key] || '';
            const bVal = b[sortConfig.key] || '';
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        })
    }, [inscriptions, searchTerm, programFilter, sortConfig])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const exportToExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(filteredData.map(ins => ({
                Nom: ins.last_name,
                Prénom: ins.first_name,
                Email: ins.email,
                Téléphone: ins.phone,
                Programme: ins.diploma_type,
                Ville: ins.ville,
                Pays: ins.pays,
                Date: new Date(ins.created_at).toLocaleDateString()
            })));
            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, "Inscriptions");
            xlsx.writeFile(workbook, "Inscriptions_Diplomes.xlsx");
        });
    }

    const getProgramBadgeStyle = (program: string) => {
        const p = program?.toLowerCase() || ''
        if (p.includes('bachelor')) return 'bg-blue-100 text-blue-700 border-blue-200'
        if (p.includes('mba')) return 'bg-indigo-100 text-indigo-700 border-indigo-200'
        if (p.includes('dba')) return 'bg-purple-100 text-purple-700 border-purple-200'
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }

    const [deleteModal, setDeleteModal] = useState({ show: false, id: '' })

    const confirmDelete = async () => {
        if (!deleteModal.id) return
        const token = getToken();
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/inscriptions/${deleteModal.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setInscriptions(prev => prev.filter(ins => ins.id !== deleteModal.id));
                setDeleteModal({ show: false, id: '' })
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    }

    const handleDelete = (id: string) => {
        setDeleteModal({ show: true, id })
    }

    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Gestion des Candidatures
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1">
                        Tableau de bord dynamique des inscriptions aux programmes certifiants.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <button
                        onClick={fetchInscriptions}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl hover:bg-muted transition-all font-bold text-sm"
                    >
                        <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
                        Actualiser
                    </button>
                    <button
                        onClick={exportToExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold text-sm shadow-lg shadow-emerald-500/20"
                    >
                        <Download size={16} />
                        Exporter Excel
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl max-w-sm w-full space-y-4 animate-in zoom-in-95 duration-200">
                        {/* Note: I need to ensure Trash2 is imported or used an existing icon if Trash2 not available, but user asked for "modal also" implying similar style. Inscriptions page imports: Loader2, Mail, Phone, Calendar, MapPin, GraduationCap, Search, Download, Filter, ChevronLeft, ChevronRight, ArrowUpDown, RefreshCcw, AlertCircle, FileText. 
                           I should add Trash2 to imports or use AlertCircle which is imported. Using AlertCircle to be safe or assuming I can add Trash2. I will add Trash2 to import in a separate chunk or just use AlertCircle. Let's use AlertCircle as icon for now to avoid import errors if not imported, or better yet, I should check imports. Trash2 is NOT imported. I will add it to imports first. */}
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto text-red-600">
                            <AlertCircle size={24} />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-bold">Confirmer la suppression</h3>
                            <p className="text-sm text-muted-foreground">
                                Êtes-vous sûr de vouloir supprimer cette inscription ? Cette action est irréversible.
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
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters & Search */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher un candidat..."
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-2xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>

                <div className="relative flex items-center">
                    <Filter className="absolute left-3 text-muted-foreground w-4 h-4" />
                    <select
                        value={programFilter}
                        onChange={(e) => { setProgramFilter(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-2xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm appearance-none font-bold text-sm"
                    >
                        <option value="Tous">Tous les programmes</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="MBA">MBA</option>
                        <option value="DBA">DBA</option>
                    </select>
                </div>

                <div className="flex items-center bg-muted/30 px-4 rounded-2xl border border-border">
                    <div className="flex-1 text-xs font-black uppercase text-muted-foreground tracking-widest">
                        Total Filtré: <span className="text-primary">{filteredData.length}</span>
                    </div>
                </div>
            </div>

            {/* Table or Empty/Error States */}
            <div className="bg-white dark:bg-gray-900 border border-border rounded-3xl overflow-hidden shadow-2xl relative">
                {error && (
                    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in zoom-in duration-300">
                        <div className="p-4 bg-red-100 rounded-full mb-4">
                            <AlertCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <h3 className="text-xl font-black text-foreground mb-2">Oups ! Une erreur est survenue</h3>
                        <p className="text-muted-foreground max-w-md mb-6">{error}</p>
                        <button
                            onClick={fetchInscriptions}
                            className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all"
                        >
                            Réessayer
                        </button>
                    </div>
                )}

                {loading && !error && (
                    <div className="flex flex-col items-center justify-center py-32 animate-pulse">
                        <div className="relative">
                            <Loader2 className="w-12 h-12 animate-spin text-primary" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FileText size={16} className="text-primary/50" />
                            </div>
                        </div>
                        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs mt-6">Sincronisation des données...</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Mobile Card View */}
                        <div className="grid grid-cols-1 gap-4 md:hidden p-4">
                            {paginatedData.map((ins) => (
                                <div key={ins.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4">
                                        <button
                                            onClick={() => handleDelete(ins.id)}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg opacity-100 transition-opacity"
                                        >
                                            <AlertCircle size={16} />
                                        </button>
                                    </div>

                                    <div className="flex items-start gap-4 pr-12">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg uppercase flex-shrink-0">
                                            {ins.first_name[0]}{ins.last_name[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-foreground uppercase tracking-tight">{ins.first_name} {ins.last_name}</h3>
                                            <p className="text-xs text-muted-foreground font-bold mt-1">Né(e) le {ins.date_naissance ? new Date(ins.date_naissance).toLocaleDateString() : 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 py-2">
                                        <div className={`col-span-2 px-3 py-2 rounded-xl text-xs font-black uppercase border text-center ${getProgramBadgeStyle(ins.diploma_type)}`}>
                                            {ins.diploma_type}
                                        </div>
                                    </div>

                                    <div className="space-y-3 bg-muted/20 p-3 rounded-xl">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="w-4 h-4 text-primary" />
                                            <span className="truncate font-medium">{ins.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="w-4 h-4 text-emerald-500" />
                                            <span className="font-medium">{ins.phone || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            <span className="font-medium">{ins.ville}, {ins.pays}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <GraduationCap className="w-4 h-4 text-indigo-500" />
                                            <span className="font-medium">{ins.niveau_etudes}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-muted/50 text-muted-foreground border-b border-border">
                                        <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('last_name')}>
                                            <div className="flex items-center gap-2">
                                                Candidat <ArrowUpDown size={12} />
                                            </div>
                                        </th>
                                        <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest">Coordonnées</th>
                                        <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('diploma_type')}>
                                            <div className="flex items-center gap-2">
                                                Programme <ArrowUpDown size={12} />
                                            </div>
                                        </th>
                                        <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest">Localisation</th>
                                        <th className="px-6 py-5 text-right text-xs font-black uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {paginatedData.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center opacity-40">
                                                    <Search className="w-12 h-12 mb-4" />
                                                    <p className="font-bold text-lg">Aucune inscription ne correspond à ces critères.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedData.map((ins) => (
                                            <tr key={ins.id} className="hover:bg-muted/30 transition-all group">
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm uppercase">
                                                            {ins.first_name[0]}{ins.last_name[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-foreground group-hover:text-primary transition-colors uppercase text-sm">
                                                                {ins.first_name} {ins.last_name}
                                                            </div>
                                                            <div className="text-[10px] text-muted-foreground font-bold tracking-tight">
                                                                Né(e) le {ins.date_naissance ? new Date(ins.date_naissance).toLocaleDateString() : 'N/A'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="space-y-1.5">
                                                        <a href={`mailto:${ins.email}`} className="text-xs font-bold text-foreground hover:text-primary flex items-center gap-2">
                                                            <Mail className="w-3.5 h-3.5 text-blue-500" /> {ins.email}
                                                        </a>
                                                        <div className="text-xs font-black text-foreground/70 flex items-center gap-2">
                                                            <Phone className="w-3.5 h-3.5 text-emerald-500" /> {ins.phone || 'N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border inline-block ${getProgramBadgeStyle(ins.diploma_type)}`}>
                                                        {ins.diploma_type}
                                                    </div>
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <GraduationCap className="w-4 h-4 text-indigo-500" />
                                                        <span className="text-xs font-bold text-foreground/70 uppercase tracking-tighter">{ins.niveau_etudes}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-1.5 text-xs font-black text-foreground uppercase">
                                                            <MapPin className="w-3.5 h-3.5 text-red-500" /> {ins.ville}
                                                        </div>
                                                        <div className="text-[10px] font-bold text-muted-foreground ml-5">{ins.pays}</div>
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
                    </>
                )}

                {/* Pagination */}
                {!loading && !error && filteredData.length > 0 && (
                    <div className="px-6 py-5 bg-muted/20 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-xs font-bold text-muted-foreground">
                            Affichage de <span className="text-foreground font-black">{(currentPage - 1) * itemsPerPage + 1}</span> à <span className="text-foreground font-black">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> sur <span className="text-foreground font-black">{filteredData.length}</span> inscriptions
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 border border-border rounded-xl hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${currentPage === i + 1 ? 'bg-primary text-white' : 'hover:bg-muted text-muted-foreground'}`}
                                >
                                    {i + 1}
                                </button>
                            )).filter((_, i) => totalPages < 8 || (i >= currentPage - 3 && i <= currentPage + 1))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-border rounded-xl hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
