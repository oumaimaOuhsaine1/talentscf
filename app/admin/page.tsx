'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  Users,
  BookOpen,
  Mail,
  Newspaper,
  Bell,
  GraduationCap,
  Building2,
  Globe,
  Loader2,
  Calendar,
  User,
  ArrowRight,
  Filter,
  Search,
  TrendingUp,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { getToken, removeToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [monthFilter, setMonthFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear().toString())
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [monthFilter, yearFilter])

  const fetchDashboardData = async () => {
    setLoading(true)
    const token = getToken()
    try {
      let url = 'http://127.0.0.1:5000/api/stats/dashboard'
      if (monthFilter !== 'all') {
        url += `?month=${monthFilter}&year=${yearFilter}`
      }

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.status === 401) {
        removeToken()
        router.push('/admin/login')
        return
      }
      if (response.ok) {
        const json = await response.json()
        setData(json)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = data ? [
    { icon: GraduationCap, label: 'Inscriptions', total: monthFilter === 'all' ? data.stats.total.inscriptions : data.stats.filtered.inscriptions, href: '/admin/inscriptions', color: 'bg-blue-500' },
    { icon: Building2, label: 'Réservations', total: monthFilter === 'all' ? data.stats.total.reservations : data.stats.filtered.reservations, href: '/admin/reservations', color: 'bg-indigo-500' },
    { icon: BookOpen, label: 'Formations', total: data.stats.total.formations, href: '/admin/formations', color: 'bg-emerald-500' }, // Formations are usually not filterable by date in this context
    { icon: Globe, label: 'Langues', total: 4, href: '/admin/langues', color: 'bg-amber-500' },
    { icon: Newspaper, label: 'Articles Blog', total: monthFilter === 'all' ? data.stats.total.blog : data.stats.filtered.blog, href: '/admin/blog', color: 'bg-purple-500' },
    { icon: Mail, label: 'Messages', total: monthFilter === 'all' ? data.stats.total.messages : data.stats.filtered.messages, href: '/admin/messages', color: 'bg-rose-500' },
  ] : []

  const filteredActivities = data?.activities?.filter((activity: any) => {
    const activityDate = new Date(activity.created_at).setHours(0, 0, 0, 0)
    const today = new Date().setHours(0, 0, 0, 0)
    const isToday = activityDate === today

    const matchesSearch = searchQuery === '' ||
      `${activity.prenom} ${activity.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.label.toLowerCase().includes(searchQuery.toLowerCase())

    return isToday && matchesSearch
  }) || []

  const getLinkForActivity = (type: string) => {
    switch (type) {
      case 'inscription_diploma': return '/admin/inscriptions'
      case 'inscription_langue': return '/admin/langues'
      case 'reservation': return '/admin/reservations'
      case 'message_info':
      case 'message_diagnostic': return '/admin/messages'
      default: return '#'
    }
  }

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-muted-foreground font-bold text-lg">Préparation de vos rapports...</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent uppercase tracking-tighter">
            Analyse & Dashboard
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Suivi de performance et analyses périodiques.</p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-border shadow-xl">
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-black uppercase tracking-widest px-4 py-2 cursor-pointer text-primary"
          >
            <option value="all">Tous les mois</option>
            {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <div className="w-px h-4 bg-border"></div>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-black uppercase tracking-widest px-4 py-2 cursor-pointer text-muted-foreground"
          >
            {[2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="group bg-white dark:bg-gray-900 border border-border rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-1 hover:border-primary/50 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-[0.03] -mr-8 -mt-8 rounded-full group-hover:scale-110 transition-transform`}></div>
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-[10px] uppercase font-black tracking-widest mb-1">{stat.label}</p>
                  <p className="text-4xl font-black text-foreground">{stat.total}</p>
                </div>
              </div>
              <div className={`p-4 rounded-2xl ${stat.color} text-white shadow-lg shadow-inherit/20 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Alerts / Activity Feed */}
        <div className="lg:col-span-12 bg-white dark:bg-gray-900 border border-border rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl">
                <Bell size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black">Fil d'Activité</h2>
                <p className="text-xs text-muted-foreground font-bold">
                  Dernières alertes et notifications du système.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-2xl border border-border">
                <Search size={16} className="text-muted-foreground" />
                <input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs font-bold w-full sm:w-40"
                />
              </div>
              <button onClick={() => fetchDashboardData()} className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 transition-colors">
                <TrendingUp size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity: any, idx: number) => (
                <Link
                  key={idx}
                  href={getLinkForActivity(activity.type)}
                  className="flex items-center justify-between p-5 rounded-3xl border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl ${activity.type.includes('inscription') ? 'bg-blue-500/10 text-blue-500' :
                      activity.type.includes('message') ? 'bg-rose-500/10 text-rose-500' :
                        'bg-indigo-500/10 text-indigo-500'
                      }`}>
                      {activity.type.includes('inscription') ? <User size={20} /> :
                        activity.type.includes('message') ? <Mail size={20} /> : <Building2 size={20} />}
                    </div>
                    <div>
                      <p className="font-black text-sm group-hover:text-primary transition-colors">{activity.label}</p>
                      <p className="text-xs text-muted-foreground font-bold mt-0.5">
                        Client: <span className="text-foreground font-black">{activity.prenom} {activity.nom}</span> •
                        <span className="ml-1 italic text-primary/70">
                          {new Date(activity.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight size={18} className="text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center py-20 bg-muted/20 border-2 border-dashed border-border rounded-3xl">
                <div className="p-4 bg-white/50 w-fit mx-auto rounded-full mb-4">
                  <Filter size={32} className="text-muted-foreground opacity-30" />
                </div>
                <p className="text-muted-foreground font-bold">Aucune activité récente.</p>
                <button onClick={() => fetchDashboardData()} className="text-xs text-primary font-black uppercase mt-4 hover:underline">Actualiser</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inscriptions Chart */}
        <div className="bg-white dark:bg-gray-900 border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-blue-500" />
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Inscriptions / Mois</h3>
          </div>
          <div className="h-64 w-full">
            {data?.historical?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.historical}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} dy={10} />
                  <YAxis hide={true} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#005A9C' }}
                  />
                  <Line type="monotone" dataKey="inscriptions" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground font-bold text-xs uppercase italic tracking-widest">Pas assez de données</div>
            )}
          </div>
        </div>

        {/* News Chart */}
        <div className="bg-white dark:bg-gray-900 border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Bell size={18} className="text-amber-500" />
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Actualités / Mois</h3>
          </div>
          <div className="h-64 w-full">
            {data?.historical?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.historical}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} dy={10} />
                  <YAxis hide={true} />
                  <Tooltip
                    cursor={{ fill: '#f3f4f6', radius: 8 }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#d97706' }}
                  />
                  <Bar dataKey="news" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground font-bold text-xs uppercase italic tracking-widest">Pas assez de données</div>
            )}
          </div>
        </div>

        {/* Blog Chart */}
        <div className="bg-white dark:bg-gray-900 border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <FileText size={18} className="text-purple-500" />
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Blog (Articles) / Mois</h3>
          </div>
          <div className="h-64 w-full">
            {data?.historical?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.historical}>
                  <defs>
                    <linearGradient id="colorBlog" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} dy={10} />
                  <YAxis hide={true} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#7e22ce' }}
                  />
                  <Area type="monotone" dataKey="blog" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorBlog)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground font-bold text-xs uppercase italic tracking-widest">Pas assez de données</div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
