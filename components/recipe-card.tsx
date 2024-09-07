import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowBigRightDash } from 'lucide-react'
import { RecipeType } from '@/types/recipe.type'

type Props = {
  recipe: RecipeType
}

const RecipeCard = ({ recipe }: Props) => {
  const router = useRouter()

  return (
    <div key={recipe._id} className='grid grid-cols-2 sm:grid-cols-3 items-start md:flex md:flex-col gap-5 md:gap-0 '>
      <div className='relative w-[8.75rem] xs:w-[10rem] h-[6.875rem] md:w-full md:h-[12.5rem] sm:col-span-1'>
        <Image src={recipe.image} alt={recipe.title} fill className='object-fil' sizes='(max-width: 10rem)' fetchPriority='high' priority={true} />
      </div>
      <div className='md:p-3 sm:col-span-2'>
        <h2 className='text-base font-bold mb-1'>{recipe.title}</h2>
        <div className='text-sm line-clamp-2 md:line-clamp-4' dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        <button
          onClick={() => router.push(`/recipe/${recipe._id}`)}
          className='flex items-center gap-1 hover:px-1 hover:underline mt-3 text-sm'
          data-testid='recipe-details'
        >
          Get recipe <ArrowBigRightDash className='h-4 w-4' />
        </button>
      </div>
    </div>
  )
}

export default RecipeCard
