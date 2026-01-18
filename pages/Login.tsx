import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, ArrowRight, Mail, Lock, Phone, UserPlus } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'client' | 'provider'>('client');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'client') {
      navigate('/user-dashboard');
    } else {
      navigate('/provider-dashboard');
    }
  };

  return (
    <div className="w-full animate-fade-in-up py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="max-w-[460px] w-full px-4">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] dark:shadow-2xl border border-slate-100 dark:border-slate-800 relative z-20">

          {/* Subtle Accent Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-sans tracking-tight">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {isLogin ? 'Enter your details to sign in.' : 'Join the provider network today.'}
            </p>
          </div>

          {/* Type Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${isLogin ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
              Log in
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${!isLogin ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account Role */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${role === 'client' ? 'border-indigo-600 bg-indigo-50/30 text-indigo-600' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}
              >
                <User size={18} />
                <span className="text-[11px] font-bold uppercase tracking-wider">Client</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('provider')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${role === 'provider' ? 'border-indigo-600 bg-indigo-50/30 text-indigo-600' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}
              >
                <Briefcase size={18} />
                <span className="text-[11px] font-bold uppercase tracking-wider">Pro</span>
              </button>
            </div>

            <div className="space-y-4">
              {!isLogin && (
                <div className="relative group">
                  <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Full name" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm outline-none dark:text-white" required />
                </div>
              )}

              {!isLogin && role === 'provider' && (
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="tel" placeholder="Phone number" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm outline-none dark:text-white" required />
                </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" placeholder="Email address" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm outline-none dark:text-white" required />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="password" placeholder="Password" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-600/20 transition-all text-sm outline-none dark:text-white" required />
              </div>
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-4 font-bold text-sm flex items-center justify-center gap-2 transition-all mt-4">
              {isLogin ? 'Sign in' : 'Create account'}
              <ArrowRight size={18} />
            </button>

            <p className="text-center text-[11px] text-slate-400 mt-6 font-medium">
              By clicking continue, you agree to our <span className="text-indigo-600 dark:text-indigo-400 cursor-pointer">Terms of Service</span>.
            </p>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-600 dark:text-slate-400 text-sm font-semibold hover:text-indigo-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
