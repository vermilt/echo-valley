let accessToken;
var client_id = '2c2045eba076409ea93090758c1873c9';
var redirect_uri = 'https://vermilt.github.io/echo-valley/callback';
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

        // Check if the token is in the URL (if the user just authenticated)
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

            // clears URL of token information
            window.history.pushState("Access token", null, "/");
            return accessToken;
        }

        // If no token is available, initiate authorization
        this.redirectToSpotifyLogin();
    },

    redirectToSpotifyLogin() {
        const url = 'https://accounts.spotify.com/authorize';
        const authUrl = `${url}?response_type=token&client_id=${encodeURIComponent(client_id)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
        window.location = authUrl;
    },
    

    async search(query) { 
        try {
            accessToken = await Spotify.getAccessToken();
    
            if (!accessToken) {
                console.error("No Access Token available");
                return [];
            }
    
            const response = await fetch(`https://api.spotify.com/v1/search?type=track%2Cartist%2Calbum&q=${query}`, {
                method: 'GET',
                headers: {Authorization: `Bearer ${accessToken}`},
            });
    
            if (!response.ok) {
                if (response.status === 401) {
                    // If unauthorized (token expired), trigger re-authentication
                    console.log("Token expired, redirecting to login...");
                    this.redirectToSpotifyLogin();
                }
                throw new Error('Failed to fetch from Spotify API');
            }
    
            const jsonResponse = await response.json();
    
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
        } catch (error) {
            console.error("Error fetching Spotify data:", error);
        }
    },
    

    async save(uris, playlistName)  {
        /** To save a Playlist, we must get the current users Spotify ID, 
         * then use their Spotify Id to create a playlist and get the playlist ID,
         * then add the track URIs to the playlist ID
         */

        accessToken = await Spotify.getAccessToken();

        console.log("Saving playlist with name:", playlistName);
        console.log("Track URIs to save:", uris);

        let user_id = {};
        let playlist_id = {};
        
        // Call to receive User ID
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

        // Save the returned ID to user_id
        .then(data => {
            console.log("User Info fetched:", data);
            user_id = data.id;
            
            // Create a playlist on the users account and setting the playlist name
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
        // Save the playlist ID to a variable
        .then(data => {
            console.log("Playlist created:", data);
            playlist_id = data.id;

            // Add uris to the playlist
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

    /* Feature removed and created in own component, later removed
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
        }, 500); 
    },
    */
    
    // Previous notes left under
        
    // Fetch get request to obtain user ID at https://api.spotify.com/v1/me, save as var
    // To create a new playlist, you will need to make a POST request to the /v1/users/{user_id}/playlists endpoint.
    // Set name of playlist
    // To add tracks to the new playlist, you will need to make a POST request 
    // to the //v1/users/{user_id}/playlists/{playlist_id}/tracks
    // You can provide a list of track IDs in the request body to add them to the playlist.


export { Spotify };