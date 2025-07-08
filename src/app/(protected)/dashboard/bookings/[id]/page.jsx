"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/axios";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import toast from "react-hot-toast";



export default function BookingDetail({ params}) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/dashboard/bookings/" + id);
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `https://tutor-backend-delta.vercel.app/api/bookings/${id}`
        );
        setBooking(response.data.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
        toast.error("Failed to load booking information");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, isAuthenticated, router]);

  const handleCancelBooking = async () => {
    if (!booking) return;

    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await axios.put(
        `https://tutor-backend-delta.vercel.app/api/bookings/${booking._id}`,
        {
          status: "cancelled",
        }
      );

      toast.success("Booking cancelled successfully");
      // Update booking status in the UI
      setBooking({
        ...booking,
        status: "cancelled",
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    }
  };

  const handleCompleteBooking = async () => {
    if (!booking) return;

    try {
      await axios.put(
        `https://tutor-backend-delta.vercel.app/api/bookings/${booking._id}`,
        {
          status: "completed",
        }
      );

      toast.success("Booking marked as completed");
      // Update booking status in the UI
      setBooking({
        ...booking,
        status: "completed",
      });
    } catch (error) {
      console.error("Error completing booking:", error);
      toast.error("Failed to mark booking as completed");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Booking Not Found</h1>
        <p>The booking you're looking for doesn't exist or has been removed.</p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => router.push("/dashboard/bookings")}
        >
          Go to Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Booking Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-2xl">
                  {typeof booking.subject === "object" && booking.subject
                    ? booking.subject.name
                    : "Tutoring Session"}
                </h2>
                <span className={`badge ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary" />
                  <div>
                    <p className="text-sm opacity-70">Date</p>
                    <p>{formatDate(booking.date)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaClock className="mr-2 text-primary" />
                  <div>
                    <p className="text-sm opacity-70">Time</p>
                    <p>
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaUser className="mr-2 text-primary" />
                  <div>
                    <p className="text-sm opacity-70">
                      {user?.role === "student" ? "Tutor" : "Student"}
                    </p>
                    <p>
                      {user?.role === "student"
                        ? typeof booking.tutor === "object" && booking.tutor
                          ? booking.tutor.name
                          : "Loading..."
                        : typeof booking.student === "object" && booking.student
                        ? booking.student.name
                        : "Loading..."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaDollarSign className="mr-2 text-primary" />
                  <div>
                    <p className="text-sm opacity-70">Payment Status</p>
                    <p className="capitalize">{booking.paymentStatus}</p>
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div className="mt-4">
                  <h3 className="font-bold mb-2">Notes</h3>
                  <p>{booking.notes}</p>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                {user?.role === "student" && booking.status === "confirmed" && (
                  <button
                    className="btn btn-error"
                    onClick={handleCancelBooking}
                  >
                    Cancel Booking
                  </button>
                )}

                {user?.role === "tutor" && booking.status === "confirmed" && (
                  <button
                    className="btn btn-success"
                    onClick={handleCompleteBooking}
                  >
                    Mark as Completed
                  </button>
                )}

                {user?.role === "student" &&
                  booking.status === "completed" &&
                  booking.paymentStatus === "paid" && (
                    <Link
                      href={`/dashboard/reviews/new?booking=${booking._id}`}
                      className="btn btn-primary"
                    >
                      Leave a Review
                    </Link>
                  )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card bg-base-100 shadow-xl sticky top-8">
            <div className="card-body">
              <h3 className="font-bold text-lg mb-4">Summary</h3>

              <div className="flex justify-between mb-2">
                <span>Duration:</span>
                <span>
                  {booking.duration} hour{booking.duration !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Rate:</span>
                <span>
                  $
                  {typeof booking.tutor === "object" &&
                  booking.tutor &&
                  booking.tutor.hourlyRate
                    ? booking.tutor.hourlyRate.toFixed(2)
                    : "N/A"}
                  /hr
                </span>
              </div>

              <div className="divider my-2"></div>

              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${booking.price.toFixed(2)}</span>
              </div>

              {user?.role === "student" &&
                booking.status === "pending" &&
                booking.paymentStatus === "pending" && (
                  <Link
                    href={`/booking/payment/${booking._id}`}
                    className="btn btn-primary w-full mt-4"
                  >
                    Pay Now
                  </Link>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
