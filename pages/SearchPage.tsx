import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  MapPin,
  Search as SearchIcon,
  Phone,
  Loader2,
  AlertCircle,
  Navigation,
  Filter,
} from "lucide-react";
import { getProviders } from "../services/providerService";
import { Provider, ServiceCategory } from "../types";
import { StarRating } from "../components/StarRating";
import { calculateDistance } from "../utils/geo";
import { CATEGORIES } from "../constants";

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory =
    (searchParams.get("category") as ServiceCategory) || "All";

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  // Providers from API
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Geolocation states
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "distance">("rating");

  // Fetch providers from API
  useEffect(() => {
    setLoading(true);
    getProviders()
      .then((data) => setProviders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Sync state with URL
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const handleNearMe = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setSortBy("distance");
        setIsLocating(false);
      },
      () => {
        setLocationError(
          "Unable to access your location. Please check permissions."
        );
        setIsLocating(false);
      }
    );
  };

  const filteredProviders = useMemo(() => {
    let filtered = providers.filter((provider) => {
      const matchesCategory =
        selectedCategory === "All" || provider.category === selectedCategory;
      const matchesSearch =
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.businessName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Add distance if user location is available
    const withDistance = filtered.map((provider) => {
      let distance;
      if (userLocation) {
        distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          provider.coordinates.lat,
          provider.coordinates.lng
        );
      }
      return { ...provider, distance };
    });

    // Sort
    return withDistance.sort((a, b) => {
      if (sortBy === "distance") return (a.distance || 0) - (b.distance || 0);
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [providers, selectedCategory, searchQuery, userLocation, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSearchParams({ category: cat });
  };

  if (loading)
    return (
      <p className="text-center mt-24 text-white flex justify-center items-center">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading providers...
      </p>
    );
  if (error) return <p className="text-center mt-24 text-red-400">{error}</p>;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 font-serif">
            Find Services
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Connect with the best professionals in your area.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="sticky top-20 z-30 mb-10 animate-fade-in-up delay-100">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center transition-colors">
            {/* Search Input */}
            <div className="flex-1 relative w-full">
              <SearchIcon className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or keyword..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-transparent focus:bg-white dark:focus:bg-slate-700 focus:border-indigo-500 rounded-xl focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 outline-none transition-all text-slate-800 dark:text-white placeholder-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Near Me */}
            <button
              onClick={handleNearMe}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all shadow-sm border ${
                sortBy === "distance"
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
              <span className="whitespace-nowrap text-sm">Near Me</span>
            </button>

            {/* Category Filter */}
            <div className="w-full md:w-auto flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar items-center border-l border-slate-200 dark:border-slate-700 pl-4">
              <span className="text-slate-400 mr-2 hidden md:block">
                <Filter className="w-4 h-4" />
              </span>
              <button
                onClick={() => handleCategoryChange("All")}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === "All"
                    ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-lg"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Location Error */}
          {locationError && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-center animate-fade-in-up">
              <AlertCircle className="w-4 h-4 mr-2" />
              {locationError}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm border overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={provider.imageUrl}
                    alt={provider.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-white shadow-sm uppercase tracking-wide">
                    {provider.category}
                  </div>
                  {!provider.isAvailable && (
                    <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        Currently Busy
                      </span>
                    </div>
                  )}
                  {userLocation && (
                    <div className="absolute bottom-4 left-4 text-white flex items-center text-xs font-medium px-2 py-1 rounded-lg bg-black/30">
                      <MapPin className="w-3 h-3 mr-1" /> {provider.location} •{" "}
                      {provider.distance?.toFixed(1)} km
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1 font-serif group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                      {provider.businessName || provider.name}
                    </h3>
                    <div className="flex items-center">
                      <StarRating
                        rating={provider.rating}
                        count={provider.reviewCount}
                      />
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-6 flex-1 leading-relaxed">
                    {provider.description}
                  </p>
                  <div className="pt-5 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <div>
                      <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider">
                        Rate
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-lg">
                        ${provider.hourlyRate}
                        <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                          /hr
                        </span>
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${provider.phone}`}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                      <Link
                        to={`/provider/${provider.id}`}
                        className="px-5 py-2.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors shadow-lg shadow-slate-900/20 dark:shadow-indigo-900/20"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
              <div className="bg-slate-100 dark:bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <SearchIcon className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-serif mb-2">
                No providers found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                We couldn't find any professionals matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
