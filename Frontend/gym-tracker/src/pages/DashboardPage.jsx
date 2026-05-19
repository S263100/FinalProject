import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Legend} from "recharts";

const DashboardPage = () => {
    const [stats, setStats] = useState(null);

    const navigate = useNavigate();

    const repTotal = (stats?.exerciseRepTotals || []);

    const totalOverallReps = repTotal.reduce((sum, ex) => sum + ex.totalReps, 0);

    const calculateMinutes = Math.floor((stats?.totalWorkoutTime || 0) / 60);

    const averageWorkoutTime = Math.floor((stats?.averageWorkoutTime || 0) / 60);

    const pieChartData = repTotal.map(ex => ({
      name: ex.exerciseName,
      value: totalOverallReps ? Math.round((ex.totalReps / totalOverallReps) * 100) : 0
    }));

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
      <h1 className="text-4xl font-bold mb-6 text-center underline">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
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

        <div className="bg-white p-4 rounded shadow">
          <BarChart width={350} height={300} data={stats?.exerciseRepTotals}>
            <XAxis dataKey="exerciseName"/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalReps" fill="#8884d8"/>
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <BarChart width={600} height={300} data={stats?.exerciseRepTotalsDaily}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalReps" name="reps" fill="#8884d8"/>
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <PieChart width={400} height={300}>
            <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={100} label/>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

      </div>
      </div>
    </div>
  ); 
};

export default DashboardPage;