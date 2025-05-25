import React, { useState } from 'react';
import { AddNewRecipes } from '../api/newRecipie.api';

interface Recipe {
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

const difficultyOptions = ['Easy', 'Medium', 'Hard'];
const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const RecipeAddForm: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    name: '',
    ingredients: [''],
    instructions: [''],
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    servings: 1,
    difficulty: 'Easy',
    cuisine: '',
    caloriesPerServing: 0,
    tags: [],
    mealType: [],
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [newInstruction, setNewInstruction] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: name.includes('TimeMinutes') || name.includes('Servings') || name.includes('calories') 
        ? Number(value) 
        : value
    });
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients.filter(ing => ing.trim() !== ''), newIngredient.trim()]
      });
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: updatedIngredients.length > 0 ? updatedIngredients : [''] });
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setRecipe({
        ...recipe,
        instructions: [...recipe.instructions.filter(inst => inst.trim() !== ''), newInstruction.trim()]
      });
      setNewInstruction('');
    }
  };

  const handleRemoveInstruction = (index: number) => {
    const updatedInstructions = [...recipe.instructions];
    updatedInstructions.splice(index, 1);
    setRecipe({ ...recipe, instructions: updatedInstructions.length > 0 ? updatedInstructions : [''] });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !recipe.tags.includes(newTag.trim())) {
      setRecipe({
        ...recipe,
        tags: [...recipe.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...recipe.tags];
    updatedTags.splice(index, 1);
    setRecipe({ ...recipe, tags: updatedTags });
  };

  const handleMealTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setRecipe({
      ...recipe,
      mealType: checked
        ? [...recipe.mealType, value]
        : recipe.mealType.filter(type => type !== value)
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe({
          ...recipe,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Clean up empty strings from arrays
      const cleanedRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.filter(ing => ing.trim() !== ''),
        instructions: recipe.instructions.filter(inst => inst.trim() !== '')
      };

      // Basic validation
      if (!cleanedRecipe.name.trim()) {
        throw new Error('Recipe name is required');
      }
      if (cleanedRecipe.ingredients.length === 0) {
        throw new Error('At least one ingredient is required');
      }
      if (cleanedRecipe.instructions.length === 0) {
        throw new Error('At least one instruction is required');
      }

      const response = await AddNewRecipes(cleanedRecipe);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add recipe');
      }

      const data = await response.json();
      console.log('Recipe added successfully:', data);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setRecipe({
        name: '',
        ingredients: [''],
        instructions: [''],
        prepTimeMinutes: 0,
        cookTimeMinutes: 0,
        servings: 1,
        difficulty: 'Easy',
        cuisine: '',
        caloriesPerServing: 0,
        tags: [],
        mealType: [],
        image: ''
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add recipe';
      setError(message);
      console.error('Error adding recipe:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Vibrant Card Header */}
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 text-white">
            <h2 className="text-3xl font-bold">🍳 Add New Recipe</h2>
            <p className="text-white/90 mt-2">Share your culinary masterpiece with the world!</p>
          </div>
          
          {/* Card Body */}
          <div className="p-6 md:p-8">
            {submitSuccess ? (
              <div className="bg-gradient-to-r from-green-400 to-green-500 border-l-4 border-green-600 p-4 mb-6 text-white rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      Recipe added successfully!
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add Another Recipe
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg shadow-inner border border-yellow-200">
                    <label htmlFor="name" className="block text-sm font-medium text-yellow-800 mb-1">
                      Recipe Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={recipe.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-yellow-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white/80"
                      required
                    />
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg shadow-inner border border-red-200">
                    <label htmlFor="cuisine" className="block text-sm font-medium text-red-800 mb-1">
                      Cuisine*
                    </label>
                    <input
                      type="text"
                      id="cuisine"
                      name="cuisine"
                      value={recipe.cuisine}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/80"
                      required
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg shadow-inner border border-pink-200">
                  <label className="block text-sm font-medium text-pink-800 mb-2">Ingredients*</label>
                  <ul className="space-y-2 mb-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      ingredient.trim() && (
                        <li key={index} className="flex items-center justify-between bg-white/80 p-3 rounded-md shadow-xs border border-pink-200">
                          <span className="text-gray-800">{ingredient}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveIngredient(index)}
                            className="text-pink-600 hover:text-pink-800 p-1 rounded-full hover:bg-pink-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </li>
                      )
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      placeholder="Add new ingredient"
                      className="flex-1 px-3 py-2 border border-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80"
                    />
                    <button
                      type="button"
                      onClick={handleAddIngredient}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg shadow-inner border border-purple-200">
                  <label className="block text-sm font-medium text-purple-800 mb-2">Instructions*</label>
                  <ol className="space-y-3 mb-4">
                    {recipe.instructions.map((instruction, index) => (
                      instruction.trim() && (
                        <li key={index} className="flex items-start justify-between bg-white/80 p-3 rounded-md shadow-xs border border-purple-200">
                          <div className="flex items-start">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 font-medium text-sm mr-3">
                              {index + 1}
                            </span>
                            <span className="text-gray-800 flex-1">{instruction}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveInstruction(index)}
                            className="text-purple-600 hover:text-purple-800 p-1 rounded-full hover:bg-purple-100 ml-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </li>
                      )
                    ))}
                  </ol>
                  <div className="flex flex-col space-y-2">
                    <textarea
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value)}
                      placeholder="Add new instruction"
                      className="w-full px-3 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80"
                      rows={3}
                    />
                    <button
                      type="button"
                      onClick={handleAddInstruction}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 self-start"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Instruction
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-inner border border-blue-200">
                    <label htmlFor="prepTimeMinutes" className="block text-sm font-medium text-blue-800 mb-1">
                      Prep Time (minutes)*
                    </label>
                    <input
                      type="number"
                      id="prepTimeMinutes"
                      name="prepTimeMinutes"
                      value={recipe.prepTimeMinutes}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                      required
                    />
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg shadow-inner border border-indigo-200">
                    <label htmlFor="cookTimeMinutes" className="block text-sm font-medium text-indigo-800 mb-1">
                      Cook Time (minutes)*
                    </label>
                    <input
                      type="number"
                      id="cookTimeMinutes"
                      name="cookTimeMinutes"
                      value={recipe.cookTimeMinutes}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80"
                      required
                    />
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg shadow-inner border border-green-200">
                    <label htmlFor="servings" className="block text-sm font-medium text-green-800 mb-1">
                      Servings*
                    </label>
                    <input
                      type="number"
                      id="servings"
                      name="servings"
                      value={recipe.servings}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
                      required
                    />
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg shadow-inner border border-amber-200">
                    <label htmlFor="caloriesPerServing" className="block text-sm font-medium text-amber-800 mb-1">
                      Calories per Serving*
                    </label>
                    <input
                      type="number"
                      id="caloriesPerServing"
                      name="caloriesPerServing"
                      value={recipe.caloriesPerServing}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-lg shadow-inner border border-cyan-200">
                    <label className="block text-sm font-medium text-cyan-800 mb-1">Difficulty*</label>
                    <select
                      name="difficulty"
                      value={recipe.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white/80"
                      required
                    >
                      {difficultyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-gradient-to-r from-fuchsia-50 to-fuchsia-100 p-4 rounded-lg shadow-inner border border-fuchsia-200">
                    <label className="block text-sm font-medium text-fuchsia-800 mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {recipe.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center bg-gradient-to-r from-fuchsia-200 to-fuchsia-300 text-fuchsia-800 text-sm px-3 py-1 rounded-full shadow-xs">
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-fuchsia-600 hover:bg-fuchsia-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add new tag"
                        className="flex-1 px-3 py-2 border border-fuchsia-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 bg-white/80"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-violet-50 to-violet-100 p-4 rounded-lg shadow-inner border border-violet-200">
                  <label className="block text-sm font-medium text-violet-800 mb-2">Meal Type*</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {mealTypeOptions.map((type) => (
                      <label key={type} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          value={type}
                          checked={recipe.mealType.includes(type)}
                          onChange={handleMealTypeChange}
                          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-violet-300 rounded"
                        />
                        <span className="ml-2 text-sm text-violet-800">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-sky-50 to-sky-100 p-4 rounded-lg shadow-inner border border-sky-200">
                  <label htmlFor="image" className="block text-sm font-medium text-sky-800 mb-1">
                    Image
                  </label>
                  {recipe.image ? (
                    <div className="mb-3">
                      <img src={recipe.image} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
                      <button
                        type="button"
                        onClick={() => setRecipe({...recipe, image: ''})}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white/80"
                    />
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Add Recipe'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeAddForm;