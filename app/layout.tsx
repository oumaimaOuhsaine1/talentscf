import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import WhatsAppButton from '@/components/whatsapp-button'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Talents Consulting & Formation',
  description: 'Formations en PNL, Coaching, Soft Skills et développement personnel',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/image.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/image.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/image.png',
        type: 'image/png',
      },
    ],
    apple: '/images/image.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
