'use client'

import { useState, useEffect } from 'react'
import { Loader2, Calendar as CalendarIcon, Clock, User, Phone, Mail, Building2, Search, MessageSquare, ChevronLeft, ChevronRight, Check, X, AlertCircle, RefreshCcw, ArrowUpDown } from 'lucide-react'
import { getToken, removeToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface Reservation {
    id: string;
    room_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    type: string;
    reservation_date?: string;
    duration?: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    message: string;
    created_at: string;
}

export default function ReservationsManagement() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [view, setView] = useState<'list' | 'calendar'>('list')
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const router = useRouter()

    useEffect(() => {
        fetchReservations()
    }, [])

    const fetchReservations = async () => {
        setLoading(true)
        const token = getToken()
        try {
            const res = await fetch('http://127.0.0.1:5000/api/rooms/reservations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
            if (Array.isArray(data)) {
                setReservations(data)
            } else {
                setReservations([])
            }
        } catch (error) {
            console.error('Error fetching reservations:', error)
            setReservations([])
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        const token = getToken()
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/rooms/reservations/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            })
            if (!res.ok) {
                if (res.status === 401) {
                    removeToken()
                    router.push('/admin/login')
                    return
                }
                throw new Error("Erreur serveur")
            }
            if (res.ok) {
                setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus as any } : r))
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const setToday = () => {
        setCurrentMonth(new Date());
    };

    const getReservationColor = (name: string) => {
        const colors = [
            'bg-blue-500', 'bg-emerald-500', 'bg-purple-500',
            'bg-amber-500', 'bg-rose-500', 'bg-indigo-500',
            'bg-orange-500', 'bg-cyan-500'
        ];
        let hash = 0;
        for (let i = 0; i < (name?.length || 0); i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    const [deleteModal, setDeleteModal] = useState<{ show: boolean, id: string | null }>({ show: false, id: null })
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteModal.id) return
        setIsDeleting(true)
        const token = getToken()
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/rooms/reservations/${deleteModal.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!res.ok) throw new Error("Erreur lors de la suppression")
            setReservations(prev => prev.filter(r => r.id !== deleteModal.id))
            setDeleteModal({ show: false, id: null })
        } catch (error) {
            console.error(error)
            alert("Erreur lors de la suppression")
        } finally {
            setIsDeleting(false)
        }
    }

    const [sortConfig, setSortConfig] = useState<{ key: keyof Reservation, direction: 'asc' | 'desc' }>({ key: 'created_at', direction: 'desc' })
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleSort = (key: keyof Reservation) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc'
        setSortConfig({ key, direction })
    }

    const filteredReservations = reservations.filter(res =>
        (res.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (res.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (res.room_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    ).sort((a, b) => {
        const aVal = (a as any)[sortConfig.key] || ''
        const bVal = (b as any)[sortConfig.key] || ''
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
    })

    const totalPages = Math.ceil(filteredReservations.length / itemsPerPage)
    const paginatedData = filteredReservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
            {/* Confirmation Delete Modal */}
            {deleteModal.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-border animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-black mb-2">Supprimer la réservation ?</h3>
                            <p className="text-muted-foreground font-medium mb-8">
                                Cette action est irréversible. Toutes les données liées à cette réservation seront définitivement effacées.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setDeleteModal({ show: false, id: null })}
                                    className="flex-1 py-3 px-4 border border-border rounded-xl font-bold hover:bg-muted transition-all"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <X size={18} />}
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-[#FF8A00] to-orange-600 bg-clip-text text-transparent uppercase tracking-tighter">
                        Réservations de Salles
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1">Gérez le planning et les réservations de vos espaces de formation.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-2xl border border-border">
                        <button
                            onClick={() => setView('list')}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'list' ? 'bg-white dark:bg-gray-800 shadow-xl text-orange-600 scale-105' : 'text-muted-foreground hover:bg-muted'}`}
                        >
                            <Building2 size={14} /> Liste
                        </button>
                        <button
                            onClick={() => setView('calendar')}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'calendar' ? 'bg-white dark:bg-gray-800 shadow-xl text-orange-600 scale-105' : 'text-muted-foreground hover:bg-muted'}`}
                        >
                            <CalendarIcon size={14} /> Calendrier
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            import('xlsx').then(xlsx => {
                                const worksheet = xlsx.utils.json_to_sheet(reservations);
                                const workbook = xlsx.utils.book_new();
                                xlsx.utils.book_append_sheet(workbook, worksheet, "Reservations");
                                xlsx.writeFile(workbook, "Reservations_TalentsCF.xlsx");
                            })
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-xs flex items-center gap-2 uppercase tracking-wide"
                    >
                        <RefreshCcw size={16} className="hidden" />
                        Exporter Excel
                    </button>
                    <button onClick={fetchReservations} className="p-3 bg-white dark:bg-gray-900 border border-border rounded-2xl hover:bg-muted transition-all shadow-sm">
                        <RefreshCcw size={18} className={loading ? 'animate-spin' : 'text-orange-600'} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors group-focus-within:text-orange-600" />
                    <input
                        type="text"
                        placeholder="Rechercher salle ou client..."
                        className="w-full pl-12 pr-4 py-4 border border-border rounded-2xl bg-white dark:bg-gray-900 focus:ring-4 focus:ring-orange-600/10 outline-none transition-all shadow-xl font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between px-6 py-4 bg-orange-50/50 dark:bg-orange-950/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                    <span className="font-black text-[10px] uppercase text-muted-foreground tracking-[0.2em]">Total</span>
                    <span className="text-xl font-black text-orange-600">{filteredReservations.length}</span>
                </div>
                <div className="flex items-center justify-between px-6 py-4 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                    <span className="font-black text-[10px] uppercase text-muted-foreground tracking-[0.2em]">Confirmées</span>
                    <span className="text-xl font-black text-emerald-600">{reservations.filter(r => r.status === 'confirmed').length}</span>
                </div>
            </div>

            {view === 'list' ? (
                <div className="bg-white dark:bg-gray-900 border border-border rounded-[32px] overflow-hidden shadow-2xl">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
                            <div className="relative">
                                <Loader2 className="w-16 h-16 animate-spin text-orange-600" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Building2 size={24} className="text-orange-600/50" />
                                </div>
                            </div>
                            <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] mt-8">Sincronisation du planning...</p>
                        </div>
                    ) : (
                        <>
                            <>
                                {/* Mobile Card View */}
                                <div className="grid grid-cols-1 gap-4 md:hidden p-4">
                                    {paginatedData.map((res) => (
                                        <div key={res.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-border shadow-sm space-y-4 relative overflow-hidden">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950/40 text-orange-600 rounded-xl flex items-center justify-center">
                                                        <Building2 size={18} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-foreground uppercase tracking-tight text-sm">{res.room_name}</h3>
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Espace Pro</span>
                                                    </div>
                                                </div>
                                                <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${res.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' : res.status === 'cancelled' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                                                    {res.status === 'confirmed' ? 'Confirmé' : res.status === 'cancelled' ? 'Annulé' : 'En attente'}
                                                </div>
                                            </div>

                                            <div className="space-y-3 bg-muted/20 p-3 rounded-xl">
                                                <div className="flex items-center gap-2">
                                                    <User size={14} className="text-muted-foreground" />
                                                    <span className="font-bold text-sm uppercase">{res.first_name} {res.last_name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={14} className="text-emerald-500" />
                                                    <span className="text-xs font-bold text-muted-foreground">{res.phone}</span>
                                                </div>
                                                {res.reservation_date && (
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon size={14} className="text-orange-600" />
                                                        <div className="text-xs font-bold">
                                                            {new Date(res.reservation_date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                            <span className="text-muted-foreground ml-1 text-[10px] uppercase tracking-wide">({res.duration} {res.duration! > 1 ? 'Jours' : 'Jour'})</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-2 justify-end pt-2 border-t border-border/50">
                                                {res.status !== 'confirmed' && (
                                                    <button
                                                        onClick={() => updateStatus(res.id, 'confirmed')}
                                                        className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"
                                                        title="Confirmer"
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                )}
                                                {res.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => updateStatus(res.id, 'cancelled')}
                                                        className="p-2 bg-orange-50 text-orange-600 rounded-lg"
                                                        title="Annuler"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => setDeleteModal({ show: true, id: res.id })}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg"
                                                    title="Supprimer"
                                                >
                                                    <AlertCircle size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop Table View */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-muted/30 border-b border-border">
                                                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground cursor-pointer hover:text-orange-600 transition-colors" onClick={() => handleSort('room_name')}>
                                                    <div className="flex items-center gap-2">Salle <ArrowUpDown size={12} className="opacity-30" /></div>
                                                </th>
                                                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground cursor-pointer hover:text-orange-600 transition-colors" onClick={() => handleSort('last_name')}>
                                                    <div className="flex items-center gap-2">Client <ArrowUpDown size={12} className="opacity-30" /></div>
                                                </th>
                                                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">Planning</th>
                                                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground cursor-pointer hover:text-orange-600 transition-colors" onClick={() => handleSort('status')}>
                                                    <div className="flex items-center gap-2">Status <ArrowUpDown size={12} className="opacity-30" /></div>
                                                </th>
                                                <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {paginatedData.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="px-8 py-32 text-center">
                                                        <div className="flex flex-col items-center opacity-20">
                                                            <Building2 size={64} className="mb-6" />
                                                            <p className="font-black text-2xl uppercase tracking-tighter">Aucune réservation</p>
                                                            <p className="text-sm font-medium mt-2">Essayez de modifier vos filtres ou de recharger.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                paginatedData.map((res) => (
                                                    <tr key={res.id} className="hover:bg-muted/20 transition-all group">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/40 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                                                    <Building2 size={22} />
                                                                </div>
                                                                <div>
                                                                    <span className="font-black text-foreground group-hover:text-orange-600 transition-colors uppercase text-sm block tracking-tight">{res.room_name}</span>
                                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Espace Pro</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="font-black text-foreground uppercase text-sm">{res.first_name} {res.last_name}</div>
                                                            <div className="flex flex-wrap gap-3 mt-2">
                                                                <div className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 px-2 py-0.5 bg-muted rounded-full">
                                                                    <Phone className="w-3 h-3 text-emerald-500" /> {res.phone}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex flex-col gap-2">
                                                                <div className={`w-fit px-3 py-1 rounded-lg text-[10px] font-black uppercase border tracking-widest ${res.type === 'reservation' ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                                                    {res.type}
                                                                </div>
                                                                {res.reservation_date && (
                                                                    <div className="text-[11px] font-black text-foreground/80 flex items-center gap-2 uppercase">
                                                                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                                                            <CalendarIcon className="w-4 h-4 text-orange-600" />
                                                                        </div>
                                                                        <div>
                                                                            <div>{new Date(res.reservation_date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}</div>
                                                                            <div className="text-[9px] opacity-50 tracking-[0.2em]">{res.duration} {res.duration! > 1 ? 'JOURS' : 'JOUR'}</div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className={`w-[120px] py-2 rounded-xl text-[10px] font-black uppercase border text-center transition-all ${res.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' :
                                                                res.status === 'cancelled' ? 'bg-red-100 text-red-700 border-red-200' :
                                                                    'bg-amber-100 text-amber-700 border-amber-200 animate-pulse'
                                                                }`}>
                                                                {res.status === 'confirmed' ? 'Confirmé' : res.status === 'cancelled' ? 'Annulé' : 'En attente'}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <div className="flex justify-end gap-2 group-hover:translate-x-0 transition-transform">
                                                                {res.status !== 'confirmed' && (
                                                                    <button
                                                                        onClick={() => updateStatus(res.id, 'confirmed')}
                                                                        className="p-3 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all shadow-sm"
                                                                        title="Confirmer"
                                                                    >
                                                                        <Check size={18} />
                                                                    </button>
                                                                )}
                                                                {res.status !== 'cancelled' && (
                                                                    <button
                                                                        onClick={() => updateStatus(res.id, 'cancelled')}
                                                                        className="px-3 py-2 bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white rounded-xl transition-all shadow-sm text-[10px] font-black uppercase tracking-wider"
                                                                        title="Annuler"
                                                                    >
                                                                        Annuler
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => setDeleteModal({ show: true, id: res.id })}
                                                                    className="px-3 py-2 bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white rounded-xl transition-all shadow-sm text-[10px] font-black uppercase tracking-wider"
                                                                    title="Supprimer la réservation"
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
                            {/* Pagination Controls */}
                            <div className="px-8 py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/10">
                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                    Page {currentPage} <span className="mx-2 text-border">/</span> {totalPages || 1}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-3 bg-white dark:bg-gray-800 border border-border rounded-xl disabled:opacity-20 hover:bg-muted transition-all shadow-sm"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        className="p-3 bg-white dark:bg-gray-800 border border-border rounded-xl disabled:opacity-20 hover:bg-muted transition-all shadow-sm"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 border border-border rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-orange-100 dark:bg-orange-950/40 text-orange-600 rounded-3xl">
                                <CalendarIcon size={32} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black capitalize tracking-tighter">
                                    {currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
                                </h2>
                                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">Planning d'occupation des espaces</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-2xl border border-border">
                            <button onClick={prevMonth} className="p-3 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all hover:shadow-xl group">
                                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                            <button onClick={setToday} className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white dark:bg-gray-800 shadow-xl rounded-xl hover:scale-105 transition-all">Aujourd'hui</button>
                            <button onClick={nextMonth} className="p-3 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all hover:shadow-xl group">
                                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-px bg-border border-x border-b border-border rounded-2xl overflow-hidden shadow-inner">
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                            <div key={day} className="bg-muted px-4 py-4 text-center text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em]">{day}</div>
                        ))}
                        {Array.from({ length: 42 }).map((_, i) => {
                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
                            const firstDayOfMonth = date.getDay()
                            // Adjust to make Monday first day (0=Sunday -> 6, 1=Monday -> 0, etc.)
                            const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
                            date.setDate(i - startOffset + 1)

                            const isCurrentMonth = date.getMonth() === currentMonth.getMonth()
                            const isToday = date.toDateString() === new Date().toDateString()
                            const cellDate = new Date(date)
                            cellDate.setHours(12, 0, 0, 0)

                            const dayConfirmed = reservations.filter(r => {
                                if (r.status !== 'confirmed' || !r.reservation_date) return false;
                                const startDate = new Date(r.reservation_date);
                                startDate.setHours(0, 0, 0, 0);
                                const endDate = new Date(startDate);
                                endDate.setDate(startDate.getDate() + (r.duration || 1) - 1);
                                endDate.setHours(23, 59, 59, 999);
                                return cellDate >= startDate && cellDate <= endDate;
                            })

                            return (
                                <div key={i} className={`bg-white dark:bg-gray-900 min-h-[140px] p-0.5 border-r border-b border-border/40 transition-colors ${isCurrentMonth ? '' : 'opacity-20'} ${isToday ? 'bg-orange-50/20' : ''}`}>
                                    <div className={`p-2 text-right text-xs font-black ${isToday ? 'text-orange-600 scale-110' : 'text-foreground/40'}`}>
                                        {date.getDate()}
                                    </div>
                                    <div className="space-y-[2px]">
                                        {dayConfirmed.map(r => {
                                            const startDate = new Date(r.reservation_date!);
                                            startDate.setHours(0, 0, 0, 0);
                                            const endDate = new Date(startDate);
                                            endDate.setDate(startDate.getDate() + (r.duration || 1) - 1);
                                            endDate.setHours(23, 59, 59, 999);

                                            const isStart = cellDate.toDateString() === startDate.toDateString();
                                            const isEnd = cellDate.toDateString() === endDate.toDateString();
                                            const isMonday = date.getDay() === 1;

                                            return (
                                                <div
                                                    key={r.id}
                                                    className={`
                                                        h-6 flex items-center px-2 text-[9px] font-black uppercase text-white shadow-sm transition-all relative group/res
                                                        ${getReservationColor(r.last_name)}
                                                        ${isStart ? 'rounded-l-lg ml-1' : 'ml-0 border-l border-white/20'}
                                                        ${isEnd ? 'rounded-r-lg mr-1' : 'mr-0 border-r border-white/20'}
                                                    `}
                                                >
                                                    {(isStart || isMonday) && (
                                                        <span className="truncate drop-shadow-md z-10">
                                                            {r.room_name} • {r.last_name}
                                                        </span>
                                                    )}
                                                    {isStart && (
                                                        <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-3 bg-white/40 rounded-full" />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
