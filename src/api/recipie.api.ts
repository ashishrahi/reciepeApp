import axiosClient from './apiConfig';

 interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
}

export const fetchRecipes = async (
): Promise<Recipe[]> => {

  const response = await axiosClient.get<Recipe[]>('/recipes', {
  }
);

  return response.data;
};
