import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import RecipeList from "./pages/RecipePage";
import NewRecipe from "./pages/CreateRecipe";
import RecipeDetails from "./components/RecipeDetail";
import PrivateRoute from "./components/ProtectRoute";
import LoginPage from "./pages/LoginPage";
import { ToastContainer,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./pages/About";
import UserProfile from "./components/UserProfile";
import Favorites from "./components/Favorites";

// import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <>  
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />  {/* Self-closing tag */}

        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="recipes" element={<RecipeList />} />
          <Route
            path="recipes/newrecipe"
            element={
              <PrivateRoute>
                <NewRecipe />
              </PrivateRoute>
            }
          />
          <Route
            path="recipes/:id"
            element={
              <PrivateRoute>
                <RecipeDetails />
              </PrivateRoute>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="favorites" element={<Favorites />} />
          
          


          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </Router>
     <ToastContainer position="top-center" transition={Flip} autoClose={3000} />
    </>

  );
};

export default App;
