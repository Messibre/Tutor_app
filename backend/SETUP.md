# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Go to MongoDB Atlas**: https://www.mongodb.com/atlas
2. **Create a free account** and cluster
3. **Get your connection string** from the Atlas dashboard
4. **Create a `.env` file** in the backend directory with:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tutorapp?retryWrites=true&w=majority

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (for future authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Option 2: Local MongoDB

1. **Install MongoDB Community Server**: https://www.mongodb.com/try/download/community
2. **Start MongoDB service**: `net start MongoDB`
3. **Create a `.env` file** in the backend directory with:

```env
# Local MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/tutorapp

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret (for future authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## How to Create .env File

1. In your `backend` folder, create a new file called `.env`
2. Copy the content from `config.example.js` and format it as environment variables
3. Update the `MONGODB_URI` with your actual connection string

## Running the Application

1. **Install dependencies**: `npm install`
2. **Start the server**: `npm start` or `node server.js`
3. **Open your frontend**: Open `tutor.html` in your browser

## Testing the Connection

Run the test script to verify your MongoDB connection:

```bash
node test-connection.js
```

## Security Notes

- Never commit your `.env` file to version control
- Use strong, unique passwords for production
- Rotate your JWT secrets regularly
- Use environment-specific configurations for different deployments
