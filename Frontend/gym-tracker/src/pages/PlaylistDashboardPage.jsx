import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const playlistDashboardPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState("");
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

    //Create new playlist
    const CreatePlaylist = async () => {
        if (!newPlaylistName) return;

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5001/api/playlists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newPlaylistName }),
        });

        const data = await res.json(); 

        setPlaylists((prev) => [...prev, data]);
        setNewPlaylistName("");
        toast.success("Playlist created successfully!");
    };

    //Load Data on page load
    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Playlist Dashboard</h1>

            <div style={{ margin: "20px 0" }}>
                <input 
                    type="text" 
                    placeholder="New Playlist Name" 
                    value={newPlaylistName} 
                    onChange={(e) => setNewPlaylistName(e.target.value)} 
                    style={{ padding: "10px", width: "300px", marginRight: "10px" }}
                />
                <button onClick={CreatePlaylist} style={{ padding: "10px 20px" }}>Create Playlist</button>
            </div>

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