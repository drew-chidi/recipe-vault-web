export interface RecipeType {
  _id?: string
  title: string
  ingredients: string[]
  instructions: string
  image: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  totalPages: number
  currentPage: string
}
