import './globals.css'

export default function Layout({ children }) {
  return (
    <div className='
    min-h-screen flex justify-center
    dark:bg-neutral-900'>
      {children}
    </div>
  )
}
