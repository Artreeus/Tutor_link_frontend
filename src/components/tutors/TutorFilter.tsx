"use client";

import { useState, useEffect } from "react";
import { FaFilter, FaStar, FaDollarSign, FaBook, FaTimes, FaChevronDown, FaGraduationCap } from "react-icons/fa";
import axios from "@/lib/axios";
import { Subject } from "@/types/subject";
import toast from "react-hot-toast";

interface TutorFilterProps {
  onChange: (filters: any) => void;
}

const TutorFilter = ({ onChange }: TutorFilterProps) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "https://tutor-backend-delta.vercel.app/api/subjects"
        );
        setSubjects(response.data.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast.error("Failed to load subjects");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSubject(value);
    onChange({ subject: value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedRating(value);
    onChange({ rating: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPriceRange(value);
    onChange({ priceRange: value });
  };

  const clearFilters = () => {
    setSelectedSubject("");
    setSelectedRating("");
    setPriceRange("");
    onChange({ subject: "", rating: "", priceRange: "" });
  };

  const ratingOptions = [
    { value: "", label: "Any Rating" },
    { value: "4", label: "4+ Stars" },
    { value: "4.5", label: "4.5+ Stars" },
    { value: "5", label: "5 Stars" }
  ];

  const priceOptions = [
    { value: "", label: "Any Price" },
    { value: "0-25", label: "$0 - $25" },
    { value: "25-50", label: "$25 - $50" },
    { value: "50-75", label: "$50 - $75" },
    { value: "75-100", label: "$75 - $100" },
    { value: "100-", label: "$100+" }
  ];

  const hasActiveFilters = selectedSubject || selectedRating || priceRange;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h2 className="text-xl font-bold flex items-center">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
            <FaFilter className="text-sm" />
          </div>
          Filter Tutors
        </h2>
        {hasActiveFilters && (
          <p className="text-blue-100 text-sm mt-2">
            {[selectedSubject, selectedRating, priceRange].filter(Boolean).length} filter(s) active
          </p>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Subject Filter */}
        <div className="space-y-3">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <FaBook className="mr-2 text-blue-600" />
            Subject
          </label>
          <div className="relative">
            <select
              className="w-full p-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white appearance-none cursor-pointer hover:border-gray-300"
              value={selectedSubject}
              onChange={handleSubjectChange}
              disabled={loading}
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} ({subject.gradeLevel})
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {loading && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
              Loading subjects...
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <FaStar className="mr-2 text-yellow-500" />
            Minimum Rating
          </label>
          <div className="relative">
            <select
              className="w-full p-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white appearance-none cursor-pointer hover:border-gray-300"
              value={selectedRating}
              onChange={handleRatingChange}
            >
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {selectedRating && (
            <div className="flex items-center text-sm text-gray-600 bg-yellow-50 px-3 py-2 rounded-lg">
              <FaStar className="text-yellow-500 mr-1" />
              Showing tutors with {selectedRating}+ star ratings
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="space-y-3">
          <label className="flex items-center text-sm font-semibold text-gray-700">
            <FaDollarSign className="mr-2 text-green-600" />
            Price Range
          </label>
          <div className="relative">
            <select
              className="w-full p-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white appearance-none cursor-pointer hover:border-gray-300"
              value={priceRange}
              onChange={handlePriceChange}
            >
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          {priceRange && (
            <div className="flex items-center text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
              <FaDollarSign className="text-green-600 mr-1" />
              Price range: {priceOptions.find(opt => opt.value === priceRange)?.label}
            </div>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Active Filters:</h3>
            <div className="space-y-2">
              {selectedSubject && (
                <div className="flex items-center text-sm text-blue-700">
                  <FaBook className="mr-2" />
                  Subject: {subjects.find(s => s._id === selectedSubject)?.name || 'Selected'}
                </div>
              )}
              {selectedRating && (
                <div className="flex items-center text-sm text-blue-700">
                  <FaStar className="mr-2" />
                  Rating: {ratingOptions.find(opt => opt.value === selectedRating)?.label}
                </div>
              )}
              {priceRange && (
                <div className="flex items-center text-sm text-blue-700">
                  <FaDollarSign className="mr-2" />
                  Price: {priceOptions.find(opt => opt.value === priceRange)?.label}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
            hasActiveFilters
              ? 'bg-red-50 text-red-700 border-2 border-red-200 hover:bg-red-100 hover:border-red-300'
              : 'bg-gray-50 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
          }`}
        >
          <FaTimes className="mr-2" />
          Clear All Filters
        </button>

        {/* Quick Filter Options */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <FaGraduationCap className="mr-2 text-purple-600" />
            Quick Filters
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => {
                setSelectedRating("4.5");
                onChange({ rating: "4.5" });
              }}
              className="p-2 text-sm bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 border border-yellow-200 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              <FaStar className="mr-1 text-yellow-500" />
              Top Rated (4.5+)
            </button>
            <button
              onClick={() => {
                setPriceRange("0-25");
                onChange({ priceRange: "0-25" });
              }}
              className="p-2 text-sm bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              <FaDollarSign className="mr-1 text-green-500" />
              Budget Friendly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorFilter;