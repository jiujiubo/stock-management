import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
       // Simple mock authentication
       onLogin();
    } else {
        setError('Please enter valid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-fade-in">
        <div className="bg-slate-900 p-10 text-center">
          <h1 className="text-3xl font-bold text-white tracking-wide uppercase mb-2">Great River</h1>
          <p className="text-lg text-slate-300 font-light">Stock Management System</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-400 transition-all outline-none"
                placeholder="admin@greatriver.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-400 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute right-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            &copy; 2024 Great River New Energy Service Co. Ltd
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;