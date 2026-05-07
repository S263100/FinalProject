import express from "express";
import "dotenv/config";
import authRoutes from "./routes/AuthRoutes.js";
import playlistRoutes from "./routes/PlaylistRoutes.js";
import exerciseRoutes from "./routes/ExerciseRoutes.js"
import { connectDB } from "./config/db.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/exercises", exerciseRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});