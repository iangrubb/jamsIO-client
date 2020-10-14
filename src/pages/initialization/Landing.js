import React from 'react'
import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

const Landing = () => {
    return (
        <div>
            <h1>Welcome!</h1>
            <Links>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
            </Links>
        </div>
    )
}

export default Landing

const Links = styled.div`
    display: flex;
    flex-direction: column;
`
