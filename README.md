# 🎓 Tutor Connect - Modern Tutoring Platform

A beautiful, mobile-first tutoring platform that connects students with qualified tutors. Built with modern web technologies and designed for the best mobile experience.

![Tutor Connect](https://img.shields.io/badge/Status-Ready%20for%20Production-brightgreen)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-blue)
![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Default-black)

## ✨ Features

### 🎨 **Modern Design**

- **Beautiful, responsive UI** with mobile-first approach
- **Dark mode by default** with smooth theme switching
- **Professional typography** and modern color palette
- **App-like experience** on mobile devices

### 👥 **User Management**

- **Dual user types**: Tutors and Parents
- **Smart navigation** that adapts to login status
- **Secure authentication** with persistent sessions
- **Automatic login** after signup

### 📱 **Mobile-Optimized**

- **Touch-friendly interface** with proper button sizing
- **Responsive design** for all screen sizes
- **Beautiful notifications** instead of browser alerts
- **Smooth animations** and transitions

### 🎯 **Core Functionality**

- **Browse tutors** with search and filtering
- **Tutor profiles** with ratings and reviews
- **Parent dashboard** with favorites and rating history
- **Tutor dashboard** with profile management
- **Image upload** for tutor profile pictures
- **Rating system** for quality assurance

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd tutor
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp config.example.js config.js
   # Edit config.js with your MongoDB connection string
   ```

4. **Start the backend server**

   ```bash
   npm start
   # Server runs on http://localhost:3001
   ```

5. **Open the frontend**
   ```bash
   # Open tutor.html in your browser
   # Or serve it with a local server
   ```

## 🛠️ Tech Stack

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No framework dependencies
- **Mobile-first** responsive design

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## 📱 Mobile Experience

The app is designed with mobile users in mind:

- **Touch-optimized** buttons and interactions
- **Responsive grid** that adapts to screen size
- **Beautiful notifications** instead of browser alerts
- **Smooth animations** and micro-interactions
- **Professional appearance** that feels like a native app

## 🎨 Design System

### Colors

- **Primary**: Modern blue (#6366f1)
- **Secondary**: Pink accent (#ec4899)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography

- **Font**: Inter (Google Fonts)
- **Mobile-optimized** sizing
- **Consistent hierarchy**

### Components

- **Cards** with beautiful shadows
- **Buttons** with hover effects
- **Forms** with proper validation
- **Notifications** with smooth animations

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment

1. Upload files to any static hosting service
2. Ensure backend API is accessible
3. Update API endpoints if needed

## 📋 API Endpoints

### Tutors

- `GET /api/tutors` - Get all tutors
- `GET /api/tutors/:id` - Get tutor by ID
- `POST /api/tutors` - Create new tutor
- `PUT /api/tutors/:id` - Update tutor
- `POST /api/tutors/login` - Tutor login

### Parents

- `GET /api/parents` - Get all parents
- `POST /api/parents` - Create new parent
- `POST /api/parents/login` - Parent login
- `POST /api/parents/:id/favorites` - Add to favorites
- `POST /api/parents/:id/rate` - Rate tutor

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inter Font** by Rasmus Andersson
- **Modern CSS** techniques and best practices
- **Mobile-first** design principles
- **Accessibility** guidelines

---

**Built with ❤️ for modern education**

_Ready to connect students with amazing tutors!_ 🎓✨
