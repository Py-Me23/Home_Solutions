import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const LogoIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="HomeSolutions Logo"
  >
    {/* Green Pin Shape */}
    <path
      d="M50 0C27.9 0 10 17.9 10 40C10 65 50 100 50 100C50 100 90 65 90 40C90 17.9 72.1 0 50 0Z"
      fill="#6FCF97"
    />
    {/* Blue House Shape */}
    <path
      d="M50 15L28 32V65H72V32L50 15Z"
      fill="#3B82F6"
      stroke="white"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Window Pane (White) */}
    <rect x="42" y="40" width="16" height="16" rx="2" fill="white" fillOpacity="0.9" />
    <path d="M50 40V56M42 48H58" stroke="#3B82F6" strokeWidth="2" />
  </svg>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showHeaderFooter = location.pathname !== '/login' && location.pathname !== '/register-provider';

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800 dark:text-slate-200">
      {showHeaderFooter && (
        <header
          className={`fixed z-50 transition-all duration-500 left-1/2 -translate-x-1/2 ${scrolled
            ? 'top-4 w-[95%] max-w-7xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl rounded-2xl py-2 px-8'
            : 'top-0 w-full bg-slate-950/20 backdrop-blur-sm border-b border-white/5 py-4 px-8'
            }`}
        >
          <div className="flex items-center justify-between h-12">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl">
                <LogoIcon className="w-9 h-9" />
              </div>
              <span className={`text-2xl font-[900] tracking-tight ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                HomeSolutions
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-10">
              {[
                { path: '/', label: 'Home' },
                { path: '/search', label: 'Browse Services' },
                { path: '/login', label: 'Login' }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-bold tracking-tight transition-all duration-300 hover:opacity-100 ${isActive(link.path)
                    ? 'text-indigo-500'
                    : scrolled
                      ? 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'
                      : 'text-white/80 hover:text-white'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={toggleTheme}
                className={`transition-all duration-300 hover:scale-110 ${scrolled
                  ? 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'
                  : 'text-white/80 hover:text-white'
                  }`}
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 shadow-white" />}
              </button>

              <Link
                to="/register-provider"
                className={`px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-[1.05] active:scale-[0.95] ${scrolled
                  ? 'bg-slate-900 text-white dark:bg-indigo-600'
                  : 'bg-white text-indigo-600'
                  }`}
              >
                Join as Pro
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center md:hidden gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${scrolled ? 'text-slate-800 dark:text-white' : 'text-white'}`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                className={`p-2 rounded-full ${scrolled ? 'text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/20'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-sm z-40 md:hidden animate-fade-in-up">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 flex flex-col space-y-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 text-slate-800 dark:text-white font-medium text-lg font-serif">Home</Link>
            <Link to="/search" onClick={() => setIsMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium">Find Services</Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="py-2 text-slate-600 dark:text-slate-300 font-medium">Login</Link>
            <Link to="/register-provider" onClick={() => setIsMenuOpen(false)} className="py-3 text-center bg-indigo-600 text-white rounded-xl font-bold shadow-md">Join as Pro</Link>
          </div>
        </div>
      )}

      <main className={`flex-grow ${!showHeaderFooter ? 'flex items-center justify-center bg-white dark:bg-slate-950' : ''}`}>
        {children}
      </main>

      {showHeaderFooter && (
        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-16 border-t border-slate-800 dark:border-slate-900">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-white">
                  <LogoIcon className="w-8 h-8" />
                  <span className="text-xl font-bold font-sans">HomeSolutions</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Elevating home maintenance with trusted, verified professionals. Quality service, right at your doorstep.
                </p>
              </div>
              <div>
                <h4 className="text-white font-serif text-lg mb-6">Discover</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/search?category=Plumbing" className="hover:text-indigo-400 transition-colors">Plumbing</Link></li>
                  <li><Link to="/search?category=Electrical" className="hover:text-indigo-400 transition-colors">Electrical</Link></li>
                  <li><Link to="/search?category=Cleaning" className="hover:text-indigo-400 transition-colors">Home Cleaning</Link></li>
                  <li><Link to="/search" className="hover:text-indigo-400 transition-colors">All Services</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-serif text-lg mb-6">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link to="#" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                  <li><Link to="#" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
                  <li><Link to="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link to="#" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-serif text-lg mb-6">For Pros</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/register-provider" className="hover:text-indigo-400 transition-colors">Register Business</Link></li>
                  <li><Link to="#" className="hover:text-indigo-400 transition-colors">Success Stories</Link></li>
                  <li><Link to="#" className="hover:text-indigo-400 transition-colors">Partner Support</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
              <p>© 2024 HomeSolutions Inc. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};