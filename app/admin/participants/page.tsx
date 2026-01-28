'use client'

import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'

const mockParticipants = [
  { id: 1, name: 'Ahmed Bouhmidi', email: 'ahmed@email.com', phone: '+212 6XX XXX XXX', formation: 'PNL Fondamentaux', date: '15-17 Janvier' },
  { id: 2, name: 'Leila Mansouri', email: 'leila@email.com', phone: '+212 6XX XXX XXX', formation: 'Coaching pour Leaders', date: '22-24 Janvier' },
  { id: 3, name: 'Karim Bencheikh', email: 'karim@email.com', phone: '+212 6XX XXX XXX', formation: 'Communication Efficace', date: '29-30 Janvier' },
]

export default function ParticipantsManagement() {
  const [participants] = useState(mockParticipants)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gestion des Participants</h1>
        <p className="text-foreground/70">Total: {participants.length} participants</p>
      </div>

      <div className="flex justify-between items-center mb-6 px-1">
        <input
          type="text"
          placeholder="Rechercher un participant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-border rounded-lg"
        />
        <button
          onClick={() => {
            import('xlsx').then(xlsx => {
              const worksheet = xlsx.utils.json_to_sheet(filtered.map(p => ({
                Nom: p.name,
                Email: p.email,
                Téléphone: p.phone,
                Formation: p.formation,
              })));
              const workbook = xlsx.utils.book_new();
              xlsx.utils.book_append_sheet(workbook, worksheet, "Participants");
              xlsx.writeFile(workbook, "Participants.xlsx");
            })
          }}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl font-bold hover:scale-105 transition-all"
        >
          Exporter Excel
        </button>
      </div>

      <>
        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filtered.map((participant) => (
            <div key={participant.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-border shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground">{participant.name}</h3>
                  <p className="text-xs text-primary font-medium mt-1">{participant.formation}</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Supprimer ce participant ?')) {
                      // Logic suppression
                    }
                  }}
                  className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-lg text-xs font-bold uppercase"
                >
                  Supr.
                </button>
              </div>
              <div className="space-y-2">
                <a href={`mailto:${participant.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={16} /> {participant.email}
                </a>
                <a href={`tel:${participant.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={16} /> {participant.phone}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Nom</th>
                <th className="text-left px-6 py-3 font-semibold">Email</th>
                <th className="text-left px-6 py-3 font-semibold">Téléphone</th>
                <th className="text-left px-6 py-3 font-semibold">Formation</th>
                <th className="text-left px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((participant) => (
                <tr key={participant.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 font-semibold">{participant.name}</td>
                  <td className="px-6 py-3">
                    <a href={`mailto:${participant.email}`} className="text-primary hover:underline flex items-center gap-2">
                      <Mail size={16} />
                      {participant.email}
                    </a>
                  </td>
                  <td className="px-6 py-3">
                    <a href={`tel:${participant.phone}`} className="text-primary hover:underline flex items-center gap-2">
                      <Phone size={16} />
                      {participant.phone}
                    </a>
                  </td>
                  <td className="px-6 py-3">{participant.formation}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => {
                        if (confirm('Supprimer ce participant ?')) {
                          // Logic suppression (mock)
                        }
                      }}
                      className="px-3 py-2 bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white rounded-xl transition-all shadow-sm text-[10px] font-black uppercase tracking-wider"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  )
}
