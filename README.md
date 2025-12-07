# Campus Resource Booking System

A full-stack MERN application for booking campus resources like rooms, labs, and sports facilities.

## Features

- JWT-based authentication (signup/login)
- Book, cancel, and update reservations
- Search, filter, and sort resources
- Booking analytics with interactive charts (Recharts)
- Faculty/Admin booking management
- Fully responsive design with mobile hamburger menu
- Toast notifications with promise support
- Protected routes with role-based access
- Real-time booking conflict detection

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs

**Frontend:**
- React.js (v19)
- React Router (v6)
- React Context API
- Tailwind CSS (with Vite plugin)
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

3. Environment variables are already configured in `.env`

4. Start the server:
```bash
npm run dev
```

Server runs on http://localhost:5000

5. (Optional) Seed sample data:
```bash
npm run seed
```

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
- GET `/api/resources/:id/bookings` - Get resource bookings (faculty/admin)
- GET `/api/resources/search?query=...` - Search resources
- GET `/api/resources/filter?type=...&status=...` - Filter resources
- GET `/api/resources/sort?by=name` - Sort resources
- POST `/api/resources/book` - Book a resource (protected)
- PUT `/api/resources/:id/cancel` - Cancel booking (protected)
- PUT `/api/resources/:id/update` - Update booking (protected)
- DELETE `/api/resources/:id` - Delete resource (admin only)
- DELETE `/api/resources/:id/booking` - Delete booking (faculty/admin)

### Users
- GET `/api/users/:id/bookings` - Get user bookings (protected)

### Analytics
- GET `/api/analytics/usage` - Get usage statistics (protected)
- GET `/api/analytics/top-rooms` - Get top booked rooms (protected)

## User Roles & Permissions

**Student:**
- Book resources
- View/edit/cancel own bookings
- View analytics (own bookings)

**Faculty:**
- All student permissions
- Manage all bookings for resources
- Delete any booking

**Admin:**
- All faculty permissions
- Delete resources

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
│   │   │   ├── Analytics.jsx
│   │   │   └── ManageBookings.jsx
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

### For Students:
1. Register a new account (select student role)
2. Login with credentials
3. Browse available resources
4. Search, filter, or sort resources
5. Book a resource by selecting date and time
6. View, edit, or cancel your bookings
7. Check analytics dashboard for your booking statistics

### For Faculty/Admin:
1. All student features plus:
2. Access "Manage Bookings" page
3. Select a resource to view all bookings
4. Delete any booking for resource management
5. Admin can delete resources from Resources page

## Key Features Explained

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Hamburger menu for mobile navigation
- Responsive charts and grids
- Optimized for all screen sizes

### Booking Management
- Real-time conflict detection
- Edit booking details (date, time, purpose)
- Cancel bookings with confirmation
- Faculty can manage all resource bookings

### Analytics Dashboard
- Total, active, and cancelled bookings count
- Top booked resources (bar chart with different colors)
- Booking status distribution (pie chart)
- User-specific analytics

### Search & Filter
- Search by resource name or type
- Filter by resource type (room, lab, sports)
- Sort by name (toggle on/off)
- Real-time results

## Notes

- Make sure MongoDB is running before starting the backend
- The backend must be running for the frontend to work properly
- JWT tokens expire after 30 days
- Sample data is seeded automatically (run `npm run seed` in server)
- All API requests include token in Authorization header
