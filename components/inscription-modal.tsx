'use client'

import React, { useState } from 'react'
import { CheckCircle, X, Globe, MapPin, GraduationCap, Calendar } from 'lucide-react'

interface InscriptionModalProps {
    isOpen: boolean
    onClose: () => void
    diplomaTitle: string
}

const PAYS_LIST = [
    "Maroc", "France", "Sénégal", "Côte d'Ivoire", "Cameroun", "Mali", "Tunisie", "Algérie", "Bénin", "Gabon", "Autre"
]

const NIVEAUX_LIST = [
    "Baccalauréat", "Bac +1", "Bac +2", "Bac +3", "Bac +4", "Bac +5", "Master / MBA", "Autre"
]

export default function InscriptionModal({ isOpen, onClose, diplomaTitle }: InscriptionModalProps) {
    const [form, setForm] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        pays: 'Maroc',
        ville: '',
        niveau_etudes: 'Bac +2',
        date_naissance: '',
        message: ''
    })
    const [submitting, setSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    if (!isOpen && !showSuccess) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const payload = {
                diploma_type: diplomaTitle,
                last_name: form.nom,
                first_name: form.prenom,
                email: form.email,
                phone: form.telephone,
                pays: form.pays,
                ville: form.ville,
                niveau_etudes: form.niveau_etudes,
                date_naissance: form.date_naissance,
                message: form.message
            }

            const response = await fetch('http://localhost:5000/api/inscriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                setShowSuccess(true)
            } else {
                alert('Une erreur est survenue lors de l\'inscription.')
            }
        } catch (error) {
            console.error('Error during inscription:', error)
            alert('Erreur de connexion au serveur.')
        } finally {
            setSubmitting(false)
        }
    }

    if (showSuccess) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm mx-4 p-8 text-center shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Inscription reçue !</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Merci {form.prenom || 'pour votre intérêt'} ! Votre demande d'inscription pour le {diplomaTitle} a été transmise avec succès. Nos conseillers vous contacteront bientôt.
                    </p>
                    <button
                        onClick={() => { setShowSuccess(false); onClose(); setForm({ nom: '', prenom: '', email: '', telephone: '', pays: 'Maroc', ville: '', niveau_etudes: 'Bac +2', date_naissance: '', message: '' }); }}
                        className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
                    >
                        Continuer
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl mx-4 p-8 shadow-2xl border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#005A9C] to-[#00AEEF] bg-clip-text text-transparent">
                        Inscription - {diplomaTitle}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Nom</label>
                            <input
                                value={form.nom}
                                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                                placeholder="Nom"
                                required
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all focus:ring-2 focus:ring-[#005A9C] outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Prénom</label>
                            <input
                                value={form.prenom}
                                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                                placeholder="Prénom"
                                required
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all focus:ring-2 focus:ring-[#005A9C] outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email (optionnel)</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="votre@email.com"
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all focus:ring-2 focus:ring-[#005A9C] outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Téléphone</label>
                            <input
                                value={form.telephone}
                                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                                placeholder="Téléphone"
                                required
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all focus:ring-2 focus:ring-[#005A9C] outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                                <Globe className="w-3 h-3" /> Pays
                            </label>
                            <select
                                value={form.pays}
                                onChange={(e) => setForm({ ...form, pays: e.target.value })}
                                required
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all focus:ring-2 focus:ring-[#005A9C] outline-none"
                            >
                                {PAYS_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> Ville
                            </label>
                            <input
                                value={form.ville}
                                onChange={(e) => setForm({ ...form, ville: e.target.value })}
                                placeholder="Ex: Casablanca"
                                required
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all focus:ring-2 focus:ring-[#005A9C] outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                                <GraduationCap className="w-3 h-3" /> Niveau d'études actuel
                            </label>
                            <select
                                value={form.niveau_etudes}
                                onChange={(e) => setForm({ ...form, niveau_etudes: e.target.value })}
                                required
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all focus:ring-2 focus:ring-[#005A9C] outline-none"
                            >
                                {NIVEAUX_LIST.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Date de naissance
                            </label>
                            <input
                                type="date"
                                value={form.date_naissance}
                                onChange={(e) => setForm({ ...form, date_naissance: e.target.value })}
                                required
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all focus:ring-2 focus:ring-[#005A9C] outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Message ou Motivations</label>
                        <textarea
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="Pourquoi souhaitez-vous rejoindre ce programme ?"
                            rows={3}
                            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 transition-all focus:ring-2 focus:ring-[#005A9C] outline-none resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-[#005A9C] to-[#00AEEF] hover:from-[#003E6B] hover:to-[#005A9C] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1 mt-4"
                    >
                        {submitting ? 'Traitement en cours...' : 'Confirmer mon inscription'}
                    </button>
                </form>
            </div>
        </div>
    )
}
