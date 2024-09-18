import React, {useState} from "react";
import './Playlist.css';

function Playlist ({ playlistTracks, onRemove }) {
    const [name, setName] = useState('New Playlist')
    

    return (
        <div>
            <input
            type="text"
            placeholder="New Playlist"
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <ul>
                {playlistTracks.map(track => (
                    <li key={track.id}>
                        <h3><strong>{track.name}</strong></h3> 
                        <p>{track.artist} | <em>{track.album}</em> <button onClick={() => onRemove(track) }>-</button></p> 
                    </li>
                ))}
            </ul>
        </div>
        
    );
}

export default Playlist;