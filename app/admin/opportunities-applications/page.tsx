'use client'
import { API_BASE_URL } from '@/lib/api-config';


import { useState, useEffect } from 'react'
import { Loader2, Mail, Phone, Calendar, Briefcase, Search, ArrowRight, User, FileText, CreditCard, Image as ImageIcon, Download } from 'lucide-react'
import { getToken } from '@/lib/auth'

interface OpportunityApplication {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    opportunity_title: string;
    niveau_etudes: string;
    description?: string;
    cv_url?: string;
    diplome_url?: string;
    cin_url?: string;
    photo_url?: string;
    created_at: string;
}

export default function OpportunityApplicationsPage() {
    const [applications, setApplications] = useState<OpportunityApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        setLoading(true)
        const token = getToken()
        try {
            const res = await fetch(`${API_BASE_URL}/api/opportunity-applications`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json()
            if (Array.isArray(data)) {
                setApplications(data)
            } else {
                setApplications([])
            }
        } catch (error) {
            console.error('Error fetching applications:', error)
            setApplications([])
        } finally {
            setLoading(false)
        }
    }

    const [opportunityFilter, setOpportunityFilter] = useState('Tous')
    const uniqueOpportunities = Array.from(new Set(applications.map(app => app.opportunity_title || 'Offre Spontanée')))

    const filteredApps = applications.filter(app => {
        const matchesFilter = opportunityFilter === 'Tous' || (app.opportunity_title || 'Offre Spontanée') === opportunityFilter
        const search = searchTerm.toLowerCase()
        const matchesSearch =
            `${app.first_name} ${app.last_name}`.toLowerCase().includes(search) ||
            app.email.toLowerCase().includes(search) ||
            (app.phone && app.phone.toLowerCase().includes(search)) ||
            (app.opportunity_title && app.opportunity_title.toLowerCase().includes(search)) ||
            (app.niveau_etudes && app.niveau_etudes.toLowerCase().includes(search))

        return matchesFilter && matchesSearch
    })

    const handleDelete = async (id: string) => {
        if (!confirm('Voulez-vous vraiment supprimer cette candidature ?')) return
        const token = getToken()
        try {
            await fetch(`${API_BASE_URL}/api/opportunity-applications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setApplications(applications.filter(app => app.id !== id))
        } catch (error) {
            console.error('Error deleting application:', error)
        }
    }

    const exportToExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(filteredApps.map(app => ({
                Candidat: `${app.first_name} ${app.last_name}`,
                Email: app.email,
                Téléphone: app.phone,
                Offre: app.opportunity_title,
                Niveau: app.niveau_etudes,
                Date: new Date(app.created_at).toLocaleDateString()
            })));
            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, "Candidatures");
            xlsx.writeFile(workbook, "Candidatures_Opportunites.xlsx");
        });
    }

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-400 bg-clip-text text-transparent">
                        Candidatures aux Opportunités
                    </h1>
                    <p className="text-muted-foreground mt-1">Gérer les postulants pour les opportunités et offres.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button onClick={fetchApplications} className="p-2.5 border border-border rounded-xl hover:bg-muted transition-all bg-white dark:bg-gray-800 shadow-sm">
                        <Loader2 size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={exportToExcel} className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all font-bold shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wide">
                        <Download size={16} /> Exporter Excel
                    </button>
                    <div className="relative md:w-60">
                        <select
                            value={opportunityFilter}
                            onChange={(e) => setOpportunityFilter(e.target.value)}
                            className="w-full px-4 py-2.5 border border-border rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all shadow-sm font-bold text-xs"
                        >
                            <option value="Tous">Toutes les offres</option>
                            {uniqueOpportunities.map((op, i) => (
                                <option key={i} value={op}>{op}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative flex-1 md:w-60">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-amber-500 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl overflow-hidden shadow-lg">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
                        <p className="text-muted-foreground font-medium">Chargement des candidatures...</p>
                    </div>
                ) : (
                    <>
                        {/* Mobile Card View */}
                        <div className="grid grid-cols-1 gap-4 md:hidden p-4">
                            {filteredApps.map((app) => (
                                <div key={app.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-border shadow-sm space-y-4 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4">
                                        <button
                                            onClick={() => handleDelete(app.id)}
                                            className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-lg text-xs font-bold uppercase tracking-wider"
                                        >
                                            Supr.
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 pr-16 bg-muted/20 -mx-5 -mt-5 p-5 border-b border-border/50">
                                        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center flex-shrink-0">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-sm">{app.first_name} {app.last_name}</h3>
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-0.5">
                                                <Calendar size={12} />
                                                {new Date(app.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-semibold">
                                            <Mail size={14} className="text-primary" />
                                            <span className="truncate">{app.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Phone size={14} />
                                            <span>{app.phone || 'N/A'}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            <div className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 p-2 rounded-lg text-xs font-bold border border-amber-100 dark:border-amber-800 flex items-start gap-2 col-span-2">
                                                <Briefcase size={14} className="mt-0.5 flex-shrink-0" />
                                                <span>{app.opportunity_title || 'Offre Spontanée'}</span>
                                            </div>
                                            <div className="bg-muted p-2 rounded-lg text-xs font-medium text-foreground relative col-span-2">
                                                <span className="text-[10px] uppercase text-muted-foreground font-black tracking-widest block mb-1">Niveau</span>
                                                {app.niveau_etudes || '-'}
                                            </div>
                                        </div>

                                        {/* Attachments */}
                                        <div className="flex gap-2 justify-center pt-2 border-t border-border/50 mt-2">
                                            {app.cv_url && (
                                                <a href={app.cv_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-lg" title="CV">
                                                    <FileText size={18} />
                                                </a>
                                            )}
                                            {app.diplome_url && (
                                                <a href={app.diplome_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-50 text-green-600 rounded-lg" title="Diplôme">
                                                    <Download size={18} />
                                                </a>
                                            )}
                                            {app.cin_url && (
                                                <a href={app.cin_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-purple-50 text-purple-600 rounded-lg" title="CIN">
                                                    <CreditCard size={18} />
                                                </a>
                                            )}
                                            {app.photo_url && (
                                                <a href={app.photo_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-amber-50 text-amber-600 rounded-lg" title="Photo">
                                                    <ImageIcon size={18} />
                                                </a>
                                            )}
                                            {!app.cv_url && !app.diplome_url && !app.cin_url && !app.photo_url && (
                                                <span className="text-muted-foreground text-xs py-2">Aucune pièce jointe</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-muted font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                                        <th className="px-6 py-4 text-left">Candidat</th>
                                        <th className="px-6 py-4 text-left">Contact</th>
                                        <th className="px-6 py-4 text-left">Offre Ciblée</th>
                                        <th className="px-6 py-4 text-left">Niveau</th>
                                        <th className="px-6 py-4 text-center">Pièces Jointes</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredApps.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-12 text-center text-muted-foreground">
                                                Aucune candidature trouvée.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredApps.map((app) => (
                                            <tr key={app.id} className="hover:bg-muted/30 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <div className="font-bold text-foreground flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                                                            <User size={14} />
                                                        </div>
                                                        {app.first_name} {app.last_name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                                                            <Mail size={12} className="text-primary" /> {app.email}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <Phone size={12} /> {app.phone || 'N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="px-3 py-1 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800 rounded-lg font-bold text-xs inline-flex items-center gap-2">
                                                        <Briefcase size={12} />
                                                        {app.opportunity_title || 'Offre Spontanée'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-muted-foreground font-medium text-xs">
                                                    {app.niveau_etudes || '-'}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center gap-3">
                                                        {app.cv_url && (
                                                            <a href={app.cv_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors" title="CV (PDF)">
                                                                <FileText size={16} />
                                                            </a>
                                                        )}
                                                        {app.diplome_url && (
                                                            <a href={app.diplome_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" title="Diplôme">
                                                                <Download size={16} />
                                                            </a>
                                                        )}
                                                        {app.cin_url && (
                                                            <a href={app.cin_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors" title="CIN">
                                                                <CreditCard size={16} />
                                                            </a>
                                                        )}
                                                        {app.photo_url && (
                                                            <a href={app.photo_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors" title="Photo">
                                                                <ImageIcon size={16} />
                                                            </a>
                                                        )}
                                                        {!app.cv_url && !app.diplome_url && !app.cin_url && !app.photo_url && (
                                                            <span className="text-muted-foreground text-xs">Aucun</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button
                                                        onClick={() => handleDelete(app.id)}
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
            </div>
        </div>
    )
}
