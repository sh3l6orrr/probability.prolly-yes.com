import './globals.css'

export default function Layout({ children }) {
  return (
    <div className='min-h-screen dark:bg-neutral-900'>
      {children}
    </div>
  )
}
