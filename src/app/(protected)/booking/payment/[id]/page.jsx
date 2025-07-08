'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from '@/lib/axios';
import { FaCheckCircle, FaCreditCard } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function BookingPayment({ params}) {
  const bookingId = params.id;
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Form state
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated or not a student
    if (!isAuthenticated) {
      router.push('/login?redirect=/booking/payment/' + bookingId);
      return;
    }
    
    if (user?.role !== 'student') {
      toast.error('Only students can make payments');
      router.push('/dashboard');
      return;
    }
    
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`https://tutor-backend-delta.vercel.app/api/bookings/${bookingId}`);
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
  }, [bookingId, isAuthenticated, user, router]);

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!booking) return;
    
    // Basic validation
    if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
      toast.error('Please fill in all card details');
      return;
    }
    
    // Very basic card validation (you'd want more robust validation in production)
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Invalid card number');
      return;
    }
    
    if (cvv.length < 3) {
      toast.error('Invalid CVV');
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Directly process the payment without payment intent
      const response = await axios.put(`https://tutor-backend-delta.vercel.app/api/bookings/${bookingId}/pay`);
      
      setPaymentSuccess(true);
      toast.success('Payment successful!');
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment processing failed. Please try again.');
    } finally {
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
                
                <form onSubmit={handlePayment}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Cardholder Name</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="input input-bordered" 
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Card Number</span>
                    </label>
                    <div className="input-group">
                      <input 
                        type="text" 
                        placeholder="4242 4242 4242 4242" 
                        className="input input-bordered w-full" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        required
                      />
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
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        className="input input-bordered"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                        required 
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">CVV</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="123" 
                        className="input input-bordered"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`btn btn-primary btn-block ${processingPayment ? 'loading' : ''}`}
                    disabled={processingPayment}
                  >
                    {processingPayment ? 'Processing...' : `Pay $${booking.price.toFixed(2)}`}
                  </button>
                </form>
                
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
                      {typeof booking.tutor === 'object' && booking.tutor 
                        ? booking.tutor.name 
                        : 'Loading...'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Subject:</span>
                    <span>
                      {typeof booking.subject === 'object' && booking.subject 
                        ? booking.subject.name 
                        : 'Loading...'}
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