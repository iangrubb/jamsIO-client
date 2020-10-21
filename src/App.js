import React from 'react';

import styled from 'styled-components'

import { Switch, Route, Redirect } from 'react-router-dom'

import AuthResponse from './authentication/AuthResponse'

import useCurrentUser from './authentication/useCurrentUser'
import useSpotifyTokens from './authentication/useSpotifyTokens'

import Landing from './pages/initialization/Landing'
import Login from './pages/initialization/Login'
import Signup from './pages/initialization/Signup'

import MainSite from './siteStructure/MainSite'

function App() {

  // const { data } = useQuery(SEARCH_SONGS, {variables: { searchTerm: "Beef" }})

  // console.log(data)

  const { tokensAvailable, saveTokens, makeTokensUnavailable } = useSpotifyTokens()

  const { user, userLoading, logout } = useCurrentUser(makeTokensUnavailable)

  const determineAccess = () => {
    if (user && tokensAvailable) {
      return <MainSite logout={logout} />
    } else if (!user && !userLoading) {
      return <Redirect to="/welcome" />
    } else {
      return <div>Loading...</div>
    }
  }

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

