import express from "express";
import User from "../models/Users.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Please fill in all fields" });
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Check if password is correct
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.log("Error in login route:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
});



router.post("/register", async (req, res) => {
    try {
       const { email, username, password } = req.body;

       // If User doesn't fill in every field, return a message to fill in all fields
       if (!email || !username || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
       }

       // If password is shorter than 6 characters, return a message instructing a longer password
       if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
       }

       // If username is shorter than 3 characters, return a message instructing a longer username
       if (username.length < 3) {
        return res.status(400).json({ message: "Username must be at least 3 characters" });
       }

       // Check if email is already in use
       const existingUser = await User.findOne({ email });
       if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
       }

       // Check if username is already in use
       const existingUsername = await User.findOne({ username });
       if (existingUsername) {
        return res.status(400).json({ message: "Username already in use" });
       }

       //Create new user if all checks are passed
       const user = new User({
        email,
        username,
        password
       })

       await user.save();

       const token = generateToken(user._id);

       res.status(201).json({
        token,
        user:{
            _id: user._id,
            username: user.username,
            email: user.email
        }
    });   
    } catch (error) {
        console.log("Error in register route:", error);
        res.status(500).json({ message: "Internal Server error" });
    }   
});

export default router;