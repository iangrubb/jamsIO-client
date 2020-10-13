import React, { useState, useEffect } from 'react';

import styled from 'styled-components'

import Player from './Player'

import { gql, useQuery, useMutation } from '@apollo/client';

import { Switch, Route } from 'react-router-dom'

import AuthResponse from './authentication/AuthResponse'

const USERS_QUERY = gql`
  query {
    users {
      id
      username
    }
  }
`

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

function App() {

  const { data , loading, error } = useQuery(USERS_QUERY)
  
  const [ currentUser, setCurrentUser ] = useState(null)

  const [ spotifyUrl, setSpotifyUrl ] = useState(null) 


  // Auto login logic

  const [ autoLogin ] = useMutation(AUTO_LOGIN, {
    onCompleted: ({autoLogin: { user, authUrl }}) => {
      setSpotifyUrl(authUrl)
      setCurrentUser(user)
    }  
  })
  
  useEffect(() => {
    const loginToken = localStorage.getItem('login-token')

    // On failure, clear localstorage

    if (loginToken) {
      autoLogin({variables: {token: loginToken}})
    }
  }, [])


  // Manual login logic

  const [ login ] = useMutation(LOGIN, {
    onCompleted: ({login: {token, user, authUrl}}) => {

      // Handle login fail case

      localStorage.setItem('login-token', token)
      setSpotifyUrl(authUrl)
      setCurrentUser(user)
    }
  })

  const defaultLogin = {username: "", password: ""}

  const [ loginState, setLoginState ] = useState(defaultLogin)

  const updateLoginForm = e => setLoginState({...loginState, [e.target.name]: e.target.value})

  const submitLogin = e => {
    e.preventDefault()
    login({variables: loginState})
    setLoginState(defaultLogin)
  }



  // Signup logic

  const [ signup ] = useMutation(SIGNUP, {
    onCompleted: data => {

      // Handle signup fail case

      const { user, token, authUrl } = data?.signup
      setSpotifyUrl(authUrl)
      setCurrentUser(user)
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

  const defaultSignup = {username: "", password: ""}

  const [ signupState, setSignupState ] = useState(defaultSignup)

  const updateSignupForm = e => setSignupState({...signupState, [e.target.name]: e.target.value})

  const submitSignup = e => {
    e.preventDefault()
    signup({variables: signupState})
    setSignupState(defaultSignup)
  }


  return (
    <div>
      <Switch>

        <Route path="/authentication-response" render={routerProps => <AuthResponse routerProps={routerProps}/>} />

        <Route path="/" render={ routerProps => (
          <>
            <NameList>
            {data?.users.map(user => <Name key={user.id} current={user.id === currentUser?.id}>{user.username}</Name>)}
            </NameList>
      
            {currentUser ?
            <Box>
              <h3>Current User Info</h3>
              <p>{currentUser.username}</p>
              <button>Log Out</button>
      
              <h4>Spotify Account Connection</h4>
      
              <a href={spotifyUrl}>Connect</a>
            </Box>
            : null}
            
            <Box>
              <h2>Sign Up</h2>
              <form onSubmit={submitSignup}>
                <label>Name</label>
                <input name="username" type="textfield" value={signupState.username} onChange={updateSignupForm} />
                <label>Password</label>
                <input name="password" type="password" value={signupState.password} onChange={updateSignupForm} />
                <input type="submit"/>
              </form>
            </Box>
      
            <Box>
              <h2>Log In</h2>
              <form onSubmit={submitLogin}>
                <label>Name</label>
                <input name="username" type="textfield" value={loginState.username} onChange={updateLoginForm} />
                <label>Password</label>
                <input name="password" type="password" value={loginState.password} onChange={updateLoginForm} />
                <input type="submit"/>
              </form>
            </Box>
          </>
        )}/>
      </Switch>



      

      

    </div>
  );
}

export default App;

const NameList = styled.ul`
  margin: 2rem auto;
  width: fit-content;
`

const Name = styled.li`
  font-weight: ${props => props.current ? 700 : 400};
`

const Box = styled.div`
  margin: 2rem auto;
  background: #eee;
  border-radius: 16px;
  padding: 1rem;

  width: 400px;

  & form {
    display: flex;
    flex-direction: column;
  }

  & form * {
    margin: 0 0 0.4rem 0;
  }

`
