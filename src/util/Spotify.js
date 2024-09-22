let accessToken;
var client_id = '2c2045eba076409ea93090758c1873c9';
var redirect_uri = 'http://localhost:3000';
var scope = 'playlist-modify-private playlist-modify-public';

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
            headers: {Authorization: `bearer ${accessToken}`},
        }) 
        .then(response => response.json())
        .then(jsonResponse => {
            if (!jsonResponse) {
                console.log("Response error")
            }
            return jsonResponse.tracks.items.map(t => ({
                id: t.id,
                name: t.name,
                artist: t.artist[0].name,
                album: t.album.name,
                uri: t.uri,
            }))
        })
    }
};

export { Spotify };