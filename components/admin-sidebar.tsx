'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Mail, X, LogOut, GraduationCap, Building2, Globe, Newspaper, Bell, Handshake, Briefcase, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { removeToken } from '@/lib/auth'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuGroups = [
  {
    title: 'Général',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    ]
  },
  {
    title: 'Inscriptions',
    items: [
      { icon: GraduationCap, label: 'Inscriptions', href: '/admin/inscriptions' },
      { icon: Briefcase, label: 'Candidatures Opp.', href: '/admin/opportunities-applications' },
      { icon: Building2, label: 'Réservations', href: '/admin/reservations' },
    ]
  },
  {
    title: 'Gestion de contenu',
    items: [
      { icon: BookOpen, label: 'Formations', href: '/admin/formations' },
      { icon: Building2, label: 'Salles', href: '/admin/rooms' },
      { icon: Globe, label: 'Langues', href: '/admin/langues' },
      { icon: Newspaper, label: 'Blog', href: '/admin/blog' },
      { icon: Users, label: 'Équipe', href: '/admin/team' },
    ]
  },
  {
    title: 'Actualités',
    items: [
      { icon: Bell, label: 'News & Events', href: '/admin/actualites' },
      { icon: Handshake, label: 'Partenaires', href: '/admin/partenaires' },
    ]
  },
  {
    title: 'Support',
    items: [
      { icon: Mail, label: 'Messages', href: '/admin/messages' },
    ]
  }
]

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    removeToken()
    router.push('/admin/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 left-0 top-0 h-screen w-64 bg-card border-r border-border transition-transform z-40 flex flex-col`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Image
            src="/images/logo-talents.png"
            alt="Logo Talents Consulting"
            width={130}
            height={40}
            className="object-contain"
          />
          <button className="md:hidden hover:bg-muted p-1 rounded-lg transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 py-4 space-y-4 flex-1 overflow-y-auto scrollbar-hide">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <p className="text-[10px] uppercase font-black text-muted-foreground/60 px-4 mb-2 tracking-widest">{group.title}</p>
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-foreground/70 hover:bg-muted'
                      }`}
                  >
                    <item.icon size={16} />
                    <span className="font-bold">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-bold text-sm"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  )
}
