let accessToken;
var client_id = '2c2045eba076409ea93090758c1873c9';
var redirect_uri = 'http://localhost:3000/callback';
var scope = 'playlist-modify-private playlist-modify-public user-read-private user-read-email';

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            // sets the token and expiry time vars
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            // sets a function that resets the token when expired
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            // clear URL
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

    search(query) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track%2Cartist%2Calbum&q=${query}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${accessToken}`},
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch from Spotify API');
            }
            return response.json();
        })
        .then(jsonResponse => {
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

    save() {
        let user_id = {};
        accessToken = Spotify.getAccessToken();
        return fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {Authorization: `Bearer ${accessToken}`},
        }) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch User info from Spotify API');
            }
            return response.json();
        })
        .then(jsonResponse => {
            user_id = jsonResponse.id;
        

            return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
                method: 'POST',
                headers: {Authorization: `Bearer ${accessToken}`},
                body: JSON.stringify({
                    "name": this.playlistName,
                    "description": "New playlist description",
                    "public": false
                },),
            })
        })
        
    },
        
    // Fetch get request to obtain user ID at https://api.spotify.com/v1/me, save as var
    // To create a new playlist, you will need to make a POST request to the /v1/users/{user_id}/playlists endpoint.
    // Set name of playlist
    //vTo add tracks to the new playlist, you will need to make a POST request 
    // to the //v1/users/{user_id}/playlists/{playlist_id}/tracks
    // You can provide a list of track IDs in the request body to add them to the playlist.
};

export { Spotify };