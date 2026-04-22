import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PlaylistDetailsPage = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState("");
    const navigate = useNavigate();

    //Fetch playlist details
    const fetchPlaylistDetails = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            toast.error("Failed to fetch playlist details");
            return;
        }

        const data = await res.json();
        setPlaylist(data);
    };

    useEffect(() => {
        fetchPlaylistDetails();
    }, [id]);

    if (!playlist) return <div>Loading...</div>;

    //Update playlist
    const updatePlaylist = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/playlists/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                name: editName,
                exercises: playlist.exercises, 
            }),
        });

        const data = await res.json();
        setPlaylist(data);
        setEditMode(false);
        toast.success("Playlist updated successfully!");
    };

    //Delete playlist
    const deletePlaylist = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/playlists/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            navigate("/playlists");
            toast.success("Playlist deleted successfully!");
        } else {
            toast.error("Failed to delete playlist");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            {editMode ? (
                <div>
                    <input 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        />

                    <button onClick={updatePlaylist} style={{ backgroundColor: "Green", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>Save</button>
                    <button onClick={() => setEditMode(false)} style={{ backgroundColor: "gray", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px", marginLeft: "10px" }}>Cancel</button>
                </div>
            ) : (
                <h1>{playlist.name}</h1>
            )}

            <h2>Exercises:</h2>

            {playlist.exercises?.length === 0 ? (
                <p>No exercises in this playlist yet.</p>
            ) : (
                playlist.exercises?.map((ex, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                        <p>Exercise ID: {ex.exerciseId}</p>
                        <p>Sets: {ex.sets}</p>
                        <p>Reps: {ex.reps}</p>  
                        <p>Rest Time: {ex.restTime} seconds</p>
                    </div>
                ))
            )}
            <button onClick={() => {
                setEditName(playlist.name);
                setEditMode(true);
            }} style={{ backgroundColor: "Green", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>Edit Playlist</button>
            <button onClick={deletePlaylist} style={{ backgroundColor: "red", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>Delete Playlist</button>
            </div>
    );
}

export default PlaylistDetailsPage;
