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

interface FetchRecipesParams {
  minFat?: number;
  maxFat?: number;
  maxCalories?: number;
  maxSugar?: number;
  [key: string]: any;
}

export const fetchRecipes = async (
//   params: FetchRecipesParams = {}
): Promise<Recipe[]> => {
//   const defaultParams = {
//     number: 10,
//     minFat: 5,
//     maxFat: 20,
//     maxCalories: 250,
//   };

  const response = await axiosClient.get<Recipe[]>('/recipes', {
    // params: { ...defaultParams, ...params },
  }
);

  return response.data;
};
