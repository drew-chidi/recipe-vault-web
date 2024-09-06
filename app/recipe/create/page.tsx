'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import { PlusCircleIcon } from 'lucide-react'

import Icon from '@/components/icon/icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CreateRecipeSchema } from '@/utils/schema/create-recipe.schema'
import { useCreateRecipe } from '@/hooks/useRecipes'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type FormValues = {
  title: string
  ingredients: string[]
  instructions: string
  image: File | null
}

export default function CreateRecipe() {
  const [ingredients, setIngredients] = useState<string[]>([''])
  const { mutate: createRecipe, status, isError, isSuccess, error: errorDeleting } = useCreateRecipe()
  const { toast } = useToast()

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
    formik.setFieldValue('ingredients', newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, ''])
    formik.setFieldValue('ingredients', [...ingredients, ''])
  }

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index)
    setIngredients(newIngredients)
    formik.setFieldValue('ingredients', newIngredients)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 1024 * 1024) {
        // 1MB in bytes
        formik.setFieldError('image', 'image size should be at most 1MB')
        return
      }
      formik.setFieldValue('image', file)
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    const { image, title, ingredients, instructions } = formik.values

    if (instructions === '<p><br></p>' || !instructions.trim()) {
      formik.setFieldError('instructions', 'Instructions must not be empty')
      return
    }

    if (title) formData.append('title', title)
    if (instructions) formData.append('instructions', instructions)

    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient)
    })

    if (image instanceof File) {
      formData.append('image', image)
    }

    createRecipe(formData, {
      onSuccess: () => {
        toast({
          variant: 'success',
          description: 'Yay! Recipe added succesfully.',
        })
        formik.resetForm()
        setIngredients([''])
        formik.setFieldValue('image', null)
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: `${error.message}`,
        })
      },
    })
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      ingredients: [''],
      image: null,
      instructions: '',
    },
    validationSchema: CreateRecipeSchema,
    onSubmit: handleSubmit,
  })

  return (
    <div className=' min-h-screen max-w-xl mx-auto px-5 md:px-8 lg:px-10 pt-20'>
      <div className='container mx-auto py-6'>
        <h1 className='text-[2rem] tracking-tight font-bold mb-6'>Create New Recipe</h1>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
          <div>
            <Input
              label='Title'
              name='title'
              id='title'
              type='text'
              className='mt-1 block w-full p-2 border rounded-md'
              value={formik?.values.title}
              onBlur={formik.handleBlur}
              error={formik.errors.title}
              touched={formik.touched.title}
              onChange={formik?.handleChange}
            />
          </div>
          <div>
            <label className='block relative text-sm font-normal mb-1'>Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className='grid grid-cols-12 gap-2 mb-3'>
                <div className='col-span-11'>
                  <Input
                    type='text'
                    name={`ingredients.${index}`}
                    id={`ingredients.${index}`}
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.errors.ingredients?.[index]}
                    touched={Array.isArray(formik.touched.ingredients) ? formik.touched.ingredients[index] : false}
                    placeholder='Enter ingredient'
                    className='w-full'
                  />
                </div>
                <button type='button' onClick={() => removeIngredient(index)} className='text-red-500 hover:text-red-700 col-span-1 justify-self-end'>
                  <Icon name='remove' width={14.28} height={18.63} />
                </button>
              </div>
            ))}
            <button type='button' onClick={addIngredient} className='flex items-center gap-2 mt-2 text-primary text.sm'>
              <PlusCircleIcon width={16} height={16} />
              Add ingredients
            </button>
          </div>
          <div>
            <div>
              <label htmlFor='instructions' className='block relative text-sm font-normal mt-1'>
                Instructions
              </label>
              <ReactQuill
                theme='snow'
                value={formik?.values?.instructions}
                onChange={(value) => formik.setFieldValue('instructions', value)}
                onBlur={() => formik?.setFieldTouched('instructions', true)}
                className='my-2 h-full bg-white text-foreground'
              />
              <span className={cn('text-xs text-red-500 hidden', formik?.errors?.instructions && 'block')}>{formik?.errors?.instructions}</span>
            </div>
          </div>
          <div>
            <Input
              label='Image'
              id='image'
              name='image'
              type='file'
              className='mt-1 block p-2 border border-gray-300 rounded-md w-full'
              onChange={handleImageChange}
            />
          </div>
          <Button type='submit' className='max-w-[10rem] mt-7' loading={status === 'pending'} loadingText='Creating...'>
            Create Recipe
          </Button>
        </form>
      </div>
    </div>
  )
}
