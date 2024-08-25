import React, {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import { tracks } from '../Track/Track';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState([]);


    const handleSearch = () => {

      const filteredTracks = tracks.filter(track =>
        track.name.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
    );
      setShowResults(filteredTracks);
    };

  return (
    <div className="App">
      <header className="App-header">
        <p>echoValley</p>
      </header>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch}/>
      <SearchResults results={showResults} />
    </div>
  );
}

export default App;
