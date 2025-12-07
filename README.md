# Campus Resource Booking System

A full-stack MERN application for booking campus resources like rooms, labs, and sports facilities.

## Features

- JWT-based authentication (signup/login)
- Book, cancel, and update reservations
- Search and filter resources
- Booking analytics with charts
- Responsive design
- Toast notifications
- Protected routes

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs

**Frontend:**
- React.js
- React Router
- React Context API
- Recharts (Analytics)
- React Icons
- React Toastify
- Axios

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already created with MongoDB URI)

4. Start the server:
```bash
npm run dev
```

Server runs on http://localhost:5000

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Client runs on http://localhost:5173

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user

### Resources
- GET `/api/resources` - Get all resources
- GET `/api/resources/:id` - Get single resource
- GET `/api/resources/search?query=...` - Search resources
- GET `/api/resources/filter?type=...&status=...` - Filter resources
- GET `/api/resources/sort?by=...` - Sort resources
- POST `/api/resources/book` - Book a resource (protected)
- PUT `/api/resources/:id/cancel` - Cancel booking (protected)
- PUT `/api/resources/:id/update` - Update booking (protected)
- DELETE `/api/resources/:id` - Delete resource (admin only)

### Users
- GET `/api/users/:id/bookings` - Get user bookings (protected)

### Analytics
- GET `/api/analytics/usage` - Get usage statistics (protected)
- GET `/api/analytics/top-rooms` - Get top booked rooms (protected)

## Default User Roles
- student
- faculty
- admin

## Project Structure

```
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resourceController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Resource.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resourceRoutes.js
│   │   ├── userRoutes.js
│   │   └── analyticsRoutes.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ResourceCard.jsx
│   │   │   └── BookingModal.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Resources.jsx
│   │   │   ├── Bookings.jsx
│   │   │   └── Analytics.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## Usage

1. Register a new account (student/faculty)
2. Login with credentials
3. Browse available resources
4. Search or filter resources by type
5. Book a resource by selecting date and time
6. View your bookings
7. Cancel bookings if needed
8. Check analytics dashboard for usage statistics

## Notes

- Make sure MongoDB is running before starting the backend
- The backend must be running for the frontend to work properly
- JWT tokens expire after 30 days
- Admin role can delete resources
