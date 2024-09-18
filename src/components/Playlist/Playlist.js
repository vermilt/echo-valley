import React, {useState} from "react";
import './Playlist.css';

function Playlist () {
    const [name, setName] = useState('')
    const [playlist, setPlaylist] = useState([])

    return (
        <div>
            <input
            type="text"
            placeholder="Playlist Name"
            value={name}
            onChange={e => setName(e.target.value)}
            />
        </div>
    );
}

export default Playlist;