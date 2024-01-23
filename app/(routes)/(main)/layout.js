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

  return <>
    <header className="fixed top-0 left-0 w-screen bg-white dark:bg-black h-12 flex items-center border-b z-20">
      <div className="w-8" />
      <span className="text-xl"><a href='https://www.prolly-yes.com'>ProllyYes</a> / <Link href='/'>Probability</Link></span>
      <div className="grow" />
      <div className="gap-6 hidden md:flex">
        <Link href='/about'><span className="text-xl">About</span></Link>
      </div>
      <div className="flex flex-col md:hidden relative">
        <button onClick={() => setShowDropdown(showDropdown ? false : true)}><svg className="w-4 h-4"><path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" /></svg></button>
        {showDropdown && <div ref={ref} className="flex flex-col absolute border top-6 right-0 bg-white dark:bg-black rounded p-1">
          <Link href='/about' onClick={() => setShowDropdown(false)}><span className="text-xl">About</span></Link>
        </div>}
      </div>
      <div className="w-8" />
    </header>
    <div>
      <div className="h-12" />
      {children}
    </div>
  </>

}
