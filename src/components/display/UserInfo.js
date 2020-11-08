import React from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'


// Display name, jams info summary, whether they follow / are followed by currentUser, last update

const UserInfo = ({ id, username, followerCount, followeeCount }) => {
    return (
        <StyledLink to={`/users/${id}`}>
            <Container>
                <h3>{username}</h3>
                <Bar />
                <Detail>Followed by {followeeCount}</Detail>
                <Detail>Following {followeeCount}</Detail>
            </Container>
        </StyledLink>
    )
}

export default UserInfo

const StyledLink = styled(Link)`
    text-decoration: none;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;

    border: 4px solid var(--white);
    border-radius: 8px;

    margin: 24px 0 0 0;
    padding: 8px;

    cursor: pointer;

    transition: box-shadow 0.2s ease, transform 0.2s ease;


    &:hover {
        box-shadow: 2px 2px 0 var(--green);
        transform: translate(-1px, -2px);
    }

`

const Bar = styled.div`
    margin: 0 0 6px 0;
    width: 64px;
    height: 2px;
    background: var(--green);
`

const Detail = styled.p`
    margin: 0 0 2px 4px;
    color: var(--white);
    font-size: 15px;

`
