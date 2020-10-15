import React from 'react'

import LoginForm from './components/LoginForm'

import { gql, useMutation } from '@apollo/client';

import { setLoginToken } from '../../authentication/tokenHandlers'


const SIGNUP = gql`
  mutation Signup($username:String!, $password:String!) {
    signup(username:$username, password:$password) {
      token
      authUrl
    }
  }
`

const Signup = () => {

    const [ signup ] = useMutation(SIGNUP, {
        onCompleted: ({signup: { token, authUrl}}) => {

        // Handle signup fail case (non-unique name)
          setLoginToken(token)
          window.location.href = authUrl


        }
    })


    return (
        <div>
            <h2>Sign up</h2>
            <LoginForm submitHandler={signup} />
        </div>
    )
}

export default Signup
