import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '../api/recipie.api';
import { motion } from 'framer-motion';
import { FaClock, FaUsers, FaFire } from 'react-icons/fa';

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

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err) {
        setError('Failed to load recipes. Please try again later.');
        console.error('Error fetching recipes:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const name = recipe.name || recipe.title || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500">Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Recipe List
      </motion.h1>

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
        <p className="text-center text-gray-500">No recipes found matching your search.</p>
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
                className="cursor-pointer border border-gray-200 rounded-lg shadow-md overflow-hidden bg-white transition-transform duration-300 ease-in-out hover:shadow-lg"
              >
                <img
                  src={recipe.image}
                  alt={recipeName}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-recipe.jpg';
                  }}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-yellow-600 truncate">{recipeName}</h2>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <FaClock className="text-blue-500" /> 
                      Prep: {recipe.prepTimeMinutes} min | Cook: {recipe.cookTimeMinutes} min
                    </p>
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <FaUsers className="text-green-500" /> 
                      Servings: {recipe.servings}
                    </p>
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <FaFire className="text-red-500" /> 
                      Difficulty: {recipe.difficulty}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default RecipeList;