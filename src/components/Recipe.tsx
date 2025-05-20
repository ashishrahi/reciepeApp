import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '../api/recipie';
import { motion } from 'framer-motion';

interface Recipe {
  id: number;
  name: string;
  image: string;
  prepTimeMinutes: string;
  cookTimeMinutes: number;
  servings: string;
  fat: string;
  difficulty: string;
  recipes: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data.recipes);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  return (
    <div className="p-10">
      <motion.h1
        className="text-3xl font-bold mb-6 ml-8 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Recipe List
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            className="cursor-pointer border border-gray-300 rounded-lg shadow-md p-4 bg-white transition-transform duration-300 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <p className="text-sm text-gray-700">Prep time: {recipe.prepTimeMinutes} mins</p>
            <p className="text-sm text-gray-700">Cook time: {recipe.cookTimeMinutes} mins</p>
            <p className="text-sm text-gray-700">Servings: {recipe.servings}</p>
            <p className="text-sm text-gray-700">Difficulty: {recipe.difficulty}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecipeList;
