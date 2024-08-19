import SearchBar from '../SearchBar/SearchBar';
import './App.css';
import { tracks } from '../Track/Track';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>echoValley</p>
      </header>
      <SearchBar tracks={tracks}/>
    </div>
  );
}

export default App;
