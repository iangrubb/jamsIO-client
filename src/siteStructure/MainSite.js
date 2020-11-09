import React from 'react'

import styled from 'styled-components'

import { Route, Switch } from 'react-router-dom'

import NavBar from './NavBar'
import Dashboard from '../pages/dashboard/Dashboard'
import Jams from '../pages/dashboard/Jams'
import EditJams from '../pages/dashboard/EditJams'
import UserSearch from '../pages/browse/UserSearch'
import UserShow from '../pages/browse/UserShow'
import UserSocial from '../pages/browse/UserSocial'

const MainSite = ({ logout, user }) => {
    return (
        <>
        <NavBar logout={logout} />
        <Main>
            <Switch>
                <Route path="/users/:id/followers" render={props => (
                    <UserSocial id={props.match.params.id} mode="followers"/>
                )}/>
                <Route path="/users/:id/following" render={props => (
                    <UserSocial id={props.match.params.id} mode="following"/>
                )}/>
                <Route path="/users/:id" render={props => (
                    <UserShow id={props.match.params.id}/>
                )}/>
                <Route path="/users" render={()=><UserSearch currentUser={user} />}/>
                <Route path="/jams/edit" component={EditJams} />
                <Route path="/jams" component={Jams} />
                <Route path="/" component={Dashboard} />   
            </Switch>
        </Main>
        </>
    )
}

export default MainSite

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    margin-top: 80px;
`
