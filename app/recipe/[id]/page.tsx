'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DeleteIcon, Edit2Icon } from 'lucide-react'
import { useFormik } from 'formik'

import ConfirmationModal from '@/components/modals/confirmation-modal'
import EditRecipeModal from '@/components/modals/edit-recipe-modal'
import { Button } from '@/components/ui/button'
import { useDeleteRecipe, useGetRecipeById, useUpdateRecipe } from '@/hooks/useRecipes'
import { CreateRecipeSchema } from '@/utils/schema/create-recipe.schema'

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

  const { data: recipe, error, isLoading } = useGetRecipeById(id)
  const { mutate: deleteRecipe, status, isError, isSuccess, error: errorDeleting } = useDeleteRecipe()
  const { mutate: updateRecipe, status: updateStatus, isError: isErrorUpdating, isSuccess: successUpdating, error: errorUpdating } = useUpdateRecipe()

  const handleDelete = () => {
    deleteRecipe(id)
  }
  const handleUpdate = () => {
    const updatedRecipe = {}
    updateRecipe({ id, recipe: updatedRecipe })
  }

  useEffect(() => {
    if (isSuccess) router.push('/')
  }, [isSuccess])

  const formik = useFormik<FormValues>({
    initialValues: {
      title: recipe?.data?.title ?? '',
      ingredients: recipe?.data?.ingredients ?? [],
      image: recipe?.data?.image ?? null,
      instructions: recipe?.data?.instructions ?? '',
    },
    validationSchema: CreateRecipeSchema,
    onSubmit: handleUpdate,
  })

  console.log({ recipe })
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
        <h2 className='text-2xl font-semibold mb-2'>Ingredients</h2>
        <ul className='list-disc pl-6 mb-4'>
          {recipe?.data?.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className='text-2xl font-semibold mb-2'>Instructions</h2>
        <p>{recipe?.data?.instructions}</p>
        <div className='flex gap-3 items-center justify-end'>
          <Button variant='outline' className='inline-flex items-center gap-2' onClick={() => setShowUpdateForm(true)}>
            <Edit2Icon /> Edit
          </Button>
          <Button variant='destructive' className='inline-flex items-center gap-2' onClick={() => setShowConfirmation(true)}>
            <DeleteIcon /> Delete
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
        formik={formik}
        loading={status === 'pending'}
        visible={showUpdateForm}
        onClose={() => {
          setShowUpdateForm(false)
        }}
        onConfirm={handleUpdate}
      />
    </div>
  )
}
