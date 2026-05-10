import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProfilePage = () => {
    const [user, setUser] = useState([]);

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
        console.log(data)
        setUser(data);
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

return (
    <div>
    <h1>Profile Page.</h1>
    <h2>{user.email}</h2>
    </div>
    
)

}

export default ProfilePage;