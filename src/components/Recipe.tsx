import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '../api/recipie.api';
import { motion } from 'framer-motion';
import { FaClock, FaUsers, FaFire } from 'react-icons/fa';

interface Recipe {
  id: number;
  name?: string;   // optional
  title?: string;  // optional alternative
  image: string;
  prepTimeMinutes: string;
  cookTimeMinutes: number;
  servings: string;
  fat?: string;
  difficulty: string;
  recipes?: string;
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
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  // Filter recipes based on search query (case insensitive)
  const filteredRecipes = recipes.filter((recipe) => {
    const name = recipe.name || recipe.title || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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

      {/* Search input field */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500">recipies is loading.........</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRecipes.map((recipe) => {
            const recipeName = recipe.name || recipe.title || 'Untitled Recipe';

            return (
              <motion.div
                key={recipe.id}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                className="cursor-pointer border border-gray-300 rounded-lg shadow-md p-4 bg-white transition-transform duration-300 ease-in-out"
              >
                <h2 className="text-xl font-semibold mb-2 text-yellow-600">{recipeName}</h2>

                <img
                  src={recipe.image}
                  alt={recipeName}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <FaClock className="text-blue-500" /> Prep time: {recipe.prepTimeMinutes} mins
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <FaClock className="text-blue-500" /> Cook time: {recipe.cookTimeMinutes} mins
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <FaUsers className="text-green-500" /> Servings: {recipe.servings}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <FaFire className="text-red-500" /> Difficulty: {recipe.difficulty}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default RecipeList;
