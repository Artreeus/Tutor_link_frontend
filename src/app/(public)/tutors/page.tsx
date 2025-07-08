"use client";

import { useState, useEffect } from "react";
import TutorCard from "@/components/tutors/TutorCard";
import TutorFilter from "@/components/tutors/TutorFilter";
import axios from "@/lib/axios";
import { User } from "@/types/user";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

export default function BrowseTutors() {
  const [tutors, setTutors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Tutors</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex w-full max-w-xl mx-auto">
          <input
            type="text"
            className="input input-bordered flex-grow"
            placeholder="Search tutors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary ml-2">
            <FaSearch />
          </button>
        </div>
      </form>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <TutorFilter onChange={handleFilterChange} />
        </aside>

        <main className="w-full md:w-3/4">
          {loading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : tutors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {tutors.map((tutor) => (
                <TutorCard key={tutor._id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg">No tutors found matching your criteria.</p>
              <button
                className="btn btn-primary mt-4"
                onClick={() => {
                  setFilters({
                    subject: "",
                    rating: "",
                    priceRange: "",
                  });
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
