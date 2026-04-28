import mongoose from "mongoose";

const workoutResultSchema = new mongoose.Schema(
    {
        userId: String,
        playlistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Playlist"
        },
        startTime: {
            type: Date,
            default: Date.now
        },
        endTime: {
            type: Date
        },
        exerciseResults: [
            {
                exerciseId: mongoose.Schema.Types.ObjectId,
                setsCompleted: Number,
                totalReps: Number,
                durationSeconds: Number,
                feedbackScore: Number
            }
        ]
    });

const WorkoutResult = mongoose.model("WorkoutResult", workoutResultSchema);

export default WorkoutResult;