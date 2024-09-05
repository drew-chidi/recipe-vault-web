'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useFormik } from 'formik'
import { PlusCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ModalContainer from './modal-container'
import Icon from '../icon/icon'
import { Input } from '../ui/input'
import 'react-quill/dist/quill.snow.css'
import { CreateRecipeSchema } from '@/utils/schema/create-recipe.schema'
import { cn } from '@/lib/utils'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface myComponentProps {
  visible?: boolean
  onClose?: () => void
  onConfirm: (e: FormValues) => void
  loading: boolean
  initialValues: any
}

type FormValues = {
  title: string
  ingredients: string[]
  instructions: string
  image: File | null | string
}

const EditRecipeModal = ({ visible, onClose, onConfirm, loading, initialValues }: myComponentProps) => {
  const [previewImage, setPreviewImage] = useState(initialValues.image)

  const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: CreateRecipeSchema,
    onSubmit: (values) => {
      if (values.instructions === '<p><br></p>' || !values.instructions.trim()) {
        formik.setFieldError('instructions', 'Instructions are required')
        return
      }
      onConfirm(values)
    },
  })

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formik.values.ingredients]
    newIngredients[index] = value
    formik.setFieldValue('ingredients', newIngredients)
  }

  const addIngredient = () => {
    formik.setFieldValue('ingredients', [...formik.values.ingredients, ''])
  }

  const removeIngredient = (index: number) => {
    const newIngredients = formik.values.ingredients.filter((_, i) => i !== index)
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
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  return (
    <>
      <ModalContainer
        modalClass={`rounded-[0.8rem] flex flex-col max-h-[70%] md:w-3/4 md:max-w-[37.5rem] overflow-y-scroll px-7 pb-14`}
        title='Recipe Delete Modal'
        hasCloseButton
        handleClose={onClose}
        show={visible as boolean}
      >
        <div className='px-4'>
          <div className='container mx-auto py-6'>
            <h1 className='text-4xl font-bold mb-6'>Update Recipe</h1>
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
                  error={formik?.errors?.title}
                  touched={formik.touched?.title}
                  onChange={formik?.handleChange}
                />
              </div>
              <div>
                <label className='block relative text-sm font-normal mb-1'>Ingredients</label>
                {formik.values.ingredients.map((ingredient, index) => (
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
                        className='w-full min-w-[12.25rem] flex'
                      />
                    </div>
                    <button type='button' onClick={() => removeIngredient(index)} className='text-red-500 hover:text-red-700'>
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
                    className='my-2 h-full bg-white text-[#333]'
                  />
                  <span className={cn('text-xs text-red-500 hidden', formik?.errors?.instructions && 'block')}>{formik?.errors?.instructions}</span>
                </div>
              </div>
              <div className='w-full mb-10'>
                {previewImage && (
                  <div className='mb-4'>
                    <Image src={previewImage} alt='Preview' width={100} height={100} className='rounded-lg mb-2' />
                  </div>
                )}
                <Input
                  label='Image'
                  id='image'
                  name='image'
                  type='file'
                  className='mt-1 block w-auto p-2 border border-gray-300 rounded-md max-w-full '
                  onChange={handleImageChange}
                />
              </div>
              <Button type='submit' className='' loading={loading} loadingText='Updating...'>
                Update Recipe
              </Button>
            </form>
          </div>
        </div>
      </ModalContainer>
    </>
  )
}

export default EditRecipeModal
