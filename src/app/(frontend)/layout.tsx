import React from 'react'
import './globals.css'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import { getWebsiteInfo } from '@/lib/apiServices'
import { Media } from '@/payload-types'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {

  const { children } = props
  const company = await getWebsiteInfo()

  return (
    <html lang="en">
      <body>
        <Header logo={company?.logo as Media} />
        <main>{children}</main>
        <Footer logo={company?.logo as Media} />
      </body>
    </html>
  )
}
