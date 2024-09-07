import * as Yup from 'yup'

export const CreateRecipeSchema = Yup.object({
  title: Yup.string().trim().min(1, 'Title must have at least 1 character').required('Title is required'),
  ingredients: Yup.array()
    .of(Yup.string().trim().min(1, 'Each ingredient must be at least 1 character').required('Each ingredient must be a string'))
    .min(1, 'At least one ingredient is required')
    .required('Ingredients are required'),
  instructions: Yup.string().trim().min(1, 'Instructions must have at least 1 character').required('Instructions are required'),
})
