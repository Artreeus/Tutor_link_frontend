"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import { Booking } from "@/types/booking";
import { FaCalendarAlt, FaStar, FaDollarSign } from "react-icons/fa";
import toast from "react-hot-toast";

const TutorDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    pendingBookings: 0,
    completedBookings: 0,
    totalEarnings: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get(
          "https://tutor-backend-delta.vercel.app/api/bookings"
        );
        setBookings(bookingsResponse.data.data);

        // Calculate stats
        const pending = bookingsResponse.data.data.filter(
          (b: Booking) => b.status === "pending"
        ).length;
        const completed = bookingsResponse.data.data.filter(
          (b: Booking) => b.status === "completed"
        ).length;

        // Get user profile to get rating and earnings
        const profileResponse = await axios.get(
          "https://tutor-backend-delta.vercel.app/api/auth/me"
        );
        const profile = profileResponse.data.data;

        setStats({
          pendingBookings: pending,
          completedBookings: completed,
          totalEarnings: profile.totalEarnings || 0,
          averageRating: profile.averageRating || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load your dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleBookingAction = async (
    bookingId: string,
    action: "confirm" | "cancel"
  ) => {
    try {
      await axios.put(
        `https://tutor-backend-delta.vercel.app/api/bookings/${bookingId}`,
        {
          status: action === "confirm" ? "confirmed" : "cancelled",
        }
      );

      // Update booking status in the UI
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: action === "confirm" ? "confirmed" : "cancelled",
              }
            : booking
        )
      );

      toast.success(
        `Booking ${
          action === "confirm" ? "confirmed" : "cancelled"
        } successfully`
      );
    } catch (error) {
      console.error(`Error ${action}ing booking:`, error);
      toast.error(`Failed to ${action} booking`);
    }
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-warning">
              <FaCalendarAlt size={24} />
            </div>
            <div className="stat-title">Pending Requests</div>
            <div className="stat-value">{stats.pendingBookings}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-success">
              <FaCalendarAlt size={24} />
            </div>
            <div className="stat-title">Completed Sessions</div>
            <div className="stat-value">{stats.completedBookings}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaStar size={24} />
            </div>
            <div className="stat-title">Rating</div>
            <div className="stat-value">{stats.averageRating.toFixed(1)}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaDollarSign size={24} />
            </div>
            <div className="stat-title">Total Earnings</div>
            <div className="stat-value">${stats.totalEarnings.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Recent Booking Requests</h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Student</th>
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
                      <td>
                        {typeof booking.student === "object" && booking.student
                          ? booking.student.name
                          : "Loading..."}
                      </td>
                      <td>
                        {typeof booking.subject === "object" && booking.subject
                          ? booking.subject.name
                          : "Loading..."}
                      </td>
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
                        {booking.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              className="btn btn-xs btn-success"
                              onClick={() =>
                                handleBookingAction(booking._id, "confirm")
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-xs btn-error"
                              onClick={() =>
                                handleBookingAction(booking._id, "cancel")
                              }
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <Link
                            href={`/dashboard/bookings/${booking._id}`}
                            className="btn btn-xs btn-primary"
                          >
                            View
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p>You don't have any bookings yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
