import React, {useState} from "react";
import './SearchBar.css';

function SearchBar() {
    const {query, setQuery} = useState('');

    return (
        <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
    );
}

export default SearchBar;