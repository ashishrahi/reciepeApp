import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 p-6 text-white mt-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Recipe Hub</h1>
        <p className="text-lg mb-4">Apni favorite recipes search karo aur explore karo!</p>

        <div>
          <input
            type="search"
            placeholder="Search recipes..."
            className="w-full max-w-md px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
