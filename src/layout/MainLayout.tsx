import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Plus } from "lucide-react"; // You can replace with any other icon library

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    navigate("/add-recipe"); // Change this path to your route
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow mt-5 ">
        <Outlet />
      </main>
      <Footer />

      {/* Animated Floating Action Button */}
      <button
        onClick={handleAddRecipe}
        className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg 
        transition duration-300 ease-in-out transform hover:scale-110 animate-bounce"
        title="Add New Recipe"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MainLayout;
