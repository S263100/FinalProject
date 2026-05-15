import mongoose from "mongoose";

const workoutResultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
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
        durationSeconds: Number,
        exerciseResults: [
            {
                exerciseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Exercise"
        },
                exerciseName: String,
                setsCompleted: Number,
                totalReps: Number,
            }
        ]
    });

const WorkoutResults = mongoose.model("WorkoutResult", workoutResultSchema);

export default WorkoutResults;