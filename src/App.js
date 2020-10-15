import React from 'react';

import styled from 'styled-components'

import { Switch, Route, Redirect } from 'react-router-dom'

import AuthResponse from './authentication/AuthResponse'

import useCurrentUser from './authentication/useCurrentUser'
import useSpotifyTokens from './authentication/useSpotifyTokens'

import Landing from './pages/initialization/Landing'
import Login from './pages/initialization/Login'
import Signup from './pages/initialization/Signup'



function App() {

  const { tokensAvailable, saveTokens, makeTokensUnavailable } = useSpotifyTokens()

  const { user, userLoading, logout } = useCurrentUser(makeTokensUnavailable)

  const determineAccess = () => {
    if (user && tokensAvailable) {
      return <div>
        <button onClick={logout}>logout</button>
      </div> 
    } else if (!user && !userLoading) {
      return <Redirect to="/welcome" />
    } else {
      return <div>Loading...</div>
    }
  }

  console.log({ user, userLoading, tokensAvailable })

  return (
    <div>
      <Switch>

        <Route path="/authentication-response" render={routerProps =>
          <AuthResponse routerProps={routerProps} saveTokens={saveTokens} />
        }/>

        <Route path="/welcome" component={Landing} />

        <Route path="/login" component={Login} />

        <Route path="/signup" component={Signup} />

        <Route path="/" render={determineAccess}/>

      </Switch>

    </div>
  );
}

export default App;

