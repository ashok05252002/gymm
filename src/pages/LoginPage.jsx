import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ChevronDown, Check, LoaderCircle, Dumbbell, Smartphone } from 'lucide-react';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password.');
      return;
    }
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
        let path;
        let success = false;

        if (email === 'admin@gym.com' && password === 'password') {
            path = '/admin/dashboard';
            success = true;
        } else if (email === 'reception@gym.com' && password === 'password') {
            path = '/receptionist/dashboard';
            success = true;
        } else if (email === 'trainer@gym.com' && password === 'password') {
            path = '/mobile/trainer/home';
            success = true;
        } else if (email === 'member@gym.com' && password === 'password') {
            path = '/mobile/member/home';
            success = true;
        }

        if(success) {
            toast.success(`Logged in successfully! Redirecting...`);
            setTimeout(() => navigate(path), 1500);
        } else {
            toast.error('Invalid Credentials');
            setIsLoading(false);
        }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        className="w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Panel: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center gap-3 mb-6">
                <Dumbbell className="h-8 w-8 text-brand-red" />
                <h1 className="text-3xl font-display font-bold text-brand-dark">GymPro</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-display">Welcome Back!</h2>
            <p className="text-gray-500 mb-8">Login to access your dashboard.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email (e.g., admin@gym.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password (password)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="peer appearance-none h-5 w-5 border border-gray-400 rounded-md checked:bg-brand-red checked:border-transparent focus:outline-none"
                    />
                    <Check className={`absolute left-0.5 top-0.5 h-4 w-4 text-white transition-opacity ${rememberMe ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  Remember Me
                </label>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm font-medium text-brand-red hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-red text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin h-6 w-6" />
                    Authenticating...
                  </>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">Or, preview the mobile app experience:</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/mobile/trainer"
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold text-sm hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all shadow-md"
                    >
                        <Smartphone size={16} />
                        Trainer View
                    </Link>
                    <Link 
                        to="/mobile/member"
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold text-sm hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all shadow-md"
                    >
                        <Smartphone size={16} />
                        Member View
                    </Link>
                </div>
            </div>

          </div>
        </div>

        {/* Right Panel: Image */}
        <div className="hidden md:block md:w-1/2">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2787&auto=format&fit=crop')" }}>
            <div className="h-full w-full bg-black/50"></div>
          </div>
        </div>
      </motion.div>
      <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LoginPage;
