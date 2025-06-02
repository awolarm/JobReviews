import express from "express"; 
import { login, logout, signup, getReviewsByCompany } from '../controllers/auth.controller.js'; 

const router = express.Router(); 

router.post("/signup", signup); 

router.post("/login", login); 

router.post("/logout", logout); 

router.get("/reviews/:companyName", getReviewsByCompany);

export default router; 