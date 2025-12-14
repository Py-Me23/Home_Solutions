import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Clock,
  Shield,
  Star,
  CheckCircle,
  ArrowLeft,
  Share2,
  MapPin,
} from "lucide-react";
import { StarRating } from "../components/StarRating";
import { Provider } from "../types";
import { getProviderById } from "../services/providerService";

export const ProviderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"about" | "reviews" | "portfolio">(
    "about"
  );

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getProviderById(id)
      .then(setProvider)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-24 text-white">
        Loading provider details...
      </p>
    );
  if (error) return <p className="text-center mt-24 text-red-400">{error}</p>;
  if (!provider)
    return (
      <div className="min-h-screen flex items-center justify-center flex-col dark:bg-slate-950">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Provider not found
        </h2>
        <Link to="/search" className="text-indigo-600 mt-4 hover:underline">
          Back to Search
        </Link>
      </div>
    );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          to="/search"
          className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-indigo-700 dark:hover:text-indigo-400 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
        </Link>

        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 mb-8 animate-fade-in-up transition-colors">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative">
              <img
                src={provider.imageUrl}
                alt={provider.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-lg border-4 border-white dark:border-slate-800"
              />
              <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-md border border-slate-100 dark:border-slate-700">
                <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-serif mb-2">
                    {provider.businessName || provider.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-medium border border-indigo-100 dark:border-indigo-800">
                      {provider.category} Specialist
                    </span>
                    <span className="flex items-center text-slate-500 dark:text-slate-400">
                      <MapPin className="w-4 h-4 mr-1" /> {provider.location}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  {provider.isAvailable ? (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-1.5 rounded-full text-xs font-bold flex items-center shadow-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>{" "}
                      Available Now
                    </span>
                  ) : (
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700">
                      Currently Busy
                    </span>
                  )}
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-slate-900 dark:text-white mr-2">
                  {provider.rating}
                </span>
                <div className="flex items-center mb-1">
                  <StarRating rating={provider.rating} size={20} />
                </div>
                <span className="text-slate-500 dark:text-slate-400 ml-2 text-sm">
                  ({provider.reviewCount} reviews)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${provider.phone}`}
                  className="flex-1 sm:flex-none bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-indigo-900/30"
                >
                  <Phone className="w-5 h-5 mr-2" /> Book Now
                </a>
                <a
                  href={`https://wa.me/${provider.phone}`}
                  className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg hover:shadow-green-500/30"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden min-h-[500px] transition-colors">
              <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-2">
                {["About", "Portfolio", "Reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase() as any)}
                    className={`mr-8 py-5 text-sm font-bold tracking-wide uppercase transition-all border-b-2 ${
                      activeTab === tab.toLowerCase()
                        ? "text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400"
                        : "text-slate-400 border-transparent hover:text-slate-600 dark:hover:text-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {activeTab === "about" && (
                  <div className="animate-fade-in-up">
                    <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white font-serif">
                      About this Professional
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-lg font-light">
                      {provider.description}
                    </p>
                  </div>
                )}

                {activeTab === "portfolio" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up">
                    {provider.portfolioImages.length > 0 ? (
                      provider.portfolioImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="group overflow-hidden rounded-xl shadow-sm border border-slate-100 dark:border-slate-800"
                        >
                          <img
                            src={img}
                            alt="Portfolio"
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-10 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-400 italic">
                          No portfolio images uploaded yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-8 animate-fade-in-up">
                    {provider.reviews.length > 0 ? (
                      provider.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-slate-100 dark:border-slate-800 pb-8 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-slate-500 dark:text-slate-300 mr-3">
                                {review.userName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white">
                                  {review.userName}
                                </div>
                                <StarRating rating={review.rating} size={14} />
                              </div>
                            </div>
                            <span className="text-xs text-slate-400 font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed ml-14 bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-r-xl rounded-bl-xl">
                            {review.comment}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-slate-400">
                          No reviews yet. Be the first!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6 font-serif text-lg">
                Contact Details
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start text-slate-600 dark:text-slate-300">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg mr-4">
                    <Phone className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                      Phone
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {provider.phone}
                    </span>
                  </div>
                </li>
                <li className="flex items-start text-slate-600 dark:text-slate-300">
                  <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg mr-4">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">
                      Email
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {provider.email}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
