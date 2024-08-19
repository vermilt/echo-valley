import React, {useState} from "react";
import { tracks } from "../Track/Track";
import './SearchBar.css';

function SearchBar() {
    const [query, setQuery] = useState('');

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
        </div>
    );
}

export default SearchBar;