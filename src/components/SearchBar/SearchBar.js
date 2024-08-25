import React, {useState} from "react";
import './SearchBar.css';
import SearchResults from "../SearchResults/SearchResults";

function SearchBar({ query, setQuery }) {
   
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