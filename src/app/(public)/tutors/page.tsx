"use client";

import { useState, useEffect } from "react";
import TutorCard from "@/components/tutors/TutorCard";
import TutorFilter from "@/components/tutors/TutorFilter";
import axios from "@/lib/axios";
import { User } from "@/types/user";
import toast from "react-hot-toast";
import { FaSearch, FaFilter, FaTimes, FaGraduationCap, FaStar } from "react-icons/fa";

export default function BrowseTutors() {
  const [tutors, setTutors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: "",
    rating: "",
    priceRange: "",
  });

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        // Build query params
        const params = new URLSearchParams();
        if (filters.subject) params.append("subject", filters.subject);
        if (filters.rating) params.append("rating", filters.rating);
        if (filters.priceRange) params.append("price", filters.priceRange);
        if (searchTerm) params.append("name", searchTerm);

        const response = await axios.get(
          `https://tutor-backend-delta.vercel.app/api/users/tutors?${params.toString()}`
        );
        setTutors(response.data.data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        toast.error("Failed to load tutors");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [filters, searchTerm]);

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The effect will run automatically when searchTerm changes
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearAllFilters = () => {
    setFilters({
      subject: "",
      rating: "",
      priceRange: "",
    });
    setSearchTerm("");
  };

  const hasActiveFilters = filters.subject || filters.rating || filters.priceRange || searchTerm;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <FaGraduationCap className="text-2xl" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Find Your Perfect Tutor
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover expert tutors who will help you achieve your learning goals. Browse through our curated selection of qualified educators.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-6 py-4 pl-14 pr-32 text-gray-900 bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-2xl focus:ring-4 focus:ring-blue-300/50 focus:outline-none text-lg placeholder-gray-500 transition-all duration-300"
                  placeholder="Search for tutors by name, subject, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                
                {/* Clear Search Button */}
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes />
                  </button>
                )}
                
                {/* Search Button */}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {loading ? "Loading..." : `${tutors.length} Tutors Available`}
              </h2>
              {hasActiveFilters && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <FaFilter className="mr-1" />
                  Filters Active
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm"
              >
                <FaFilter className="mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium text-red-700"
                >
                  <FaTimes className="mr-2" />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-full lg:w-80 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaFilter className="mr-2 text-blue-600" />
                Filter Results
              </h3>
              <TutorFilter onChange={handleFilterChange} />
            </div>
          </aside>

          {/* Tutors Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin animation-delay-150"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">Finding the best tutors for you...</p>
              </div>
            ) : tutors.length > 0 ? (
              <div className="space-y-6">
                {tutors.map((tutor, index) => (
                  <div
                    key={tutor._id}
                    className="transform hover:scale-[1.02] transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <TutorCard tutor={tutor} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                  <FaGraduationCap className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No tutors found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any tutors matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaTimes className="mr-2" />
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(true)}
                    className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaFilter className="mr-2" />
                    Modify Filters
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}