import React, { useState } from 'react'

import { StyledLink } from '../../styles/components'

import SearchForm from '../../components/forms/SearchForm'

import { gql, useQuery, useMutation } from '@apollo/client';

import UserInfo from '../../components/display/UserInfo'

const BROWSE_USERS = gql`
    query BrowseUsers($searchTerm: String, $currentUserId: ID!) {
        browseUsers(searchTerm: $searchTerm) {
            id
            username
            followerCount
            followeeCount
            followedByUser(userId: $currentUserId)
            followsUser(userId: $currentUserId)
        }
        currentUser {
            followerCount
            followeeCount
        }
    }
`

const FOLLOW_USER = gql`
    mutation FollowUser($followeeId: ID!) {
        followUser(followeeId: $followeeId) {
            id
        }
    }
`

// TO DO

// 2. Display who is followed by and follows the current user

// 3. Pass down unfollow action to card

// 4. Conditionally render correct action

// 5. Update state automatically in response to either click



const UserSearch = ({ currentUser }) => {

    const { data, loading, refetch } = useQuery(BROWSE_USERS, {variables: {currentUserId: currentUser.id}})

    const refetchUsers = searchTerm => refetch({ searchTerm, currentUserId: currentUser.id })

    const [ followUser ] = useMutation(FOLLOW_USER, {onCompleted: console.log})





    const users = data?.browseUsers

    if (loading) return <div>Loading...</div>

    const {currentUser: { followeeCount, followerCount }} = data

    console.log(data)

    return (
        <div>
            <h2>Your Network</h2>

            <StyledLink to={`/users/${currentUser.id}/following`}>You're following {followeeCount} users</StyledLink>

            <StyledLink to={`/users/${currentUser.id}/followers`}>You're followed by {followerCount} users</StyledLink>

            <h2>Browse Users</h2>
            <SearchForm submitData={refetchUsers} />
            {data ?
            users.map(user => (
                <UserInfo key={user.id} {...user} followUser={()=>followUser({variables: {followeeId: user.id}})}/>
            ))
            : null}
        </div>
    )
}

export default UserSearch