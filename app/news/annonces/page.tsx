'use client'

import { useEffect } from 'react'

export default function AnnoncesPage() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.location.replace('/actualites/annonces-partenariats')
        }
    }, [])

    return null
}
