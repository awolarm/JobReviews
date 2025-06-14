import express from 'express'; 
import authRoutes from "./routes/auth.routes.js"; 
import cors from 'cors'; 
import dotenv from 'dotenv';
dotenv.config();

const app = express(); 

// Updated CORS configuration
app.use(cors({
    origin: [
        'http://localhost:5173', // Development
        'https://job-reviews-five.vercel.app' // Your Vercel URL
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); 

app.use(express.json()); 

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: "JobReviews API is running!",
        endpoints: {
            login: "/api/auth/login",
            signup: "/api/auth/signup",
            reviews: "/api/auth/reviews/:companyName"
        }
    });
});

app.use("/api/auth", authRoutes); 

// Use PORT environment variable for Railway deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});