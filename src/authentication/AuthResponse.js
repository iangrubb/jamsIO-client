import React, { useEffect } from 'react'

import { gql, useMutation } from '@apollo/client';

import { setSpotifyTokens } from './spotifyTokens'

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

const AuthResponse = ({ routerProps }) => {

    const spotifyData = routerProps.location.search.split("?")[1].split("&").reduce((obj, string)=>{
        const [ key, value ] = string.split("=")
        obj[key] = value
        return obj
    }, {})

    const [ authenticate ] = useMutation(AUTHENTICATE, {
        onCompleted: ({authenticateSpotify: data}) => {
            setSpotifyTokens(data)
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
