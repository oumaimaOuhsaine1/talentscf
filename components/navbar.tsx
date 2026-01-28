'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, ChevronDown, Phone } from 'lucide-react'
import { getMenuData, MenuItemConfig } from '@/lib/menu-data'
import Image from "next/image"

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  // control rendering and animations for mobile menu so we can animate close
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [mobileAnim, setMobileAnim] = useState<'enter' | 'exit' | 'idle'>('idle')
  const [menuData, setMenuData] = useState<MenuItemConfig[]>([])
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set())

  useEffect(() => {
    setMenuData(getMenuData().items)
  }, [])

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      // no-op, leaving here if timers are added later
    }
  }, [])

  const toggleDropdown = (id: string) => {
    const newDropdowns = new Set(openDropdowns)
    if (newDropdowns.has(id)) {
      newDropdowns.delete(id)
    } else {
      newDropdowns.add(id)
    }
    setOpenDropdowns(newDropdowns)
  }

  const closeAllDropdowns = () => {
    setOpenDropdowns(new Set())
  }

  const DropdownItem = ({ child, className = '' }: { child: MenuItemConfig; className?: string }) => (
    <Link
      href={child.href}
      className={
        `flex items-center gap-3 px-4 py-3 text-foreground/80 text-sm first:rounded-t-lg last:rounded-b-lg transform transition-all duration-200 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 ${className}`
      }
    >
      {child.image && (
        <div className="relative w-6 h-4 flex-shrink-0">
          <Image src={child.image} alt={child.label} fill className="object-cover rounded-sm" />
        </div>
      )}
      <span className="block font-semibold">{child.label}</span>
    </Link>
  )

  const DesktopDropdown = ({ item }: { item: MenuItemConfig }) => {
    if (!item.children || item.children.length === 0) {
      return (
        <Link
          href={item.href}
          className="text-foreground/70 hover:text-primary transition-colors text-sm font-medium"
        >
          {item.label}
        </Link>
      )
    }
    // Special layout for 'À propos' menu: 4 items left, image center, 3 items right
    if (item.id === 'apropos') {
      const leftItems = item.children.slice(0, 2)
      const rightItems = item.children.slice(2)
      const centerImage = '/leadership-training-workshop.png'

      return (
        <div className="group">
          <Link href={item.href} className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </Link>

          <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="w-full bg-white dark:bg-background border-t border-border shadow-lg">
              <div className="max-w-7xl mx-auto w-[92vw] p-6">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1 flex flex-col justify-center divide-y divide-border rounded-lg overflow-hidden">
                    {leftItems.map((child) => (
                      <DropdownItem
                        key={child.id}
                        child={child}
                        className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                      />
                    ))}
                  </div>

                  <div className="flex-shrink-0 px-4">
                    <div className="relative w-56 h-40 rounded-md overflow-hidden shadow-md">
                      <Image src={centerImage} alt="apropos" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center divide-y divide-border rounded-lg overflow-hidden">
                    {rightItems.map((child) => (
                      <DropdownItem
                        key={child.id}
                        child={child}
                        className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Special layout for 'Coaching- Soft Skills- PNL': 4 items left, image center, rest right
    if (item.id === 'coaching-soft-skills-pnl') {
      const leftItems = item.children?.slice(0, 4) || []
      const rightItems = item.children?.slice(4) || []
      const centerImage = item.image || '/neuro-linguistic-programming.jpg'

      return (
        <div className="group">
          <Link href={item.href} className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </Link>

          <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="w-full bg-white dark:bg-background border-t border-border shadow-lg">
              <div className="max-w-7xl mx-auto w-[92vw] p-6">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1 flex flex-col justify-center divide-y divide-border rounded-lg overflow-hidden">
                    {leftItems.map((child) => (
                      <DropdownItem
                        key={child.id}
                        child={child}
                        className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                      />
                    ))}
                  </div>

                  <div className="flex-shrink-0 px-4">
                    <div className="relative w-64 h-48 rounded-md overflow-hidden shadow-md">
                      <Image src={centerImage} alt="coaching" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center divide-y divide-border rounded-lg overflow-hidden">
                    {rightItems.map((child) => (
                      <DropdownItem
                        key={child.id}
                        child={child}
                        className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Special layout for 'Diplômes': Diplômes left, image center, Formations certifiantes right
    if (item.id === 'diplomes') {
      const diplomesGroup = item.children?.find(c => c.id === 'diplomes-group')
      const formationsGroup = item.children?.find(c => c.id === 'formations-certifiantes-group')
      const centerImage = item.image || '/certificate-achievement.jpg'

      return (
        <div className="group">
          <Link href={item.href} className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </Link>

          <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="w-full bg-white dark:bg-background border-t border-border shadow-lg">
              <div className="max-w-7xl mx-auto w-[92vw] p-6">
                <div className="flex items-start justify-center gap-8">
                  {/* Diplômes Group */}
                  <div className="flex-1 max-w-xs">
                    <h4 className="text-primary font-bold mb-4 px-4 uppercase text-sm tracking-wider border-b border-primary/20 pb-2">
                      {diplomesGroup?.label}
                    </h4>
                    <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden">
                      {diplomesGroup?.children?.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Center Image */}
                  <div className="flex-shrink-0 px-4 self-center">
                    <div className="relative w-64 h-48 rounded-md overflow-hidden shadow-md">
                      <Image src={centerImage} alt="consulting" fill className="object-cover" />
                    </div>
                  </div>

                  {/* Formations Group */}
                  <div className="flex-1 max-w-xs">
                    <h4 className="text-primary font-bold mb-4 px-4 uppercase text-sm tracking-wider border-b border-primary/20 pb-2">
                      {formationsGroup?.label}
                    </h4>
                    <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden">
                      {formationsGroup?.children?.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Special layout for 'Cycles professionnels' (image centered, items to the right)
    if (item.id === 'cycles-pro') {
      const items = item.children || []
      const centerImage = item.image || items.find((c) => c.image)?.image || '/leadership-training-workshop.png'

      return (
        <div className="group">
          <Link href={item.href} className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </Link>

          <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="w-full bg-white dark:bg-background border-t border-border shadow-lg">
              <div className="max-w-7xl mx-auto w-[92vw] p-6">
                <div className="flex items-start justify-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-64 h-44 rounded-md overflow-hidden shadow-md">
                      <Image src={centerImage} alt="cycles" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 max-w-md">
                    <div className="flex flex-col gap-2">
                      {items.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Special layout for 'Langues': image center, split choices 2 left / 2 right
    if (item.id === 'langues') {
      const items = item.children || []
      const centerImage = item.image || '/languages-globe.jpg'
      const leftItems = items.slice(0, 2)
      const rightItems = items.slice(2, 4)

      return (
        <div className="group">
          <Link href={item.href} className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </Link>

          <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="w-full bg-white dark:bg-background border-t border-border shadow-lg">
              <div className="max-w-5xl mx-auto w-[92vw] p-6">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex-1 max-w-xs">
                    <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden">
                      {leftItems.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 px-4">
                    <div className="relative w-64 h-48 rounded-md overflow-hidden shadow-md">
                      <Image src={centerImage} alt="langues" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 max-w-xs">
                    <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden">
                      {rightItems.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Special layout for 'News' / 'Actualités': 2 items left, center image, others right
    if (item.id === 'news' || item.id === 'actualites') {
      const items = item.children || []
      const leftItems = items.slice(0, 2)
      const rightItems = items.slice(2)
      const centerImage = item.image || '/images/bansection.jpg'

      return (
        <div className="group">
          <Link href={item.href} className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </Link>

          <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="w-full bg-white dark:bg-background border-t border-border shadow-lg">
              <div className="max-w-7xl mx-auto w-[92vw] p-6">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex-1 max-w-xs">
                    <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden">
                      {leftItems.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="relative w-64 h-44 rounded-md overflow-hidden shadow-md">
                      <Image src={centerImage} alt="news" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 max-w-xs">
                    <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden">
                      {rightItems.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Special layout for 'Contact': 2 items left, image center, 1 item right
    if (item.id === 'contact') {
      const items = item.children || []
      const leftItems = items.slice(0, 2)
      const rightItems = items.slice(2)
      const centerImage = item.image || '/images/contact.png'

      return (
        <div className="group">
          <Link href={item.href} className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </Link>

          <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="w-full bg-white dark:bg-background border-t border-border shadow-lg">
              <div className="max-w-7xl mx-auto w-[92vw] p-6">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex-1 max-w-xs">
                    <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden">
                      {leftItems.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="relative w-64 h-44 rounded-md overflow-hidden shadow-md">
                      <Image src={centerImage} alt="contact" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 max-w-xs">
                    <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden">
                      {rightItems.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }



    // Special layout for 'Accompagnement': 2 items left, image center, 2 items right
    if (item.id === 'accompagnement') {
      const leftItems = item.children?.slice(0, 2) || []
      const rightItems = item.children?.slice(2) || []
      const centerImage = '/images/vision.jpg'

      return (
        <div className="group">
          <button className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </button>

          <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="w-full bg-white dark:bg-background border-t border-border shadow-lg">
              <div className="max-w-7xl mx-auto w-[92vw] p-6">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1 flex flex-col justify-center divide-y divide-border rounded-lg overflow-hidden">
                    {leftItems.map((child) => (
                      <DropdownItem
                        key={child.id}
                        child={child}
                        className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                      />
                    ))}
                  </div>

                  <div className="flex-shrink-0 px-4">
                    <div className="relative w-64 h-48 rounded-md overflow-hidden shadow-md">
                      <Image src={centerImage} alt="accompagnement" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center divide-y divide-border rounded-lg overflow-hidden">
                    {rightItems.map((child) => (
                      <DropdownItem
                        key={child.id}
                        child={child}
                        className="text-foreground/100 text-base font-semibold px-6 py-4 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }





    return (
      <div className="relative group">
        <button className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
          {item.label}
          <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
        </button>
        <div className="absolute left-0 mt-0 w-72 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40 divide-y divide-border">
          {item.children?.map((child) => (
            <DropdownItem key={child.id} child={child} />
          ))}
        </div>
      </div>
    )
  }

  const MobileDropdown = ({ item, depth = 0 }: { item: MenuItemConfig; depth?: number }) => {
    const isOpen = openDropdowns.has(item.id)
    const hasChildren = item.children && item.children.length > 0

    // Pour les items de niveau 0 (menu principal mobile)
    if (depth === 0) {
      return (
        <div className="mb-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-border/50 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              {!hasChildren ? (
                <Link
                  href={item.href}
                  className="flex-1 flex items-center gap-3 px-5 py-4 text-base font-bold text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex-1">{item.label}</span>
                  <span className="text-primary text-xl">→</span>
                </Link>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="flex-1 flex items-center gap-3 px-5 py-4 text-base font-bold text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex-1">{item.label}</span>
                  </Link>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="px-5 py-4 text-primary hover:bg-primary/10 transition-all duration-200"
                    aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                  >
                    <ChevronDown
                      size={22}
                      className={`transition-all duration-500 ease-out ${isOpen ? 'rotate-180 text-primary' : 'text-foreground/60'}`}
                    />
                  </button>
                </>
              )}
            </div>

            {/* Sous-menu avec animation */}
            {hasChildren && (
              <div
                className={`
                  grid transition-all duration-500 ease-in-out
                  ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                `}
              >
                <div className="overflow-hidden">
                  <div className="p-3 pt-1 space-y-2 bg-gradient-to-b from-primary/5 via-muted/30 to-background/50 border-t border-border/30">
                    {(item.children || []).map((child, index) => (
                      <div
                        key={child.id}
                        className={`
                          transform transition-all duration-300 ease-out
                          ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                        `}
                        style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
                      >
                        <MobileDropdown item={child} depth={depth + 1} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    // Pour les items de niveau 1 (sous-menus)
    if (depth === 1) {
      return (
        <div className="rounded-xl bg-white dark:bg-gray-800 border border-border/40 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 overflow-hidden">
          <div className="flex items-center justify-between">
            {!hasChildren ? (
              <Link
                href={item.href}
                className="flex-1 flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-foreground/90 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.image && (
                  <div className="relative w-7 h-5 flex-shrink-0 rounded-md overflow-hidden shadow-sm">
                    <Image src={item.image} alt={item.label} fill className="object-cover" />
                  </div>
                )}
                <span className="flex-1">{item.label}</span>
                <span className="text-primary/60 text-sm">→</span>
              </Link>
            ) : (
              <>
                <Link
                  href={item.href}
                  className="flex-1 flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-foreground/90 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.image && (
                    <div className="relative w-7 h-5 flex-shrink-0 rounded-md overflow-hidden shadow-sm">
                      <Image src={item.image} alt={item.label} fill className="object-cover" />
                    </div>
                  )}
                  <span className="flex-1">{item.label}</span>
                </Link>
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="px-4 py-3.5 text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </>
            )}
          </div>

          {/* Sous-sous-menu */}
          {hasChildren && (
            <div
              className={`
                grid transition-all duration-400 ease-in-out
                ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
              `}
            >
              <div className="overflow-hidden">
                <div className="p-2 space-y-1.5 bg-muted/20 border-t border-border/30">
                  {(item.children || []).map((child) => (
                    <MobileDropdown key={child.id} item={child} depth={depth + 1} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    // Pour les niveaux plus profonds (niveau 2+)
    return (
      <Link
        href={item.href}
        className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-primary"
        onClick={() => setIsOpen(false)}
      >
        {item.image && (
          <div className="relative w-6 h-4 flex-shrink-0 rounded overflow-hidden">
            <Image src={item.image} alt={item.label} fill className="object-cover" />
          </div>
        )}
        <span className="font-medium">{item.label}</span>
      </Link>
    )
  }

  const openMobileMenu = () => {
    setIsOpen(true)
    setShowMobileMenu(true)
    setMobileAnim('enter')
  }

  const closeMobileMenu = () => {
    // trigger exit animation then unmount
    setMobileAnim('exit')
    setIsOpen(false)
    window.setTimeout(() => {
      setShowMobileMenu(false)
      setMobileAnim('idle')
    }, 240)
  }

  const toggleMobile = () => {
    if (!isOpen) openMobileMenu()
    else closeMobileMenu()
  }

  return (
    <nav className="sticky top-0 z-50 w-full relative border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - positioned to the left */}
          <Link href="/" className="flex items-center gap-3 font-bold text-2xl text-primary mr-16 flex-shrink-0">
            <div className="relative w-24 h-24">
              <Image
                src="/images/logo-talents.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Menu - flex-1 to take remaining space */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {menuData.map((item) => (
              <DesktopDropdown key={item.id} item={item} />
            ))}
          </div>

          {/* Right side icons - pushed to the right */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobile}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div
            className={`md:hidden absolute left-0 right-0 top-full bg-background/98 backdrop-blur-xl border-b border-border shadow-2xl ${mobileAnim === 'enter' ? 'mobile-open' : mobileAnim === 'exit' ? 'mobile-close' : ''
              }`}
          >
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
              <div className="p-4 space-y-2 bg-gradient-to-b from-primary/5 via-background to-background">
                {menuData.map((item, index) => (
                  <div
                    key={item.id}
                    className="transform transition-all duration-300"
                    style={{
                      transitionDelay: mobileAnim === 'enter' ? `${index * 50}ms` : '0ms',
                      opacity: mobileAnim === 'enter' ? 1 : 0,
                      transform: mobileAnim === 'enter' ? 'translateY(0)' : 'translateY(-10px)'
                    }}
                  >
                    <MobileDropdown item={item} />
                  </div>
                ))}

                {/* Contact Button */}
                <div className="pt-4 pb-2">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-primary via-primary to-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    onClick={() => closeMobileMenu()}
                  >
                    <Phone size={20} />
                    <span>Contactez-nous</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
