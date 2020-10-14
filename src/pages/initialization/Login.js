import React from 'react'

import { gql, useQuery, useMutation } from '@apollo/client';

import LoginForm from './components/LoginForm'

const LOGIN = gql`
  mutation Login($username:String!, $password:String!) {
    login(username:$username, password:$password) {
      user {
        id
        username
      }
      token
    }
  }
`

const Login = () => {

    const [ login ] = useMutation(LOGIN, {
        onCompleted: ({login: {token, user, authUrl}}) => {
    
          // Handle login fail case
    
        //   localStorage.setItem('login-token', token)

            // NEW: redirect using url
        //   setSpotifyUrl(authUrl)



        // Wont have to bother setting current user, just set the token and redirect to spotify


        }
    })

    return (
        <div>
            <h2>Login</h2>
            <LoginForm submitHandler={login} />
        </div>
    )
}

export default Login
