import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardPage = () => {
    const [stats, setStats] = useState(null);

    const navigate = useNavigate();

    const calculateMinutes = Math.floor((stats?.totalWorkoutTime || 0) / 60);

    const averageWorkoutTime = Math.floor((stats?.averageWorkoutTime || 0) / 60);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, []);

  useEffect(() => {
    const fetchStats = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/workouts/stats`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        setStats(data);
    };

      fetchStats();
    }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex items-top-center justify-center p-10">

      <div className="w-full max-w-7xl bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline">Total Reps Per Exercise:</h2>
          {stats?.exerciseRepTotals?.map(exercise => (
            <div key={exercise.exerciseId}>
              <p className="text-xl font-bold mb-2">{exercise.exerciseName}:</p>
              <p className="text-xl font-bold mb-2">{exercise.totalReps} reps</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline">Total Time Spent Exercising:</h2>
          <p className="text-xl font-bold mb-2">{calculateMinutes} mins</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2 underline">Average Workout Duration</h2>
          <p className="text-xl font-bold mb-2">{averageWorkoutTime} mins</p>
        </div>
      </div>
      </div>
    </div>
  ); 
};

export default DashboardPage;