'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MenuIcon, X } from 'lucide-react'

type Props = {}

const Navbar = (props: Props) => {
  const [showMenu, setShowMenu] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  return (
    <nav className='bg-primary text-primary-foreground p-4 fixed top-0 right-0 left-0'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className=' text-lg font-bold'>
          Recipe Vault
        </Link>
        <div className='hidden sm:flex'>
          <Link href='/' className=' mr-4'>
            Home
          </Link>
          <Link href='/recipe/create' className=''>
            Create Recipe
          </Link>
        </div>
        {!showMenu ? (
          <MenuIcon className='sm:hidden' onClick={() => setShowMenu(true)} />
        ) : (
          <X className='sm:hidden' onClick={() => setShowMenu(false)} />
        )}
        {/* Mobile Nav Menu */}
        {showMenu && (
          <div className='sm:hidden w-full left-0 right-0 text-center absolute flex flex-col top-[3.75rem] bg-primary text-primary-foreground p-8 border-t border-border'>
            <Link href='/' className=' mr-4'>
              Home
            </Link>
            <Link href='/recipe/create' className=''>
              Create Recipe
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
