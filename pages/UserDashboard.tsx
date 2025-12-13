import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Heart, 
  Clock, 
  Settings, 
  LogOut, 
  MapPin, 
  Star, 
  Phone, 
  Search,
  User,
  Bell
} from 'lucide-react';
import { MOCK_PROVIDERS } from '../constants';
import { StarRating } from '../components/StarRating';

export const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'history' | 'settings'>('overview');
  
  // Mock data for the dashboard
  const favoriteProviders = MOCK_PROVIDERS.slice(0, 2);
  const recentHistory = MOCK_PROVIDERS.slice(2, 5);

  const renderSidebarItem = (id: typeof activeTab, Icon: React.ElementType, label: string) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
        activeTab === id 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Welcome Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
              Welcome back, <span className="text-indigo-600 dark:text-indigo-400">Alex</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage your home services and connect with professionals.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/search" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center">
              <Search className="w-4 h-4 mr-2" /> Find New Pro
            </Link>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 animate-fade-in-up delay-100">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 sticky top-28">
              <div className="space-y-1">
                {renderSidebarItem('overview', LayoutDashboard, 'Overview')}
                {renderSidebarItem('favorites', Heart, 'Favorites')}
                {renderSidebarItem('history', Clock, 'History')}
                {renderSidebarItem('settings', Settings, 'Settings')}
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <Link to="/login" className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 font-medium">
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 animate-fade-in-up delay-200">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Saved</span>
                    </div>
                    <div className="text-3xl font-bold mb-1">{favoriteProviders.length}</div>
                    <div className="text-indigo-100 text-sm">Professional providers</div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                        <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">2</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">Active inquiries</div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                        <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Reviews</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">12</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">Contributions made</div>
                  </div>
                </div>

                {/* Recent Activity / Recommendations */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Quick Access Favorites</h2>
                    <button onClick={() => setActiveTab('favorites')} className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">View All</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteProviders.map(provider => (
                      <div key={provider.id} className="flex items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors group cursor-pointer">
                        <img src={provider.imageUrl} alt={provider.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="ml-4 flex-1">
                          <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{provider.businessName || provider.name}</h3>
                          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            <span>{provider.rating}</span>
                            <span className="mx-2">•</span>
                            <span>{provider.category}</span>
                          </div>
                        </div>
                        <Link to={`/provider/${provider.id}`} className="p-2 bg-white dark:bg-slate-700 rounded-full text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm">
                          <Phone className="w-4 h-4" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8">
                <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-6">Saved Professionals</h2>
                <div className="space-y-4">
                  {favoriteProviders.length > 0 ? favoriteProviders.map(provider => (
                    <div key={provider.id} className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow bg-slate-50/50 dark:bg-slate-800/30">
                      <img src={provider.imageUrl} alt={provider.name} className="w-full md:w-32 h-32 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 block">{provider.category}</span>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{provider.businessName || provider.name}</h3>
                            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-4">
                              <MapPin className="w-4 h-4 mr-1" /> {provider.location}
                            </div>
                          </div>
                          <div className="flex items-center bg-white dark:bg-slate-700 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-600">
                             <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                             <span className="font-bold text-slate-900 dark:text-white">{provider.rating}</span>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4">{provider.description}</p>
                        <div className="flex gap-3">
                          <Link to={`/provider/${provider.id}`} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                            View Profile
                          </Link>
                          <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No favorites yet.</p>
                      <Link to="/search" className="text-indigo-600 font-medium hover:underline mt-2 inline-block">Browse Services</Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8">
                <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-6">Contact History</h2>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
                  <div className="space-y-8">
                    {recentHistory.map((provider, index) => (
                      <div key={provider.id} className="relative pl-10">
                        <div className="absolute left-0 top-1.5 w-8 h-8 bg-white dark:bg-slate-900 border-2 border-indigo-500 rounded-full flex items-center justify-center z-10">
                           <Phone className="w-3 h-3 text-indigo-500" />
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="font-bold text-slate-900 dark:text-white">{provider.businessName || provider.name}</h4>
                             <span className="text-xs text-slate-400 font-medium">2 days ago</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            Inquired about {provider.category.toLowerCase()} services via phone.
                          </p>
                          <Link to={`/provider/${provider.id}`} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline uppercase tracking-wide">
                            Book Again
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
               <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8">
                 <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-6">Account Settings</h2>
                 
                 <div className="space-y-6 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                      <input type="text" defaultValue="Alex Johnson" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                      <input type="email" defaultValue="alex.j@example.com" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                      <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Notifications</h3>
                      <div className="space-y-3">
                         <label className="flex items-center">
                           <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                           <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Email alerts for new messages</span>
                         </label>
                         <label className="flex items-center">
                           <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                           <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">SMS notifications for bookings</span>
                         </label>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md">
                        Save Changes
                      </button>
                    </div>
                 </div>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};