'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

export default function CustomizationPage() {
  const [settings, setSettings] = useState({
    siteName: 'Talents Consulting & Formation',
    tagline: 'Formations en PNL, Coaching, Soft Skills',
    email: 'info@talents.ma',
    phone: '+212 5XX XXX XXX',
    address: 'Casablanca, Maroc',
    primaryColor: '#001F3F',
    secondaryColor: '#4DB8FF',
    accentColor: '#E63946',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('siteSettings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Personnalisation du Site</h1>
        <p className="text-foreground/70">Modifiez les informations et l'apparence de votre site</p>
      </div>

      {saved && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-700">
          Paramètres sauvegardés avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Informations Générales</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Nom du Site</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Color Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Couleurs du Thème</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Couleur Primaire</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="primaryColor"
                  value={settings.primaryColor}
                  onChange={handleChange}
                  className="w-12 h-10 border border-border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-sm"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Couleur Secondaire</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="secondaryColor"
                  value={settings.secondaryColor}
                  onChange={handleChange}
                  className="w-12 h-10 border border-border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-sm"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Couleur Accent</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="accentColor"
                  value={settings.accentColor}
                  onChange={handleChange}
                  className="w-12 h-10 border border-border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.accentColor}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-sm"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90"
          >
            <Save size={20} />
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  )
}
