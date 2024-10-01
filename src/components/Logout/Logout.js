import React, {useState, useEffect} from "react";
import { Spotify } from "../../util/Spotify";

function Logout({onLogout}) {

    const [isLoggedIn, setIsLoggedIn] = useState('');

    useEffect(() => {
        const checkLoginStatus = () => {
            const accessToken = localStorage.getItem('spotify_access_token');
            const tokenExpiryTime = localStorage.getItem('spotify_token_expiry_time');
            
            if (accessToken && new Date().getTime() < tokenExpiryTime) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();

        // Re-run the check on logout
        window.addEventListener("storage", checkLoginStatus);
        return () => window.removeEventListener("storage", checkLoginStatus);

    }, []);

    const handleLogout = () => {
        Spotify.logout();  // Clear Spotify token and redirect
        setIsLoggedIn(false);
        if (onLogout) {
            onLogout(); // Call the onLogout function if provided
        }
    };

    return (
        <div>
            {isLoggedIn && (
                <button onClick={handleLogout}>Logout</button>
            )}
        </div>
        
    );
}

export default Logout;