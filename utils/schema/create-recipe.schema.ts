import * as Yup from 'yup';

export const CreateRecipeSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  ingredients: Yup.array()
    .of(Yup.string().required('Each ingredient must be a string'))
    .min(1, 'At least one ingredient is required')
    .required('Ingredients are required'),
  instructions: Yup.string().required('Instructions are required'),
  image: Yup.mixed().required('Image is required'),
});
