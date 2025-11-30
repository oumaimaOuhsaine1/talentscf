'use client'

import { Menu, Moon, Sun, LogOut } from 'lucide-react'
import Link from 'next/link'

interface AdminHeaderProps {
  isDark: boolean
  onToggleTheme: () => void
  onToggleSidebar: () => void
}

export default function AdminHeader({ isDark, onToggleTheme, onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 hover:bg-muted rounded-lg"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </Link>
        </div>
      </div>
    </header>
  )
}
