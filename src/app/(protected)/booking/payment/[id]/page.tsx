'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from '@/lib/axios';
import { Booking } from '@/types/booking';
import { FaCheckCircle, FaCreditCard } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function BookingPayment({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated or not a student
    if (!isAuthenticated) {
      router.push('/login?redirect=/booking/payment/' + params.id);
      return;
    }
    
    if (user?.role !== 'student') {
      toast.error('Only students can make payments');
      router.push('/dashboard');
      return;
    }
    
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/${params.id}`);
        setBooking(response.data.data);
        
        // Check if booking is already paid
        if (response.data.data.paymentStatus === 'paid') {
          setPaymentSuccess(true);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
        toast.error('Failed to load booking information');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [params.id, isAuthenticated, user, router]);

  const handlePayment = async () => {
    if (!booking) return;
    
    setProcessingPayment(true);
    
    try {
      // Create payment intent
      const createPaymentResponse = await axios.post(`http://localhost:5000/api/bookings/${booking._id}/payment`);
      
      // In a real application, you would use Stripe or another payment processor here
      // For this demo, we'll simulate a successful payment after a delay
      setTimeout(async () => {
        try {
          // Confirm payment
          await axios.put(`http://localhost:5000/api/bookings/${booking._id}/confirm-payment`);
          
          setPaymentSuccess(true);
          toast.success('Payment successful!');
        } catch (error) {
          console.error('Error confirming payment:', error);
          toast.error('Payment processing failed');
        } finally {
          setProcessingPayment(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Error creating payment:', error);
      toast.error('Failed to process payment');
      setProcessingPayment(false);
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
        <p>The booking you're trying to pay for doesn't exist or has been removed.</p>
        <button 
          className="btn btn-primary mt-4"
          onClick={() => router.push('/dashboard')}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      
      {paymentSuccess ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <FaCheckCircle className="text-6xl text-success mb-4" />
            <h2 className="card-title text-2xl">Payment Successful!</h2>
            <p className="mb-6">Your booking has been confirmed. You can view all your bookings in your dashboard.</p>
            <button 
              className="btn btn-primary"
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-6">Payment Details</h2>
                
                {/* In a real application, you would implement a proper payment form */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Cardholder Name</span>
                  </label>
                  <input type="text" placeholder="John Doe" className="input input-bordered" />
                </div>
                
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Card Number</span>
                  </label>
                  <div className="input-group">
                    <input type="text" placeholder="4242 4242 4242 4242" className="input input-bordered w-full" />
                    <span className="btn btn-square btn-ghost">
                      <FaCreditCard />
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Expiry Date</span>
                    </label>
                    <input type="text" placeholder="MM/YY" className="input input-bordered" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">CVV</span>
                    </label>
                    <input type="text" placeholder="123" className="input input-bordered" />
                  </div>
                </div>
                
                <button 
                  className={`btn btn-primary btn-block ${processingPayment ? 'loading' : ''}`}
                  onClick={handlePayment}
                  disabled={processingPayment}
                >
                  {processingPayment ? 'Processing...' : `Pay $${booking.price.toFixed(2)}`}
                </button>
                
                <p className="text-sm text-center mt-4">
                  Your payment information is secure and encrypted.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card bg-base-100 shadow-xl sticky top-8">
              <div className="card-body">
                <h2 className="card-title">Booking Summary</h2>
                
                <div className="py-4">
                  <div className="flex justify-between mb-2">
                    <span>Tutor:</span>
                    <span className="font-bold">
                      {typeof booking.tutor === 'object' ? booking.tutor.name : 'Loading...'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Subject:</span>
                    <span>
                      {typeof booking.subject === 'object' ? booking.subject.name : 'Loading...'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Date:</span>
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Time:</span>
                    <span>{booking.startTime} - {booking.endTime}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Duration:</span>
                    <span>{booking.duration} hour{booking.duration !== 1 ? 's' : ''}</span>
                  </div>
                  
                  <div className="divider"></div>
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${booking.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}