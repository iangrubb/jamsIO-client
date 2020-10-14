
import React, { useState } from 'react'

import { gql, useMutation } from '@apollo/client';



const REFRESH = gql`
    mutation RefreshSpotify($token: String!){
        refreshSpotify(token: $token) {
            accessToken
            expiresAt
        }
    }
`


const useSpotifyTokens = () => {

    // Should expose a function to say that new tokens are available, which can be called from the authResponse component



    // const [ refreshToken ] = useMutation(REFRESH, {onCompleted: console.log})




    // All of this should only happen when there's actually a user logged in.



    // On load, check to see whether there are the right tokens in local storage.

    // If so, set a timeout to refresh them at the right time.

    // When the timeout triggers, it should change state and hit the use effect again, setting a new trigger.

    // Make sure to clear timer on dismount or on logout.

    // Return value of stored tokens, ability to log in to spotify, abilty to log out of spotify.



}

export default useSpotifyTokens
