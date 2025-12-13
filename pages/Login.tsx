import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Briefcase } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'client' | 'provider'>('client');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login based on role
    if (role === 'client') {
      navigate('/user-dashboard');
    } else {
      navigate('/provider-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 animate-fade-in-up">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-2">Welcome Back</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Sign in to manage your {role === 'client' ? 'requests' : 'business'}.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setRole('client')}
            className={`flex-1 flex items-center justify-center py-2.5 text-sm font-bold rounded-lg transition-all ${
              role === 'client' 
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4 mr-2" /> Homeowner
          </button>
          <button
            onClick={() => setRole('provider')}
            className={`flex-1 flex items-center justify-center py-2.5 text-sm font-bold rounded-lg transition-all ${
              role === 'provider' 
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" /> Professional
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email address</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="block w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                placeholder="you@example.com" 
                defaultValue={role === 'client' ? 'alex.j@example.com' : 'john@smithplumbing.com'} 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="block w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 placeholder-slate-400 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                placeholder="••••••••" 
                defaultValue="password" 
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-slate-400">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5">
            Sign in as {role === 'client' ? 'Homeowner' : 'Provider'}
          </button>
        </form>

        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account? <Link to="/register-provider" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
};