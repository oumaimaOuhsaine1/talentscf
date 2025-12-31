'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, Mail, Clock, UploadCloud } from 'lucide-react'

export default function InscriptionsPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: '',
    nationalite: '',
    telephone: '',
    email: '',
    niveau: '',
    specialite: '',
    etablissement: '',
    anneeDiplome: '',
    typeFormation: '',
    intitule: '',
    mode: '',
    accept: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    if (type === 'checkbox') setForm((p) => ({ ...p, [name]: checked }))
    else setForm((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.accept) {
      alert("Veuillez accepter les conditions d'inscription.")
      return
    }
    setSubmitting(true)
    // mock submit
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const [uploaded, setUploaded] = useState<{ cv?: string; diplome?: string; idCard?: string; photo?: string }>({})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'cv' | 'diplome' | 'idCard' | 'photo') => {
    const f = e.target.files?.[0]
    setUploaded((p) => ({ ...p, [key]: f ? f.name : '' }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar isDark={false} onToggleTheme={() => {}} />

      <main className="flex-1">
        <section className="relative h-56 w-full overflow-hidden bg-gradient-to-r from-[#003E6B] to-[#002845]">
          <div className="absolute inset-0 opacity-30">
            <Image src="/images/contact.png" alt="contact" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">Inscriptions en ligne</h1>
            <p className="text-white/80 mt-2 max-w-2xl">Remplissez le formulaire ci-dessous pour finaliser votre inscription.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-9">
                <div className="bg-white dark:bg-gray-800 border border-border rounded-xl p-10 shadow-sm">
                  {submitted ? (
                    <div className="flex items-center gap-4 p-4 rounded-md bg-green-50 border border-green-200 text-green-800">
                      <CheckCircle className="w-6 h-6" />
                      <div>
                        <div className="font-semibold">Votre inscription a été reçue</div>
                        <div className="text-sm">Nous vous contacterons bientôt pour la suite.</div>
                      </div>
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nom</label>
                        <input name="nom" value={form.nom} onChange={handleChange} required className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Prénom</label>
                        <input name="prenom" value={form.prenom} onChange={handleChange} required className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Date de naissance</label>
                        <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} required className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Sexe</label>
                        <select name="sexe" value={form.sexe} onChange={handleChange} required className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base">
                          <option value="">Sélectionnez</option>
                          <option>Femme</option>
                          <option>Homme</option>
                          <option>Autre</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Nationalité</label>
                        <input name="nationalite" value={form.nationalite} onChange={handleChange} className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Numéro de téléphone</label>
                        <input name="telephone" value={form.telephone} onChange={handleChange} className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Adresse e-mail</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-5 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C] text-base" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Informations académiques</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <select name="niveau" value={form.niveau} onChange={handleChange} required className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C]">
                          <option value="">Niveau d’études actuel</option>
                          <option value="Bac">Bac</option>
                          <option value="Bac+2">Bac+2</option>
                          <option value="Bac+3">Bac+3</option>
                        </select>

                        <input name="specialite" value={form.specialite} onChange={handleChange} placeholder="Spécialité / filière" className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C]" />

                        <input name="etablissement" value={form.etablissement} onChange={handleChange} placeholder="Établissement d’origine" className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C]" />

                        <input name="anneeDiplome" value={form.anneeDiplome} onChange={handleChange} placeholder="Année d’obtention du diplôme" className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C]" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Choix de la formation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <select name="typeFormation" value={form.typeFormation} onChange={handleChange} required className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C]">
                          <option value="">Type de formation</option>
                          <option value="Bachelor">Bachelor</option>
                          <option value="Formation professionnelle">Formation professionnelle</option>
                          <option value="Certification">Certification</option>
                        </select>

                        <select name="intitule" value={form.intitule} onChange={handleChange} required className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C]">
                          <option value="">Intitulé de la formation</option>
                          <option value="MBA">MBA</option>
                          <option value="Bachelor Gestion">Bachelor Gestion</option>
                          <option value="Certification PNL">Certification PNL</option>
                        </select>

                        <select name="mode" value={form.mode} onChange={handleChange} required className="w-full px-4 py-3 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-[#005A9C]">
                          <option value="">Mode</option>
                          <option value="Présentiel">Présentiel</option>
                          <option value="À distance">À distance</option>
                        </select>

                        <div />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Téléversement des documents</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div className="flex items-center gap-4">
                          <label className="w-40 text-sm">CV (PDF)</label>
                          <label className="flex-1 flex items-center gap-3 p-3 border border-dashed rounded-md cursor-pointer hover:border-primary">
                            <UploadCloud className="w-5 h-5 text-[#005A9C]" />
                            <span className="text-sm text-foreground/70">{uploaded.cv || 'Téléverser le CV (PDF)'}</span>
                            <input type="file" accept="application/pdf" className="sr-only" onChange={(e) => handleFileChange(e, 'cv')} />
                          </label>
                        </div>

                        <div className="flex items-center gap-4">
                          <label className="w-40 text-sm">Diplôme ou attestation</label>
                          <label className="flex-1 flex items-center gap-3 p-3 border border-dashed rounded-md cursor-pointer hover:border-primary">
                            <UploadCloud className="w-5 h-5 text-[#005A9C]" />
                            <span className="text-sm text-foreground/70">{uploaded.diplome || 'Téléverser le diplôme / attestation'}</span>
                            <input type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'diplome')} />
                          </label>
                        </div>

                        <div className="flex items-center gap-4">
                          <label className="w-40 text-sm">Carte d'identité</label>
                          <label className="flex-1 flex items-center gap-3 p-3 border border-dashed rounded-md cursor-pointer hover:border-primary">
                            <UploadCloud className="w-5 h-5 text-[#005A9C]" />
                            <span className="text-sm text-foreground/70">{uploaded.idCard || "Téléverser la carte d'identité"}</span>
                            <input type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'idCard')} />
                          </label>
                        </div>

                        <div className="flex items-center gap-4">
                          <label className="w-40 text-sm">Photo (optionnel)</label>
                          <label className="flex-1 flex items-center gap-3 p-3 border border-dashed rounded-md cursor-pointer hover:border-primary">
                            <UploadCloud className="w-5 h-5 text-[#005A9C]" />
                            <span className="text-sm text-foreground/70">{uploaded.photo || 'Téléverser une photo (optionnel)'}</span>
                            <input type="file" accept="image/*" className="sr-only" onChange={(e) => handleFileChange(e, 'photo')} />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input type="checkbox" name="accept" checked={form.accept} onChange={handleChange} />
                      <label>J’accepte les conditions d’inscription</label>
                    </div>

                    <div className="flex items-center justify-end">
                      <button type="submit" disabled={submitting} className="px-6 py-3 bg-[#005A9C] hover:bg-[#004a7f] text-white font-semibold rounded-lg">
                        {submitting ? 'Envoi...' : 'S’inscrire'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <aside className="lg:col-span-3">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#e6f0ff] rounded-md">
                        <Mail className="w-6 h-6 text-[#052A63]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Email</h4>
                        <div className="text-foreground/70">info@talents.ma</div>
                        <div className="text-sm text-foreground/50 mt-1">Réponse dans 24h</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#e6f0ff] rounded-md">
                        <Clock className="w-6 h-6 text-[#052A63]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">Horaires</h4>
                        <div className="text-foreground/70">Lundi - Vendredi 09:00–21:30</div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* Map + address below the form */}
          <div className="max-w-7xl mx-auto px-4 mt-8">
            <div className="bg-white dark:bg-gray-800 border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Localisation du centre</h3>
                <div className="text-foreground/70 mb-4">Bureau N° 45, Centre d'affaire MALIZIA — Allal El Fassi, Marrakech 40000</div>
                <div className="w-full h-72 rounded-md overflow-hidden border">
                  <iframe
                    title="Centre d'affaire MALIZIA - Carte"
                    src="https://www.google.com/maps?q=31.6649778,-8.0124168&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
