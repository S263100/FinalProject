import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PlaylistDetailsPage = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [editExercises, setEditExercises] = useState([]);
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
        setPlaylistName(data.name);
        setEditExercises(data.exercises);
    };

    useEffect(() => {
        fetchPlaylistDetails();
    }, [id]);

    if (!playlist) return <div>Loading...</div>;

    //Add new exercise to playlist
    const addExercise = () => {
        setEditExercises([...editExercises, { name: "", sets: "3", reps: "10", rest: "60" }]);
    };

    //Update exercise details
    const updateExercise = (index, field, value) => {
        const updatedExercises = [...editExercises];
        updatedExercises[index][field] = value;
        setEditExercises(updatedExercises);
    };

    //Remove exercise from playlist
    const removeExercise = (index) => {
        const updatedExercises = editExercises.filter((_, i) => i !== index);
        setEditExercises(updatedExercises);
    };

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
                name: playlistName,
                exercises: editExercises, 
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

    const savePlaylist = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/playlists/${id}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    name: playlistName,
                    exercises: editExercises, 
                }),
            }
        );

        if (res.ok) {
            toast.success("Playlist updated successfully!");
            setEditMode(false);
            navigate("/playlists");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-start bg-gray-100">
            <div className="w-full max-w-2xl bg-white p-6 mt-10 rounded-xl shadow">
            {editMode ? (
                <div>
                    <input 
                    value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        className="border border-grey-300 rounded p-2 gap-4 mb-4 w-full"
                    />
                </div>
            ) : (
                <h1 className="text-3xl font-bold mb-6 text-center">{playlist.name}</h1>
            )}

            <h2>Exercises:</h2>

                {editExercises.length === 0 ? (
                    <p className="text-gray-600 mt-4">No exercises in this playlist. Edit to add some!</p>
                ) : (
                 editExercises.map((exercise, index) => (
                <div key={index} className="border border-gray-300 p-4 mb-3 rounded-lg">
                    
                    <p className="font-semibold mb-2">Exercise {index + 1}</p>
                    
                    <p>Sets:</p>
                    <input
                        type="number"
                        placeholder="Sets"
                        disabled={!editMode}
                        value={exercise.sets}
                        onChange={(e) => updateExercise(index, "sets", parseInt(e.target.value))}
                        className="border p-2 mr-2 rounded w-20"
                        placeholder="Sets"
                    />
                    <p>Reps:</p>
                    <input
                        type="number"
                        placeholder="Reps"
                        disabled={!editMode}
                        value={exercise.reps}
                        onChange={(e) => updateExercise(index, "reps", parseInt(e.target.value))}
                        className="border p-2 mr-2 rounded w-20"
                        placeholder="Reps"
                    />
                    <p>Rest (secs):</p>
                    <input
                        type="number"
                        placeholder="Rest (seconds)"
                        disabled={!editMode}
                        value={exercise.rest}
                        onChange={(e) => updateExercise(index, "rest", parseInt(e.target.value))}
                        className="border p-2 mr-2 rounded w-20"
                        placeholder="Rest (sec)"
                    />

                   {editMode && (
                    <button onClick={() => removeExercise(index)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200">Remove</button>
                   )}
                </div>
                ))
            )}
            {editMode && (<button onClick={addExercise} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200 mt-4">+ Add Exercise</button>)}
            <br /><br />
            <div className="flex gap-4">
            <button onClick={() => {setPlaylistName(playlist.name); setEditMode(true);}} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200">Edit Playlist</button>
            <button onClick={deletePlaylist} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-200">Delete Playlist</button>
            </div>
            {editMode && (<button onClick={savePlaylist} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200 mt-4">Save Changes</button>)}
            </div>
            </div>
    );
}

export default PlaylistDetailsPage;
