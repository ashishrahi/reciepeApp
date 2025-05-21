import React from "react";

const HeaderWithFoodItems = () => {
  return (
    <header className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 p-6 text-white min-h-screen flex items-center justify-center">
      <div className="flex max-w-6xl w-full items-center gap-16">
        {/* Left Side: Multiple food items with cooking vibe */}
        <div className="food-items flex flex-col gap-10 items-center flex-shrink-0">
          {/* Cooking Pot with Steam */}
          <div className="pot-container relative">
            <svg
              viewBox="0 0 220 220"
              width="160"
              height="160"
              aria-label="Cooking pot with steam animation"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
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
              <g className="steam">
                <ellipse cx="90" cy="90" rx="8" ry="25" />
                <ellipse cx="120" cy="80" rx="6" ry="18" />
                <ellipse cx="150" cy="70" rx="5" ry="15" />
              </g>
            </svg>
          </div>

          {/* Pan with veggies */}
          <div className="pan-container" style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.25))" }}>
            <svg
              viewBox="0 0 200 120"
              width="160"
              height="100"
              role="img"
              aria-label="Pan with veggies"
              xmlns="http://www.w3.org/2000/svg"
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
              <rect x="10" y="70" width="30" height="10" fill="#5A3E1B" rx="5" ry="5" />
              {/* Veggies */}
              <circle cx="60" cy="75" r="10" fill="#4CAF50" />
              <circle cx="85" cy="80" r="7" fill="#FF7043" />
              <circle cx="110" cy="70" r="9" fill="#FFD54F" />
              <circle cx="135" cy="78" r="8" fill="#81D4FA" />
              <circle cx="160" cy="72" r="6" fill="#E040FB" />
            </svg>
          </div>

          {/* Spices jar */}
          <div className="jar-container" style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.25))" }}>
            <svg
              viewBox="0 0 100 160"
              width="80"
              height="120"
              role="img"
              aria-label="Spices jar"
              xmlns="http://www.w3.org/2000/svg"
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
              <rect x="30" y="15" width="40" height="20" fill="#8B5E3C" rx="10" ry="10" />
              {/* Label */}
              <rect x="35" y="75" width="30" height="40" fill="#F0E68C" rx="8" ry="8" />
            </svg>
          </div>

          {/* Steaming bowl */}
          <div className="bowl-container relative">
            <svg
              viewBox="0 0 160 120"
              width="140"
              height="100"
              aria-label="Steaming bowl"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bowl base */}
              <ellipse cx="80" cy="110" rx="70" ry="20" fill="#8B4513" />
              <ellipse cx="80" cy="100" rx="50" ry="15" fill="#A0522D" />
              <rect
                x="20"
                y="60"
                width="120"
                height="40"
                fill="#D2691E"
                rx="20"
                ry="20"
              />

              {/* Steam */}
              <g className="steam">
                <ellipse cx="55" cy="60" rx="6" ry="18" />
                <ellipse cx="85" cy="50" rx="5" ry="15" />
                <ellipse cx="115" cy="55" rx="6" ry="18" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right Side: Header Text & Search */}
        <div className="text-center max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 leading-tight drop-shadow-md">
            Welcome to Recipe Hub
          </h1>
          <p className="text-xl md:text-2xl mb-5 drop-shadow-sm">
            Apni favorite recipes search karo aur explore karo!
          </p>

          <div className="flex justify-center mb-6">
            <input
              type="search"
              placeholder="Search recipes..."
              className="w-full max-w-md px-6 py-3 rounded-lg text-black focus:outline-none focus:ring-4 focus:ring-yellow-200 shadow-lg"
            />
          </div>

          <button className="px-8 py-3 bg-white text-red-500 font-semibold rounded-full shadow-md hover:bg-red-100 transition duration-300">
            Explore Recipes
          </button>
        </div>
      </div>

      <style jsx>{`
        .food-items {
          user-select: none;
        }
        /* Steam animation */
        .steam ellipse {
          fill: #eee;
          opacity: 0.6;
          animation: steamRise 3s linear infinite;
          transform-origin: center bottom;
        }

        /* Different delays for steam ellipses */
        .steam ellipse:nth-child(1) {
          animation-delay: 0s;
        }
        .steam ellipse:nth-child(2) {
          animation-delay: 1s;
          opacity: 0.5;
        }
        .steam ellipse:nth-child(3) {
          animation-delay: 2s;
          opacity: 0.4;
        }

        @keyframes steamRise {
          0% {
            transform: translateY(0) scaleX(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) scaleX(1.2);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-30px) scaleX(1);
            opacity: 0;
          }
        }
      `}</style>
    </header>
  );
};

export default HeaderWithFoodItems;
