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
          className="fixed z-50 transition-all duration-500 left-1/2 -translate-x-1/2 top-2 sm:top-4 w-[95%] max-w-7xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl rounded-2xl py-1.5 sm:py-2 px-4 sm:px-8"
        >
          <div className="flex items-center justify-between h-12">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl">
                <LogoIcon className="w-9 h-9" />
              </div>
              <span className="text-xl sm:text-2xl font-[900] tracking-tight text-slate-900 dark:text-white">
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
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={toggleTheme}
                className="transition-all duration-300 hover:scale-110 text-slate-600 dark:text-slate-400 hover:text-indigo-500"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 shadow-white" />}
              </button>

              <Link
                to="/register-provider"
                className="px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-[1.05] active:scale-[0.95] bg-slate-900 text-white dark:bg-indigo-600"
              >
                Join as Pro
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center md:hidden gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors text-slate-800 dark:text-white"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                className="p-2 rounded-full text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
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
        <>
          <div
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[90] md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-24 left-4 right-4 z-[100] md:hidden animate-fade-in-up">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 flex flex-col space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-slate-900 dark:text-white font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/search"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Find Services
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Login
                </Link>
                <div className="pt-4">
                  <Link
                    to="/register-provider"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-4 text-center bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
                  >
                    Join as Pro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
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