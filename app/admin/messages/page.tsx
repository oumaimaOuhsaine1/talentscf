'use client'

import { useState } from 'react'
import { Trash2, Eye } from 'lucide-react'

const mockMessages = [
  {
    id: 1,
    name: 'Mohammed Hassan',
    email: 'mohammed@email.com',
    subject: 'Information sur la formation PNL',
    message: 'Je suis intéressé par la formation en PNL. Pouvez-vous m\'envoyer plus de détails ?',
    date: '2025-01-18',
    read: false
  },
  {
    id: 2,
    name: 'Fatima Ahmed',
    email: 'fatima@email.com',
    subject: 'Formation corporate',
    message: 'Nous aimerions organiser une formation pour notre équipe. Avez-vous des tarifs de groupe ?',
    date: '2025-01-17',
    read: true
  },
  {
    id: 3,
    name: 'Ali Karim',
    email: 'ali@email.com',
    subject: 'Questions générales',
    message: 'Bonjour, j\'aimerais connaître les prochaines dates de vos formations.',
    date: '2025-01-16',
    read: true
  },
]

export default function MessagesManagement() {
  const [messages, setMessages] = useState(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      setMessages(messages.filter(m => m.id !== id))
    }
  }

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gestion des Messages</h1>
        <p className="text-foreground/70">{unreadCount} message(s) non lu(s)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedMessage?.id === message.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              } ${!message.read ? 'bg-primary/10' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`font-semibold ${!message.read ? 'text-primary' : ''}`}>{message.name}</h3>
                  <p className="text-sm text-foreground/70">{message.email}</p>
                </div>
                <span className="text-xs text-foreground/50">{message.date}</span>
              </div>
              <p className="text-sm font-medium">{message.subject}</p>
              <p className="text-sm text-foreground/70 line-clamp-1 mt-1">{message.message}</p>
            </div>
          ))}
        </div>

        {/* Message Detail */}
        {selectedMessage && (
          <div className="lg:col-span-1 bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{selectedMessage.subject}</h2>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-foreground/70 text-sm">De</p>
                <p className="font-semibold">{selectedMessage.name}</p>
                <p className="text-sm text-foreground/70">{selectedMessage.email}</p>
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Date</p>
                <p className="font-semibold">{selectedMessage.date}</p>
              </div>
            </div>
            <div className="border-t border-border pt-4 mb-6">
              <p className="text-foreground/70 text-sm mb-2">Message</p>
              <p className="leading-relaxed">{selectedMessage.message}</p>
            </div>
            <button
              onClick={() => handleDelete(selectedMessage.id)}
              className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
