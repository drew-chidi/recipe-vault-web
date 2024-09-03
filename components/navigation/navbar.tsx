import Link from 'next/link';
import React from 'react';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className='bg-primary text-primary-foreground p-4 fixed top-0 right-0 left-0'>
      <div className='container mx-auto flex justify-between'>
        <Link href='/' className=' text-lg font-bold'>
          Recipe Vault
        </Link>
        <div>
          <Link href='/' className=' mr-4'>
            Home
          </Link>
          <Link href='/recipe/create' className=''>
            Create Recipe
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
