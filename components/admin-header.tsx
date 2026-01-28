'use client'

import { API_BASE_URL } from '@/lib/api-config';

import { useState, useEffect } from 'react'
import { Menu, Bell, User, Mail, GraduationCap, Building2 } from 'lucide-react'
import Link from 'next/link'
import { getToken, getAdmin } from '@/lib/auth'

interface AdminHeaderProps {
  onToggleSidebar: () => void
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [adminName, setAdminName] = useState('Admin')

  useEffect(() => {
    const admin = getAdmin()
    if (admin && admin.username) {
      setAdminName(admin.username)
    }
    fetchTodaysAlerts()
    const interval = setInterval(fetchTodaysAlerts, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const fetchTodaysAlerts = async () => {
    const token = getToken()
    const today = new Date().toISOString().split('T')[0]
    try {
      const response = await fetch(`${API_BASE_URL}/api/stats/dashboard?date=${today}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setAlerts(data.activities || [])
      }
    } catch (error) {
      console.error('Error fetching alerts in header:', error)
    }
  }

  const getIcon = (type: string) => {
    if (type.includes('inscription')) return <GraduationCap size={14} className="text-blue-500" />
    if (type.includes('message')) return <Mail size={14} className="text-rose-500" />
    return <Building2 size={14} className="text-indigo-500" />
  }

  const getTimeGreeting = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 18) return 'Bonjour'
    return 'Bonsoir'
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 hover:bg-muted rounded-lg"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest rounded-full hover:bg-primary/5 transition-all"
          >
            Voir le site
          </Link>

          <div className="relative group">
            <button
              className="p-2.5 rounded-xl hover:bg-muted text-foreground/70 transition-colors relative"
            >
              <Bell size={20} />
              {alerts.length > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-[10px] font-black text-white rounded-full flex items-center justify-center border-2 border-white">
                  {alerts.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-border shadow-2xl rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 transform origin-top-right group-hover:scale-100 scale-95">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Alertes d'aujourd'hui</p>
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{alerts.length}</span>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                {alerts.length > 0 ? (
                  alerts.slice(0, 5).map((alert, idx) => (
                    <div key={idx} className="flex gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-default">
                      <div className="p-2 bg-muted rounded-lg h-fit">
                        {getIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold leading-tight truncate">{alert.label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Par {alert.prenom} {alert.nom}</p>
                      </div>
                      <span className="text-[10px] font-medium text-primary/60 self-center">
                        {new Date(alert.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bell size={24} className="mx-auto text-muted-foreground/30 mb-2" />
                    <p className="text-xs text-muted-foreground font-medium italic">Aucune alerte pour aujourd'hui.</p>
                  </div>
                )}
              </div>

              {alerts.length > 0 && (
                <Link
                  href="/admin"
                  className="block text-center text-[10px] font-black uppercase text-primary mt-4 py-2 border-t border-border hover:underline"
                >
                  Voir tout sur le Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 pr-2 border-r border-border">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest leading-none">{getTimeGreeting()}</p>
              <p className="text-xs font-black text-foreground capitalize">{adminName}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
