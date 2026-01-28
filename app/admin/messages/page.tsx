'use client'

import { useState, useEffect } from 'react'
import { Trash2, MessageSquare, ClipboardCheck, Loader2, User, Mail, Phone, Calendar, Building, Activity, AlertCircle } from 'lucide-react'
import { getToken } from '@/lib/auth'

type MessageType = 'info' | 'diagnostic'

export default function MessagesManagement() {
  const [activeTab, setActiveTab] = useState<MessageType>('info')
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  useEffect(() => {
    fetchMessages()
  }, [activeTab])

  const fetchMessages = async () => {
    setLoading(true)
    const token = getToken()
    try {
      const endpoint = activeTab === 'info' ? 'info' : 'pre-diagnostic'
      const response = await fetch(`http://127.0.0.1:5000/api/contact/${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return

    const token = getToken()
    try {
      const endpoint = activeTab === 'info' ? 'info' : 'pre-diagnostic'
      const response = await fetch(`http://127.0.0.1:5000/api/contact/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        setMessages(messages.filter(m => m.id !== id))
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Centre de Messages
          </h1>
          <p className="text-muted-foreground mt-1">Consultez les demandes d'information et les diagnostics de besoins.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-muted/50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'info' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <MessageSquare size={18} />
          Demandes d'info
        </button>
        <button
          onClick={() => setActiveTab('diagnostic')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'diagnostic' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <ClipboardCheck size={18} />
          Pré-diagnostics
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Messages List */}
        <div className="lg:col-span-5 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white dark:bg-gray-900 border border-border rounded-2xl">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium">Chargement des messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 border border-border rounded-2xl">
              <p className="text-muted-foreground">Aucun message pour le moment.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${selectedMessage?.id === msg.id
                    ? 'bg-primary border-primary text-white shadow-xl scale-[1.02]'
                    : 'bg-white dark:bg-gray-800 border-border hover:border-primary/50 shadow-sm'
                  }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${selectedMessage?.id === msg.id ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                      <User size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold">{msg.prenom} {msg.nom}</h3>
                      <p className={`text-xs ${selectedMessage?.id === msg.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {new Date(msg.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
                {activeTab === 'info' && <p className={`text-sm font-semibold mb-1 ${selectedMessage?.id === msg.id ? 'text-white' : 'text-primary'}`}>{msg.sujet}</p>}
                <p className={`text-sm line-clamp-2 ${selectedMessage?.id === msg.id ? 'text-white/90' : 'text-muted-foreground'}`}>
                  {activeTab === 'info' ? msg.message : msg.description}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="bg-white dark:bg-gray-900 border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-8 border-b border-border bg-muted/30">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-black mb-2">{activeTab === 'info' ? selectedMessage.sujet : "Diagnostic de besoins"}</h2>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5"><User size={14} className="text-primary" /> <span className="font-bold text-foreground">{selectedMessage.prenom} {selectedMessage.nom}</span></div>
                      <div className="flex items-center gap-1.5"><Mail size={14} className="text-primary" /> {selectedMessage.email}</div>
                      {selectedMessage.telephone && <div className="flex items-center gap-1.5"><Phone size={14} className="text-primary" /> {selectedMessage.telephone}</div>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border/50">
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1 flex items-center gap-1.5">
                      <Calendar size={12} /> Reçu le
                    </p>
                    <p className="font-bold text-sm">
                      {new Date(selectedMessage.created_at).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {activeTab === 'diagnostic' && (
                    <>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border/50">
                        <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1 flex items-center gap-1.5">
                          <Building size={12} /> Organisation
                        </p>
                        <p className="font-bold text-sm">{selectedMessage.organisation || '-'}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border/50">
                        <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1 flex items-center gap-1.5">
                          <Activity size={12} /> Secteur
                        </p>
                        <p className="font-bold text-sm">{selectedMessage.secteur || '-'}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-border/50">
                        <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1 flex items-center gap-1.5">
                          <AlertCircle size={12} /> Urgence
                        </p>
                        <p className={`font-bold text-sm ${selectedMessage.urgence === 'Élevé' ? 'text-red-600' : 'text-foreground'}`}>{selectedMessage.urgence || '-'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <h3 className="font-black text-sm uppercase tracking-widest text-primary flex items-center gap-2">
                  <MessageSquare size={16} /> {activeTab === 'info' ? 'Message' : 'Description des besoins'}
                </h3>
                <div className="bg-muted/30 p-6 rounded-2xl border border-border/50 min-h-[200px] prose prose-sm dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap leading-relaxed text-base italic text-foreground/80">
                    "{activeTab === 'info' ? selectedMessage.message : selectedMessage.description}"
                  </p>
                </div>

                <div className="flex justify-end pt-6">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 hover:bg-primary/90 transition-all"
                  >
                    Répondre par Email
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-4 p-12 bg-muted/20 border-2 border-dashed border-border rounded-3xl opacity-50">
              <MessageSquare size={48} className="text-muted-foreground" />
              <p className="text-xl font-bold text-muted-foreground">Sélectionnez un message pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
