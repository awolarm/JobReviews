import express from "express"; 
import { login, logout, signup, review } from '../controllers/auth.controller.js'; 

const router = express.Router(); 

router.post("/signup", signup); 

router.post("/login", login); 

router.post("/logout", logout); 

router.post("/reviews", review);

// you have to change get to post later on!!

export default router; 