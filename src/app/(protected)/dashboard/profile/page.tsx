"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaDollarSign,
  FaBook,
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

// Define the base schema first
const baseProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
});

// Define schema for students (same as base)
const studentProfileSchema = baseProfileSchema;

// Define schema for tutors
const tutorProfileSchema = baseProfileSchema.extend({
  hourlyRate: z.preprocess(
    // Convert string to number for validation
    (val) => (val === "" ? 0 : Number(val)),
    z.number().min(0, "Hourly rate cannot be negative")
  ),
});

// Create types from schemas
type StudentProfileFormData = z.infer<typeof studentProfileSchema>;
type TutorProfileFormData = z.infer<typeof tutorProfileSchema>;

// Define availability slot type
type AvailabilitySlot = {
  startTime: string;
  endTime: string;
};

// Define availability day type
type AvailabilityDay = {
  day: string;
  slots: AvailabilitySlot[];
};

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availability, setAvailability] = useState<AvailabilityDay[]>([]);

  const isTutor = user?.role === "tutor";

  // Define days of week for availability
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Use the appropriate schema based on user role
  const formSchema = isTutor ? tutorProfileSchema : studentProfileSchema;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      ...(isTutor && { hourlyRate: 0 }),
    },
  });

  useEffect(() => {
    if (user) {
      // Reset form with user data when it's available
      reset({
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        ...(isTutor && { hourlyRate: user.hourlyRate || 0 }),
      });

      if (isTutor && user.subjects) {
        setSelectedSubjects(Array.isArray(user.subjects) ? user.subjects : []);
      }

      if (isTutor && user.availability) {
        setAvailability(user.availability || []);
      }
    }

    // Fetch subjects if user is a tutor
    if (isTutor) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(
            "https://tutor-backend-delta.vercel.app/api/subjects"
          );
          setSubjects(response.data.data);
        } catch (error) {
          console.error("Error fetching subjects:", error);
          toast.error("Failed to load subjects");
        }
      };

      fetchSubjects();
    }
  }, [user, reset, isTutor]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    // Debug logging
    console.log("Current user object:", user);
    console.log("Is user defined?", !!user);
    console.log("User ID value:", user?._id);
    console.log("User ID type:", typeof user?._id);

    try {
      // Ensure we're using the correct user ID
      const userId = user?.id || user?._id;

      if (!userId) {
        toast.error("User ID is missing");
        console.error("User ID is missing. Full user object:", user);
        setIsSubmitting(false);
        return;
      }

      // Create the appropriate payload based on user role
      const profileData = {
        name: data.name,
        bio: data.bio || "",
        ...(isTutor && {
          hourlyRate: parseFloat(data.hourlyRate),
          subjects: selectedSubjects,
          availability: availability,
        }),
      };

      console.log("Sending profile update:", profileData);

      // Update user profile
      await axios.put(
        `https://tutor-backend-delta.vercel.app/api/users/${userId}`,
        profileData
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const addAvailabilityDay = (day: string) => {
    // Check if day already exists
    if (!availability.some((a) => a.day === day)) {
      setAvailability([
        ...availability,
        {
          day,
          slots: [{ startTime: "09:00", endTime: "17:00" }],
        },
      ]);
    } else {
      toast.error(`${day} is already added to your availability`);
    }
  };

  const removeAvailabilityDay = (dayIndex: number) => {
    setAvailability(availability.filter((_, index) => index !== dayIndex));
  };

  const addTimeSlot = (dayIndex: number) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots.push({
      startTime: "09:00",
      endTime: "17:00",
    });
    setAvailability(newAvailability);
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots = newAvailability[dayIndex].slots.filter(
      (_, index) => index !== slotIndex
    );
    setAvailability(newAvailability);
  };

  const updateTimeSlot = (
    dayIndex: number,
    slotIndex: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots[slotIndex][field] = value;
    setAvailability(newAvailability);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Profile</h1>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                    <FaUser className="mr-2 text-[#4f46e5]" /> Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none 
                      ${
                        errors.name
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30"
                      }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                    <FaEnvelope className="mr-2 text-[#4f46e5]" /> Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    disabled
                    {...register("email")}
                  />
                </div>
              </div>

              <div className="mb-4 mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Bio
                </label>
                <textarea
                  className={`w-full px-3 py-2 border rounded-lg h-24 focus:outline-none 
                    ${
                      errors.bio
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-gray-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30"
                    }`}
                  placeholder="Tell us about yourself..."
                  {...register("bio")}
                ></textarea>
                {errors.bio && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.bio.message as string}
                  </p>
                )}
              </div>

              {isTutor && (
                <>
                  <div className="border-t my-6 border-gray-300"></div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                      <FaDollarSign className="mr-2 text-[#4f46e5]" /> Hourly
                      Rate (USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none 
                        ${
                          errors.hourlyRate
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30"
                        }`}
                      {...register("hourlyRate")}
                    />
                    {errors.hourlyRate && (
                      <p className="text-red-500 text-xs italic mt-1">
                        {errors.hourlyRate.message as string}
                      </p>
                    )}
                  </div>

                  <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                      <FaBook className="mr-2 text-[#4f46e5]" /> Subjects You
                      Teach
                    </label>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {subjects.map((subject) => (
                          <label
                            key={subject._id}
                            className="flex items-center bg-white p-3 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              className="mr-2 text-[#4f46e5] focus:ring-[#4f46e5] rounded"
                              checked={selectedSubjects.includes(subject._id)}
                              onChange={() => handleSubjectChange(subject._id)}
                            />
                            <span className="text-gray-700">
                              {subject.name} ({subject.gradeLevel})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                      <FaCalendarAlt className="mr-2 text-[#4f46e5]" /> Your
                      Availability
                    </label>

                    <div className="bg-gray-100 p-4 rounded-lg">
                      {availability.length > 0 ? (
                        <div className="space-y-6">
                          {availability.map((day, dayIndex) => (
                            <div
                              key={dayIndex}
                              className="bg-white p-4 rounded-md shadow-sm"
                            >
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-800">
                                  {day.day}
                                </h3>
                                <button
                                  type="button"
                                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                                  onClick={() =>
                                    removeAvailabilityDay(dayIndex)
                                  }
                                >
                                  <FaTrash className="mr-1" /> Remove Day
                                </button>
                              </div>

                              {day.slots.map((slot, slotIndex) => (
                                <div
                                  key={slotIndex}
                                  className="flex flex-wrap items-center gap-4 mb-3 p-2 bg-gray-100 rounded"
                                >
                                  <div className="flex items-center">
                                    <FaClock className="mr-2 text-[#4f46e5]" />
                                    <input
                                      type="time"
                                      className="w-28 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                                      value={slot.startTime}
                                      onChange={(e) =>
                                        updateTimeSlot(
                                          dayIndex,
                                          slotIndex,
                                          "startTime",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>

                                  <span className="text-gray-500">to</span>

                                  <div className="flex items-center">
                                    <FaClock className="mr-2 text-[#4f46e5]" />
                                    <input
                                      type="time"
                                      className="w-28 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"
                                      value={slot.endTime}
                                      onChange={(e) =>
                                        updateTimeSlot(
                                          dayIndex,
                                          slotIndex,
                                          "endTime",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>

                                  <button
                                    type="button"
                                    className="btn btn-sm btn-circle bg-red-500 text-white hover:bg-red-600 ml-auto"
                                    onClick={() =>
                                      removeTimeSlot(dayIndex, slotIndex)
                                    }
                                    disabled={day.slots.length === 1}
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              ))}

                              <button
                                type="button"
                                className="btn btn-sm bg-[#FF6636] text-white hover:bg-[#FF6636]/90 mt-2"
                                onClick={() => addTimeSlot(dayIndex)}
                              >
                                <FaPlus className="mr-1" /> Add Time Slot
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-600">
                          <p className="mb-2">No availability set yet.</p>
                        </div>
                      )}

                      <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Add availability for a day:
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {daysOfWeek.map((day) => (
                            <button
                              key={day}
                              type="button"
                              className={`btn btn-sm ${
                                availability.some((a) => a.day === day)
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-[#4f46e5] text-white hover:bg-[#4f46e5]/90"
                              }`}
                              onClick={() => addAvailabilityDay(day)}
                              disabled={availability.some((a) => a.day === day)}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg text-white font-semibold 
                    bg-[#4f46e5] hover:bg-[#4f46e5]/90 
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
