"use client";

import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
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

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex items-center">
          <FaFilter className="mr-2" /> Filter Tutors
        </h2>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Subject</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedSubject}
            onChange={handleSubjectChange}
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name} ({subject.gradeLevel})
              </option>
            ))}
          </select>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Minimum Rating</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedRating}
            onChange={handleRatingChange}
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Price Range</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={priceRange}
            onChange={handlePriceChange}
          >
            <option value="">Any Price</option>
            <option value="0-25">$0 - $25</option>
            <option value="25-50">$25 - $50</option>
            <option value="50-75">$50 - $75</option>
            <option value="75-100">$75 - $100</option>
            <option value="100-">$100+</option>
          </select>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-outline btn-block" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorFilter;
