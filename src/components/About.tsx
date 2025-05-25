import React from 'react';
import { motion } from 'framer-motion';

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const About = () => {
  return (
    <motion.div
      className="flex justify-center px-4 py-10 bg-gray-100 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariant}
    >
      <motion.div
        className="bg-white shadow-lg rounded-xl max-w-3xl w-full p-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-3xl font-bold text-red-600 mb-4"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          About Recipe Master
        </motion.h1>

        <p className="text-gray-700 mb-6">
          Welcome to <strong>Recipe Master</strong> — your ultimate companion for discovering,
          saving, and sharing delicious recipes from around the world.
        </p>

        <motion.h2
          className="text-xl font-semibold text-gray-800 mt-6 mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Our Mission
        </motion.h2>
        <p className="text-gray-700 mb-6">
          We aim to inspire culinary creativity by providing a platform where users can explore
          diverse recipes, learn new cooking techniques, and share their own favorite dishes with a
          vibrant community.
        </p>

        <motion.h2
          className="text-xl font-semibold text-gray-800 mt-6 mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Features
        </motion.h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li>Browse a vast collection of recipes with detailed ingredients and instructions.</li>
          <li>Save your favorite recipes for quick access anytime.</li>
          <li>Search recipes by ingredients, cuisine, or dietary preferences.</li>
          <li>Contribute your own recipes and get feedback from other food enthusiasts.</li>
        </ul>

        <motion.h2
          className="text-xl font-semibold text-gray-800 mt-6 mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Get in Touch
        </motion.h2>
        <p className="text-gray-700">
          Have questions or want to contribute? Reach out to us at{' '}
          <a
            href="mailto:support@recipemaster.com"
            className="text-red-600 hover:underline"
          >
            support@recipemaster.com
          </a>.
        </p>

        <p className="mt-8 italic text-gray-600 text-right">Happy Cooking!</p>
      </motion.div>
    </motion.div>
  );
};

export default About;
