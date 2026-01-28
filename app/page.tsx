'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import HeroSection from '@/components/hero-section'
import ServicesSection from '@/components/services-section'

import LanguagesSection from '@/components/languages-section'
import IndividualLanguagesSection from '@/components/individual-languages-section'


export default function Home() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    setIsDark(!isDark)
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />

        <LanguagesSection />
        <IndividualLanguagesSection />

      </main>
      <Footer />
    </div>
  )
}
