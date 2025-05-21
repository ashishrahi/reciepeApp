import RecipePage from "./RecipePage";
import Header from "../components/Header";
import Category from "../components/Category";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 p-6 text-white mt-10 min-h-screen">
      <Header />
      <Category />
      <RecipePage />
    </div>
  );
};

export default HomePage;
