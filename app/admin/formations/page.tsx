'use client'

import { useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import Link from 'next/link'

const mockTrainings = [
  { id: 1, title: 'Fondamentaux de la PNL', category: 'PNL', trainer: 'Dr. Mohamed Alaoui', price: '2,500 MAD', participants: 12 },
  { id: 2, title: 'Coaching pour Leaders', category: 'Coaching', trainer: 'Fatima Bennani', price: '3,000 MAD', participants: 8 },
  { id: 3, title: 'Communication Efficace', category: 'Soft Skills', trainer: 'Hassan Khamlichi', price: '2,000 MAD', participants: 15 },
  { id: 4, title: 'PNL Avancée', category: 'PNL', trainer: 'Dr. Mohamed Alaoui', price: '3,500 MAD', participants: 10 },
]

export default function FormationsManagement() {
  const [trainings, setTrainings] = useState(mockTrainings)
  const [selectedTraining, setSelectedTraining] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      setTrainings(trainings.filter(t => t.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Formations</h1>
        <button
          onClick={() => { setShowForm(!showForm); setSelectedTraining(null); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <Plus size={20} />
          Ajouter une Formation
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">{selectedTraining ? 'Modifier' : 'Ajouter'} une Formation</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Titre" className="px-4 py-2 border border-border rounded-lg" defaultValue={selectedTraining?.title} />
              <select className="px-4 py-2 border border-border rounded-lg" defaultValue={selectedTraining?.category}>
                <option>PNL</option>
                <option>Coaching</option>
                <option>Soft Skills</option>
              </select>
              <input type="text" placeholder="Formateur" className="px-4 py-2 border border-border rounded-lg" defaultValue={selectedTraining?.trainer} />
              <input type="text" placeholder="Prix" className="px-4 py-2 border border-border rounded-lg" defaultValue={selectedTraining?.price} />
            </div>
            <textarea placeholder="Description" className="w-full px-4 py-2 border border-border rounded-lg resize-none" rows={4}></textarea>
            <div className="flex gap-2">
              <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Enregistrer
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-border rounded-lg hover:bg-muted">
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">Titre</th>
              <th className="text-left px-6 py-3 font-semibold">Catégorie</th>
              <th className="text-left px-6 py-3 font-semibold">Formateur</th>
              <th className="text-left px-6 py-3 font-semibold">Prix</th>
              <th className="text-left px-6 py-3 font-semibold">Participants</th>
              <th className="text-left px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((training) => (
              <tr key={training.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-3">{training.title}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                    training.category === 'PNL' ? 'bg-primary' :
                    training.category === 'Coaching' ? 'bg-secondary' :
                    'bg-accent'
                  }`}>
                    {training.category}
                  </span>
                </td>
                <td className="px-6 py-3">{training.trainer}</td>
                <td className="px-6 py-3">{training.price}</td>
                <td className="px-6 py-3">{training.participants}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelectedTraining(training); setShowForm(true); }}
                      className="p-2 text-primary hover:bg-primary/10 rounded"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(training.id)}
                      className="p-2 text-accent hover:bg-accent/10 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
