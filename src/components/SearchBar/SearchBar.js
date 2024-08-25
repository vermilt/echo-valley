import React, {useState} from "react";
import './SearchBar.css';


function SearchBar({ query, setQuery, onSearch }) {
   
    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSearch = () => {
        onSearch();
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
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;