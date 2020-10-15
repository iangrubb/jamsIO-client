import React from 'react'

import { gql, useMutation } from '@apollo/client';

import { setLoginToken } from '../../authentication/tokenHandlers'

import LoginForm from './components/LoginForm'

const LOGIN = gql`
  mutation Login($username:String!, $password:String!) {
    login(username:$username, password:$password) {
      token
      authUrl
    }
  }
`

const Login = () => {

    const [ login ] = useMutation(LOGIN, {
        onCompleted: ({login: {token, authUrl}}) => {
      
          // Handle login fail cases

          setLoginToken(token)
          window.location.href = authUrl
    
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
