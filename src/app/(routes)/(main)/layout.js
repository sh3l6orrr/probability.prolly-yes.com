export default function Layout({ children }) {
  return <>
    <div className='max-w-screen-md w-screen flex justify-center'>
      <main className='w-11/12'>
        {children}
      </main>
    </div>
  </>

}
