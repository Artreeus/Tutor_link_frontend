import { User } from './user';
import { Booking } from './booking';

export interface Review {
  _id: string;
  student: string | User;
  tutor: string | User;
  booking: string | Booking;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}