import React from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { Button } from '../../styles/components'


// Display name, jams info summary, whether they follow / are followed by currentUser, last update

const UserInfo = ({ id, username, followerCount, followeeCount, followedByUser, followsUser, followUser, unfollowUser }) => {

    return (
        
            <Container>
                <StyledLink to={`/users/${id}`}>
                    <Name>{username}</Name>
                </StyledLink>

                <StyledLink to={`/users/${id}/following`}>
                    <Detail>{followsUser ? `Following you and ${followeeCount - 1} other users` : `Following ${followeeCount} users`}</Detail>
                </StyledLink>

                <StyledLink to={`/users/${id}/followers`}>
                    <Detail>{followedByUser ? `Followed you and ${followerCount - 1} other users` : `Followed by ${followerCount} users`}</Detail>
                </StyledLink>

                {followedByUser ?
                <FollowButton>Unfollow</FollowButton>
                :
                <FollowButton onClick={followUser}>Follow</FollowButton>
                }
                
                
            </Container>

    )
}

export default UserInfo



const StyledLink = styled(Link)`
    text-decoration: none;
    width: fit-content;
`

const Name = styled.h3`
    padding: 0 0 4px 0;
    box-shadow: 0 2px 0 var(--green);
    margin: 0 0 12px 0;
`

const FollowButton = styled(Button)`
    width: fit-content;
    margin: 4px 0;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;

    border: 4px solid var(--white);
    border-radius: 8px;

    margin: 24px 0 0 0;
    padding: 16px;


`

const Detail = styled.p`
    margin: 0 0 4px 4px;
    color: var(--white);
    font-size: 15px;

`
