const ExerciseEditor = ({ editExercises, setEditExercises, editMode }) => {

    const addExercise = () => {
        setEditExercises([...editExercises, { name: "", sets: "3", reps: "10", rest: "60" }]);
    };

    const updateExercise = (index, field, value) => {
        const updatedExercises = [...editExercises];
        updatedExercises[index][field] = value;
        setEditExercises(updatedExercises);
    };

    const removeExercise = (index) => {
        const updatedExercises = editExercises.filter((_, i) => i !== index);
        setEditExercises(updatedExercises);
    };

    return (
        <div>
            {editExercises.length === 0 ? (
                    <p className="text-gray-600 mt-4">No exercises in this playlist.</p>
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
                        value={exercise.restSeconds}
                        onChange={(e) => updateExercise(index, "restSeconds", parseInt(e.target.value))}
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
            </div>
    )
}

export default ExerciseEditor