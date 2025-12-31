'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CoachingSoftSkillsPNLRedirect() {
    const router = useRouter()

    useEffect(() => {
        router.push('/coaching-soft-skills-pnl/coaching-individuel')
    }, [router])

    return null
}
