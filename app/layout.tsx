import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://omuonsol.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '$OMU Presale | OMU on Solana',
    template: '%s | OMU on Solana',
  },
  description:
    'Join the $OMU presale on Solana. Buy $OMU with SOL, verify your transaction, and follow OMU on X and Telegram for presale updates.',
  applicationName: '$OMU Presale',
  generator: 'Next.js',
  keywords: [
    'OMU',
    '$OMU',
    'OMU presale',
    'Solana presale',
    'Solana meme coin',
    'crypto presale',
    'OMU on Sol',
  ],
  authors: [{ name: 'OMU on Solana' }],
  creator: 'OMU on Solana',
  publisher: 'OMU on Solana',
  category: 'cryptocurrency',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: '$OMU Presale',
    title: '$OMU Presale | OMU on Solana',
    description:
      'Join the $OMU presale on Solana. Buy $OMU with SOL and verify your transaction.',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'OMU logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@OmuonSol',
    creator: '@OmuonSol',
    title: '$OMU Presale | OMU on Solana',
    description:
      'Join the $OMU presale on Solana. Buy $OMU with SOL and verify your transaction.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
