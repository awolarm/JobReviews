import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'; 

const prisma = new PrismaClient()

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

        if(!email|| !password) {
            return res.status(400).json({
                error: "All fields are required"
            })
        }

    } catch(error) {

    }
}

export const logout = async (req, res) => {
    res.json({
        data: "you hit the logout endpoint", 
    })
}