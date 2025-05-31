import axiosClient from './apiConfig';

interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const response = await axiosClient.get<RecipeResponse>('/recipes');
  return response.data.recipes; // Changed to access the recipes array
};

interface Recipe {
  id: number;
  name?: string;
  title?: string;
  image: string;
  prepTimeMinutes: number; // Changed from string to number
  cookTimeMinutes: number;
  servings: number; // Changed from string to number
  calories?: number;
  fat?: number;
  difficulty: string;
}