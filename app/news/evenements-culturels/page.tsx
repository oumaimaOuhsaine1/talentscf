"use client"

import { useEffect } from 'react'

export default function EvenementsCulturelsPage() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.location.replace('/actualites/evenements-academiques')
        }
    }, [])

    return null
}
