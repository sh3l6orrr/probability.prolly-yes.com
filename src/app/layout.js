import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='
        min-h-screen grid place-content-center
        dark:bg-neutral-900  dark:text-white
      '>{children}</body>
    </html>
  )
}
