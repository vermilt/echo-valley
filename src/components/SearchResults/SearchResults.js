import React from 'react';

function SearchResults({ results }) {
    if (results.length === 0) {
        return <p>No results found.</p>;
    }

    return (
        <ul>
            {results.map(track => (
                <li key={track.id}>
                    <strong>{track.name}</strong> by {track.artist} from the album <em>{track.album}</em>
                </li>
            ))}
        </ul>
    );
}

export default SearchResults;