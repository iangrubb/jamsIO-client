import React, { useEffect } from 'react'

import { gql, useMutation } from '@apollo/client';

const AUTHENTICATE = gql`
  mutation AuthenticateSpotify($code:String!) {
    authenticateSpotify(code: $code) {
      accessToken
      refreshToken
      expiresIn
    }
  }
`

const AuthResponse = ({ routerProps }) => {

    const spotifyData = routerProps.location.search.split("?")[1].split("&").reduce((obj, string)=>{
        const [ key, value ] = string.split("=")
        obj[key] = value
        return obj
    }, {})

    const [ authenticate ] = useMutation(AUTHENTICATE, {
        onCompleted: resp => {
            console.log(resp)
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
