import React, { useState } from 'react';
import { GiCookingPot } from 'react-icons/gi';
import { useAppDispatch } from '../features/hook';
import { loginUser } from '../features/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate()

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error('Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      const resultAction = await dispatch(loginUser({ username, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success('Login successful!');
        navigate('/home')
        onLoginSuccess();
        onClose();
      } else if (resultAction.payload) {
        toast.error(resultAction.payload);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
    const err = error as { response: { message: string } };
    toast.error(err.response.message);
  } else {
    toast.error('An unexpected error occurred');
  }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-30">
      <div className="bg-white rounded-lg shadow-xl p-8 w-96 relative">

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
              onChange={(e) => setUsername(e.target.value)}
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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-yellow-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 disabled:opacity-60 transition-colors duration-200 flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Demo credentials:</p>
          <p>Username: <span className="font-mono">emilys</span></p>
          <p>Password: <span className="font-mono">emilyspass</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
