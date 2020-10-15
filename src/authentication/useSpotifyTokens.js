
import { useEffect, useState } from 'react'

import { useStateWithCallbackLazy } from 'use-state-with-callback';

import { gql, useMutation } from '@apollo/client';

import { getAccessToken, getAccessTokenExpiration, getRefreshToken, refreshSpotifyTokens, setSpotifyTokens } from './tokenHandlers'

const REFRESH = gql`
    mutation RefreshSpotify($token: String!){
        refreshSpotify(token: $token) {
            accessToken
            expiresAt
        }
    }
`

const useSpotifyTokens = () => {

    const refreshToken = getRefreshToken()

    const expiration = getAccessTokenExpiration()
    const expirationBuffer = 5 * 60 * 1000
    const refreshAfter = expiration - Date.now() - expirationBuffer

    const needInitialRefresh = refreshAfter <= 0 && !!refreshToken

    const [ tokensAvailable, setTokensAvailable ] = useState(!!refreshToken && !needInitialRefresh)
    
    const [ initialRefresh ] = useMutation(REFRESH, {onCompleted: ({refreshSpotify: data}) => {
        console.log("init", data)
        refreshSpotifyTokens(data)
        setTokensAvailable(true)
    }})

    useEffect(() => {
        if (needInitialRefresh) {
            initialRefresh({variables: { token: getRefreshToken()}})
        }
    }, [initialRefresh])




    const [ refreshTimeout, setRefreshTimeout ] = useStateWithCallbackLazy("NONE")

    const [ refresh ] = useMutation(REFRESH, {onCompleted: ({refreshSpotify: data}) => {
        refreshSpotifyTokens(data)
        setRefreshTimeout("NONE")
    }})

    useEffect(() => {

        if (tokensAvailable && refreshTimeout === "NONE") {

            const expiration = getAccessTokenExpiration()
            const expirationBuffer = 5 * 60 * 1000
            const refreshAfter = expiration - Date.now() - expirationBuffer
           
            const timeoutId = setTimeout(() => {
                
                setRefreshTimeout(timeoutId, ()=>{
                    refresh({variables: { token: getRefreshToken()}})
                })
            }, refreshAfter)
            console.log("Set refresh timer for ", refreshAfter / 1000 , " seconds")
            
        } else if (!tokensAvailable && refreshTimeout !== "NONE" ) {
            clearTimeout(refreshTimeout)
            setRefreshTimeout("NONE")
        }

        return () => {
            if (refreshTimeout !== "NONE") {
                clearTimeout(refreshTimeout)
            }
        }
    }, [tokensAvailable, refreshTimeout, refresh])

    const saveTokens = tokens => {
        setSpotifyTokens(tokens)
        setTokensAvailable(true)
    }

    const makeTokensUnavailable = () => {
        setTokensAvailable(false)
    }

    return { tokensAvailable, saveTokens, makeTokensUnavailable }

}

export default useSpotifyTokens
