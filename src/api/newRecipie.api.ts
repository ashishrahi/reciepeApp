import axiosClient from './apiConfig';

 interface INewRecipe {
   name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  mealType: string[];
  image?: string;
}

export const AddNewRecipes = async (
): Promise<INewRecipe[]> => {

  const response = await axiosClient.get<INewRecipe[]>('/recipes/add', {
  }
);

  return response.data;
};
