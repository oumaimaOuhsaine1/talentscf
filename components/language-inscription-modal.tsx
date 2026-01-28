'use client'
import { API_BASE_URL } from '@/lib/api-config';


import React, { useState } from 'react'
import { X, Send, User, Users, Mail, Phone, Globe, Award, Loader2, CheckCircle } from 'lucide-react'

interface LanguageInscriptionModalProps {
    isOpen: boolean
    onClose: () => void
    language: string
}

export default function LanguageInscriptionModal({ isOpen, onClose, language }: LanguageInscriptionModalProps) {
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        level: 'Débutant',
        type: 'Cours en Groupe',
        message: ''
    })

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const res = await fetch(`${API_BASE_URL}/api/language-inscriptions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, language })
            })

            if (res.ok) {
                setSuccess(true)
                setTimeout(() => {
                    onClose()
                    setSuccess(false)
                    setForm({
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone: '',
                        level: 'Débutant',
                        type: 'Cours en Groupe',
                        message: ''
                    })
                }, 3000)
            } else {
                alert('Une erreur est survenue lors de l\'inscription.')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Erreur de connexion au serveur.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className={`relative bg-background border border-border w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300`}>
                {/* Header */}
                <div className="bg-[#BC0C1B] p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            <Globe className="w-6 h-6" />
                            Inscription : {language}
                        </h3>
                        <p className="text-white/80 text-sm">Réservez votre place dès aujourd'hui</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {success ? (
                    <div className="p-12 text-center space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <h4 className="text-2xl font-bold text-foreground">Demande Envoyée !</h4>
                        <p className="text-muted-foreground">Nous avons bien reçu votre demande d'inscription pour les cours de {language}. Un conseiller vous contactera très prochainement.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#BC0C1B]" /> Prénom
                                </label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all"
                                    placeholder="Ex: Jean"
                                    value={form.first_name}
                                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#BC0C1B]" /> Nom
                                </label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all"
                                    placeholder="Ex: Dupont"
                                    value={form.last_name}
                                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-[#BC0C1B]" /> Email
                                </label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all"
                                    placeholder="jean.dupont@email.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-[#BC0C1B]" /> Téléphone
                                </label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all"
                                    placeholder="+212 600..."
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`space-y-2 ${language === 'Espagnol' ? 'md:col-span-2' : ''}`}>
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <Award className="w-4 h-4 text-[#BC0C1B]" /> Votre Niveau
                                </label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all"
                                    value={form.level}
                                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                                >
                                    <option>Débutant (A1)</option>
                                    <option>Élémentaire (A2)</option>
                                    <option>Intermédiaire (B1/B2)</option>
                                    <option>Avancé (C1/C2)</option>
                                </select>
                            </div>
                            {language !== 'Espagnol' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold flex items-center gap-2">
                                        <Users className="w-4 h-4 text-[#BC0C1B]" /> Type de cours
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all"
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    >
                                        <option>Cours en Groupe</option>
                                        <option>Cours Individuels</option>
                                        <option>Cours en Binôme</option>
                                        <option>Préparation Exams (TCF/TOEFL...)</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Message / Besoins spécifiques (optionnel)</label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 focus:ring-2 focus:ring-[#BC0C1B] outline-none transition-all resize-none"
                                placeholder="..."
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-[#BC0C1B] hover:bg-[#a00a17] text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-xl shadow-red-600/20 active:scale-95"
                        >
                            {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-5 h-5" />}
                            Confirmer l'inscription
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
