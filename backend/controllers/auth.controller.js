import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { readFile } from 'fs';

const prisma = new PrismaClient()
const ongoingRequests = new Set();

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const existingUser = await prisma.user.findFirst({
            where: {
              OR: [
                { name: { equals: username, mode: 'insensitive' } },
                { email: { equals: email, mode: 'insensitive' } }
              ]
            }
          });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create new user
        const user = await prisma.user.create({
            data: {
                name: username,
                email: email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        });

        // 6. Send success response
        res.status(201).json({
            message: "Account created successfully",
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const login = async (req, res) => {
    try{
        const {email, password} = req.body; 

        const user = await prisma.user.findFirst({
            where: {
              email: {equals: email, mode: 'insensitive'}
            }
          });
        
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password); 

        if(!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
   
        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch(error) {
        console.error('Login error', error); 
        return res.status(500).json({
            message: "Internal server error"
        }); 
    }
}; 

export const logout = async (req, res) => {
    res.json({
        data: "you hit the logout endpoint", 
    })
}; 

export const start_script = async(company) => {
    return new Promise((resolve) => {
        const pythonProcess = spawn('python3', ['webscraper/sb.py', company]);
        
        pythonProcess.on('close', async(code) => {
            if(code === 0) {
                console.log("success");
                resolve(undefined);
            }else{
                console.log("failure");
                resolve(undefined);
            }
        });
    });
};

export const getReviewsByCompany = async (req, res) => {
    try {
        const { companyName } = req.params;
        console.log(`Getting reviews for: ${companyName}`);

        if (ongoingRequests.has(companyName)) {
            return res.status(200).json({
                success: true,
                processing: true,
                message: "Already processing this company"
            });
        }

        ongoingRequests.add(companyName);
        
        // Start the script but don't wait
        start_script(companyName).finally(() => {
            ongoingRequests.delete(companyName);
        });

        // Immediately return that processing started
        res.status(200).json({
            success: true,
            processing: true,
            message: "Processing started"
        });
        
    } catch (error) {
        console.error('Error in getReviewsByCompany:', error);
        ongoingRequests.delete(companyName);
        res.status(500).json({
            success: false,
            message: `Something failed: ${error.message}`
        });
    }
};

export const checkReviewsStatus = async (req, res) => {
    try {
        const { companyName } = req.params;
        
        // Check if file exists and read it
        try {
            const fileContent = await fs.readFile('reviews.json', 'utf8');
            const reviews = JSON.parse(fileContent);
            
            // Check if reviews are for the requested company
            if (reviews.length > 0 && reviews[0].company === companyName) {
                return res.status(200).json({
                    success: true,
                    ready: true,
                    company: companyName,
                    reviewCount: reviews.length,
                    reviews: reviews
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message, 
            })
        }
        
        // Not ready yet
        res.status(200).json({
            success: true,
            ready: false,
            message: "Still processing..."
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error checking status"
        });
    }
};



export const createReview = async (req, res) => {
    try {
        const {title, description, company, location, role, createdAt} = req.body;

        const userId = req.user?.userId; 

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        if (!title || !description || !company || !location || !role || !createdAt) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newReview = await prisma.review.create({
            data: {
                company: company,
                title: title,
                description: description,
                location: location,
                role: role,
                userId: userId,
                createdAt: createdAt,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                }   
            }
        });

        res.status(201).json({
            message: "Review created successfully",
            review: newReview
        });

    } catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}; 

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

