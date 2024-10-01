let accessToken;
var client_id = '2c2045eba076409ea93090758c1873c9';
var redirect_uri = 'http://localhost:3000/callback';
var scope = 'playlist-modify-private playlist-modify-public user-read-private user-read-email';

const Spotify = {
    async getAccessToken() {

        // checks if token is set
        if (accessToken) return accessToken;

        // checks local storage for token
        const storedAccessToken = localStorage.getItem('spotify_access_token');
        const tokenExpiryTime = localStorage.getItem('spotify_token_expiry_time');

        // If the token exists in localStorage and hasn't expired, use it
        if (storedAccessToken && new Date().getTime() < tokenExpiryTime) {
            accessToken = storedAccessToken;
            return accessToken;
        }

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            // sets the token and expiry time vars
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]) * 1000; // Convert to milliseconds
            const expiryTimeStamp = new Date().getTime() + expiresIn;

            // Stores token and expiry time in localStorage
            localStorage.setItem('spotify_access_token', accessToken);
            localStorage.setItem('spotify_token_expiry_time', expiryTimeStamp);

            // clears URL
            window.history.pushState("Access token", null, "/")
            return accessToken;
        }

        var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        window.location = url;
    },

    async search(query) { 

        accessToken = await Spotify.getAccessToken();

        if (!accessToken) {
            console.error("No access Access Token available");
            return [];
        }

        return fetch(`https://api.spotify.com/v1/search?type=track%2Cartist%2Calbum&q=${query}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${accessToken}`},
        })
        .then(response => {
            if (!response.ok) {
                console.error('Failed to fetch from Spotify API:', response.status, response.statusText);
                throw new Error('Failed to fetch from Spotify API');
            }
            return response.json();
        })
        .then(jsonResponse => {
            console.log("Search API response:", jsonResponse);
            if (!jsonResponse || !jsonResponse.tracks) {
                console.log("No tracks found");
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));
        })
        .catch(error => {
            console.error("Error fetching Spotify data:", error);
        });
    },

    async save(uris, playlistName)  {

        accessToken = await Spotify.getAccessToken();

        console.log("Saving playlist with name:", playlistName);
        console.log("Track URIs to save:", uris);

        let user_id = {};
        let playlist_id = {};
        ;

        console.log(accessToken);
        return fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {Authorization: `Bearer ${accessToken}`},
        }) 
        .then(response => {
            if (!response.ok) {
                console.error('Failed to fetch User info from Spotify API:', response.status, response.statusText);
                throw new Error('Failed to fetch User info from Spotify API');
            }
            return response.json();
        })
        .then(data => {
            console.log("User Info fetched:", data);
            user_id = data.id;

            return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                method: 'POST',
                headers: {Authorization: `Bearer ${accessToken}`},
                body: JSON.stringify({
                    "name": playlistName,
                    "description": "New playlist description",
                    "public": false
                },),
            })
        })
        .then(response => {

            if (!response.ok) {
                console.error('Failed to create playlist:', response.status, response.statusText);
                throw new Error('Failed to create playlist:');
            }
            
            return response.json();
            
        })
        .then(data => {
            console.log("Playlist created:", data);
            playlist_id = data.id;

            return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                method: 'POST',
                headers: {Authorization: `Bearer ${accessToken}`},
                body: JSON.stringify({
                    "uris": uris,
                },),
            })
        })
        .then(response => {

            if (!response.ok) {
                console.error('Failed to add tracks to playlist:', response.status, response.statusText);
                throw new Error('Failed to add tracks to playlist');
            }
            
            return response.json();
        })
        .then(jsonResponse => {
            console.log("Tracks added to playlist:", jsonResponse);
        })
        .catch(error => {
            console.error("Error saving playlist:", error);
        });
    },
};

    /*
    logout() {

        // Clear the access token from localStorage and the in-memory variable
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_token_expiry_time');
        accessToken = null;
    
        // Add debugging to confirm removal
        console.log("Access token cleared:", localStorage.getItem('spotify_access_token') === null);
    
        // Force a re-render by changing state if necessary
        window.location = 'https://accounts.spotify.com/logout';
        setTimeout(() => {
            window.location = '/'; // Redirect to your app's home page after logging out of Spotify
        }, 500); // Adjust the delay as needed
    },
    */
    
        
    // Fetch get request to obtain user ID at https://api.spotify.com/v1/me, save as var
    // To create a new playlist, you will need to make a POST request to the /v1/users/{user_id}/playlists endpoint.
    // Set name of playlist
    //vTo add tracks to the new playlist, you will need to make a POST request 
    // to the //v1/users/{user_id}/playlists/{playlist_id}/tracks
    // You can provide a list of track IDs in the request body to add them to the playlist.


export { Spotify };