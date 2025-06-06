import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Recipe {
  id: number;
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
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [recipe, setRecipe] = useState<Recipe | null>(location.state?.recipe || null);
  const [loading, setLoading] = useState<boolean>(!recipe);
  const [error, setError] = useState<string | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (recipe) return;

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, recipe]);

  const handleExportPDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${recipe?.name || 'recipe-details'}.pdf`);
  };

  if (loading) {
    return (
      <motion.div className="flex justify-center items-center h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div className="flex justify-center items-center h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-red-500 text-xl">{error}</div>
      </motion.div>
    );
  }

  if (!recipe) {
    return (
      <motion.div className="flex justify-center items-center h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-gray-500 text-xl">No recipe found</div>
      </motion.div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className="bg-gray-50 min-h-screen py-20 px-12 sm:px-6 lg:px-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      
      {/* Animated Export PDF Icon */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-end">
        <motion.div
          onClick={handleExportPDF}
          whileHover={{ scale: 1.2, color: 'red' }}  // blue-600
          whileTap={{ scale: 0.9 }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleExportPDF(); }}
          aria-label="Download recipe as PDF"
          className="cursor-pointer text-red-500 text-4xl  rounded p-2 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-700"
        >
          <FaFilePdf />
        </motion.div>
      </div>

      {/* Content to Export */}
      <motion.div
        ref={pdfRef}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Left side - Recipe Image */}
        <motion.div
          className="md:w-1/2 relative h-64 sm:h-80 md:h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover rounded-l-xl"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-bl-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{recipe.name}</h1>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400 flex">
                {[...Array(5)].map((_, i) => (
                  <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.1 }}>
                    {i < Math.floor(recipe.rating) ? <FaStar /> : <FaRegStar />}
                  </motion.span>
                ))}
              </span>
              <motion.span className="ml-2 text-white text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                {recipe.rating} ({recipe.reviewCount} reviews)
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Recipe Details */}
        <motion.div className="md:w-1/2 p-6 overflow-hidden max-h-[110vh]" variants={container} initial="hidden" animate="show">
          {/* Recipe Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b pb-4 mb-4">
            {[
              { label: 'Prep Time', value: `${recipe.prepTimeMinutes} mins` },
              { label: 'Cook Time', value: `${recipe.cookTimeMinutes} mins` },
              { label: 'Servings', value: recipe.servings },
              { label: 'Calories', value: `${recipe.caloriesPerServing} kcal` },
            ].map((meta, index) => (
              <motion.div key={index} className="text-center" variants={item}>
                <div className="text-gray-500 text-sm">{meta.label}</div>
                <div className="font-semibold">{meta.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Tags */}
          <motion.div className="flex flex-wrap gap-2 mb-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">{recipe.cuisine}</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{recipe.difficulty}</span>
            {recipe.mealType.map((type, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {type}
              </motion.span>
            ))}
          </motion.div>

          {/* Ingredients */}
          <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Ingredients</h2>
            <motion.ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" variants={container} initial="hidden" animate="show">
              {recipe.ingredients.map((ingredient, index) => (
                <motion.li key={index} className="flex items-start" variants={item}>
                  <span className="inline-block w-1 h-1 mt-2 mr-2 bg-gray-500 rounded-full"></span>
                  <span className="text-gray-700">{ingredient}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Instructions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Instructions</h2>
            <motion.ol className="space-y-4" variants={container} initial="hidden" animate="show">
              {recipe.instructions.map((step, index) => (
                <motion.li key={index} className="flex" variants={item} whileHover={{ x: 5 }}>
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full mr-3 font-medium">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{step}</p>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecipeDetails;
