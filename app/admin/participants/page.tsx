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

      <input
        type="text"
        placeholder="Rechercher un participant..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-border rounded-lg"
      />

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">Nom</th>
              <th className="text-left px-6 py-3 font-semibold">Email</th>
              <th className="text-left px-6 py-3 font-semibold">Téléphone</th>
              <th className="text-left px-6 py-3 font-semibold">Formation</th>
              <th className="text-left px-6 py-3 font-semibold">Dates</th>
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
                <td className="px-6 py-3 text-foreground/70">{participant.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
