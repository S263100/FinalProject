import express from "express";

const router = express.Router();

router.get("/login", async (req, res) => {
    res.send("Login successful");
});

router.get("/register", async (req, res) => {
    res.send("Registration successful");
});

export default router;