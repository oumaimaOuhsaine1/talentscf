'use client'

import { BarChart3, Users, BookOpen, Mail, Menu, FileText } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const stats = [
    { icon: Menu, label: 'Navbar Items', value: '12', href: '/admin/navbar-management' },
    { icon: FileText, label: 'Pages', value: '8', href: '/admin/pages-management' },
    { icon: BookOpen, label: 'Formations', value: '6', href: '/admin/formations' },
    { icon: Users, label: 'Participants', value: '125', href: '/admin/participants' },
    { icon: Mail, label: 'Messages', value: '12', href: '/admin/messages' },
    { icon: BarChart3, label: 'Satisfaction', value: '95%', href: '#' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Tableau de bord Administrateur</h1>
        <p className="text-foreground/70">Gérez votre site web, navbar, pages et contenu</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/70 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
              </div>
              <stat.icon size={32} className="text-primary/20" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Actions Rapides</h2>
          <div className="space-y-2">
            <Link
              href="/admin/navbar-management"
              className="block px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center font-semibold"
            >
              Gérer la Navbar
            </Link>
            <Link
              href="/admin/pages-management"
              className="block px-4 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors text-center font-semibold"
            >
              Gérer les Pages
            </Link>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Dernières Modifications</h2>
          <div className="space-y-2 text-sm">
            <p className="text-foreground/70">• Navbar mise à jour</p>
            <p className="text-foreground/70">• Page "Services" créée</p>
            <p className="text-foreground/70">• 3 nouvelles formations ajoutées</p>
          </div>
        </div>
      </div>
    </div>
  )
}
