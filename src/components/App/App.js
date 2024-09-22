import React, {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { tracks } from '../Track/Track';
import './App.css';
import { Spotify } from '../../util/Spotify';

function App() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState([])
  const [playlistName, setPlaylistName] = useState(['New Playlist'])

    const handleSearch = () => {

      if (query.trim() === '') {
        setShowResults([]);
        return;
      }
      // stops all tracks being displayed if input is empty by setting setShowResults as empty array

      const filteredTracks = tracks.filter(track =>
        track.name.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
    );
      setShowResults(filteredTracks);
    };
      // filters tracks array to show values that only include query text

    const handleAdd = (track) => {
      if (showPlaylist.find(newTrack => newTrack.id === track.id)) {
        return;
      }
      // checks if track already exists in showPlaylist, if so then does nothing

      setShowPlaylist([
        ...showPlaylist,
        track
      ]);
    };

    const handleRemove = (track) => {
      setShowPlaylist(showPlaylist.filter(keepTrack => {
        return keepTrack.id !== track.id;
      }));
    };
      // sets setShowPlaylist to filter out removed track

    const savePlaylist = () => {
      const uris = showPlaylist.map(track => track.uri);

      console.log(uris);
        // spotify logic needed

      setShowPlaylist([]);
          // resets playlist after save
      setPlaylistName('New Playlist')
          // resets playlist name after save
      }
      
      // savePlaylist function should take the uri of each track in showPlaylist and add them to a new array
      // after playlist has been saved to Spotify, web app playlist should be reset
      // 1. Create savePlaylist funtion in App
      // 2. Creates variable, map playlistTracks.uri property
      // 3. Pass onSave as prop into Playlist.js add onSave to button
      // 4. Playlist component onSave{savePlaylist}
    

  return (
    <div className="App">

      <header className="App-header">
        <h1>echoValley</h1>
      </header>

      <SearchBar 
        query={query} 
        setQuery={setQuery} 
        onSearch={handleSearch}
      />

      <body className='Lists'>
        <div className='Search-Results'>
          
          <SearchResults 
            results={showResults} 
            onAdd={handleAdd}
          />

        </div>

        <div className='Playlist'>

          <Playlist 
            playlistTracks={showPlaylist} 
            onRemove={handleRemove}
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            onSave={savePlaylist}
          />

        </div>
      </body>
    </div>
  );
}

export default App;
