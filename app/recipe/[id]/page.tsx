'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import ConfirmationModal from '@/components/modals/confirmation-modal'
import EditRecipeModal from '@/components/modals/edit-recipe-modal'
import { Button } from '@/components/ui/button'
import { useDeleteRecipe, useGetRecipeById, useUpdateRecipe } from '@/hooks/useRecipes'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

type FormValues = {
  title: string
  ingredients: string[]
  instructions: string
  image: File | null | string
}

export default function RecipeDetails() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { data: recipe, status: isGettingRecipe } = useGetRecipeById(id)
  const { mutate: deleteRecipe, status, isSuccess } = useDeleteRecipe()
  const { mutate: updateRecipe, status: updateStatus } = useUpdateRecipe()

  const [initialValues, setInitialValues] = useState<FormValues>({
    title: '',
    ingredients: [''],
    instructions: '',
    image: null,
  })

  const { toast } = useToast()

  const handleDelete = () => {
    deleteRecipe(id)
  }

  useEffect(() => {
    if (isSuccess) router.push('/')
  }, [isSuccess])

  const handleUpdate = async (values: FormValues) => {
    const formData = new FormData()
    const { image, title, ingredients, instructions } = values

    if (title) formData.append('title', title)
    if (instructions) formData.append('instructions', instructions)

    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient)
    })

    if (image instanceof File) {
      formData.append('image', image)
    }
    updateRecipe(
      { id, recipe: formData },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            description: 'Yay! Recipe updated succesfully.',
          })
          setShowUpdateForm(false)
        },
        onError: (error) => {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: `${error.message}`,
          })
        },
      }
    )
  }

  useEffect(() => {
    if (recipe) {
      setInitialValues({
        title: recipe.data.title || '',
        ingredients: recipe.data.ingredients || [''],
        instructions: recipe.data.instructions || '',
        image: recipe.data.image || null,
      })
    }
  }, [recipe])

  return (
    <div className='min-h-screen max-w-[37.5rem] px-5 md:px-8 lg:px-10'>
      {status === 'pending' && isGettingRecipe === 'pending' ? (
        <div className='text-center m-auto'>
          <Loader2 className='animate-spin h-20 w-20' />
        </div>
      ) : (
        <>
          <div className='container mx-auto py-6'>
            <h1 className='text-[2rem] tracking-tight font-bold mb-10'>{recipe?.data?.title}</h1>
            <Image
              src={recipe?.data?.image ?? ''}
              alt={recipe?.data?.title ?? 'food'}
              height={260}
              width={260}
              className='w-4/5 lg:3/5 rounded-lg mb-16'
            />
            <div className='mb-16'>
              <h2 className='text-2xl font-semibold mb-2'>Ingredients</h2>
              <ul className='list-disc pl-6 mb-4'>
                {recipe?.data?.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <h2 className='text-2xl font-semibold mb-2'>Instructions</h2>
            <div className='text-sm' dangerouslySetInnerHTML={{ __html: recipe?.data?.instructions ?? <p></p> }} />
            <div className='flex gap-3 items-center justify-end mt-20 mb-40'>
              <Button variant='outline' className='w-20 inline-flex items-center gap-2' onClick={() => setShowUpdateForm(true)}>
                Edit
              </Button>
              <Button variant='destructive' className='w-20 inline-flex items-center gap-2' onClick={() => setShowConfirmation(true)}>
                Delete
              </Button>
            </div>
          </div>
          <ConfirmationModal
            loading={status === 'pending'}
            visible={showConfirmation}
            onClose={() => {
              setShowConfirmation(false)
            }}
            onConfirm={handleDelete}
          />
          <EditRecipeModal
            initialValues={initialValues}
            loading={updateStatus === 'pending'}
            visible={showUpdateForm}
            onClose={() => {
              setShowUpdateForm(false)
            }}
            onConfirm={handleUpdate}
          />
        </>
      )}
    </div>
  )
}
