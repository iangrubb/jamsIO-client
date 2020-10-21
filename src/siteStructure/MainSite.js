import React from 'react'

import styled from 'styled-components'

import { Route, Switch } from 'react-router-dom'

import NavBar from './NavBar'
import Dashboard from '../pages/dashboard/Dashboard'
import Jams from '../pages/dashboard/Jams'
import EditJams from '../pages/dashboard/EditJams'

const MainSite = ({ logout }) => {
    return (
        <>
        <NavBar logout={logout} />
        <Main>
            <Switch>
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
`
