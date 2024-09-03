'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/icon/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateRecipeSchema } from '@/utils/schema/create-recipe.schema';
import { useFormik } from 'formik';
import { PlusCircleIcon } from 'lucide-react';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useCreateRecipe } from '@/hooks/useRecipes';

type FormValues = {
  title: string;
  ingredients: string[];
  instructions: string;
  image: File | null;
};

export default function CreateRecipe() {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const {
    mutate: createRecipe,
    status,
    isError,
    isSuccess,
    error: errorDeleting,
  } = useCreateRecipe();

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
    formik.setFieldValue('ingredients', newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
    formik.setFieldValue('ingredients', [...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    formik.setFieldValue('ingredients', newIngredients);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        // 1MB in bytes
        formik.setFieldError('image', 'image size should be at most 1MB');
        return;
      }
      formik.setFieldValue('image', file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const image = formik.values.image;

    Object.entries(formik.values).forEach(([key, value]) => {
      if (key === 'image' && image instanceof File) {
        formData.append(key, image);
      } else if (Array.isArray(value) || typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });

    console.log({ formData });

    createRecipe(formData);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      ingredients: [''],
      image: null,
      instructions: '',
    },
    validationSchema: CreateRecipeSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className=' min-h-screen max-w-xl mx-auto'>
      <div className='container mx-auto py-6'>
        <h1 className='text-4xl font-bold text-indigo-900 mb-6'>
          Create New Recipe
        </h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <div>
            <Input
              label='Title'
              name='title'
              id='title'
              type='text'
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
              value={formik?.values.title}
              onChange={formik?.handleChange}
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className='flex items-center space-x-2 mb-5'>
                <Input
                  type='text'
                  name={`ingredients.${index}`}
                  id={`ingredients.${index}`}
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  error={formik.errors.ingredients?.[index]}
                  // touched={formik.touched.ingredients?.[index]}
                  placeholder='Enter ingredient'
                />
                <button
                  type='button'
                  onClick={() => removeIngredient(index)}
                  className='text-red-500 hover:text-red-700'
                >
                  <Icon name='remove' width={14.28} height={18.63} />
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={addIngredient}
              className='flex items-center gap-2 mt-5 text-primary'
            >
              <PlusCircleIcon width={24} height={24} />
              Add more ingredients
            </button>
          </div>
          <div>
            <div>
              <label
                htmlFor='instructions'
                className='block text-sm font-medium'
              >
                Instructions
              </label>
              <ReactQuill
                theme='snow'
                value={formik?.values?.instructions}
                onChange={(value) =>
                  formik.setFieldValue('instructions', value)
                }
                className='my-2 h-full'
              />
            </div>
          </div>
          <div>
            <Input
              label='Image'
              id='image'
              name='image'
              type='file'
              className='mt-1 block w-auto p-2 border border-gray-300 rounded-md'
              onChange={handleImageChange}
            />
          </div>
          <Button type='submit' className=''>
            Create Recipe
          </Button>
        </form>
      </div>
    </div>
  );
}
