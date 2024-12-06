import type { Metadata } from 'next'
import { inter } from '@/config/fonts'

import './globals.css'
import { Provider } from '@/components'


export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop'
  },
  description: 'A Next E-commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider >
          {children}
        </Provider>
      </body>
    </html>
  )
}
