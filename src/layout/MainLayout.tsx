// MainLayout.tsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Plus } from "lucide-react";
import ChatBotWrapper from "../components/ChatBotWrapper";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    navigate("/recipes/newrecipe");
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow mt-12">
        <Outlet />
      </main>
      <Footer />

      {/* Floating Action Button */}
      <button
        onClick={handleAddRecipe}
        aria-label="Add New Recipe"
        title="Add New Recipe"
        className="
          fixed bottom-6 right-6 z-50
          bg-blue-500 hover:bg-red-600
          text-white p-4 rounded-full
          shadow-lg transition duration-300
          ease-in-out transform hover:scale-110
          animate-bounce
        "
      >
        <Plus className="w-6 h-6" />
      </button>
      <div className="fixed bottom-6 left-6 z-40">
  <ChatBotWrapper />
</div>
    </div>
  );
};

export default MainLayout;
