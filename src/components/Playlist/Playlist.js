import React from "react";
import './Playlist.css';

function Playlist ({ playlistTracks, onRemove, playlistName, setPlaylistName, onSave }) {
    // const [name, setName] = useState('New Playlist')
    

    return (
        <div>
            <input
            type="text"
            // placeholder="New Playlist" not needed as default state used
            value={playlistName}
            onChange={e => setPlaylistName(e.target.value)}
            />
            <ul>
                {playlistTracks.map(track => (
                    <li key={track.id}>
                        <h3><strong>{track.name}</strong></h3><button onClick={() => onRemove(track) }>-</button>
                        <p>{track.artist} | <em>{track.album}</em> </p> 

                        {track.preview_url ? (
                            <audio controls>
                                <source src={track.preview_url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        ) : (
                            <p>No preview available</p>
                        )}
                        
                    </li>
                ))}
            </ul>
            <button className="Save" onClick={onSave}>Save to Spotify</button>
        </div>
        
    );
}

export default Playlist;