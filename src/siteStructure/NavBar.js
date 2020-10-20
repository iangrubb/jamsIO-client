import React from 'react'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components'



const NavBar = () => {
    return (
        <Container>
            <Title>Jams.IO</Title>
            <Links>
                <Link to="/">Home</Link>
                <Link to="/jams">Jams</Link>
                <Link to="/jams/edit">Edit Jams</Link>
            </Links>
        </Container>
    )
}

export default NavBar

const Container = styled.header`
    display: flex;
    align-items: center;

    height: 80px;
    background: #191414;
`

const Title = styled.h1`

    font-weight: 900;
    color: white;
    margin: 1rem;

`

const Links = styled.nav`
    display: flex;
    align-items: center;
`

const Link = styled(NavLink)`
    color: white;
    text-decoration: none;
    margin: 1rem;
    font-size: 20px;
`