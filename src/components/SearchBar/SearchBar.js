import React, {useState} from "react";
import { tracks } from "../Track/Track";
import './SearchBar.css';
import SearchResults from "../SearchResults/SearchResults";

function SearchBar({tracks}) {
    const [query, setQuery] = useState('');

    const filteredTracks = tracks.filter(track =>
        track.name.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
    );

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    return (
        <div className="Search">
            <label>Search</label>
            <input
                type="text"
                placeholder="Find a song..."
                value={query}
                onChange={handleChange}
            />
            {query && <SearchResults results={filteredTracks} />}
        </div>
    );
}

export default SearchBar;