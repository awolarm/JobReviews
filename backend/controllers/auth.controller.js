import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'; 

const prisma = new PrismaClient()

export const signup = async (req, res) => {
    try {
        console.log("hello")
        // 1. Extract user data from request body
        const { username, email, password } = req.body;

        // 2. Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }


        // const existingUser = await prisma.user.findFirst({
        //     where: {
        //         OR: [
        //             { email },
        //             { username }
        //         ]
        //     }
        // });

        // if (existingUser) {
        //     return res.status(400).json({
        //         error: "User already exists"
        //     });
        // }

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
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

export const login = async (req, res) => {
    res.json({
        data: "you hit the login endpoint", 
    })
}

export const logout = async (req, res) => {
    res.json({
        data: "you hit the logout endpoint", 
    })
}