import '@testing-library/jest-dom'

import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import RecipeCard from '@/components/recipe-card'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

const mockRecipe = {
  _id: '123',
  title: 'Test Recipe',
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  instructions: 'Mix all ingredients',
  image: '/test-image.jpg',
}

describe('RecipeCard Component', () => {
  const push = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push })
  })

  it('renders the recipe card with correct data', () => {
    render(<RecipeCard recipe={mockRecipe} />)

    expect(screen.getByText(/Test Recipe/i)).toBeInTheDocument()

    expect(screen.getByAltText(/Test Recipe/i)).toBeInTheDocument()

    expect(screen.getByText(/Mix all ingredients/i)).toBeInTheDocument()
  })

  it('navigates to the recipe details page on button click', () => {
    render(<RecipeCard recipe={mockRecipe} />)

    const button = screen.getByTestId('recipe-details')
    fireEvent.click(button)

    expect(push).toHaveBeenCalledWith('/recipe/123')
  })
})
