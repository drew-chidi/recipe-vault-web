import { RecipeType } from '@/types/recipe.type'
import Image from 'next/image'
import React from 'react'

type Props = {
  recipe: RecipeType
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div key={recipe._id} className='flex items-start md:flex-col gap-5 md:gap-0 '>
      <div className='relative w-[10rem] h-[6.875rem] md:w-full md:h-[12.5rem]'>
        <Image src={recipe.image} alt={recipe.title} fill className='object-cover' />
      </div>
      <div className='md:p-3'>
        <h2 className='text-lg font-bold'>{recipe.title}</h2>
        <p className='text-sm'>{recipe.instructions}</p>
      </div>
    </div>
  )
}

export default RecipeCard
