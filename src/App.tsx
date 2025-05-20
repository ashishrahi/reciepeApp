import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import RecipePage from './pages/RecipePage';
import RecipeDetails from './components/RecipeDetail';
import Header from './components/Header'
import HomePage from './pages/HomePage';
// 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
