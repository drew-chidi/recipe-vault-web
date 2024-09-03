'use client';

import { useGetRecipeById } from '@/hooks/useRecipes';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RecipeDetails() {
  const params = useParams();
  const id = params.id as string;
  console.log({ params });
  const { data: recipe, error, isLoading } = useGetRecipeById(id);

  console.log({ recipe });
  return (
    <div className='bg-gray-100 min-h-screen max-w-[37.5rem]'>
      <div className='container mx-auto py-6'>
        <h1 className='text-[2rem] font-bold  mb-6'>{recipe?.data?.title}</h1>
        <Image
          src={recipe?.data?.image ?? ''}
          alt={recipe?.data?.title ?? 'food'}
          height={120}
          width={120}
          className='w-full h-auto rounded-lg mb-4'
        />
        <h2 className='text-2xl font-semibold text-indigo-700 mb-2'>
          Ingredients
        </h2>
        <ul className='list-disc pl-6 mb-4'>
          {recipe?.data?.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className='text-2xl font-semibold text-indigo-700 mb-2'>
          Instructions
        </h2>
        <p>{recipe?.data?.instructions}</p>
      </div>
    </div>
  );
}
