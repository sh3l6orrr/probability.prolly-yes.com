'use client'

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function Layout({ children }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowDropdown(false)
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, setShowDropdown])

  return <div className="min-h-screen flex flex-col">
    <header className="fixed top-0 left-0 w-screen bg-white dark:bg-black h-12 flex items-center border-b z-50">
      <div className="w-8" />
      <span className="text-xl"><a href='https://www.prolly-yes.com'>ProllyYes</a> / <Link href='/'>Probability</Link></span>
      <div className="grow" />
      <div className="gap-6 hidden md:flex text-lg">
        <Link href='/about'>About</Link>
      </div>
      <div className="flex flex-col md:hidden relative">
        <button onClick={() => setShowDropdown(showDropdown ? false : true)}>Menu</button>
        {showDropdown && <div ref={ref} className="flex flex-col absolute border top-8 right-0 bg-white dark:bg-black rounded px-2 py-1 text-base">
          <Link href='/about' onClick={() => setShowDropdown(false)}>About</Link>
        </div>}
      </div>
      <div className="w-8" />
    </header>
    <div>
      {children}
    </div>
    <div className="grow" />
    <footer className="md:px-12 px-8 py-6">ProllyYes @ 2024 <div className="w-2 inline-block" />
      <span className="text-sm dark:text-gray-400 text-gray-600 inline">
        An online tool for calculation and visualization of probability distributions.
      </span>
    </footer>
  </div>

}
