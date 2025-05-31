const HeaderWithFoodItems = () => {
  return (
    <header 
      className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 p-6 text-white min-h-screen flex items-center justify-center"
      aria-label="Recipe Hub Header"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          {/* Left Side: Animated Food Illustrations */}
          <div className="food-illustrations flex flex-col items-center gap-8 md:gap-10 w-full lg:w-auto">
            {/* Cooking Pot with Steam */}
            <div className="relative w-40 h-40">
              <svg
                viewBox="0 0 220 220"
                className="w-full h-full"
                aria-hidden="true"
                focusable="false"
              >
                {/* Pot base */}
                <ellipse cx="110" cy="160" rx="75" ry="25" fill="#5A4E4D" />
                <ellipse cx="110" cy="145" rx="60" ry="15" fill="#3B2E2E" />
                <rect
                  x="50"
                  y="135"
                  width="120"
                  height="25"
                  fill="#3B2E2E"
                  rx="12"
                  ry="12"
                />

                {/* Pot lid */}
                <ellipse cx="110" cy="115" rx="70" ry="20" fill="#756B68" />
                <rect
                  x="60"
                  y="95"
                  width="100"
                  height="20"
                  fill="#8C7F7A"
                  rx="10"
                  ry="10"
                />
                <circle cx="110" cy="85" r="10" fill="#5A4E4D" />

                {/* Steam */}
                <g className="steam-group">
                  <ellipse 
                    cx="90" 
                    cy="90" 
                    rx="8" 
                    ry="25" 
                    className="steam-particle"
                    style={{ animationDelay: '0s' }}
                  />
                  <ellipse 
                    cx="120" 
                    cy="80" 
                    rx="6" 
                    ry="18" 
                    className="steam-particle"
                    style={{ animationDelay: '0.5s' }}
                  />
                  <ellipse 
                    cx="150" 
                    cy="70" 
                    rx="5" 
                    ry="15" 
                    className="steam-particle"
                    style={{ animationDelay: '1s' }}
                  />
                </g>
              </svg>
            </div>

            {/* Pan with veggies */}
            <div className="relative w-40 h-28">
              <svg
                viewBox="0 0 200 120"
                className="w-full h-full"
                aria-hidden="true"
                focusable="false"
              >
                {/* Pan */}
                <rect
                  x="20"
                  y="60"
                  width="160"
                  height="40"
                  rx="15"
                  ry="15"
                  fill="#A0522D"
                />
                <rect 
                  x="10" 
                  y="70" 
                  width="30" 
                  height="10" 
                  fill="#5A3E1B" 
                  rx="5" 
                  ry="5" 
                />
                {/* Veggies with subtle animation */}
                <circle 
                  cx="60" 
                  cy="75" 
                  r="10" 
                  fill="#4CAF50" 
                  className="animate-pulse"
                  style={{ animationDuration: '3s' }}
                />
                <circle 
                  cx="85" 
                  cy="80" 
                  r="7" 
                  fill="#FF7043" 
                  className="animate-pulse"
                  style={{ animationDuration: '3.5s' }}
                />
                <circle 
                  cx="110" 
                  cy="70" 
                  r="9" 
                  fill="#FFD54F" 
                  className="animate-pulse"
                  style={{ animationDuration: '4s' }}
                />
                <circle 
                  cx="135" 
                  cy="78" 
                  r="8" 
                  fill="#81D4FA" 
                  className="animate-pulse"
                  style={{ animationDuration: '3.2s' }}
                />
                <circle 
                  cx="160" 
                  cy="72" 
                  r="6" 
                  fill="#E040FB" 
                  className="animate-pulse"
                  style={{ animationDuration: '3.7s' }}
                />
              </svg>
            </div>

            {/* Spices jar */}
            <div className="relative w-32 h-48">
              <svg
                viewBox="0 0 100 160"
                className="w-full h-full"
                aria-hidden="true"
                focusable="false"
              >
                {/* Jar */}
                <rect
                  x="20"
                  y="30"
                  width="60"
                  height="100"
                  fill="#C68642"
                  rx="15"
                  ry="15"
                />
                <rect 
                  x="30" 
                  y="15" 
                  width="40" 
                  height="20" 
                  fill="#8B5E3C" 
                  rx="10" 
                  ry="10" 
                />
                {/* Label */}
                <rect 
                  x="35" 
                  y="75" 
                  width="30" 
                  height="40" 
                  fill="#F0E68C" 
                  rx="8" 
                  ry="8" 
                />
                {/* Spice particles */}
                <circle cx="50" cy="85" r="2" fill="#FF5722" />
                <circle cx="60" cy="95" r="3" fill="#4CAF50" />
                <circle cx="45" cy="105" r="2.5" fill="#FFC107" />
              </svg>
            </div>
          </div>

          {/* Right Side: Header Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              <span className="block mb-2">Welcome to</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-100">
                Recipe Hub
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
              Discover, create, and share delicious recipes from around the world
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <div className="relative w-full max-w-md">
                <input
                  type="search"
                  placeholder="Search recipes..."
                  aria-label="Search recipes"
                  className="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg"
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 p-2 rounded-full"
                  aria-label="Submit search"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-800" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                className="px-8 py-3 bg-white text-red-500 font-semibold rounded-full shadow-lg hover:bg-red-50 transition duration-300 hover:scale-105 transform"
                aria-label="Explore recipes"
              >
                Explore Recipes
              </button>
              <button 
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full shadow-lg hover:bg-white hover:bg-opacity-10 transition duration-300 hover:scale-105 transform"
                aria-label="Learn more"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        .food-illustrations {
          perspective: 1000px;
        }
        
        .steam-group {
          opacity: 0.8;
        }
        
        .steam-particle {
          fill: rgba(255, 255, 255, 0.7);
          animation: steamRise 4s ease-out infinite;
          transform-origin: center bottom;
        }
        
        @keyframes steamRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-15px) scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-30px) scale(0.9);
            opacity: 0;
          }
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </header>
  );
};

export default HeaderWithFoodItems;