import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const fetchUserDetails = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/auth/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            toast.error("Failed to fetch user details");
            return;
        }

        const data = await res.json();
        setUsername(data.username);
        setEmail(data.email)
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);


    const updateUserDetails = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/auth/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                username,
                email, 
            }),
        });

        const data = await res.json();
        if (res.ok) {
        toast.success("User updated successfully!");
    } else {
        toast.error("User not updated")
    }
};

    const deleteUser = async () => {
        const token = localStorage.getItem("token");
        
        const confirmDeletion = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDeletion) return;

        const res = await fetch(`http://localhost:5001/api/auth/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            localStorage.removeItem("token");
            navigate("/");
            toast.success("Account deleted successfully");
        } else {
            toast.error("Failed to delete account");
        }
    };


return (
    <div className="min-h-screen bg-gray-100 flex items-top-center justify-center p-10">
      <div className="w-full max-w-7xl bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center underline">Profile Page</h1>
     {!editMode ? (
    <div>
      <h1>Username: {username}</h1>
      <h2>Email Address: {email}</h2>
      <button onClick={() => setEditMode(true)}>Edit Profile</button>
      <button onClick={deleteUser}>Delete User</button>
    </div>
     ) : (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={updateUserDetails}>Save Changes</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
     )}
    </div>
    </div>
    
)

}

export default ProfilePage;