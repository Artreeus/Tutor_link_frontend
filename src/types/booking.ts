import { User } from './user';
import { Subject } from './subject';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  _id: string;
  student: string | User;
  tutor: string | User;
  subject: string | Subject;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: BookingStatus;
  price: number;
  paymentStatus: 'pending' | 'paid';
  paymentIntentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}