import WorkoutResults from "../models/WorkoutResults.js";

export const getWorkoutStats = async (req, res) => {

    const workouts = await WorkoutResults.find({
        userId: req.user.id
    });

    let repTotal = 0;
    let timeTotal = 0;

    workouts.forEach(workout => {

        timeTotal += workout.workoutDuration || 0
       
        workout.exerciseResults.forEach(ex => {
            repTotal += ex.totalReps || 0;
        });
    });

    res.json({
        totalWorkouts: workouts.length,
        repTotal,
        timeTotal
    });
};

export const saveWorkoutResults = async (req, res) => {
  try {
      const workout = await WorkoutResults.create({
          userId: req.user.id,
          playlistId: req.body.playlistId,      
          exerciseResults: req.body.exerciseResults,
          durationSeconds: req.body.workoutDuration,       
          startTime: Date.now(),       
          endTime: Date.now(),
      });
      res.status(201).json(workout);
  } catch (error) {
      res.status(500).json({ message: "Failed to save workout" });
    }
  };