import React, { useState, useEffect } from 'react'

const Player = () => {

    const [ player, setPlayer ] = useState(null)

    const token = ``

    useEffect(() => {

        const checkForPlayer = setInterval(() => {
            if (window.Spotify) {

                const player = new window.Spotify.Player({
                    name: "jamsIO",
                    getOAuthToken: cb => { cb(token); },
                });

                // Error handling
                player.addListener('initialization_error', ({ message }) => { console.error('initialization_error', message); });
                player.addListener('authentication_error', ({ message }) => { console.error('authentication_error', message); });
                player.addListener('account_error', ({ message }) => { console.error('account_error', message); });
                player.addListener('playback_error', ({ message }) => { console.error('playback_error', message); });

                // Playback status updates
                player.addListener('player_state_changed', state => { console.log('player_state_changed', state); });

                // Ready
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.connect()

                setPlayer(player)

                clearInterval(checkForPlayer)
            } 
        }, 1000)

    }, [])

    const playSong = ({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken,
            id
          }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      };

    return (
        <div>
            <button onClick={()=>playSong({playerInstance: player, spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr'})}>TEST</button>
            {player ? "Yes" : "No"}
        </div>
    )
}

export default Player
