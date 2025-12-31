'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Calendar, Bell, Music, ArrowRight } from 'lucide-react'

export default function NewsPage() {
    // Redirect legacy /news route to /actualites
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.location.replace('/actualites')
        }
    }, [])

    return null
}
