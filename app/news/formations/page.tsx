'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function ProchainesFormationsPage() {
    // redirect to new actualites page
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.location.replace('/actualites/novetautes-formations')
        }
    }, [])

    return null
}
