import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PlaylistDetailsPage = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);

    const fetchPlaylistDetails = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        setPlaylist(data);
    };

    useEffect(() => {
        fetchPlaylistDetails();
    }, [id]);

    if (!playlist) return <div>Loading...</div>;


    return (
        <div style={{ padding: "20px" }}>
            <h1>{playlist.name}</h1>

            <h2>Exercises:</h2>

            {playlist.exercises?.length === 0 ? (
                <p>No exercises in this playlist yet.</p>
            ) : (
                playlist.exercises?.map((ex, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                        <p>Excercise ID: {ex.exerciseId}</p>
                        <p>Sets: {ex.sets}</p>
                        <p>Reps: {ex.reps}</p>  
                        <p>Rest Time: {ex.restTime} seconds</p>
                    </div>
                ))
            )}
            </div>
    );
}

export default PlaylistDetailsPage;
