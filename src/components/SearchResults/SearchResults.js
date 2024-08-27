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
                        <strong>{track.name}</strong> | {track.artist} | <em>{track.album}</em> <button>+</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchResults;