import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, Clock, ArrowRight, Star } from 'lucide-react';
import { CATEGORIES, MOCK_PROVIDERS } from '../constants';
import { SmartSearch } from '../components/SmartSearch';
import { HeroCarousel } from '../components/HeroCarousel';
import { StarRating } from '../components/StarRating';
import { ServiceCategory } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleAISuggestion = (category: ServiceCategory) => {
    navigate(`/search?category=${category}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <HeroCarousel />
        
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/80 z-0"></div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
              Trusted Local Services
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight drop-shadow-lg leading-tight">
              Expert Care for <br/>
              <span className="italic font-serif text-indigo-300">Your Home.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              Connect with top-rated local professionals for plumbing, cleaning, electrical work, and more. 
              Quality service, guaranteed.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               {/* Search bar is the main action below */}
            </div>
          </div>

          <div className="animate-fade-in-up delay-100">
            <SmartSearch onCategorySelect={handleAISuggestion} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up delay-200">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why HomeSolutions?</h2>
            <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: MapPin, title: 'Local Experts', desc: 'Connect with skilled professionals in your immediate neighborhood for faster service.' },
              { icon: ShieldCheck, title: 'Verified Quality', desc: 'Every provider is vetted. Read authentic reviews from real neighbors before you book.' },
              { icon: Clock, title: 'Instant Booking', desc: 'Skip the wait. Contact pros directly via phone or WhatsApp to get your job done today.' }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Professionals Carousel */}
      <section className="py-24 bg-slate-900 dark:bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-indigo-500 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="mb-6 md:mb-0">
              <span className="text-indigo-400 font-bold tracking-wider text-xs uppercase mb-2 block">Excellence Guaranteed</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Top Rated Professionals</h2>
            </div>
            <Link to="/search" className="text-white border-b border-indigo-500 pb-1 hover:text-indigo-400 hover:border-indigo-400 transition-colors flex items-center text-sm font-medium">
              View all experts <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto pb-12 gap-6 snap-x snap-mandatory no-scrollbar -mx-6 px-6">
            {MOCK_PROVIDERS.filter(p => p.rating >= 4.7).map((provider) => (
              <Link to={`/provider/${provider.id}`} key={provider.id} className="group min-w-[300px] md:min-w-[340px] bg-slate-800 dark:bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0 snap-center hover:shadow-2xl hover:shadow-indigo-900/20 transition-all duration-300 transform hover:-translate-y-2 border border-slate-700/50">
                 <div className="h-56 relative overflow-hidden">
                   <img src={provider.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={provider.name} />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                   <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-2 py-1 bg-indigo-600 rounded text-[10px] font-bold tracking-wider uppercase mb-1 shadow-sm">
                        {provider.category}
                      </span>
                      <h3 className="font-bold text-lg text-white font-serif">{provider.businessName || provider.name}</h3>
                   </div>
                   <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" /> {provider.rating}
                   </div>
                 </div>
                 <div className="p-6">
                   <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">{provider.description}</p>
                   <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                     <span className="text-sm font-medium text-slate-300">Starts at <span className="text-white font-bold text-lg">${provider.hourlyRate}</span>/hr</span>
                     <span className="text-indigo-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                       View Profile <ArrowRight className="w-3 h-3 ml-1" />
                     </span>
                   </div>
                 </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Browse by Category</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Find the right professional for every corner of your home.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <Link 
                key={cat} 
                to={`/search?category=${cat}`}
                className="group bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full mb-6 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:scale-110 transition-all duration-300 flex items-center justify-center text-3xl shadow-inner dark:shadow-none">
                   {/* Simplified icon logic */}
                   {cat === 'Plumbing' && '🚿'}
                   {cat === 'Electrical' && '⚡'}
                   {cat === 'Cleaning' && '✨'}
                   {cat === 'Painting' && '🎨'}
                   {cat === 'Carpentry' && '🪚'}
                   {cat === 'Gardening' && '🌿'}
                   {cat === 'Moving' && '📦'}
                   {cat === 'Decorating' && '🖼️'}
                   {cat === 'Other' && '🔧'}
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-lg group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors font-serif">{cat}</span>
                <span className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">Browse Pros</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action for Providers */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-700">
           <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-10 mix-blend-overlay" alt="Background" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-slate-900 rounded-3xl p-12 md:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between border border-slate-800">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-serif">Grow your business <br/><span className="text-indigo-400">with HomeSolutions</span></h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Join our exclusive network of trusted professionals. Get higher visibility, better clients, and tools to manage your reputation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register-provider" 
                  className="bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-400 transition-all shadow-lg hover:shadow-indigo-500/30 text-center"
                >
                  Join as a Professional
                </Link>
              </div>
            </div>
            <div className="md:w-5/12">
               <div className="relative">
                 <div className="absolute -inset-4 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
                 <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-indigo-400">
                         <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" alt="Pro" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">Mike Anderson</p>
                        <p className="text-indigo-300 text-sm">Master Electrician</p>
                      </div>
                    </div>
                    <p className="italic text-slate-300 text-lg font-light leading-relaxed">"This platform transformed my small business. The clients are serious, and the reviews system helps me stand out."</p>
                    <div className="mt-4 flex text-yellow-400">★★★★★</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};