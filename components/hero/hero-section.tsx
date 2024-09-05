import Image from 'next/image'
import React from 'react'

type Props = {}

const HeroSection = (props: Props) => {
  return (
    <div className='w-full h-[23rem] lg:h-[38rem] relative'>
      <Image src='/images/recipe-vault-banner.webp' alt='banner' fill className='object-fit w-full absolute left-0 right-0' />
    </div>
  )
}

export default HeroSection
