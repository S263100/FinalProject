import mongoose, { set } from "mongoose";

const PlaylistSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        excercises: [
            {
                excerciseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Excercise"
                },
                order: Number,
                sets: {
                    type: Number,
                    default: 1
                },
                reps: {
                    type: Number,
                    default: 10
                },
                restSeconds: {
                    type: Number,
                    default: 60
                }
            }
        ]
    },
    { timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

export default Playlist;