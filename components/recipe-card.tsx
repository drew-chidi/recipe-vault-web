import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

import { RecipeType } from '@/types/recipe.type'
import { Button } from './ui/button'

type Props = {
  recipe: RecipeType
}

const RecipeCard = ({ recipe }: Props) => {
  const router = useRouter()

  return (
    <div key={recipe._id} className='grid grid-cols-2 items-start md:flex md:flex-col gap-5 md:gap-0 '>
      <div className='relative w-[8.75rem] xs:w-[10rem]  h-[6.875rem] md:w-full md:h-[12.5rem]'>
        <Image src={recipe.image} alt={recipe.title} fill className='object-fil' />
      </div>
      <div className='md:p-3'>
        <h2 className='text-lg font-bold'>{recipe.title}</h2>
        <div className='text-sm line-clamp-4' dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </div>
      <div></div>
      <Button onClick={() => router.push(`/recipe/${recipe._id}`)} className='max-w-min md:m-3'>
        Get recipe{' '}
      </Button>
    </div>
  )
}

export default RecipeCard
