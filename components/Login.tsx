import React, { useState } from 'react';
import { ArrowRight, Lock, Loader2, UserPlus, LogIn } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');
    
    try {
      if (isSignUp) {
        // Handle Sign Up
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.user && !data.session) {
           setSuccessMsg("Account created! Please check your email to confirm your registration before logging in.");
           setIsSignUp(false); // Switch back to login view
        }
      } else {
        // Handle Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
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
          <div className="flex justify-center mb-6">
            <div className="bg-slate-100 p-1 rounded-lg flex">
                <button 
                    onClick={() => { setIsSignUp(false); setError(''); setSuccessMsg(''); }}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${!isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Sign In
                </button>
                <button 
                    onClick={() => { setIsSignUp(true); setError(''); setSuccessMsg(''); }}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Create Account
                </button>
            </div>
          </div>

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
                  minLength={6}
                  required
                />
                <Lock className="absolute right-3 top-3.5 text-slate-400" size={18} />
              </div>
              {isSignUp && <p className="text-xs text-slate-400 mt-1">Must be at least 6 characters</p>}
            </div>

            {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
            
            {successMsg && (
                <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg border border-green-100">
                    {successMsg}
                </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 ${isSignUp ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'}`}
            >
              {loading ? (
                  <Loader2 className="animate-spin" size={20} />
              ) : isSignUp ? (
                  <>Create Account <UserPlus size={18} /></>
              ) : (
                  <>Sign In <LogIn size={18} /></>
              )}
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