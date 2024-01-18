export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ProllyYes",
  "url": "https://probability.prolly-yes.com"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white dark:bg-black">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
