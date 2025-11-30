'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Users, Mail, Palette, X } from 'lucide-react'

interface AdminSidebarProps {
  isOpen: boolean
}

export default function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: BookOpen, label: 'Formations', href: '/admin/formations' },
    { icon: Users, label: 'Participants', href: '/admin/participants' },
    { icon: Mail, label: 'Messages', href: '/admin/messages' },
    { icon: Palette, label: 'Customisation', href: '/admin/customization' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 md:hidden z-30" />
      )}

      {/* Sidebar */}
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 left-0 top-0 h-screen w-64 bg-card border-r border-border transition-transform z-40`}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Image
            src="/images/image.png"
            alt="Logo Talents Consulting"
            width={150}
            height={50}
            className="object-contain"
          />
          <button className="md:hidden" onClick={() => { }}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-primary text-white'
                  : 'text-foreground/70 hover:bg-muted'
                  }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <Link href="/" className="text-primary text-sm font-semibold hover:text-primary/80">
            ← Retour au site
          </Link>
        </div>
      </aside>
    </>
  )
}
