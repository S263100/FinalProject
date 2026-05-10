import express from "express";
import { loginUser, registerUser, getUserById } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/:id", getUserById)

export default router;