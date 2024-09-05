'use client'

import { CustomPagination } from '@/components/pagination'
import RecipeCard from '@/components/recipe-card'
import { SkeletonCard } from '@/components/skeleton-card'
import { Button } from '@/components/ui/button'
import { useGetRecipes } from '@/hooks/useRecipes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { data: recipes, error, isLoading } = useGetRecipes()

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto py-6'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold my-10'>Recipes</h1>
          <p className='text-foreground'>
            Welcome to our Recipe Management Application, where culinary excellence meets convenience. Our dedicated team of chefs and food experts
            meticulously tests each recipe to ensure flawless results in your kitchen. From simple weeknight dinners to elaborate feasts, our
            collection spans a wide array of flavors and techniques. Explore thousands of recipes, carefully curated to inspire your cooking journey
            and transform every meal into a delightful experience. Cook with confidence and discover the joy of perfect dishes every time.
          </p>
        </div>

        <div className='relative mt-10 w-full h-[80px]'>
          <Image src='/images/recipe-banner.png' fill className='object-cover absolute left-0 right-0 w-full' alt='banner' />
        </div>
        <h2 className='capitalize text-2xl mt-20 font-medium mb-10'>Explore our recipes</h2>
        <section className=' max-w-[75rem]'>
          {isLoading ? (
            <SkeletonCard />
          ) : !recipes ? (
            <div className='text-center'>
              <p className='text-sm font-semibold'>No internet connection.</p>
              <p className='mt-2 text-xs'>Please check your internet and try again.</p>
            </div>
          ) : recipes?.data?.length === 0 ? (
            <div className='text-center'>
              <p className='text-sm font-semibold'>No recipes found.</p>
              <p className='mt-2 text-xs'>You can create a new recipe by clicking the button below.</p>
              <Button onClick={() => router.push('/recipe/create')} className='mt-4'>
                Create Recipe
              </Button>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {recipes?.data.map((recipe, index) => (
                <div
                  key={recipe?._id}
                  // className={`${index !== recipes?.data?.length - 1 ? 'border-b pb-6 border-border md:border-0' : ''} md:border-border md:border`}
                  className={`pb-6 border-b border-border md:border md:border-border`}
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          )}
          <div className='my-20 mx-auto'>
            <CustomPagination />
          </div>
        </section>
      </div>
    </div>
  )
}
