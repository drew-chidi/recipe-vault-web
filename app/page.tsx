'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CustomPagination } from '@/components/pagination'
import RecipeCard from '@/components/recipe-card'
import { SkeletonCard } from '@/components/skeleton-card'
import { Button } from '@/components/ui/button'
import { useGetRecipes } from '@/hooks/useRecipes'
import HeroSection from '@/components/hero/hero-section'

export default function Home() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: recipes, error, isLoading } = useGetRecipes(currentPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='min-h-screen'>
      <div className=''>
        <HeroSection />
        <div className='container max-w-[80rem] mx-auto py-6 px-5 md:px-8 lg:px-10'>
          <div className='grid md:grid-cols-2 md:gap-6 xl:gap-10'>
            <div className='text-center md:text-left'>
              <h1 className='text-[2rem] tracking-tight font-bold my-10'>Recipes</h1>
              <p className='text-foreground text-sm animate-in slide-in-from-left duration-700 ease-in'>
                Welcome to our Recipe Management Application, where culinary excellence meets convenience. Our dedicated team of chefs and food
                experts meticulously tests each recipe to ensure flawless results in your kitchen. From simple weeknight dinners to elaborate feasts,
                our collection spans a wide array of flavors and techniques. Explore thousands of recipes, carefully curated to inspire your cooking
                journey and transform every meal into a delightful experience. Cook with confidence and discover the joy of perfect dishes every time.
              </p>
            </div>
            <div className='relative mt-10 w-full h-[180px] md:h-auto animate-in slide-in-from-right duration-700 ease-in'>
              <Image
                src='/images/family-cooking.jpg'
                fill
                className='object-cover absolute left-0 right-0 w-full rounded-xl'
                alt='banner'
                sizes='(max-width: 36.25rem)'
              />
            </div>
          </div>
          <hr className='border-border border-2 mt-20' />
          <section id='explore-recipe'>
            <h2 className='capitalize text-2xl mt-20 font-medium mb-10'>Explore our recipes</h2>
            <div className='max-w-[75rem] mx-auto'>
              {isLoading ? (
                <SkeletonCard />
              ) : !recipes && error ? (
                <div className='text-center'>
                  <p className='text-sm font-semibold'>{`${error?.message}`}</p>
                  <p className='mt-2 text-xs'>Please confirm you are connnected to the internet and try again.</p>
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
                  {recipes?.data.map((recipe) => (
                    <div key={recipe?._id} className={`pb-6 border-b border-border md:border md:border-border`}>
                      <RecipeCard recipe={recipe} />
                    </div>
                  ))}
                </div>
              )}
              <div className='my-20 mx-auto'>
                <CustomPagination currentPage={Number(currentPage)} totalPages={recipes?.totalPages || 1} onPageChange={handlePageChange} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
