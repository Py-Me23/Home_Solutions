import React, { useState, useEffect } from 'react';
import { MOCK_PROVIDERS } from '../constants';
import { 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Shield, 
  MapPin, 
  Star, 
  CreditCard, 
  DollarSign, 
  Navigation, 
  Play, 
  CheckCircle,
  StopCircle,
  Map
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  // Simulating logged-in user (John Smith, ID: 1)
  const [user] = useState(MOCK_PROVIDERS[0]);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'payments' | 'tracking'>('portfolio');
  
  // Portfolio State
  const [portfolio, setPortfolio] = useState<string[]>(user.portfolioImages);
  const [isDragging, setIsDragging] = useState(false);

  // Tracking State
  const [trackingStatus, setTrackingStatus] = useState<'idle' | 'en-route' | 'on-site'>('idle');
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Payment State
  const [paymentMethods] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'bank', name: 'Chase Checking', last4: '8890', isDefault: false }
  ]);

  // --- Portfolio Handlers ---
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPortfolio([imageUrl, ...portfolio]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setPortfolio([imageUrl, ...portfolio]);
    }
  };
    
  const removeImage = (index: number) => {
      const newPortfolio = [...portfolio];
      newPortfolio.splice(index, 1);
      setPortfolio(newPortfolio);
  };

  // --- Geolocation Handlers ---
  const startTracking = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setTrackingStatus('en-route');
    setLocationError(null);

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        setLocationError("Unable to retrieve location.");
        console.error(error);
      }
    );

    // In a real app, we would set up a watchPosition here
  };

  const updateStatus = (status: 'on-site' | 'idle') => {
    setTrackingStatus(status);
    if (status === 'idle') {
      setCurrentLocation(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">Provider Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your business, payments, and active jobs.</p>
          </div>
          <div className="hidden md:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              <span className="w-2 h-2 mr-1.5 bg-green-500 rounded-full"></span>
              Live & Visible
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar / Profile Summary */}
           <div className="w-full lg:w-1/3 space-y-6">
              <div className="glass-panel bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                 <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <img src={user.imageUrl} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-md" />
                      <div className="absolute bottom-0 right-0 bg-indigo-500 p-1.5 rounded-full text-white border-2 border-white dark:border-slate-900">
                        <Shield className="w-3 h-3" />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.businessName || user.name}</h2>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">{user.category} Specialist</p>
                    <div className="flex items-center justify-center space-x-1 text-slate-500 dark:text-slate-400 text-xs mb-6">
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                    
                    {/* Navigation Menu */}
                    <nav className="w-full space-y-2">
                      <button 
                        onClick={() => setActiveTab('portfolio')}
                        className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'portfolio' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        <ImageIcon className="w-5 h-5 mr-3" /> Portfolio
                      </button>
                      <button 
                        onClick={() => setActiveTab('payments')}
                        className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'payments' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        <CreditCard className="w-5 h-5 mr-3" /> Payments
                      </button>
                      <button 
                        onClick={() => setActiveTab('tracking')}
                        className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'tracking' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        <Navigation className="w-5 h-5 mr-3" /> Job Tracking
                      </button>
                    </nav>

                    <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6 mt-6">
                       <div>
                         <span className="block text-2xl font-bold text-slate-900 dark:text-white">{user.rating}</span>
                         <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center">
                           <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" /> Rating
                         </span>
                       </div>
                       <div>
                         <span className="block text-2xl font-bold text-slate-900 dark:text-white">{user.reviewCount}</span>
                         <span className="text-xs text-slate-500 dark:text-slate-400">Reviews</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Main Content */}
           <div className="w-full lg:w-2/3">
              <div className="glass-panel bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 h-full animate-fade-in-up">
                  
                  {/* --- PORTFOLIO TAB --- */}
                  {activeTab === 'portfolio' && (
                    <>
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                            <ImageIcon className="w-6 h-6 text-indigo-500" />
                            Portfolio Manager
                          </h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Upload photos of your recent work.</p>
                        </div>
                        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg">
                          {portfolio.length} Images
                        </span>
                      </div>

                      <div 
                        className={`relative border-2 border-dashed rounded-2xl p-8 mb-8 text-center transition-all duration-300 ${
                          isDragging 
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                            : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center pointer-events-none">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-full mb-4">
                            <Upload className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Click to upload or drag & drop</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                            SVG, PNG, JPG or GIF (max. 800x400px recommended)
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolio.map((img, index) => (
                          <div key={index} className="group relative aspect-square rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
                            <img 
                              src={img} 
                              alt={`Portfolio ${index + 1}`} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                              <button 
                                onClick={() => removeImage(index)}
                                className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-red-500/80 transition-all duration-300 transform scale-90 group-hover:scale-100 border border-white/20"
                                title="Remove Image"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* --- PAYMENTS TAB --- */}
                  {activeTab === 'payments' && (
                    <>
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                            <DollarSign className="w-6 h-6 text-green-500" />
                            Payment Methods
                          </h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage cards and bank accounts for payouts.</p>
                        </div>
                        <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
                          <Plus className="w-4 h-4 mr-2" /> Add Method
                        </button>
                      </div>

                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                            <div className="flex items-center">
                              <div className={`w-12 h-8 rounded flex items-center justify-center text-white font-bold text-xs mr-4 ${method.type === 'visa' ? 'bg-blue-600' : 'bg-slate-600'}`}>
                                {method.type === 'visa' ? 'VISA' : 'BANK'}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">
                                  {method.type === 'visa' ? `Visa ending in ${method.last4}` : `${method.name} (...${method.last4})`}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {method.type === 'visa' ? `Expires ${method.expiry}` : 'Verified Account'}
                                  {method.isDefault && <span className="ml-2 text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full text-[10px] uppercase">Default</span>}
                                </p>
                              </div>
                            </div>
                            <button className="text-slate-400 hover:text-red-500 transition-colors p-2">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                        <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Payout Schedule</h4>
                        <p className="text-sm text-indigo-700 dark:text-indigo-400">
                          Your earnings are automatically deposited to your default bank account every Wednesday.
                        </p>
                      </div>
                    </>
                  )}

                  {/* --- LIVE TRACKING TAB --- */}
                  {activeTab === 'tracking' && (
                    <>
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white flex items-center gap-2">
                            <Navigation className="w-6 h-6 text-blue-500" />
                            Worksite Tracking
                          </h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Share your live location with the client.</p>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center ${
                          trackingStatus === 'idle' ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400' :
                          trackingStatus === 'en-route' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 animate-pulse' :
                          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                             trackingStatus === 'idle' ? 'bg-slate-400' :
                             trackingStatus === 'en-route' ? 'bg-blue-500' :
                             'bg-green-500'
                          }`}></div>
                          {trackingStatus === 'idle' ? 'Not Active' : trackingStatus === 'en-route' ? 'En Route' : 'On Site'}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-wrap gap-4 mb-8">
                         {trackingStatus === 'idle' && (
                           <button 
                            onClick={startTracking}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all"
                           >
                             <Play className="w-5 h-5 mr-2" /> Start Trip
                           </button>
                         )}
                         
                         {trackingStatus === 'en-route' && (
                           <button 
                            onClick={() => updateStatus('on-site')}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-green-500/30 transition-all"
                           >
                             <MapPin className="w-5 h-5 mr-2" /> I've Arrived
                           </button>
                         )}
                         
                         {trackingStatus !== 'idle' && (
                           <button 
                            onClick={() => updateStatus('idle')}
                            className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-6 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                           >
                             <StopCircle className="w-5 h-5 mr-2" /> Stop Tracking
                           </button>
                         )}
                      </div>
                      
                      {locationError && (
                         <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                           {locationError}
                         </div>
                      )}

                      {/* Map Placeholder */}
                      <div className="w-full h-80 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-700">
                         {/* Mock Map Background */}
                         <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                         
                         <div className="absolute inset-0 flex items-center justify-center">
                            {trackingStatus !== 'idle' ? (
                               <div className="text-center animate-fade-in-up">
                                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-ping">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg text-white">
                                       <Navigation className="w-4 h-4 fill-current" />
                                    </div>
                                  </div>
                                  <p className="font-bold text-slate-800 dark:text-white">Broadcasting Location</p>
                                  {currentLocation && (
                                    <p className="text-xs text-slate-500 font-mono mt-2">
                                      {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                                    </p>
                                  )}
                               </div>
                            ) : (
                               <div className="text-center text-slate-400">
                                 <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                 <p className="font-medium">Map inactive. Start a trip to enable tracking.</p>
                               </div>
                            )}
                         </div>

                         {/* Overlay UI elements for "Map" feel */}
                         <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 p-2 rounded-lg shadow-sm">
                           <div className="w-6 h-6 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">+</div>
                           <div className="w-6 h-6 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold border-t border-slate-200 dark:border-slate-700">-</div>
                         </div>
                      </div>
                    </>
                  )}
                  
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}