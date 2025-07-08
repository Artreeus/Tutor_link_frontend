"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import { Booking } from "@/types/booking";
import { FaCalendarAlt, FaHistory } from "react-icons/fa";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://tutor-backend-delta.vercel.app/api/bookings"
        );
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load your bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "badge-success";
      case "completed":
        return "badge-info";
      case "cancelled":
        return "badge-error";
      default:
        return "badge-warning";
    }
  };

  const getSafeTutorName = (booking: Booking) => {
    if (booking.tutor && typeof booking.tutor === "object" && 'name' in booking.tutor) {
      return (booking.tutor as { name: string }).name;
    }
    return "Unknown Tutor";
  };

  const getSafeSubjectName = (booking: Booking) => {
    if (booking.subject && typeof booking.subject === "object" && 'name' in booking.subject) {
      return (booking.subject as { name: string }).name;
    }
    return "Unknown Subject";
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaCalendarAlt size={24} />
            </div>
            <div className="stat-title">Upcoming Sessions</div>
            <div className="stat-value">
              {bookings.filter((b) => b.status === "confirmed").length}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaHistory size={24} />
            </div>
            <div className="stat-title">Completed Sessions</div>
            <div className="stat-value">
              {bookings.filter((b) => b.status === "completed").length}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Your Bookings</h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Tutor</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{getSafeTutorName(booking)}</td>
                      <td>{getSafeSubjectName(booking)}</td>
                      <td>{formatDate(booking.date)}</td>
                      <td>
                        {booking.startTime} - {booking.endTime}
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusColor(booking.status)}`}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/dashboard/bookings/${booking._id}`}
                          className="btn btn-xs btn-primary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="mb-4">You don't have any bookings yet.</p>
              <Link href="/tutors" className="btn btn-primary">
                Find a Tutor
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;