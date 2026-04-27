import mongoose, { version } from "mongoose";

const ExerciseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
        },
        angleDefinition: {
            a: Number,
            b: Number,
            c: Number
        },
        threshold: {
            up: Number,
            down: Number
        },
        version: {
            type: Number,
            default: 1
        }
    },
    { timestamps: true }
);

const Exercise = mongoose.model("Exercise", ExerciseSchema);

export default Exercise;