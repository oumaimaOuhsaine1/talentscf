'use client'
import { API_BASE_URL } from '@/lib/api-config';


import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, User, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { setToken, isAuthenticated } from '@/lib/auth'

export default function AdminLoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/admin')
        }
    }, [router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()

            if (response.ok) {
                setToken(data.token, data.admin)
                router.push('/admin')
            } else {
                setError(data.message || 'Identifiants invalides')
            }
        } catch (err) {
            setError('Erreur de connexion au serveur')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#003E6B] relative overflow-hidden px-4">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/20 relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative w-24 h-24 mb-4">
                        <Image
                            src="/images/logo-talents.png"
                            alt="Talents Consulting"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight text-center">
                        Accès Admin
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-center text-sm">
                        Veuillez vous authentifier pour accéder au tableau de bord.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 animate-in slide-in-from-top-2 duration-300">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nom d'utilisateur</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                required
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all dark:text-white"
                                placeholder="Admin"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mot de passe</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                required
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all dark:text-white"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#003E6B] to-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Authentification...
                            </>
                        ) : (
                            'Se connecter'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push('/')}
                        className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
                    >
                        ← Retour au site public
                    </button>
                </div>
            </div>
        </div>
    )
}
