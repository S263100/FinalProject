import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreatePlaylistPage = () => {
    const [playlistName, setPlaylistName] = useState("");
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    //Create new playlist
    const createPlaylist = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5001/api/playlists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: playlistName, exercises }),
        });

        if (res.ok) {
            toast.success("Playlist created successfully!");
            navigate("/playlists");
        } else {
            toast.error("Failed to create playlist.");
        }
    };

    //Add exercise to playlist
    const addExercise = () => {
        setExercises([...exercises, { name: "", sets: 3, reps: 10, rest: 60 }]);
    };

    //Update exercise details
    const updateExercise = (index, field, value) => {
        const updatedExercises = [...exercises];
        updatedExercises[index][field] = value;
        setExercises(updatedExercises);
    };

    //Remove exercise from playlist
    const removeExercise = (index) => {
        const updatedExercises = exercises.filter((_, i) => i !== index);
        setExercises(updatedExercises);
    };

    return (
        <div className="min-h-screen flex justify-center items-start bg-gray-100">
            <div className="w-full max-w-2xl bg-white p-6 mt-10 rounded-xl shadow">
            <h1>Create New Playlist</h1>
            <input
                type="text"
                placeholder="Playlist Name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />
            {exercises.map((exercise, index) => (
                <div key={index} className="border border-gray-300 p-4 mb-3 rounded-lg">
                    
                    <p className="font-semibold mb-2">Exercise {index + 1}</p>
                    
                    <input
                        type="number"
                        placeholder="Sets"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(index, "sets", parseInt(e.target.value))}
                        className="border p-2 mr-2 rounded w-20"
                        placeholder="Sets"
                    />
                    <input
                        type="number"
                        placeholder="Reps"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(index, "reps", parseInt(e.target.value))}
                        className="border p-2 mr-2 rounded w-20"
                        placeholder="Reps"
                    />
                    <input
                        type="number"
                        placeholder="Rest (seconds)"
                        value={exercise.rest}
                        onChange={(e) => updateExercise(index, "rest", parseInt(e.target.value))}
                        className="border p-2 mr-2 rounded w-20"
                        placeholder="Rest (sec)"
                    />

                    <button onClick={() => removeExercise(index)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200">Remove</button>
                </div>
            ))}
            <button onClick={addExercise} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-500 transition-colors duration-200">+ Add Exercise</button>

            <br /><br />

            <button onClick={createPlaylist} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200">Create Playlist</button>
        </div>
        </div>
    );
};

export default CreatePlaylistPage;