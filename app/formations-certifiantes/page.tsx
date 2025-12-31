'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FormationsCertifiantesRedirect() {
    const router = useRouter()

    useEffect(() => {
        router.push('/formations-certifiantes/u-blue-hills')
    }, [router])

    return null
}
