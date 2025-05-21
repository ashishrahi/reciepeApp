import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FiLogIn, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { GiCookingPot } from 'react-icons/gi';

const navItems = [
  { label: 'Home', path: '/home' },
  { label: 'Recipes', path: '/recipes' },
  { label: 'Favorites', path: '/favorites' },
  { label: 'About', path: '/about' },
];

// LoginModal Component
const LoginModal: React.FC<{
  onClose: () => void;
  onLoginSuccess: (user: { name: string; avatar: string }) => void;
}> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess({
          name: data.firstName || username,
          avatar: `https://i.pravatar.cc/100?u=${data.id || username}`,
        });
        onClose();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-30">
      <div className="bg-white rounded-lg shadow-xl p-8 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close login modal"
        >
          ✕
        </button>
        <div className="flex flex-col items-center mb-6">
          <GiCookingPot className="text-yellow-600 text-5xl mb-2" />
          <h2 className="text-3xl font-bold text-yellow-700">RecipeApp Login</h2>
          <p className="text-gray-600 mt-1">Welcome back! Please login to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-yellow-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-yellow-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginSuccess = (userData: { name: string; avatar: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  return (
    <>
      <nav className="bg-yellow-100 shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <GiCookingPot className="text-yellow-600 text-3xl" />
              <Link to="/" className="text-yellow-600 font-bold text-xl">
                RecipeApp
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(path)
                      ? 'text-white bg-yellow-600'
                      : 'text-yellow-800 hover:text-white hover:bg-yellow-500'
                  }`}
                >
                  {label}
                </Link>
              ))}

              {isLoggedIn && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full border-2 border-yellow-600"
                    />
                    <span className="text-sm font-medium text-yellow-800">{user.name}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-yellow-800 hover:bg-yellow-100 flex items-center gap-2"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiUser />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-yellow-800 hover:bg-yellow-100 flex items-center gap-2"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiSettings />
                        Settings
                      </Link>
                      <hr />
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setUser(null);
                          setDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 flex items-center gap-2"
                      >
                        <FiLogOut />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  <FiLogIn />
                  Login
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-yellow-800 hover:text-yellow-600"
              >
                {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-yellow-100 shadow-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(path)
                      ? 'text-white bg-yellow-600'
                      : 'text-yellow-800 hover:text-white hover:bg-yellow-500'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="border-t my-2 border-yellow-300" />
              {isLoggedIn && user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-yellow-800 hover:bg-yellow-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-yellow-800 hover:bg-yellow-200"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUser(null);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setLoginModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-yellow-800 hover:bg-yellow-200"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {loginModalOpen && (
        <LoginModal
          onClose={() => setLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Navbar;
