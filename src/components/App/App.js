import React, {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { tracks } from '../Track/Track';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState([]);


    const handleSearch = () => {

      if (query.trim() === '') {
        setShowResults([]);
        return;
      }

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
        <h1>echoValley</h1>
      </header>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch}/>
      <body className='Lists'>
        <div className='Search-Results'>
          <h2>Results</h2>
          <SearchResults results={showResults} />
        </div>
        <div className='Playlist'>
          <Playlist />
        </div>
      </body>
    </div>
  );
}

export default App;
