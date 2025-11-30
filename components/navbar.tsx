'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react'
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
        `block px-4 py-3 text-foreground/80 text-sm first:rounded-t-lg last:rounded-b-lg transform transition-all duration-200 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 ${className}`
      }
    >
      <span className="block">{child.label}</span>
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
    // Special layout for 'À propos' and 'PNL' menus: 4 items left, image center, 3 items right
    if (item.id === 'apropos' || item.id === 'pnl') {
      const leftItems = item.children.slice(0, 4)
      const rightItems = item.children.slice(4)
      // choose center image: keep the forced leadership image for 'apropos',
      // otherwise prefer item.image or the first child's image
      const centerImage = item.id === 'apropos'
        ? '/leadership-training-workshop.png'
        : (item.image || item.children.find((c) => c.image)?.image || '/images/image.png')

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

    // Special layout for 'Cycles professionnels' (image centered, items to the right)
    if (item.id === 'cycles-pro') {
      const items = item.children || []
      const centerImage = item.image || items.find((c) => c.image)?.image || '/leadership-training-workshop.png'

      return (
        <div className="group">
          <button className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </button>

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

    // Special layout for 'Intra-entreprises': image center, split choices 2 left / 2 right
    if (item.id === 'intra-entreprises') {
      const items = item.children || []
      const centerImage = item.image || '/productivity-training.jpg' // prefer item.image if provided
      const leftItems = items.slice(0, 2)
      const rightItems = items.slice(2, 4)

      return (
        <div className="group">
          <button className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors text-sm font-medium">
            {item.label}
            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
          </button>

          <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="w-full bg-white dark:bg-background border-t border-border shadow-lg">
              <div className="max-w-7xl mx-auto w-[92vw] p-6">
                <div className="flex items-start justify-center gap-8">
                  <div className="flex-1 max-w-xs">
                    <div className="flex flex-col rounded-lg overflow-hidden">
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
                      <Image src={centerImage} alt="intra" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 max-w-xs">
                    <div className="flex flex-col rounded-lg overflow-hidden">
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

    // Special layout for 'Coaching & Consulting': left image (training-course) + 4 items, center image, then remaining items to right
    if (item.id === 'coaching') {
      const items = item.children || []
      const leftImage = '/training-course.png' // requested left image
      const centerImage = item.image || '/coaching-consultation.jpg'
      // keep the last 5 items close to the center image when available
      const rightItems = items.length > 5 ? items.slice(-5) : items.slice(4)
      const leftItems = items.slice(0, items.length - rightItems.length)

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
                  <div className="flex items-start gap-4">
                    <div className="relative w-56 h-40 rounded-md overflow-hidden shadow-md self-start">
                      <Image src={leftImage} alt="training-course" fill className="object-cover" />
                    </div>
                    <div className="flex flex-col rounded-lg overflow-hidden max-w-xs">
                      {leftItems.map((child) => (
                        <DropdownItem
                          key={child.id}
                          child={child}
                          className="text-foreground/100 text-base font-semibold px-4 py-3 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="relative w-56 h-40 rounded-md overflow-hidden shadow-md">
                      <Image src={centerImage} alt="coaching" fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2 max-w-sm">
                    {rightItems.map((child) => (
                      <DropdownItem
                        key={child.id}
                        child={child}
                        className="text-foreground/100 text-base font-semibold px-4 py-3 hover:-translate-y-1 hover:scale-105 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/80 border-b border-border last:border-b-0"
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

    return (
      <div key={item.id}>
        <div className="flex items-center justify-between">
          <Link
            href={item.href}
            className="flex-1 px-4 py-2 text-foreground/70 hover:text-primary hover:bg-muted transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleDropdown(item.id)}
              className="px-4 py-2 text-foreground/70 hover:text-primary"
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>
        {hasChildren && isOpen && (
          <div className={`bg-muted/30 border-l-2 border-primary ml-4`}>
            {(item.children || []).map((child) => (
              <MobileDropdown key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 font-bold text-2xl text-primary">
            <div className="relative w-20 h-20">
              <Image
                src="/images/image.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuData.map((item) => (
              <DesktopDropdown key={item.id} item={item} />
            ))}
            <Link
              href="/contact"
              className="text-foreground/70 hover:text-primary transition-colors text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

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
            className={`md:hidden pb-4 border-t border-border max-h-96 overflow-y-auto ${mobileAnim === 'enter' ? 'mobile-open' : mobileAnim === 'exit' ? 'mobile-close' : ''
              }`}
          >
            {menuData.map((item) => (
              <MobileDropdown key={item.id} item={item} />
            ))}
            <div className="px-4 mt-3">
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium"
                onClick={() => closeMobileMenu()}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
