'use client'
import { ApiResponse, RecipeType } from '@/types/recipe.type'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

console.log(API_BASE_URL)

export const fetchRecipes = async (page = 1): Promise<ApiResponse<RecipeType[]>> => {
  const response = await fetch(`${API_BASE_URL}/?page=${page}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const fetchRecipeById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const createRecipe = async (recipe: FormData) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    body: recipe,
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const updateRecipe = async (id: string, recipe: RecipeType) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const deleteRecipe = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
