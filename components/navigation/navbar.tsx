'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MenuIcon, X } from 'lucide-react'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleMenu = () => {
    if (showMenu) {
      setIsAnimating(true)
      setTimeout(() => {
        setShowMenu(false)
        setIsAnimating(false)
      }, 250)
    } else {
      setShowMenu(true)
    }
  }

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  return (
    <nav className='bg-primary text-[#333] p-4 fixed top-0 right-0 left-0 md:px-8 lg:px-10'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className=' text-lg font-bold'>
          Recipe Vault
        </Link>
        <div className='hidden sm:flex gap-10'>
          <Link href='/' className='font-medium hover:underline'>
            Home
          </Link>
          <Link href='/recipe/create' className='font-medium  hover:underline'>
            Create Recipe
          </Link>
        </div>
        {!showMenu ? <MenuIcon className='sm:hidden' onClick={() => setShowMenu(true)} /> : <X className='sm:hidden' onClick={toggleMenu} />}
        {/* Mobile Nav Menu */}
        {showMenu && (
          <div
            className={`sm:hidden w-full left-0 right-0 text-center absolute flex flex-col top-[3.75rem] bg-primary text-primary-foreground p-8 border-t border-border gap-7 duration-300 ease-in ${
              isAnimating ? 'animate-out slide-out-to-top' : 'animate-in slide-in-from-top'
            }`}
          >
            <Link href='/' className='font-medium  hover:underline'>
              Home
            </Link>
            <Link href='/recipe/create' className='font-medium  hover:underline'>
              Create Recipe
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
