# TutorLink - Find & Connect with the Best Tutors

A comprehensive tutoring platform that connects students with qualified tutors. This project consists of a backend API built with Node.js/Express and a frontend application built with Next.js.

## Backend (API Server)

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tutorlink-backend.git
cd tutorlink-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/tutorlink
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@tutorlink.com
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Start the development server:
```bash
npm run dev
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user
- `PUT /api/auth/updatepassword` - Update password

#### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get a single user
- `POST /api/users` - Create a user (admin only)
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `GET /api/users/tutors` - Get all tutors
- `PUT /api/users/tutor-profile` - Update tutor profile

#### Subjects
- `GET /api/subjects` - Get all subjects
- `GET /api/subjects/:id` - Get a single subject
- `POST /api/subjects` - Create a subject (admin only)
- `PUT /api/subjects/:id` - Update a subject (admin only)
- `DELETE /api/subjects/:id` - Delete a subject (admin only)

#### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get a single booking
- `POST /api/bookings` - Create a booking
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Delete a booking (admin only)
- `POST /api/bookings/:id/payment` - Create payment intent for booking
- `PUT /api/bookings/:id/confirm-payment` - Confirm payment for booking
- `GET /api/bookings/availability/:tutorId` - Get tutor availability

#### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get a single review
- `POST /api/reviews` - Create a review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review
- `GET /api/reviews/tutor/:id` - Get tutor reviews

## Frontend (Next.js Application)

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tutorlink-frontend.git
cd tutorlink-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`.

### Features

- Authentication (login, register, profile management)
- Browse tutors with filtering options
- Tutor profiles with reviews and ratings
- Booking system for tutoring sessions
- Secure payment processing
- Student dashboard
- Tutor dashboard

### Technologies Used

- **Next.js 15**: For server-side rendering and static site generation
- **React**: For building the user interface
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **DaisyUI**: For UI components
- **Axios**: For API requests
- **React Hook Form**: For form handling
- **Zod**: For form validation
- **React Hot Toast**: For notifications

## License

This project is licensed under the MIT License.
