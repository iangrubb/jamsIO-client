import React from 'react'

import LoginForm from './components/LoginForm'

import { gql, useMutation } from '@apollo/client';


const SIGNUP = gql`
  mutation Signup($username:String!, $password:String!) {
    signup(username:$username, password:$password) {
      user {
        id
        username
      }
      token
    }
  }
`

const Signup = () => {

    const [ signup ] = useMutation(SIGNUP, {
        onCompleted: data => {

        // Handle signup fail case

        const { user, token, authUrl } = data?.signup

            // NEW: Push to spotify url
            //  setSpotifyUrl(authUrl)


            // Wont have to bother setting current user, just set the token and redirect to spotify


        },
        update: (cache, {data: {signup: { user }}}) => {

        // Modify in case of error?
        
        cache.modify({fields: {
            users: (existingUsers = []) => {
            const userRef = cache.writeFragment({
                data: user,
                fragment: gql`
                fragment NewUser on User {
                    id
                    username
                }
                `
            })
            return [...existingUsers, userRef]
            }
        }})
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
