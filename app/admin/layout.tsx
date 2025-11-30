'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/admin-sidebar'
import AdminHeader from '@/components/admin-header'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    setIsDark(!isDark)
    localStorage.setItem('adminTheme', isDark ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <AdminHeader isDark={isDark} onToggleTheme={toggleTheme} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
