import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Registration failed", data.message);
        return;
      }

      toast.success("Registration Success", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");

    } catch (error) {
      toast.error("Error during registration", error);
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
      <h1 className="text-3xl font-bold flex items-center justify-center">Register</h1>

      <input type="text" placeholder="Username" className="w-full p-2 mb-4 border border-gray-300 rounded" value={username} onChange={(e) => setUsername(e.target.value)} />

      <input type="email" placeholder="Email" className="w-full p-2 mb-4 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Password" className="w-full p-2 mb-4 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" className="w-full bg-primary text-gray-800 p-2 rounded hover:bg-primary-dark transition-colors duration-200">Create Account</button>
      </form>
    </div>
  ); 
};

export default RegisterPage;