import React, { useState, useEffect } from 'react'

import { gql, useMutation } from '@apollo/client';

import { getLoginToken, clearTokens } from './tokenHandlers'

const AUTO_LOGIN = gql`
  mutation AutoLogin {
    autoLogin {   
        id
        username
    }
  }
`

const useCurrentUser = (makeTokensUnavailable) => {

    const foundLoginToken = !!localStorage.getItem('login-token')

    const [ userFetch, setUserFetch ] = useState({userLoading: foundLoginToken, user: null})

    const [ autoLogin ] = useMutation(AUTO_LOGIN, {
        onCompleted: ({autoLogin: user }) => {
            // Handle case for user not found
            setUserFetch({userLoading: false, user})
        }  
    })
    
    useEffect(() => {
        const loginToken = getLoginToken()

        if (loginToken) {
            autoLogin()
        }
    }, [])

    const logout = () => {
        clearTokens()
        makeTokensUnavailable()
        setUserFetch({userLoading: false, user: null})
    }

    return { ...userFetch , logout }

}

export default useCurrentUser