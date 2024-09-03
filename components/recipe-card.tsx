import { RecipeType } from '@/types/recipe.type';
import Image from 'next/image';
import React from 'react';

type Props = {
  recipe: RecipeType;
};

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div key={recipe._id} className='flex items-start'>
      <div className='basis-1/2'>
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={160}
          height={100}
          className='object-contain'
        />
      </div>
      <div className='basis-1/2'>
        <h2 className='text-lg font-bold'>{recipe.title}</h2>
        {/* <p className='text-sm text-gray-500'>By {recipe.author}</p> */}
        <p className='text-sm'>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
