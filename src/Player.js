import React, { useState, useEffect } from 'react'

const Player = () => {

    const [ player, setPlayer ] = useState(null)

    const token = "To Get"

    useEffect(() => {

        const checkForPlayer = setInterval(() => {
            if (window.Spotify) {

                const player = new window.Spotify.Player({
                    name: "jamsIO",
                    getOAuthToken: cb => { cb(token); },
                });

                player.connect()

                setPlayer(player)

                clearInterval(checkForPlayer)
            } 
        }, 1000)

    }, [])

    return (
        <div>
            {player ? "Yes" : "No"}
        </div>
    )
}

export default Player
