import { landmarkNames } from "../utils/LandmarkNames";
import { calculateAngle } from "../utils/AngleCalculation";

export const squatAngleLogic = (landmarks, state) => {
    const leftHip = landmarks[landmarkNames.Left_Hip]
    const leftKnee = landmarks[landmarkNames.Left_Knee]
    const leftAnkle = landmarks[landmarkNames.Left_Ankle]

    const angle = calculateAngle(leftHip, leftKnee, leftAnkle);

    let advice = "";

    if (angle > 140) {
        advice = "Go lower";
    } else if (angle < 70) {
        advice = "Dont go too low";
    }

    if (angle < 90) {
        stage.state = "down";
    }
    if (angle > 170 && stage.state === "down") {
        stage.state = "up";
        state.reps += 1;
    }

    return {
        state,
        angle,
        advice,
    };
}