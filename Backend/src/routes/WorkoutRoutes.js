import express from "express";
import { getWorkoutStats, saveWorkoutResults } from "../controllers/WorkoutController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/stats", authMiddleware, getWorkoutStats);
router.post("/", saveWorkoutResults)

export default router;