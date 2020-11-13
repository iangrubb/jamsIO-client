import React from 'react'

import { Link } from 'react-router-dom'

import { gql, useMutation } from '@apollo/client';


import styled from 'styled-components'

import { Button } from '../../styles/components'

const FOLLOW_USER = gql`
    mutation FollowUser($followeeId: ID!) {
        followUser(followeeId: $followeeId) {
            id
        }
    }
`

const UNFOLLOW_USER = gql`
    mutation UnfollowUser($followeeId: ID!) {
        unfollowUser(followeeId: $followeeId) {
            id
        }
    }
`



// Re-render in response to action:
  // Change the data for the followed / unfollowed user
  // Update current user's followee count.
  // Update current user's list of followed users on the user show page

  // Ideally these updates would target a specific user, rather than the currentUser query result. I don't want to be updating a bunch of queries.
    // May have to use findUser over currentUser query in general



const UserInfo = ({ id, username, followerCount, followeeCount, followedByUser, followsUser }) => {

    const [ followUser ] = useMutation(FOLLOW_USER, {
        update: (cache, {data: {followUser: { id }}}) => {

            console.log(cache, id)
            // Update CURRENT_USER followee and follower count

        }
    })

    const [ unfollowUser ] = useMutation(UNFOLLOW_USER, {onCompleted: console.log})

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
                <FollowButton onClick={()=>unfollowUser({variables: {followeeId: id}})}>Unfollow</FollowButton>
                :
                <FollowButton onClick={()=>followUser({variables: {followeeId: id}})}>Follow</FollowButton>
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
