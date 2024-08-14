import React, {useState} from "react";
import './SearchBar.css';

function SearchBar() {
    const {query, setQuery} = useState('');

    return (
        <div>
            <label>Search</label>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;