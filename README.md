# 🍽️ Mitroz - Restaurant Table Booking App

A modern, full-stack restaurant table booking application built with React and Node.js. This application provides a seamless experience for customers to browse restaurants, book tables, request events, and manage reservations with integrated payment processing.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Frontend Documentation](#frontend-documentation)
- [Backend Documentation](#backend-documentation)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🌟 Overview

Mitroz is a comprehensive restaurant booking solution that combines a modern React frontend with a robust Node.js/Express backend. The application handles user authentication, table bookings, event requests, payment processing via Razorpay, and automated email notifications.

## ✨ Features

### User Features

- 🔐 **User Authentication** - Secure login and registration
- 🍴 **Restaurant Browsing** - Explore restaurants with detailed information
- 📅 **Table Booking** - Book tables with date and time selection
- 🎉 **Event Requests** - Submit special event booking requests
- 💳 **Payment Integration** - Secure Razorpay payment gateway
- 📱 **OTP Verification** - Phone number verification via OTP
- 📧 **Email Notifications** - Automated booking confirmations
- 📜 **Booking History** - View and manage reservations
- 📱 **Responsive Design** - Mobile-friendly interface

### Admin Features

- 🔑 **Admin Authentication** - JWT-based secure login
- 📊 **Dashboard Statistics** - Real-time booking analytics
- ✅ **Booking Management** - Approve and manage bookings
- 🎪 **Event Management** - Handle event requests
- 👥 **User Management** - Track customer information

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **Razorpay SDK** - Payment integration
- **Lucide React** - Icon library
- **date-fns** - Date utility library
- **React Hot Toast** - Notification system

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or Atlas account)
- **npm** or **yarn**
- **Razorpay Account** (for payment integration)
- **Email Account** (for SMTP notifications)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Restaurant Table Booking App"
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

#### Frontend (.env)

Create `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:4000/api
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

#### Backend (.env)

Create `.env` file in the backend directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# OTP Configuration
OTP_SERVICE_KEY=your_otp_service_key
```

### 4. Run the Application

#### Start Backend Server

```bash
cd backend
npx nodemon
```

Backend will run at `http://localhost:4000`

#### Start Frontend Server

```bash
cd frontend
npm run dev
```

Frontend will run at `http://localhost:5173`

---

## � Frontend Documentation

### Project Structure

```
frontend/
├── src/
│   ├── api/          # API service layer
│   ├── assets/       # Static assets (images, fonts, etc.)
│   ├── components/   # Reusable UI components
│   ├── context/      # React context providers
│   ├── pages/        # Page components
│   ├── App.jsx       # Main application component
│   ├── main.jsx      # Application entry point
│   └── index.css     # Global styles
├── public/           # Public assets
└── package.json      # Project dependencies
```

### Available Scripts

#### Development

```bash
npm run dev
```

Starts the development server with hot module replacement.

#### Build

```bash
npm run build
```

Creates optimized production build.

#### Preview

```bash
npm run preview
```

Preview production build locally.

#### Lint

```bash
npm run lint
```

Run ESLint for code quality checks.

### Key Frontend Dependencies

- `react` & `react-dom` - Core React libraries
- `react-router-dom` - Routing
- `axios` - HTTP requests
- `framer-motion` - Animations
- `tailwindcss` - Styling
- `razorpay` - Payment SDK
- `react-hot-toast` - Toast notifications
- `lucide-react` - Icons
- `date-fns` - Date formatting

---

## 🔧 Backend Documentation

### Project Structure

```
backend/
├── config/
│   └── db.js                  # Database connection
├── controllers/
│   ├── admin.controller.js    # Admin operations
│   ├── auth.controller.js     # Authentication logic
│   ├── booking.controller.js  # Booking management
│   └── event.controller.js    # Event handling
├── middlewares/
│   └── auth.middleware.js     # JWT authentication
├── models/
│   ├── admin.js              # Admin schema
│   ├── booking.js            # Booking schema
│   ├── eventrequest.js       # Event schema
│   └── user.js               # User schema
├── routes/
│   ├── admin.routes.js       # Admin routes
│   ├── booking.routes.js     # Booking routes
│   ├── event.routes.js       # Event routes
│   └── user.routes.js        # User routes
├── utils/
│   ├── checkAvailability.js  # Availability logic
│   ├── emailTemplates.js     # Email templates
│   ├── razorpay.js          # Razorpay config
│   └── sendEmail.js         # Email utility
├── .env                      # Environment variables
├── app.js                    # Main entry point
└── package.json              # Dependencies
```

### Available Scripts

#### Development (with auto-reload)

```bash
npx nodemon
```

#### Production

```bash
node app.js
```

### Key Backend Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `razorpay` - Payment gateway
- `nodemailer` - Email service
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

---

## 🔌 API Endpoints

### Booking Routes (`/api/bookings`)

| Method | Endpoint          | Description               |
| ------ | ----------------- | ------------------------- |
| POST   | `/create`         | Create a new booking      |
| POST   | `/send-otp`       | Send OTP for verification |
| POST   | `/verify-otp`     | Verify OTP code           |
| POST   | `/payment/order`  | Create Razorpay order     |
| POST   | `/payment/verify` | Verify payment            |
| GET    | `/history`        | Get booking history       |
| PUT    | `/user-update`    | Update user info          |

### Event Routes (`/api/events`)

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/request`           | Submit event request       |
| POST   | `/payment/order`     | Create event payment order |
| POST   | `/payment/verify`    | Verify event payment       |
| GET    | `/admin/all`         | Get all events (Admin)     |
| PUT    | `/admin/confirm/:id` | Confirm event (Admin)      |

### Admin Routes (`/api/admin`)

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| POST   | `/create`          | Create admin account         |
| POST   | `/login`           | Admin login                  |
| GET    | `/dashboard/stats` | Dashboard statistics (Admin) |

### Health Check

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | `/`      | Server health check |

## 🔐 Authentication

Admin routes are protected using JWT tokens. Include the token in requests:

```javascript
headers: {
  'Authorization': 'Bearer <your_jwt_token>'
}
```

## 💳 Payment Flow

1. **Create Order**: Client requests payment order from backend
2. **Razorpay Payment**: Frontend opens Razorpay payment modal
3. **Payment Completion**: User completes payment
4. **Verify Payment**: Backend verifies payment signature
5. **Confirmation**: Booking/Event confirmed on success

## 📧 Email Notifications

Automated emails are sent for:

- ✅ Booking confirmations
- 🎉 Event request confirmations
- 🔢 OTP verification codes
- 💳 Payment receipts

Email templates can be customized in `backend/utils/emailTemplates.js`

## 🗄️ Database Models

### Booking Model

- User information
- Booking details (date, time, guests)
- Payment status
- Confirmation status

### Event Request Model

- Event details
- Customer information
- Event date and requirements
- Approval status

### Admin Model

- Admin credentials (hashed)
- Authentication tokens

### User Model

- User profile information
- Contact details

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
cd frontend
npm run build
# Deploy dist folder
```

### Backend Deployment (Vercel)

The backend includes `vercel.json` configuration:

```bash
cd backend
vercel
```

### Environment Variables

Ensure all environment variables are configured in your deployment platform:

- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ CORS configuration for specific origins
- ✅ Input validation and sanitization
- ✅ Secure payment verification
- ✅ Environment variable protection
- ✅ OTP-based phone verification

## 🎯 Usage

1. **Register/Login**: Create account or sign in
2. **Browse Restaurants**: Explore available options
3. **Make Booking**: Select date, time, and guests
4. **Verify Phone**: Complete OTP verification
5. **Make Payment**: Secure payment via Razorpay
6. **Receive Confirmation**: Email and in-app confirmation
7. **Manage Bookings**: View and update reservations

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

For queries or support, please reach out to the development team.

---

## 📌 Important Notes

- ⚠️ Ensure MongoDB is running before starting the backend
- ⚠️ Configure all environment variables correctly
- ⚠️ Use valid Razorpay credentials for payment processing
- ⚠️ Set up email SMTP settings for notifications
- ⚠️ Backend must be running for frontend to function properly

---

**Made with ❤️ by Yogesh Gadhewal**
