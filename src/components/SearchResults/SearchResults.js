import React from 'react';
import './SearchResults.css'

function SearchResults({ results }) {
    if (results.length === 0) {
        return <p>No results found.</p>;
    }

    return (
        <div className='Results'>
            <ul>
                {results.map(track => (
                    <li key={track.id}>
                        <h3><strong>{track.name}</strong></h3> 
                        <p>{track.artist} | <em>{track.album}</em> <button>+</button></p> 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;