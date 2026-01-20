import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ShieldCheck,
  Clock,
  ArrowRight,
  Star,
  Users,
  Zap,
  Award,
  Sparkles,
  TrendingUp,
  Gem,
} from "lucide-react";
import { CATEGORIES } from "../constants";
import { getProviders } from "../services/providerService";
import { Provider, ServiceCategory } from "../types";
import { SmartSearch } from "../components/SmartSearch";
import { HeroCarousel } from "../components/HeroCarousel";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAISuggestion = (category: ServiceCategory) => {
    navigate(`/search?category=${category}`);
  };

  useEffect(() => {
    getProviders()
      .then(setProviders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const topProviders = providers.filter((p) => p.rating >= 4.7).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] animate-pulse-slow delay-700"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-24 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 auto-rows-[minmax(120px,auto)] gap-4 md:gap-6">

          {/* Box 1: Hero Carousel (Main Visual) */}
          <div className="md:col-span-6 lg:col-span-8 lg:row-span-4 rounded-[2.5rem] overflow-hidden relative group shadow-2xl shadow-indigo-500/10 border border-white/10 glass animate-fade-in-up">
            <HeroCarousel />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <Gem className="w-3 h-3 mr-2 text-indigo-400" /> Premium Standards
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-4">
                REDEFINING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">HOME CARE.</span>
              </h1>
              <p className="text-slate-200 text-sm md:text-base max-w-lg font-medium opacity-80 backdrop-blur-sm">
                Next-generation service matching with agentic AI precision. Your home, managed by experts.
              </p>
            </div>
          </div>

          {/* Box 2: Brand Tagline / Info */}
          <div className="md:col-span-3 lg:col-span-4 lg:row-span-2 rounded-[2.5rem] glass p-8 flex flex-col justify-between border border-white/10 hover:border-indigo-500/30 transition-all duration-500 group animate-fade-in-up delay-75">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Est. 2026</span>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight mb-2">Agentic Reliability</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                We've vetted over <span className="text-indigo-500 font-bold">12,000+</span> professionals to ensure your peace of mind.
              </p>
            </div>
          </div>

          {/* Box 3: Quick CTA / Social Proof */}
          <div className="md:col-span-3 lg:col-span-4 lg:row-span-2 rounded-[2.5rem] bg-indigo-600 dark:bg-indigo-600 p-8 flex flex-col justify-between text-white shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all duration-500 animate-fade-in-up delay-150">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-500 flex items-center justify-center text-[10px] font-bold">
                +4k
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight mb-1">Joined the Wave</h2>
              <p className="text-indigo-100 text-xs font-medium opacity-80 mb-4 text-balance">
                Real people, real results. Thousands trust HomeSolutions every single day.
              </p>
              <Link to="/search" className="inline-flex items-center text-xs font-black uppercase tracking-widest group">
                Find your pro <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Box 4: Smart Search (The Focal Point) */}
          <div className="md:col-span-6 lg:col-span-12 py-8 md:py-16 animate-fade-in-up delay-200">
            <SmartSearch onCategorySelect={handleAISuggestion} />
          </div>

          {/* Section Heading: Categories */}
          <div className="md:col-span-6 lg:col-span-12 mt-12 mb-8">
            <div className="flex items-center space-x-6">
              <h2 className="text-5xl md:text-6xl font-[900] italic tracking-tight uppercase text-slate-900 dark:text-white leading-[0.8]">
                CORE DOMAINS
              </h2>
              <div className="h-[1px] flex-1 bg-indigo-500/30"></div>
            </div>
          </div>

          {/* Box 5-10: Quick Category Access (Mini Bento) */}
          {CATEGORIES.filter(c => c !== ServiceCategory.MOVING).slice(0, 6).map((cat, idx) => {
            const catImages: Record<string, string> = {
              "Plumbing": "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=600&auto=format&fit=crop",
              "Electrical": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
              "Cleaning": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
              "Painting": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
              "Carpentry": "https://images.unsplash.com/photo-1611244419377-b0a760c19719?q=80&w=600&auto=format&fit=crop",
              "Gardening": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=600&auto=format&fit=crop",
              "Decorating": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop"
            };

            const displayImg = catImages[cat] || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop";

            // Swap labels only as requested
            const displayCat = cat === "Painting" ? "Carpentry" : cat === "Carpentry" ? "Painting" : cat;
            const linkCat = cat === "Painting" ? ServiceCategory.CARPENTRY : cat === "Carpentry" ? ServiceCategory.PAINTING : cat as ServiceCategory;

            return (
              <button
                key={cat}
                onClick={() => handleAISuggestion(linkCat)}
                className="md:col-span-3 lg:col-span-4 lg:row-span-2 rounded-[2rem] glass overflow-hidden hover:bg-white dark:hover:bg-indigo-900/10 border border-white/10 hover:border-indigo-500/30 transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${idx * 50 + 300}ms` }}
              >
                <div className="flex flex-col h-full text-left">
                  <div className="h-32 w-full overflow-hidden relative bg-slate-200 dark:bg-slate-900">
                    <img
                      src={displayImg}
                      alt={displayCat}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-[900] tracking-tight text-slate-900 dark:text-white mb-1 uppercase italic leading-none">{displayCat}</h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">Open Core</p>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Section Heading: Pros */}
          <div className="md:col-span-6 lg:col-span-12 mt-12 mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-600">
                Top Performers
              </h2>
              <Link to="/search" className="hidden md:flex items-center text-xs font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-colors">
                View Repository <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Box 11: Featured Pros Grid */}
          <div className="md:col-span-6 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-500">
            {topProviders.map((provider) => (
              <Link
                key={provider.id}
                to={`/provider/${provider.id}`}
                className="group rounded-[2rem] glass overflow-hidden border border-white/10 hover:border-indigo-500/30 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={provider.imageUrl}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={provider.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-black text-white flex items-center shadow-2xl">
                    <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" /> {provider.rating}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 block">
                    {provider.category}
                  </span>
                  <h3 className="text-xl font-black tracking-tight mb-2 truncate">
                    {provider.businessName || provider.name}
                  </h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      From <span className="text-slate-900 dark:text-white text-lg">${provider.hourlyRate}</span>/hr
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Box 12: Why Us Vertical Bento */}
          <div className="md:col-span-6 lg:col-span-6 lg:row-span-3 rounded-[2.5rem] glass p-10 border border-white/10 relative overflow-hidden group animate-fade-in-up">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-4xl font-black tracking-tighter mb-6 leading-[0.9]">AGENTIC <br />VERIFICATION</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
                  Our proprietary algorithm scans credentials, reviews, and historical data to ensure every pro meets the gold standard.
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: "Identity & License Validation" },
                    { icon: Clock, text: "Guaranteed Response Times" },
                    { icon: Award, text: "Elite Quality Insurance" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                      <item.icon className="w-5 h-5 text-indigo-500" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 flex items-center space-x-4">
                <div className="px-6 py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all cursor-pointer">
                  Learn about Safety
                </div>
              </div>
            </div>
            <div className="absolute top-10 right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          </div>

          {/* Box 13: Local Map Snippet (Visual Placeholder) */}
          <div className="md:col-span-6 lg:col-span-6 lg:row-span-3 rounded-[2.5rem] glass overflow-hidden border border-white/10 relative group animate-fade-in-up">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.4] opacity-60 group-hover:scale-110 transition-all duration-[2s]"
              alt="Local Map"
            />
            <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
                <MapPin className="w-12 h-12 text-indigo-400 relative z-10" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl font-black text-white tracking-tight mb-2">Hyper-Local Context</h3>
              <p className="text-slate-300 text-xs font-medium opacity-80 mb-6">Pros in your immediate zip code, ready to deploy in under 60 minutes.</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">42 Active Pros Nearby</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

