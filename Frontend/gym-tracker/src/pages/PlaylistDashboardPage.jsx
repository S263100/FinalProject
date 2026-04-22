import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const playlistDashboardPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    //Gather all playlists for user
    const fetchPlaylists = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5001/api/playlists", {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await res.json();
        setPlaylists(data);
    };


    //Load Data on page load
    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Playlist Dashboard</h1>

            {playlists.length === 0 ? (
                <p className="text-gray-600 mt-4">No playlists found. Create one to get started!</p>
            ) : (
                playlists.map((playlist) => (
                    <div 
                        key={playlist._id}
                        onClick={() => navigate(`/playlists/${playlist._id}`)}
                        style={{
                            padding: "10px",
                            margin: "10px 0",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                        }}
                    >
                        <h3>{playlist.name}</h3>
                    </div>
                ))
            )}
        </div>
    )
}

export default playlistDashboardPage;