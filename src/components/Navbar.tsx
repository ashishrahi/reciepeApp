import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FiLogIn, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { GiCookingPot } from 'react-icons/gi';
import LoginModal from './LoginModal';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../features/store';
import { logout } from '../features/authSlice'; // Adjust this import according to your redux slice
import { toast } from 'react-toastify';

const navItems = [
  { label: 'Home', path: '/home' },
  { label: 'Recipes', path: '/recipes' },
  { label: 'Favorites', path: '/favorites' },
  { label: 'About', path: '/about' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const isActive = (path: string) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when clicking outside or navigating
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLoginSuccess = (userData: { name: string; avatar: string }) => {
    // Normally you'd dispatch a Redux action here to save user info
    // For example: dispatch(login(userData));
    // Then close modal
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch your logout redux action here
    toast.success('Logout successful!');
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-yellow-100 shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <GiCookingPot className="text-yellow-600 text-3xl" />
              <Link to="/home" className="text-yellow-600 font-bold text-xl">
                RecipeApp
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(path)
                      ? 'text-white bg-yellow-600'
                      : 'text-yellow-800 hover:text-white hover:bg-yellow-500'
                    }`}
                >
                  {label}
                </Link>
              ))}

              {user ? (
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
                  </button>
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-20 transition-all duration-200 origin-top-right"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <div className="flex items-center px-4 py-3 border-b border-gray-100">
                        <FiUser className="text-yellow-800 mr-2" size={20} />
                        <span className="text-sm font-semibold text-yellow-900 truncate">
                          {user.username}
                        </span>
                      </div>

                      <Link
                        to="/profile"
                        role="menuitem"
                        className="flex items-center gap-2 px-4 py-2 text-yellow-800 hover:bg-yellow-100 transition-colors duration-150"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiUser />
                        <span>Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        role="menuitem"
                        className="flex items-center gap-2 px-4 py-2 text-yellow-800 hover:bg-yellow-100 transition-colors duration-150"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiSettings />
                        <span>Settings</span>
                      </Link>

                      <hr className="border-gray-200" />

                      <button
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 transition-colors duration-150"
                      >
                        <FiLogOut />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200"
                >
                  <FiLogIn />
                  Login
                </button>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-yellow-800 hover:text-yellow-600 focus:outline-none transition-colors duration-200"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? (
                  <AiOutlineClose size={24} className="transform transition-transform duration-300" />
                ) : (
                  <AiOutlineMenu size={24} className="transform transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with sliding animation */}
        <div
          ref={menuRef}
          className={`md:hidden fixed top-16 left-0 right-0 bg-yellow-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          style={{ zIndex: 40 }}
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 transform hover:scale-105 ${isActive(path)
                    ? 'text-white bg-yellow-600 scale-105'
                    : 'text-yellow-800 hover:text-white hover:bg-yellow-500'
                  }`}
              >
                {label}
              </Link>
            ))}

            <div className="border-t border-yellow-300 my-2"></div>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-yellow-800 hover:bg-yellow-200 rounded-md transition-all duration-200 transform hover:scale-105 flex items-center gap-3"
                >
                  <FiUser className="text-lg" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-yellow-800 hover:bg-yellow-200 rounded-md transition-all duration-200 transform hover:scale-105 flex items-center gap-3"
                >
                  <FiSettings className="text-lg" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-100 rounded-md transition-all duration-200 transform hover:scale-105 flex items-center gap-3"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setLoginModalOpen(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-yellow-800 hover:bg-yellow-200 rounded-md transition-all duration-200 transform hover:scale-105 flex items-center gap-3"
              >
                <FiLogIn className="text-lg" />
                Login
              </button>
            )}
          </div>
        </div>
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
