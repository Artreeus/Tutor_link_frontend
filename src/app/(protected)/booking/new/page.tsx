"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/axios";
import { User } from "@/types/user";
import { Subject } from "@/types/subject";
import toast from "react-hot-toast";

export default function NewBooking() {
  const router = useRouter();
  const [tutorId, setTutorId] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const [tutor, setTutor] = useState<User | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Client-side parsing of search params
    const params = new URLSearchParams(window.location.search);
    const id = params.get("tutor");
    setTutorId(id);
  }, []);

  useEffect(() => {
    // Redirect if not authenticated or not a student
    if (!isAuthenticated) {
      router.push("/login?redirect=/booking/new");
      return;
    }

    if (user?.role !== "student") {
      toast.error("Only students can create bookings");
      router.push("/dashboard");
      return;
    }

    // Fetch tutor data
    const fetchTutorData = async () => {
      if (!tutorId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch tutor details
        const tutorResponse = await axios.get(
          `https://tutor-backend-delta.vercel.app/api/users/${tutorId}`
        );
        setTutor(tutorResponse.data.data);

        // Fetch subjects
        if (
          tutorResponse.data.data.subjects &&
          tutorResponse.data.data.subjects.length > 0
        ) {
          const subjectsData = await Promise.all(
            tutorResponse.data.data.subjects.map((subjectId: string) =>
              axios.get(
                `https://tutor-backend-delta.vercel.app/api/subjects/${subjectId}`
              )
            )
          );
          const subjectsList = subjectsData.map((res: any) => res.data.data);
          setSubjects(subjectsList);

          // Set first subject as default
          if (subjectsList.length > 0) {
            setSelectedSubject(subjectsList[0]._id);
          }
        }
      } catch (error) {
        console.error("Error fetching tutor data:", error);
        toast.error("Failed to load tutor data");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [tutorId, isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tutor || !selectedSubject || !date || !startTime || !endTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(
        "https://tutor-backend-delta.vercel.app/api/bookings",
        {
          tutor: tutor._id,
          subject: selectedSubject,
          date,
          startTime,
          endTime,
          duration,
        }
      );

      toast.success("Booking created successfully!");
      router.push(`/booking/payment/${response.data.data._id}`);
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error(err.response?.data?.message || "Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Book a Session</h1>
        <div className="alert alert-error">
          <span>
            Tutor not found. Please select a tutor from the browse page.
          </span>
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={() => router.push("/tutors")}
        >
          Browse Tutors
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Book a Session with {tutor.name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Booking Details
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Subject
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    {subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name} ({subject.gradeLevel})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        // Calculate end time based on duration
                        if (e.target.value && duration) {
                          const [hours, minutes] = e.target.value
                            .split(":")
                            .map(Number);
                          const date = new Date();
                          date.setHours(hours, minutes);
                          date.setTime(
                            date.getTime() + duration * 60 * 60 * 1000
                          );
                          setEndTime(
                            `${String(date.getHours()).padStart(
                              2,
                              "0"
                            )}:${String(date.getMinutes()).padStart(2, "0")}`
                          );
                        }
                      }}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                      value={endTime}
                      onChange={(e) => {
                        setEndTime(e.target.value);
                        // Calculate duration
                        if (startTime && e.target.value) {
                          const [startHours, startMinutes] = startTime
                            .split(":")
                            .map(Number);
                          const [endHours, endMinutes] = e.target.value
                            .split(":")
                            .map(Number);

                          const startDate = new Date();
                          startDate.setHours(startHours, startMinutes, 0, 0);

                          const endDate = new Date();
                          endDate.setHours(endHours, endMinutes, 0, 0);

                          // Handle next day case
                          if (endDate < startDate) {
                            endDate.setDate(endDate.getDate() + 1);
                          }

                          const durationHours =
                            (endDate.getTime() - startDate.getTime()) /
                            (1000 * 60 * 60);
                          setDuration(parseFloat(durationHours.toFixed(1)));
                        }
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                    value={duration}
                    onChange={(e) => {
                      const newDuration = parseFloat(e.target.value);
                      setDuration(newDuration);

                      // Update end time based on new duration
                      if (startTime && newDuration) {
                        const [hours, minutes] = startTime
                          .split(":")
                          .map(Number);
                        const date = new Date();
                        date.setHours(hours, minutes);
                        date.setTime(
                          date.getTime() + newDuration * 60 * 60 * 1000
                        );
                        setEndTime(
                          `${String(date.getHours()).padStart(2, "0")}:${String(
                            date.getMinutes()
                          ).padStart(2, "0")}`
                        );
                      }
                    }}
                    step="0.5"
                    min="0.5"
                    max="8"
                    required
                  />
                  <label className="block text-xs text-gray-600 mt-1">
                    Minimum: 0.5 hours (30 minutes), Maximum: 8 hours
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`w-full py-3 rounded-lg text-white font-semibold 
                      bg-[#4f46e5] hover:bg-[#4f46e5]/90 
                      ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={submitting}
                  >
                    {submitting ? "Processing..." : "Continue to Payment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white shadow-xl rounded-xl sticky top-8">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Booking Summary
              </h2>

              <div className="py-4">
                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Tutor:</span>
                  <span className="font-bold">{tutor.name}</span>
                </div>

                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Subject:</span>
                  <span>
                    {subjects.find((s) => s._id === selectedSubject)?.name ||
                      "Not selected"}
                  </span>
                </div>

                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Date:</span>
                  <span>{date || "Not selected"}</span>
                </div>

                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Time:</span>
                  <span>
                    {startTime && endTime
                      ? `${startTime} - ${endTime}`
                      : "Not selected"}
                  </span>
                </div>

                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Duration:</span>
                  <span>
                    {duration} hour{duration !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="border-t my-4 border-gray-300"></div>

                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total:</span>
                  <span>
                    $
                    {tutor.hourlyRate
                      ? (tutor.hourlyRate * duration).toFixed(2)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}