import React from "react";
import './SearchBar.css';


function SearchBar({ query, setQuery, onSearch }) {
   
    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };


    const handleSearch = () => {
        onSearch();
    }

    return (
        <div className="Search" role="search">
            
                <input
                    type="text"
                    placeholder="Find a song..."
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button type="submit" onClick={handleSearch}>Search</button>
            
        </div>
    );
}

export default SearchBar;