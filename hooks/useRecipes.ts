'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchRecipes,
  updateRecipe,
  deleteRecipe,
  createRecipe,
  fetchRecipeById,
} from '../services/recipeApi';
import { ApiResponse, RecipeType } from '@/types/recipe.type';

export const useGetRecipes = () => {
  return useQuery<ApiResponse<RecipeType[]>, Error>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
};

export const useGetRecipeById = (id: string) => {
  return useQuery<ApiResponse<RecipeType>, Error>({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id),
    enabled: !!id,
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recipe: FormData) => createRecipe(recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};

export const useUpdateRecipe = (id: string, recipe: RecipeType) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateRecipe(id, recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};
