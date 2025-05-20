import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com',
//   headers: {
//     'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
//     'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY as string,
//   },
  timeout: 10000,
});

export default axiosClient;
