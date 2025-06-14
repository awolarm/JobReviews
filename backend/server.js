import express from 'express'; 
import authRoutes from "./routes/auth.routes.js"; 
import cors from 'cors'; 
import dotenv from 'dotenv';
dotenv.config();


const app = express(); 

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); 

app.use(express.json()); 

app.use("/api/auth", authRoutes); 

app.listen(5000, ()=> {
    console.log("Server started at http://localhost:5000");
}); 

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