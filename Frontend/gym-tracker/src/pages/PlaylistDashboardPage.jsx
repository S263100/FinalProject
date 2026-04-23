import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const playlistDashboardPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [searchPlaylist, setSearchPlaylist] = useState("");
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

    const filteredPlaylists = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchPlaylist.toLowerCase())
    );
    
    return (
        <div className="p-5">
            <h1 className="font-bold text-4xl">Playlist Dashboard</h1>

            <div className="my-5">
                <input 
                    type="text" 
                    placeholder="Search Playlists..." 
                    value={searchPlaylist} 
                    onChange={(e) => setSearchPlaylist(e.target.value)} 
                    className="p-2 w-[300px] mr-2"
                /> 
                <button onClick={() => navigate("/playlists/create")} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200">
                    Create Playlist
                </button>
            </div>

            {filteredPlaylists.length === 0 ? (
                <p className="text-gray-600 mt-4">No playlists found. Create one to get started!</p>
            ) : (
                filteredPlaylists.map((playlist) => (
                    <div 
                        key={playlist._id}
                        onClick={() => navigate(`/playlists/${playlist._id}`)}
                        className="p-2.5 my-2.5 border border-grey-300 cursor-pointer"
                    >
                        <h3>{playlist.name}</h3>
                    </div>
                ))
            )}
        </div>
    )
}

export default playlistDashboardPage;