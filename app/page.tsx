'use client';

// To do:
// 1. Remove commented components

import { CustomPagination } from '@/components/pagination';
import RecipeCard from '@/components/recipe-card';
import { useGetRecipes } from '@/hooks/useRecipes';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const location = usePathname();
  const { data: recipes, error, isLoading } = useGetRecipes();

  console.log({ recipes, location });
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto py-6'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-6'>Recipes</h1>
          <p className='text-foreground'>
            Welcome to our Recipe Management Application, where culinary
            excellence meets convenience. Our dedicated team of chefs and food
            experts meticulously tests each recipe to ensure flawless results in
            your kitchen. From simple weeknight dinners to elaborate feasts, our
            collection spans a wide array of flavors and techniques. Explore
            thousands of recipes, carefully curated to inspire your cooking
            journey and transform every meal into a delightful experience. Cook
            with confidence and discover the joy of perfect dishes every time.
          </p>
        </div>

        <div className='relative mt-10 w-full h-[80px]'>
          <Image
            src='/images/recipe-banner.png'
            fill
            className='object-cover absolute left-0 right-0 w-full'
            alt='banner'
          />
        </div>
        <h2 className='capitalize text-2xl mt-10 font-medium mb-8'>
          Explore our recipes
        </h2>
        <section className=''>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {recipes?.data.map((recipe, index) => (
              <div
                key={recipe?._id}
                className={
                  index !== recipes?.data?.length - 1
                    ? 'border-b pb-6 border-b-gray-200'
                    : ''
                }
                onClick={() => router.push(`/recipe/${recipe._id}`)}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
          <div className='mt-4 mx-auto'>
            <CustomPagination />
          </div>
        </section>
      </div>
    </div>
  );
}
