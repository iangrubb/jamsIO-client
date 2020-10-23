import React from 'react'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

import { Button } from '../styles/components'

const NavBar = ({ logout }) => {
    return (
        <Container>
            <Title>Jams.IO</Title>
            <Links>
                <Link to="/">Home</Link>
                <Link to="/jams/edit">Jams</Link>  
                <Link to="/users" >Social</Link>
                <Link to="/playlist">Playlist</Link>
                <Link to="/radio">Radio</Link>                
            </Links>
            <Button onClick={logout}>Logout</Button>
        </Container>
    )
}


export default NavBar

const Container = styled.header`

    position: fixed;
    top: 0;

    background: var(--black);

    display: flex;
    justify-content: center;
    align-items: center;

    height: 60px;
    width: 100vw;

    border-bottom: solid 4px var(--green);
`

const Title = styled.h1`

    font-weight: 900;
    color: white;
    margin: 0;

`

const Links = styled.nav`
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 3rem;
`

const Link = styled(NavLink)`
    color: white;
    text-decoration: none;
    
    font-size: 20px;

    padding: 0.2rem 0.8rem;


    margin: 4px 0.4rem 0 0.4rem;
    border-bottom: solid 4px var(--black);

    &:hover {
        border-bottom: solid 4px var(--green);
    }

    display: flex;
    justify-content: center;
    align-items: center;
`