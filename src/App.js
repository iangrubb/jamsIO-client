import React, { useState, useEffect } from 'react';

import styled from 'styled-components'

import { Switch, Route, Redirect } from 'react-router-dom'

import AuthResponse from './authentication/AuthResponse'

import { getAccessToken, getRefreshToken, clearSpotifyTokens } from './authentication/spotifyTokens'

import useCurrentUser from './authentication/useCurrentUser'
import useSpotifyTokens from './authentication/useSpotifyTokens'

import Landing from './pages/initialization/Landing'
import Login from './pages/initialization/Login'
import Signup from './pages/initialization/Signup'



function App() {

  const { user, userLoading, logout } = useCurrentUser()

  const { tokensAvailable, saveTokens } = useSpotifyTokens()

  // We actually need three states:
    // Main App: user exists and tokens available
    // Redirect: no user and user isn't loading
    // Loading: all other cases
  
  const determineAccess = () => {
    if (user && tokensAvailable) {
      return <div>All the content</div> 
    } else if (!user && !userLoading) {
      return <Redirect to="/welcome" />
    } else {
      return <div>Loading...</div>
    }
  }

  return (
    <div>
      <Switch>

        <Route path="/authentication-response" render={routerProps => <AuthResponse routerProps={routerProps}/>} />

        <Route path="/welcome" component={Landing} />

        <Route path="/login" render={()=><Login />} />

        <Route path="/signup" render={()=><Signup />} />

        <Route path="/" render={ routerProps => (
          <>
            {false ? 
            <div>All the content</div> :
            <Redirect to="/welcome" />
            }
          </>
        )}/>
      </Switch>



      

      

    </div>
  );
}

export default App;

