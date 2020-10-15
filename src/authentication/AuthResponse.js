import React, { useEffect } from 'react'

import { gql, useMutation } from '@apollo/client';

const AUTHENTICATE = gql`
  mutation AuthenticateSpotify($code:String!) {
    authenticateSpotify(code: $code) {
      accessToken
      refreshToken
      expiresAt
    }
  }
`

// Check to see if there is already a refresh token when this gets rendered. If so, the user may be navigating weirdly and we don't want to attempt to reset the token.

const AuthResponse = ({ routerProps, saveTokens }) => {

    const spotifyDataString = routerProps.location.search.split("?")[1].split("&")

    const spotifyData = spotifyDataString.reduce((obj, string)=>{
        const [ key, value ] = string.split("=")
        obj[key] = value
        return obj
    }, {})

    const [ authenticate ] = useMutation(AUTHENTICATE, {
        onCompleted: ({authenticateSpotify: data}) => {
            saveTokens(data)
            routerProps.history.push('/')
        }
    })

    useEffect(()=>{
        authenticate({variables: {code: spotifyData.code}})
    }, [])

    return (
        <div>
            Connecting to Spotify...
        </div>
    )
}

export default AuthResponse
