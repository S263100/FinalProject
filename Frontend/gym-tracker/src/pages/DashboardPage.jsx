import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardPage = () => {
    const [stats, setStats] = useState(null);

    const navigate = useNavigate();

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
          <h2 className="text-xl font-bold mb-2">Total Reps: {stats?.repTotal}</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Total Time Spent Exercising: {stats?.timeTotal} mins</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Average Workout Duration</h2>
        </div>
      </div>
      </div>
    </div>
  ); 
};

export default DashboardPage;