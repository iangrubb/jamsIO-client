import React, { useState, useEffect } from 'react'

import { gql, useMutation } from '@apollo/client';

const AUTO_LOGIN = gql`
  mutation AutoLogin($token: String!){
    autoLogin(token:$token) {  
      user {
        id
        username
      }
      authUrl  
    }
  }

`

const useCurrentUser = () => {

    const foundLoginToken = !!localStorage.getItem('login-token')

    const [ userFetch, setUserFetch ] = useState({loading: foundLoginToken, user: null})

    const [ autoLogin ] = useMutation(AUTO_LOGIN, {
        onCompleted: ({autoLogin: { user, authUrl }}) => {
    
        // setCurrentUser(user)
        }  
    })
    
    useEffect(() => {
        const loginToken = localStorage.getItem('login-token')

        // On failure, clear localstorage

        if (loginToken) {
            autoLogin({variables: {token: loginToken}})
        }
    }, [])




   


    const logout = () => {
         // Clear current user state
        // Clear all tokens, including those from spotify

    }


    return { user: userFetch.user, loading: userFetch.loading, logout }
    




}

export default useCurrentUser