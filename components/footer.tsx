import React from 'react'
import { Button } from './ui/button'
import Icon from './icon/icon'
import Link from 'next/link'

type Props = {}

const socials = [{ name: 'facebook-logo' }, { name: 'instagram-logo' }, { name: 'pinterest' }]

const Footer = (props: Props) => {
  return (
    <div>
      <div className='py-10  px-5 md:px-8 lg:px-10 flex flex-col gap-8 md:flex-row md:justify-between max-w-[56.25rem] mx-auto'>
        <div className='flex flex-col gap-6 items-center md:items-start'>
          <p className='text-lg font-semibold'>Recipe Vault</p>
          <Button variant='outline' className='uppercase w-full font-medium bg-transparent'>
            Newsletters
          </Button>
          <div>
            <p className='text-sm text-center mb-2.5'>Follow Us</p>
            <div className='flex gap-2.5 items-center'>
              {socials?.map((item, index) => (
                <Icon key={index} width={18} height={18} name={item.name} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className='uppercase font-semibold'>Food</p>
          <p className='uppercase  font-semibold'>Restaurants</p>
          <p className='uppercase  font-semibold'>News</p>
          <p className='uppercase  font-semibold'>What to buy</p>
          <p className='uppercase  font-semibold'>Drinks</p>
        </div>
        <div>
          <p className='mb-2'>Collaborate</p>
          <div className='text-sm flex flex-col gap-1'>
            <p>Partners</p>
            <p>Explore careers</p>
            <p>Become a writer</p>
            <p>Try vault ads</p>
          </div>
        </div>
      </div>
      <div>
        <hr className='my-5 w-3/4 mx-auto max-w-3xl border-border bg-border' />
        <div className='text-sm text-gray-600 text-center pb-14'>
          &copy; 2021-present. Recipe App. All rights reserved.
          <br />
          <Link href='#' className='text-blue-500 hover:underline'>
            Click here to check out our Terms and Conditions
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
