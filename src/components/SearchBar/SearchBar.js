import React from "react";
import './SearchBar.css';


function SearchBar({ query, setQuery, onSearch }) {
   
    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSearch = () => {
        onSearch();
    }

    return (
        <div className="Search" role="search">
            <form>
                <input
                    type="text"
                    placeholder="Find a song..."
                    value={query}
                    onChange={handleChange}
                />
                <button type="submit" onClick={handleSearch}>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;